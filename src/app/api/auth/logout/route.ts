import { NextResponse } from "next/server";

export async function POST() {
  const isProd = process.env.NODE_ENV === "production";
  const clearCookieHeader = `ssf_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${
    isProd ? "; Secure" : ""
  }`;

  return new NextResponse(JSON.stringify({ success: true, message: "Logged out successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clearCookieHeader,
    },
  });
}
