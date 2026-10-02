import { NextResponse } from "next/server";

export const defaultStaffAccounts = [
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

export async function GET() {
  // Strip plaintext passwords from public API response
  const sanitizedStaff = defaultStaffAccounts.map(({ password: _, ...rest }) => rest);
  return NextResponse.json({ success: true, staff: sanitizedStaff });
}

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "Staff management requires database integration. Contact the developer.",
    },
    { status: 501 }
  );
}
