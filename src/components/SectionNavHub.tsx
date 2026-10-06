"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  HeartPulse,
  QrCode,
  HeartHandshake,
  PhoneCall,
  ArrowRight,
} from "lucide-react";

/**
 * Compact Quick-Access Bar — sits right below the Hero.
 * 4 action buttons: Help · Donate · Our Programs · Call Now
 * Replaces the old bloated SectionNavHub gateway + tab bar.
 */

import { useLanguage } from "@/context/LanguageContext";

export type TabKey = "all"; // Kept for backward compat with imports; site is now single-page

interface QuickAccessBarProps {
  onOpenHelp: () => void;
  onOpenDonation: () => void;
}

export default function QuickAccessBar({
  onOpenHelp,
  onOpenDonation,
}: QuickAccessBarProps) {
  const { isEn } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white border-b border-brand-cream-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {/* Help / Emergency */}
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <HeartPulse className="w-4.5 h-4.5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-sm font-heading font-bold text-red-800 truncate">
                {isEn ? "Request Aid" : "सहायता चाहिए"}
              </div>
              <div className="text-[10px] text-red-600 font-semibold">
                {isEn ? "24×7 Emergency" : "24×7 आपातकाल"}
              </div>
            </div>
          </button>

          {/* Donate */}
          <button
            onClick={onOpenDonation}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-saffron-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <QrCode className="w-4.5 h-4.5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-sm font-heading font-bold text-amber-900 truncate">
                {isEn ? "Support / Donate" : "सहयोग करें"}
              </div>
              <div className="text-[10px] text-amber-700 font-semibold">
                {isEn ? "UPI / QR / Bank" : "UPI / QR दान"}
              </div>
            </div>
          </button>

          {/* Our Programs */}
          <button
            onClick={() => scrollTo("hamari-sevayein")}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-4.5 h-4.5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-sm font-heading font-bold text-emerald-900 truncate">
                {isEn ? "Our Services" : "हमारी सेवाएँ"}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold font-sans">
                {isEn ? "10 Initiatives" : "10 प्रकल्प"}
              </div>
            </div>
          </button>

          {/* Direct Call */}
          <a
            href="tel:+919117135379"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-brand-cream-100 hover:bg-brand-cream-200 border border-brand-maroon-200 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-maroon-900 text-brand-gold-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <PhoneCall className="w-4.5 h-4.5" />
            </div>
            <div className="text-left min-w-0">
              <div className="text-xs sm:text-sm font-heading font-bold text-brand-maroon-950 truncate">
                {isEn ? "Call Helpline" : "कॉल करें"}
              </div>
              <div className="text-[10px] text-brand-charcoal-600 font-medium font-sans">
                {isEn ? "+91 91171 35379" : "+91 91171 35379"}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

// Kept for backward compatibility — SectionFooterNav is no longer used
export function SectionFooterNav(_props: { activeTab: string; onSelectTab: (tab: string) => void }) {
  return null;
}
