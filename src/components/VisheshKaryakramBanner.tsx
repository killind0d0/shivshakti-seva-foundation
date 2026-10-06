"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Send,
  X,
  User,
  HeartHandshake,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";
import { getWhatsAppUrl, FOUNDATION_WHATSAPP_NUMBER, openWhatsAppDirect } from "@/utils/whatsappHelper";
import { useLanguage } from "@/context/LanguageContext";
import ModalPortal from "./ModalPortal";

export default function VisheshKaryakramBanner() {
  const { isEn, language: lang } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    pitraDevtaName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Accessibility: Close modal on Escape key press
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const t = {
    badge: lang === "en" ? "Special Program Announcement" : "विशेष कार्यक्रम की जानकारियाँ",
    headline:
      lang === "en"
        ? "On the sacred occasion of Pitripaksha, a special program of special worship, water tarpan (sacred oblations), and food distribution is being organized for all living beings, pious souls, and universal deities."
        : "सभी जीव जन्तु पुण्य आत्माओं एवं सभी प्राणियों के देवताओं के लिए पितृपक्ष की तिथि पे विशेष पूजन, जल तर्पण एवं भोजन वितरण का एक विशेष कार्यक्रम किया जा रहा है",
    ctaLead: lang === "en" ? "Please click" : "नीचे",
    ctaButton: lang === "en" ? "Free Register" : "Free Register",
    ctaTail:
      lang === "en"
        ? "button below and share your details to enroll"
        : "बटन दबायें और अपनी जानकारी साझा कर के अपना नामांकन करें",
    buttonText:
      lang === "en" ? "Free Register (Enroll Free)" : "Free Register (निःशुल्क नामांकन करें)",
    modalBadge: lang === "en" ? "Pitripaksha Sacred Initiative" : "पितृपक्ष विशेष सेवा संकल्प",
    modalTitle:
      lang === "en"
        ? "Special Worship & Water Tarpan — Free Registration"
        : "विशेष पूजन एवं जल तर्पण — निःशुल्क नामांकन",
    modalDesc:
      lang === "en"
        ? "Share your details for the peace and spiritual fulfillment of all living beings, departed souls, and deities."
        : "सकल जीव-जन्तु, पुण्य आत्माओं एवं सभी प्राणियों के देवताओं की शांति हेतु अपना विवरण दर्ज करें।",
    nameLabel: lang === "en" ? "Your Full Name" : "आपका पूरा नाम (Name)",
    fatherLabel: lang === "en" ? "Father's Name" : "पिता का नाम (Father's Name)",
    pitraLabel:
      lang === "en"
        ? "Ancestral / Family Deity Name (Pitra Devta)"
        : "पितृ देवता का नाम (Pitra Devta / Kuldevta)",
    phoneLabel: lang === "en" ? "Mobile / WhatsApp Number" : "मोबाइल नंबर (WhatsApp Number)",
    addressLabel: lang === "en" ? "Full Address (Town / City / State)" : "पता (Full Address)",
    submitBtn:
      lang === "en"
        ? "Submit Free Registration"
        : "निःशुल्क नामांकन सबमिट करें (Submit & Enroll)",
    successTitle:
      lang === "en" ? "Registration Submitted Successfully!" : "नामांकन सफलतापूर्वक दर्ज हुआ!",
    successDesc:
      lang === "en"
        ? "Thank you! Your enrollment has been recorded with Shivshakti Seva Foundation, GayaJi."
        : "सादर धन्यवाद! आपका विवरण शिवशक्ति सेवा फाउंडेशन के पास सुरक्षित कर लिया गया है।",
    whatsappBtn:
      lang === "en"
        ? "📤 Send Details on WhatsApp"
        : "📤 WhatsApp पर विवरण भेजें (Send on WhatsApp)",
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = lang === "en" ? "Please enter your name." : "कृपया अपना नाम दर्ज करें।";
    }
    if (!formData.fatherName.trim()) {
      errs.fatherName =
        lang === "en" ? "Please enter father's name." : "कृपया पिता का नाम दर्ज करें।";
    }
    if (!formData.pitraDevtaName.trim()) {
      errs.pitraDevtaName =
        lang === "en"
          ? "Please enter ancestral deity name."
          : "कृपया अपने पितृ देवता / कुलदेवता का नाम दर्ज करें।";
    }
    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, "");
    if (!formData.phone.trim()) {
      errs.phone =
        lang === "en" ? "Please enter mobile number." : "कृपया अपना मोबाइल नंबर दर्ज करें।";
    } else if (!/^([0-9]{10}|91[0-9]{10})$/.test(cleanPhone)) {
      errs.phone =
        lang === "en"
          ? "Please enter a valid 10-digit mobile number."
          : "कृपया वैध १० अंकों का मोबाइल नंबर दर्ज करें।";
    }
    if (!formData.address.trim()) {
      errs.address = lang === "en" ? "Please enter your full address." : "कृपया अपना पूरा पता दर्ज करें।";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const currentDate = new Date().toLocaleDateString(lang === "en" ? "en-US" : "hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const msg = `🙏 *विशेष पितृपक्ष पूजन, जल तर्पण एवं भोजन वितरण कार्यक्रम — निःशुल्क नामांकन*\n*शिवशक्ति सेवा फाउंडेशन, गयाजी (बिहार)*\n\n📌 *पंजीकृत सदस्य का विवरण:*\n• *नाम:* ${formData.name.trim()}\n• *पिता का नाम:* ${formData.fatherName.trim()}\n• *पितृ देवता का नाम:* ${formData.pitraDevtaName.trim()}\n• *मोबाइल नंबर:* ${formData.phone.trim()}\n• *पता:* ${formData.address.trim()}\n• *पंजीकरण तिथि:* ${currentDate}\n\nसकल जीव-जन्तु, पुण्य आत्माओं एवं सभी प्राणियों के देवताओं की तृप्ति हेतु आयोजित विशेष पूजन, जल तर्पण एवं भोजन वितरण में हमारा निःशुल्क नामांकन स्वीकार करने की कृपा करें।\n\n— हर हर महादेव • ॐ नमो भगवते वासुदेवाय —`;

    const url = getWhatsAppUrl(msg, FOUNDATION_WHATSAPP_NUMBER);
    setWhatsappUrl(url);

    // Immediately open WhatsApp to ensure registration reaches the foundation in real-time
    openWhatsAppDirect(msg, FOUNDATION_WHATSAPP_NUMBER);

    // 1. Submit to server API for permanent record keeping
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "vishesh_karyakram",
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.warn(`Submissions API responded with status ${res.status}`);
      }
    } catch (err) {
      console.warn("Could not save to /api/submissions:", err);
    }

    // 2. Offline fallback storage in localStorage
    try {
      const stored = JSON.parse(
        localStorage.getItem("ssf_vishesh_karyakram_registrations") || "[]"
      );
      stored.push({
        ...formData,
        date: currentDate,
        timestamp: Date.now(),
      });
      localStorage.setItem(
        "ssf_vishesh_karyakram_registrations",
        JSON.stringify(stored)
      );
    } catch (e) {
      console.error("LocalStorage error:", e);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // 3. Automatically launch WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      fatherName: "",
      pitraDevtaName: "",
      phone: "",
      address: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* BANNER SECTION — Positioned Prominently Near Marquee News */}
      {/* ========================================================================= */}
      <section
        id="vishesh-karyakram"
        aria-label="विशेष कार्यक्रम की जानकारियाँ"
        className="relative z-10 w-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-b-2 border-brand-gold-500/50 shadow-sm py-4 sm:py-5 px-3 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left badge & content */}
          <div className="flex items-start gap-3 sm:gap-4 max-w-4xl text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-brand-maroon-900 to-brand-maroon-950 text-brand-gold-300 flex items-center justify-center shrink-0 shadow-md border border-brand-gold-500/40 mt-0.5">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold-400 animate-pulse" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-maroon-900 text-brand-gold-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3 h-3 text-brand-gold-400" />
                <span>{t.badge}</span>
              </div>

              <h2 className="font-heading text-base sm:text-lg md:text-xl font-extrabold text-brand-maroon-950 leading-snug">
                {t.headline}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-brand-maroon-800">
                {t.ctaLead} <span className="text-brand-saffron-700 font-extrabold">{t.ctaButton}</span> {t.ctaTail}
              </p>
            </div>
          </div>

          {/* Right action button */}
          <div className="shrink-0 w-full sm:w-auto flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                if (isSubmitted) handleReset();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-saffron-600 via-brand-saffron-500 to-amber-600 hover:from-brand-saffron-700 hover:to-amber-700 text-white font-heading font-extrabold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-brand-gold-300 animate-pulse [animation-duration:3s] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-brand-gold-200" />
              <span>{t.buttonText}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FREE REGISTER FORM MODAL */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vishesh-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-brand-maroon-950/80 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-brand-gold-400 overflow-hidden my-6 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white p-5 sm:p-6 relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-brand-cream-300 hover:text-white hover:bg-white/10 transition"
                aria-label="बंद करें"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-gold-500/20 text-brand-gold-300 text-xs font-bold uppercase tracking-wider mb-2 border border-brand-gold-500/30">
                <Flame className="w-3.5 h-3.5 text-brand-gold-400" />
                <span>{t.modalBadge}</span>
              </div>

              <h3 id="vishesh-modal-title" className="font-heading text-xl sm:text-2xl font-bold text-brand-cream-50 leading-tight">
                {t.modalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-brand-cream-200 mt-1">
                {t.modalDesc}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-7">
              {isSubmitted ? (
                /* Success View */
                <div className="text-center space-y-4 py-2">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="font-heading text-xl font-bold text-emerald-950">
                      {t.successTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 mt-1.5 leading-relaxed">
                      {t.successDesc}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                    <p className="font-bold text-amber-950">
                      {lang === "en" ? "Registration Details:" : "पंजीकृत विवरण:"}
                    </p>
                    <p>• {lang === "en" ? "Name" : "नाम"}: {formData.name}</p>
                    <p>• {lang === "en" ? "Father" : "पिता"}: {formData.fatherName}</p>
                    <p>• {lang === "en" ? "Pitra Devta" : "पितृ देवता"}: {formData.pitraDevtaName}</p>
                    <p>• {lang === "en" ? "Phone" : "फोन"}: {formData.phone}</p>
                    <p>• {lang === "en" ? "Address" : "पता"}: {formData.address}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 border border-emerald-400 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>{t.whatsappBtn}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        handleReset();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-brand-cream-100 text-brand-maroon-900 border border-brand-maroon-200 font-semibold text-xs transition"
                    >
                      {lang === "en" ? "Enroll Another Person" : "अन्य परिजन का नामांकन करें"}
                    </button>
                  </div>

                  <p className="text-[11px] text-brand-charcoal-500">
                    {lang === "en" ? "Foundation Helpline: +91 91171 35379 • GayaJi, Bihar (India)" : "फाउंडेशन हेल्पलाइन: +91 91171 35379 • गयाजी, बिहार (भारत)"}
                  </p>
                </div>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* 1. Name */}
                  <div>
                    <label htmlFor="vk-name" className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      {t.nameLabel} <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="vk-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "en" ? "e.g. John Doe / Rahul Sharma" : "उदा. राहुल शर्मा"}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition ${
                          errors.name
                            ? "border-red-500 bg-red-50/50"
                            : "border-brand-maroon-200 bg-brand-cream-50/50"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* 2. Father's Name */}
                  <div>
                    <label htmlFor="vk-father-name" className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      {t.fatherLabel} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="vk-father-name"
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      placeholder={lang === "en" ? "e.g. Shri Ramesh Sharma" : "उदा. श्री रमेश शर्मा"}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition ${
                        errors.fatherName
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/50"
                      }`}
                    />
                    {errors.fatherName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.fatherName}</p>
                    )}
                  </div>

                  {/* 3. Pitra Devta ka Naam */}
                  <div>
                    <label htmlFor="vk-pitra-name" className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      {t.pitraLabel} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="vk-pitra-name"
                      type="text"
                      value={formData.pitraDevtaName}
                      onChange={(e) =>
                        setFormData({ ...formData, pitraDevtaName: e.target.value })
                      }
                      placeholder={lang === "en" ? "e.g. Ancestral Deity / Ancestor Name" : "उदा. कुल पितृ देवता / पूर्वज का नाम"}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition ${
                        errors.pitraDevtaName
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/50"
                      }`}
                    />
                    {errors.pitraDevtaName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">
                        {errors.pitraDevtaName}
                      </p>
                    )}
                  </div>

                  {/* 4. Mobile Number */}
                  <div>
                    <label htmlFor="vk-phone" className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      {t.phoneLabel} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="vk-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={lang === "en" ? "10-digit mobile number" : "10 अंकों का मोबाइल नंबर"}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition ${
                        errors.phone
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/50"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* 5. Address */}
                  <div>
                    <label htmlFor="vk-address" className="block text-xs font-bold text-brand-maroon-950 mb-1">
                      {t.addressLabel} <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="vk-address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder={lang === "en" ? "Village/Town, City, District, State" : "गांव/कस्बा, शहर, जिला, राज्य"}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition ${
                        errors.address
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/50"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.address}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-brand-saffron-600 to-brand-saffron-700 hover:from-brand-saffron-700 hover:to-brand-saffron-800 text-white font-heading font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{lang === "en" ? "Submitting..." : "नामांकन दर्ज किया जा रहा है..."}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t.submitBtn}</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-brand-charcoal-500 mt-2">
                      🔒 {lang === "en" ? "Your enrollment details will be dispatched directly to Foundation's WhatsApp (+91 91171 35379)." : "सबमिट करते ही आपका नामांकन विवरण फाउंडेशन के व्हाट्सएप नंबर (+91 91171 35379) पर प्रेषित हो जाएगा।"}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
