import { NextResponse } from "next/server";
import { init, isValidFinanceToken } from "../utils";
import { computeHouseStats, computeSp500Stats } from "../calculations";
import { getUsdArsRate } from "../exchangeRate";
import { getLatestSpyPrice, backfillMissingSpyPrices } from "../sp500History";
import { getCorsHeaders } from "@/utils/utils";

export async function GET(req) {
  try {
    if (!isValidFinanceToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { client } = require('../../../../../db');
    const db = client();
    await init(db);

    const settings = await db.one("SELECT * FROM finance_settings WHERE id = 1;");
    const housePayments = await db.any(
      "SELECT * FROM finance_payment WHERE category = 'house' ORDER BY payment_date DESC, created_at DESC;"
    );
    const sp500Payments = await db.any(
      "SELECT * FROM finance_payment WHERE category = 'sp500' ORDER BY payment_date DESC, created_at DESC;"
    );
    await backfillMissingSpyPrices(db, sp500Payments);

    const { searchParams } = new URL(req.url);
    const returnPctOverride = searchParams.get('sp500ReturnPct');
    const usdArsRate = await getUsdArsRate();
    const latestSpyPrice = await getLatestSpyPrice();

    return NextResponse.json({
      settings,
      usdArsRate,
      house: {
        ...computeHouseStats(housePayments, settings),
        payments: housePayments,
      },
      sp500: {
        ...computeSp500Stats(
          sp500Payments,
          settings,
          returnPctOverride != null ? parseFloat(returnPctOverride) : null,
          latestSpyPrice
        ),
        payments: sp500Payments,
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() { return getCorsHeaders() }
