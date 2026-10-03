import { NextResponse } from "next/server";
import { getStoreData, saveStoreData } from "@/lib/store";
import { isAdminRequest } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getStoreData();
    return NextResponse.json({
      success: true,
      data: data.foundationData || null,
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
    if (!updatedData || typeof updatedData !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid CMS data payload" },
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
