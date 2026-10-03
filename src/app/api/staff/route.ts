import { NextResponse } from "next/server";
import {
  getStoreData,
  saveStoreData,
  sanitizeStaffList,
  StaffAccount,
  defaultStaffAccounts,
} from "@/lib/store";
import { isAdminRequest } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getStoreData();
    const staffList = data.staff && data.staff.length > 0 ? data.staff : defaultStaffAccounts;
    // Strictly sanitize staff list: NEVER expose passwords in public responses
    const safeStaff = sanitizeStaffList(staffList);
    return NextResponse.json({ success: true, staff: safeStaff });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: "Failed to load staff accounts", staff: sanitizeStaffList(defaultStaffAccounts) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Guard: Only authenticated administrators can modify staff accounts
    if (!isAdminRequest(request)) {
      return NextResponse.json(
        {
          success: false,
          error: "अनधिकृत (Unauthorized): सेवादार खाता प्रबंधन केवल मुख्य प्रशासक के लिए सुरक्षित है।",
        },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const data = await getStoreData();
    const existingStaff = data.staff || defaultStaffAccounts;

    let updatedStaff: StaffAccount[] = [...existingStaff];

    if (body.staffList && Array.isArray(body.staffList)) {
      // Merge staff list while preserving existing passwords when omitted or blank
      const existingMap = new Map<string, StaffAccount>();
      for (const s of existingStaff) {
        existingMap.set(s.id.trim().toUpperCase(), s);
      }

      updatedStaff = body.staffList.map((item: StaffAccount) => {
        const key = item.id.trim().toUpperCase();
        const existing = existingMap.get(key);
        const resolvedPassword =
          item.password && item.password.trim() !== ""
            ? item.password.trim()
            : existing?.password || "sewa@2026";

        return {
          id: item.id.trim(),
          name: item.name.trim(),
          phone: item.phone?.trim() || "",
          password: resolvedPassword,
          roleTitle: item.roleTitle || "क्षेत्रीय सेवादार",
          status: item.status || "active",
          createdDate: item.createdDate || new Date().toLocaleDateString("en-GB"),
          permissions: {
            canAddPhotos: Boolean(item.permissions?.canAddPhotos),
            canViewHelpRequests: Boolean(item.permissions?.canViewHelpRequests),
            canViewVolunteers: Boolean(item.permissions?.canViewVolunteers),
            canViewWomenRegs: Boolean(item.permissions?.canViewWomenRegs),
            canEditCampaign: Boolean(item.permissions?.canEditCampaign),
          },
        };
      });
    } else if (body.newStaff && body.newStaff.id) {
      const newAcc: StaffAccount = {
        id: body.newStaff.id.trim(),
        name: body.newStaff.name.trim(),
        phone: body.newStaff.phone?.trim() || "",
        password: body.newStaff.password?.trim() || "sewa@2026",
        roleTitle: body.newStaff.roleTitle || "क्षेत्रीय सेवादार",
        status: body.newStaff.status || "active",
        createdDate: body.newStaff.createdDate || new Date().toLocaleDateString("en-GB"),
        permissions: {
          canAddPhotos: Boolean(body.newStaff.permissions?.canAddPhotos),
          canViewHelpRequests: Boolean(body.newStaff.permissions?.canViewHelpRequests),
          canViewVolunteers: Boolean(body.newStaff.permissions?.canViewVolunteers),
          canViewWomenRegs: Boolean(body.newStaff.permissions?.canViewWomenRegs),
          canEditCampaign: Boolean(body.newStaff.permissions?.canEditCampaign),
        },
      };

      // Filter out duplicate if ID already existed, then prepend new account
      const filtered = updatedStaff.filter(
        (s) => s.id.trim().toUpperCase() !== newAcc.id.toUpperCase()
      );
      updatedStaff = [newAcc, ...filtered];
    }

    // Persist changes through resilient store (with memory cache and serverless file fallback)
    await saveStoreData({ staff: updatedStaff });

    // Return sanitized staff list to client without plaintext passwords
    return NextResponse.json({
      success: true,
      staff: sanitizeStaffList(updatedStaff),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update staff" },
      { status: 500 }
    );
  }
}
