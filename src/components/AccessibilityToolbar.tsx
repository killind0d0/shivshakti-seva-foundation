"use client";

import React, { useState, useEffect } from "react";
import { Volume2, Eye, HelpCircle, PhoneCall, Lock } from "lucide-react";

interface AccessibilityToolbarProps {
  onOpenHelp: () => void;
  onOpenAdmin: () => void;
}

export default function AccessibilityToolbar({
  onOpenHelp,
  onOpenAdmin,
}: AccessibilityToolbarProps) {
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [highContrast, setHighContrast] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedFont = localStorage.getItem("ssf_font_size") as "normal" | "large" | "xlarge";
      if (savedFont) setFontSize(savedFont);
      
      const savedContrast = localStorage.getItem("ssf_high_contrast") === "true";
      if (savedContrast) {
        setHighContrast(true);
        document.body.classList.add("high-contrast");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "normal") {
      root.style.fontSize = "16px";
    } else if (fontSize === "large") {
      root.style.fontSize = "18px";
    } else if (fontSize === "xlarge") {
      root.style.fontSize = "20px";
    }
    try {
      localStorage.setItem("ssf_font_size", fontSize);
    } catch (e) {
      console.error(e);
    }
  }, [fontSize]);

  const toggleHighContrast = () => {
    const newVal = !highContrast;
    setHighContrast(newVal);
    if (newVal) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
    try {
      localStorage.setItem("ssf_high_contrast", String(newVal));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      role="region"
      aria-label="सुगमता एवं त्वरित संपर्क पट्टी"
      className="bg-brand-maroon-950 text-brand-cream-200 text-[11px] sm:text-xs py-1 px-3 sm:px-6 border-b border-brand-maroon-900/80 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Urgent Helpline Link - Ultra-slim single line */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-brand-saffron-500 text-white animate-pulse flex-shrink-0">
            <PhoneCall className="w-2.5 h-2.5" />
          </span>
          <span className="font-medium text-brand-cream-300 hidden md:inline">
            हेल्पलाइन:
          </span>
          <a
            href="tel:+919117135379"
            className="font-bold text-brand-gold-400 hover:text-white transition-colors underline underline-offset-2 truncate"
            title="हेल्पलाइन पर सीधे कॉल करें"
          >
            <span className="sm:hidden font-sans font-bold">+91 91171 35379 (२४×७)</span>
            <span className="hidden sm:inline font-sans font-bold">+91 91171 35379 (२४×७ सदैव उपलब्ध)</span>
          </a>
        </div>

        {/* Accessibility options & Assistance request */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Quick assistance modal button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-2.5 py-1 sm:py-0.5 min-h-[28px] sm:min-h-0 rounded-full bg-brand-saffron-600 hover:bg-brand-saffron-500 text-white font-semibold text-[10px] sm:text-xs transition shadow-sm whitespace-nowrap active:scale-95"
            aria-label="सहायता हेतु तुरंत अनुरोध दर्ज करें"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>सहायता मांगें</span>
          </button>

          {/* Font resizing - Visible on tablet/desktop */}
          <div className="hidden md:flex items-center gap-1 border-l border-brand-maroon-800 pl-2.5">
            <span className="text-brand-cream-400 text-[10px]">अक्षर:</span>
            <button
              onClick={() => setFontSize("normal")}
              className={`px-1.5 py-0.2 rounded text-[10px] font-bold transition ${
                fontSize === "normal"
                  ? "bg-brand-gold-500 text-brand-maroon-950"
                  : "bg-brand-maroon-900 text-brand-cream-200 hover:bg-brand-maroon-800"
              }`}
              title="सामान्य अक्षर आकार"
            >
              अ
            </button>
            <button
              onClick={() => setFontSize("large")}
              className={`px-1.5 py-0.2 rounded text-xs font-bold transition ${
                fontSize === "large"
                  ? "bg-brand-gold-500 text-brand-maroon-950"
                  : "bg-brand-maroon-900 text-brand-cream-200 hover:bg-brand-maroon-800"
              }`}
              title="बड़ा अक्षर आकार"
            >
              अ+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              className={`px-1.5 py-0.2 rounded text-xs font-bold transition ${
                fontSize === "xlarge"
                  ? "bg-brand-gold-500 text-brand-maroon-950"
                  : "bg-brand-maroon-900 text-brand-cream-200 hover:bg-brand-maroon-800"
              }`}
              title="वृहद अक्षर आकार"
            >
              अ++
            </button>
          </div>

          {/* High Contrast Mode - Tablet/Desktop */}
          <button
            onClick={toggleHighContrast}
            className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] transition ${
              highContrast
                ? "bg-white text-black border-white"
                : "border-brand-maroon-700 hover:bg-brand-maroon-900 text-brand-cream-300"
            }`}
            title="उच्च कंट्रास्ट दृश्य बदलें"
          >
            <Eye className="w-2.5 h-2.5" />
            <span>कंट्रास्ट</span>
          </button>

          {/* Admin & Staff Portal Link */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 text-brand-gold-300 hover:text-white text-[10px] sm:text-[11px] font-bold underline underline-offset-2 transition whitespace-nowrap pl-1.5 py-1 sm:py-0.5 min-h-[28px] sm:min-h-0 rounded hover:bg-white/10 active:scale-95"
            title="प्रशासक एवं सेवादार लॉगिन पोर्टल"
          >
            <Lock className="w-3 h-3 text-brand-gold-400" />
            <span>एडमिन / सेवादार लॉगिन</span>
          </button>
        </div>
      </div>
    </div>
  );
}
