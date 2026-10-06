"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Utensils,
  Home,
  BookOpen,
  HeartPulse,
  Users,
  Smile,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  PhoneCall,
  HeartHandshake,
  Flame,
  Landmark,
  GraduationCap,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { ServiceItem } from "@/data/foundationData";
import { useLanguage } from "@/context/LanguageContext";
import { englishServices } from "@/data/translations";
import TraditionalDivider from "./TraditionalDivider";
import ModalPortal from "./ModalPortal";
import RangoliCorner from "./RangoliCorner";

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenHelpWithService?: (serviceName: string) => void;
}

export default function ServicesSection({
  services = [],
  onOpenHelpWithService,
}: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { isEn } = useLanguage();

  // Icon mapping
  const getIcon = (iconName: string) => {
    const props = { className: "w-7 h-7 text-brand-maroon-800" };
    switch (iconName) {
      case "HeartHandshake":
        return <HeartHandshake {...props} />;
      case "Flame":
        return <Flame {...props} />;
      case "Landmark":
        return <Landmark {...props} />;
      case "HeartPulse":
        return <HeartPulse {...props} />;
      case "GraduationCap":
        return <GraduationCap {...props} />;
      case "Leaf":
        return <Leaf {...props} />;
      case "ShieldAlert":
        return <ShieldAlert {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "TrendingUp":
        return <TrendingUp {...props} />;
      case "Utensils":
        return <Utensils {...props} />;
      case "Home":
        return <Home {...props} />;
      case "BookOpen":
        return <BookOpen {...props} />;
      case "Users":
        return <Users {...props} />;
      case "Smile":
        return <Smile {...props} />;
      default:
        return <HeartPulse {...props} />;
    }
  };

  return (
    <section
      id="hamari-sevayein"
      className="py-16 sm:py-24 bg-white border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label={isEn ? "Our services and initiatives" : "हमारी सेवाएँ एवं कार्य क्षेत्र"}
    >
      {/* Background Indian Rangoli / Kolam Diagonal Motifs */}
      <RangoliCorner position="top-right" size={380} opacity={0.065} className="hidden lg:block" />
      <RangoliCorner position="bottom-left" size={380} opacity={0.065} className="hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>{isEn ? "Public Welfare, Culture & Seva" : "जनकल्याण, संस्कृति एवं सेवा संकल्प"}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            {isEn ? "Our 10 Core Services" : "हमारी सेवाएँ"}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            {isEn
              ? "Shivshakti Seva Foundation is dedicated to delivering relief, spiritual harmony, healthcare, and education across communities."
              : "शिवशक्ति सेवा फाउंडेशन विभिन्न क्षेत्रों में मानवीय संवेदना, सनातन संस्कृति, करुणा और समर्पण के साथ निरंतर सक्रिय है।"}
          </p>
          <TraditionalDivider color="gold" variant="lotus" className="mt-2" />
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {(services || []).map((service) => {
            const eng = englishServices[service.id];
            const title = isEn && eng ? eng.title : service.title;
            const shortDesc = isEn && eng ? eng.shortDesc : service.shortDesc;

            return (
              <div
                key={service.id}
                className="group relative bg-brand-cream-50/90 hover:bg-white rounded-2xl p-5 border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                {/* Real field work background photo */}
                {service.bgImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-50 transition-all duration-500 ease-out pointer-events-none transform scale-100 group-hover:scale-105 filter saturate-125 contrast-110"
                    style={{ backgroundImage: `url(${service.bgImage})` }}
                    aria-hidden="true"
                  />
                )}
                {/* Subtle radiant gradient on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/75 to-white/25 opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Icon wrapper */}
                  <div className="w-13 h-13 p-3 rounded-xl bg-white group-hover:bg-brand-cream-100 border border-brand-maroon-100 group-hover:border-brand-gold-400 inline-flex items-center justify-center mb-4 shadow-sm transition-all duration-300">
                    {getIcon(service.icon)}
                  </div>

                  {/* Service Title */}
                  <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-700 transition-colors mb-2 leading-snug">
                    {title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed font-medium">
                    {shortDesc}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 pt-4 mt-4 border-t border-brand-cream-300/80 group-hover:border-brand-gold-300/80 flex items-center justify-between gap-2 transition-colors">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-brand-maroon-800 hover:text-brand-saffron-600 inline-flex items-center gap-1 group/btn transition cursor-pointer"
                    aria-label={`${title} - ${isEn ? "View details" : "विस्तृत विवरण देखें"}`}
                  >
                    <span>{isEn ? "Details" : "विस्तार"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {onOpenHelpWithService && (
                    <button
                      onClick={() => onOpenHelpWithService(title)}
                      className="text-[11px] font-medium text-brand-saffron-700 hover:text-white bg-brand-saffron-50 hover:bg-brand-saffron-600 px-2 py-1 rounded border border-brand-saffron-300 transition cursor-pointer"
                      title={isEn ? "Request aid for this service" : "इस सेवा हेतु सहायता मांगें"}
                    >
                      {isEn ? "Request Aid" : "सहायता मांगें"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Low-digital-literacy Friendly Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-950 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-saffron-500/20 border border-brand-saffron-400/40 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6 text-brand-gold-400 animate-pulse" />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-brand-cream-50">
                {isEn
                  ? "Are you or someone you know facing an urgent crisis?"
                  : "क्या आप या आपका कोई परिचित किसी संकट में है?"}
              </h4>
              <p className="text-xs sm:text-sm text-brand-cream-200">
                {isEn
                  ? "Reach out directly to our 24×7 emergency helpline without any formalities."
                  : "बिना किसी औपचारिकता के हमारी २४×७ हेल्पलाइन पर संपर्क करें।"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+919117135379"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-brand-saffron-500 hover:bg-brand-saffron-600 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isEn ? "Call Directly:" : "सीधे फोन करें:"} <span className="font-sans font-extrabold">+91 91171 35379</span></span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (() => {
        const eng = englishServices[selectedService.id];
        const modalTitle = isEn && eng ? eng.title : selectedService.title;
        const modalDesc = isEn && eng ? eng.fullDesc : selectedService.fullDesc;
        const modalHighlights = isEn && eng ? eng.highlights : selectedService.highlights;

        return (
          <ModalPortal>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              className="modal-after-topbar p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedService(null);
              }}
            >
              <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-brand-maroon-200 overflow-hidden flex flex-col modal-card-after-topbar animate-scaleIn">
                {/* Modal Header */}
                <div className="p-4 sm:p-5 bg-brand-maroon-950 text-white flex items-center justify-between border-b border-brand-maroon-800 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-brand-maroon-900">
                      {getIcon(selectedService.icon)}
                    </div>
                    <h3
                      id="service-modal-title"
                      className="font-heading text-lg sm:text-xl font-bold text-brand-gold-300"
                    >
                      {modalTitle}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-brand-cream-100 hover:text-white transition font-bold text-xs border border-white/20 active:scale-95"
                    aria-label={isEn ? "Close dialog" : "संवाद बंद करें"}
                  >
                    <span className="hidden sm:inline">{isEn ? "Close" : "बंद करें"}</span>
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-4 text-brand-charcoal-800 text-sm">
                  <p className="leading-relaxed text-base font-normal">
                    {modalDesc}
                  </p>

                  <div className="pt-2">
                    <h4 className="font-bold text-sm text-brand-maroon-900 mb-2">
                      {isEn ? "Key Components of this Service:" : "इस सेवा के प्रमुख घटक:"}
                    </h4>
                    <div className="space-y-2">
                      {modalHighlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2 rounded-lg bg-brand-cream-100 border border-brand-cream-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium text-xs sm:text-sm text-brand-charcoal-800">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-brand-gold-50 border border-brand-gold-200 text-brand-charcoal-700 text-xs">
                    <strong>{isEn ? "Transparency Pledge: " : "पारदर्शिता संकल्प: "}</strong>
                    {isEn
                      ? "This service is provided 100% free of cost on the principle of direct, dignified humanitarian relief."
                      : "यह सेवा पूर्णतः निःशुल्क और प्रत्यक्ष मानवीय सहायता के सिद्धांत पर आधारित है।"}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex items-center justify-between">
                  {onOpenHelpWithService ? (
                    <button
                      onClick={() => {
                        const title = modalTitle;
                        setSelectedService(null);
                        onOpenHelpWithService(title);
                      }}
                      className="px-4 py-2 rounded-lg bg-brand-saffron-600 hover:bg-brand-saffron-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition"
                    >
                      {isEn ? "Request Aid for this Service" : "इस सेवा हेतु आवेदन करें"}
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 rounded-lg bg-brand-charcoal-200 hover:bg-brand-charcoal-300 text-brand-charcoal-800 font-semibold text-xs sm:text-sm transition"
                  >
                    {isEn ? "Close" : "बंद करें"}
                  </button>
                </div>
              </div>
            </div>
          </ModalPortal>
        );
      })()}
    </section>
  );
}
