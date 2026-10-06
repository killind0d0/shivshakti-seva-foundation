"use client";

import React, { useState } from "react";
import { HeartHandshake, CheckCircle2, AlertCircle, Sparkles, Send, MessageCircle } from "lucide-react";
import { getWhatsAppUrl, openWhatsAppDirect } from "@/utils/whatsappHelper";
import { useLanguage } from "@/context/LanguageContext";

export default function VolunteerSection() {
  const { isEn, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    serviceType: "आपदा एवं बाढ़ राहत",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappText, setWhatsappText] = useState<string>("");

  const hindiServiceOptions = [
    "आपदा एवं बाढ़ राहत",
    "भोजन एवं राशन वितरण",
    "शिक्षा एवं बाल संस्कार",
    "चिकित्सा एवं स्वास्थ्य शिविर",
    "वृद्ध एवं असहाय सेवा",
    "सोशल मीडिया एवं जागरूकता प्रचार",
    "अन्य सामाजिक कार्य",
  ];

  const englishServiceOptions = [
    "Disaster & Flood Relief",
    "Food & Ration Distribution",
    "Education & Child Development",
    "Medical & Health Camps",
    "Elderly & Destitute Care",
    "Social Media & Community Outreach",
    "Other Community Service",
  ];

  const serviceOptions = isEn ? englishServiceOptions : hindiServiceOptions;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = t("कृपया अपना पूरा नाम दर्ज करें।", "Please enter your full name.");
    }
    if (!formData.mobile.trim()) {
      errs.mobile = t("कृपया अपना १० अंकों का मोबाइल नंबर दर्ज करें।", "Please enter your 10-digit mobile number.");
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[\s-]/g, ""))) {
      errs.mobile = t("कृपया मान्य १० अंकों का मोबाइल नंबर लिखें।", "Please enter a valid 10-digit mobile number.");
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t("कृपया सही ईमेल पता दर्ज करें (उदा. nam@example.com)।", "Please enter a valid email address.");
    }
    if (!formData.city.trim()) {
      errs.city = t("कृपया अपना नगर या जिला दर्ज करें।", "Please enter your city or district.");
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setIsSubmitting(true);

    const msg = isEn
      ? `🚩 *Volunteer Application — Shivshakti Seva Foundation*\n• Name: ${formData.name.trim()}\n• Mobile: ${formData.mobile.trim()}\n• Email: ${formData.email.trim() || "N/A"}\n• City: ${formData.city.trim()}\n• Area of Service: ${formData.serviceType}\n• Message/Skills: ${formData.message?.trim() || "N/A"}\n• Date: ${new Date().toLocaleDateString("en-US")}`
      : `🚩 *स्वयंसेवक पंजीकरण — शिवशक्ति सेवा फाउंडेशन*\n• नाम: ${formData.name.trim()}\n• मोबाइल: ${formData.mobile.trim()}\n• ईमेल: ${formData.email.trim() || "लागू नहीं"}\n• शहर: ${formData.city.trim()}\n• सेवा क्षेत्र: ${formData.serviceType}\n• संदेश/अनुभव: ${formData.message?.trim() || "लागू नहीं"}\n• दिनांक: ${new Date().toLocaleDateString("hi-IN")}`;
    setWhatsappText(msg);

    // Immediately open WhatsApp so submission reaches Foundation WhatsApp in real-time
    openWhatsAppDirect(msg);

    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'volunteer',
          ...formData,
        }),
      });
    } catch (err) {
      console.warn("Submissions API unreachable, saving volunteer locally:", err);
    }

    // Save locally for Admin dashboard / offline backup
    try {
      const stored = JSON.parse(
        localStorage.getItem("ssf_volunteers") || "[]"
      );
      stored.push({
        ...formData,
        date: new Date().toLocaleDateString("hi-IN"),
        id: Date.now(),
      });
      localStorage.setItem("ssf_volunteers", JSON.stringify(stored));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      city: "",
      serviceType: "आपदा एवं बाढ़ राहत",
      message: "",
    });
  };

  return (
    <section
      id="swayamsevak"
      className="py-16 sm:py-24 bg-brand-cream-100/60 border-b border-brand-maroon-100 relative"
      aria-label={t("स्वयंसेवक पंजीकरण", "Volunteer Registration")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why Volunteer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-saffron-100 text-brand-saffron-800 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-brand-saffron-600" />
              <span>{t("मानव सेवा का पावन अवसर", "Sacred Opportunity to Serve")}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
              {t("सेवा से जुड़ें", "Join Our Mission")}
            </h2>

            <p className="text-base sm:text-lg text-brand-charcoal-700 leading-relaxed font-normal">
              {t(
                "आप अपने समय, ज्ञान, श्रम और कौशल के माध्यम से असहायों के जीवन में सच्चा परिवर्तन ला सकते हैं। आइए, हमारे साथ कदम से कदम मिलाकर मानवता की सेवा करें।",
                "You can bring real change to the lives of the underprivileged through your time, knowledge, effort, and skills. Step forward and join hands with us to serve humanity."
              )}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-brand-maroon-100 shadow-sm">
                <div className="p-1.5 rounded-lg bg-brand-cream-100 text-brand-saffron-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-maroon-900">
                    {t("लचीला समय, असीम संतुष्टि", "Flexible Hours, Boundless Fulfillment")}
                  </h4>
                  <p className="text-xs text-brand-charcoal-600">
                    {t(
                      "आप सप्ताहांत अथवा अपनी सुविधानुसार सेवा कार्यों में भाग ले सकते हैं।",
                      "Participate on weekends or during your free hours at your own convenience."
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-brand-maroon-100 shadow-sm">
                <div className="p-1.5 rounded-lg bg-brand-cream-100 text-brand-maroon-800">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-maroon-900">
                    {t("सीधा जमीनी अनुभव", "Direct Ground Experience")}
                  </h4>
                  <p className="text-xs text-brand-charcoal-600">
                    {t(
                      "राहत शिविरों, सचल रसोई और अध्ययन केंद्रों में सीधे जुड़कर कार्य करें।",
                      "Engage directly in relief camps, mobile community kitchens, and education centers."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Accessible Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-maroon-200/80 shadow-xl relative">
              <h3 className="font-heading text-2xl font-bold text-brand-maroon-950 mb-2">
                {t("स्वयंसेवक आवेदन पत्र", "Volunteer Application Form")}
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-600 mb-6">
                {t(
                  "कृपया नीचे दिया गया संक्षिप्त विवरण भरें। हमारी समन्वय समिति शीघ्र आपसे संपर्क करेगी।",
                  "Please fill in the brief details below. Our coordination committee will get in touch with you shortly."
                )}
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-2 border-emerald-300 text-center space-y-4 animate-scaleIn shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md animate-bounce [animation-iteration-count:3]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-200/80 px-3 py-1 rounded-full inline-block">
                      {t("अभिनंदन एवं आभार!", "Welcome & Thank You!")}
                    </span>
                    <h4 className="font-heading text-2xl font-bold text-emerald-950">
                      {t("आपका आवेदन सफलतापूर्वक प्राप्त हुआ!", "Your Application Has Been Received!")}
                    </h4>
                  </div>
                  <p className="text-sm text-emerald-900 leading-relaxed max-w-md mx-auto font-medium">
                    {t(
                      "शिवशक्ति सेवा परिवार में आपका हार्दिक स्वागत है। हमारे सेवा समन्वयक शीघ्र ही आपसे संपर्क करेंगे।",
                      "A warm welcome to the Shivshakti Seva family. Our service coordinators will contact you shortly."
                    )}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 animate-pulse"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>{t("📤 अपना फ़ॉर्म फाउंडेशन को भेजें (Send on WhatsApp)", "📤 Send Details on WhatsApp")}</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          mobile: "",
                          email: "",
                          city: "",
                          serviceType: isEn ? "Disaster & Flood Relief" : "आपदा एवं बाढ़ राहत",
                          message: "",
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-emerald-900 border border-emerald-300 font-semibold text-xs hover:bg-emerald-50 transition"
                    >
                      {t("नया आवेदन करें", "Submit Another Application")}
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    {t(
                      "WhatsApp से भेजना आवश्यक है ताकि फाउंडेशन को आपका अनुरोध प्राप्त हो (+91 91171 35379)।",
                      "Sending via WhatsApp is required so the foundation immediately receives your request (+91 91171 35379)."
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="vol-name"
                      className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                    >
                      {t("पूरा नाम", "Full Name")} <span className="text-brand-saffron-600">*</span>
                    </label>
                    <input
                      id="vol-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t("उदा. राजेश कुमार शर्मा", "e.g. Rajesh Kumar Sharma")}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition ${
                        errors.name
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Two column: Mobile & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="vol-mobile"
                        className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                      >
                        {t("मोबाइल नंबर (१० अंक)", "Mobile Number (10 Digits)")}{" "}
                        <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        id="vol-mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        placeholder={t("उदा. ९८७६५४३२१०", "e.g. 9876543210")}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition ${
                          errors.mobile
                            ? "border-red-500 bg-red-50/50"
                            : "border-brand-maroon-200 focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500"
                        }`}
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.mobile}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="vol-city"
                        className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                      >
                        {t("नगर / जिला", "City / District")}{" "}
                        <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        id="vol-city"
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder={t("उदा. गया, वाराणसी", "e.g. Gaya, Varanasi")}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition ${
                          errors.city
                            ? "border-red-500 bg-red-50/50"
                            : "border-brand-maroon-200 focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500"
                        }`}
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.city}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email & Service Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="vol-email"
                        className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                      >
                        {t("ईमेल पता (वैकल्पिक)", "Email Address (Optional)")}
                      </label>
                      <input
                        id="vol-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="उदा. name@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition ${
                          errors.email
                            ? "border-red-500 bg-red-50/50"
                            : "border-brand-maroon-200 focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="vol-service"
                        className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                      >
                        {t("आप किस प्रकार सेवा करना चाहते हैं?", "How would you like to serve?")}
                      </label>
                      <select
                        id="vol-service"
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-maroon-200 text-sm focus:outline-none focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500 bg-white"
                      >
                        {serviceOptions.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message / Details */}
                  <div>
                    <label
                      htmlFor="vol-msg"
                      className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                    >
                      {t("संदेश या विशेष कौशल (वैकल्पिक)", "Message or Special Skills (Optional)")}
                    </label>
                    <textarea
                      id="vol-msg"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t(
                        "उदा. मैं सप्ताहांत में चिकित्सा शिविर या भोजन वितरण में सहयोग दे सकता हूँ।",
                        "e.g. I can assist in relief distribution, medical camps or community outreach on weekends."
                      )}
                      className="w-full px-3.5 py-2 rounded-lg border border-brand-maroon-200 text-sm focus:outline-none focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>{t("कृपया प्रतीक्षा करें...", "Please wait...")}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-brand-gold-400" />
                          <span>{t("स्वयंसेवक बनें — आवेदन जमा करें", "Become a Volunteer — Submit Application")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
