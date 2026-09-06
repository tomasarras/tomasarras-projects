import { NextResponse } from "next/server";
import { init, isValidFinanceToken } from "../utils";
import { getCorsHeaders } from "@/utils/utils";

const EDITABLE_FIELDS = {
  houseGoalUsd: 'house_goal_usd',
  houseMonthlyTargetUsd: 'house_monthly_target_usd',
  sp500MonthlyTargetUsd: 'sp500_monthly_target_usd',
  sp500AnnualReturnPct: 'sp500_annual_return_pct',
  sp500RetirementGoalMonthlyUsd: 'sp500_retirement_goal_monthly_usd',
};

export async function PUT(req) {
  try {
    if (!isValidFinanceToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { client } = require('../../../../../db');
    const db = client();
    await init(db);

    const body = await req.json();
    const columns = [];
    const values = [];
    Object.entries(EDITABLE_FIELDS).forEach(([key, column]) => {
      if (body[key] !== undefined) {
        values.push(body[key]);
        columns.push(`${column} = $${values.length}`);
      }
    });

    if (columns.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const query = `UPDATE finance_settings SET ${columns.join(', ')}, updated_at = NOW() WHERE id = 1 RETURNING *;`;
    const settings = await db.one(query, values);
    return NextResponse.json({ settings });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() { return getCorsHeaders() }
