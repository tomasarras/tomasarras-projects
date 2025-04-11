import { NextResponse } from "next/server"
import { newToken, init } from "../../utils";
import axios from "@/app/utils/axiosTelegram";
import { APPROVE_TELEGRAM_ACTION, BAN_TELEGRAM_ACTION, REJECT_TELEGRAM_ACTION } from "@/app/Constants";
import { sendLoginFailNotification, sendLoginNotification } from "@/app/lib/telegramApi";
import { getCorsHeaders } from "@/utils/utils";


export async function POST(req) {
  try {    
    const { password, agent } = await req.json()
    const resultIp = await checkIp(req);
    if (!resultIp.isAllowed) {
      console.log('ATTEMPT NOT ALLOWED PASSWORD='+password)
      return NextResponse.json({error: 'Unauthorized', countDown: resultIp.countDown }, {status: 401}) 
    }
    const match = password === process.env.AUTH_PASSWORD
    if (!match) {
      console.log('ATTEMPT PASSWORD='+password)
      sendLoginFailNotification(req, agent)
      recordAttempt(req)
      return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
    }
    await init()
    const secondFactorLoginId = await sendLoginNotification(req);
    const { client } = require('../../../../../db');
		const db = client();
    await db.result(`DELETE FROM login_2fa`)
    await db.result(`INSERT INTO login_2fa (id, status) VALUES ($1, $2);`, [secondFactorLoginId, 'send'])
    const checkLoginBreak = async () => {
      const login = await db.one(`SELECT status FROM login_2fa WHERE id = $1;`, [secondFactorLoginId])
      return login.status !== 'send'
    }
    const result = await retryUntilConditionOrTimeout(checkLoginBreak, 500, 60000, db, secondFactorLoginId)
    if (result.status === 'approved') {
      const token = await newToken(req)
      return NextResponse.json({ token })
    } else if (result.status === 'timeout') {
      return new Response(null, {
        status: 504,
      })
    } else {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    }
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}

export async function OPTIONS() { return getCorsHeaders() }

function retryUntilConditionOrTimeout(conditionFn, intervalMs, timeoutMs, db, id) {
  return new Promise((resolve) => {
      const startTime = Date.now();

      const interval = setInterval(async () => {
          const elapsedTime = Date.now() - startTime;
          if (await conditionFn()) {
              clearInterval(interval);
              const login = await db.one(`SELECT status FROM login_2fa WHERE id = $1;`, [id])
              if (login == null) {
                resolve({ status: 'error' })
              }
              resolve({ status: login.status })
          } else if (elapsedTime >= timeoutMs) {
              clearInterval(interval);
              resolve({ status: 'timeout' });
          }
      }, intervalMs);
  });
}

async function recordAttempt(req) {
  const { client } = require('../../../../../db');
  const db = client();
  const ip = req.headers.get("X-Real-IP");
  const result = await db.any("SELECT * FROM ip_list WHERE ip = $1;", [ip])
  if (result.length == 0) {
    db.result("INSERT INTO ip_list (ip, created_at, status, attempt) VALUES ($1, $2, 'active', 1);", [ip, new Date()])
    return;
  }
  db.result("UPDATE ip_list SET attempt = attempt +1 WHERE ip = $1;", [ip])
}

async function checkIp(req) {
  const { client } = require('../../../../../db');
  const db = client();
  const ip = req.headers.get("X-Real-IP");
  const result = await db.any("SELECT * FROM ip_list WHERE ip = $1;", [ip])
  if (result.length == 0)
    return { isAllowed: true }
  const [ipResult] = result
  const { status } = ipResult
  if (status === 'banned')
    return { isAllowed: false, countDown: "banned" }
  return { isAllowed: ipResult.attempt <= 8, countDown: "max reached" }
}