import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const storeFilePath = path.join(process.cwd(), "src/data/portalStore.json");

const defaultStaffAccounts = [
  {
    id: "DEV",
    name: "तकनीकी सेवादार (DEV)",
    phone: "9117135379",
    password: "dev@123",
    roleTitle: "मुख्य तकनीकी सेवादार (Technical Developer)",
    status: "active",
    createdDate: "01/10/2026",
    permissions: {
      canAddPhotos: true,
      canViewHelpRequests: true,
      canViewVolunteers: true,
      canViewWomenRegs: true,
      canEditCampaign: true,
    },
  },
  {
    id: "STAFF-101",
    name: "आकाश जयदेव गिरि / अमित कुमार",
    phone: "9117135379",
    password: "staff@123",
    roleTitle: "क्षेत्रीय सेवादार",
    status: "active",
    createdDate: "01/10/2026",
    permissions: {
      canAddPhotos: true,
      canViewHelpRequests: true,
      canViewVolunteers: true,
      canViewWomenRegs: true,
      canEditCampaign: true,
    },
  },
];

async function getStoreData() {
  try {
    const raw = await fs.readFile(storeFilePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { staff: defaultStaffAccounts };
  }
}

export async function GET() {
  const data = await getStoreData();
  return NextResponse.json({ success: true, staff: data.staff || defaultStaffAccounts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await getStoreData();

    if (body.staffList && Array.isArray(body.staffList)) {
      data.staff = body.staffList;
    } else if (body.newStaff) {
      data.staff = [body.newStaff, ...(data.staff || [])];
    }

    await fs.writeFile(storeFilePath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true, staff: data.staff });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
