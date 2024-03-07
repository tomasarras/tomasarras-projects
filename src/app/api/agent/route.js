import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const r = await req.json()
    const ip = req.headers.get("X-Real-IP");
    const now = new Date();
    const data = JSON.stringify(r)
    const { client } = require('../../../../db');
    const tableName = "portfolio"
    const db = client();
    const insertQuery = `
    INSERT INTO ${tableName} (date, ip, data)
    VALUES ($1, $2, $3)
    RETURNING id;`;
  
    db.one(insertQuery, [now, ip, data])
    return NextResponse.json({})
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}