"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  MapPin,
  HeartHandshake,
} from "lucide-react";
import ModalPortal from "./ModalPortal";
import { getWhatsAppUrl, FOUNDATION_WHATSAPP_NUMBER } from "@/utils/whatsappHelper";

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
  const [formData, setFormData] = useState({
    needType: preselectedService || "राशन एवं भोजन सहायता",
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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.location.trim()) {
      setError("कृपया अपना नाम, फोन नंबर और स्थान अवश्य लिखें।");
      return;
    }
    setError(null);
    setSubmitting(true);

    const reqId = `SSF-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedTrackingId(reqId);

    const msg = `🚨 *आपातकालीन सहायता अनुरोध — शिवशक्ति सेवा फाउंडेशन*
• अनुरोध आईडी: ${reqId}
• नाम: ${formData.name.trim()}
• फोन नंबर: ${formData.phone.trim()}
• स्थान: ${formData.location.trim()}
• सहायता प्रकार: ${formData.needType}
• विस्तृत विवरण: ${formData.details?.trim() || "त्वरित सहायता अपेक्षित"}
• दिनांक: ${new Date().toLocaleDateString("hi-IN")}`;
    setWhatsappText(msg);

    setTimeout(() => {
      // Store locally for Admin
      try {
        const stored = JSON.parse(localStorage.getItem("ssf_help_requests") || "[]");
        stored.push({
          ...formData,
          requestId: reqId,
          date: new Date().toLocaleDateString("hi-IN"),
          id: Date.now(),
          status: "प्राप्त हुआ (जाँच जारी)",
        });
        localStorage.setItem("ssf_help_requests", JSON.stringify(stored));
      } catch (err) {
        console.error(err);
      }

      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (!isOpen) return null;

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
                सहायता सहायता केंद्र — "हम साथ हैं"
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-white hover:bg-brand-saffron-700 transition flex items-center gap-1 font-bold text-xs bg-black/20 active:scale-95"
              aria-label="सहायता विंडो बंद करें"
            >
              <span className="hidden sm:inline">बंद करें</span>
              <X className="w-5 h-5" />
            </button>
          </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-brand-charcoal-900">
          {/* Quick Direct Call Box for low digital literacy */}
          <div className="p-4 rounded-xl bg-brand-cream-100 border-2 border-brand-maroon-800 text-center space-y-2">
            <span className="text-xs font-bold text-brand-maroon-900 block">
              यदि आप फॉर्म नहीं भर सकते, तो तुरंत इस नंबर पर फोन मिलाएं:
            </span>
            <a
              href="tel:+919117135379"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-900 text-white font-heading text-xl font-bold shadow-md transition"
            >
              <PhoneCall className="w-5 h-5 text-brand-gold-400 animate-pulse" />
              <span><span className="font-sans font-bold tracking-wider">+91 91171 35379</span> (२४×७ सदैव उपलब्ध)</span>
            </a>
            <p className="text-[11px] text-brand-charcoal-600">
              दिन-रात सेवा उपलब्ध • सीधे सहायता प्राप्त करें
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-charcoal-500 my-1 justify-center">
            <span className="h-px bg-brand-cream-300 flex-1" />
            <span className="font-bold">अथवा नीचे विवरण दर्ज करें</span>
            <span className="h-px bg-brand-cream-300 flex-1" />
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-emerald-950">
                घबराएं नहीं, आपका संदेश हमें मिल गया है।
              </h3>
              {createdTrackingId && (
                <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-block text-center shadow-xs">
                  <p className="text-xs text-brand-charcoal-600 font-medium">आपका अनुरोध ट्रैकिंग क्रमांक (Tracking ID):</p>
                  <p className="text-xl font-heading font-bold text-brand-maroon-900 tracking-wider mt-0.5">{createdTrackingId}</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">वेबसाइट पर 'अनुरोध स्थिति' से प्रगति देख सकते हैं</p>
                </div>
              )}
              <p className="text-sm text-emerald-900 leading-relaxed">
                शिवशक्ति सेवा फाउंडेशन का सेवा दल आपके द्वारा दिए गए फोन नंबर पर
                शीघ्र ही संपर्क करेगा। ईश्वर आपको संबल प्रदान करें।
              </p>

              {/* Instant WhatsApp Dispatch Action */}
              <div className="pt-2 space-y-2">
                <a
                  href={getWhatsAppUrl(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-emerald-400 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-200" />
                  <span>व्हाट्सएप पर तुरंत सूचना भेजें (Direct WhatsApp)</span>
                </a>
                <p className="text-[11px] text-emerald-800 font-medium">
                  टैप करते ही यह विवरण सीधे हमारे हेल्पलाइन नंबर (+91 91171 35379) पर प्रेषित हो जाएगा।
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-3 px-6 py-2 rounded-lg bg-brand-maroon-800 text-white font-bold text-sm hover:bg-brand-maroon-900 transition"
              >
                विंडो बंद करें
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
                <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                  आवश्यक सहायता का प्रकार:
                </label>
                <select
                  value={formData.needType}
                  onChange={(e) =>
                    setFormData({ ...formData, needType: e.target.value })
                  }
                  className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm bg-white"
                >
                  <option value="सामाजिक कल्याण सहायता">सामाजिक कल्याण सहायता</option>
                  <option value="धार्मिक एवं संस्कार सहायता">धार्मिक एवं संस्कार सहायता</option>
                  <option value="सांस्कृतिक रक्षा एवं संवर्धन">सांस्कृतिक रक्षा एवं संवर्धन</option>
                  <option value="स्वास्थ्य एवं चिकित्सा सेवा">स्वास्थ्य एवं चिकित्सा सेवा (२४×७)</option>
                  <option value="शैक्षिक सेवा (शिक्षा सहायता)">शैक्षिक सेवा (बच्चों की पढ़ाई/फीस/किताबें)</option>
                  <option value="पर्यावरण संरक्षण अभियान">पर्यावरण संरक्षण अभियान</option>
                  <option value="बाढ़ एवं आपदा राहत">बाढ़ एवं आपदा राहत (तिरपाल/राशन/दवा)</option>
                  <option value="महिला विकास एवं हुनर प्रतियोगिता">महिला विकास एवं हुनर प्रतियोगिता</option>
                  <option value="युवा विकास एवं मार्गदर्शन">युवा विकास एवं मार्गदर्शन</option>
                  <option value="अन्न + वस्त्र दान सहायता">अन्न + वस्त्र दान सहायता</option>
                  <option value="अन्य आपातकालीन सहायता">अन्य आपातकालीन सहायता</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                  आपका नाम: <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="अपना या अपने परिवार के मुखिया का नाम लिखें"
                  className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                  मोबाइल / फोन नंबर: <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="जिस नंबर पर हम बात कर सकें"
                  className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                  स्थान / पता (गाँव, मोहल्ला, जिला):{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="उदा. ग्राम रामपुर, पोस्ट बिलारी, जिला मुरादाबाद"
                  className="w-full p-2.5 rounded-lg border border-brand-maroon-200 text-sm"
                />
              </div>

              {/* Optional details */}
              <div>
                <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                  समस्या का संक्षिप्त विवरण (वैकल्पिक):
                </label>
                <textarea
                  rows={2}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="अपनी परिस्थिति के बारे में बताएं"
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
                    <span>कृपया प्रतीक्षा करें...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>सहायता हेतु आवेदन भेजें</span>
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
