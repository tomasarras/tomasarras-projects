import { NextResponse } from "next/server";
import { isValidFinanceToken } from "../../utils";
import { getCorsHeaders } from "@/utils/utils";

export async function DELETE(req, { params }) {
  try {
    if (!isValidFinanceToken(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { client } = require('../../../../../../db');
    const db = client();
    await db.result("DELETE FROM finance_payment WHERE id = $1;", [params.id]);
    return NextResponse.json({});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function OPTIONS() { return getCorsHeaders() }
