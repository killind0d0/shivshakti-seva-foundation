import crypto from "crypto";

export interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "staff";
  permissions?: {
    canAddPhotos: boolean;
    canViewHelpRequests: boolean;
    canViewVolunteers: boolean;
    canViewWomenRegs: boolean;
    canEditCampaign: boolean;
  };
}

export interface SessionPayload {
  user: AuthUser;
  exp: number; // UNIX timestamp in seconds
  iat: number; // UNIX timestamp in seconds
}

const DEFAULT_SECRET = "shivshakti-seva-foundation-secure-secret-key-2026-auth";

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SECRET;
}

export function getAdminCredentials() {
  return {
    adminId: (process.env.ADMIN_ID || "admin").trim(),
    adminPassword: (process.env.ADMIN_PASSWORD || "").trim(),
    adminAuthToken: process.env.ADMIN_AUTH_TOKEN?.trim(),
  };
}

export function signToken(user: AuthUser, expiresInSec = 7 * 86400): string {
  const secret = getSessionSecret();
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "HS256", typ: "JWT" };
  const payload: SessionPayload = {
    user,
    iat: now,
    exp: now + expiresInSec,
  };

  const headerB64 = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const message = `${headerB64}.${payloadB64}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("base64url");

  return `${message}.${signature}`;
}

export function verifyToken(token: string): { valid: boolean; payload?: SessionPayload; error?: string } {
  try {
    if (!token || typeof token !== "string") {
      return { valid: false, error: "Missing token" };
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return { valid: false, error: "Invalid token format" };
    }

    const [headerB64, payloadB64, signature] = parts;
    const secret = getSessionSecret();
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: false, error: "Signature mismatch" };
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { valid: false, error: "Token expired" };
    }

    return { valid: true, payload };
  } catch (err: any) {
    return { valid: false, error: err?.message || "Token verification error" };
  }
}

export function extractTokenFromRequest(request: Request): string | null {
  // 1. Check custom header x-admin-auth
  const customHeader = request.headers.get("x-admin-auth");
  if (customHeader) {
    return customHeader.trim();
  }

  // 2. Check Authorization Bearer
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 3. Check Cookie ssf_session
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("ssf_session=")) {
        return cookie.substring("ssf_session=".length).trim();
      }
    }
  }

  return null;
}

export function getSessionFromRequest(request: Request): {
  valid: boolean;
  user?: AuthUser;
  error?: string;
} {
  const token = extractTokenFromRequest(request);
  if (!token) {
    return { valid: false, error: "No authentication credentials provided" };
  }

  // Check if token matches adminAuthToken or adminPassword directly as a fallback API token
  const { adminPassword, adminAuthToken } = getAdminCredentials();
  if (
    (adminAuthToken && token === adminAuthToken) ||
    (token === adminPassword && adminPassword !== "")
  ) {
    return {
      valid: true,
      user: {
        id: "admin",
        name: "आकाश जयदेव गिरि (मुख्य प्रशासक)",
        role: "admin",
      },
    };
  }

  const result = verifyToken(token);
  if (!result.valid || !result.payload) {
    return { valid: false, error: result.error };
  }

  return { valid: true, user: result.payload.user };
}

export function isAdminRequest(request: Request): boolean {
  const session = getSessionFromRequest(request);
  return Boolean(session.valid && session.user && session.user.role === "admin");
}
