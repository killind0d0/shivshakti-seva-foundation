"use client";

import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Phone,
  HelpCircle,
  X,
  ChevronUp,
  Flame,
  Sparkles,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

interface FloatingQuickActionProps {
  phoneNumber?: string;
  onOpenHelp?: () => void;
  isHidden?: boolean;
}

export default function FloatingQuickAction({
  phoneNumber = "+919117135379",
  onOpenHelp,
  isHidden = false,
}: FloatingQuickActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    "नमस्ते शिवशक्ति सेवा फाउंडेशन, मुझे सेवा सहयोग एवं कार्यों की जानकारी चाहिए।"
  )}`;
  const mapsUrl = "https://maps.app.goo.gl/T3QqWjCGMkx9KVJr9?g_st=ac";

  // Completely remove and unmount if sidebar or modal is open
  if (isHidden) {
    return null;
  }

  return (
    <aside
      id="floating-quick-action"
      aria-label="त्वरित सेवा सारथी एवं सहायता विकल्प"
      className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2"
    >
      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-full bg-brand-maroon-900/95 hover:bg-brand-maroon-950 text-brand-gold-300 hover:text-white border-2 border-brand-gold-400/70 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:scale-95 animate-scaleIn"
          aria-label="शीर्ष पर जाएँ"
          title="शीर्ष पर जाएँ"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Main Floating Interactive Container */}
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-brand-gold-400/80 p-4 sm:p-5 w-72 sm:w-80 animate-scaleIn transition-all relative overflow-hidden">
          <TraditionalCornerFlourish size={24} color="#d4af37" className="opacity-70" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-brand-maroon-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-maroon-900 to-brand-saffron-600 flex items-center justify-center text-brand-gold-300 shadow-sm flex-shrink-0">
                <Flame className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold text-brand-maroon-950 leading-tight">
                  २४×७ सेवा सारथी
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span className="text-[10px] font-bold text-emerald-700">
                    सहायता हेतु तत्पर
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-brand-charcoal-400 hover:text-brand-maroon-900 hover:bg-brand-cream-100 transition"
              aria-label="सहायता पट्टी बंद करें"
              title="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List */}
          <div className="space-y-2">
            {/* 1. WhatsApp Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold shadow-sm transition hover:shadow-md active:scale-98 group"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-white/20">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <span>व्हाट्सएप पर सीधा संदेश</span>
              </div>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded text-white group-hover:translate-x-0.5 transition-transform">
                चैट करें →
              </span>
            </a>

            {/* 2. Direct Call Action with English Digits */}
            <a
              href={`tel:+${cleanNumber}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white text-xs font-bold shadow-sm transition hover:shadow-md active:scale-98 group"
              title="टैप करते ही सीधा डायलर खुलेगा"
            >
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-brand-gold-500 text-brand-maroon-950">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span>कॉल: <span className="font-sans font-extrabold tracking-wide">91171 35379</span></span>
                  <span className="text-[9px] text-brand-gold-300 font-normal">टैप करते ही डायलर खुलेगा</span>
                </div>
              </div>
              <span className="text-[10px] text-brand-gold-300 font-bold bg-white/10 px-1.5 py-0.5 rounded">
                डायल ↗
              </span>
            </a>

            {/* 3. Emergency Need Help Modal */}
            {onOpenHelp && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenHelp();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-maroon-950 border border-brand-gold-400/50 text-xs font-bold transition active:scale-98"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-saffron-100 text-brand-saffron-700">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span>सहायता अनुरोध दर्ज करें</span>
                </div>
                <span className="text-[10px] text-brand-saffron-700">
                  फॉर्म भरें →
                </span>
              </button>
            )}

            {/* 4. Google Maps Office Location */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-brand-maroon-900 text-[11px] font-semibold transition border border-amber-200"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                <span className="truncate">कार्यालय: माँ मंगलागौरी, गया जी</span>
              </div>
              <span className="text-[9px] text-brand-gold-700 font-bold flex-shrink-0 ml-1">
                मैप ↗
              </span>
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-brand-maroon-100/60 text-center">
            <span className="text-[10px] font-medium text-brand-charcoal-500">
              मानव सेवा ही ईश्वर आराधना है
            </span>
          </div>
        </div>
      ) : (
        /* Compact Responsive Floating Trigger Button (Circular Orb on Mobile, Capsule on Desktop) */
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-brand-maroon-900 via-brand-maroon-850 to-brand-saffron-600 text-white font-bold text-xs sm:text-sm shadow-2xl border-2 border-brand-gold-400 hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="२४×७ सेवा सारथी सहायता विकल्प खोलें"
          title="त्वरित सहायता व संपर्क खोलें (२४×७ सेवा सारथी)"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-brand-gold-400/30 animate-pulse pointer-events-none" />

          {/* Radiant Diya / Flame Icon */}
          <div className="relative w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-brand-gold-500 flex items-center justify-center text-brand-maroon-950 shadow-inner flex-shrink-0">
            <Flame className="w-4 h-4 sm:w-3.5 sm:h-3.5 animate-bounce" />
          </div>

          {/* Label with Live Indicator (Hidden on mobile circle, visible on tablet/desktop) */}
          <div className="hidden sm:flex flex-col items-start text-left">
            <span className="leading-tight font-heading text-brand-gold-200 text-xs sm:text-sm tracking-wide whitespace-nowrap">
              २४×७ सेवा सारथी
            </span>
            <span className="text-[10px] text-brand-cream-200 font-normal whitespace-nowrap">
              सहायता एवं संपर्क सूत्र
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-brand-gold-300 group-hover:rotate-45 transition-transform hidden sm:inline-block" />

          {/* Live indicator dot on mobile orb */}
          <span className="sm:hidden absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-xs animate-pulse" />
        </button>
      )}
    </aside>
  );
}
