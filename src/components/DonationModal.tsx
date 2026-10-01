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
  X,
  ShieldCheck,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationConfig: FoundationData["donationConfig"];
}

export default function DonationModal({
  isOpen,
  onClose,
  donationConfig,
}: DonationModalProps) {
  const [activeTab, setActiveTab] = useState<"upi" | "bank">("upi");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  const effectiveAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 0);

  const upiLink = useMemo(() => {
    const cleanUpi = donationConfig.upiId || "9117135379@upi";
    const cleanName = donationConfig.accountName || "शिवशक्ति सेवा फाउंडेशन";
    const base = `upi://pay?pa=${encodeURIComponent(cleanUpi)}&pn=${encodeURIComponent(cleanName)}&cu=INR&tn=${encodeURIComponent("शिवशक्ति सेवा सहयोग")}`;
    return effectiveAmount > 0 ? `${base}&am=${effectiveAmount}` : base;
  }, [donationConfig.upiId, donationConfig.accountName, effectiveAmount]);

  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(upiLink, {
      width: 220,
      margin: 1,
      color: {
        dark: "#2a0407",
        light: "#ffffff",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("Modal QR Error:", err));
  }, [upiLink, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const predefinedAmounts = [
    { value: 500, label: "₹ ५००" },
    { value: 1100, label: "₹ १,१००" },
    { value: 2100, label: "₹ २,१००" },
    { value: 5100, label: "₹ ५,१००" },
  ];

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border-2 border-brand-maroon-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-brand-maroon-950 text-white flex items-center justify-between border-b border-brand-maroon-800">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/logo_emblem.png"
              alt="शिवशक्ति सेवा फाउंडेशन"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h2
                id="donation-modal-title"
                className="font-heading text-lg sm:text-xl font-bold text-brand-gold-300"
              >
                सहयोग करें — शिवशक्ति सेवा कोष
              </h2>
              <p className="text-xs text-brand-cream-300">
                प्रत्येक अंशदान सीधे पीड़ित एवं जरूरतमंद परिवारों तक पहुँचता है
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-brand-cream-300 hover:text-white hover:bg-brand-maroon-900 transition"
            aria-label="संवाद बंद करें"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-brand-charcoal-800 text-sm">
          {/* Amount selector */}
          <div>
            <label className="block text-xs font-bold text-brand-maroon-950 mb-2">
              सहयोग राशि चुनें:
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {predefinedAmounts.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(item.value);
                    setCustomAmount("");
                  }}
                  className={`py-2 rounded-lg font-heading font-bold text-sm transition ${
                    selectedAmount === item.value && !customAmount
                      ? "bg-brand-maroon-800 text-white shadow-sm"
                      : "bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-charcoal-800 border border-brand-cream-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-brand-maroon-900">
                ₹
              </span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="अन्य इच्छित राशि दर्ज करें"
                className="w-full pl-7 pr-3 py-2 rounded-lg border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:border-brand-saffron-500"
              />
            </div>
          </div>

          {/* Payment Method Switcher */}
          <div className="flex border-b border-brand-cream-300 gap-3">
            <button
              onClick={() => setActiveTab("upi")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "upi"
                  ? "border-brand-maroon-800 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <QrCode className="w-4 h-4 text-brand-saffron-600" />
              <span>यूपीआई (UPI / क्यूआर)</span>
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "bank"
                  ? "border-brand-maroon-800 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <Building2 className="w-4 h-4 text-brand-maroon-800" />
              <span>बैंक खाता हस्तांतरण</span>
            </button>
          </div>

          {/* Method 1: UPI */}
          {activeTab === "upi" && (
            <div className="space-y-4">
              <div className="p-4 bg-brand-cream-50 rounded-xl border border-brand-maroon-100 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-36 h-36 rounded-xl bg-white border-2 border-brand-gold-400 p-2 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                  {qrCodeDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={qrCodeDataUrl}
                      alt="यूपीआई क्यूआर कोड"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <QrCode className="w-20 h-20 text-brand-maroon-950 opacity-80" />
                  )}
                </div>
                <div className="space-y-2 flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-charcoal-600 uppercase block">
                      आधिकारिक यूपीआई पहचान:
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-brand-gold-100 text-brand-maroon-900 font-bold border border-brand-gold-300">
                      ₹ {effectiveAmount > 0 ? effectiveAmount.toLocaleString("en-IN") : "इच्छानुसार"}
                    </span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-brand-maroon-950 break-all p-2 rounded bg-white border border-brand-maroon-100">
                    {donationConfig.upiId}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleCopy(donationConfig.upiId, "modal-upi")}
                      className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-brand-maroon-800 hover:bg-brand-maroon-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      {copiedField === "modal-upi" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>आईडी कॉपी हो गई!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-brand-gold-400" />
                          <span>यूपीआई आईडी कॉपी करें</span>
                        </>
                      )}
                    </button>
                    <a
                      href={upiLink}
                      className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>सीधे UPI ऐप खोलें</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Method 2: Bank Transfer */}
          {activeTab === "bank" && (
            <div className="p-4 bg-brand-cream-50 rounded-xl border border-brand-maroon-100 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-brand-cream-200">
                <span className="text-brand-charcoal-500">खातेदार का नाम:</span>
                <span className="font-bold text-brand-maroon-950">
                  {donationConfig.accountName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-cream-200">
                <span className="text-brand-charcoal-500">बैंक का नाम:</span>
                <span className="font-semibold text-brand-charcoal-800">
                  {donationConfig.bankName}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-cream-200">
                <span className="text-brand-charcoal-500">खाता संख्या:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-maroon-950">
                    {donationConfig.accountNumber}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(donationConfig.accountNumber, "modal-acc")
                    }
                    className="p-1 text-brand-maroon-700"
                    title="कॉपी करें"
                  >
                    {copiedField === "modal-acc" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-brand-cream-200">
                <span className="text-brand-charcoal-500">आईएफएससी कोड:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-maroon-950">
                    {donationConfig.ifscCode}
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(donationConfig.ifscCode, "modal-ifsc")
                    }
                    className="p-1 text-brand-maroon-700"
                    title="कॉपी करें"
                  >
                    {copiedField === "modal-ifsc" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-brand-charcoal-500">शाखा:</span>
                <span className="font-medium text-brand-charcoal-800">
                  {donationConfig.branch}
                </span>
              </div>
            </div>
          )}

          {/* Trust and Exemption note */}
          <div className="p-3 bg-brand-gold-50 border border-brand-gold-200 rounded-lg text-xs text-brand-charcoal-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-maroon-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>पारदर्शी एवं सुरक्षित हस्तांतरण</span>
            </div>
            <p className="text-[11px] text-brand-charcoal-600">
              सहयोग के उपरांत दान की डिजिटल रसीद प्राप्त करने हेतु कृपया ट्रांजेक्शन का स्क्रीनशॉट हमारे हेल्पलाइन नंबर पर व्हाट्सएप करें।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-brand-cream-100 border-t border-brand-maroon-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-brand-maroon-800 text-white font-semibold text-xs hover:bg-brand-maroon-700 transition"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
