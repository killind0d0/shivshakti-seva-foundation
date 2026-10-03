import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request);

    if (!session.valid || !session.user) {
      return NextResponse.json(
        { authenticated: false, error: session.error || "No active session" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: session.user,
    });
  } catch (err: any) {
    return NextResponse.json(
      { authenticated: false, error: err.message || "Failed to verify session" },
      { status: 500 }
    );
  }
}
