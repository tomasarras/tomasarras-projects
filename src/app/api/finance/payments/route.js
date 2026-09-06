import { NextResponse } from "next/server";
import { init, isValidFinanceToken } from "../utils";
import { getSpyPriceOnDate } from "../sp500History";
import { getCorsHeaders } from "@/utils/utils";

export async function POST(req) {
  try {
    if (!isValidFinanceToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { client } = require('../../../../../db');
    const db = client();
    await init(db);

    const { category, paymentDate, amountArs, amountUsd, note } = await req.json();
    if (!['house', 'sp500'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    const spyPriceAtPayment = category === 'sp500' ? await getSpyPriceOnDate(new Date(paymentDate)) : null;

    const payment = await db.one(
      `INSERT INTO finance_payment (category, payment_date, amount_ars, amount_usd, note, spy_price_at_payment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *;`,
      [category, paymentDate, amountArs, amountUsd, note || null, spyPriceAtPayment]
    );
    return NextResponse.json({ payment });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() { return getCorsHeaders() }
