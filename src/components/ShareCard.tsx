"use client";

import React, { useState } from "react";
import {
  Share2,
  Check,
  Sparkles,
  Heart,
  MessageCircle,
  Copy,
  X,
  ShieldCheck,
} from "lucide-react";
import RangoliCorner from "./RangoliCorner";
import ModalPortal from "./ModalPortal";

interface ShareCardProps {
  defaultAmount?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareCard({
  defaultAmount = 1100,
  isOpen,
  onClose,
}: ShareCardProps) {
  const [donorName, setDonorName] = useState("एक श्रद्धालु सेवक");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shivshaktisevafoundation.in";
  const shareText = `मैंने शिवशक्ति सेवा फाउंडेशन के माध्यम से दीन-दुखियों एवं बाढ़ पीड़ितों की सहायता में सहयोग किया है।\n\n"नर सेवा ही नारायण सेवा है"\n\nआप भी इस सेवा यज्ञ से जुड़ें: ${siteUrl}/`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "शिवशक्ति सेवा फाउंडेशन — मेरा सहयोग",
          text: shareText,
          url: `${siteUrl}/`,
        });
      } catch {
        // ignore cancel
      }
    } else {
      handleCopy();
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-modal="true"
        className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div
          className="modal-card-after-topbar bg-white max-w-lg w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-gold-400 overflow-hidden flex flex-col my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-saffron-400" />
              <h3 className="font-heading text-lg font-bold text-brand-gold-300">
                सहयोग प्रमाण पत्र साझा करें
              </h3>
            </div>
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition border border-white/20"
              aria-label="बंद करें"
            >
              <span>बंद करें</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
            <div>
              <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                कार्ड पर आपका नाम (वैकल्पिक):
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="अपना नाम लिखें"
                className="w-full px-3.5 py-2 rounded-xl border border-brand-cream-400 text-sm focus:outline-none focus:border-brand-saffron-600 bg-brand-cream-50"
              />
            </div>

            {/* Branded Digital Card Preview */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white border-2 border-brand-gold-400 shadow-2xl overflow-hidden text-center">
              <RangoliCorner position="top-left" size={60} opacity={0.3} />
              <RangoliCorner position="bottom-right" size={60} opacity={0.3} />

              <div className="relative z-10 space-y-3">
                <span className="text-[10px] tracking-widest uppercase text-brand-gold-300 block font-semibold">
                  ॥ धर्मो रक्षति रक्षितः ॥
                </span>

                <h4 className="text-xl sm:text-2xl font-heading font-bold text-brand-gold-400">
                  शिवशक्ति सेवा फाउंडेशन
                </h4>
                <p className="text-[11px] text-brand-cream-200">
                  गयाजी, बिहार, भारत
                </p>

                <div className="my-4 py-3 px-4 rounded-xl bg-white/10 border border-brand-gold-400/40 backdrop-blur-xs">
                  <span className="text-xs text-brand-cream-200 block">
                    सम्मानित दानदाता / सहयोगी
                  </span>
                  <span className="text-lg font-heading font-bold text-white tracking-wide">
                    {donorName || "एक श्रद्धालु सेवक"}
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-brand-gold-300 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>मानव सेवा एवं राहत कार्य में सक्रिय योगदान</span>
                  </div>
                </div>

                <p className="text-xs text-brand-cream-100 italic">
                  "आपकी करुणा से किसी असहाय परिवार की थाली में अन्न और चेहरे पर मुस्कान आई है।"
                </p>

                <div className="pt-2 text-[10px] text-brand-cream-300">
                  दिनांक: {new Date().toLocaleDateString("hi-IN")} • सत्यापनीय सेवा
                </div>
              </div>
            </div>

            {/* Sharing Buttons */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-5 h-5" />
                <span>व्हाट्सएप (WhatsApp) पर साझा करें</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleNativeShare}
                  className="py-2.5 px-3 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Share2 className="w-4 h-4 text-brand-gold-300" />
                  <span>अन्य माध्यम से शेयर</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-maroon-950 font-bold text-xs border border-brand-cream-300 flex items-center justify-center gap-2 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>कॉपी हो गया!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-brand-maroon-700" />
                      <span>संदेश कॉपी करें</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
