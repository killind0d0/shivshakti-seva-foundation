"use client";

import React from "react";
import { HandHeart, PackageCheck, Truck, Sparkles, ArrowRight } from "lucide-react";

export default function HowContributionsHelp() {
  const steps = [
    {
      step: "चरण १",
      title: "आपका सहयोग",
      description:
        "जब आप संस्था को दान या सामग्री रूप में सहयोग प्रदान करते हैं, तो वह पारदर्शी रूप से सेवा कोष में दर्ज होता है।",
      icon: <HandHeart className="w-8 h-8 text-brand-maroon-800" />,
    },
    {
      step: "चरण २",
      title: "राहत सामग्री",
      description:
        "स्थानीय आवश्यकताओं के आधार पर थोक में उच्च गुणवत्ता वाला सूखा राशन, दवाइयाँ व तिरपाल तैयार किए जाते हैं।",
      icon: <PackageCheck className="w-8 h-8 text-brand-saffron-600" />,
    },
    {
      step: "चरण ३",
      title: "जरूरतमंद परिवार",
      description:
        "बिना किसी बिचौलिए के हमारे समर्पित स्वयंसेवक नावों, वाहनों व पैदल चलकर सीधे परिवारों तक सहायता पहुँचाते हैं।",
      icon: <Truck className="w-8 h-8 text-brand-maroon-800" />,
    },
    {
      step: "चरण ४",
      title: "बेहतर जीवन",
      description:
        "आपातकालीन संकट टलने के बाद शिक्षा, स्वास्थ्य और आजीविका संबल से वे पुनः स्वावलंबी बनते हैं।",
      icon: <Sparkles className="w-8 h-8 text-brand-gold-600" />,
    },
  ];

  return (
    <section
      className="py-16 sm:py-24 bg-brand-cream-50 border-b border-brand-maroon-100 relative"
      aria-label="सहयोग से राहत तक की प्रक्रिया"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>पारदर्शी कार्यप्रणाली</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            सहयोग से सम्मान तक की यात्रा
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 leading-relaxed font-normal">
            "आपका सहयोग → राहत सामग्री → जरूरतमंद परिवार → बेहतर जीवन"
          </p>
          <div className="w-16 h-1 bg-brand-gold-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-2xl bg-white border border-brand-maroon-100 shadow-sm hover:shadow-2xl hover:border-brand-gold-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-cream-100 group-hover:bg-brand-cream-200 flex items-center justify-center border border-brand-cream-300 group-hover:border-brand-gold-400 transition-all duration-300 group-hover:scale-110 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="font-heading text-xs font-bold text-brand-maroon-800 bg-brand-cream-200/80 group-hover:bg-brand-gold-100 px-3 py-1 rounded-full transition-colors border border-brand-maroon-100">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-brand-charcoal-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-brand-cream-200 border border-brand-gold-400 text-brand-maroon-800 shadow-md items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-12 text-center text-xs text-brand-charcoal-500 max-w-xl mx-auto bg-white/60 p-3 rounded-xl border border-brand-maroon-100">
          प्रत्येक चरण की फोटो, लाभार्थी सूची एवं ऑडिट रिपोर्ट संस्था के
          पारदर्शिता रजिस्टर में नियमित रूप से दर्ज की जाती है।
        </div>
      </div>
    </section>
  );
}
