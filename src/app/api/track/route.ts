import { NextRequest, NextResponse } from "next/server";
import { findHelpRequest } from "@/lib/submissions";

export const dynamic = "force-dynamic";

/**
 * Helper to compute tracking progress steps (1 to 4)
 * Compatible with HelpTracker UI component
 */
function getStepStatus(status?: string): number {
  if (!status) return 1;
  if (
    status.includes("सम्पन्न") ||
    status.includes("पहुँचाई") ||
    status.includes("पूर्ण") ||
    status.includes("समाप्त")
  ) {
    return 4;
  }
  if (
    status.includes("प्रेषित") ||
    status.includes("प्रगति") ||
    status.includes("वितरित") ||
    status.includes("रवाना")
  ) {
    return 3;
  }
  if (
    status.includes("जाँच") ||
    status.includes("समीक्षा") ||
    status.includes("सत्यापन")
  ) {
    return 2;
  }
  return 1;
}

/**
 * Mask mobile numbers for public privacy (e.g., 98******10)
 */
function maskPhoneNumber(phone?: string): string {
  if (!phone) return "";
  const clean = phone.replace(/\D/g, "");
  if (clean.length < 7) return "******";
  const start = clean.slice(0, 2);
  const end = clean.slice(-2);
  return `${start}${"*".repeat(Math.min(clean.length - 4, 6))}${end}`;
}

// ==========================================
// GET /api/track?id=... or ?phone=...
// ==========================================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const id = (
      searchParams.get("id") ||
      searchParams.get("trackingId") ||
      searchParams.get("requestId") ||
      ""
    ).trim();
    const phone = (searchParams.get("phone") || searchParams.get("mobile") || "").trim();
    const q = (searchParams.get("q") || searchParams.get("query") || "").trim();

    // Prevent wide-net scraping: Require either a tracking ID or a valid 10-digit phone
    const cleanPhone = phone.replace(/\D/g, "");
    const effectiveId = id || (q.toUpperCase().startsWith("SSF-") || q.startsWith("sub_") ? q : undefined);
    const effectivePhone = cleanPhone.length >= 10 ? cleanPhone : undefined;

    if (!effectiveId && !effectivePhone) {
      return NextResponse.json(
        {
          success: false,
          found: false,
          error:
            "कृपया मान्य ट्रैकिंग आईडी (जैसे SSF-2026-XXXXXX) या अपना १० अंकों का मोबाइल नंबर दर्ज करें।",
        },
        { status: 400 }
      );
    }

    const { match, matches } = await findHelpRequest({
      id: effectiveId,
      phone: effectivePhone,
    });

    if (!match) {
      return NextResponse.json(
        {
          success: false,
          found: false,
          message:
            "इस ट्रैकिंग आईडी अथवा मोबाइल नंबर से कोई सहायता अनुरोध नहीं मिला। कृपया पुनः जांचें या नया अनुरोध दर्ज करें।",
        },
        { status: 404 }
      );
    }

    const formatRecord = (rec: typeof match) => ({
      trackingId: rec.trackingId || rec.requestId || rec.id,
      requestId: rec.trackingId || rec.requestId || rec.id,
      name: rec.name,
      phone: maskPhoneNumber(rec.phone),
      location: rec.location || rec.city || rec.address || "बिहार",
      needType: rec.needType || "सामान्य सहायता",
      date: rec.date || "हाल ही में",
      status: rec.status,
      statusCode: rec.statusCode || "received",
      details:
        rec.details ||
        "आपका अनुरोध फाउंडेशन को प्राप्त हो चुका है और सहायता दल द्वारा समीक्षा की जा रही है।",
      step: getStepStatus(rec.status),
      createdAt: rec.createdAt,
      updatedAt: rec.updatedAt,
    });

    return NextResponse.json({
      success: true,
      found: true,
      record: formatRecord(match),
      totalMatches: matches.length,
      allRecords: matches.map(formatRecord),
    });
  } catch (err: any) {
    console.error("[Track API] Error:", err);
    return NextResponse.json(
      {
        success: false,
        found: false,
        error: "सर्वर त्रुटि: ट्रैकिंग स्थिति लोड करने में असमर्थ।",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}
