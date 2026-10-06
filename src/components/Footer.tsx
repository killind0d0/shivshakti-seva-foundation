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
import { useLanguage } from "@/context/LanguageContext";

interface FooterProps {
  onOpenDonation: () => void;
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenDonation, onOpenAdmin }: FooterProps) {
  const { isEn, t } = useLanguage();
  const [policyModal, setPolicyModal] = useState<"privacy" | "terms" | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: t("मुख्य पृष्ठ", "Home"), href: "#mukhya-prishth" },
    { label: t("हमारे बारे में", "About Us"), href: "#hamare-bare-mein" },
    { label: t("हमारी सेवाएँ", "Our Services"), href: "#hamari-sevayein" },
    { label: t("विशेष कार्यक्रम", "Special Programs"), href: "#vishesh-karyakram" },
    { label: t("व्हाट्सएप ग्रुप", "WhatsApp Group"), href: "#whatsapp-community" },
    { label: t("अभियान", "Campaigns"), href: "#hamare-abhiyan" },
    { label: t("चित्र दीर्घा", "Gallery"), href: "#chitra-deergha" },
    { label: t("समाचार", "News"), href: "#samachar" },
    { label: t("संपर्क करें", "Contact"), href: "#sampark" },
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
                  alt={t("शिवशक्ति सेवा फाउंडेशन", "Shivshakti Seva Foundation")}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-cream-50 leading-tight group-hover:text-brand-gold-300 transition-colors">
                  {t("शिवशक्ति सेवा फाउंडेशन", "Shivshakti Seva Foundation")}
                </h3>
                <p className="text-xs text-brand-gold-400 font-medium">
                  {t("मानव सेवा • करुणा • सामाजिक उत्थान", "Humanity Service • Compassion • Social Upliftment")}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-cream-200/90 leading-relaxed font-normal">
              {t(
                "शिवशक्ति सेवा फाउंडेशन जरूरतमंद, निर्धन, असहाय और प्राकृतिक आपदा से प्रभावित परिवारों के साथ निरंतर खड़ा रहकर भोजन, आश्रय, शिक्षा, स्वास्थ्य और पुनर्वास के माध्यम से मानवता की सेवा के लिए समर्पित एक पावन न्यास है।",
                "Shivshakti Seva Foundation is a consecrated trust dedicated to serving humanity through nourishment, shelter, education, healthcare, and rehabilitation for underprivileged, vulnerable, and disaster-affected families."
              )}
            </p>

            <div className="p-3 rounded-xl bg-brand-maroon-900/60 border border-brand-maroon-800 text-xs text-brand-gold-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
              <span>{t("\"सेवा केवल सहायता नहीं, मानवता के प्रति हमारा दायित्व है।\"", "\"Service is not mere assistance, but our sacred duty towards humanity.\"")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-base font-bold text-brand-gold-400 pb-2 border-b border-brand-maroon-800">
              {t("त्वरित लिंक", "Quick Links")}
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
              {t("सहयोग एवं हेल्पलाइन", "Support & Helpline")}
            </h4>

            <div className="space-y-2.5 text-xs text-brand-cream-200">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-saffron-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href="tel:+919117135379"
                    className="hover:text-brand-gold-300 font-bold tracking-wide transition block text-sm"
                  >
                    {t("हेल्पलाइन: ", "Helpline: ")}<span className="font-sans font-extrabold">+91 91171 35379</span>
                  </a>
                  <span className="text-[11px] text-brand-cream-300">
                    {t("२४×७ सदैव उपलब्ध (दिन-रात सेवा)", "24×7 Available Always (Round-the-clock service)")}
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
                  href={process.env.NEXT_PUBLIC_SITE_URL || "https://shivshaktisevafoundation.in"}
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
                  <span className="block font-semibold">{t("मुख्य कार्यालय: गयाजी, बिहार, भारत", "Head Office: GayaJi, Bihar, India")}</span>
                  <a
                    href="https://maps.app.goo.gl/T3QqWjCGMkx9KVJr9?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-brand-gold-300 hover:text-white underline underline-offset-2 flex items-center gap-1 mt-0.5"
                  >
                    <span>{t("गूगल मैप्स पर देखें (Google Maps) ↗", "View on Google Maps ↗")}</span>
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
                <span>{t("अभी सहयोग करें", "Contribute Now")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sacred Trust Strip */}
      <div className="border-t border-brand-maroon-900/90 py-4 bg-brand-maroon-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-brand-gold-300">
            <Sparkles className="w-4 h-4 text-brand-gold-400" />
            <span className="font-heading text-sm text-brand-cream-100">
              {t("मानवता की सेवा में जन-जन का विश्वास • सत्यं शिवं सुन्दरम्", "Public Trust in Service of Humanity • Truth • Goodness • Beauty")}
            </span>
          </div>

          <div className="text-brand-cream-300 text-xs">
            <span>{t("पंजीकृत जन-कल्याण न्यास • गयाजी, बिहार (भारत)", "Registered Public Welfare Trust • GayaJi, Bihar (India)")}</span>
          </div>
        </div>
      </div>

      {/* Lower Bar: Copyright, Legal Links, Back to top */}
      <div className="bg-brand-maroon-950/95 border-t border-brand-maroon-900 py-6 text-xs text-brand-cream-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {t("© २०२६ शिवशक्ति सेवा फाउंडेशन (shivshaktisevafoundation.in)। सर्वाधिकार सुरक्षित।", "© 2026 Shivshakti Seva Foundation (shivshaktisevafoundation.in). All rights reserved.")}
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => setPolicyModal("privacy")}
                className="hover:text-brand-gold-400 underline transition"
              >
                {t("गोपनीयता नीति", "Privacy Policy")}
              </button>
              <Link href="/privacy" className="text-[10px] text-brand-gold-500/80 hover:text-brand-gold-400 transition-colors">
                {t("(विस्तृत पृष्ठ)", "(Detailed Page)")}
              </Link>
            </div>
            <span>•</span>
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => setPolicyModal("terms")}
                className="hover:text-brand-gold-400 underline transition"
              >
                {t("नियम एवं शर्तें", "Terms & Conditions")}
              </button>
              <Link href="/terms" className="text-[10px] text-brand-gold-500/80 hover:text-brand-gold-400 transition-colors">
                {t("(विस्तृत पृष्ठ)", "(Detailed Page)")}
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
                  <span>{t("प्रशासक एवं सेवादार पोर्टल", "Admin & Sevadar Portal")}</span>
                </button>
              </>
            )}
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition"
              aria-label={t("पृष्ठ के शीर्ष पर जाएं", "Scroll to top")}
            >
              <span>{t("शीर्ष पर जाएँ", "Back to Top")}</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. SJ Digitals Signature & Promotional Banner */}
      <aside
        aria-label={t("एस.जे. डिजिटल्स सिग्नेचर एवं विकास सूचना", "SJ Digitals Signature & Development Notice")}
        className="relative bg-gradient-to-r from-[#140204] via-[#220407] to-[#140204] text-white border-t border-brand-gold-500/40 py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 shadow-inner"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
          
          {/* Left: Compact Monogram & Signature */}
          <div className="flex items-center gap-3 justify-center md:justify-start flex-wrap">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shrink-0 shadow-sm">
              <div className="w-full h-full rounded-[6px] bg-[#1e0306] flex items-center justify-center font-heading font-black text-amber-300 text-xs tracking-tight">
                SJ
              </div>
            </div>
            
            <div className="text-xs sm:text-[13px] leading-snug">
              <span className="text-brand-cream-300">
                {t("वेबसाइट निर्माण एवं तकनीकी प्रबंधन:", "Website Development & Technical Management:")}
              </span>{" "}
              <strong className="text-brand-gold-300 font-bold">
                {t("एस.जे. डिजिटल्स (SJ Digitals)", "SJ Digitals")}
              </strong>
              <span className="hidden sm:inline text-brand-gold-500/60 mx-1.5">•</span>
              <span className="block sm:inline text-[11px] sm:text-xs text-brand-cream-300/80">
                {t("अपने संस्थान या व्यापार हेतु आधुनिक वेबसाइट बनवाएं", "Get a modern website crafted for your institution or business")}
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
              title={t("SJ Digitals वेबसाइट", "SJ Digitals Website")}
            >
              <Globe className="w-3.5 h-3.5 text-brand-gold-400" />
              <span>suryajyoti.digital</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?phone=917004185301&text=${encodeURIComponent(
                isEn
                  ? "Hello SJ Digitals! I want information regarding website development and digital services."
                  : "नमस्ते SJ Digitals! मुझे वेबसाइट एवं डिजिटल सेवाओं के लिए जानकारी चाहिए।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition text-xs whitespace-nowrap shadow-xs"
              title={t("व्हाट्सएप पर संपर्क करें", "Contact on WhatsApp")}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t("व्हाट्सएप", "WhatsApp")}</span>
            </a>

            <a
              href="tel:+917004185301"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-brand-cream-200 hover:text-white border border-white/15 transition text-xs font-medium whitespace-nowrap"
              title={t("सीधे कॉल करें", "Call Directly")}
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
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
                  {policyModal === "privacy" ? t("गोपनीयता नीति", "Privacy Policy") : t("नियम एवं शर्तें", "Terms & Conditions")}
                </h3>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1 transition border border-white/20"
                  aria-label={t("बंद करें", "Close")}
                >
                  <span>{t("बंद करें", "Close")}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-3 text-xs sm:text-sm text-brand-charcoal-700 leading-relaxed">
                {policyModal === "privacy" ? (
                  <>
                    <p>
                      {t(
                        "शिवशक्ति सेवा फाउंडेशन अपने सभी दाताओं, स्वयंसेवकों और लाभार्थियों की व्यक्तिगत गोपनीयता का आदर करता है।",
                        "Shivshakti Seva Foundation deeply respects the privacy of all donors, volunteers, and beneficiaries."
                      )}
                    </p>
                    <h4 className="font-bold text-brand-maroon-900 pt-1">
                      {t("जानकारी का संग्रह एवं सुरक्षा", "Information Collection & Protection")}
                    </h4>
                    <p>
                      {t(
                        "आपके द्वारा प्रदान किया गया नाम, मोबाइल नंबर अथवा ईमेल पता केवल सेवा समन्वय, रसीद प्रेषण और आधिकारिक पत्राचार हेतु उपयोग किया जाता है। हम किसी भी तृतीय पक्ष को आपकी जानकारी साझा नहीं करते।",
                        "The name, mobile number, or email address provided by you is used solely for service coordination, receipt dispatch, and official communications. We never share your data with any third party."
                      )}
                    </p>
                    <p>
                      {t(
                        "दान एवं वित्तीय हस्तांतरण पूर्णतः सुरक्षित बैंकिंग एवं यूपीआई माध्यमों से संचालित होते हैं।",
                        "Donations and financial transactions are conducted through fully secured banking and verified UPI channels."
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      {t(
                        "यह वेबसाइट शिवशक्ति सेवा फाउंडेशन के जनकल्याणकारी कार्यों की जानकारी और जन-सहयोग हेतु संचालित है।",
                        "This website is operated to provide transparency on the humanitarian welfare activities of Shivshakti Seva Foundation and facilitate community participation."
                      )}
                    </p>
                    <h4 className="font-bold text-brand-maroon-900 pt-1">
                      {t("सहयोग एवं उपयोग के नियम", "Rules of Participation & Website Terms")}
                    </h4>
                    <p>
                      {t("१. संस्था को दिया जाने वाला प्रत्येक दान पूर्णतः स्वैच्छिक है।", "1. Every donation made to the foundation is strictly voluntary.")}
                    </p>
                    <p>
                      {t(
                        "२. प्राप्त राशि का उपयोग प्राकृतिक आपदा राहत, भोजन वितरण, शिक्षा, स्वास्थ्य एवं पुनर्वास कार्यों में किया जाता है।",
                        "2. Contributions are directly allocated towards natural disaster relief, meal distributions, education, healthcare, and rehabilitation initiatives."
                      )}
                    </p>
                    <p>
                      {t(
                        "३. किसी भी अनधिकृत अथवा व्यावसायिक प्रयोजन हेतु संस्था के नाम अथवा प्रतीक चिन्ह का उपयोग वर्जित है।",
                        "3. Any unauthorized or commercial use of the foundation's name or emblem is strictly prohibited."
                      )}
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
                  {t("संपूर्ण विवरण पढ़ें", "Read Complete Details")}
                </Link>
                <button
                  onClick={() => setPolicyModal(null)}
                  className="px-4 py-1.5 rounded-lg bg-brand-maroon-800 text-white font-semibold text-xs hover:bg-brand-maroon-900 transition"
                >
                  {t("समझ लिया", "Understood")}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </footer>
  );
}
