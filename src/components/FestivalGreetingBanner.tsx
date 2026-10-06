"use client";

import React, { useState, useEffect } from "react";
import { Flame, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface FestivalGreetingConfig {
  enabled: boolean;
  festivalName: string;
  greetingText: string;
  subText?: string;
}

interface FestivalGreetingBannerProps {
  config?: FestivalGreetingConfig;
  onOpenAdmin?: () => void;
}

// Built-in calendar Panchang presets with dual English & Hindi greetings
const DEFAULT_FESTIVALS = [
  {
    id: "navratri",
    nameHi: "शारदीय नवरात्रि",
    nameEn: "Shardiya Navratri",
    greetingHi: "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की असीम कृपा से आपका जीवन सुख, शांति व समृद्धि से परिपूर्ण रहे।",
    greetingEn: "Sacred Shardiya Navratri Greetings • May the Divine Mother bless you with joy, health, and prosperity.",
    subTextHi: "समस्त देशवासियों एवं सनातन भक्तों को शिवशक्ति सेवा परिवार की ओर से मंगलमय बधाई",
    subTextEn: "Warm blessings to all from the Shivshakti Seva Parivar",
    date: "2026-10-11",
    before: 2,
    after: 8,
  },
  {
    id: "dussehra",
    nameHi: "विजयादशमी (दशहरा)",
    nameEn: "Vijayadashami (Dussehra)",
    greetingHi: "विजयादशमी की हार्दिक शुभकामनाएँ • असत्य पर सत्य और अधर्म पर धर्म की शाश्वत विजय का पावन पर्व।",
    greetingEn: "Warm Vijayadashami Greetings • Celebrating the eternal triumph of righteousness over darkness.",
    subTextHi: "प्रभु श्री राम की कृपा आप सभी पर सदैव बनी रहे",
    subTextEn: "May divine blessings be upon you always",
    date: "2026-10-20",
    before: 1,
    after: 1,
  },
  {
    id: "diwali",
    nameHi: "दीपावली",
    nameEn: "Deepawali",
    greetingHi: "शुभ दीपावली • माँ महालक्ष्मी एवं विघ्नहर्ता भगवान श्री गणेश की कृपा से आपका जीवन सदैव आलोकित रहे।",
    greetingEn: "Happy Deepawali • May the divine light bring eternal peace, wisdom, and abundance into your life.",
    subTextHi: "तमसो मा ज्योतिर्गमय — शिवशक्ति सेवा फाउंडेशन",
    subTextEn: "From darkness unto light — Shivshakti Seva Foundation",
    date: "2026-11-08",
    before: 3,
    after: 2,
  },
  {
    id: "chhath",
    nameHi: "छठ महापर्व",
    nameEn: "Chhath Mahaparv",
    greetingHi: "लोकपर्व छठ पूजा की हार्दिक शुभकामनाएँ • भगवान भास्कर एवं छठी मईया समस्त संसार का कल्याण करें।",
    greetingEn: "Holy Chhath Puja Greetings • Reverence to the Sun God & Divine Mother Chhathi for universal well-being.",
    subTextHi: "पवित्रता, त्याग एवं असीम श्रद्धा का पावन अनुष्ठान",
    subTextEn: "A sacred observance of purity, dedication, and faith",
    date: "2026-11-15",
    before: 2,
    after: 2,
  },
];

export default function FestivalGreetingBanner({
  config,
  onOpenAdmin,
}: FestivalGreetingBannerProps) {
  const { isEn, t } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentFestival, setCurrentFestival] = useState<{
    nameHi: string;
    nameEn: string;
    greetingHi: string;
    greetingEn: string;
    subTextHi?: string;
    subTextEn?: string;
  } | null>(() => {
    if (config?.enabled === false) return null;
    return {
      nameHi: config?.festivalName || DEFAULT_FESTIVALS[0].nameHi,
      nameEn: DEFAULT_FESTIVALS[0].nameEn,
      greetingHi: config?.greetingText || DEFAULT_FESTIVALS[0].greetingHi,
      greetingEn: DEFAULT_FESTIVALS[0].greetingEn,
      subTextHi: config?.subText || DEFAULT_FESTIVALS[0].subTextHi,
      subTextEn: DEFAULT_FESTIVALS[0].subTextEn,
    };
  });

  useEffect(() => {
    if (config) {
      if (config.enabled === false) {
        setCurrentFestival(null);
        return;
      }
      if (config.greetingText) {
        setCurrentFestival({
          nameHi: config.festivalName || "पावन पर्व",
          nameEn: config.festivalName || "Sacred Festival",
          greetingHi: config.greetingText,
          greetingEn: config.greetingText,
          subTextHi: config.subText,
          subTextEn: config.subText,
        });
        return;
      }
    }

    const DAY = 86400000;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const detected = DEFAULT_FESTIVALS.find((x) => {
      const [y, m, d] = x.date.split("-").map(Number);
      const festDate = new Date(y, m - 1, d).getTime();
      return (
        today.getTime() >= festDate - x.before * DAY &&
        today.getTime() <= festDate + x.after * DAY
      );
    });

    if (detected) {
      setCurrentFestival(detected);
    } else {
      setCurrentFestival(DEFAULT_FESTIVALS[0]);
    }
  }, [config]);

  if (!currentFestival || isDismissed) {
    return null;
  }

  const festivalName = isEn ? currentFestival.nameEn : currentFestival.nameHi;
  const greetingText = isEn ? currentFestival.greetingEn : currentFestival.greetingHi;
  const subText = isEn ? currentFestival.subTextEn : currentFestival.subTextHi;

  return (
    <div
      role="banner"
      aria-label={t("पावन उत्सव शुभकामना संदेश", "Festive Greetings Banner")}
      className="relative z-30 bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white border-b-2 border-brand-gold-500/80 shadow-md select-none transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Left Sacred Emblem Indicator */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-brand-gold-500 to-brand-saffron-500 flex items-center justify-center text-brand-maroon-950 shadow-sm flex-shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-maroon-950 fill-brand-maroon-950/20" />
          </div>

          {/* Festival Name Badge */}
          <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-md bg-brand-gold-500/20 border border-brand-gold-400/40 text-brand-gold-300 font-bold text-[11px] sm:text-xs whitespace-nowrap">
            {festivalName}
          </span>

          {/* Desktop & Tablet: Dignified Static Greeting Display */}
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <p className="font-heading text-xs sm:text-sm font-semibold tracking-wide text-brand-cream-50 leading-tight truncate">
              {greetingText}
            </p>
            {subText && (
              <span className="text-[11px] text-brand-gold-300/90 font-normal truncate">
                • {subText}
              </span>
            )}
          </div>

          {/* Mobile Phone: Smooth Continuous Marquee Scroller */}
          <div className="sm:hidden overflow-hidden whitespace-nowrap min-w-0 flex-1">
            <div className="animate-festive-marquee flex items-center gap-6 py-0.5">
              <span className="font-heading text-xs font-semibold tracking-wide text-brand-cream-50">
                {greetingText}
                {subText ? ` • ${subText}` : ""}
              </span>
              <span className="text-brand-gold-400 text-xs">✦</span>
              <span className="font-heading text-xs font-semibold tracking-wide text-brand-cream-50">
                {greetingText}
                {subText ? ` • ${subText}` : ""}
              </span>
              <span className="text-brand-gold-400 text-xs">✦</span>
            </div>
          </div>
        </div>

        {/* Right Action: Close/Dismiss Button */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-brand-cream-300 hover:text-white hover:bg-white/10 transition"
            aria-label={t("शुभकामना संदेश पट्टी छिपाएँ", "Dismiss banner")}
            title={t("संदेश पट्टी बंद करें", "Dismiss banner")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
