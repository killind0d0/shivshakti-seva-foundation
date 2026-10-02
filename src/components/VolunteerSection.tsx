"use client";

import React, { useState } from "react";
import { HeartHandshake, CheckCircle2, AlertCircle, Sparkles, Send, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/utils/whatsappHelper";

export default function VolunteerSection() {
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
  const [whatsappText, setWhatsappText] = useState("");

  const serviceOptions = [
    "आपदा एवं बाढ़ राहत",
    "भोजन एवं राशन वितरण",
    "शिक्षा एवं बाल संस्कार",
    "चिकित्सा एवं स्वास्थ्य शिविर",
    "वृद्ध एवं असहाय सेवा",
    "सोशल मीडिया एवं जागरूकता प्रचार",
    "अन्य सामाजिक कार्य",
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = "कृपया अपना पूरा नाम दर्ज करें।";
    }
    if (!formData.mobile.trim()) {
      errs.mobile = "कृपया अपना १० अंकों का मोबाइल नंबर दर्ज करें।";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/[\s-]/g, ""))) {
      errs.mobile = "कृपया मान्य १० अंकों का मोबाइल नंबर लिखें।";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "कृपया सही ईमेल पता दर्ज करें (उदा. nam@example.com)।";
    }
    if (!formData.city.trim()) {
      errs.city = "कृपया अपना नगर या जिला दर्ज करें।";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const msg = `🤝 *नया स्वयंसेवक पंजीकरण — शिवशक्ति सेवा फाउंडेशन*
• नाम: ${formData.name.trim()}
• मोबाइल: ${formData.mobile.trim()}
• नगर/जिला: ${formData.city.trim()}
• सेवा क्षेत्र: ${formData.serviceType}
• ईमेल: ${formData.email.trim() || "लागू नहीं"}
• संदेश: ${formData.message.trim() || "मानव सेवा में सहयोग हेतु तत्पर"}
• दिनांक: ${new Date().toLocaleDateString("hi-IN")}`;
    setWhatsappText(msg);

    setTimeout(() => {
      // Save locally for Admin dashboard
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
        console.error(err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="swayamsevak"
      className="py-16 sm:py-24 bg-brand-cream-100/60 border-b border-brand-maroon-100 relative"
      aria-label="स्वयंसेवक पंजीकरण"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Why Volunteer */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-saffron-100 text-brand-saffron-800 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-brand-saffron-600" />
              <span>मानव सेवा का पावन अवसर</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
              सेवा से जुड़ें
            </h2>

            <p className="text-base sm:text-lg text-brand-charcoal-700 leading-relaxed font-normal">
              आप अपने समय, ज्ञान, श्रम और कौशल के माध्यम से असहायों के जीवन में
              सच्चा परिवर्तन ला सकते हैं। आइए, हमारे साथ कदम से कदम मिलाकर
              मानवता की सेवा करें।
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-brand-maroon-100 shadow-sm">
                <div className="p-1.5 rounded-lg bg-brand-cream-100 text-brand-saffron-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-maroon-900">
                    लचीला समय, असीम संतुष्टि
                  </h4>
                  <p className="text-xs text-brand-charcoal-600">
                    आप सप्ताहांत अथवा अपनी सुविधानुसार सेवा कार्यों में भाग ले सकते हैं।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white border border-brand-maroon-100 shadow-sm">
                <div className="p-1.5 rounded-lg bg-brand-cream-100 text-brand-maroon-800">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-maroon-900">
                    सीधा जमीनी अनुभव
                  </h4>
                  <p className="text-xs text-brand-charcoal-600">
                    राहत शिविरों, सचल रसोई और अध्ययन केंद्रों में सीधे जुड़कर कार्य करें।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Accessible Hindi Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-maroon-200/80 shadow-xl relative">
              <h3 className="font-heading text-2xl font-bold text-brand-maroon-950 mb-2">
                स्वयंसेवक आवेदन पत्र
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-600 mb-6">
                कृपया नीचे दिया गया संक्षिप्त विवरण भरें। हमारी समन्वय समिति
                शीघ्र आपसे संपर्क करेगी।
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-gradient-to-b from-emerald-50 to-emerald-100/60 border-2 border-emerald-300 text-center space-y-4 animate-scaleIn shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md animate-bounce [animation-iteration-count:3]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-200/80 px-3 py-1 rounded-full inline-block">
                      अभिनंदन एवं आभार!
                    </span>
                    <h4 className="font-heading text-2xl font-bold text-emerald-950">
                      आपका आवेदन सफलतापूर्वक प्राप्त हुआ!
                    </h4>
                  </div>
                  <p className="text-sm text-emerald-900 leading-relaxed max-w-md mx-auto font-medium">
                    शिवशक्ति सेवा परिवार में आपका हार्दिक स्वागत है। हमारे सेवा समन्वयक शीघ्र ही आपसे संपर्क करेंगे।
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 animate-pulse"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>📤 अपना फ़ॉर्म फाउंडेशन को भेजें (Send on WhatsApp)</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          mobile: "",
                          email: "",
                          city: "",
                          serviceType: "आपदा एवं बाढ़ राहत",
                          message: "",
                        });
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-emerald-900 border border-emerald-300 font-semibold text-xs hover:bg-emerald-50 transition"
                    >
                      नया आवेदन करें
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    WhatsApp से भेजना आवश्यक है ताकि फाउंडेशन को आपका अनुरोध प्राप्त हो (+91 91171 35379)।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="vol-name"
                      className="block text-xs sm:text-sm font-bold text-brand-charcoal-800 mb-1"
                    >
                      पूरा नाम <span className="text-brand-saffron-600">*</span>
                    </label>
                    <input
                      id="vol-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="उदा. राजेश कुमार शर्मा"
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
                        मोबाइल नंबर (१० अंक){" "}
                        <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        id="vol-mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                        placeholder="उदा. ९८७६५४३२१०"
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
                        नगर / जिला{" "}
                        <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        id="vol-city"
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="उदा. वाराणसी, गोरखपुर"
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
                        ईमेल पता (वैकल्पिक)
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
                        आप किस प्रकार सेवा करना चाहते हैं?
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
                      संदेश या विशेष कौशल (वैकल्पिक)
                    </label>
                    <textarea
                      id="vol-msg"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="उदा. मैं सप्ताहांत में चिकित्सा शिविर या भोजन वितरण में सहयोग दे सकता हूँ।"
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
                        <span>कृपया प्रतीक्षा करें...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-brand-gold-400" />
                          <span>स्वयंसेवक बनें — आवेदन जमा करें</span>
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
