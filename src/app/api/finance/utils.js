import jwt from 'jsonwebtoken';

let initialized = false;

export async function init(db) {
  if (initialized) return;
  if (db == undefined) {
    const { client } = require('../../../../db');
    db = client();
  }
  const paymentTable = `
    CREATE TABLE IF NOT EXISTS finance_payment (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category VARCHAR NOT NULL CHECK (category IN ('house', 'sp500')),
      payment_date DATE NOT NULL,
      amount_ars NUMERIC NOT NULL,
      amount_usd NUMERIC NOT NULL,
      note TEXT,
      spy_price_at_payment NUMERIC,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );`;
  const paymentTableSpyColumn = `
    ALTER TABLE finance_payment ADD COLUMN IF NOT EXISTS spy_price_at_payment NUMERIC;`;
  const settingsTable = `
    CREATE TABLE IF NOT EXISTS finance_settings (
      id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      house_goal_usd NUMERIC NOT NULL DEFAULT 80000,
      house_monthly_target_usd NUMERIC NOT NULL DEFAULT 500,
      sp500_monthly_target_usd NUMERIC NOT NULL DEFAULT 200,
      sp500_annual_return_pct NUMERIC NOT NULL DEFAULT 10,
      sp500_retirement_goal_monthly_usd NUMERIC NOT NULL DEFAULT 7000,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );`;
  const ipListTable = `
    CREATE TABLE IF NOT EXISTS finance_ip_list (
      ip VARCHAR PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR NOT NULL,
      attempt INTEGER NOT NULL
    );`;
  try {
    await db.none(paymentTable);
    await db.none(paymentTableSpyColumn);
    await db.none(settingsTable);
    await db.none(ipListTable);
    await db.none(`INSERT INTO finance_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;`);
    initialized = true;
  } catch (error) {
    console.error("Error creating finance tables: ", error);
  }
}

export function isValidFinanceToken(req) {
  const token = req.headers.get("Authorization")?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.FINANCE_JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
}

export function newFinanceToken() {
  return jwt.sign({}, process.env.FINANCE_JWT_SECRET, {
    expiresIn: process.env.FINANCE_TOKEN_EXPIRATION || '90d',
  });
}

export async function checkFinanceIp(req, db) {
  const ip = req.headers.get("X-Real-IP");
  const result = await db.any("SELECT * FROM finance_ip_list WHERE ip = $1;", [ip]);
  if (result.length == 0) return { isAllowed: true };
  const [ipResult] = result;
  if (ipResult.status === 'banned') return { isAllowed: false };
  return { isAllowed: ipResult.attempt <= 8 };
}

export async function recordFinanceAttempt(req, db) {
  const ip = req.headers.get("X-Real-IP");
  const result = await db.any("SELECT * FROM finance_ip_list WHERE ip = $1;", [ip]);
  if (result.length == 0) {
    return db.result("INSERT INTO finance_ip_list (ip, status, attempt) VALUES ($1, 'active', 1);", [ip]);
  }
  return db.result("UPDATE finance_ip_list SET attempt = attempt + 1 WHERE ip = $1;", [ip]);
}
