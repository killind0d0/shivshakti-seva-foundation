"use client";

import React from "react";
import Image from "next/image";
import { Quote, ShieldCheck, Heart, Sparkles, Phone, Mail, Award } from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";
import { useLanguage } from "@/context/LanguageContext";

export default function FoundersVision() {
  const { isEn, t } = useLanguage();

  return (
    <section
      id="sansthapak-sandesh"
      className="py-16 sm:py-24 bg-parchment-traditional relative overflow-hidden border-y-2 border-brand-gold-400/30"
      aria-label={t("संस्थापक का संदेश", "Founder's Message")}
    >
      {/* Decorative Subtle Background Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-no-repeat bg-contain bg-center opacity-[0.035] pointer-events-none select-none filter contrast-125"
        style={{ backgroundImage: "url('/images/logo/logo_emblem.png')" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-maroon-900/10 border border-brand-gold-500/40 text-brand-maroon-900 text-xs sm:text-sm font-bold shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-600" />
            <span>{t("धरातल से सीधा संवाद • मानवीय नेतृत्व", "Direct Ground Dialogue • Compassionate Leadership")}</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight leading-tight">
            {t("संस्थापक एवं मुख्य सेवादार का पावन संदेश", "Sacred Message from Founder & Chief Sevadar")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-brand-maroon-900/80 font-medium">
            {t("“नर सेवा ही नारायण सेवा है — जब तक अंतिम पंक्ति के व्यक्ति के चेहरे पर मुस्कान न हो, हमारा संकल्प अधूरा है।”", "“Service to humanity is service to the Divine — until the person in the last row smiles, our mission remains unfinished.”")}
          </p>

          <TraditionalDivider />
        </div>

        {/* Asymmetrical Editorial Story Block (Breaks Card Fatigue) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols): Editorial Parchment Letter */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-brand-gold-400/40 relative">
            <TraditionalCornerFlourish size={36} color="#d4af37" className="opacity-75" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-brand-maroon-900 text-brand-gold-300 shadow-md">
                <Quote className="w-6 h-6 rotate-180" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-700 block">
                  {t("आधिकारिक वक्तव्य", "Official Statement")}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-maroon-950">
                  {t("आदरणीय बंधुओं, माताओं एवं सेवा सहयोगियों,", "Respected Brothers, Sisters, Mothers & Companions in Service,")}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-brand-charcoal-800 text-sm sm:text-base devanagari-relaxed font-normal">
              <p className="dropcap-traditional">
                {t(
                  "शिवशक्ति सेवा फाउंडेशन की नींव किसी पद या प्रचार के लिए नहीं, बल्कि समाज के उस मूक दर्द को बांटने के लिए रखी गई है जिसे अक्सर अनदेखा कर दिया जाता है। जब कोई भूखा सोता है, कोई असहाय बहन अपने स्वावलंबन के लिए संघर्ष करती है, या कोई अनाथ बच्चा शिक्षा से वंचित रह जाता है, तब हमारा हृदय व्यथित होता है।",
                  "The Shivshakti Seva Foundation was founded not for title or publicity, but to address the silent suffering in society that often goes unnoticed. When anyone sleeps hungry, when a vulnerable sister struggles for self-reliance, or when an orphaned child is deprived of education, our hearts are deeply moved."
                )}
              </p>

              <p>
                {t(
                  "हमारा दृढ़ विश्वास है कि सच्चा धर्म वही है जो पीड़ित के आँसू पोंछ सके। हमने यह प्रण लिया है कि आपके द्वारा दिया गया एक-एक रुपया और हमारे कार्यकर्ताओं का हर एक पसीना सीधे धरातल पर पहुंचेगा। संस्था का प्रत्येक प्रकल्प पूर्ण निष्पक्षता, पारदर्शी लेखा-जोखा और सनातन करुणा की भावना से संचालित होता है।",
                  "We firmly believe that true faith is that which wipes the tears of the suffering. We have resolved that every single rupee contributed and every drop of effort by our volunteers reaches directly to the grassroots. Every mission is conducted with absolute impartiality, transparent accounting, and compassionate devotion."
                )}
              </p>

              <p className="italic text-brand-maroon-900 font-semibold bg-brand-cream-100/70 p-3.5 rounded-xl border-l-4 border-brand-saffron-500">
                {t(
                  "“सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः — यह केवल एक श्लोक नहीं, हमारी प्रत्येक साँस और हर सेवा अभियान का जीवन-मंत्र है।”",
                  "“Sarve Bhavantu Sukhinah, Sarve Santu Niramayah (May all beings be happy, may all beings be healthy) — this is not merely a verse, but the guiding mantra of every breath and service campaign we undertake.”"
                )}
              </p>
            </div>

            {/* Signature & Seal Block */}
            <div className="mt-8 pt-6 border-t border-brand-maroon-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold-500 shadow-md shrink-0 bg-brand-cream-200 ring-2 ring-brand-maroon-900/10">
                  <Image
                    src="/images/founder.png"
                    alt="आकाश जयदेव गिरि (Akash Jaidev Giri) — संस्थापक एवं मुख्य सेवादार"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-gold-500/15 border border-brand-gold-500/40 text-[10px] font-bold text-brand-maroon-900 mb-1">
                    <Award className="w-3 h-3 text-brand-gold-600" />
                    <span>{t("मुख्य मार्गदर्शक एवं प्रेरणास्रोत", "Chief Mentor & Inspiration")}</span>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-black text-brand-maroon-950 tracking-tight leading-tight">
                    {t("आकाश जयदेव गिरि", "Akash Jaidev Giri")}
                  </h3>
                  <div className="font-serif text-xs sm:text-sm font-bold text-brand-saffron-800 tracking-wide">
                    (Akash Jaidev Giri)
                  </div>
                  <div className="text-xs font-bold text-brand-maroon-900 mt-1">
                    {t("संस्थापक एवं मुख्य सेवादार • ", "Founder & Chief Sevadar • ")}<span className="text-brand-charcoal-600 font-medium">{t("शिवशक्ति सेवा फाउंडेशन", "Shivshakti Seva Foundation")}</span>
                  </div>
                </div>
              </div>

              {/* Traditional Gold Wax Seal (Seal of Trust & Integrity) */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-brand-gold-500/60 shadow-sm flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold-400 via-amber-600 to-brand-maroon-900 flex items-center justify-center text-white shadow-inner flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-100" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    {t("प्रमाणित सेवा संकल्प", "Certified Service Resolve")}
                  </span>
                  <span className="text-xs font-black text-brand-maroon-950">
                    {t("सत्यं • शिवं • सुन्दरम्", "Truth • Purity • Humanity")}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Helpline Badge */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-charcoal-600 bg-brand-cream-100/60 p-3 rounded-xl border border-brand-gold-300/40">
              <a
                href="tel:+919117135379"
                className="inline-flex items-center gap-1.5 hover:text-brand-saffron-600 transition"
              >
                <Phone className="w-3.5 h-3.5 text-brand-saffron-600" />
                <span>{t("सीधा संवाद: ", "Direct Contact: ")}<span className="font-sans font-bold tracking-wide">91171 35379</span></span>
              </a>
              <span className="text-brand-gold-400">•</span>
              <a
                href="mailto:akashgiri91171@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-brand-saffron-600 transition"
              >
                <Mail className="w-3.5 h-3.5 text-brand-maroon-700" />
                <span>akashgiri91171@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Visual Founder Portrait & Sacred Pillars */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Founder Portrait Card with Gold Border - 100% Uncropped Full Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-gold-400/50 bg-white group">
              {/* Top Accent Bar */}
              <div className="h-2 bg-gradient-to-r from-brand-maroon-900 via-brand-gold-500 to-brand-saffron-600" />

              {/* Uncropped Full Figure Photo Container */}
              <div className="relative w-full aspect-[1117/1409] max-w-[440px] mx-auto bg-gradient-to-b from-brand-cream-100 via-amber-50/80 to-white flex items-end justify-center p-3 sm:p-4 overflow-hidden">
                {/* Subtle Decorative Aura */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.18),transparent_70%)] pointer-events-none" />

                <Image
                  src="/images/founder.png"
                  alt={t("आकाश जयदेव गिरि (Akash Jaidev Giri) — संस्थापक एवं मुख्य सेवादार (शिवशक्ति सेवा फाउंडेशन)", "Akash Jaidev Giri — Founder & Chief Sevadar (Shivshakti Seva Foundation)")}
                  fill
                  sizes="(max-width: 768px) 100vw, 440px"
                  className="object-contain object-bottom group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-2xl"
                  priority
                />

                {/* Floating Top Badge (Doesn't cover body) */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-maroon-900/90 text-brand-gold-300 text-[11px] font-bold tracking-wide backdrop-blur-md shadow-md border border-brand-gold-500/40">
                    <Award className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>{t("संस्थापक एवं मुख्य मार्गदर्शक", "Founder & Chief Mentor")}</span>
                  </div>
                </div>
              </div>

              {/* Founder Information & Dedication (Cleanly placed below the uncropped photo) */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-white via-brand-cream-50/50 to-brand-cream-100/40 border-t border-brand-gold-300/40">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-maroon-900 via-amber-900 to-brand-maroon-950 text-brand-gold-300 text-xs font-bold tracking-wide shadow-sm border border-brand-gold-500/50 mb-2.5">
                    <Award className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>{t("पावन प्रेरणास्रोत एवं मुख्य मार्गदर्शक", "Sacred Inspiration & Chief Mentor")}</span>
                  </div>
                  <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-maroon-950 tracking-normal leading-tight">
                    {t("आकाश जयदेव गिरि", "Akash Jaidev Giri")}
                  </h4>
                  <div className="font-serif text-sm sm:text-base font-bold text-brand-saffron-800 tracking-wider mt-0.5">
                    (Akash Jaidev Giri)
                  </div>

                  {/* Traditional Auspicious Divider */}
                  <div className="flex items-center justify-center gap-2.5 my-3" aria-hidden="true">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold-500/80" />
                    <div className="w-2 h-2 rotate-45 bg-brand-gold-500 ring-2 ring-brand-gold-200" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold-500/80" />
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-brand-maroon-900 tracking-wide uppercase">
                    {t("संस्थापक एवं मुख्य सेवादार • शिवशक्ति सेवा फाउंडेशन", "Founder & Chief Sevadar • Shivshakti Seva Foundation")}
                  </p>
                  <p className="text-xs text-brand-charcoal-700 italic mt-3 bg-white/80 p-2.5 rounded-xl border border-brand-gold-300/30 shadow-2xs leading-relaxed">
                    {t("“सेवा केवल सहायता नहीं, मानवता के प्रति हमारा परम पावन दायित्व है।”", "“Service is not mere assistance, but our most sacred duty towards humanity.”")}
                  </p>
                </div>

                {/* 100% & 24x7 Stats */}
                <div className="grid grid-cols-2 gap-3 text-center pt-2 border-t border-brand-gold-200/50">
                  <div className="p-3 rounded-2xl bg-white border border-brand-gold-400/30 shadow-2xs">
                    <div className="text-xl sm:text-2xl font-sans font-extrabold text-brand-maroon-950 tabular-nums">
                      100%
                    </div>
                    <div className="text-[11px] font-bold text-brand-maroon-800 mt-0.5">
                      {t("निःस्वार्थ समर्पण", "Selfless Dedication")}
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-brand-gold-400/30 shadow-2xs">
                    <div className="text-xl sm:text-2xl font-sans font-extrabold text-brand-maroon-950 tabular-nums">
                      24×7
                    </div>
                    <div className="text-[11px] font-bold text-brand-maroon-800 mt-0.5">
                      {t("सेवा तत्परता", "Service Readiness")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sacred Assurance Card */}
            <div className="p-5 rounded-2xl bg-brand-maroon-950 text-white shadow-lg border border-brand-gold-500/40 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-brand-gold-500 text-brand-maroon-950 font-bold flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading text-sm sm:text-base font-bold text-brand-gold-300">
                    {t("हमारा त्रिसूत्रीय संकल्प", "Our Three-Fold Pledge")}
                  </h4>
                  <p className="text-xs text-white/85 mt-1 leading-relaxed">
                    {t(
                      "१. पूर्ण वित्तीय शुचिता एवं पारदर्शी लेखा \n२. बिना किसी भेदभाव के सर्वजन हिताय सेवा \n३. सहायता प्राप्त करने वाले की गरिमा का पूर्ण सम्मान",
                      "1. Absolute financial integrity & open accounts \n2. Service for all beings without discrimination \n3. Deep respect for the dignity of beneficiaries"
                    )}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
