import { NextResponse } from "next/server"
import { decryptPassword, encryptPassword, formatAppResponse, isValidToken } from "../../utils";
import { v4 as uuidv4 } from 'uuid';
import { getCorsHeaders } from "@/utils/utils";

export async function POST(req) {
  try {
    const { name, password, description, secretOtp, img } = await req.json()
    if (!name || !password)
      return NextResponse.json({error: `bad request ${!name && "name is missing"} ${!password && "password is missing"}`}, {status: 400}) 
    const newToken = await isValidToken(req)
    if (!newToken)
      return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
    
    const { client } = require('../../../../../db');
    const db = client();
    const insertQuery = "INSERT INTO authenticator_app (id, name, description, password, secret_otp, created_at, img, status) "+
                        "VALUES ($1, $2, $3, $4, $5, $6, $7, 'enabled') "+
                        "RETURNING *;"
    const id = uuidv4();
    const encriptedPass = await encryptPassword(password)
    const encriptedSecretOtp = await encryptPassword(secretOtp)
    await db.one(insertQuery, [id, name, description, encriptedPass, encriptedSecretOtp, new Date(), img])
    const [createdApp] = await db.any("SELECT * FROM authenticator_app WHERE id = $1;", [id]);
    formatAppResponse(createdApp)
    return NextResponse.json({ newToken, createdApp })
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}

export async function OPTIONS() { return getCorsHeaders() }