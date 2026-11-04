const BIRTH_DATE = new Date(Date.UTC(1999, 8, 10));
const RETIREMENT_AGE = 65;

function monthsBetween(from, to) {
  let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());
  if (to.getUTCDate() < from.getUTCDate()) months -= 1;
  return Math.max(months, 0);
}

function sumUsd(payments) {
  return payments.reduce((total, p) => total + parseFloat(p.amount_usd), 0);
}

// Si el pago tiene cargada la cantidad real de CEDEARs comprados, el valor exacto
// sale de convertirla a acciones reales de SPY (dividiendo por el ratio CEDEAR:acción)
// y multiplicando por el precio actual de SPY — no depende de a qué precio se
// consiguió el CEDEAR ese día, que puede diferir del precio "teórico" por el spread
// o el dólar implícito.
// Si no la tiene (pagos viejos, cargados antes de este campo), cae al estimado
// anterior: precio de SPY guardado ese día vs. hoy, y si falta, a la tasa configurada.
function estimateCurrentValueUsd(payments, annualReturnPct, now, latestSpyPrice, cedearRatio) {
  const r = annualReturnPct / 100;
  return payments.reduce((total, p) => {
    const unitsBought = parseFloat(p.spy_units_bought || 0);
    if (unitsBought > 0 && latestSpyPrice != null && cedearRatio > 0) {
      return total + (unitsBought / cedearRatio) * latestSpyPrice;
    }
    const amount = parseFloat(p.amount_usd);
    const priceThen = p.spy_price_at_payment != null ? parseFloat(p.spy_price_at_payment) : null;
    if (latestSpyPrice != null && priceThen != null) {
      return total + amount * (latestSpyPrice / priceThen);
    }
    const wholeYearsElapsed = Math.floor(monthsBetween(new Date(p.payment_date), now) / 12);
    return total + amount * Math.pow(1 + r, wholeYearsElapsed);
  }, 0);
}

export function computeHouseStats(payments, settings) {
  const houseGoalUsd = parseFloat(settings.house_goal_usd);
  const monthlyTargetUsd = parseFloat(settings.house_monthly_target_usd);
  const totalPaidUsd = sumUsd(payments);
  const remainingUsd = Math.max(houseGoalUsd - totalPaidUsd, 0);

  return {
    houseGoalUsd,
    monthlyTargetUsd,
    totalPaidUsd,
    remainingUsd,
    progressPct: houseGoalUsd > 0 ? totalPaidUsd / houseGoalUsd : 0,
    monthsRemaining: monthlyTargetUsd > 0 ? Math.ceil(remainingUsd / monthlyTargetUsd) : null,
    paymentsCount: payments.length,
  };
}

export function computeSp500Stats(payments, settings, returnPctOverride, latestSpyPrice) {
  const monthlyTargetUsd = parseFloat(settings.sp500_monthly_target_usd);
  const retirementGoalMonthlyUsd = parseFloat(settings.sp500_retirement_goal_monthly_usd);
  const annualReturnPct = returnPctOverride != null ? returnPctOverride : parseFloat(settings.sp500_annual_return_pct);
  const cedearRatio = parseFloat(settings.sp500_cedear_ratio || 60);
  const totalInvestedUsd = sumUsd(payments);

  const now = new Date();
  const retirementDate = new Date(Date.UTC(BIRTH_DATE.getUTCFullYear() + RETIREMENT_AGE, BIRTH_DATE.getUTCMonth(), BIRTH_DATE.getUTCDate()));
  const currentAgeYears = monthsBetween(BIRTH_DATE, now) / 12;
  const monthsToRetirement = monthsBetween(now, retirementDate);

  // Capitalización anual (no mensual): los aportes de cada año se suman como un
  // pago único a fin de año, igual que la convención de investor.gov, para que
  // el 10% anual declarado no se infle por compuestearlo 12 veces al año.
  const r = annualReturnPct / 100;
  const wholeYears = Math.floor(monthsToRetirement / 12);
  const leftoverMonths = monthsToRetirement % 12;
  const annualContribution = monthlyTargetUsd * 12;
  const projectedRetirementFundUsd = (r === 0
    ? totalInvestedUsd + annualContribution * wholeYears
    : totalInvestedUsd * Math.pow(1 + r, wholeYears) + annualContribution * ((Math.pow(1 + r, wholeYears) - 1) / r)
  ) + monthlyTargetUsd * leftoverMonths;

  const projectedMonthlyIncomeUsd = (projectedRetirementFundUsd * (annualReturnPct / 100)) / 12;
  const currentValueUsd = estimateCurrentValueUsd(payments, annualReturnPct, now, latestSpyPrice, cedearRatio);

  return {
    monthlyTargetUsd,
    annualReturnPct,
    retirementGoalMonthlyUsd,
    totalInvestedUsd,
    currentValueUsd,
    currentAgeYears,
    monthsToRetirement,
    projectedRetirementFundUsd,
    projectedMonthlyIncomeUsd,
    goalProgressPct: retirementGoalMonthlyUsd > 0 ? projectedMonthlyIncomeUsd / retirementGoalMonthlyUsd : 0,
    paymentsCount: payments.length,
  };
}
