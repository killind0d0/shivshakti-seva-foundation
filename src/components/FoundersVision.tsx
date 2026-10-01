"use client";

import React from "react";
import Image from "next/image";
import { Quote, ShieldCheck, Heart, Sparkles, Phone, Mail, Award } from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

export default function FoundersVision() {
  return (
    <section
      id="sansthapak-sandesh"
      className="py-16 sm:py-24 bg-parchment-traditional relative overflow-hidden border-y-2 border-brand-gold-400/30"
      aria-label="संस्थापक का संदेश"
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
            <span>धरातल से सीधा संवाद • मानवीय नेतृत्व</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight leading-tight">
            संस्थापक एवं मुख्य सेवादार का पावन संदेश
          </h2>

          <p className="mt-3 text-sm sm:text-base text-brand-maroon-900/80 font-medium">
            “नर सेवा ही नारायण सेवा है — जब तक अंतिम पंक्ति के व्यक्ति के चेहरे पर मुस्कान न हो, हमारा संकल्प अधूरा है।”
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
                  आधिकारिक वक्तव्य
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-maroon-950">
                  आदरणीय बंधुओं, माताओं एवं सेवा सहयोगियों,
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-brand-charcoal-800 text-sm sm:text-base devanagari-relaxed font-normal">
              <p className="dropcap-traditional">
                शिवशक्ति सेवा फाउंडेशन की नींव किसी पद या प्रचार के लिए नहीं, बल्कि समाज के उस मूक दर्द को बांटने के लिए रखी गई है जिसे अक्सर अनदेखा कर दिया जाता है। जब कोई भूखा सोता है, कोई असहाय बहन अपने स्वावलंबन के लिए संघर्ष करती है, या कोई अनाथ बच्चा शिक्षा से वंचित रह जाता है, तब हमारा हृदय व्यथित होता है।
              </p>

              <p>
                हमारा दृढ़ विश्वास है कि सच्चा धर्म वही है जो पीड़ित के आँसू पोंछ सके। हमने यह प्रण लिया है कि आपके द्वारा दिया गया एक-एक रुपया और हमारे कार्यकर्ताओं का हर एक पसीना सीधे धरातल पर पहुंचेगा। संस्था का प्रत्येक प्रकल्प पूर्ण निष्पक्षता, पारदर्शी लेखा-जोखा और सनातन करुणा की भावना से संचालित होता है।
              </p>

              <p className="italic text-brand-maroon-900 font-semibold bg-brand-cream-100/70 p-3.5 rounded-xl border-l-4 border-brand-saffron-500">
                “सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः — यह केवल एक श्लोक नहीं, हमारी प्रत्येक साँस और हर सेवा अभियान का जीवन-मंत्र है।”
              </p>
            </div>

            {/* Signature & Seal Block */}
            <div className="mt-8 pt-6 border-t border-brand-maroon-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold-500 shadow-md shrink-0 bg-brand-cream-200">
                  <Image
                    src="/images/founder.png"
                    alt="आकाश गिरि — संस्थापक"
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-black text-brand-maroon-950 tracking-wide">
                    आकाश गिरि
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-brand-maroon-800 mt-0.5">
                    संस्थापक एवं मुख्य सेवादार
                  </div>
                  <div className="text-[11px] text-brand-charcoal-500 font-medium mt-0.5">
                    शिवशक्ति सेवा फाउंडेशन
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
                    प्रमाणित सेवा संकल्प
                  </span>
                  <span className="text-xs font-black text-brand-maroon-950">
                    सत्यं • शिवं • सुन्दरम्
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
                <span>सीधा संवाद: <span className="font-sans font-bold tracking-wide">91171 35379</span></span>
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
            
            {/* Visual Founder Portrait Card with Gold Border */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-brand-cream-200">
                <Image
                  src="/images/founder.png"
                  alt="आकाश गिरि — संस्थापक एवं मुख्य सेवादार"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-950/90 via-brand-maroon-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-saffron-600 text-white text-[11px] font-bold uppercase tracking-wide mb-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
                    <span>संस्थापक एवं मुख्य सेवादार</span>
                  </div>
                  <h4 className="font-heading text-xl font-bold drop-shadow-sm text-white">
                    आकाश गिरि
                  </h4>
                  <p className="text-xs text-brand-gold-200 font-medium mt-0.5">
                    हर पीड़ित की पुकार तक स्वयं पहुँचना ही हमारा संकल्प है
                  </p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-white to-brand-cream-50 border-t border-brand-gold-400/20">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-brand-cream-100/80 border border-brand-gold-400/30">
                    <div className="text-xl sm:text-2xl font-sans font-extrabold text-brand-maroon-950 tabular-nums">
                      100%
                    </div>
                    <div className="text-[11px] font-bold text-brand-maroon-800 mt-0.5">
                      निःस्वार्थ समर्पण
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-brand-cream-100/80 border border-brand-gold-400/30">
                    <div className="text-xl sm:text-2xl font-sans font-extrabold text-brand-maroon-950 tabular-nums">
                      24×7
                    </div>
                    <div className="text-[11px] font-bold text-brand-maroon-800 mt-0.5">
                      सेवा तत्परता
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
                    हमारा त्रिसूत्रीय संकल्प
                  </h4>
                  <p className="text-xs text-white/85 mt-1 leading-relaxed">
                    १. पूर्ण वित्तीय शुचिता एवं पारदर्शी लेखा <br />
                    २. बिना किसी भेदभाव के सर्वजन हिताय सेवा <br />
                    ३. सहायता प्राप्त करने वाले की गरिमा का पूर्ण सम्मान
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
