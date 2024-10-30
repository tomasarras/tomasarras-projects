import { decryptPassword, formatAppResponse, isValidToken } from "@/app/api/utils";
import { getCorsHeaders } from "@/utils/utils";
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  try {
    const appId = params.id
    const newToken = await isValidToken(req)
    if (!newToken)
      return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
    const { client } = require('../../../../../../db');
    const db = client();
    const [app] = await db.any("SELECT * FROM authenticator_app WHERE id = $1;", [appId]);
    const decryptedPass = await decryptPassword(app.password)
    const decryptedSecretOtp = await decryptPassword(app["secret_otp"])
    formatAppResponse(app)
    app.password = decryptedPass
    app.secretOtp = decryptedSecretOtp
    return NextResponse.json({newToken, app})
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}

export async function DELETE(req, { params }) {
    try {
      const appId = params.id
      const newToken = await isValidToken(req)
      if (!newToken)
        return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
      const { client } = require('../../../../../../db');
      const db = client();
      await db.result("UPDATE authenticator_app SET status = 'deleted' WHERE id = $1;", [appId]);
      return NextResponse.json({newToken})
    } catch(e) {
      console.log(e);
      return NextResponse.json({})
    }
}

export async function OPTIONS() { return getCorsHeaders() }