"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  Truck,
  PhoneCall,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";

interface HelpRequestRecord {
  requestId?: string;
  name: string;
  phone: string;
  location: string;
  needType: string;
  date: string;
  status?: string;
  details?: string;
}

const sampleRequests: HelpRequestRecord[] = [
  {
    requestId: "SSF-2026-849201",
    name: "रामेश्वर प्रसाद",
    phone: "9876543210",
    location: "बोधगया, गया जी (बिहार)",
    needType: "बाढ़ एवं आपदा राहत (राशन किट)",
    date: "२८ सितम्बर २०२६",
    status: "सहायता सम्पन्न",
    details: "राहत दल द्वारा सूखा राशन पैकेट एवं तिरपाल परिवार तक सकुशल पहुँचाया गया।",
  },
  {
    requestId: "SSF-2026-318492",
    name: "श्रीमती कालिंदी देवी",
    phone: "9123456789",
    location: "माँ मंगलागौरी बस्ती, गया",
    needType: "महिला विकास एवं सिलाई प्रशिक्षण",
    date: "२९ सितम्बर २०२६",
    status: "सेवा दल प्रेषित",
    details: "कौशल प्रशिक्षण केंद्र में पंजीकरण पूर्ण, आगामी बैच में कार्यशाला किट आबंटित।",
  },
];

