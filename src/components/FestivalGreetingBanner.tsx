"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Flame, X, Sun } from "lucide-react";

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

// Built-in calendar Panchang presets if not customized by Admin
const DEFAULT_FESTIVALS = [
  {
    id: "navratri",
    name: "शारदीय नवरात्रि",
    greeting: "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की असीम कृपा से आपका जीवन सुख, शांति व समृद्धि से परिपूर्ण रहे।",
    subText: "समस्त देशवासियों एवं सनातन भक्तों को शिवशक्ति सेवा परिवार की ओर से मंगलमय बधाई",
    date: "2026-10-11",
    before: 2,
    after: 8,
  },
  {
    id: "dussehra",
    name: "विजयादशमी (दशहरा)",
    greeting: "विजयादशमी की हार्दिक शुभकामनाएँ • असत्य पर सत्य और अधर्म पर धर्म की शाश्वत विजय का पावन पर्व।",
    subText: "प्रभु श्री राम की कृपा आप सभी पर सदैव बनी रहे",
    date: "2026-10-20",
    before: 1,
    after: 1,
  },
  {
    id: "diwali",
    name: "दीपावली",
    greeting: "शुभ दीपावली • माँ महालक्ष्मी एवं विघ्नहर्ता भगवान श्री गणेश की कृपा से आपका जीवन सदैव आलोकित रहे।",
    subText: "तमसो मा ज्योतिर्गमय — शिवशक्ति सेवा फाउंडेशन",
    date: "2026-11-08",
    before: 3,
    after: 2,
  },
  {
    id: "chhath",
    name: "छठ महापर्व",
    greeting: "लोकपर्व छठ पूजा की हार्दिक शुभकामनाएँ • भगवान भास्कर एवं छठी मईया समस्त संसार का कल्याण करें।",
    subText: "पवित्रता, त्याग एवं असीम श्रद्धा का पावन अनुष्ठान",
    date: "2026-11-15",
    before: 2,
    after: 2,
  },
];

export default function FestivalGreetingBanner({
  config,
  onOpenAdmin,
}: FestivalGreetingBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeGreeting, setActiveGreeting] = useState<{
    festivalName: string;
    greetingText: string;
    subText?: string;
  } | null>(() => {
    if (config?.enabled === false) return null;
    if (config?.greetingText) {
      return {
        festivalName: config.festivalName || "पावन पर्व",
        greetingText: config.greetingText,
        subText: config.subText,
      };
    }
    return {
      festivalName: "शारदीय नवरात्रि",
      greetingText:
        "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की असीम कृपा से आपका जीवन सुख, शांति व आरोग्यता से परिपूर्ण रहे।",
      subText: "समस्त देशवासियों एवं सनातन भक्तों को शिवशक्ति सेवा परिवार की ओर से मंगलमय बधाई",
    };
  });

  useEffect(() => {
    // If Admin explicitly enabled and configured a greeting
    if (config) {
      if (config.enabled === false) {
        setActiveGreeting(null);
        return;
      }
      if (config.greetingText) {
        setActiveGreeting({
          festivalName: config.festivalName || "पावन पर्व",
          greetingText: config.greetingText,
          subText: config.subText,
        });
        return;
      }
    }

    // Otherwise check URL query parameter ?festival=diwali etc.
    const params = new URLSearchParams(window.location.search);
    const paramFestival = params.get("festival");

    if (paramFestival) {
      if (paramFestival === "none" || paramFestival === "off") {
        setActiveGreeting(null);
        return;
      }
      const found = DEFAULT_FESTIVALS.find(
        (x) => x.id === paramFestival.toLowerCase()
      );
      if (found) {
        setActiveGreeting({
          festivalName: found.name,
          greetingText: found.greeting,
          subText: found.subText,
        });
        return;
      }
    }

    // Auto-detect by calendar date
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
      setActiveGreeting({
        festivalName: detected.name,
        greetingText: detected.greeting,
        subText: detected.subText,
      });
    } else {
      // Default auspicious foundation greeting if in season
      setActiveGreeting({
        festivalName: "शारदीय नवरात्रि",
        greetingText:
          "शारदीय नवरात्रि की पावन शुभकामनाएँ • माँ जगदम्बा की असीम कृपा से आपका जीवन सुख, शांति व आरोग्यता से परिपूर्ण रहे।",
        subText: "शिवशक्ति सेवा परिवार",
      });
    }
  }, [config]);

  if (!activeGreeting || isDismissed) {
    return null;
  }

  return (
    <div
      role="banner"
      aria-label="पावन उत्सव शुभकामना संदेश"
      className="relative z-30 bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white border-b-2 border-brand-gold-500/80 shadow-md select-none transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        {/* Left Sacred Emblem Indicator (Clean Lucide SVG icon, NO emojis) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-brand-gold-500 to-brand-saffron-500 flex items-center justify-center text-brand-maroon-950 shadow-sm flex-shrink-0">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-maroon-950 fill-brand-maroon-950/20" />
          </div>

          {/* Festival Name Badge */}
          <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-md bg-brand-gold-500/20 border border-brand-gold-400/40 text-brand-gold-300 font-bold text-[11px] sm:text-xs whitespace-nowrap">
            {activeGreeting.festivalName}
          </span>

          {/* Desktop & Tablet: Dignified Static Greeting Display */}
          <div className="hidden sm:flex items-center gap-2 min-w-0">
            <p className="font-heading text-xs sm:text-sm font-semibold tracking-wide text-brand-cream-50 leading-tight truncate">
              {activeGreeting.greetingText}
            </p>
            {activeGreeting.subText && (
              <span className="text-[11px] text-brand-gold-300/90 font-normal truncate">
                • {activeGreeting.subText}
              </span>
            )}
          </div>

          {/* Mobile Phone: Smooth Continuous Marquee Scroller (No Truncation) */}
          <div className="sm:hidden overflow-hidden whitespace-nowrap min-w-0 flex-1">
            <div className="animate-festive-marquee flex items-center gap-6 py-0.5">
              <span className="font-heading text-xs font-semibold tracking-wide text-brand-cream-50">
                {activeGreeting.greetingText}
                {activeGreeting.subText ? ` • ${activeGreeting.subText}` : ""}
              </span>
              <span className="text-brand-gold-400 text-xs">✦</span>
              <span className="font-heading text-xs font-semibold tracking-wide text-brand-cream-50">
                {activeGreeting.greetingText}
                {activeGreeting.subText ? ` • ${activeGreeting.subText}` : ""}
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
            aria-label="शुभकामना संदेश पट्टी छिपाएँ"
            title="संदेश पट्टी बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
