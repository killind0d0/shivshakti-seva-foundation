"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Flame, CheckCircle, Share2, Heart, Users } from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

export default function DailySankalpWidget() {
  const [hasPledged, setHasPledged] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(2487);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ssf_sankalp_pledged");
      const storedCount = localStorage.getItem("ssf_sankalp_count");
      if (stored === "true") {
        setHasPledged(true);
      }
      if (storedCount) {
        setPledgeCount(parseInt(storedCount, 10));
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const handlePledge = () => {
    if (hasPledged) return;

    const newCount = pledgeCount + 1;
    setPledgeCount(newCount);
    setHasPledged(true);
    setShowCelebration(true);

    try {
      localStorage.setItem("ssf_sankalp_pledged", "true");
      localStorage.setItem("ssf_sankalp_count", newCount.toString());
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  const shareText = encodeURIComponent(
    "मैंने आज शिवशक्ति सेवा फाउंडेशन के साथ समाज में निःस्वार्थ सेवा का पावन संकल्प लिया। आप भी जुड़ें: https://www.shivshaktisevafoundation.in"
  );
  const shareWhatsappUrl = `https://wa.me/?text=${shareText}`;

  // Formatter for Hindi Numerals
  const formatHindiNumber = (num: number) => {
    const hindiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((d) => hindiDigits[parseInt(d, 10)] || d)
      .join("");
  };

  return (
    <section
      id="seva-sankalp"
      className="py-14 sm:py-20 bg-gradient-to-b from-brand-cream-100 via-amber-50/50 to-brand-cream-100 relative overflow-hidden"
      aria-label="आज का सेवा संकल्प"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Outer Card with Royal Frame & Traditional Corners */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border-2 border-brand-gold-400/50 relative overflow-hidden">
          <TraditionalCornerFlourish size={38} color="#d4af37" className="opacity-80" />

          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-brand-gold-300/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-brand-saffron-500/10 blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-saffron-100 border border-brand-saffron-300 text-brand-maroon-950 text-xs sm:text-sm font-bold shadow-xs mb-3">
              <Flame className="w-4 h-4 text-brand-saffron-600 animate-pulse" />
              <span>आत्मिक संकल्प • आज की चेतना</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-maroon-950 tracking-tight leading-tight">
              आज का पावन सेवा संकल्प
            </h2>

            <p className="mt-2 text-sm sm:text-base text-brand-charcoal-700 font-medium">
              “प्रत्येक दिन किसी एक बेसहारा के चेहरे पर मुस्कान लाने का प्रण ही सबसे बड़ा पुण्य है।”
            </p>

            <TraditionalDivider />

            {/* User Pledge Display */}
            <div className="my-6 inline-flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-brand-cream-100 border border-brand-gold-400/40 shadow-inner">
              <div className="p-2 rounded-xl bg-brand-maroon-900 text-brand-gold-300">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-brand-maroon-800 uppercase tracking-wider">
                  आपके सेवा संकल्प
                </div>
                <div className="text-xl sm:text-2xl font-black font-heading text-brand-maroon-950">
                  {formatHindiNumber(pledgeCount)} सेवा संकल्प
                </div>
              </div>
            </div>

            {/* Main Interactive Action */}
            <div className="mt-4">
              {!hasPledged ? (
                <button
                  onClick={handlePledge}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-extrabold text-white bg-gradient-to-r from-brand-maroon-900 via-brand-maroon-800 to-brand-saffron-700 hover:from-brand-maroon-850 hover:to-brand-saffron-600 shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 border-2 border-brand-gold-400"
                >
                  <Flame className="w-6 h-6 text-brand-gold-300 group-hover:scale-110 transition-transform animate-bounce" />
                  <span>मैंने आज सेवा का संकल्प लिया</span>
                  <Sparkles className="w-5 h-5 text-brand-gold-300 group-hover:rotate-12 transition-transform" />
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-brand-gold-500 shadow-md animate-scaleIn">
                  <div className="inline-flex p-3 rounded-full bg-emerald-600 text-white shadow-md mb-3">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-maroon-950">
                    साधुवाद! आपका पावन संकल्प स्वीकार हुआ
                  </h3>

                  <p className="mt-2 text-sm sm:text-base text-brand-charcoal-800 font-medium">
                    आपका यह संकल्प समाज में करुणा और सहायता की एक नई ज्योति प्रज्वलित करेगा।
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-white/80 border border-brand-gold-300 text-xs sm:text-sm font-semibold text-brand-maroon-900">
                    ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
                  </div>

                  {/* Share on WhatsApp */}
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={shareWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>व्हाट्सएप पर यह संकल्प साझा करें</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Micro Celebratory Effect Notice */}
            {showCelebration && (
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full animate-bounce">
                <Heart className="w-4 h-4 text-emerald-600 fill-current" />
                <span>आपका नाम सेवा संकल्प रजिस्टर में सम्मिलित हुआ!</span>
              </div>
            )}

            <div className="mt-6 text-[11px] sm:text-xs text-brand-charcoal-500 font-medium">
              * यह संकल्प मन, वचन या कर्म से किसी भी ज़रूरतमंद व्यक्ति, मूक प्राणी या समाज की सहायता का आत्मिक प्रण है।
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
