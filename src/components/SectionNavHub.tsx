"use client";

import React, { useRef, useEffect } from "react";
import {
  Sparkles,
  HeartHandshake,
  HeartPulse,
  QrCode,
  Calendar,
  Users,
  Award,
  Layers,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

export type TabKey =
  | "all"
  | "about"
  | "services"
  | "help"
  | "donate"
  | "events"
  | "volunteer";

interface SectionNavHubProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenHelp: () => void;
  onOpenDonation: () => void;
}

export interface NavTabItem {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  description: string;
}

const navTabs: NavTabItem[] = [
  {
    key: "all",
    label: "सम्पूर्ण पृष्ठ",
    icon: <Layers className="w-4 h-4" />,
    description: "सभी सेवा खंड एवं विस्तृत विवरण",
  },
  {
    key: "help",
    label: "सहायता केंद्र",
    icon: <HeartPulse className="w-4 h-4 text-red-500" />,
    badge: "24×7",
    description: "आपातकालीन सहायता व अनुरोध ट्रैकिंग",
  },
  {
    key: "donate",
    label: "सहयोग व दान",
    icon: <QrCode className="w-4 h-4 text-amber-600" />,
    badge: "UPI / QR",
    description: "सीधा सहयोग व पारदर्शी लेखा",
  },
  {
    key: "services",
    label: "सेवा प्रकल्प",
    icon: <HeartHandshake className="w-4 h-4 text-emerald-600" />,
    badge: "10 सेवाएँ",
    description: "बाढ़ राहत, भोजन, स्वास्थ्य व सिलाई",
  },
  {
    key: "events",
    label: "आयोजन व समाचार",
    icon: <Calendar className="w-4 h-4 text-blue-600" />,
    badge: "15 Oct शिविर",
    description: "आगामी नेत्र शिविर, समाचार व गैलरी",
  },
  {
    key: "about",
    label: "परिचय व नेतृत्व",
    icon: <Award className="w-4 h-4 text-purple-600" />,
    description: "संस्था का इतिहास, टाइमलाइन व संदेश",
  },
  {
    key: "volunteer",
    label: "जुड़ें व संपर्क",
    icon: <Users className="w-4 h-4 text-orange-600" />,
    description: "दैनिक संकल्प, स्वयंसेवक व पता",
  },
];

export default function SectionNavHub({
  activeTab,
  onSelectTab,
  onOpenHelp,
  onOpenDonation,
}: SectionNavHubProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll active tab into view in horizontal container
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeBtn = scrollContainerRef.current.querySelector(
      `[data-tab="${activeTab}"]`
    ) as HTMLElement | null;
    if (activeBtn) {
      const container = scrollContainerRef.current;
      const scrollLeft =
        activeBtn.offsetLeft -
        container.offsetWidth / 2 +
        activeBtn.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      {/* 1. Quick Access Action Grid (Everything within Reach right below Hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="text-center mb-5">
          <span className="text-xs uppercase tracking-widest font-bold text-brand-maroon-700 block">
            त्वरित सेवा द्वार • सुव्यवस्थित नेविगेशन
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-maroon-950 mt-1">
            आप यहाँ क्या करना चाहते हैं?
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Need Help & Track */}
          <button
            onClick={() => onSelectTab("help")}
            className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
              activeTab === "help"
                ? "bg-red-50/80 border-red-500 shadow-md ring-2 ring-red-400/30"
                : "bg-white border-brand-maroon-100 hover:border-red-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                24×7
              </span>
            </div>
            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-maroon-950 group-hover:text-red-700 transition-colors">
                सहायता चाहिए / ट्रैक करें
              </div>
              <p className="text-xs text-brand-charcoal-500 mt-1 line-clamp-2">
                आपातकालीन सहायता आवेदन व ट्रैकिंग ID से स्थिति जानें
              </p>
            </div>
          </button>

          {/* Card 2: Donate & Impact */}
          <button
            onClick={() => onSelectTab("donate")}
            className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
              activeTab === "donate"
                ? "bg-amber-50/80 border-brand-gold-500 shadow-md ring-2 ring-brand-gold-400/30"
                : "bg-white border-brand-maroon-100 hover:border-brand-gold-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-saffron-600 text-white">
                UPI / QR
              </span>
            </div>
            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-maroon-950 group-hover:text-amber-800 transition-colors">
                सहयोग व दान करें
              </div>
              <p className="text-xs text-brand-charcoal-500 mt-1 line-clamp-2">
                ऑनलाइन QR, बैंक खाता, प्रभाव कैलकुलेटर व प्रमाण पत्र
              </p>
            </div>
          </button>

          {/* Card 3: Welfare Services & Ground Work */}
          <button
            onClick={() => onSelectTab("services")}
            className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
              activeTab === "services"
                ? "bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-400/30"
                : "bg-white border-brand-maroon-100 hover:border-emerald-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-white">
                10 सेवाएँ
              </span>
            </div>
            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-maroon-950 group-hover:text-emerald-800 transition-colors">
                सेवा प्रकल्प व धरातल
              </div>
              <p className="text-xs text-brand-charcoal-500 mt-1 line-clamp-2">
                बाढ़ राहत, अन्नदान, महिला स्वावलंबन व पहले/बाद का प्रभाव
              </p>
            </div>
          </button>

          {/* Card 4: Upcoming Events & News */}
          <button
            onClick={() => onSelectTab("events")}
            className={`p-4 rounded-2xl text-left border-2 transition-all duration-300 group flex flex-col justify-between cursor-pointer ${
              activeTab === "events"
                ? "bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-400/30"
                : "bg-white border-brand-maroon-100 hover:border-blue-400 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-700 text-white">
                15 Oct
              </span>
            </div>
            <div>
              <div className="font-heading font-bold text-sm sm:text-base text-brand-maroon-950 group-hover:text-blue-800 transition-colors">
                नेत्र शिविर व समाचार
              </div>
              <p className="text-xs text-brand-charcoal-500 mt-1 line-clamp-2">
                निःशुल्क स्वास्थ्य शिविर RSVP, लाइव उलटी गिनती व गैलरी
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Sticky Tab Bar - Pinned below the main header */}
      <nav
        id="section-hub-nav"
        aria-label="खंड नेविगेशन बार"
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-brand-gold-300/80 shadow-md py-2.5 transition-all"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 -mx-1"
          >
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  data-tab={tab.key}
                  onClick={() => onSelectTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-maroon-950 text-brand-gold-300 shadow-md scale-102 ring-2 ring-brand-gold-400"
                      : "bg-brand-cream-50 hover:bg-brand-cream-100 text-brand-charcoal-700 hover:text-brand-maroon-900 border border-brand-cream-300"
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? "bg-brand-gold-400 text-brand-maroon-950"
                          : "bg-brand-cream-200 text-brand-maroon-900"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
