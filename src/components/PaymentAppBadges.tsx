"use client";

import React from "react";

/**
 * High-fidelity, lightweight SVG logos with glowing effects for:
 * PhonePe, Paytm, Google Pay, Amazon Pay, and BHIM UPI.
 */

interface PaymentAppBadgesProps {
  className?: string;
  size?: "sm" | "md";
}

export default function PaymentAppBadges({
  className = "",
  size = "md",
}: PaymentAppBadgesProps) {
  const isSm = size === "sm";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 ${className}`}
      aria-label="स्वीकृत यूपीआई ऐप्स — PhonePe, Paytm, Google Pay, Amazon Pay, BHIM"
    >
      {/* 1. PhonePe (फोनपे) */}
      <div
        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-purple-200/90 shadow-[0_0_12px_rgba(103,58,183,0.22)] hover:shadow-[0_0_18px_rgba(103,58,183,0.45)] hover:border-purple-400 transition-all duration-300"
        title="PhonePe द्वारा भुगतान उपलब्ध"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-[#5f259f] text-white shadow-xs">
          {/* Devanagari 'Pe' stylized icon */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 7.58 4 4 7.58 4 12c0 3.64 2.59 6.67 6.04 7.36v-3.41c-.96-.45-1.63-1.42-1.63-2.55 0-1.55 1.25-2.8 2.8-2.8h1.2v-1.2c0-.66-.54-1.2-1.2-1.2-.66 0-1.2.54-1.2 1.2h-1.6c0-1.55 1.25-2.8 2.8-2.8 1.55 0 2.8 1.25 2.8 2.8v4.8c0 .88.72 1.6 1.6 1.6h.4v1.6h-.4c-1.47 0-2.71-.99-3.08-2.34-.33.22-.72.34-1.12.34-1.13 0-2.1-.67-2.55-1.63H19.36z" />
          </svg>
          <span className="absolute -inset-0.5 rounded-lg bg-purple-500/20 blur-[2px] -z-10 group-hover:bg-purple-500/40" />
        </span>
        <span
          className={`font-bold text-[#5f259f] tracking-tight ${
            isSm ? "text-[11px]" : "text-xs"
          }`}
        >
          PhonePe
        </span>
      </div>

      {/* 2. Google Pay (गूगल पे) */}
      <div
        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-blue-200/90 shadow-[0_0_12px_rgba(66,133,244,0.22)] hover:shadow-[0_0_18px_rgba(66,133,244,0.45)] hover:border-blue-400 transition-all duration-300"
        title="Google Pay (GPay) द्वारा भुगतान उपलब्ध"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-white border border-slate-200 shadow-xs">
          {/* Google 4-Color 'G' Logo */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.31 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span className="absolute -inset-0.5 rounded-lg bg-blue-500/20 blur-[2px] -z-10 group-hover:bg-blue-500/40" />
        </span>
        <span
          className={`font-bold text-slate-800 tracking-tight ${
            isSm ? "text-[11px]" : "text-xs"
          }`}
        >
          Google Pay
        </span>
      </div>

      {/* 3. Paytm (पेटीएम) */}
      <div
        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-cyan-200/90 shadow-[0_0_12px_rgba(0,185,245,0.22)] hover:shadow-[0_0_18px_rgba(0,185,245,0.45)] hover:border-cyan-400 transition-all duration-300"
        title="Paytm द्वारा भुगतान उपलब्ध"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-[#002e6e] text-[#00b9f5] font-black text-[9px] shadow-xs">
          <span>P</span>
          <span className="text-white">t</span>
          <span className="absolute -inset-0.5 rounded-lg bg-cyan-400/25 blur-[2px] -z-10 group-hover:bg-cyan-400/50" />
        </span>
        <span
          className={`font-black tracking-tight ${
            isSm ? "text-[11px]" : "text-xs"
          }`}
        >
          <span className="text-[#002e6e]">Pay</span>
          <span className="text-[#00b9f5]">tm</span>
        </span>
      </div>

      {/* 4. Amazon Pay (अमेज़न पे) */}
      <div
        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-amber-200/90 shadow-[0_0_12px_rgba(255,153,0,0.22)] hover:shadow-[0_0_18px_rgba(255,153,0,0.45)] hover:border-amber-400 transition-all duration-300"
        title="Amazon Pay द्वारा भुगतान उपलब्ध"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-[#232f3e] text-[#ff9900] shadow-xs">
          {/* Curved Amazon smile arrow */}
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M15.5 13.5c-2.4 1.8-5.9 2.7-8.9 1.4-.4-.2-.8.2-.5.6 2.2 2.6 6.8 3.5 10.1 1 .5-.4 0-1.1-.7-1.1v-.1c-.4-.4-.8-.7-1.1-.9.6.1 1.1.1 1.1-.9zM20.2 16.7c-.2-.3-.8-.1-.9.2-.3 1.1-1.3 1.8-2.4 2-.4.1-.5.6-.1.8 1.4.5 3 .1 3.7-1 .2-.3 0-.7-.3-1v-1z" />
          </svg>
          <span className="absolute -inset-0.5 rounded-lg bg-amber-400/25 blur-[2px] -z-10 group-hover:bg-amber-400/50" />
        </span>
        <span
          className={`font-bold text-slate-900 tracking-tight ${
            isSm ? "text-[11px]" : "text-xs"
          }`}
        >
          <span>amazon</span>
          <span className="text-[#ff9900] ml-0.5 font-extrabold">pay</span>
        </span>
      </div>

      {/* 5. BHIM UPI (भीम यूपीआई) */}
      <div
        className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-emerald-200/90 shadow-[0_0_12px_rgba(0,130,114,0.22)] hover:shadow-[0_0_18px_rgba(0,130,114,0.45)] hover:border-emerald-400 transition-all duration-300"
        title="BHIM एवं समस्त UPI ऐप्स द्वारा भुगतान उपलब्ध"
      >
        <span className="relative flex items-center justify-center w-5 h-5 rounded-lg bg-gradient-to-tr from-[#005d54] to-[#008272] text-white shadow-xs">
          {/* BHIM Triangle Logo */}
          <svg viewBox="0 0 24 24" className="w-3 h-3">
            <polygon points="4,20 12,4 12,20" fill="#f97316" />
            <polygon points="12,4 20,20 12,20" fill="#10b981" />
          </svg>
          <span className="absolute -inset-0.5 rounded-lg bg-emerald-500/25 blur-[2px] -z-10 group-hover:bg-emerald-500/50" />
        </span>
        <span
          className={`font-black text-[#005d54] tracking-tight ${
            isSm ? "text-[11px]" : "text-xs"
          }`}
        >
          BHIM <span className="text-emerald-700 font-bold">UPI</span>
        </span>
      </div>
    </div>
  );
}
