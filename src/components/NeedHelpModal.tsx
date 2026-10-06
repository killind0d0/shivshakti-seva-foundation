"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";
import ModalPortal from "./ModalPortal";
import { getWhatsAppUrl, openWhatsAppDirect } from "@/utils/whatsappHelper";
import { useLanguage } from "@/context/LanguageContext";

interface NeedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function NeedHelpModal({
  isOpen,
  onClose,
  preselectedService,
}: NeedHelpModalProps) {
  const { isEn, t } = useLanguage();
  const [formData, setFormData] = useState({
    needType: preselectedService || (isEn ? "Food & Ration Support" : "राशन एवं भोजन सहायता"),
    name: "",
    phone: "",
    location: "",
    details: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdTrackingId, setCreatedTrackingId] = useState<string>("");
  const [whatsappText, setWhatsappText] = useState<string>("");

  // Sync needType default whenever language switches
  React.useEffect(() => {
    if (!preselectedService) {
      setFormData((prev) => ({
        ...prev,
        needType: isEn ? "Food & Ration Support" : "राशन एवं भोजन सहायता",
      }));
    }
  }, [isEn, preselectedService]);

  // Accessibility: close on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hindiServiceOptions = [
    "राशन एवं भोजन सहायता",
    "सामाजिक कल्याण सहायता",
    "धार्मिक एवं संस्कार सहायता",
    "सांस्कृतिक रक्षा एवं संवर्धन",
    "स्वास्थ्य एवं चिकित्सा सेवा (२४×७)",
    "शैक्षिक सेवा (बच्चों की पढ़ाई/फीस/किताबें)",
    "पर्यावरण संरक्षण अभियान",
    "बाढ़ एवं आपदा राहत (तिरपाल/राशन/दवा)",
    "महिला विकास एवं हुनर सहायता",
    "युवा विकास एवं मार्गदर्शन",
    "अन्न + वस्त्र दान सहायता",
    "अन्य आपातकालीन सहायता",
  ];

  const englishServiceOptions = [
    "Food & Ration Support",
    "Social Welfare Support",
    "Religious & Cultural Rites",
    "Heritage & Cultural Preservation",
    "Health & Medical Care (24×7)",
    "Educational Aid (Fees / Books)",
    "Environmental Conservation",
    "Flood & Disaster Relief (Ration/Tarpaulins)",
    "Women Empowerment & Skill Development",
    "Youth Guidance & Mentorship",
    "Annapurna Meal & Clothing Support",
    "Other Emergency Assistance",
  ];

  const serviceOptions = isEn ? englishServiceOptions : hindiServiceOptions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/[\s\-\+]/g, "");

    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setError(
        t(
          "कृपया अपना नाम, फोन नंबर और स्थान अवश्य लिखें।",
          "Please enter your name, phone number, and location."
        )
      );
      return;
    }

    if (!/^([0-9]{10}|91[0-9]{10})$/.test(cleanPhone)) {
      setError(
        t(
          "कृपया मान्य १० अंकों का मोबाइल नंबर दर्ज करें।",
          "Please enter a valid 10-digit mobile number."
        )
      );
      return;
    }

    setError(null);
    setSubmitting(true);

    const fallbackReqId = `SSF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    let finalTrackingId = fallbackReqId;

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "help_request",
          ...formData,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.trackingId) {
          finalTrackingId = data.trackingId;
        } else if (data.data?.trackingId) {
          finalTrackingId = data.data.trackingId;
        }
      } else {
        console.warn(`Submissions API responded with status ${res.status}`);
      }
    } catch (fetchErr) {
      console.warn("Submissions API notice:", fetchErr);
    }

    // Set WhatsApp Message for direct dispatch
    const waMsg = isEn
      ? `🙏 *EMERGENCY HELP REQUEST — Shivshakti Seva Foundation*\n• Tracking ID: ${finalTrackingId}\n• Need Type: ${formData.needType}\n• Name: ${formData.name.trim()}\n• Phone: ${formData.phone.trim()}\n• Location: ${formData.location.trim()}\n• Details: ${formData.details.trim() || "No extra details"}\n• Date: ${new Date().toLocaleDateString("en-US")}`
      : `🙏 *सहायता अनुरोध — शिवशक्ति सेवा फाउंडेशन*\n• ट्रैकिंग आईडी: ${finalTrackingId}\n• सेवा प्रकार: ${formData.needType}\n• नाम: ${formData.name.trim()}\n• फोन: ${formData.phone.trim()}\n• स्थान/पता: ${formData.location.trim()}\n• विवरण: ${formData.details.trim() || "कोई अतिरिक्त विवरण नहीं"}\n• दिनांक: ${new Date().toLocaleDateString("hi-IN")}`;
    setWhatsappText(waMsg);

    // Immediately open WhatsApp so emergency request reaches Foundation helpline
    openWhatsAppDirect(waMsg);

    // Store locally for Admin / offline backup
    try {
      const stored = JSON.parse(localStorage.getItem("ssf_help_requests") || "[]");
      stored.push({
        ...formData,
        requestId: finalTrackingId,
        date: new Date().toLocaleDateString("hi-IN"),
        id: Date.now(),
        status: isEn ? "Received (Under Review)" : "प्राप्त हुआ (जाँच जारी)",
      });
      localStorage.setItem("ssf_help_requests", JSON.stringify(stored));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setCreatedTrackingId(finalTrackingId);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <ModalPortal>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-heading"
        className="modal-after-topbar p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border-2 border-brand-saffron-500 overflow-hidden flex flex-col modal-card-after-topbar animate-scaleIn">
          {/* Urgent Header */}
          <div className="p-3.5 sm:p-4 bg-brand-saffron-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold-200" />
              <h2 id="help-modal-heading" className="font-heading text-base sm:text-xl font-bold">
                {t('सहायता सहायता केंद्र — "हम साथ हैं"', 'Emergency Helpdesk — "We Stand With You"')}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white hover:bg-brand-saffron-700 transition flex items-center gap-1 font-bold text-xs bg-black/20 active:scale-95"
              aria-label={t("सहायता विंडो बंद करें", "Close help window")}
            >
              <span className="hidden sm:inline">{t("बंद करें", "Close")}</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-brand-charcoal-900">
            {/* Quick Direct Call Box */}
            <div className="p-4 rounded-xl bg-brand-cream-100 border-2 border-brand-maroon-800 text-center space-y-2">
              <span className="text-xs font-bold text-brand-maroon-900 block">
                {t(
                  "यदि आप फॉर्म नहीं भर सकते, तो तुरंत इस नंबर पर फोन मिलाएं:",
                  "If you need urgent assistance, call our 24×7 helpline directly:"
                )}
              </span>
              <a
                href="tel:+919117135379"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-900 text-white font-heading text-lg sm:text-xl font-bold shadow-md transition"
              >
                <PhoneCall className="w-5 h-5 text-brand-gold-400 animate-pulse" />
                <span><span className="font-sans font-bold tracking-wider">+91 91171 35379</span> ({t("२४×७ सदैव उपलब्ध", "24×7 Available")})</span>
              </a>
              <p className="text-[11px] text-brand-charcoal-600">
                {t(
                  "दिन-रात सेवा उपलब्ध • सीधे सहायता प्राप्त करें",
                  "Available round-the-clock • Immediate response"
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-brand-charcoal-500 my-1 justify-center">
              <span className="h-px bg-brand-cream-300 flex-1" />
              <span className="font-bold">{t("अथवा नीचे विवरण दर्ज करें", "Or submit request details below")}</span>
              <span className="h-px bg-brand-cream-300 flex-1" />
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-emerald-950">
                  {t(
                    "घबराएं नहीं, आपका संदेश हमें मिल गया है।",
                    "Do not worry, we have received your request."
                  )}
                </h3>
                {createdTrackingId && (
                  <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-block text-center shadow-xs">
                    <p className="text-xs text-brand-charcoal-600 font-medium">
                      {t("आपका अनुरोध ट्रैकिंग क्रमांक (Tracking ID):", "Your Request Tracking ID:")}
                    </p>
                    <p className="text-xl font-heading font-bold text-brand-maroon-900 tracking-wider mt-0.5">
                      {createdTrackingId}
                    </p>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      {t(
                        "वेबसाइट पर 'अनुरोध स्थिति' से प्रगति देख सकते हैं",
                        "Track status anytime using the Request Tracker"
                      )}
                    </p>
                  </div>
                )}
                <p className="text-sm text-emerald-900 leading-relaxed">
                  {t(
                    "शिवशक्ति सेवा फाउंडेशन का सेवा दल आपके द्वारा दिए गए फोन नंबर पर शीघ्र ही संपर्क करेगा। ईश्वर आपको संबल प्रदान करें।",
                    "Our volunteer team will contact you promptly at the phone number provided. Stay strong."
                  )}
                </p>

                {/* Instant WhatsApp Dispatch Action */}
                <div className="pt-2 space-y-2">
                  <a
                    href={getWhatsAppUrl(whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 animate-pulse"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-200" />
                    <span>{t("📤 अपना फ़ॉर्म फाउंडेशन को भेजें (Send on WhatsApp)", "📤 Send Details on WhatsApp")}</span>
                  </a>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    {t(
                      "WhatsApp से भेजना आवश्यक है ताकि फाउंडेशन को आपका अनुरोध प्राप्त हो (+91 91171 35379)।",
                      "Sending via WhatsApp ensures immediate receipt by our field coordinators (+91 91171 35379)."
                    )}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="mt-3 px-6 py-2 rounded-lg bg-brand-maroon-800 text-white font-bold text-sm hover:bg-brand-maroon-900 transition"
                >
                  {t("विंडो बंद करें", "Close Window")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
                {error && (
                  <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Need Type */}
                <div>
                  <label htmlFor="help-need-type" className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                    {t("आवश्यक सहायता का प्रकार:", "Type of Support Needed:")}
                  </label>
                  <select
                    id="help-need-type"
                    value={formData.needType}
                    onChange={(e) =>
                      setFormData({ ...formData, needType: e.target.value })
                    }
                    className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm bg-white"
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="help-name" className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                    {t("आपका नाम:", "Your Name:")} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="help-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t(
                      "अपना या अपने परिवार के मुखिया का नाम लिखें",
                      "Enter your name or head of family"
                    )}
                    className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="help-phone" className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                    {t("मोबाइल / फोन नंबर:", "Mobile / Phone Number:")} <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="help-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={t("जिस नंबर पर हम बात कर सकें (उदा. 9876543210)", "Contact phone number (e.g. 9876543210)")}
                    className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="help-location" className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                    {t("स्थान / पता (गाँव, मोहल्ला, जिला):", "Location / Address (Village, Ward, City):")}{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="help-location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder={t(
                      "उदा. गयाजी, बिहार अथवा निकटतम कस्बा",
                      "e.g. GayaJi, Bihar or nearest landmark"
                    )}
                    className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                  />
                </div>

                {/* Optional details */}
                <div>
                  <label htmlFor="help-details" className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                    {t("समस्या का संक्षिप्त विवरण (वैकल्पिक):", "Brief Description of Situation (Optional):")}
                  </label>
                  <textarea
                    id="help-details"
                    rows={2}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    placeholder={t("अपनी परिस्थिति के बारे में बताएं", "Briefly explain the emergency")}
                    className="w-full p-2 rounded-lg border border-brand-maroon-200 text-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base shadow-md flex items-center justify-center gap-2 transition disabled:opacity-70"
                  >
                    {submitting ? (
                      <span>{t("कृपया प्रतीक्षा करें...", "Please wait...")}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t("सहायता हेतु आवेदन भेजें", "Submit Help Request")}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
