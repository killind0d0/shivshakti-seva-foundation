"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  MessageCircle,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Users,
  ShieldCheck,
  Bell,
  HeartHandshake,
  Phone,
} from "lucide-react";

interface WhatsAppCommunityProps {
  whatsappLink?: string;
  phoneNumber?: string;
}

export default function WhatsAppCommunity({
  whatsappLink,
  phoneNumber = "+919117135379",
}: WhatsAppCommunityProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "") || "919117135379";

  // Official direct WhatsApp community join link with pre-filled volunteer community message
  const officialCommunityLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "नमस्ते शिवशक्ति सेवा फाउंडेशन, मैं आपके सेवादार एवं स्वयंसेवक कम्युनिटी ग्रुप से जुड़ना चाहता/चाहती हूँ।"
  )}`;

  // Direct chat link for general enquiries
  const directChatLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "नमस्ते शिवशक्ति सेवा फाउंडेशन, मुझे संस्था के सेवा कार्यों एवं सहायता के संबंध में सीधी जानकारी चाहिए।"
  )}`;

  // Use explicit custom link if provided and not the legacy dummy link
  const activeInviteLink =
    whatsappLink && !whatsappLink.includes("chat.whatsapp.com/invite/shivshaktiseva")
      ? whatsappLink
      : officialCommunityLink;

  useEffect(() => {
    QRCode.toDataURL(activeInviteLink, {
      width: 280,
      margin: 2,
      color: {
        dark: "#4A0E17", // brand maroon
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code error:", err));
  }, [activeInviteLink]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeInviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="whatsapp-community"
      className="py-16 sm:py-24 bg-gradient-to-b from-brand-cream-100 via-white to-brand-cream-50 border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label="आधिकारिक व्हाट्सएप कम्युनिटी"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-saffron-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>सीधा संवाद एवं सेवा परिवार</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            हमारे आधिकारिक व्हाट्सएप ग्रुप से जुड़ें
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            क्यूआर कोड स्कैन करें या नीचे दिए बटन पर क्लिक कर सीधे शिवशक्ति सेवा
            फाउंडेशन के सेवा परिवार का हिस्सा बनें।
          </p>
          <div className="w-16 h-1 bg-brand-gold-500 mx-auto rounded-full mt-2" />
        </div>

        {/* Main Grid: Card with QR and Benefits */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-brand-maroon-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: QR Code Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 p-8 text-white flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-brand-maroon-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-gold-300 text-xs font-semibold mb-4 border border-white/10">
              <QrCode className="w-3.5 h-3.5" />
              <span>मोबाइल कैमरे से स्कैन करें</span>
            </div>

            {/* QR Box */}
            <div className="relative p-3.5 bg-white rounded-2xl shadow-2xl border-4 border-brand-gold-400 max-w-[240px] mx-auto">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt="शिवशक्ति सेवा फाउंडेशन व्हाट्सएप ग्रुप क्यूआर कोड"
                  className="w-full h-auto rounded-lg block"
                  width={220}
                  height={220}
                />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center text-brand-charcoal-400 text-xs">
                  क्यूआर कोड लोड हो रहा है...
                </div>
              )}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow whitespace-nowrap">
                स्कैन करें व जुड़ें
              </div>
            </div>

            <p className="mt-6 text-xs text-brand-cream-200 leading-relaxed max-w-xs">
              व्हाट्सएप खोलें &gt; कैमरा या क्यूआर स्कैनर चुनें &gt; इस कोड को स्कैन
              करें।
            </p>

            {/* Copy Link Button */}
            <div className="mt-5 w-full max-w-xs">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-brand-cream-100 flex items-center justify-center gap-2 transition"
                aria-label="ग्रुप इनवाइट लिंक कॉपी करें"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">लिंक कॉपी हो गया!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-brand-gold-400" />
                    <span>इनवाइट लिंक कॉपी करें</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Information, Benefits & Action Buttons */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-maroon-950">
                    शिवशक्ति सेवा परिवार समुदाय
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-700 font-bold">
                    आधिकारिक व्हाट्सएप कम्युनिटी • २४×७ लाइव
                  </p>
                </div>
              </div>

              <p className="text-sm text-brand-charcoal-700 leading-relaxed">
                इस ग्रुप का उद्देश्य सेवा कार्यों में पारदर्शिता, जरूरतमंदों की
                त्वरित सहायता और समाज कल्याण हेतु सेवाभावी लोगों को एक मंच पर जोड़ना
                है।
              </p>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-brand-cream-100/70 border border-brand-cream-300 flex items-start gap-2.5">
                  <Bell className="w-4 h-4 text-brand-saffron-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-brand-maroon-950 font-bold">
                      दैनिक सेवा अपडेट
                    </strong>
                    <span className="text-brand-charcoal-600">
                      राहत, अन्न-वस्त्र व चिकित्सा शिविर की सूचना।
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-cream-100/70 border border-brand-cream-300 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-brand-maroon-950 font-bold">
                      २४×७ आपातकालीन सहायता
                    </strong>
                    <span className="text-brand-charcoal-600">
                      संकट के समय तुरंत टीम से संपर्क व समन्वय।
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-cream-100/70 border border-brand-cream-300 flex items-start gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-brand-gold-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-brand-maroon-950 font-bold">
                      महिला व युवा कार्यक्रम
                    </strong>
                    <span className="text-brand-charcoal-600">
                      प्रतियोगिताओं व स्वरोजगार आदेशों की घोषणा।
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-brand-cream-100/70 border border-brand-cream-300 flex items-start gap-2.5">
                  <Users className="w-4 h-4 text-brand-maroon-700 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-brand-maroon-950 font-bold">
                      स्वयंसेवक सहभागिता
                    </strong>
                    <span className="text-brand-charcoal-600">
                      अपने क्षेत्र में जरूरतमंदों की सेवा का अवसर।
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action CTAs */}
            <div className="pt-4 border-t border-brand-maroon-100 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={activeInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>सीधे व्हाट्सएप ग्रुप से जुड़ें</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={directChatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-4 h-4 text-brand-gold-400" />
                  <span>सीधे चैट करें (<span className="font-sans font-bold">+91 91171 35379</span>)</span>
                </a>
              </div>

              <p className="text-[11px] text-center sm:text-left text-brand-charcoal-500">
                🔒 आपका नंबर सुरक्षित रहेगा। ग्रुप केवल जनकल्याणकारी एवं सेवा
                सूचनाओं के लिए है।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
