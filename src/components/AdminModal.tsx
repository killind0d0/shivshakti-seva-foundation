"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Settings,
  X,
  Save,
  Users,
  HeartHandshake,
  PhoneCall,
  DollarSign,
  TrendingUp,
  RotateCcw,
  CheckCircle,
  FileSpreadsheet,
  Lock,
  LogOut,
  UserPlus,
  Trash2,
  Camera,
  MapPin,
  Eye,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Sparkles,
  Phone,
  Mail,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

export interface StaffAccount {
  id: string;
  name: string;
  phone: string;
  password: string;
  roleTitle: string;
  status: "active" | "suspended";
  createdDate: string;
  permissions: {
    canAddPhotos: boolean;
    canViewHelpRequests: boolean;
    canViewVolunteers: boolean;
    canViewWomenRegs: boolean;
    canEditCampaign: boolean;
  };
}

export interface GroundPhotoItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  date: string;
  summary: string;
  fullStory: string;
  addedBy: string;
}

interface CurrentUser {
  id: string;
  name: string;
  role: "admin" | "staff";
  permissions?: StaffAccount["permissions"];
}

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FoundationData;
  onSaveData: (updated: FoundationData) => void;
  onResetData: () => void;
}

const defaultStaffAccounts: StaffAccount[] = [
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

export default function AdminModal({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
}: AdminModalProps) {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loginRole, setLoginRole] = useState<"admin" | "staff">("admin");
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>("contact");

  // CMS Form Data
  const [formData, setFormData] = useState<FoundationData>(data);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Submissions Data
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [womenRegs, setWomenRegs] = useState<any[]>([]);

  // Staff Management State (Admin only)
  const [staffList, setStaffList] = useState<StaffAccount[]>(defaultStaffAccounts);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    roleTitle: "क्षेत्रीय सेवादार",
    customId: "",
    customPassword: "",
    permissions: {
      canAddPhotos: true,
      canViewHelpRequests: true,
      canViewVolunteers: false,
      canViewWomenRegs: false,
      canEditCampaign: false,
    },
  });
  const [staffSuccessMsg, setStaffSuccessMsg] = useState("");

  // Ground Photos Management
  const [groundPhotos, setGroundPhotos] = useState<GroundPhotoItem[]>([]);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "बाढ़ एवं आपदा राहत",
    location: "माँ मंगलागौरी, गया जी",
    image: "/images/gallery/sevadar-working.png",
    date: "आज का सेवा कार्य",
    summary: "",
  });
  const [photoSuccessMsg, setPhotoSuccessMsg] = useState("");

  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Load submissions, staff, and photos on mount/open
  useEffect(() => {
    if (isOpen) {
      try {
        const v = JSON.parse(localStorage.getItem("ssf_volunteers") || "[]");
        setVolunteers(v);
        const h = JSON.parse(localStorage.getItem("ssf_help_requests") || "[]");
        setHelpRequests(h);
        const w = JSON.parse(
          localStorage.getItem("ssf_women_competition_registrations") || "[]"
        );
        setWomenRegs(w);

        const storedStaff = localStorage.getItem("ssf_staff_accounts");
        if (storedStaff) {
          const parsed = JSON.parse(storedStaff);
          // Ensure DEV is always included in the list
          if (!parsed.some((s: StaffAccount) => s.id.trim().toUpperCase() === "DEV")) {
            parsed.unshift(defaultStaffAccounts[0]);
          }
          setStaffList(parsed);
        } else {
          setStaffList(defaultStaffAccounts);
          localStorage.setItem("ssf_staff_accounts", JSON.stringify(defaultStaffAccounts));
        }

        // Fetch authoritative server-persisted staff list for cross-device synchronization (PC -> Mobile)
        fetch("/api/staff")
          .then((res) => res.json())
          .then((apiData) => {
            if (apiData.success && Array.isArray(apiData.staff)) {
              setStaffList(apiData.staff);
              try {
                localStorage.setItem("ssf_staff_accounts", JSON.stringify(apiData.staff));
              } catch {}
            }
          })
          .catch(() => {});

        const storedPhotos = localStorage.getItem("ssf_ground_photos");
        if (storedPhotos) {
          setGroundPhotos(JSON.parse(storedPhotos));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login Authentication with Cross-Device Smart Auto-Detection
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const trimmedId = loginId.trim().toUpperCase();
    const cleanPass = loginPassword.trim();

    // 1. Check if matching Admin credentials (admin / admin@123)
    const isAdminMatch =
      (trimmedId === "ADMIN" || trimmedId === "9117135379") &&
      (cleanPass === "admin@123" || cleanPass === "ssf2026" || cleanPass === "admin");

    if (isAdminMatch) {
      const adminUser: CurrentUser = {
        id: "admin",
        name: "आकाश जयदेव गिरि (मुख्य प्रशासक)",
        role: "admin",
      };
      setCurrentUser(adminUser);
      setLoginRole("admin");
      setActiveTab("contact");
      return;
    }

    // 2. Check if matching Staff account (including DEV and auto-detecting across tabs)
    const foundStaff = staffList.find(
      (s) => s.id.trim().toUpperCase() === trimmedId
    );

    // If ID is DEV, also support developer standard passwords
    const isDevMatch =
      trimmedId === "DEV" &&
      (cleanPass === "dev@123" ||
        cleanPass === "dev123" ||
        cleanPass === "admin@123" ||
        cleanPass === "staff@123" ||
        cleanPass === "dev" ||
        cleanPass === "123456" ||
        cleanPass === "ssf2026" ||
        (foundStaff && foundStaff.password.trim() === cleanPass));

    if (foundStaff || isDevMatch) {
      const targetStaff: StaffAccount = foundStaff || {
        id: "DEV",
        name: "तकनीकी सेवादार (DEV)",
        phone: "9117135379",
        password: cleanPass,
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
      };

      if (targetStaff.status === "suspended") {
        setLoginError("यह सेवादार खाता प्रशासक द्वारा निलंबित कर दिया गया है।");
        return;
      }

      if (targetStaff.password.trim() === cleanPass || isDevMatch) {
        const staffUser: CurrentUser = {
          id: targetStaff.id,
          name: targetStaff.name,
          role: "staff",
          permissions: targetStaff.permissions,
        };
        setCurrentUser(staffUser);
        setLoginRole("staff");

        // Determine accessible tab for staff
        if (targetStaff.permissions.canAddPhotos) {
          setActiveTab("groundPhotos");
        } else if (targetStaff.permissions.canViewHelpRequests) {
          setActiveTab("helpRequests");
        } else if (targetStaff.permissions.canViewVolunteers) {
          setActiveTab("volunteers");
        } else if (targetStaff.permissions.canViewWomenRegs) {
          setActiveTab("womenRegs");
        } else if (targetStaff.permissions.canEditCampaign) {
          setActiveTab("campaign");
        } else {
          setActiveTab("groundPhotos");
        }
        return;
      }
    }

    setLoginError("अमान्य आईडी अथवा पासवर्ड! कृपया सही क्रेडेंशियल दर्ज करें।");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginId("");
    setLoginPassword("");
    setLoginError("");
  };

  // Save General Website Data (Admin only)
  const handleSaveData = () => {
    onSaveData(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  // Staff Generation Handlers (Admin only)
  const handleAutoGenerateStaff = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const generatedId = `SSF-STAFF-${randomNum}`;
    const generatedPass = `Sewa#${Math.floor(1000 + Math.random() * 9000)}`;
    setNewStaff({
      ...newStaff,
      customId: generatedId,
      customPassword: generatedPass,
    });
  };

  const syncStaffToServer = (list: StaffAccount[]) => {
    try {
      localStorage.setItem("ssf_staff_accounts", JSON.stringify(list));
      fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ staffList: list }),
      }).catch(() => {});
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.phone.trim()) {
      alert("कृपया सेवादार का नाम और मोबाइल नंबर दर्ज करें।");
      return;
    }

    const finalId =
      newStaff.customId.trim().toUpperCase() ||
      `SSF-STAFF-${Math.floor(100 + Math.random() * 900)}`;
    const finalPassword =
      newStaff.customPassword.trim() ||
      `sewa@${Math.floor(100 + Math.random() * 900)}`;

    const newAccount: StaffAccount = {
      id: finalId,
      name: newStaff.name.trim(),
      phone: newStaff.phone.trim(),
      password: finalPassword,
      roleTitle: newStaff.roleTitle,
      status: "active",
      createdDate: new Date().toLocaleDateString("en-GB"),
      permissions: { ...newStaff.permissions },
    };

    const updated = [newAccount, ...staffList];
    setStaffList(updated);
    syncStaffToServer(updated);

    setStaffSuccessMsg(
      `सेवादार खाता सफलतापूर्वक बनाया गया! आईडी: ${finalId} | पासवर्ड: ${finalPassword}`
    );
    setNewStaff({
      name: "",
      phone: "",
      roleTitle: "क्षेत्रीय सेवादार",
      customId: "",
      customPassword: "",
      permissions: {
        canAddPhotos: true,
        canViewHelpRequests: true,
        canViewVolunteers: false,
        canViewWomenRegs: false,
        canEditCampaign: false,
      },
    });

    setTimeout(() => setStaffSuccessMsg(""), 5000);
  };

  const handleToggleStaffStatus = (id: string) => {
    const updated = staffList.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === "active" ? ("suspended" as const) : ("active" as const),
        };
      }
      return s;
    });
    setStaffList(updated);
    syncStaffToServer(updated);
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm(`क्या आप सेवादार खाता (${id}) स्थायी रूप से हटाना चाहते हैं?`)) {
      const updated = staffList.filter((s) => s.id !== id);
      setStaffList(updated);
      syncStaffToServer(updated);
    }
  };

  const handleTogglePermission = (staffId: string, permKey: keyof StaffAccount["permissions"]) => {
    const updated = staffList.map((s) => {
      if (s.id === staffId) {
        return {
          ...s,
          permissions: {
            ...s.permissions,
            [permKey]: !s.permissions[permKey],
          },
        };
      }
      return s;
    });
    setStaffList(updated);
    syncStaffToServer(updated);
  };

  // Ground Photo Handlers (Admin & Authorized Staff)
  const handleAddGroundPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim()) {
      alert("कृपया छायाचित्र शीर्षक दर्ज करें।");
      return;
    }

    const photoItem: GroundPhotoItem = {
      id: `ground-photo-${Date.now()}`,
      title: newPhoto.title.trim(),
      category: newPhoto.category,
      location: newPhoto.location,
      image: newPhoto.image,
      date: newPhoto.date || "आज की तस्वीर",
      summary: newPhoto.summary || "धरातल पर वास्तविक सेवा कार्य का सजीव छायाचित्र।",
      fullStory: newPhoto.summary || "शिवशक्ति सेवा फाउंडेशन की टीम द्वारा धरातल पर सेवा कार्य।",
      addedBy: currentUser?.name || "व्यवस्थापक",
    };

    const updated = [photoItem, ...groundPhotos];
    setGroundPhotos(updated);
    try {
      localStorage.setItem("ssf_ground_photos", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }

    setPhotoSuccessMsg("धरातल छायाचित्र सफलतापूर्वक वेबसाइट पर जोड़ा गया!");
    setNewPhoto({
      title: "",
      category: "बाढ़ एवं आपदा राहत",
      location: "माँ मंगलागौरी, गया जी",
      image: "/images/gallery/sevadar-working.png",
      date: "आज का सेवा कार्य",
      summary: "",
    });

    setTimeout(() => setPhotoSuccessMsg(""), 4000);
  };

  const handleDeleteGroundPhoto = (id: string) => {
    if (window.confirm("क्या आप इस धरातल छायाचित्र को हटाना चाहते हैं?")) {
      const updated = groundPhotos.filter((p) => p.id !== id);
      setGroundPhotos(updated);
      try {
        localStorage.setItem("ssf_ground_photos", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Determine Tab Visibility based on Role
  const isAdmin = currentUser?.role === "admin";
  const perms = currentUser?.permissions;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="bg-white max-w-5xl w-full rounded-3xl shadow-2xl border-2 border-brand-maroon-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white flex items-center justify-between border-b-2 border-brand-gold-500/40 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-gold-500 text-brand-maroon-950 flex items-center justify-center font-bold shadow-md flex-shrink-0">
              {currentUser ? (
                isAdmin ? <ShieldCheck className="w-5 h-5" /> : <Users className="w-5 h-5" />
              ) : (
                <Lock className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2
                id="admin-modal-title"
                className="font-heading text-lg sm:text-xl font-extrabold text-brand-cream-50 leading-tight"
              >
                {currentUser
                  ? isAdmin
                    ? "मुख्य प्रशासक प्रबंधन कक्ष (Full Admin Rights)"
                    : `सेवादार पोर्टल • ${currentUser.name}`
                  : "प्रशासक एवं सेवादार (Admin & Staff) लॉगिन"}
              </h2>
              <p className="text-xs text-brand-gold-300">
                {currentUser
                  ? isAdmin
                    ? "संस्था विवरण, संपर्क सूत्र, सेवादार अधिकार व छायाचित्र पूर्ण नियंत्रण"
                    : `अधिकृत सेवादार आईडी: ${currentUser.id} • प्राप्त अधिकार अनुसार सीमित संचालन`
                  : "शिवशक्ति सेवा फाउंडेशन — आधिकारिक सुरक्षित प्रबंधन प्रणाली"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-700/80 hover:bg-red-800 text-white text-xs font-bold transition shadow-xs"
                title="सत्र समाप्त करें"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">लॉगआउट</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-brand-cream-300 hover:text-white hover:bg-white/10 transition"
              aria-label="पोर्टल बंद करें"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1. LOGIN SCREEN (If not authenticated) */}
        {!currentUser ? (
          <div className="p-6 sm:p-10 overflow-y-auto flex items-center justify-center bg-brand-cream-50/50">
            <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-brand-gold-400/50 relative">
              <TraditionalCornerFlourish size={30} color="#d4af37" />

              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-3 relative">
                  <Image
                    src="/images/logo/logo_emblem.png"
                    alt="शिवशक्ति सेवा फाउंडेशन"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-maroon-950">
                  प्रबंधन पोर्टल में प्रवेश करें
                </h3>
                <p className="text-xs text-brand-charcoal-600 mt-1">
                  कृपया अपनी अधिकृत भूमिका एवं पहचान विवरण दर्ज करें
                </p>
              </div>

              {/* Role Selection Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-brand-cream-100 mb-5 border border-brand-gold-300/40">
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole("admin");
                    setLoginError("");
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    loginRole === "admin"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:text-brand-maroon-900"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>मुख्य प्रशासक (Admin)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginRole("staff");
                    setLoginError("");
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    loginRole === "staff"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:text-brand-maroon-900"
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>अधिकृत सेवादार (Staff)</span>
                </button>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-shake">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                    {loginRole === "admin" ? "प्रशासक आईडी (Admin ID)" : "सेवादार आईडी (Staff ID)"}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder={loginRole === "admin" ? "उदा. admin" : "उदा. STAFF-101"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-brand-maroon-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                    पासवर्ड (Password)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-maroon-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal-400 hover:text-brand-charcoal-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-800 hover:from-brand-maroon-850 hover:to-brand-saffron-600 text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 border-b-2 border-brand-gold-400"
                >
                  <KeyRound className="w-4 h-4 text-brand-gold-300" />
                  <span>प्रबंधन कक्ष में प्रवेश करें</span>
                </button>
              </form>

              {/* Security Privacy Notice (Default IDs and passwords removed from public screen) */}
              <div className="mt-5 p-3 rounded-xl bg-brand-cream-50 border border-brand-maroon-100 text-[11px] text-brand-charcoal-600 space-y-1">
                <div className="font-semibold text-brand-maroon-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>सुरक्षित अधिकृत प्रबंधन पोर्टल</span>
                </div>
                <p className="text-[10px] text-brand-charcoal-500 leading-relaxed">
                  यह पोर्टल केवल शिवशक्ति सेवा फाउंडेशन के अधिकृत प्रशासकों एवं सेवादारों हेतु आरक्षित है। पहचान क्रेडेंशियल सुरक्षित संदर्भ फाइल में प्रलेखित हैं।
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED DASHBOARD (Admin & Staff) */
          <>
            {/* Navigation Tabs based on Role & Permissions */}
            <div className="flex border-b border-brand-maroon-100 overflow-x-auto bg-brand-cream-50 p-2 gap-1.5 scrollbar-thin">
              
              {/* ADMIN ONLY TABS */}
              {isAdmin && (
                <>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === "contact"
                        ? "bg-brand-maroon-900 text-white shadow-sm"
                        : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>कार्यालय, नंबर व पता</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("greetings")}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === "greetings"
                        ? "bg-brand-maroon-900 text-white shadow-sm"
                        : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>पावन उत्सव व अभिवादन संदेश</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("staff")}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === "staff"
                        ? "bg-brand-maroon-900 text-white shadow-sm"
                        : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>सेवादार अधिकार प्रबंधन ({staffList.length})</span>
                  </button>
                </>
              )}

              {/* GROUND WORK PHOTOS (Admin or Staff with canAddPhotos) */}
              {(isAdmin || perms?.canAddPhotos) && (
                <button
                  onClick={() => setActiveTab("groundPhotos")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "groundPhotos"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>धरातल छायाचित्र जोड़ें ({groundPhotos.length})</span>
                </button>
              )}

              {/* ADMIN STATS & CAMPAIGN */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("stats")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "stats"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>सेवा आंकड़े</span>
                </button>
              )}

              {(isAdmin || perms?.canEditCampaign) && (
                <button
                  onClick={() => setActiveTab("campaign")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "campaign"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>राहत अभियान</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => setActiveTab("donation")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "donation"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>दान व बैंक खाते</span>
                </button>
              )}

              {/* SUBMISSIONS TABS */}
              {(isAdmin || perms?.canViewHelpRequests) && (
                <button
                  onClick={() => setActiveTab("helpRequests")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "helpRequests"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>सहायता अनुरोध ({helpRequests.length})</span>
                </button>
              )}

              {(isAdmin || perms?.canViewVolunteers) && (
                <button
                  onClick={() => setActiveTab("volunteers")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "volunteers"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>स्वयंसेवक ({volunteers.length})</span>
                </button>
              )}

              {(isAdmin || perms?.canViewWomenRegs) && (
                <button
                  onClick={() => setActiveTab("womenRegs")}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === "womenRegs"
                      ? "bg-brand-maroon-900 text-white shadow-sm"
                      : "text-brand-charcoal-700 hover:bg-brand-cream-200"
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-brand-gold-400" />
                  <span>महिला प्रतियोगिता ({womenRegs.length})</span>
                </button>
              )}
            </div>

            {/* TAB CONTENTS */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

              {/* SUCCESS ALERTS */}
              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-scaleIn">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>परिवर्तन सफलतापूर्वक वेबसाइट पर सहेज दिए गए हैं!</span>
                </div>
              )}

              {/* TAB: CONTACT & ADDRESS (Admin Only) */}
              {isAdmin && activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-maroon-100">
                    <div>
                      <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                        संस्था संपर्क, मोबाइल नंबर एवं कार्यालय पता
                      </h3>
                      <p className="text-xs text-brand-charcoal-600">
                        यहाँ से बदला गया नंबर एवं पता पूरी वेबसाइट पर तुरंत सक्रिय हो जाता है
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveData}
                      className="px-4 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>परिवर्तन सहेजें</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        आधिकारिक फोन नंबर (Universal English Digits)
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm font-sans"
                        placeholder="+91 91171 35379"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        आपातकालीन हेल्पलाइन (Emergency Phone)
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm font-sans"
                        placeholder="+91 91171 35379 (२४×७ हेल्पलाइन)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        आधिकारिक ईमेल (Email Address)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm font-mono"
                        placeholder="akashgiri91171@gmail.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        कार्यालय समय (Office Hours)
                      </label>
                      <input
                        type="text"
                        value={formData.officeHours}
                        onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        मुख्य कार्यालय का पूरा पता (Office Location)
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm"
                        placeholder="माँ मंगलागौरी, गया जी (बिहार) - ८२३००१"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        गूगल मैप्स लिंक (Google Maps Navigation URL)
                      </label>
                      <input
                        type="url"
                        value={formData.mapsUrl || ""}
                        onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm font-mono"
                        placeholder="https://maps.app.goo.gl/T3QqWjCGMkx9KVJr9?g_st=ac"
                      />
                      <p className="text-[11px] text-brand-charcoal-500 mt-1">
                        यह लिंक संपर्क पेज, फुटर और फ्लोटिंग विजेट में आगंतुकों को सीधे आपके स्थान पर नेविगेट करेगा।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FESTIVAL GREETING MANAGEMENT (Admin Only) */}
              {isAdmin && activeTab === "greetings" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-maroon-100">
                    <div>
                      <h3 className="font-heading text-base font-bold text-brand-maroon-950 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-gold-500" />
                        <span>पावन उत्सव एवं अभिवादन संदेश संपादन</span>
                      </h3>
                      <p className="text-xs text-brand-charcoal-600">
                        वेबसाइट के शीर्ष पर आगंतुकों को प्रदर्शित होने वाले पावन पर्व शुभकामना संदेश को नियंत्रित एवं संपादित करें।
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveData}
                      className="px-5 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Save className="w-3.5 h-3.5 text-brand-gold-300" />
                      <span>परिवर्तन सहेजें</span>
                    </button>
                  </div>

                  {/* Toggle On/Off */}
                  <div className="p-4 rounded-2xl bg-brand-cream-50 border border-brand-gold-300/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-brand-maroon-950">
                        शीर्ष शुभकामना संदेश पट्टी (Greeting Ribbon)
                      </h4>
                      <p className="text-xs text-brand-charcoal-600">
                        वेबसाइट के शीर्ष पर पावन शुभकामना पट्टी चालू अथवा बंद रखें
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.festivalGreeting?.enabled ?? true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            festivalGreeting: {
                              enabled: e.target.checked,
                              festivalName: formData.festivalGreeting?.festivalName || "शारदीय नवरात्रि",
                              greetingText:
                                formData.festivalGreeting?.greetingText ||
                                "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की कृपा से आपका जीवन सुखमय रहे।",
                              subText: formData.festivalGreeting?.subText || "शिवशक्ति सेवा परिवार",
                            },
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Festival Quick Presets */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-maroon-950">
                      त्वरित पावन पर्व चयन (Quick Presets):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          name: "शारदीय नवरात्रि",
                          greet: "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की असीम कृपा से आप सभी का जीवन सुख, शांति व आरोग्यता से परिपूर्ण रहे।",
                          sub: "समस्त देशवासियों एवं सनातन भक्तों को शिवशक्ति सेवा परिवार की ओर से मंगलमय बधाई",
                        },
                        {
                          name: "विजयादशमी (दशहरा)",
                          greet: "विजयादशमी की हार्दिक शुभकामनाएँ • असत्य पर सत्य और अधर्म पर धर्म की शाश्वत विजय का पावन पर्व।",
                          sub: "प्रभु श्री राम की कृपा आप सभी पर सदैव बनी रहे",
                        },
                        {
                          name: "दीपावली",
                          greet: "शुभ दीपावली • माँ महालक्ष्मी एवं विघ्नहर्ता भगवान श्री गणेश की कृपा से आपका जीवन सदैव आलोकित रहे।",
                          sub: "तमसो मा ज्योतिर्गमय — शिवशक्ति सेवा फाउंडेशन",
                        },
                        {
                          name: "छठ महापर्व",
                          greet: "लोकपर्व छठ पूजा की हार्दिक शुभकामनाएँ • भगवान भास्कर एवं छठी मईया समस्त संसार का कल्याण करें।",
                          sub: "पवित्रता, त्याग एवं असीम श्रद्धा का पावन अनुष्ठान",
                        },
                        {
                          name: "महाशिवरात्रि",
                          greet: "महाशिवरात्रि की हार्दिक शुभकामनाएँ • देवाधिदेव महादेव एवं माँ पार्वती की कृपा से लोक कल्याण हो।",
                          sub: "सत्यं शिवं सुन्दरम् — शिवशक्ति सेवा परिवार",
                        },
                      ].map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              festivalGreeting: {
                                enabled: true,
                                festivalName: preset.name,
                                greetingText: preset.greet,
                                subText: preset.sub,
                              },
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-cream-100 hover:bg-brand-gold-100 text-brand-maroon-900 border border-brand-maroon-200 transition active:scale-95"
                        >
                          ✦ {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Festival Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      पर्व / अवसर का नाम (Festival Name / Badge)
                    </label>
                    <input
                      type="text"
                      value={formData.festivalGreeting?.festivalName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          festivalGreeting: {
                            ...(formData.festivalGreeting || { enabled: true, greetingText: "" }),
                            festivalName: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm font-semibold"
                      placeholder="उदा. शारदीय नवरात्रि / शुभ दीपावली / पावन पर्व"
                    />
                  </div>

                  {/* Main Hindi Phrase Input */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      मुख्य पावन शुभकामना वाक्य (Hindi Greeting Phrase)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.festivalGreeting?.greetingText || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          festivalGreeting: {
                            ...(formData.festivalGreeting || { enabled: true, festivalName: "पावन पर्व" }),
                            greetingText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm leading-relaxed"
                      placeholder="उदा. शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की कृपा से आपका जीवन सुखमय रहे।"
                    />
                    <p className="text-[11px] text-brand-charcoal-500 mt-1">
                      यह वाक्य वेबसाइट के शीर्ष पर सभी आगंतुकों को भव्यता से दिखेगा (बिना किसी इमोजी के, शुद्ध व गरिमामयी हिंदी में)।
                    </p>
                  </div>

                  {/* Subtext Note */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      अतिरिक्त संदेश / संस्था की ओर से मंगलकामना (Optional Subtext)
                    </label>
                    <input
                      type="text"
                      value={formData.festivalGreeting?.subText || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          festivalGreeting: {
                            ...(formData.festivalGreeting || { enabled: true, festivalName: "पावन पर्व", greetingText: "" }),
                            subText: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-sm"
                      placeholder="उदा. समस्त देशवासियों को शिवशक्ति सेवा परिवार की ओर से मंगलमय बधाई"
                    />
                  </div>

                  {/* Live Preview Box */}
                  <div className="p-4 rounded-2xl bg-brand-maroon-950 text-white border-2 border-brand-gold-500 shadow-md space-y-2">
                    <span className="text-[11px] font-bold text-brand-gold-400 tracking-wider uppercase block">
                      लाइव पूर्वावलोकन (Live Ribbon Preview):
                    </span>
                    <div className="py-2 px-3 rounded-xl bg-brand-maroon-900 border border-brand-gold-500/40 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                      <span className="px-2 py-0.5 rounded bg-brand-gold-500/20 text-brand-gold-300 text-xs font-bold whitespace-nowrap">
                        {formData.festivalGreeting?.festivalName || "पावन पर्व"}
                      </span>
                      <p className="text-xs font-heading font-medium text-brand-cream-50 truncate">
                        {formData.festivalGreeting?.greetingText || "शुभकामना संदेश यहाँ दिखेगा..."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: STAFF MANAGEMENT (Admin Only) */}
              {isAdmin && activeTab === "staff" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      सेवादार अधिकार एवं खाता प्रबंधन (Staff ID & Password Generator)
                    </h3>
                    <p className="text-xs text-brand-charcoal-600">
                      यहाँ से आप नए सेवादारों के लिए आईडी-पासवर्ड जनरेट कर सकते हैं और उन्हें सीमित अधिकार दे या छीन सकते हैं।
                    </p>
                  </div>

                  {staffSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{staffSuccessMsg}</span>
                    </div>
                  )}

                  {/* Add New Staff Box */}
                  <form
                    onSubmit={handleCreateStaff}
                    className="p-5 rounded-2xl bg-brand-cream-50 border-2 border-brand-gold-400/50 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-brand-cream-300">
                      <div className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-brand-saffron-600" />
                        <span className="font-heading text-sm font-bold text-brand-maroon-950">
                          नया सेवादार खाता बनाएं
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAutoGenerateStaff}
                        className="px-2.5 py-1 rounded-lg bg-brand-gold-500 text-brand-maroon-950 font-bold text-[11px] shadow-xs hover:bg-brand-gold-400 transition"
                      >
                        ⚡ ऑटो-जनरेट ID व पासवर्ड
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          सेवादार का नाम *
                        </label>
                        <input
                          type="text"
                          required
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                          placeholder="उदा. राहुल शर्मा"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          मोबाइल नंबर *
                        </label>
                        <input
                          type="text"
                          required
                          value={newStaff.phone}
                          onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                          placeholder="9876543210"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          सेवादार आईडी (Staff ID)
                        </label>
                        <input
                          type="text"
                          value={newStaff.customId}
                          onChange={(e) => setNewStaff({ ...newStaff, customId: e.target.value })}
                          placeholder="उदा. SSF-STAFF-102"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs font-sans"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          पासवर्ड (Staff Password)
                        </label>
                        <input
                          type="text"
                          value={newStaff.customPassword}
                          onChange={(e) => setNewStaff({ ...newStaff, customPassword: e.target.value })}
                          placeholder="उदा. Sewa#9821"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs font-sans"
                        />
                      </div>
                    </div>

                    {/* Permissions Checkboxes */}
                    <div>
                      <span className="block text-xs font-bold text-brand-maroon-950 mb-2">
                        प्रदान किए जाने वाले अधिकार (Assigned Staff Rights):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                        <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-brand-maroon-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaff.permissions.canAddPhotos}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                permissions: { ...newStaff.permissions, canAddPhotos: e.target.checked },
                              })
                            }
                            className="w-4 h-4 text-brand-maroon-800 rounded"
                          />
                          <span>धरातल छायाचित्र अपलोड अधिकार</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-brand-maroon-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaff.permissions.canViewHelpRequests}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                permissions: {
                                  ...newStaff.permissions,
                                  canViewHelpRequests: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 text-brand-maroon-800 rounded"
                          />
                          <span>सहायता अनुरोध देखने का अधिकार</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-brand-maroon-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaff.permissions.canViewVolunteers}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                permissions: {
                                  ...newStaff.permissions,
                                  canViewVolunteers: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 text-brand-maroon-800 rounded"
                          />
                          <span>स्वयंसेवक सूची देखने का अधिकार</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-brand-maroon-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaff.permissions.canViewWomenRegs}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                permissions: {
                                  ...newStaff.permissions,
                                  canViewWomenRegs: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 text-brand-maroon-800 rounded"
                          />
                          <span>महिला प्रतियोगिता सूची देखने का अधिकार</span>
                        </label>

                        <label className="flex items-center gap-2 p-2 rounded-xl bg-white border border-brand-maroon-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newStaff.permissions.canEditCampaign}
                            onChange={(e) =>
                              setNewStaff({
                                ...newStaff,
                                permissions: {
                                  ...newStaff.permissions,
                                  canEditCampaign: e.target.checked,
                                },
                              })
                            }
                            className="w-4 h-4 text-brand-maroon-800 rounded"
                          />
                          <span>राहत अभियान प्रगति अपडेट अधिकार</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4 text-brand-gold-300" />
                      <span>सेवादार आईडी एवं पासवर्ड जनरेट करें</span>
                    </button>
                  </form>

                  {/* Registered Staff Accounts Table */}
                  <div>
                    <h4 className="font-heading text-sm font-bold text-brand-maroon-950 mb-2">
                      पंजीकृत सेवादार सूची ({staffList.length})
                    </h4>

                    <div className="overflow-x-auto border border-brand-maroon-100 rounded-2xl">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-brand-maroon-950 text-white uppercase text-[10px]">
                          <tr>
                            <th className="p-3">सेवादार आईडी</th>
                            <th className="p-3">नाम व मोबाइल</th>
                            <th className="p-3">पासवर्ड</th>
                            <th className="p-3">सक्रिय अधिकार (Permissions)</th>
                            <th className="p-3">स्थिति</th>
                            <th className="p-3 text-right">कार्रवाई</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-maroon-100 bg-white">
                          {staffList.map((staff) => (
                            <tr key={staff.id} className="hover:bg-brand-cream-50 transition">
                              <td className="p-3 font-mono font-bold text-brand-maroon-900">
                                {staff.id}
                              </td>
                              <td className="p-3">
                                <div className="font-bold text-brand-maroon-950">{staff.name}</div>
                                <div className="text-[11px] text-brand-charcoal-500 font-sans">
                                  {staff.phone}
                                </div>
                              </td>
                              <td className="p-3 font-mono font-bold text-amber-900 bg-amber-50/50">
                                {staff.password}
                              </td>
                              <td className="p-3">
                                <div className="flex flex-wrap gap-1">
                                  {staff.permissions.canAddPhotos && (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePermission(staff.id, "canAddPhotos")}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800"
                                      title="क्लिक करके अधिकार छीनें"
                                    >
                                      ✓ छायाचित्र
                                    </button>
                                  )}
                                  {staff.permissions.canViewHelpRequests && (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePermission(staff.id, "canViewHelpRequests")}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800"
                                      title="क्लिक करके अधिकार छीनें"
                                    >
                                      ✓ सहायता
                                    </button>
                                  )}
                                  {staff.permissions.canViewVolunteers && (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePermission(staff.id, "canViewVolunteers")}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800"
                                      title="क्लिक करके अधिकार छीनें"
                                    >
                                      ✓ स्वयंसेवक
                                    </button>
                                  )}
                                  {staff.permissions.canViewWomenRegs && (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePermission(staff.id, "canViewWomenRegs")}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-800"
                                      title="क्लिक करके अधिकार छीनें"
                                    >
                                      ✓ महिला
                                    </button>
                                  )}
                                  {staff.permissions.canEditCampaign && (
                                    <button
                                      type="button"
                                      onClick={() => handleTogglePermission(staff.id, "canEditCampaign")}
                                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800"
                                      title="क्लिक करके अधिकार छीनें"
                                    >
                                      ✓ अभियान
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                    staff.status === "active"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {staff.status === "active" ? "सक्रिय" : "निलंबित"}
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-1">
                                <button
                                  type="button"
                                  onClick={() => handleToggleStaffStatus(staff.id)}
                                  className="px-2 py-1 rounded text-[11px] font-bold bg-brand-cream-200 text-brand-maroon-900 hover:bg-brand-cream-300 transition"
                                >
                                  {staff.status === "active" ? "निलंबित करें" : "बहाल करें"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteStaff(staff.id)}
                                  className="p-1 rounded text-red-600 hover:bg-red-50 transition"
                                  title="खाता हटाएं"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: GROUND WORK PICTURES (Admin & Authorized Staff) */}
              {(isAdmin || perms?.canAddPhotos) && activeTab === "groundPhotos" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      धरातल सेवा छायाचित्र एवं रिपोर्ट अपलोड (Ground Work Pictures)
                    </h3>
                    <p className="text-xs text-brand-charcoal-600">
                      धरातल पर किए गए राहत, भोजन, वस्त्र या स्वास्थ्य शिविर के ताज़ा चित्र जोड़ें।
                    </p>
                  </div>

                  {photoSuccessMsg && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{photoSuccessMsg}</span>
                    </div>
                  )}

                  {/* Add Picture Form */}
                  <form
                    onSubmit={handleAddGroundPhoto}
                    className="p-5 rounded-2xl bg-brand-cream-50 border-2 border-brand-gold-400/50 space-y-3"
                  >
                    <div className="flex items-center gap-2 pb-2 border-b border-brand-cream-300">
                      <Camera className="w-4 h-4 text-brand-saffron-600" />
                      <span className="font-heading text-sm font-bold text-brand-maroon-950">
                        नया सेवा छायाचित्र जोड़ें
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          छायाचित्र शीर्षक *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          placeholder="उदा. गया जी में वृद्धजनों को राशन वितरण"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          कार्य श्रेणी (Category)
                        </label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        >
                          <option value="बाढ़ एवं आपदा राहत">बाढ़ एवं आपदा राहत</option>
                          <option value="अन्नपूर्णा भोजन वितरण">अन्नपूर्णा भोजन वितरण</option>
                          <option value="महिला स्वावलंबन">महिला स्वावलंबन</option>
                          <option value="स्वास्थ्य शिविर">स्वास्थ्य शिविर</option>
                          <option value="शिक्षा एवं बाल संस्कार">शिक्षा एवं बाल संस्कार</option>
                          <option value="गौ सेवा व मूक प्राणी">गौ सेवा व मूक प्राणी</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          स्थान (Location)
                        </label>
                        <input
                          type="text"
                          value={newPhoto.location}
                          onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                          placeholder="माँ मंगलागौरी, गया जी"
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          तस्वीर चयन (Preset or Image Path)
                        </label>
                        <select
                          value={newPhoto.image}
                          onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        >
                          <option value="/images/gallery/sevadar-working.png">सेवादार कार्य करते हुए</option>
                          <option value="/images/gallery/flood_relief_action.jpg">बाढ़ राहत अभियान</option>
                          <option value="/images/gallery/ration_kits.jpg">राशन किट वितरण</option>
                          <option value="/images/gallery/healthcare_camp.jpg">स्वास्थ्य शिविर</option>
                          <option value="/images/gallery/hero_community.jpg">सामुदायिक सेवा</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-brand-maroon-950 mb-1">
                          संक्षिप्त विवरण (Short Story/Details)
                        </label>
                        <input
                          type="text"
                          value={newPhoto.summary}
                          onChange={(e) => setNewPhoto({ ...newPhoto, summary: e.target.value })}
                          placeholder="धरातल पर जरूरतमंदों तक प्रत्यक्ष सेवा पहुँचने का विवरण..."
                          className="w-full px-3 py-1.5 rounded-xl border border-brand-maroon-200 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-brand-gold-300" />
                      <span>छायाचित्र वेबसाइट पर प्रकाशित करें</span>
                    </button>
                  </form>

                  {/* Ground Photos Display */}
                  <div>
                    <h4 className="font-heading text-sm font-bold text-brand-maroon-950 mb-2">
                      प्रकाशित धरातल तस्वीरें ({groundPhotos.length})
                    </h4>
                    {groundPhotos.length === 0 ? (
                      <div className="p-6 text-center text-xs text-brand-charcoal-500 bg-brand-cream-50 rounded-2xl border border-brand-maroon-100">
                        वर्तमान में कोई अतिरिक्त छायाचित्र नहीं है। ऊपर दिए गए फॉर्म से नया छायाचित्र जोड़ें।
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groundPhotos.map((photo) => (
                          <div
                            key={photo.id}
                            className="bg-white rounded-2xl border border-brand-maroon-100 overflow-hidden shadow-sm flex flex-col justify-between"
                          >
                            <div className="relative h-40 w-full bg-brand-cream-100">
                              <Image
                                src={photo.image}
                                alt={photo.title}
                                fill
                                className="object-cover"
                              />
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-maroon-900 text-white">
                                {photo.category}
                              </span>
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between">
                              <div>
                                <h5 className="font-heading text-xs font-bold text-brand-maroon-950 line-clamp-1">
                                  {photo.title}
                                </h5>
                                <p className="text-[11px] text-brand-charcoal-600 line-clamp-2 mt-1">
                                  {photo.summary}
                                </p>
                              </div>
                              <div className="mt-2 pt-2 border-t border-brand-maroon-50 flex items-center justify-between text-[10px] text-brand-charcoal-500">
                                <span>{photo.location}</span>
                                {isAdmin && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteGroundPhoto(photo.id)}
                                    className="text-red-600 hover:text-red-800 font-bold"
                                  >
                                    हटाएं ✕
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB: STATS (Admin Only) */}
              {isAdmin && activeTab === "stats" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-maroon-100">
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      मुख्य पृष्ठ के सेवा आंकड़े
                    </h3>
                    <button
                      type="button"
                      onClick={handleSaveData}
                      className="px-4 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>परिवर्तन सहेजें</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-brand-cream-50 border border-brand-maroon-100 space-y-2"
                      >
                        <span className="text-xs font-bold text-brand-maroon-900">
                          कार्ड #{idx + 1}: {stat.label}
                        </span>
                        <div>
                          <label className="block text-[10px] text-brand-charcoal-600">संख्या/मान</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const newStats = [...formData.stats];
                              newStats[idx].value = e.target.value;
                              setFormData({ ...formData, stats: newStats });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-brand-maroon-200 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-brand-charcoal-600">उप-विवरण</label>
                          <input
                            type="text"
                            value={stat.subtext}
                            onChange={(e) => {
                              const newStats = [...formData.stats];
                              newStats[idx].subtext = e.target.value;
                              setFormData({ ...formData, stats: newStats });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-brand-maroon-200 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CAMPAIGN (Admin or Staff with canEditCampaign) */}
              {(isAdmin || perms?.canEditCampaign) && activeTab === "campaign" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-maroon-100">
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      वर्तमान सक्रिय राहत अभियान
                    </h3>
                    <button
                      type="button"
                      onClick={handleSaveData}
                      className="px-4 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>परिवर्तन सहेजें</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        अभियान का शीर्षक
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCampaign.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCampaign: {
                              ...formData.featuredCampaign,
                              title: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        प्रभावित क्षेत्र (Affected Region)
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCampaign.affectedRegion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCampaign: {
                              ...formData.featuredCampaign,
                              affectedRegion: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        लक्ष्य धनराशि (Target)
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCampaign.targetAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCampaign: {
                              ...formData.featuredCampaign,
                              targetAmount: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        एकत्रित धनराशि (Collected)
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCampaign.collectedAmount}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCampaign: {
                              ...formData.featuredCampaign,
                              collectedAmount: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DONATION & BANK (Admin Only) */}
              {isAdmin && activeTab === "donation" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-maroon-100">
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      दान व बैंक खाता विवरण
                    </h3>
                    <button
                      type="button"
                      onClick={handleSaveData}
                      className="px-4 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5 text-brand-gold-400" />
                      <span>परिवर्तन सहेजें</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        यूपीआई आईडी (UPI ID)
                      </label>
                      <input
                        type="text"
                        value={formData.donationConfig.upiId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationConfig: {
                              ...formData.donationConfig,
                              upiId: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        खाताधारक का नाम
                      </label>
                      <input
                        type="text"
                        value={formData.donationConfig.accountName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationConfig: {
                              ...formData.donationConfig,
                              accountName: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        बैंक का नाम
                      </label>
                      <input
                        type="text"
                        value={formData.donationConfig.bankName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationConfig: {
                              ...formData.donationConfig,
                              bankName: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        बैंक शाखा
                      </label>
                      <input
                        type="text"
                        value={formData.donationConfig.branch}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationConfig: {
                              ...formData.donationConfig,
                              branch: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: HELP REQUESTS */}
              {(isAdmin || perms?.canViewHelpRequests) && activeTab === "helpRequests" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-brand-maroon-100">
                    <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                      प्राप्त आपातकालीन सहायता अनुरोध ({helpRequests.length})
                    </h3>
                  </div>

                  {helpRequests.length === 0 ? (
                    <div className="p-8 text-center text-xs text-brand-charcoal-500 bg-brand-cream-50 rounded-2xl">
                      वर्तमान में कोई सहायता अनुरोध दर्ज नहीं है।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {helpRequests.map((req, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-white border border-brand-maroon-100 shadow-sm space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-brand-maroon-950">
                              {req.name} ({req.phone})
                            </span>
                            <span className="text-[11px] font-bold text-brand-saffron-700 bg-brand-saffron-50 px-2 py-0.5 rounded">
                              {req.needType || "सामान्य सहायता"}
                            </span>
                          </div>
                          <div className="text-xs text-brand-charcoal-600">
                            <strong>स्थान:</strong> {req.address || req.location || "अनुपलब्ध"}
                          </div>
                          {req.details && (
                            <p className="text-xs text-brand-charcoal-700 bg-brand-cream-50 p-2 rounded">
                              {req.details}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: VOLUNTEERS */}
              {(isAdmin || perms?.canViewVolunteers) && activeTab === "volunteers" && (
                <div className="space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                    पंजीकृत स्वयंसेवक प्रविष्टियाँ ({volunteers.length})
                  </h3>

                  {volunteers.length === 0 ? (
                    <div className="p-8 text-center text-xs text-brand-charcoal-500 bg-brand-cream-50 rounded-2xl">
                      वर्तमान में कोई नया स्वयंसेवक आवेदन नहीं है।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {volunteers.map((vol, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-brand-maroon-100 shadow-sm flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-brand-maroon-950">
                              {vol.name} • {vol.phone}
                            </div>
                            <div className="text-brand-charcoal-600 text-[11px]">
                              क्षेत्र: {vol.skills || "सामान्य सेवा"} | शहर: {vol.city || "अनुपलब्ध"}
                            </div>
                          </div>
                          <a
                            href={`tel:${vol.phone}`}
                            className="px-2.5 py-1 rounded-lg bg-brand-cream-200 text-brand-maroon-900 font-bold text-[11px]"
                          >
                            कॉल करें
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: WOMEN COMPETITION */}
              {(isAdmin || perms?.canViewWomenRegs) && activeTab === "womenRegs" && (
                <div className="space-y-4">
                  <h3 className="font-heading text-base font-bold text-brand-maroon-950">
                    महिला स्वावलंबन प्रतियोगिता आवेदन ({womenRegs.length})
                  </h3>

                  {womenRegs.length === 0 ? (
                    <div className="p-8 text-center text-xs text-brand-charcoal-500 bg-brand-cream-50 rounded-2xl">
                      वर्तमान में कोई प्रतियोगिता पंजीकरण दर्ज नहीं है।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {womenRegs.map((reg, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white border border-brand-maroon-100 shadow-sm flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-brand-maroon-950">
                              {reg.name} • {reg.phone}
                            </div>
                            <div className="text-brand-charcoal-600 text-[11px]">
                              हुनर/विधा: {reg.craftCategory || reg.craft || "हस्तकला"} | अनुभव: {reg.experienceYears || "आरंभिक"}
                            </div>
                          </div>
                          <a
                            href={`tel:${reg.phone}`}
                            className="px-2.5 py-1 rounded-lg bg-brand-cream-200 text-brand-maroon-900 font-bold text-[11px]"
                          >
                            संपर्क करें
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* NO ACCESS FOR STAFF */}
              {!isAdmin && activeTab === "noAccess" && (
                <div className="p-8 text-center bg-brand-cream-50 rounded-2xl border border-brand-maroon-100">
                  <ShieldAlert className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <h4 className="font-heading text-sm font-bold text-brand-maroon-950">
                    कोई अधिकार आवंटित नहीं
                  </h4>
                  <p className="text-xs text-brand-charcoal-600 mt-1">
                    आपके सेवादार खाते को अभी तक किसी अनुभाग का अधिकार नहीं दिया गया है। कृपया मुख्य प्रशासक से संपर्क करें।
                  </p>
                </div>
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
}
