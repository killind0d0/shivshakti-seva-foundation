"use client";

import React from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitchProps {
  className?: string;
  variant?: "header" | "toolbar" | "mobile";
}

export default function LanguageSwitch({
  className = "",
  variant = "header",
}: LanguageSwitchProps) {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";

  if (variant === "toolbar") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={toggleLanguage}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-maroon-900 hover:bg-brand-maroon-800 border border-brand-gold-500/50 text-brand-gold-300 hover:text-white text-[11px] font-bold transition shadow-xs active:scale-95 cursor-pointer"
          title={isEn ? "Switch website to हिन्दी" : "Switch website to English"}
          aria-label="Change Language / भाषा बदलें"
        >
          <Globe className="w-3 h-3 text-brand-gold-400" />
          <span>{isEn ? "हिन्दी" : "English"}</span>
        </button>
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className={`w-full ${className}`}>
        <button
          type="button"
          onClick={toggleLanguage}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-brand-cream-50 border border-brand-maroon-200 text-brand-maroon-950 font-bold text-sm hover:bg-brand-cream-100 transition shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-saffron-600" />
            <span>{isEn ? "Language / भाषा" : "भाषा / Language"}</span>
          </div>
          <span className="px-3 py-1 rounded-lg bg-brand-maroon-900 text-brand-gold-300 text-xs font-extrabold uppercase">
            {isEn ? "हिन्दी में बदलें" : "Switch to English"}
          </span>
        </button>
      </div>
    );
  }

  // Default header button
  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleLanguage}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-950 hover:from-brand-maroon-800 hover:to-brand-maroon-900 border border-brand-gold-400/80 text-brand-gold-300 hover:text-white text-xs sm:text-sm font-extrabold transition shadow-sm active:scale-95 cursor-pointer"
        title={isEn ? "हिन्दी में देखने के लिए क्लिक करें" : "Click to view website in English"}
        aria-label="Language translation switch"
      >
        <Globe className="w-3.5 h-3.5 text-brand-gold-400" />
        <span className="font-sans font-bold tracking-wide">
          {isEn ? "हिन्दी" : "English"}
        </span>
      </button>
    </div>
  );
}
