"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Share2,
  Globe,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";
import RangoliCorner from "./RangoliCorner";

interface ContactSectionProps {
  data: FoundationData;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "सामान्य जानकारी",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "कृपया अपना नाम लिखें।";
    if (!formData.phone.trim()) errs.phone = "कृपया अपना मोबाइल नंबर लिखें।";
    if (!formData.message.trim()) errs.message = "कृपया अपना संदेश लिखें।";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
        }),
      });
    } catch (err) {
      console.warn("Submissions API unreachable, saving contact message locally:", err);
    }

    // Store in localStorage for Admin view / offline backup
    try {
      const stored = JSON.parse(
        localStorage.getItem("ssf_contact_messages") || "[]"
      );
      stored.push({
        ...formData,
        date: new Date().toLocaleDateString("hi-IN"),
        id: Date.now(),
      });
      localStorage.setItem("ssf_contact_messages", JSON.stringify(stored));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "सामान्य जानकारी",
      message: "",
    });
  };

  return (
    <section
      id="sampark"
      className="py-16 sm:py-24 bg-white border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label="संपर्क विवरण एवं संपर्क सूत्र"
    >
      {/* Background Indian Rangoli / Kolam Diagonal Motifs (Desktop Only, Zero Text Overlap) */}
      <RangoliCorner position="top-right" size={360} opacity={0.065} className="hidden lg:block" />
      <RangoliCorner position="bottom-left" size={360} opacity={0.065} className="hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>सदा आपकी सेवा में तत्पर</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            हमसे संपर्क करें
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            किसी भी प्रकार की जानकारी, सेवा सहयोग, राहत अनुरोध अथवा सुझाव के लिए
            आप हमारे कार्यालय से सीधे संपर्क कर सकते हैं।
          </p>
          <div className="w-16 h-1 bg-brand-gold-500 mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Info (Adhering to Rule 15 with clear admin markers) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-brand-cream-50 border border-brand-maroon-100 shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold text-brand-maroon-950 pb-2 border-b border-brand-cream-300">
                कार्यालय एवं संपर्क सूत्र
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-brand-cream-200 text-brand-maroon-800 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                      मुख्य कार्यालय का पता:
                    </span>
                    <p className="text-sm font-bold text-brand-maroon-950 leading-relaxed mt-0.5">
                      {data.address}
                    </p>
                    <a
                      href="https://maps.app.goo.gl/T3QqWjCGMkx9KVJr9?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-800 hover:from-brand-maroon-800 hover:to-brand-saffron-600 text-white text-xs font-bold transition shadow-xs group"
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-gold-400 group-hover:scale-110 transition-transform" />
                      <span>गूगल मैप्स पर रास्ता देखें (Google Maps)</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-brand-cream-200 text-brand-saffron-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                      मोबाइल / हेल्पलाइन:
                    </span>
                    <a
                      href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-sans font-bold text-brand-maroon-950 mt-0.5 hover:text-brand-saffron-600 transition block tracking-wide"
                    >
                      {data.phone}
                    </a>
                    <p className="text-xs text-brand-saffron-600 font-bold mt-0.5">
                      आपातकालीन: <span className="font-sans">{data.emergencyPhone}</span>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-brand-cream-200 text-brand-maroon-800 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                      ईमेल पता:
                    </span>
                    <a
                      href={`mailto:${data.email}`}
                      className="text-sm font-semibold text-brand-maroon-950 mt-0.5 font-mono hover:text-brand-saffron-600 transition block"
                    >
                      {data.email}
                    </a>
                  </div>
                </div>

                {/* Official Website */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-brand-cream-200 text-brand-saffron-600 flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                      आधिकारिक वेबसाइट:
                    </span>
                    <a
                      href={data.website || "https://shivshaktifoundation.in"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-sans font-bold text-brand-maroon-950 mt-0.5 hover:text-brand-saffron-600 transition block tracking-wide"
                    >
                      www.shivshaktifoundation.in
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-brand-cream-200 text-brand-gold-600 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider">
                      कार्यालय समय:
                    </span>
                    <p className="text-sm font-semibold text-brand-maroon-950 mt-0.5">
                      {data.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media & WhatsApp Links in Hindi */}
              <div className="pt-4 border-t border-brand-cream-300">
                <span className="text-xs font-bold text-brand-charcoal-500 uppercase tracking-wider block mb-2.5">
                  सीधा संपर्क एवं सोशल मीडिया:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://wa.me/919117135379?text=नमस्ते%20शिवशक्ति%20सेवा%20फाउंडेशन"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition inline-flex items-center gap-1.5"
                  >
                    <span>व्हाट्सएप चैट</span>
                  </a>
                  <a
                    href="#whatsapp-community"
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-brand-cream-100 border border-brand-maroon-200 text-xs font-medium text-brand-maroon-900 transition"
                  >
                    व्हाट्सएप ग्रुप
                  </a>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-brand-maroon-200 text-xs font-medium text-brand-charcoal-600">
                    फेसबुक
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-white border border-brand-maroon-200 text-xs font-medium text-brand-charcoal-600">
                    यूट्यूब
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accessible Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream-50 border border-brand-maroon-200 shadow-lg">
              <h3 className="font-heading text-2xl font-bold text-brand-maroon-950 mb-2">
                सीधा संदेश भेजें
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-600 mb-6">
                कृपया अपना संदेश और विवरण भरें। हम यथाशीघ्र उत्तर देंगे।
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-heading text-lg font-bold text-emerald-900">
                    आपका संदेश प्राप्त हुआ!
                  </h4>
                  <p className="text-sm text-emerald-800">
                    शिवशक्ति सेवा फाउंडेशन की सहायता टीम आपसे शीघ्र संपर्क करेगी।
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-2 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                  >
                    अन्य संदेश भेजें
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        पूरा नाम <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="उदा. अमित कुमार"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none bg-white ${
                          errors.name
                            ? "border-red-500 bg-red-50"
                            : "border-brand-maroon-200 focus:border-brand-saffron-500"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        मोबाइल नंबर <span className="text-brand-saffron-600">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="उदा. ९८७६५४३२१०"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none bg-white ${
                          errors.phone
                            ? "border-red-500 bg-red-50"
                            : "border-brand-maroon-200 focus:border-brand-saffron-500"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        ईमेल पता (वैकल्पिक)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="उदा. name@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-maroon-200 text-sm focus:outline-none focus:border-brand-saffron-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        विषय
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-maroon-200 text-sm focus:outline-none focus:border-brand-saffron-500 bg-white"
                      >
                        <option value="सामान्य जानकारी">सामान्य जानकारी</option>
                        <option value="राहत एवं सहायता अनुरोध">राहत एवं सहायता अनुरोध</option>
                        <option value="सहयोग एवं दान संबंधी">सहयोग एवं दान संबंधी</option>
                        <option value="स्वयंसेवक पूछताछ">स्वयंसेवक पूछताछ</option>
                        <option value="अन्य विषय">अन्य विषय</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                      संदेश <span className="text-brand-saffron-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="यहाँ अपना संदेश विस्तार से लिखें..."
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none bg-white ${
                        errors.message
                          ? "border-red-500 bg-red-50"
                          : "border-brand-maroon-200 focus:border-brand-saffron-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-700 text-white font-bold text-sm sm:text-base shadow-md flex items-center justify-center gap-2 transition disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>भेज रहे हैं...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-brand-gold-400" />
                        <span>संदेश प्रेषित करें</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
