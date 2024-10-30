import { formatAppResponse, isValidToken } from "@/app/api/utils";
import { getCorsHeaders } from "@/utils/utils";
import { NextResponse } from "next/server"

export async function GET(req) {
  try {
    const newToken = await isValidToken(req)
    if (!newToken)
      return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
    const { client } = require('../../../../../db');
    const db = client();
    let apps = await db.any("SELECT * FROM authenticator_app WHERE status != 'deleted';");
    apps = apps.map(formatAppResponse)
    return NextResponse.json({newToken, apps })
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
    const { client } = require('../../../../../db');
    const db = client();
    await db.result("DELETE FROM authenticator_app WHERE id = $1;", [appId]);
    return NextResponse.json({newToken})
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}

export async function OPTIONS() { return getCorsHeaders() }