"use client";

import React, { useMemo } from "react";
import { Users, Tent, UtensilsCrossed, HeartHandshake, Info } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useCountUp, toHindiNumerals, formatIndianNumber } from "@/hooks/useCountUp";

interface QuickImpactBarProps {
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

function parseStatValue(raw: string) {
  // Normalize Hindi digits to Western digits for calculation
  const hindiToAscii: { [key: string]: string } = {
    "०": "0", "१": "1", "२": "2", "३": "3", "४": "4",
    "५": "5", "६": "6", "७": "7", "८": "8", "९": "9",
  };
  let normalized = raw.replace(/[०-९]/g, (ch) => hindiToAscii[ch] || ch);

  // Extract first group of digits & commas
  const match = normalized.match(/([0-9,]+)/);
  if (!match) {
    return { targetNumber: 0, prefix: "", suffix: raw, isNumeric: false };
  }

  const numStr = match[1].replace(/,/g, "");
  const targetNumber = parseInt(numStr, 10) || 0;
  const matchIndex = normalized.indexOf(match[1]);
  const prefix = raw.slice(0, matchIndex);
  const suffix = raw.slice(matchIndex + match[1].length);

  return { targetNumber, prefix, suffix, isNumeric: true };
}

function AnimatedStatCard({
  stat,
  icon,
  isInView,
}: {
  stat: { label: string; value: string; subtext: string };
  icon: React.ReactNode;
  isInView: boolean;
}) {
  const parsed = useMemo(() => parseStatValue(stat.value), [stat.value]);

  const animatedNumber = useCountUp({
    end: parsed.targetNumber,
    duration: 1800,
    isInView,
    toHindi: false,
  });

  return (
    <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-brand-cream-50/60 hover:bg-white border border-brand-maroon-100/70 hover:border-brand-gold-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="p-3 rounded-xl bg-white group-hover:bg-brand-cream-200 border border-brand-gold-300/40 flex-shrink-0 shadow-xs group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <div className="space-y-0.5">
        <div className="font-sans text-2xl sm:text-3xl font-extrabold text-brand-maroon-900 group-hover:text-brand-saffron-600 tracking-tight transition-colors tabular-nums">
          {parsed.isNumeric ? (
            <>
              {parsed.prefix}
              {animatedNumber}
              {parsed.suffix}
            </>
          ) : (
            stat.value
          )}
        </div>
        <div className="font-semibold text-sm sm:text-base text-brand-charcoal-800 leading-snug">
          {stat.label}
        </div>
        <div className="text-xs text-brand-charcoal-500 font-normal">
          {stat.subtext}
        </div>
      </div>
    </div>
  );
}

export default function QuickImpactBar({ stats }: QuickImpactBarProps) {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const icons = [
    <Users key="users" className="w-6 h-6 text-brand-saffron-500" />,
    <Tent key="tent" className="w-6 h-6 text-brand-gold-600" />,
    <UtensilsCrossed key="utensils" className="w-6 h-6 text-brand-saffron-500" />,
    <HeartHandshake key="volunteers" className="w-6 h-6 text-brand-gold-600" />,
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="प्रभाव आंकड़े एवं उपलब्धियाँ"
      className="relative z-20 bg-white border-y border-brand-maroon-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Compliance & Live marker */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-brand-cream-300 text-xs text-brand-charcoal-600">
          <div className="flex items-center gap-2 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-brand-maroon-900 font-bold">
              जमीनी सेवा प्रभाव
            </span>
            <span className="text-brand-charcoal-500 hidden sm:inline">
              (सत्यापित जमीनी रिकॉर्ड्स पर आधारित)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-brand-charcoal-600 bg-brand-cream-100 px-2.5 py-1 rounded-full border border-brand-cream-300">
            <Info className="w-3.5 h-3.5 text-brand-maroon-700" />
            <span>संस्था द्वारा सत्यापित व प्रमाणित आंकड़े</span>
          </div>
        </div>

        {/* 4 Animated Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <AnimatedStatCard
              key={idx}
              stat={stat}
              icon={icons[idx % icons.length]}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
