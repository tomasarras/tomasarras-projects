import { NextResponse } from "next/server";
import { init, newFinanceToken, checkFinanceIp, recordFinanceAttempt } from "../utils";
import { getCorsHeaders } from "@/utils/utils";

export async function POST(req) {
  try {
    const { client } = require('../../../../../db');
    const db = client();
    await init(db);

    const resultIp = await checkFinanceIp(req, db);
    if (!resultIp.isAllowed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password } = await req.json();
    const match = password === process.env.FINANCE_PASSWORD;
    if (!match) {
      recordFinanceAttempt(req, db);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = newFinanceToken();
    return NextResponse.json({ token });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function OPTIONS() { return getCorsHeaders() }
