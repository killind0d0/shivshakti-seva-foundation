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
  ArrowRight,
  ArrowLeft,
  Home,
  ChevronRight,
  PhoneCall,
  Flame,
  ShieldCheck,
} from "lucide-react";

export type TabKey =
  | "home"
  | "about"
  | "services"
  | "help"
  | "donate"
  | "events"
  | "volunteer"
  | "all";

interface SectionNavHubProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey, anchorId?: string) => void;
  onOpenHelp: () => void;
  onOpenDonation: () => void;
}

export interface NavTabItem {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  title: string;
  description: string;
  nextTab?: TabKey;
  nextLabel?: string;
  prevTab?: TabKey;
  prevLabel?: string;
}

export const navTabsConfig: Record<TabKey, NavTabItem> = {
  home: {
    key: "home",
    label: "मुख्य पृष्ठ",
    icon: <Home className="w-4 h-4 text-brand-maroon-700" />,
    title: "शिवशक्ति सेवा फाउंडेशन — मुख्य प्रवेश द्वार",
    description: "मानव सेवा, करुणा एवं सामाजिक उत्थान हेतु समर्पित पावन न्यास",
  },
  about: {
    key: "about",
    label: "हमारे बारे में",
    icon: <Award className="w-4 h-4 text-purple-600" />,
    badge: "विज़न",
    title: "हमारे बारे में — परिचय, इतिहास एवं संस्थापक संदेश",
    description: "संस्था का पावन उद्देश्य, ४ सेवा स्तंभ, विकास यात्रा एवं मुख्य सेवादार आकाश गिरि का संदेश",
    nextTab: "services",
    nextLabel: "सेवा प्रकल्प व धरातल",
    prevTab: "home",
    prevLabel: "मुख्य पृष्ठ",
  },
  services: {
    key: "services",
    label: "सेवा प्रकल्प",
    icon: <HeartHandshake className="w-4 h-4 text-emerald-600" />,
    badge: "१० सेवाएँ",
    title: "सेवा प्रकल्प — जन-कल्याणकारी सेवाएँ एवं धरातलीय कार्य",
    description: "बाढ़ राहत, अन्नदान, निःशुल्क स्वास्थ्य, महिला स्वावलंबन हुनर प्रतियोगिता व राहत अभियान",
    nextTab: "help",
    nextLabel: "सहायता केंद्र",
    prevTab: "about",
    prevLabel: "हमारे बारे में",
  },
  help: {
    key: "help",
    label: "सहायता केंद्र",
    icon: <HeartPulse className="w-4 h-4 text-red-500" />,
    badge: "२४×७",
    title: "सहायता केंद्र — २४×७ आपातकालीन सहायता एवं स्थिति ट्रैकिंग",
    description: "राशन, चिकित्सा, आपदा राहत हेतु ऑनलाइन आवेदन एवं ट्रैकिंग ID से स्थिति जानें",
    nextTab: "donate",
    nextLabel: "सहयोग व दान",
    prevTab: "services",
    prevLabel: "सेवा प्रकल्प",
  },
  donate: {
    key: "donate",
    label: "सहयोग व दान",
    icon: <QrCode className="w-4 h-4 text-amber-600" />,
    badge: "UPI / QR",
    title: "सहयोग व दान — निःस्वार्थ सेवा हेतु अंशदान एवं पारदर्शी लेखा",
    description: "सीधा UPI QR कोड, बैंक विवरण, अंशदान की पवित्र यात्रा एवं पूर्ण वित्तीय शुचिता",
    nextTab: "events",
    nextLabel: "आयोजन व गैलरी",
    prevTab: "help",
    prevLabel: "सहायता केंद्र",
  },
  events: {
    key: "events",
    label: "आयोजन व गैलरी",
    icon: <Calendar className="w-4 h-4 text-blue-600" />,
    badge: "१५ Oct शिविर",
    title: "आयोजन व गैलरी — आगामी स्वास्थ्य शिविर, छायाचित्र एवं समाचार",
    description: "निःशुल्क नेत्र जाँच शिविर RSVP, भारतीय सेवा छायाचित्र दीर्घा एवं आधिकारिक कम्युनिटी",
    nextTab: "volunteer",
    nextLabel: "जुड़ें व संपर्क",
    prevTab: "donate",
    prevLabel: "सहयोग व दान",
  },
  volunteer: {
    key: "volunteer",
    label: "जुड़ें व संपर्क",
    icon: <Users className="w-4 h-4 text-orange-600" />,
    title: "जुड़ें व संपर्क — सेवा संकल्प, स्वयंसेवक पंजीकरण एवं गया जी कार्यालय",
    description: "दैनिक सेवा संकल्प, सेवादार स्वयंसेवक पंजीकरण, संपर्क सूत्र एवं माँ मंगलागौरी कार्यालय",
    nextTab: "home",
    nextLabel: "मुख्य पृष्ठ पर लौटें",
    prevTab: "events",
    prevLabel: "आयोजन व गैलरी",
  },
  all: {
    key: "all",
    label: "सम्पूर्ण पृष्ठ",
    icon: <Layers className="w-4 h-4 text-stone-600" />,
    badge: "विस्तृत",
    title: "शिवशक्ति सेवा फाउंडेशन — सम्पूर्ण विवरण",
    description: "संस्था के सभी विभाग, सेवा प्रकल्प, दान, गैलरी व संपर्क एक ही पृष्ठ पर",
    prevTab: "home",
    prevLabel: "मुख्य पृष्ठ",
  },
};

