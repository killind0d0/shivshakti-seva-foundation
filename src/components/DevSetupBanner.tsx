"use client";

import React, { useState, useEffect } from "react";
import { devBannerConfig } from "@/config/devBannerConfig";
import ModalPortal from "./ModalPortal";
import {
  AlertTriangle,
  Key,
  Settings,
  X,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";

export default function DevSetupBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [smsKey, setSmsKey] = useState<string>("");
  const [statusMsg, setStatusMsg] = useState<string>("");

  useEffect(() => {
    // Check master config & local storage override
    const localOverride = localStorage.getItem("ssf_dev_banner");
    if (localOverride !== null) {
      setIsVisible(localOverride === "true");
    } else {
      setIsVisible(devBannerConfig.enabled);
    }
  }, []);

  const handleToggleBanner = (enable: boolean) => {
    localStorage.setItem("ssf_dev_banner", enable ? "true" : "false");
    setIsVisible(enable);
    setIsModalOpen(false);
  };

  const handleSaveApiDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !apiSecret) {
      setStatusMsg("कृपया मान्य API Key एवं Secret दर्ज करें।");
      return;
    }
    setStatusMsg("API क्रेडेंशियल्स का सत्यापन हो रहा है... कृपया मुख्य डेवलपर से संपर्क करें।");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Development & API Setup Banner Strip */}
      <div
        role="alert"
        aria-live="polite"
        className="w-full bg-gradient-to-r from-[#1f0608] via-[#33080d] to-[#1f0608] text-white border-b-2 border-amber-500/80 py-2 sm:py-2.5 px-3 sm:px-6 shadow-lg relative z-30"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center sm:text-left">
          
          {/* Notice & Message */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center justify-center p-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </span>

            <div className="text-xs sm:text-[13px] leading-tight">
              <span className="font-heading font-bold text-amber-300">
                {devBannerConfig.titleHindi}:
              </span>{" "}
              <span className="text-brand-cream-100 font-medium">
                {devBannerConfig.messageHindi}
              </span>{" "}
              <span className="text-amber-200/90 italic font-mono text-[11px] sm:text-xs">
                ({devBannerConfig.messageEnglish})
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
              {devBannerConfig.badgeText}
            </span>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-brand-maroon-950 font-heading font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Enter API Details</span>
            </button>
          </div>

        </div>
      </div>

      {/* Enter API Details Configuration Modal */}
      {isModalOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-modal-title"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-lg w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-maroon-800 overflow-hidden flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-maroon-950 to-brand-maroon-900 text-white flex items-center justify-between border-b-2 border-brand-gold-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-amber-300 animate-spin [animation-duration:8s]" />
                  </div>
                  <div>
                    <h3
                      id="api-modal-title"
                      className="font-heading text-base sm:text-lg font-bold text-brand-gold-300"
                    >
                      API Configuration & Activation
                    </h3>
                    <p className="text-[10px] sm:text-xs text-brand-cream-200">
                      वेबसाइट लाइव सक्रियण हेतु क्रेडेंशियल्स दर्ज करें
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 border border-white/20 transition"
                  aria-label="संवाद बंद करें"
                >
                  <span>बंद करें</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body / Form */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-brand-charcoal-800">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong>सेटअप सूचना:</strong> वेबसाइट विकास एवं परिनियोजन प्रक्रिया पूर्ण होने के उपरांत उत्पादन (Production) API कुंजियों का सत्यापन अनिवार्य है।
                  </div>
                </div>

                <form onSubmit={handleSaveApiDetails} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      Payment Gateway API Key (Razorpay / Cashfree / Stripe) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="rzp_live_xxxxxxxxxxxxxxxxxxxx"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs font-mono bg-brand-cream-50 focus:outline-none focus:border-brand-saffron-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      Payment Gateway API Secret *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••••••••••••••"
                      value={apiSecret}
                      onChange={(e) => setApiSecret(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs font-mono bg-brand-cream-50 focus:outline-none focus:border-brand-saffron-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      SMS / WhatsApp Integration Secret (वैकल्पिक)
                    </label>
                    <input
                      type="text"
                      placeholder="wa_live_sec_xxxxxxxxxxxx"
                      value={smsKey}
                      onChange={(e) => setSmsKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs font-mono bg-brand-cream-50 focus:outline-none focus:border-brand-saffron-600"
                    />
                  </div>

                  {statusMsg && (
                    <div className="p-2.5 rounded-lg bg-brand-maroon-50 border border-brand-maroon-200 text-brand-maroon-900 text-xs font-semibold">
                      {statusMsg}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-800 text-white font-bold text-xs transition shadow-sm"
                    >
                      सत्यापित एवं सक्रिय करें
                    </button>

                    {/* Developer One-Click Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleBanner(false)}
                      className="text-xs text-brand-charcoal-500 hover:text-brand-maroon-800 underline transition"
                    >
                      डेवलपर टॉगल: बैनर छिपाएँ
                    </button>
                  </div>
                </form>

                <div className="pt-3 border-t border-brand-cream-300 text-[11px] text-brand-charcoal-500 leading-tight">
                  💡 <strong>डेवलपर हेतु टिप:</strong> इस बैनर को चालू/बंद करने के लिए कोड में <code>src/config/devBannerConfig.ts</code> में <code>enabled: true/false</code> बदलें या ब्राउज़र कंसोल में <code>localStorage.setItem("ssf_dev_banner", "false")</code> चलाएँ।
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
