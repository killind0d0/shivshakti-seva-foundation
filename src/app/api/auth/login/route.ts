import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/store";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, password } = body;

    const authResult = await authenticateUser(id, password);

    if (!authResult.success || !authResult.user) {
      return NextResponse.json(
        { success: false, error: authResult.error || "अमान्य आईडी अथवा पासवर्ड!" },
        { status: 401 }
      );
    }

    const user = authResult.user;
    const token = signToken(user, 7 * 24 * 3600); // 7-day signed session token

    const isProd = process.env.NODE_ENV === "production";
    const cookieHeader = `ssf_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      7 * 24 * 3600
    }${isProd ? "; Secure" : ""}`;

    return new NextResponse(
      JSON.stringify({
        success: true,
        token,
        user,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieHeader,
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