const navTabsList: NavTabItem[] = [
  navTabsConfig.home,
  navTabsConfig.about,
  navTabsConfig.services,
  navTabsConfig.help,
  navTabsConfig.donate,
  navTabsConfig.events,
  navTabsConfig.volunteer,
  navTabsConfig.all,
];

export default function SectionNavHub({
  activeTab,
  onSelectTab,
  onOpenHelp,
  onOpenDonation,
}: SectionNavHubProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentTab = navTabsConfig[activeTab] || navTabsConfig.home;

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
      {/* 1. Sticky Tab Navigation Bar (Always visible & pinned below header for instant access) */}
      <nav
        id="section-hub-nav"
        aria-label="खंड नेविगेशन बार"
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-brand-gold-300/80 shadow-md py-2.5 transition-all"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 -mx-1"
          >
            {navTabsList.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  data-tab={tab.key}
                  onClick={() => onSelectTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-brand-maroon-950 text-brand-gold-300 shadow-md scale-102 ring-2 ring-brand-gold-400"
                      : "bg-brand-cream-50 hover:bg-brand-cream-100 text-brand-charcoal-700 hover:text-brand-maroon-900 border border-brand-cream-300"
                  }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] font-sans px-1.5 py-0.2 rounded-full font-bold ${
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

      {/* 2. Top Focused Section Banner (Shown when a specific section is active) */}
      {activeTab !== "home" && activeTab !== "all" && (
        <div className="bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white py-4 px-4 sm:px-8 border-b-2 border-brand-gold-400 shadow-md animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-300 mb-1">
                <button
                  onClick={() => onSelectTab("home")}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>मुख्य पृष्ठ</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold-500" />
                <span className="text-white font-bold">{currentTab.label}</span>
              </div>
              <h2 className="font-heading text-lg sm:text-2xl font-black text-brand-gold-300">
                {currentTab.title}
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream-200 mt-0.5">
                {currentTab.description}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                onClick={() => onSelectTab("home")}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>मुख्य पृष्ठ (Home)</span>
              </button>
              <button
                onClick={() => onSelectTab("all")}
                className="px-3.5 py-1.5 rounded-xl bg-brand-gold-500/20 hover:bg-brand-gold-500/30 text-brand-gold-300 text-xs font-bold border border-brand-gold-400/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>सम्पूर्ण पृष्ठ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Section Overview Gateway Cards (Rendered on Home Tab for Organized 1-Click Access) */}
      {activeTab === "home" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-saffron-600" />
              <span>सुव्यवस्थित सेवा खंड • सहज नेविगेशन</span>
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-brand-maroon-950">
              संस्था के मुख्य विभाग एवं सेवा खंड
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-700 max-w-2xl mx-auto mt-1.5">
              अपनी रुचि या आवश्यकतानुसार संबंधित विभाग चुनें। प्रत्येक खंड अलग और सुव्यवस्थित रूप में प्रदर्शित होगा।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: About Us & Leadership */}
            <div
              onClick={() => onSelectTab("about")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-purple-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    परिचय व विज़न
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-purple-700 transition-colors">
                  हमारे बारे में एवं संस्थापक विज़न
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  संस्था का इतिहास, ४ पावन स्तंभ, विकास यात्रा एवं मुख्य सेवादार आकाश गिरि का संदेश पत्र।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-purple-700">
                <span>संस्था का परिचय देखें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Welfare Programs & Field Work */}
            <div
              onClick={() => onSelectTab("services")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans">
                    10 सेवाएँ
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-emerald-700 transition-colors">
                  सेवा प्रकल्प व धरातल
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  निःशुल्क भोजन, बाढ़ राहत, चिकित्सा शिविर, महिला स्वावलंबन हुनर प्रतियोगिता व राहत कार्य।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>सभी सेवाएँ व धरातल देखें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: 24x7 Help Center & Tracker */}
            <div
              onClick={() => onSelectTab("help")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-red-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <HeartPulse className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-600 text-white animate-pulse font-sans">
                    24×7 आपातकाल
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-red-700 transition-colors">
                  सहायता केंद्र व स्थिति ट्रैकिंग
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  राशन, चिकित्सा या आपातकालीन संबल हेतु ऑनलाइन सहायता आवेदन दर्ज करें या स्थिति ट्रैक करें।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-red-700">
                <span>सहायता मांगें व ट्रैक करें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Donation & Transparency */}
            <div
              onClick={() => onSelectTab("donate")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-saffron-600 text-white">
                    UPI / QR दान
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-amber-800 transition-colors">
                  सहयोग, दान व पारदर्शिता
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  सीधा UPI QR कोड, बैंक विवरण, अंशदान की पवित्र यात्रा, प्रेरणादायी कहानियाँ व पारदर्शी लेखा।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>सहयोग व पारदर्शिता देखें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Events, News & Gallery */}
            <div
              onClick={() => onSelectTab("events")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-sans">
                    15 Oct शिविर
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-blue-800 transition-colors">
                  आयोजन, समाचार व गैलरी
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  आगामी निःशुल्क नेत्र जाँच शिविर RSVP, भारतीय सेवा छायाचित्र दीर्घा, समाचार व व्हाट्सएप कम्युनिटी।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-blue-800">
                <span>शिविर व छायाचित्र देखें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 6: Volunteer & Contact */}
            <div
              onClick={() => onSelectTab("volunteer")}
              className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-brand-cream-300 hover:border-orange-500 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold shadow-xs group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    गया जी कार्यालय
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-orange-800 transition-colors">
                  जुड़ें, स्वयंसेवक बनें व संपर्क
                </h4>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 mt-2 leading-relaxed">
                  दैनिक सेवा संकल्प लें, सेवादार स्वयंसेवक पंजीकरण करें अथवा गया जी स्थित कार्यालय से संपर्क करें।
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-cream-200 flex items-center justify-between text-xs font-bold text-orange-800">
                <span>जुड़ें व संपर्क विवरण देखें</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* 24x7 Emergency Contact Strip */}
          <div className="mt-8 bg-gradient-to-r from-brand-maroon-900 via-brand-maroon-950 to-brand-maroon-900 rounded-2xl p-5 sm:p-6 text-white border-2 border-brand-gold-400 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-xl bg-brand-gold-500 text-brand-maroon-950 flex items-center justify-center font-bold shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-brand-gold-300 font-bold uppercase tracking-wider">
                  २४×७ आपातकालीन सेवा प्रकोष्ठ • गया जी एवं संपूर्ण बिहार
                </div>
                <div className="text-base sm:text-lg font-bold mt-0.5">
                  क्या आपको या किसी परिचित को तत्काल भोजन, चिकित्सा या राहत की आवश्यकता है?
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenHelp}
                className="px-5 py-2.5 rounded-xl bg-white text-brand-maroon-950 font-heading font-bold text-xs sm:text-sm hover:bg-brand-cream-100 shadow-md transition cursor-pointer"
              >
                सहायता अनुरोध भेजें
              </button>
              <a
                href="tel:+919117135379"
                className="px-5 py-2.5 rounded-xl bg-brand-gold-500 text-brand-maroon-950 font-heading font-bold text-xs sm:text-sm hover:bg-brand-gold-400 shadow-md transition text-center"
              >
                📞 91171 35379 पर कॉल करें
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Bottom Navigation Helper for Individual Section Pages
export function SectionFooterNav({
  activeTab,
  onSelectTab,
}: {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}) {
  const current = navTabsConfig[activeTab];
  if (!current || activeTab === "home" || activeTab === "all") return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-brand-cream-300 mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {current.prevTab ? (
          <button
            onClick={() => onSelectTab(current.prevTab!)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-brand-maroon-200 text-brand-maroon-950 hover:bg-brand-cream-50 font-heading font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>पिछला खंड: {current.prevLabel}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => onSelectTab("home")}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-maroon-950 text-brand-gold-300 hover:bg-brand-maroon-900 font-heading font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर वापस जाएँ (Back to Home)</span>
        </button>

        {current.nextTab ? (
          <button
            onClick={() => onSelectTab(current.nextTab!)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-saffron-600 text-white hover:bg-brand-saffron-700 font-heading font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>अगला खंड: {current.nextLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
