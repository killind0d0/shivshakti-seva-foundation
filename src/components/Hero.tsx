"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HeartHandshake, Eye, ShieldCheck, Sparkles, ChevronRight, Phone } from "lucide-react";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

interface HeroProps {
  onOpenDonation: () => void;
  onOpenHelp: () => void;
}

const fullVerse = "॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥";

export default function Hero({ onOpenDonation, onOpenHelp }: HeroProps) {
  const [displayedVerse, setDisplayedVerse] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedVerse(fullVerse);
      return;
    }

    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const step = () => {
      if (currentIndex < fullVerse.length) {
        currentIndex++;
        setDisplayedVerse(fullVerse.slice(0, currentIndex));
        const char = fullVerse[currentIndex - 1];
        const delay = char === "।" || char === "॥" ? 350 : 45;
        timer = setTimeout(step, delay);
      }
    };

    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="mukhya-prishth"
      className="relative overflow-hidden bg-brand-maroon-950 text-white py-10 sm:py-14 lg:py-16 flex items-center"
      aria-label="मुख्य परिचयात्मक खंड"
    >
      {/* Background Image with warm dignified overlay & Mandala Texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/hero_community.jpg"
          alt="शिवशक्ति सेवा फाउंडेशन के स्वयंसेवक समुदाय की सेवा करते हुए"
          fill
          priority
          className="object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
          sizes="100vw"
        />
        {/* Traditional Mandala & Multilayer gradient */}
        <div className="absolute inset-0 bg-pattern-mandala opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900/90 to-brand-maroon-950/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-950 via-transparent to-brand-maroon-950/60" />
        {/* Subtle warm glow circle */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-saffron-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Philosophical Badge */}
            <div className="animate-slideUp inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-maroon-900/80 border border-brand-gold-500/40 text-brand-gold-400 text-xs sm:text-sm font-medium backdrop-blur-sm shadow-sm hover:border-brand-gold-400 transition-colors">
              <Sparkles className="w-4 h-4 text-brand-gold-400 animate-pulse" />
              <span>सेवा केवल सहायता नहीं, मानवता के प्रति हमारा दायित्व है</span>
            </div>

            {/* Powerful Headline */}
            <h1 className="animate-slideUp [animation-delay:150ms] font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-cream-50 leading-[1.25] sm:leading-[1.2]">
              जहाँ जरूरत है, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-400 via-brand-saffron-400 to-brand-gold-300">
                वहाँ हमारी सेवा है।
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="animate-slideUp [animation-delay:300ms] text-base sm:text-xl text-brand-cream-200/90 max-w-3xl font-normal leading-relaxed">
              शिवशक्ति सेवा फाउंडेशन जरूरतमंद, असहाय और आपदा से प्रभावित लोगों के
              साथ खड़ा होकर सेवा, राहत और पुनर्वास के माध्यम से मानवता की सेवा के
              लिए प्रतिबद्ध है।
            </p>

            {/* Sacred Sankalp Shloka with Hindi Meaning */}
            <div className="relative animate-slideUp [animation-delay:450ms] p-4 sm:p-5 rounded-2xl bg-brand-maroon-900/90 border-2 border-brand-gold-500/50 backdrop-blur-md space-y-2 max-w-2xl shadow-xl hover:border-brand-gold-400 transition-all overflow-hidden">
              <TraditionalCornerFlourish color="#d4af37" size={24} />
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-brand-gold-400"></span>
                <span className="text-xs font-bold text-brand-gold-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold-400" />
                  शिवशक्ति सेवा फाउंडेशन का मूल सिद्धांत
                </span>
                <span className="w-6 h-[2px] bg-brand-gold-400"></span>
              </div>
              <p className="font-heading text-sm sm:text-base lg:text-lg text-brand-gold-200 leading-relaxed font-bold italic text-center py-1 whitespace-pre-line min-h-[3.25rem]">
                {displayedVerse}
                {displayedVerse.length < fullVerse.length && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-brand-gold-400 animate-pulse align-middle" />
                )}
              </p>
              {/* Hindi Meaning for Common Public */}
              <div className="pt-2 border-t border-brand-gold-400/30 text-center">
                <p className="text-xs sm:text-sm text-brand-cream-100 font-medium leading-relaxed">
                  <span className="text-brand-gold-300 font-bold">सरल हिंदी भावार्थ: </span>
                  “सब सुखी हों, सब रोगमुक्त व स्वस्थ रहें, सभी का मंगल व कल्याण हो, और कोई भी दुःख का भागी न बने।”
                </p>
              </div>
            </div>

            {/* Call to Actions - Cleanly structured for mobile thumb reach */}
            <div className="animate-slideUp [animation-delay:600ms] flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 pt-4">
              <button
                onClick={onOpenDonation}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-brand-saffron-500 to-brand-saffron-600 hover:from-brand-saffron-600 hover:to-brand-saffron-700 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 border-b-2 border-brand-gold-400 hover:-translate-y-0.5 w-full xs:w-auto"
                aria-label="सहयोग करें"
              >
                <HeartHandshake className="w-5 h-5 text-brand-gold-200" />
                <span>सहयोग करें</span>
              </button>

              <button
                onClick={() => scrollToSection("hamare-karya")}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-brand-maroon-900/80 hover:bg-brand-maroon-800 text-brand-cream-100 hover:text-white font-semibold text-sm sm:text-base border border-brand-gold-500/40 hover:border-brand-gold-400 transition-all duration-200 hover:-translate-y-0.5 w-full xs:w-auto"
                aria-label="हमारे कार्य देखें"
              >
                <Eye className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-brand-gold-400" />
                <span>हमारे कार्य देखें</span>
              </button>

              <button
                onClick={onOpenHelp}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-brand-cream-200 hover:text-white font-medium text-sm border border-white/20 transition backdrop-blur-sm hover:-translate-y-0.5 w-full xs:w-auto"
                aria-label="आपातकालीन सहायता अनुरोध"
              >
                <Phone className="w-4 h-4 text-brand-saffron-400" />
                <span>सहायता चाहिए?</span>
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="animate-slideUp [animation-delay:750ms] pt-6 grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3 border-t border-brand-maroon-800/80 text-xs sm:text-sm text-brand-cream-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>१००% पारदर्शी सेवा</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>प्रत्यक्ष जमीनी राहत</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                <span>मानवीय संवेदना एवं आदर</span>
              </div>
            </div>
          </div>

          {/* Official Emblem Presentation Box — Grand Traditional Filigree Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <div className="relative p-6 sm:p-8 lg:p-9 rounded-3xl bg-gradient-to-b from-brand-maroon-900/95 via-brand-maroon-950 to-black/95 border-2 border-brand-gold-500/70 shadow-2xl backdrop-blur-md max-w-md lg:max-w-lg w-full text-center overflow-hidden">
              <TraditionalCornerFlourish color="#d4af37" size={36} />

              {/* Grand Outer Sacred Ring */}
              <div className="relative mx-auto w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-tr from-brand-gold-500/70 via-brand-saffron-500/50 to-brand-gold-400/80 shadow-2xl flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-brand-maroon-950 p-2 flex items-center justify-center shadow-inner border border-brand-gold-500/40">
                  <Image
                    src="/images/logo/logo_emblem.png"
                    alt="शिवशक्ति सेवा फाउंडेशन आधिकारिक प्रतीक"
                    width={400}
                    height={400}
                    className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] w-full h-full"
                    priority
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-gold-300 tracking-wide">
                  शिवशक्ति सेवा फाउंडेशन
                </h3>
                <p className="text-xs sm:text-sm text-brand-cream-200 font-semibold tracking-wider">
                  पंजीकृत सामाजिक कल्याण ट्रस्ट
                </p>
                <div className="inline-block mt-2 px-4 py-1.5 rounded-full bg-brand-maroon-800/90 text-xs sm:text-sm font-bold text-brand-gold-300 border border-brand-gold-500/40 shadow-sm">
                  सहानुभूति • समर्पण • निःस्वार्थ सेवा
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
