"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  HeartHandshake,
  QrCode,
  Building2,
  Copy,
  Check,
  ShieldCheck,
  Info,
  ExternalLink,
  Sparkles,
  Smartphone,
  Share2,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";
import TraditionalDivider from "./TraditionalDivider";
import TraditionalCornerFlourish from "./TraditionalCornerFlourish";
import ShareCard from "./ShareCard";

interface DonationSectionProps {
  donationConfig: FoundationData["donationConfig"];
}

export default function DonationSection({
  donationConfig,
}: DonationSectionProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "bank">("upi");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 0);

  const upiLink = useMemo(() => {
    const cleanUpi = donationConfig.upiId || "9117135379@upi";
    const cleanName = donationConfig.accountName || "शिवशक्ति सेवा फाउंडेशन";
    const base = `upi://pay?pa=${encodeURIComponent(cleanUpi)}&pn=${encodeURIComponent(cleanName)}&cu=INR&tn=${encodeURIComponent("शिवशक्ति सेवा फाउंडेशन जनसहयोग")}`;
    return effectiveAmount > 0 ? `${base}&am=${effectiveAmount}` : base;
  }, [donationConfig.upiId, donationConfig.accountName, effectiveAmount]);

  useEffect(() => {
    QRCode.toDataURL(upiLink, {
      width: 280,
      margin: 1.5,
      color: {
        dark: "#2a0407",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR Code Error:", err));
  }, [upiLink]);

  const predefinedAmounts = [
    { value: 500, label: "₹ ५००", impact: "१ परिवार को १ सप्ताह का राशन" },
    { value: 1100, label: "₹ १,१००", impact: "१ बालक की १ माह की शिक्षा व पुस्तकें" },
    { value: 2100, label: "₹ २,१००", impact: "बाढ़ पीड़ित परिवार हेतु आपातकालीन किट" },
    { value: 5100, label: "₹ ५,१००", impact: "स्वास्थ्य शिविर एवं गंभीर औषधि संबल" },
  ];

  const getImpactMessage = (amount: number): string => {
    if (amount <= 0) return "कृपया राशि चुनें या दर्ज करें";
    if (amount <= 300) return "🍚 १ परिवार को ३ दिन का पौष्टिक राशन";
    if (amount <= 700) return "🍚 १ परिवार को १ सप्ताह का राशन एवं दैनिक भोजन";
    if (amount <= 1500) return "📚 १ बच्चे की ३ माह की शिक्षा सामग्री व पुस्तकें";
    if (amount <= 3000) return "💊 १ बुजुर्ग की १ माह की स्वास्थ्य सेवा एवं औषधि";
    if (amount <= 6000) return "🧵 १ बहन के लिए सिलाई मशीन व प्रशिक्षण";
    if (amount <= 15000) return "🏠 १ आपदा पीड़ित परिवार का पुनर्वास एवं संबल";
    if (amount <= 30000) return "🏥 १ गाँव में निःशुल्क स्वास्थ्य शिविर का आयोजन";
    return "🌟 सम्पूर्ण गाँव के लिए बहुआयामी सेवा अभियान";
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <section
      id="sahyog-karein"
      className="py-16 sm:py-24 bg-white border-b border-brand-maroon-100 relative"
      aria-label="दान एवं सहयोग खंड"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-saffron-100 text-brand-saffron-800 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-brand-saffron-600" />
            <span>पवित्र सेवा में आहुति</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            आपका छोटा सहयोग, किसी के लिए बड़ी आशा बन सकता है।
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            जब आप किसी असहाय की ओर हाथ बढ़ाते हैं, तो ईश्वर का आशीर्वाद आपके साथ
            होता है। हर अंशदान सीधे जमीनी स्तर पर जरूरतमंदों तक पहुँचता है।
          </p>
          <TraditionalDivider color="gold" variant="diya" className="mt-2" />
        </div>

        {/* Donation Container with Traditional Indian Royal Frame */}
        <div className="relative max-w-4xl mx-auto bg-brand-cream-50 rounded-3xl border-2 border-brand-gold-500/40 shadow-2xl overflow-hidden">
          <TraditionalCornerFlourish color="#d4af37" size={30} />
          {/* Preset Amount Selection */}
          <div className="p-6 sm:p-8 bg-white border-b border-brand-maroon-100">
            <h3 className="font-heading text-lg font-bold text-brand-maroon-950 mb-3">
              सहयोग राशि चुनें (रुपये में):
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {predefinedAmounts.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setSelectedAmount(item.value);
                    setCustomAmount("");
                  }}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    selectedAmount === item.value && !customAmount
                      ? "border-brand-saffron-500 bg-brand-saffron-50 text-brand-saffron-700 shadow-sm ring-2 ring-brand-saffron-400"
                      : "border-brand-maroon-100 hover:border-brand-gold-400 bg-white text-brand-charcoal-800"
                  }`}
                >
                  <div className="font-heading text-lg font-bold">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-brand-charcoal-500 mt-1 leading-tight">
                    {item.impact}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Amount Field */}
            <div className="max-w-md">
              <label
                htmlFor="custom-amount-input"
                className="block text-xs font-semibold text-brand-charcoal-700 mb-1"
              >
                या अपनी इच्छानुसार राशि दर्ज करें:
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-maroon-900 font-bold text-sm">
                  ₹
                </span>
                <input
                  id="custom-amount-input"
                  type="number"
                  min="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="उदा. ५,०००"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-brand-maroon-200 text-sm focus:outline-none focus:border-brand-saffron-500 focus:ring-1 focus:ring-brand-saffron-500 bg-white"
                />
              </div>
            </div>

            {/* Interactive Impact Calculator */}
            <div className="mt-6 pt-5 border-t border-brand-cream-300">
              <label
                htmlFor="impact-slider"
                className="block text-xs font-semibold text-brand-charcoal-700 mb-3"
              >
                ✦ प्रभाव देखें — स्लाइडर खिसकाएँ:
              </label>
              <input
                id="impact-slider"
                type="range"
                min={100}
                max={51000}
                step={100}
                value={effectiveAmount || 500}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSelectedAmount(null);
                  setCustomAmount(val.toString());
                }}
                className="w-full h-2.5 bg-brand-cream-300 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                           [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-saffron-600
                           [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                           [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6
                           [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-saffron-600
                           [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white
                           [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer"
                aria-label="दान राशि स्लाइडर"
                aria-valuemin={100}
                aria-valuemax={51000}
                aria-valuenow={effectiveAmount || 500}
                aria-valuetext={`₹ ${(effectiveAmount || 500).toLocaleString("en-IN")}`}
              />
              <div className="flex justify-between text-[10px] text-brand-charcoal-400 mt-1 px-0.5">
                <span>₹ १००</span>
                <span>₹ ५१,०००</span>
              </div>
              {/* Impact Preview */}
              <div className="mt-4 p-4 bg-gradient-to-r from-brand-saffron-50 to-brand-cream-100 rounded-2xl border border-brand-saffron-200/60 text-center">
                <div className="text-2xl sm:text-3xl font-heading text-brand-maroon-900 font-extrabold tracking-tight">
                  ₹ {(effectiveAmount || 0).toLocaleString("en-IN")}
                </div>
                <p className="text-sm sm:text-base text-brand-maroon-700 mt-1.5 font-medium leading-relaxed">
                  {getImpactMessage(effectiveAmount)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Switcher */}
          <div className="p-6 sm:p-8">
            <div className="flex border-b border-brand-cream-300 gap-4 mb-6">
              <button
                onClick={() => setActiveTab("upi")}
                className={`pb-3 text-sm sm:text-base font-bold flex items-center gap-2 border-b-2 transition ${
                  activeTab === "upi"
                    ? "border-brand-maroon-800 text-brand-maroon-900"
                    : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
                }`}
              >
                <QrCode className="w-5 h-5 text-brand-saffron-600" />
                <span>यूपीआई (UPI / क्यूआर कोड)</span>
              </button>

              <button
                onClick={() => setActiveTab("bank")}
                className={`pb-3 text-sm sm:text-base font-bold flex items-center gap-2 border-b-2 transition ${
                  activeTab === "bank"
                    ? "border-brand-maroon-800 text-brand-maroon-900"
                    : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
                }`}
              >
                <Building2 className="w-5 h-5 text-brand-maroon-800" />
                <span>सीधा बैंक खाता हस्तांतरण</span>
              </button>
            </div>

            {/* Method 1: UPI */}
            {activeTab === "upi" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left: Dynamic QR Code box */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-brand-maroon-100 shadow-sm text-center">
                    <div className="relative w-56 h-56 rounded-2xl border-2 border-brand-gold-400/60 flex flex-col items-center justify-center bg-white p-3 shadow-md group">
                      {qrCodeDataUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={qrCodeDataUrl}
                          alt="शिवशक्ति सेवा फाउंडेशन यूपीआई क्यूआर कोड"
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <QrCode className="w-20 h-20 text-brand-maroon-900 opacity-60 animate-pulse mb-2" />
                          <span className="text-xs text-brand-charcoal-500">
                            क्यूआर कोड लोड हो रहा है...
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-gold-100 text-brand-maroon-900 text-xs font-bold border border-brand-gold-300">
                        <Sparkles className="w-3 h-3 text-brand-saffron-600" />
                        <span>
                          {effectiveAmount > 0
                            ? `₹ ${effectiveAmount.toLocaleString("en-IN")} राशि हेतु सक्रिय कोड`
                            : "स्कैन करें एवं इच्छित राशि भरें"}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-charcoal-600 font-medium">
                        गूगल पे, फोनपे, पेटीएम, भीम अथवा किसी भी UPI ऐप से स्कैन करें
                      </p>
                    </div>

                    {/* Direct Mobile App Deep-Link Button */}
                    <a
                      href={upiLink}
                      className="mt-4 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                    >
                      <Smartphone className="w-4 h-4 text-emerald-200" />
                      <span>UPI ऐप द्वारा सीधे भुगतान करें</span>
                    </a>
                  </div>

                  {/* Right: UPI ID & Copy Details */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="p-4 rounded-xl bg-white border border-brand-maroon-100">
                      <span className="text-xs font-semibold text-brand-charcoal-500">
                        आधिकारिक यूपीआई पहचान (UPI ID)
                      </span>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="font-mono text-sm sm:text-base font-bold text-brand-maroon-950 break-all">
                          {donationConfig.upiId}
                        </span>
                        <button
                          onClick={() => handleCopy(donationConfig.upiId, "upi")}
                          className="px-3 py-1.5 rounded-lg bg-brand-maroon-100 hover:bg-brand-maroon-200 text-brand-maroon-900 text-xs font-bold flex items-center gap-1 transition flex-shrink-0"
                          title="यूपीआई आईडी कॉपी करें"
                        >
                          {copiedField === "upi" ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>कॉपी हो गया!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>कॉपी करें</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-brand-maroon-100 space-y-1">
                      <span className="text-xs font-semibold text-brand-charcoal-500">
                        खातेदार का नाम:
                      </span>
                      <div className="font-semibold text-sm text-brand-maroon-950">
                        {donationConfig.accountName}
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-brand-gold-50 border border-brand-gold-200 text-xs text-brand-charcoal-700 flex items-start gap-2">
                      <Info className="w-4 h-4 text-brand-gold-600 flex-shrink-0 mt-0.5" />
                      <span>
                        सहयोग के उपरांत रसीद प्राप्त करने हेतु कृपया ट्रांजेक्शन का स्क्रीनशॉट हमारे व्हाट्सएप नंबर पर प्रेषित करें।
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Method 2: Direct Bank Transfer */}
            {activeTab === "bank" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-brand-maroon-100 divide-y divide-brand-cream-200 text-sm">
                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-brand-charcoal-500">
                      खातेदार का नाम:
                    </span>
                    <span className="font-bold text-brand-maroon-950">
                      {donationConfig.accountName}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-brand-charcoal-500">
                      बैंक का नाम:
                    </span>
                    <span className="font-bold text-brand-charcoal-800">
                      {donationConfig.bankName}
                    </span>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-brand-charcoal-500">
                      खाता संख्या:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-maroon-950">
                        {donationConfig.accountNumber}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(donationConfig.accountNumber, "acc")
                        }
                        className="p-1 text-brand-maroon-700 hover:text-brand-maroon-900"
                        title="खाता संख्या कॉपी करें"
                      >
                        {copiedField === "acc" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-brand-charcoal-500">
                      आईएफएससी कोड:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-maroon-950">
                        {donationConfig.ifscCode}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(donationConfig.ifscCode, "ifsc")
                        }
                        className="p-1 text-brand-maroon-700 hover:text-brand-maroon-900"
                        title="आईएफएससी कोड कॉपी करें"
                      >
                        {copiedField === "ifsc" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-xs font-semibold text-brand-charcoal-500">
                      शाखा:
                    </span>
                    <span className="font-medium text-brand-charcoal-800">
                      {donationConfig.branch}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    यह बैंक खाता पंजीकृत सामाजिक सेवा न्यास के अंतर्गत अधिकृत है।
                  </span>
                </div>
              </div>
            )}

            {/* Exemption Note Placeholder */}
            <div className="mt-6 pt-4 border-t border-brand-cream-300 text-center">
              <span className="inline-block text-xs font-medium text-brand-charcoal-600 bg-brand-cream-200/60 px-3 py-1 rounded-full border border-brand-cream-300">
                {donationConfig.taxExemptionNote}
              </span>
            </div>

            {/* Share Contribution Certificate */}
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-600 hover:to-brand-gold-700 text-brand-maroon-950 font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-brand-maroon-900" />
                <span>सहयोग प्रमाण पत्र / संदेश साझा करें</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Card Modal */}
      <ShareCard
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        defaultAmount={effectiveAmount}
      />
    </section>
  );
}
