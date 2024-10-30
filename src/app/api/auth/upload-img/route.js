import { NextResponse } from "next/server"
import {imgbbUploader} from "imgbb-uploader"
import { isValidToken } from "../../utils";
import { getCorsHeaders } from "@/utils/utils";

export async function POST(req) {
  try {
    const newToken = await isValidToken(req)
    if (!newToken)
      return NextResponse.json({error: 'Unauthorized'}, {status: 401}) 
    const  { imgBase64 } = await req.json()
    if (!imgBase64) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    const apiKey = process.env.IMGBB_API_KEY
    const options = {
      apiKey,
      base64string: imgBase64
    };
    const response = await imgbbUploader(options)
    return NextResponse.json({ newToken, url: response.url })
  } catch(e) {
    console.log(e);
    return NextResponse.json({})
  }
}

export async function OPTIONS() { return getCorsHeaders() }