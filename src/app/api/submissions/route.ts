import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  SubmissionType,
  addSubmission,
  getSubmissions,
  updateSubmissionStatus,
  validateSubmission,
} from "@/lib/submissions";
import { verifyToken, getSessionFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Allowed submission types
const ALLOWED_TYPES = new Set<SubmissionType>([
  "help_request",
  "volunteer",
  "women_competition",
  "contact",
  "donation_receipt",
]);

/**
 * Infer submission type if not explicitly supplied in request
 */
function inferSubmissionType(body: Record<string, any>): SubmissionType {
  if (body.needType || body.location || body.requestId) {
    return "help_request";
  }
  if (body.skillCategory || body.experienceYears || body.hasEquipment) {
    return "women_competition";
  }
  if (body.services || body.profession || body.availability) {
    return "volunteer";
  }
  if (body.donorName || body.amount || body.transactionRef || body.donorPan) {
    return "donation_receipt";
  }
  if (body.message || body.subject) {
    return "contact";
  }
  return "help_request";
}

/**
 * Validates admin/staff authentication for protected queries
 */
async function isAuthenticatedAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  const xAdminKey =
    request.headers.get("x-admin-key") ||
    request.headers.get("x-api-key") ||
    request.headers.get("x-admin-token");
  const xStaffId = request.headers.get("x-staff-id");
  const xStaffPass = request.headers.get("x-staff-password");

  const url = new URL(request.url);
  const tokenParam =
    url.searchParams.get("token") ||
    url.searchParams.get("secret") ||
    url.searchParams.get("auth") ||
    url.searchParams.get("apiKey");

  // Extract token
  let token = "";
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    token = authHeader.substring(7).trim();
  } else if (authHeader) {
    token = authHeader.trim();
  } else if (xAdminKey) {
    token = xAdminKey.trim();
  } else if (tokenParam) {
    token = tokenParam.trim();
  }

  // 0. Verify signed session token if provided or in cookies
  if (token) {
    const verified = verifyToken(token);
    if (verified.valid && verified.payload?.user) {
      return true;
    }
  }
  const session = getSessionFromRequest(request);
  if (session.valid && session.user) {
    return true;
  }

  // 1. Check custom environment secret
  if (process.env.ADMIN_SECRET && token === process.env.ADMIN_SECRET) {
    return true;
  }
  if (process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN) {
    return true;
  }

  // 2. Standard SSF admin and developer credentials
  const validStandardTokens = [
    "admin@123",
    "ssf2026",
    "dev@123",
    "admin",
    "ssf_admin_secret_token",
  ];
  if (validStandardTokens.includes(token)) {
    return true;
  }

  // 3. Match against dynamic staff accounts in portalStore.json
  try {
    const storePath = path.join(process.cwd(), "src/data/portalStore.json");
    const raw = await fs.readFile(storePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.staff)) {
      for (const staff of parsed.staff) {
        if (!staff) continue;
        // Match token against staff password
        if (staff.password && staff.password.trim() === token) {
          return true;
        }
        // Match staff ID and staff password headers
        if (
          xStaffId &&
          xStaffPass &&
          staff.id?.trim().toUpperCase() === xStaffId.trim().toUpperCase() &&
          staff.password?.trim() === xStaffPass.trim()
        ) {
          return true;
        }
      }
    }
  } catch {
    // Portal store file read skipped
  }

  return false;
}

// ==========================================
// POST: Submit any form (Help, Volunteer, etc.)
// ==========================================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "अमान्य अनुरोध: JSON डेटा आवश्यक है।",
        },
        { status: 400 }
      );
    }

    // Determine type
    const rawType =
      body.type ||
      body.submissionType ||
      request.nextUrl.searchParams.get("type") ||
      inferSubmissionType(body);

    const type = rawType.toString().toLowerCase() as SubmissionType;

    if (!ALLOWED_TYPES.has(type)) {
      return NextResponse.json(
        {
          success: false,
          error: `अमान्य श्रेणी (${type})। मान्य श्रेणियां: ${Array.from(ALLOWED_TYPES).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate payload fields
    const validation = validateSubmission(type, body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors[0],
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Collect request metadata
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;
    const userAgent = request.headers.get("user-agent") || undefined;

    // Persist submission
    const record = await addSubmission(type, body, {
      ip,
      userAgent,
      source: "web_form",
    });

    const successMessage =
      type === "help_request"
        ? `सहायता अनुरोध सफलतापूर्वक दर्ज कर लिया गया है। आपकी ट्रैकिंग आईडी: ${record.trackingId}`
        : "आपकी जानकारी सफलतापूर्वक दर्ज कर ली गई है। शिवशक्ति सेवा फाउंडेशन से जुड़ने के लिए धन्यवाद!";

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
        trackingId: record.trackingId,
        id: record.id,
        submission: record,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[Submissions API] POST error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "सर्वर त्रुटि: फॉर्म दर्ज नहीं किया जा सका। कृपया पुनः प्रयास करें।",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}

// ==========================================
// GET: Admin/Staff retrieval by category
// ==========================================
export async function GET(request: NextRequest) {
  try {
    // Authenticate Admin or Staff
    const authorized = await isAuthenticatedAdmin(request);
    if (!authorized) {
      return NextResponse.json(
        {
          success: false,
          error: "प्रमाणीकरण आवश्यक है (Unauthorized)। कृपया वैध Admin पासवर्ड या Authorization हेडर प्रदान करें।",
        },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category") || searchParams.get("type");
    const query = searchParams.get("q") || searchParams.get("query") || undefined;
    const limit = parseInt(searchParams.get("limit") || "200", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const category =
      categoryParam && categoryParam !== "all"
        ? (categoryParam.toLowerCase() as SubmissionType)
        : "all";

    const result = await getSubmissions({
      category,
      query,
      limit: isNaN(limit) ? 200 : limit,
      offset: isNaN(offset) ? 0 : offset,
    });

    return NextResponse.json({
      success: true,
      total: result.total,
      category,
      submissions: result.submissions,
    });
  } catch (err: any) {
    console.error("[Submissions API] GET error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "सर्वर त्रुटि: विवरण लोड नहीं किए जा सके।",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}

// ==========================================
// PATCH: Admin status update
// ==========================================
export async function PATCH(request: NextRequest) {
  try {
    const authorized = await isAuthenticatedAdmin(request);
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || (!body.id && !body.trackingId)) {
      return NextResponse.json(
        { success: false, error: "id या trackingId आवश्यक है।" },
        { status: 400 }
      );
    }

    const identifier = (body.trackingId || body.id).toString();
    const updated = await updateSubmissionStatus(
      identifier,
      body.status || "समीक्षाधीन",
      body.statusCode || "in_review",
      body.notes
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "अनुरोध रिकॉर्ड नहीं मिला।" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "स्थिति सफलतापूर्वक अद्यतन की गई।",
      submission: updated,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Status update error" },
      { status: 500 }
    );
  }
}
