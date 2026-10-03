import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    if (!id || !password) {
      return NextResponse.json(
        { success: false, message: "आईडी एवं पासवर्ड आवश्यक है।" },
        { status: 400 }
      );
    }

    const trimmedId = String(id).trim().toUpperCase();
    const cleanPass = String(password).trim();

    // 1. Admin Authentication
    const isAdminMatch =
      (trimmedId === "ADMIN" || trimmedId === "9117135379") &&
      (cleanPass === "admin@123" || cleanPass === "ssf2026" || cleanPass === "admin");

    if (isAdminMatch) {
      return NextResponse.json({
        success: true,
        role: "admin",
        user: {
          id: "admin",
          name: "आकाश जयदेव गिरि (मुख्य प्रशासक)",
          role: "admin",
        },
      });
    }

    // 2. DEV Developer Authentication
    const isDevMatch =
      trimmedId === "DEV" &&
      (cleanPass === "dev@123" ||
        cleanPass === "dev123" ||
        cleanPass === "admin@123" ||
        cleanPass === "staff@123" ||
        cleanPass === "dev" ||
        cleanPass === "123456" ||
        cleanPass === "ssf2026");

    if (isDevMatch) {
      return NextResponse.json({
        success: true,
        role: "staff",
        user: {
          id: "DEV",
          name: "तकनीकी सेवादार (DEV)",
          role: "staff",
          permissions: {
            canAddPhotos: true,
            canViewHelpRequests: true,
            canViewVolunteers: true,
            canViewWomenRegs: true,
            canEditCampaign: true,
          },
        },
      });
    }

    // 3. Staff Accounts Authentication
    if (trimmedId === "STAFF-101" && (cleanPass === "staff@123" || cleanPass === "ssf2026")) {
      return NextResponse.json({
        success: true,
        role: "staff",
        user: {
          id: "STAFF-101",
          name: "आकाश जयदेव गिरि / अमित कुमार",
          role: "staff",
          permissions: {
            canAddPhotos: true,
            canViewHelpRequests: true,
            canViewVolunteers: true,
            canViewWomenRegs: true,
            canEditCampaign: true,
          },
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "अमान्य आईडी अथवा पासवर्ड! कृपया सही क्रेडेंशियल दर्ज करें।" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "सर्वर त्रुटि! कृपया पुनः प्रयास करें।" },
      { status: 500 }
    );
  }
}
