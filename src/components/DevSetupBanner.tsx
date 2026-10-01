"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { devBannerConfig } from "@/config/devBannerConfig";
import ModalPortal from "./ModalPortal";
import {
  Wrench,
  Key,
  Lock,
  Unlock,
  Settings,
  X,
  ShieldAlert,
  Globe,
  Phone,
  MessageCircle,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function DevSetupBanner() {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  
  // API form inputs
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [apiStatusMsg, setApiStatusMsg] = useState<string>("");

  // Passcode input for developer bypass
  const [enteredPasscode, setEnteredPasscode] = useState<string>("");
  const [passcodeError, setPasscodeError] = useState<string>("");

  useEffect(() => {
    // 1. Check if already unlocked in this session
    const sessionUnlocked = sessionStorage.getItem("ssf_preview_unlocked") === "true";
    if (sessionUnlocked) {
      setIsUnlocked(true);
      return;
    }

    // 2. Check local storage override or master config
    const localMaintenance = localStorage.getItem("ssf_maintenance_mode");
    if (localMaintenance !== null) {
      setIsMaintenanceActive(localMaintenance === "true");
    } else {
      setIsMaintenanceActive(devBannerConfig.maintenanceMode);
    }
  }, []);

  useEffect(() => {
    if (isMaintenanceActive && !isUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMaintenanceActive, isUnlocked]);

  // Handle Developer Passcode Bypass
  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPasscode.trim() === devBannerConfig.developerPasscode) {
      sessionStorage.setItem("ssf_preview_unlocked", "true");
      setIsUnlocked(true);
      setIsPasscodeModalOpen(false);
      setPasscodeError("");
    } else {
      setPasscodeError("गलत पासकोड! कृपया सही डेवलपर पासकोड दर्ज करें।");
    }
  };

  // Turn Live Globally (Turn off maintenance mode)
  const handleTurnLive = () => {
    localStorage.setItem("ssf_maintenance_mode", "false");
    setIsMaintenanceActive(false);
    setIsUnlocked(true);
    setIsPasscodeModalOpen(false);
  };

  // Re-lock
  const handleLockAgain = () => {
    sessionStorage.removeItem("ssf_preview_unlocked");
    setIsUnlocked(false);
  };

  const handleApiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey || !apiSecret) {
      setApiStatusMsg("कृपया मान्य API Key एवं Secret दर्ज करें।");
      return;
    }
    setApiStatusMsg(
      "API क्रेडेंशियल्स दर्ज कर लिए गए हैं। अंतिम सर्वर सक्रियण एवं DNS लिंकिंग हेतु मुख्य डेवलपर (SJ Digitals) से संपर्क करें।"
    );
  };

  // If maintenance mode is off, or developer unlocked it
  if (!isMaintenanceActive) {
    return null;
  }

  // If developer unlocked it in current session, show a sleek floating "Developer Preview Mode" badge
  if (isUnlocked) {
    return (
      <div className="fixed bottom-4 left-4 z-50 bg-brand-maroon-950/90 text-brand-gold-300 text-xs px-3.5 py-1.5 rounded-full border border-brand-gold-400/50 shadow-xl backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold">डेवलपर पूर्वावलोकन सक्रिय (Preview Mode)</span>
        <button
          onClick={handleLockAgain}
          className="ml-1 text-[11px] underline hover:text-white transition"
          title="पूर्वावलोकन बंद कर स्क्रीन वापस लाएं"
        >
          स्क्रीन वापस लाएं
        </button>
      </div>
    );
  }

  // ==========================================
  // FULL SCREEN UNDER DEVELOPMENT OVERLAY
  // ==========================================
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label="वेबसाइट पर कार्य प्रगति पर है"
      className="fixed inset-0 z-[99999] bg-gradient-to-b from-[#180306] via-[#100103] to-[#0a0102] text-white flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto select-none"
    >
      {/* Background Sacred Ambient Glow */}
      <div className="fixed -top-32 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-brand-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-32 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] bg-brand-saffron-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pb-4 border-b border-brand-gold-500/20 text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-gold-400 animate-pulse" />
          <span className="text-brand-gold-300 font-semibold tracking-wider uppercase text-[11px]">
            आधिकारिक विकास एवं परिनियोजन चरण
          </span>
        </div>

        {/* Developer Unlock Button */}
        <button
          onClick={() => setIsPasscodeModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-brand-cream-100 text-xs font-semibold border border-brand-gold-400/30 transition active:scale-95"
          title="डेवलपर या व्यवस्थापक द्वारा वेबसाइट का पूर्वावलोकन खोलें"
        >
          <Lock className="w-3.5 h-3.5 text-brand-gold-400" />
          <span>डेवलपर पूर्वावलोकन (Preview)</span>
        </button>
      </div>

      {/* Center Hero Card */}
      <div className="relative z-10 max-w-2xl mx-auto my-auto w-full py-8 text-center space-y-6">
        
        {/* Emblem */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-brand-gold-400 via-amber-300 to-brand-gold-600 shadow-2xl shadow-amber-950/80 mx-auto">
            <Image
              src="/images/logo/logo_emblem.png"
              alt="शिवशक्ति सेवा फाउंडेशन"
              width={112}
              height={112}
              className="w-full h-full object-contain rounded-full bg-brand-maroon-950 p-1"
              priority
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-brand-maroon-950"></span>
          </span>
        </div>

        {/* Vedic Sacred Quote */}
        <div className="text-[11px] sm:text-xs text-brand-gold-300 font-semibold tracking-widest uppercase">
          ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
        </div>

        {/* Titles */}
        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-brand-gold-300 to-amber-100 tracking-tight leading-tight">
            शिवशक्ति सेवा फाउंडेशन
          </h1>
          <p className="text-xs sm:text-sm text-brand-cream-200 font-medium">
            माँ मंगलागौरी, गया जी (बिहार) • जनकल्याण एवं मानव सेवा संकल्प
          </p>
        </div>

        {/* Development Status Box */}
        <div className="p-5 sm:p-7 rounded-3xl bg-brand-maroon-950/90 border-2 border-brand-gold-500/40 shadow-2xl backdrop-blur-md space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5 animate-spin [animation-duration:10s]" />
            <span>कार्य प्रगति पर है • Work in Progress</span>
          </div>

          <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
            {devBannerConfig.titleHindi}
          </h2>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-brand-gold-400/20 text-xs sm:text-sm text-amber-200 font-mono text-center">
            ⚠️ {devBannerConfig.noticeEnglish}
          </div>

          <p className="text-xs sm:text-sm text-brand-cream-300 leading-relaxed max-w-lg mx-auto">
            {devBannerConfig.noticeHindi}
            <br />
            सुरक्षा ऑडिट, पेमेंट गेटवे और उत्पादन API के अंतिम एकीकरण के उपरांत यह पोर्टल पूर्णतः सक्रिय होगा।
          </p>

          {/* Action Button: Enter API Details */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsApiModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-brand-maroon-950 font-heading font-extrabold text-sm shadow-xl hover:shadow-amber-500/20 transition-all active:scale-95"
            >
              <Key className="w-4 h-4 text-brand-maroon-950" />
              <span>Enter API Details (API विवरण दर्ज करें)</span>
            </button>
          </div>

        </div>

        {/* Emergency Helpline for visitors */}
        <div className="text-xs text-brand-cream-300/80 flex items-center justify-center gap-2 flex-wrap">
          <span>आपातकालीन सहायता / जानकारी हेतु:</span>
          <a
            href="tel:+919117135379"
            className="text-brand-gold-400 font-bold hover:underline"
          >
            +91 91171 35379
          </a>
        </div>

      </div>

      {/* Bottom Footer Attribution Strip */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-4 border-t border-brand-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-brand-cream-400">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-amber-300">
            {devBannerConfig.developerCredit}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <a
            href="https://www.suryajyoti.digital"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold-300 underline font-medium"
          >
            www.suryajyoti.digital
          </a>
          <span>•</span>
          <a href="tel:+917004185301" className="hover:text-brand-gold-300">
            फोन: +91 70041 85301
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. ENTER API DETAILS MODAL                              */}
      {/* ======================================================== */}
      {isApiModalOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsApiModalOpen(false)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-lg w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-maroon-800 overflow-hidden flex flex-col my-auto text-brand-charcoal-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-maroon-950 to-brand-maroon-900 text-white flex items-center justify-between border-b-2 border-brand-gold-500">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
                    <Key className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-brand-gold-300">
                      API Credentials Setup
                    </h3>
                    <p className="text-[10px] sm:text-xs text-brand-cream-200">
                      वेबसाइट लाइव सक्रियण हेतु क्रेडेंशियल्स दर्ज करें
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsApiModalOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 border border-white/20 transition"
                >
                  <span>बंद करें</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong>सुरक्षा सूचना:</strong> वेबसाइट विकास एवं परिनियोजन प्रक्रिया पूर्ण होने के उपरांत उत्पादन (Production) API कुंजियों का सत्यापन अनिवार्य है।
                  </div>
                </div>

                <form onSubmit={handleApiSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      Payment Gateway API Key (Razorpay / Cashfree) *
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

                  {apiStatusMsg && (
                    <div className="p-2.5 rounded-lg bg-brand-maroon-50 border border-brand-maroon-200 text-brand-maroon-900 text-xs font-semibold">
                      {apiStatusMsg}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-850 text-white font-bold text-xs transition shadow-md"
                    >
                      सत्यापित एवं सक्रिय करें
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsApiModalOpen(false)}
                      className="text-xs text-brand-charcoal-500 hover:underline"
                    >
                      रद्द करें
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* ======================================================== */}
      {/* 2. DEVELOPER PASSCODE UNLOCK MODAL                      */}
      {/* ======================================================== */}
      {isPasscodeModalOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setIsPasscodeModalOpen(false)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-sm w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-gold-500 overflow-hidden flex flex-col my-auto text-brand-charcoal-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-brand-maroon-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Unlock className="w-4 h-4 text-brand-gold-400" />
                  <h3 className="font-heading text-sm font-bold text-brand-gold-300">
                    डेवलपर पूर्वावलोकन अनलॉक
                  </h3>
                </div>
                <button
                  onClick={() => setIsPasscodeModalOpen(false)}
                  className="p-1 text-brand-cream-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <p className="text-brand-charcoal-600">
                  डेवलपर या व्यवस्थापक द्वारा पूर्ण वेबसाइट का पूर्वावलोकन देखने के लिए पासकोड (Passcode) दर्ज करें:
                </p>

                <form onSubmit={handleVerifyPasscode} className="space-y-3">
                  <div>
                    <input
                      type="password"
                      autoFocus
                      required
                      placeholder="पासकोड दर्ज करें (उदा. sj2026)"
                      value={enteredPasscode}
                      onChange={(e) => setEnteredPasscode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-maroon-200 text-sm font-mono text-center tracking-widest focus:outline-none focus:border-brand-saffron-600"
                    />
                  </div>

                  {passcodeError && (
                    <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs text-center font-semibold">
                      {passcodeError}
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-800 text-white font-bold text-xs transition"
                    >
                      पूर्वावलोकन अनलॉक करें (Unlock)
                    </button>

                    <button
                      type="button"
                      onClick={handleTurnLive}
                      className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition"
                    >
                      वेबसाइट को सभी के लिए लाइव करें
                    </button>
                  </div>
                </form>

                <div className="pt-2 border-t border-brand-cream-300 text-[10px] text-brand-charcoal-500 text-center">
                  डिफ़ॉल्ट पासकोड: <strong>sj2026</strong>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

    </div>
  );
}
