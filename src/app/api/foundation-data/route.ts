import { NextResponse } from "next/server";
import { getStoreData, saveStoreData } from "@/lib/store";
import { isAdminRequest } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getStoreData();
    const rawFoundation = data.foundationData;
    const isValid =
      rawFoundation &&
      typeof rawFoundation === "object" &&
      Array.isArray(rawFoundation.services) &&
      rawFoundation.services.length > 0 &&
      Boolean(rawFoundation.heroHeadline);

    return NextResponse.json({
      success: true,
      data: isValid ? rawFoundation : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to load foundation data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Guard: Only authenticated administrators can modify global website CMS data
    if (!isAdminRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          error: "अनधिकृत: वेबसाइट डेटा अद्यतन केवल मुख्य प्रशासक के लिए सुरक्षित है।",
        },
        { status: 403 }
      );
    }

    const updatedData = await request.json().catch(() => null);
    const isValid =
      updatedData &&
      typeof updatedData === "object" &&
      Array.isArray(updatedData.services) &&
      updatedData.services.length > 0 &&
      Boolean(updatedData.heroHeadline);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid CMS data payload: must include valid services and heroHeadline" },
        { status: 400 }
      );
    }

    await saveStoreData({ foundationData: updatedData });

    return NextResponse.json({
      success: true,
      data: updatedData,
      message: "वेबसाइट डेटा सर्वर पर सफलतापूर्वक सहेजा गया।",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to persist CMS data" },
      { status: 500 }
    );
  }
}
