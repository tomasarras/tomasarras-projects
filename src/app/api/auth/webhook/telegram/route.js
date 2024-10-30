import { APPROVE_TELEGRAM_ACTION, BAN_TELEGRAM_ACTION, REJECT_TELEGRAM_ACTION } from "@/app/Constants"
import { NextResponse } from "next/server"


export async function POST(req) {
  try {
    console.log("telegram webhook");
    let body = await req.json()
    body = body['callback_query']    
    if (!('data' in body)) return NextResponse.json({})
    const [action, loginId] = body.data.split('_')
    const { client } = require('../../../../../../db');
		const db = client();
    if (action === APPROVE_TELEGRAM_ACTION) {
      db.result(`UPDATE login_2fa SET status = 'approved' WHERE id = $1;`, [loginId])
    } else if (action === REJECT_TELEGRAM_ACTION) {
      db.result(`UPDATE login_2fa SET status = 'rejected' WHERE id = $1;`, [loginId])
    } else if (action === BAN_TELEGRAM_ACTION) {
      const ip = loginId
      const result = await db.any("SELECT * FROM ip_list WHERE ip = $1;", [ip])
      if (result.length == 0) {
        db.result("INSERT INTO ip_list (ip, created_at, status, attempt) VALUES ($1, $2, 'banned', 1);", [ip, new Date()])
        return;
      }
      db.result("UPDATE ip_list SET status = 'banned' WHERE ip = $1;", [ip])
    }    
    return NextResponse.json({})
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}