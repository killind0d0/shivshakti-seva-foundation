"use client";

import React, { useState } from "react";
import { Sparkles, Waves, MessageCircle, Phone, HeartHandshake, Pause, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TickerItem {
  id: string;
  categoryHi: string;
  categoryEn: string;
  badgeBg: string;
  icon: React.ReactNode;
  textHi: string;
  textEn: string;
  highlightTextHi?: string;
  highlightTextEn?: string;
  actionHref?: string;
  actionTextHi?: string;
  actionTextEn?: string;
}

const tickerItems: TickerItem[] = [
  {
    id: "vishesh-pitripaksha",
    categoryHi: "विशेष कार्यक्रम",
    categoryEn: "Special Event",
    badgeBg: "bg-amber-600 text-white",
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
    textHi: "पितृपक्ष विशेष पूजन एवं जल तर्पण:",
    textEn: "Pitripaksha Sacred Puja & Jal Tarpan:",
    highlightTextHi: "सभी जीव जन्तु, पुण्य आत्माओं एवं प्राणियों के देवताओं हेतु विशेष पूजन, जल तर्पण एवं भोजन वितरण कार्यक्रम।",
    highlightTextEn: "Special prayers, sacred water offering and food distribution for all living beings, departed souls and guardian deities.",
    actionHref: "#vishesh-karyakram",
    actionTextHi: "निःशुल्क नामांकन करें",
    actionTextEn: "Register Free",
  },
  {
    id: "flood-relief",
    categoryHi: "धरातल कार्य",
    categoryEn: "Ground Relief",
    badgeBg: "bg-red-700 text-white",
    icon: <Waves className="w-3.5 h-3.5 text-red-200" />,
    textHi: "आपदा एवं बाढ़ राहत अभियान:",
    textEn: "Disaster & Flood Relief Mission:",
    highlightTextHi: "प्रभावित क्षेत्रों में सूखा राशन किट, आवश्यक वस्त्र एवं प्राथमिक चिकित्सा सामग्री का त्वरित वितरण जारी।",
    highlightTextEn: "Ongoing rapid distribution of dry ration kits, clothing, and first-aid supplies in flood-affected regions.",
    actionHref: "#hamare-abhiyan",
    actionTextHi: "राहत कार्य",
    actionTextEn: "Relief Mission",
  },
  {
    id: "whatsapp",
    categoryHi: "सीधे जुड़ें",
    categoryEn: "Join Us",
    badgeBg: "bg-emerald-700 text-white",
    icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />,
    textHi: "व्हाट्सएप सेवा परिवार:",
    textEn: "WhatsApp Seva Family:",
    highlightTextHi: "आधिकारिक क्यूआर कोड स्कैन कर सीधे सेवा समूह से जुड़ें और ताज़ा गतिविधियों की जानकारी प्राप्त करें।",
    highlightTextEn: "Scan the official QR code to join our community and stay updated with daily field activities.",
    actionHref: "#whatsapp-community",
    actionTextHi: "QR स्कैन करें",
    actionTextEn: "Scan QR",
  },
  {
    id: "helpline",
    categoryHi: "२४×७ सेवा",
    categoryEn: "24×7 Helpline",
    badgeBg: "bg-brand-maroon-800 text-amber-200",
    icon: <Phone className="w-3.5 h-3.5 text-amber-300" />,
    textHi: "आपातकालीन सेवा नंबर:",
    textEn: "Emergency Helpline:",
    highlightTextHi: "किसी भी जरूरतमंद की सहायता हेतु हमें कभी भी संपर्क करें — +91 91171 35379",
    highlightTextEn: "Contact us anytime to assist someone in distress — +91 91171 35379",
    actionHref: "tel:+919117135379",
    actionTextHi: "कॉल करें",
    actionTextEn: "Call Now",
  },
  {
    id: "anna-daan",
    categoryHi: "अन्नपूर्णा सेवा",
    categoryEn: "Annapurna Seva",
    badgeBg: "bg-amber-700 text-white",
    icon: <HeartHandshake className="w-3.5 h-3.5 text-amber-200" />,
    textHi: "निशुल्क भोजन एवं वस्त्र सेवा:",
    textEn: "Free Meals & Clothing Service:",
    highlightTextHi: "अस्पतालों व असहाय बस्तियों के बाहर गर्म पौष्टिक भोजन व वस्त्र वितरण का संकल्प।",
    highlightTextEn: "Pledge to serve warm nutritious meals and clothes outside government hospitals and destitute areas.",
    actionHref: "#hamari-sevayein",
    actionTextHi: "सहयोग करें",
    actionTextEn: "Support Us",
  },
];

export default function MarqueeTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const { isEn, t } = useLanguage();

  return (
    <aside
      aria-label={t("ताज़ा समाचार एवं गतिविधियाँ स्क्रॉलर", "Live News & Activities Ticker")}
      className="relative z-20 w-full max-w-full bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white border-y border-brand-gold-500/40 shadow-inner overflow-hidden select-none"
    >
      <div className="flex items-center w-full max-w-full min-w-0">
        {/* Left Fixed Label */}
        <div className="flex-shrink-0 z-10 px-3 sm:px-4 py-2.5 bg-gradient-to-r from-brand-saffron-700 to-brand-maroon-900 border-r border-brand-gold-400/50 shadow-md flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold-300"></span>
          </span>
          <span className="font-heading text-xs sm:text-sm font-bold tracking-wide text-brand-gold-200 flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-400 inline" />
            <span>{t("ताज़ा खबर", "Latest Updates")}</span>
          </span>
        </div>

        {/* Marquee Track */}
        <div
          className="relative flex-1 min-w-0 overflow-hidden py-2"
          role="marquee"
          aria-live="polite"
        >
          <div
            className={`animate-marquee flex items-center gap-8 ${
              isPaused ? "![animation-play-state:paused]" : ""
            }`}
          >
            {/* Duplicated list twice to create continuous infinite loop */}
            {[...tickerItems, ...tickerItems].map((item, index) => {
              const category = isEn ? item.categoryEn : item.categoryHi;
              const text = isEn ? item.textEn : item.textHi;
              const highlight = isEn ? item.highlightTextEn : item.highlightTextHi;
              const actionText = isEn ? item.actionTextEn : item.actionTextHi;

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm whitespace-nowrap group/ticker py-0.5"
                >
                  {/* Category Pill */}
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${item.badgeBg} shadow-xs`}
                  >
                    {item.icon}
                    <span>{category}</span>
                  </span>

                  {/* Main Headline */}
                  <span className="font-semibold text-brand-cream-100">
                    {text}
                  </span>

                  {/* Highlighted detail */}
                  {highlight && (
                    <span className="text-brand-gold-300 font-medium">
                      {highlight}
                    </span>
                  )}

                  {/* Action Link */}
                  {item.actionHref && (
                    <a
                      href={item.actionHref}
                      className="ml-1 text-[11px] font-bold text-white bg-brand-saffron-600 hover:bg-brand-saffron-500 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 underline-offset-2 hover:underline"
                    >
                      <span>{actionText || (isEn ? "View" : "देखें")}</span>
                      <span>→</span>
                    </a>
                  )}

                  {/* Separator Ornament */}
                  <span className="text-brand-gold-500/60 font-bold px-2">✦</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Accessibility Pause/Play Toggle */}
        <div className="flex-shrink-0 z-10 px-2 sm:px-3 bg-brand-maroon-950/90 border-l border-brand-maroon-800 flex items-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-brand-gold-400 hover:text-white hover:bg-brand-maroon-800 transition"
            aria-label={isPaused ? t("सूचना पट्टी पुनः चलाएं", "Resume Ticker") : t("सूचना पट्टी रोकें", "Pause Ticker")}
            title={isPaused ? t("सूचना पट्टी पुनः चलाएं", "Resume Ticker") : t("सूचना पट्टी रोकें", "Pause Ticker")}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