export default function HelpTracker({ onOpenHelpModal }: { onOpenHelpModal?: () => void }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<HelpRequestRecord | null>(null);
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const normalizeRecord = (item: any): HelpRequestRecord => {
    return {
      requestId:
        item.requestId ||
        item.trackingId ||
        (typeof item.id === "string" && item.id.startsWith("SSF-") ? item.id : undefined),
      name: item.name || item.donorName || "अनुरोधकर्ता",
      phone: item.phone || item.mobile || "",
      location: item.location || item.city || item.address || "लागू नहीं",
      needType: item.needType || item.serviceType || item.category || "सहायता अनुरोध",
      date:
        item.date ||
        (item.createdAt
          ? new Date(item.createdAt).toLocaleDateString("hi-IN")
          : new Date().toLocaleDateString("hi-IN")),
      status: item.status || "प्राप्त हुआ (जाँच जारी)",
      details: item.details || item.message || item.notes || "",
    };
  };

  const searchLocalStorage = (cleanQuery: string): HelpRequestRecord | null => {
    try {
      const stored: any[] = JSON.parse(
        localStorage.getItem("ssf_help_requests") || "[]"
      );
      const allRecords = [...stored, ...sampleRequests];
      const qLower = cleanQuery.toLowerCase();
      const cleanPhone = cleanQuery.replace(/\D/g, "");

      const found = allRecords.find((rec) => {
        const recId = (
          rec.requestId ||
          rec.trackingId ||
          (typeof rec.id === "string" ? rec.id : "")
        ).toLowerCase();
        const idMatch = recId === qLower;
        const recPhone = (rec.phone || rec.mobile || "").replace(/\D/g, "");
        const phoneMatch = cleanPhone.length >= 10 && recPhone === cleanPhone;
        return idMatch || phoneMatch;
      });

      return found ? normalizeRecord(found) : null;
    } catch {
      return null;
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setIsSearching(true);
    setSearched(true);

    let match: HelpRequestRecord | null = null;

    try {
      const res = await fetch(
        `/api/track?id=${encodeURIComponent(cleanQuery)}&phone=${encodeURIComponent(cleanQuery)}`
      );
      if (res.ok) {
        const data = await res.json();
        const serverRecord =
          data.request ||
          data.data ||
          data.submission ||
          data.record ||
          (data.requestId || data.trackingId ? data : null);
        if (serverRecord) {
          match = normalizeRecord(serverRecord);
        }
      }
    } catch (err) {
      console.warn("Track API unreachable, searching local storage:", err);
    }

    if (!match) {
      // Fallback to local storage and sample records
      match = searchLocalStorage(cleanQuery);
    }

    setResult(match);
    setIsSearching(false);
  };

  const getStepStatus = (status?: string) => {
    if (!status) return 1;
    if (status.includes("सम्पन्न") || status.includes("पहुँचाई")) return 4;
    if (status.includes("प्रेषित") || status.includes("प्रगति")) return 3;
    if (status.includes("जाँच") || status.includes("समीक्षा")) return 2;
    return 1;
  };

  const currentStep = getStepStatus(result?.status);

  return (
    <section id="anurodh-stithi" className="py-14 bg-brand-cream-50/50 border-t border-b border-brand-gold-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-100 border border-brand-gold-300 text-brand-maroon-900 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-saffron-600" />
            <span>पारदर्शी सहायता अनुश्रवण प्रणाली</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading text-brand-maroon-950 font-bold">
            सहायता अनुरोध स्थिति (Help Tracker)
          </h2>
          <p className="text-xs sm:text-sm text-brand-maroon-700 mt-1">
            अपने अनुरोध क्रमांक (Tracking ID) अथवा पंजीकृत मोबाइल नंबर से स्थिति जानें
          </p>
          <TraditionalDivider />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-brand-maroon-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="उदा. SSF-2026-849201 या मोबाइल नंबर"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-brand-gold-300 bg-white text-brand-maroon-950 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-saffron-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 rounded-xl bg-brand-saffron-600 hover:bg-brand-saffron-700 text-white font-heading font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isSearching ? (
                <span>खोज रहे हैं...</span>
              ) : (
                <span>स्थिति देखें</span>
              )}
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-[11px] text-brand-maroon-600">
              परीक्षण हेतु उदाहरण:{" "}
              <button
                type="button"
                onClick={() => setQuery("SSF-2026-849201")}
                className="font-mono text-brand-saffron-700 font-bold hover:underline"
              >
                SSF-2026-849201
              </button>
            </span>
          </div>
        </form>

        {/* Results Area */}
        {searched && (
          <div className="max-w-2xl mx-auto animate-fadeIn">
            {result ? (
              <div className="bg-white rounded-2xl border-2 border-brand-gold-300 shadow-xl overflow-hidden p-6 sm:p-8">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-cream-300 pb-4 mb-6">
                  <div>
                    <span className="text-xs text-brand-maroon-600 block">अनुरोध क्रमांक</span>
                    <span className="text-lg font-heading font-bold text-brand-maroon-900 tracking-wider">
                      {result.requestId || "SSF-2026-XXXX"}
                    </span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>{result.status || "सक्रिय अनुरोध"}</span>
                  </div>
                </div>

                {/* 4-Step Pipeline Visual */}
                <div className="mb-8">
                  <div className="grid grid-cols-4 gap-2 text-center relative">
                    {[
                      { step: 1, label: "आवेदन प्राप्त", icon: <CheckCircle2 className="w-5 h-5" /> },
                      { step: 2, label: "सत्यापन एवं जाँच", icon: <Clock className="w-5 h-5" /> },
                      { step: 3, label: "सेवा दल प्रेषित", icon: <Truck className="w-5 h-5" /> },
                      { step: 4, label: "सहायता पूर्ण", icon: <ShieldCheck className="w-5 h-5" /> },
                    ].map((s) => {
                      const isDone = currentStep >= s.step;
                      return (
                        <div key={s.step} className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 transition-all ${
                              isDone
                                ? "bg-emerald-600 text-white shadow-md scale-105"
                                : "bg-brand-cream-200 text-brand-maroon-400"
                            }`}
                          >
                            {s.icon}
                          </div>
                          <span
                            className={`text-[11px] sm:text-xs font-medium ${
                              isDone ? "text-brand-maroon-900 font-bold" : "text-brand-maroon-400"
                            }`}
                          >
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detail Summary */}
                <div className="bg-brand-cream-50 rounded-xl p-4 border border-brand-gold-200 text-xs sm:text-sm space-y-2 text-brand-maroon-950 mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-brand-maroon-600 block text-[11px]">अनुरोधकर्ता:</span>
                      <span className="font-bold">{result.name}</span>
                    </div>
                    <div>
                      <span className="text-brand-maroon-600 block text-[11px]">सहायता वर्ग:</span>
                      <span className="font-bold">{result.needType}</span>
                    </div>
                    <div>
                      <span className="text-brand-maroon-600 block text-[11px]">स्थान / क्षेत्र:</span>
                      <span>{result.location}</span>
                    </div>
                    <div>
                      <span className="text-brand-maroon-600 block text-[11px]">पंजीकरण तिथि:</span>
                      <span>{result.date}</span>
                    </div>
                  </div>
                  {result.details && (
                    <div className="pt-2 border-t border-brand-cream-300">
                      <span className="text-brand-maroon-600 block text-[11px]">कार्य विवरण / टिप्पणी:</span>
                      <span className="italic text-brand-maroon-900">{result.details}</span>
                    </div>
                  )}
                </div>

                {/* Escalation Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-brand-maroon-700 text-center sm:text-left">
                    आपातकालीन स्थिति में हमारे २४×७ सेवा दल से सीधे संपर्क करें:
                  </p>
                  <a
                    href="tel:+919117135379"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-maroon-900 text-white font-bold text-xs hover:bg-brand-maroon-950 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-brand-gold-300" />
                    <span>+91 91171 35379 पर बात करें</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-brand-gold-300 p-8 text-center space-y-4 shadow-md">
                <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
                <h3 className="text-lg font-heading text-brand-maroon-950 font-bold">
                  इस क्रमांक पर कोई अनुरोध नहीं मिला
                </h3>
                <p className="text-xs sm:text-sm text-brand-maroon-700 max-w-md mx-auto">
                  कृपया सही ट्रैकिंग आईडी (उदा. SSF-2026-849201) अथवा वही मोबाइल नंबर दर्ज करें जिससे आवेदन किया गया था।
                </p>
                {onOpenHelpModal && (
                  <button
                    onClick={onOpenHelpModal}
                    className="px-5 py-2.5 rounded-xl bg-brand-saffron-600 text-white font-heading font-bold text-sm hover:bg-brand-saffron-700 transition"
                  >
                    नया सहायता अनुरोध दर्ज करें
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
