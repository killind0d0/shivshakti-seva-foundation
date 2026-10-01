"use client";

import React, { useState } from "react";
import { Sparkles, Trophy, Waves, MessageCircle, Phone, HeartHandshake, Pause, Play } from "lucide-react";

interface TickerItem {
  id: string;
  category: string;
  badgeBg: string;
  icon: React.ReactNode;
  text: string;
  highlightText?: string;
  actionHref?: string;
  actionText?: string;
}

const tickerItems: TickerItem[] = [
  {
    id: "competition",
    category: "प्रतियोगिता",
    badgeBg: "bg-amber-600 text-white",
    icon: <Trophy className="w-3.5 h-3.5 text-amber-300" />,
    text: "महिला स्वावलंबन हस्तकला एवं सिलाई प्रतियोगिता:",
    highlightText: "उत्कृष्ट प्रदर्शन करने वाली बहनों को फाउंडेशन की ओर से सीधे कार्य ऑर्डर व स्वावलंबन उपहार!",
    actionHref: "#swavalamban",
    actionText: "विवरण देखें",
  },
  {
    id: "flood-relief",
    category: "धरातल कार्य",
    badgeBg: "bg-red-700 text-white",
    icon: <Waves className="w-3.5 h-3.5 text-red-200" />,
    text: "आपदा एवं बाढ़ राहत अभियान:",
    highlightText: "प्रभावित क्षेत्रों में सूखा राशन किट, आवश्यक वस्त्र एवं प्राथमिक चिकित्सा सामग्री का त्वरित वितरण जारी।",
    actionHref: "#hamare-abhiyan",
    actionText: "राहत कार्य",
  },
  {
    id: "whatsapp",
    category: "सीधे जुड़ें",
    badgeBg: "bg-emerald-700 text-white",
    icon: <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />,
    text: "व्हाट्सएप सेवा परिवार:",
    highlightText: "आधिकारिक क्यूआर कोड स्कैन कर सीधे सेवा समूह से जुड़ें और ताज़ा गतिविधियों की जानकारी प्राप्त करें।",
    actionHref: "#whatsapp-group",
    actionText: "QR स्कैन करें",
  },
  {
    id: "helpline",
    category: "२४×७ सेवा",
    badgeBg: "bg-brand-maroon-800 text-amber-200",
    icon: <Phone className="w-3.5 h-3.5 text-amber-300" />,
    text: "आपातकालीन सेवा नंबर:",
    highlightText: "किसी भी जरूरतमंद की सहायता हेतु हमें कभी भी संपर्क करें — +91 91171 35379",
    actionHref: "tel:+919117135379",
    actionText: "कॉल करें",
  },
  {
    id: "anna-daan",
    category: "अन्नपूर्णा सेवा",
    badgeBg: "bg-amber-700 text-white",
    icon: <HeartHandshake className="w-3.5 h-3.5 text-amber-200" />,
    text: "निशुल्क भोजन एवं वस्त्र सेवा:",
    highlightText: "अस्पतालों व असहाय बस्तियों के बाहर गर्म पौष्टिक भोजन व वस्त्र वितरण का संकल्प।",
    actionHref: "#hamari-sevayein",
    actionText: "सहयोग करें",
  },
];

export default function MarqueeTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <aside
      aria-label="ताज़ा समाचार एवं गतिविधियाँ स्क्रॉलर"
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
            <span>ताज़ा खबर</span>
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
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm whitespace-nowrap group/ticker py-0.5"
              >
                {/* Category Pill */}
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${item.badgeBg} shadow-xs`}
                >
                  {item.icon}
                  <span>{item.category}</span>
                </span>

                {/* Main Headline */}
                <span className="font-semibold text-brand-cream-100">
                  {item.text}
                </span>

                {/* Highlighted detail */}
                {item.highlightText && (
                  <span className="text-brand-gold-300 font-medium">
                    {item.highlightText}
                  </span>
                )}

                {/* Action Link */}
                {item.actionHref && (
                  <a
                    href={item.actionHref}
                    className="ml-1 text-[11px] font-bold text-white bg-brand-saffron-600 hover:bg-brand-saffron-500 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1 underline-offset-2 hover:underline"
                  >
                    <span>{item.actionText || "देखें"}</span>
                    <span>→</span>
                  </a>
                )}

                {/* Separator Ornament */}
                <span className="text-brand-gold-500/60 font-bold px-2">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Accessibility Pause/Play Toggle */}
        <div className="flex-shrink-0 z-10 px-2 sm:px-3 bg-brand-maroon-950/90 border-l border-brand-maroon-800 flex items-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded text-brand-gold-400 hover:text-white hover:bg-brand-maroon-800 transition"
            aria-label={isPaused ? "सूचना पट्टी पुनः चलाएं" : "सूचना पट्टी रोकें"}
            title={isPaused ? "सूचना पट्टी पुनः चलाएं" : "सूचना पट्टी रोकें"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </aside>
  );
}
