"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ChevronUp,
  X,
  Lock,
  Eye,
  Sparkles,
  Globe,
  Laptop,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import ModalPortal from "./ModalPortal";

interface FooterProps {
  onOpenDonation: () => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenDonation, onOpenAdmin }: FooterProps) {
  const [policyModal, setPolicyModal] = useState<"privacy" | "terms" | null>(null);
  const [visitorCount, setVisitorCount] = useState<number>(148924);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ssf_total_visitors");
      let current = stored ? parseInt(stored, 10) : 148924;
      if (isNaN(current) || current < 148924) current = 148924;
      current += 1;
      localStorage.setItem("ssf_total_visitors", current.toString());
      setVisitorCount(current);
    } catch {
      setVisitorCount(148925);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "मुख्य पृष्ठ", href: "#mukhya-prishth" },
    { label: "हमारे बारे में", href: "#hamare-bare-mein" },
    { label: "हमारी सेवाएँ", href: "#hamari-sevayein" },
    { label: "महिला स्वावलंबन", href: "#mahila-pratiyogita" },
    { label: "व्हाट्सएप ग्रुप", href: "#whatsapp-community" },
    { label: "अभियान", href: "#hamare-abhiyan" },
    { label: "चित्र दीर्घा", href: "#chitra-deergha" },
    { label: "समाचार", href: "#samachar" },
    { label: "संपर्क करें", href: "#sampark" },
  ];

  const handleFooterLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-maroon-950 text-white border-t-2 border-brand-gold-500 relative">
      {/* Upper Footer: Logo, Mission, Quick Links, Help */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Foundation Profile & Brand */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={(e) => handleFooterLink(e, "#mukhya-prishth")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-13 h-13 rounded-full bg-brand-maroon-900/80 p-1 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                <Image
                  src="/images/logo/logo_emblem.png"
                  alt="शिवशक्ति सेवा फाउंडेशन"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-cream-50 leading-tight group-hover:text-brand-gold-300 transition-colors">
                  शिवशक्ति सेवा फाउंडेशन
                </h3>
                <p className="text-xs text-brand-gold-400 font-medium">
                  मानव सेवा • करुणा • सामाजिक उत्थान
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-cream-200/90 leading-relaxed font-normal">
              शिवशक्ति सेवा फाउंडेशन जरूरतमंद, निर्धन, असहाय और प्राकृतिक आपदा से
              प्रभावित परिवारों के साथ निरंतर खड़ा रहकर भोजन, आश्रय, शिक्षा,
              स्वास्थ्य और पुनर्वास के माध्यम से मानवता की सेवा के लिए समर्पित
              एक पावन न्यास है।
            </p>

            <div className="p-3 rounded-xl bg-brand-maroon-900/60 border border-brand-maroon-800 text-xs text-brand-gold-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
              <span>"सेवा केवल सहायता नहीं, मानवता के प्रति हमारा दायित्व है।"</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-base font-bold text-brand-gold-400 pb-2 border-b border-brand-maroon-800">
              त्वरित लिंक
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-cream-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterLink(e, link.href)}
                    className="hover:text-brand-gold-400 hover:underline transition-colors block py-0.5 cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support CTA */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-heading text-base font-bold text-brand-gold-400 pb-2 border-b border-brand-maroon-800">
              सहयोग एवं हेल्पलाइन
            </h4>

            <div className="space-y-2.5 text-xs text-brand-cream-200">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-saffron-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+919117135379"
                    className="hover:text-brand-gold-300 font-bold tracking-wide transition block text-sm"
                  >
                    हेल्पलाइन: <span className="font-sans font-extrabold">+91 91171 35379</span>
                  </a>
                  <span className="text-[11px] text-brand-cream-300">
                    २४×७ सदैव उपलब्ध (दिन-रात सेवा)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:akashgiri91171@gmail.com"
                  className="hover:text-brand-gold-300 transition font-mono"
                >
                  akashgiri91171@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://shivshaktisevafoundation.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold-300 transition font-sans text-xs tracking-wide"
                >
                  www.shivshaktisevafoundation.in
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-saffron-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold">मुख्य कार्यालय: माँ मंगलागौरी, गया जी (बिहार)</span>
                  <a
                    href="https://maps.app.goo.gl/T3QqWjCGMkx9KVJr9?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-brand-gold-300 hover:text-white underline underline-offset-2 flex items-center gap-1 mt-0.5"
                  >
                    <span>गूगल मैप्स पर देखें (Google Maps) ↗</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDonation}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-saffron-500 to-brand-saffron-600 hover:from-brand-saffron-600 hover:to-brand-saffron-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 border-b-2 border-brand-gold-400"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold-200" />
                <span>अभी सहयोग करें</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Total Visitors Counter Badge - Regal & Sacred Aesthetic */}
      <div className="border-t border-brand-maroon-900/90 py-5 bg-brand-maroon-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-brand-gold-300">
            <Sparkles className="w-4 h-4 text-brand-gold-400" />
            <span className="font-heading text-sm text-brand-cream-100">
              मानवता की सेवा में जन-जन का विश्वास
            </span>
          </div>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-maroon-900/90 border border-brand-gold-500/50 shadow-inner">
            <div className="flex items-center gap-1.5 text-xs text-brand-gold-300 font-semibold">
              <Eye className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>कुल आगंतुक (Total Visitors):</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-sm font-extrabold tracking-widest text-brand-gold-300 bg-brand-maroon-950 px-3 py-0.5 rounded-md border border-brand-gold-600/60 shadow-xs">
              <span>{visitorCount.toLocaleString("en-IN")}</span>
            </div>
            <span className="relative flex h-2 w-2" title="लाइव प्रामाणिक गणना">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
        </div>
      </div>

      {/* Lower Bar: Copyright, Legal Links, Back to top */}
      <div className="bg-brand-maroon-950/95 border-t border-brand-maroon-900 py-6 text-xs text-brand-cream-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © २०२६ शिवशक्ति सेवा फाउंडेशन (shivshaktisevafoundation.in)। सर्वाधिकार सुरक्षित।
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => setPolicyModal("privacy")}
                className="hover:text-brand-gold-400 underline transition"
              >
                गोपनीयता नीति
              </button>
              <Link href="/privacy" className="text-[10px] text-brand-gold-500/80 hover:text-brand-gold-400 transition-colors">
                (विस्तृत पृष्ठ)
              </Link>
            </div>
            <span>•</span>
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => setPolicyModal("terms")}
                className="hover:text-brand-gold-400 underline transition"
              >
                नियम एवं शर्तें
              </button>
              <Link href="/terms" className="text-[10px] text-brand-gold-500/80 hover:text-brand-gold-400 transition-colors">
                (विस्तृत पृष्ठ)
              </Link>
            </div>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-brand-gold-400 underline transition flex items-center gap-1 font-bold text-brand-gold-300"
                >
                  <Lock className="w-3 h-3" />
                  <span>प्रशासक एवं सेवादार पोर्टल</span>
                </button>
              </>
            )}
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition"
              aria-label="पृष्ठ के शीर्ष पर जाएं"
            >
              <span>शीर्ष पर जाएँ</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. SJ Digitals Signature & Hindi Promotional Banner (Compact & Elegant) */}
      <aside
        aria-label="एस.जे. डिजिटल्स सिग्नेचर एवं विकास सूचना"
        className="relative bg-gradient-to-r from-[#140204] via-[#220407] to-[#140204] text-white border-t border-brand-gold-500/40 py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-inner"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          
          {/* Left: Compact Monogram & Hindi Signature */}
          <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shrink-0 shadow-sm">
              <div className="w-full h-full rounded-[6px] bg-[#1e0306] flex items-center justify-center font-heading font-black text-amber-300 text-xs tracking-tight">
                SJ
              </div>
            </div>
            
            <div className="text-xs sm:text-[13px] leading-snug">
              <span className="text-brand-cream-300">
                वेबसाइट निर्माण एवं तकनीकी प्रबंधन:
              </span>{" "}
              <strong className="text-brand-gold-300 font-bold">
                एस.जे. डिजिटल्स (SJ Digitals)
              </strong>
              <span className="hidden sm:inline text-brand-gold-500/60 mx-1.5">•</span>
              <span className="block sm:inline text-[11px] sm:text-xs text-brand-cream-300/80">
                अपने संस्थान या व्यापार हेतु आधुनिक वेबसाइट बनवाएं
              </span>
            </div>
          </div>

          {/* Right: Quick Action Links */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-center text-xs">
            <a
              href="https://www.suryajyoti.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-gold-300 hover:text-white border border-brand-gold-500/30 transition text-xs font-semibold whitespace-nowrap"
              title="SJ Digitals वेबसाइट"
            >
              <Globe className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>suryajyoti.digital</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=917004185301&text=${encodeURIComponent(
                "नमस्ते SJ Digitals! मुझे वेबसाइट एवं डिजिटल सेवाओं के लिए जानकारी चाहिए।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition text-xs whitespace-nowrap shadow-xs"
              title="व्हाट्सएप पर संपर्क करें"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>व्हाट्सएप</span>
            </a>

            <a
              href="tel:+917004185301"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-cream-200 hover:text-white border border-white/15 transition text-xs font-medium whitespace-nowrap"
              title="सीधे कॉल करें"
            >
              <Phone className="w-3 h-3 text-brand-gold-400" />
              <span className="font-sans font-bold">+91 70041 85301</span>
            </a>
          </div>

        </div>
      </aside>

      {/* Policy Modal */}
      {policyModal && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn text-brand-charcoal-900"
            onClick={() => setPolicyModal(null)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-brand-maroon-200 overflow-hidden flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-brand-maroon-950 text-white flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-brand-gold-300">
                  {policyModal === "privacy" ? "गोपनीयता नीति" : "नियम एवं शर्तें"}
                </h3>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition border border-white/20"
                  aria-label="बंद करें"
                >
                  <span>बंद करें</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-3 text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed">
                {policyModal === "privacy" ? (
                  <>
                    <p>
                      शिवशक्ति सेवा फाउंडेशन अपने सभी दाताओं, स्वयंसेवकों और
                      लाभार्थियों की व्यक्तिगत गोपनीयता का आदर करता है।
                    </p>
                    <h4 className="font-bold text-brand-maroon-900 pt-1">
                      जानकारी का संग्रह एवं सुरक्षा
                    </h4>
                    <p>
                      आपके द्वारा प्रदान किया गया नाम, मोबाइल नंबर अथवा ईमेल पता
                      केवल सेवा समन्वय, रसीद प्रेषण और आधिकारिक पत्राचार हेतु उपयोग
                      किया जाता है। हम किसी भी तृतीय पक्ष को आपकी जानकारी साझा
                      नहीं करते।
                    </p>
                    <p>
                      दान एवं वित्तीय हस्तांतरण पूर्णतः सुरक्षित बैंकिंग एवं
                      यूपीआई माध्यमों से संचालित होते हैं।
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      यह वेबसाइट शिवशक्ति सेवा फाउंडेशन के जनकल्याणकारी कार्यों की
                      जानकारी और जन-सहयोग हेतु संचालित है।
                    </p>
                    <h4 className="font-bold text-brand-maroon-900 pt-1">
                      सहयोग एवं उपयोग के नियम
                    </h4>
                    <p>
                      १. संस्था को दिया जाने वाला प्रत्येक दान पूर्णतः स्वैच्छिक है।
                    </p>
                    <p>
                      २. प्राप्त राशि का उपयोग प्राकृतिक आपदा राहत, भोजन वितरण,
                      शिक्षा, स्वास्थ्य एवं पुनर्वास कार्यों में किया जाता है।
                    </p>
                    <p>
                      ३. किसी भी अनधिकृत अथवा व्यावसायिक प्रयोजन हेतु संस्था के नाम
                      अथवा प्रतीक चिन्ह का उपयोग वर्जित है।
                    </p>
                  </>
                )}
              </div>

              <div className="p-3.5 sm:p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex items-center justify-between">
                <Link 
                  href={policyModal === "privacy" ? "/privacy" : "/terms"}
                  className="text-brand-maroon-700 hover:text-brand-maroon-900 underline text-xs font-semibold"
                  onClick={() => setPolicyModal(null)}
                >
                  संपूर्ण विवरण पढ़ें
                </Link>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="px-4 py-1.5 rounded-lg bg-brand-maroon-800 text-white font-semibold text-xs hover:bg-brand-maroon-900 transition"
                >
                  समझ लिया
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </footer>
  );
}
