import { NextResponse } from "next/server"

export function getCorsHeaders() {
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400",
    },
  });

  return response;
}