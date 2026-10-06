import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/store";
import { signToken } from "@/lib/auth";

// In-memory rate limiting map for login attempts
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes block on repeated failures

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || "unknown_ip";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  // Clean stale entry
  if (entry) {
    if (entry.blockedUntil && now < entry.blockedUntil) {
      return {
        allowed: false,
        retryAfterSec: Math.ceil((entry.blockedUntil - now) / 1000),
      };
    }
    if (now - entry.firstAttempt > WINDOW_MS && !entry.blockedUntil) {
      loginAttempts.delete(ip);
    }
  }

  return { allowed: true };
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip) || { count: 0, firstAttempt: now };

  entry.count += 1;
  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    entry.blockedUntil = now + BLOCK_DURATION_MS;
  }
  loginAttempts.set(ip, entry);
}

function resetAttempts(ip: string) {
  loginAttempts.delete(ip);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `अत्यधिक असफल प्रयास (Too Many Attempts)। सुरक्षा कारणों से लॉगिन अस्थायी रूप से ब्लॉक किया गया है। कृपया ${rateLimit.retryAfterSec} सेकंड बाद प्रयास करें।`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSec || 300),
          },
        }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { id, password } = body;

    const authResult = await authenticateUser(id, password);

    if (!authResult.success || !authResult.user) {
      recordFailedAttempt(ip);
      return NextResponse.json(
        { success: false, error: authResult.error || "अमान्य आईडी अथवा पासवर्ड!" },
        { status: 401 }
      );
    }

    // Login successful — reset failure counter
    resetAttempts(ip);

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
