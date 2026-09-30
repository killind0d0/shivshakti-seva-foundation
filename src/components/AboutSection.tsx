"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Users2,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const pillars = [
    {
      icon: <Heart className="w-5 h-5 text-brand-maroon-700" />,
      title: "मानव सेवा",
      description: "प्रत्येक जीव में दिव्यता का अनुभव कर निष्काम भाव से निरंतर सेवा।",
    },
    {
      icon: <Users2 className="w-5 h-5 text-brand-saffron-600" />,
      title: "सामाजिक समानता",
      description: "जाति, धर्म या वर्ग से परे हर असहाय व्यक्ति को सम्मान व सहायता।",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-brand-maroon-700" />,
      title: "त्वरित आपदा राहत",
      description: "बाढ़ व संकट के समय बिना विलंब जमीनी स्तर पर राहत सामग्री पहुँचाना।",
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-brand-saffron-600" />,
      title: "समुदाय का विकास",
      description: "शिक्षा, कौशल एवं आजीविका के माध्यम से दीर्घकालिक स्वावलंबन।",
    },
  ];

  return (
    <section
      id="hamare-bare-mein"
      className="py-16 sm:py-24 bg-brand-cream-100/70 bg-pattern-jali border-b border-brand-maroon-100 relative"
      aria-label="संस्था परिचय"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Dignified Visual Composition with Emblem */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <div className="relative h-80 sm:h-96 w-full">
                <Image
                  src="/images/gallery/hero_community.jpg"
                  alt="शिवशक्ति सेवा फाउंडेशन के सेवा कार्य"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-950/90 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white p-3.5 rounded-xl bg-brand-maroon-950/85 backdrop-blur-md border border-brand-gold-400/40 shadow-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-gold-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-300" />
                    <span>शिवशक्ति सेवा फाउंडेशन का मूल सिद्धांत</span>
                  </div>
                  <p className="font-heading text-xs sm:text-sm font-bold text-brand-gold-200 leading-relaxed italic">
                    सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।<br />
                    सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ।
                  </p>
                  <p className="text-[11px] text-brand-cream-200 pt-1 border-t border-brand-gold-400/20 leading-tight">
                    <span className="text-brand-gold-300 font-bold">अर्थ: </span>
                    सब सुखी रहें, रोगमुक्त रहें, सबका मंगल हो और कोई दुखी न हो।
                  </p>
                </div>
              </div>
            </div>

            {/* Subtle credential badge */}
            <div className="p-4 rounded-xl bg-white border border-brand-maroon-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-cream-200 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-brand-gold-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-maroon-900">
                  आध्यात्मिक प्रेरणा एवं सामाजिक उत्तरदायित्व
                </h4>
                <p className="text-xs text-brand-charcoal-600">
                  प्राचीन भारतीय सेवा परंपरा के आधार पर आधुनिक समाज कल्याण
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission, Narrative & 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-maroon-100 text-brand-maroon-800 text-xs font-bold uppercase tracking-wider">
                <span>संस्था का परिचय एवं उद्देश्य</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-maroon-950 tracking-tight">
                हमारे बारे में
              </h2>
              <p className="text-lg font-semibold text-brand-saffron-600">
                करुणा, सेवा और विश्वास की अटूट परंपरा
              </p>
              <div className="flex justify-start pt-1">
                <TraditionalDivider color="gold" className="my-1 !justify-start" variant="lotus" />
              </div>
            </div>

            <p className="text-base text-brand-charcoal-700 leading-relaxed">
              <strong>शिवशक्ति सेवा फाउंडेशन</strong> एक गैर-सरकारी सामाजिक
              कल्याण संगठन है, जो समाज के सबसे वंचित, निर्बल और प्राकृतिक आपदाओं
              से प्रभावित लोगों के जीवन में सम्मान, राहत और आशा का संचार करने
              के लिए समर्पित है।
            </p>

            <p className="text-base text-brand-charcoal-700 leading-relaxed">
              हमारा विश्वास है कि सच्चा धर्म और सच्ची आध्यात्मिकता वही है जो दुखी
              और पीड़ित मानवता के आंसू पोंछे। बाढ़ राहत से लेकर दैनिक भोजन
              वितरण तक, अनाथ व निर्धन बच्चों की पढ़ाई से लेकर एकाकी बुजुर्गों
              की सेवा तक—हमारा हर प्रयास पूर्ण पारदर्शिता और आदर के साथ संचालित
              होता है।
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-brand-maroon-100 shadow-sm flex items-start gap-3 hover:border-brand-gold-400 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-brand-cream-100 group-hover:bg-brand-cream-200 flex-shrink-0 transition-colors">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-maroon-900 group-hover:text-brand-saffron-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-brand-charcoal-600 mt-0.5 leading-snug">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button: और जानें */}
            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-800 text-white font-semibold text-sm transition shadow-md hover:shadow-lg active:scale-95 hover:-translate-y-0.5"
                aria-label="संस्था के बारे में और विस्तार से जानें"
              >
                <span>और जानें</span>
                <ArrowRight className="w-4 h-4 text-brand-gold-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* "और जानें" Comprehensive Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border-2 border-brand-gold-400/50 overflow-hidden max-h-[90vh] flex flex-col animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-brand-maroon-950 text-white flex items-center justify-between border-b border-brand-maroon-800">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo/logo_emblem.png"
                  alt="शिवशक्ति सेवा फाउंडेशन"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <h3
                  id="about-modal-title"
                  className="font-heading text-xl font-bold text-brand-gold-300"
                >
                  शिवशक्ति सेवा फाउंडेशन — विस्तृत परिचय
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-brand-cream-300 hover:text-white hover:bg-brand-maroon-900 transition"
                aria-label="संवाद बंद करें"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-brand-charcoal-800 text-sm leading-relaxed">
              <div className="p-3.5 rounded-xl bg-brand-cream-100 border border-brand-gold-300/40 text-brand-maroon-950 font-medium">
                "हमारा लक्ष्य केवल सहायता पहुँचाना नहीं, बल्कि हर जरूरतमंद भाई-बहन को
                यह अहसास कराना है कि वे अकेले नहीं हैं—हम सब एक परिवार हैं।"
              </div>

              <h4 className="font-bold text-base text-brand-maroon-900 pt-1">
                हमारी नींव और प्रेरणा
              </h4>
              <p>
                भगवान शिव के कल्याणकारी स्वरूप और माँ शक्ति की दयामयी ऊर्जा से
                प्रेरित होकर संस्था का नाम <strong>शिवशक्ति सेवा फाउंडेशन</strong> रखा गया है।
                हमारे प्रतीक चिन्ह में स्थित त्रिशूल अन्याय और अभाव के संहार का,
                डमरू नव-सृजन की गूंज का, और हाथ व जलता हुआ दीपक निष्काम सेवा एवं
                उम्मीद के प्रकाश का प्रतीक है।
              </p>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 border-2 border-brand-gold-400/40 text-center my-3 shadow-md">
                <span className="text-[11px] font-bold text-brand-gold-400 uppercase tracking-wider block mb-1">
                  शिवशक्ति सेवा फाउंडेशन का मूल सिद्धांत
                </span>
                <p className="font-heading text-sm sm:text-base font-semibold text-brand-gold-200 leading-relaxed italic">
                  सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।<br />
                  सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ।
                </p>
              </div>

              <h4 className="font-bold text-base text-brand-maroon-900 pt-1">
                कार्यप्रणाली के मूल सिद्धांत
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>पूर्ण निष्पक्षता:</strong> किसी भी व्यक्ति को सेवा
                    देते समय उसकी जाति, संप्रदाय, भाषा या क्षेत्र का कोई भेद नहीं।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>सम्मान और गरिमा:</strong> हम कभी भी असहाय व्यक्तियों
                    की लाचारी का प्रदर्शन या प्रचार नहीं करते। सहायता सदैव आदरपूर्वक
                    दी जाती है।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>जमीनी क्रियान्वयन:</strong> कागजी दावों के स्थान पर
                    हमारे स्वयंसेवक सीधे गांव-गांव, झुग्गी-झोपड़ियों और बाढ़
                    प्रभावित इलाकों में उतरकर काम करते हैं।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>वित्तीय शुचिता:</strong> दाताओं द्वारा दिए गए प्रत्येक
                    रुपये का पाई-पाई का हिसाब और प्रत्यक्ष उपयोग सुनिश्चित किया
                    जाता है।
                  </span>
                </li>
              </ul>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-brand-maroon-800 text-white font-semibold text-sm hover:bg-brand-maroon-700 transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
