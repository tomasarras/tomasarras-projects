let cachedSeries = null;
let cachedAt = 0;
const CACHE_MS = 6 * 60 * 60 * 1000;

// Precios diarios de SPY (ETF que sigue al S&P500) para estimar el rendimiento
// real que tuvo cada aporte desde su fecha hasta hoy, en vez de asumir una tasa fija.
export async function getSpyHistory() {
  if (cachedSeries != null && Date.now() - cachedAt < CACHE_MS) {
    return cachedSeries;
  }
  try {
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=10y&interval=1d', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const data = await response.json();
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const closes = result.indicators.quote[0].close;
    const series = timestamps
      .map((t, i) => ({ date: new Date(t * 1000), close: closes[i] }))
      .filter((point) => point.close != null)
      .sort((a, b) => a.date - b.date);
    cachedSeries = series;
    cachedAt = Date.now();
    return series;
  } catch (e) {
    console.log(e);
    return cachedSeries;
  }
}

export function closeOnOrBefore(series, targetDate) {
  if (!series || series.length === 0) return null;
  let result = series[0].close;
  for (const point of series) {
    if (point.date > targetDate) break;
    result = point.close;
  }
  return result;
}

export function latestClose(series) {
  if (!series || series.length === 0) return null;
  return series[series.length - 1].close;
}

// Precio de SPY en una fecha puntual (para guardarlo una sola vez en el pago,
// en vez de tener que traer y recorrer todo el historial en cada consulta).
export async function getSpyPriceOnDate(date) {
  const history = await getSpyHistory();
  return closeOnOrBefore(history, date);
}

let cachedLatestPrice = null;
let cachedLatestPriceAt = 0;
const LATEST_PRICE_CACHE_MS = 60 * 60 * 1000;

// Cotización actual de SPY: un llamado liviano (no trae 10 años de historial),
// para comparar contra el precio ya guardado en cada pago.
export async function getLatestSpyPrice() {
  if (cachedLatestPrice != null && Date.now() - cachedLatestPriceAt < LATEST_PRICE_CACHE_MS) {
    return cachedLatestPrice;
  }
  try {
    const response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=1d&interval=1d', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const data = await response.json();
    const price = data.chart.result[0].meta.regularMarketPrice;
    cachedLatestPrice = price;
    cachedLatestPriceAt = Date.now();
    return price;
  } catch (e) {
    console.log(e);
    return cachedLatestPrice;
  }
}

// Completa spy_price_at_payment para pagos viejos que no lo tengan guardado
// (por ejemplo, cargados antes de este cambio). Solo trae el historial completo
// si hace falta.
export async function backfillMissingSpyPrices(db, payments) {
  const missing = payments.filter((p) => p.category === 'sp500' && p.spy_price_at_payment == null);
  if (missing.length === 0) return;
  const history = await getSpyHistory();
  if (!history) return;
  for (const p of missing) {
    const price = closeOnOrBefore(history, new Date(p.payment_date));
    if (price != null) {
      await db.none('UPDATE finance_payment SET spy_price_at_payment = $1 WHERE id = $2;', [price, p.id]);
      p.spy_price_at_payment = price;
    }
  }
}
