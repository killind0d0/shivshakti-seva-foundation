"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Award,
  PackageCheck,
  Gift,
  CheckCircle2,
  Phone,
  Send,
  Scissors,
  ShoppingBag,
  HelpCircle,
  Clock,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import TraditionalDivider from "./TraditionalDivider";
import { getWhatsAppUrl } from "@/utils/whatsappHelper";

export default function WomenEmpowermentCompetition() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    skillCategory: "सिलाई एवं परिधान निर्माण",
    experienceYears: "प्रशिक्षित (०-१ वर्ष)",
    hasEquipment: "नहीं, उपकरण की आवश्यकता है",
    address: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappText, setWhatsappText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "कृपया अपना नाम दर्ज करें।";
    if (!formData.phone.trim()) errs.phone = "कृपया अपना मोबाइल नंबर दर्ज करें।";
    if (!formData.address.trim()) errs.address = "कृपया अपना पता या गांव/कस्बा लिखें।";
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
          type: 'women_competition',
          ...formData,
        }),
      });
    } catch (err) {
      console.warn("Submissions API unreachable, saving competition registration locally:", err);
    }

    // Save locally for offline backup
    try {
      const stored = JSON.parse(
        localStorage.getItem("ssf_women_competition_registrations") || "[]"
      );
      stored.push({
        ...formData,
        date: new Date().toLocaleDateString("hi-IN"),
        id: Date.now(),
      });
      localStorage.setItem(
        "ssf_women_competition_registrations",
        JSON.stringify(stored)
      );
    } catch (e) {
      console.error("Local storage error:", e);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      id="mahila-pratiyogita"
      className="py-16 sm:py-24 bg-white bg-pattern-subtle border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label="महिला स्वावलंबन एवं हुनर प्रतियोगिता"
    >
      {/* Decorative Warm Shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-gold-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-10 right-0 w-80 h-80 rounded-full bg-brand-maroon-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-saffron-100 text-brand-maroon-900 border border-brand-saffron-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-brand-saffron-700" />
            <span>विशेष स्वावलंबन पहल २०२६</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            प्रशिक्षित बहनों हेतु हुनर एवं स्वावलंबन प्रतियोगिता
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            अपनी दक्षता सिद्ध करें, फाउंडेशन से सीधे उत्पादन ऑर्डर्स पाएं और अपना
            स्वतंत्र व्यवसाय शुरू करने हेतु प्रोत्साहन उपहार प्राप्त करें।
          </p>
          <TraditionalDivider color="gold" variant="lotus" className="mt-2" />
        </div>

        {/* 3 Pillar Cards: What Winners & Participants Receive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Card 1: Small Orders */}
          <div className="p-6 rounded-2xl bg-brand-cream-50 border-2 border-brand-maroon-100 hover:border-brand-gold-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-900 text-brand-gold-300 flex items-center justify-center mb-4 shadow-sm">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-maroon-950 mb-2">
              निश्चित उत्पादन ऑर्डर्स
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
              प्रतियोगिता में उत्कृष्ट कार्य करने वाली बहनों को संस्था द्वारा
              राशन थैले, यूनिफॉर्म, मास्क व परिधानों के <strong>सीधे कमर्शियल ऑर्डर्स</strong> दिए
              जाएंगे ताकि नियमित आजीविका शुरू हो सके।
            </p>
          </div>

          {/* Card 2: Business Startup Gift */}
          <div className="p-6 rounded-2xl bg-brand-cream-50 border-2 border-brand-saffron-200 hover:border-brand-saffron-400 hover:shadow-lg transition-all duration-300 relative">
            <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-brand-saffron-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
              विशेष प्रोत्साहन
            </span>
            <div className="w-12 h-12 rounded-xl bg-brand-saffron-600 text-white flex items-center justify-center mb-4 shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-maroon-950 mb-2">
              व्यवसाय स्थापना उपहार
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
              विजेता बहनों को अपना घर का काम या सिलाई केंद्र स्थापित करने हेतु
              <strong> नई सिलाई मशीन, उन्नत टूलकिट एवं प्राथमिक सामग्री</strong> उपहार स्वरूप प्रदान
              की जाएगी।
            </p>
          </div>

          {/* Card 3: Dignity & Mentorship */}
          <div className="p-6 rounded-2xl bg-brand-cream-50 border-2 border-brand-maroon-100 hover:border-brand-gold-400 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-brand-maroon-900 text-brand-gold-300 flex items-center justify-center mb-4 shadow-sm">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-maroon-950 mb-2">
              बाजार संबल एवं मार्गदर्शन
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
              कच्चा माल खरीदने से लेकर तैयार माल के विपणन तक संस्था के विशेषज्ञ
              मार्गदर्शन देंगे और स्थानीय महिला स्वयं सहायता समूहों से जोड़ेंगे।
            </p>
          </div>
        </div>

        {/* Details & Registration Form Split Grid */}
        <div className="bg-gradient-to-br from-brand-maroon-950 to-brand-maroon-900 rounded-3xl text-white shadow-2xl overflow-hidden border border-brand-maroon-800 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Guidelines & Categories */}
          <div className="lg:col-span-5 p-8 sm:p-10 space-y-6 border-b lg:border-b-0 lg:border-r border-brand-maroon-800">
            <div>
              <span className="text-xs font-bold text-brand-gold-400 uppercase tracking-wider block mb-1">
                प्रतियोगिता रूपरेखा
              </span>
              <h3 className="font-heading text-2xl font-bold text-brand-cream-50">
                कौन भाग ले सकता है?
              </h3>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-brand-cream-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  ऐसी सभी बहनें जिन्होंने सिलाई, कढ़ाई, बुनाई या हस्तशिल्प का बुनियादी
                  प्रशिक्षण लिया है।
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  जो बहनें आर्थिक रूप से कमजोर हैं और स्वयं का काम शुरू करने हेतु संबल
                  चाहती हैं।
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  प्रतियोगिता में दिए गए नमूने (Sample) के आधार पर गुणवत्ता और गति
                  का निष्पक्ष मूल्यांकन किया जाएगा।
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-gold-400 flex-shrink-0 mt-0.5" />
                <span>
                  भाग लेने हेतु <strong>कोई पंजीकरण शुल्क नहीं है</strong> (पूर्णतः निःशुल्क)।
                </span>
              </li>
            </ul>

            {/* Helpline Box */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2">
              <div className="flex items-center gap-2 text-brand-gold-300 font-bold text-xs sm:text-sm">
                <Phone className="w-4 h-4" />
                <span>फोन पर पंजीकरण या जानकारी हेतु:</span>
              </div>
              <p className="text-xs text-brand-cream-200">
                यदि फॉर्म भरने में कोई परेशानी हो, तो हमारी टीम को कॉल करें:
              </p>
              <a
                href="tel:+919117135379"
                className="inline-block font-heading text-lg font-bold text-white hover:text-brand-gold-300 transition"
              >
                <span className="font-sans font-extrabold tracking-wide">+91 91171 35379</span> (२४×७ उपलब्ध)
              </a>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-white text-brand-charcoal-900">
            <h3 className="font-heading text-2xl font-bold text-brand-maroon-950 mb-2">
              प्रतियोगिता पंजीकरण फॉर्म
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 mb-6">
              कृपया नीचे अपना विवरण भरें। हमारी महिला कल्याण टीम आपसे शीघ्र संपर्क
              करेगी।
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-emerald-950">
                  पंजीकरण सफलतापूर्वक दर्ज हुआ!
                </h4>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  शिवशक्ति सेवा फाउंडेशन की महिला कल्याण समिति द्वारा आपके आवेदन
                  की समीक्षा की जाएगी और प्रतियोगिता की तिथि व स्थान की सूचना आपके
                  मोबाइल नंबर <strong>{formData.phone}</strong> पर दी जाएगी।
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={getWhatsAppUrl(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 animate-pulse"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                    <span>📤 अपना फ़ॉर्म फाउंडेशन को भेजें (Send on WhatsApp)</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        phone: "",
                        age: "",
                        skillCategory: "सिलाई एवं परिधान निर्माण",
                        experienceYears: "प्रशिक्षित (०-१ वर्ष)",
                        hasEquipment: "नहीं, उपकरण की आवश्यकता है",
                        address: "",
                        notes: "",
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white text-emerald-900 border border-emerald-300 text-xs font-semibold hover:bg-emerald-50 transition"
                  >
                    अन्य बहन का पंजीकरण करें
                  </button>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  WhatsApp से भेजना आवश्यक है ताकि फाउंडेशन को आपका अनुरोध प्राप्त हो (+91 91171 35379)।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-semibold">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      बहन का पूरा नाम: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="उदा. सुनीता देवी"
                      className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 ${
                        errors.name
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/40"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      मोबाइल नंबर: <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="१० अंकों का मोबाइल नंबर"
                      className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 ${
                        errors.phone
                          ? "border-red-500 bg-red-50/50"
                          : "border-brand-maroon-200 bg-brand-cream-50/40"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Skill Category */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      हुनर / कौशल की श्रेणी:
                    </label>
                    <select
                      value={formData.skillCategory}
                      onChange={(e) =>
                        setFormData({ ...formData, skillCategory: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-brand-maroon-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500"
                    >
                      <option value="सिलाई एवं परिधान निर्माण">
                        सिलाई एवं परिधान निर्माण (सूट, कुर्ता, ब्लाउज)
                      </option>
                      <option value="कढ़ाई, बुनाई एवं जरदोजी">
                        कढ़ाई, बुनाई एवं जरदोजी कार्य
                      </option>
                      <option value="हस्तशिल्प एवं बैग निर्माण">
                        हस्तशिल्प, थैले व इको-बैग निर्माण
                      </option>
                      <option value="पारंपरिक गृह उद्योग व पाक कला">
                        पारंपरिक गृह उद्योग (अचार, पापड़, मसाले)
                      </option>
                      <option value="अन्य कौशल">अन्य कौशल / दक्षता</option>
                    </select>
                  </div>

                  {/* Current Equipment Status */}
                  <div>
                    <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                      सिलाई मशीन / उपकरण स्थिति:
                    </label>
                    <select
                      value={formData.hasEquipment}
                      onChange={(e) =>
                        setFormData({ ...formData, hasEquipment: e.target.value })
                      }
                      className="w-full p-2.5 rounded-xl border border-brand-maroon-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500"
                    >
                      <option value="नहीं, उपकरण की आवश्यकता है">
                        नहीं, स्वयं की मशीन नहीं है (उपहार आवश्यक)
                      </option>
                      <option value="हाँ, पुरानी मशीन उपलब्ध है">
                        हाँ, पुरानी मशीन उपलब्ध है
                      </option>
                      <option value="अन्य साधन उपलब्ध">अन्य साधन उपलब्ध</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                    पूरा पता (गांव / कस्बा / वार्ड / जिला): <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="गांव, पोस्ट, थाना, जिला सहित"
                    className={`w-full p-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 ${
                      errors.address
                        ? "border-red-500 bg-red-50/50"
                        : "border-brand-maroon-200 bg-brand-cream-50/40"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                    अतिरिक्त विवरण या आपने कहाँ से प्रशिक्षण लिया:
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="उदा. सरकारी प्रशिक्षण केंद्र से ६ माह का कोर्स किया है..."
                    className="w-full p-2.5 rounded-xl border border-brand-maroon-200 bg-brand-cream-50/40 text-sm focus:outline-none focus:ring-2 focus:ring-brand-saffron-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-saffron-500 to-brand-saffron-600 hover:from-brand-saffron-600 hover:to-brand-saffron-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>पंजीकरण दर्ज किया जा रहा है...</span>
                  ) : (
                    <>
                      <Award className="w-4 h-4 text-brand-gold-200" />
                      <span>प्रतियोगिता में भाग लेने हेतु पंजीकरण करें</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
