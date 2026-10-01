"use client";

import React, { useState, useEffect, useMemo } from "react";
import ModalPortal from "./ModalPortal";
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
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";
import PaymentAppBadges from "./PaymentAppBadges";

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
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"upi" | "bank" | "receipt">("upi");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

  // Donor Details & Receipt Form States
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorCity, setDonorCity] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 0);

  const upiLink = useMemo(() => {
    const cleanUpi = donationConfig?.upiId || "9177135379@mairtel";
    const cleanName = donationConfig?.accountName || "शिवशक्ति सेवा फाउंडेशन";
    const base = `upi://pay?pa=${encodeURIComponent(cleanUpi)}&pn=${encodeURIComponent(cleanName)}&cu=INR&tn=${encodeURIComponent("शिवशक्ति सेवा सहयोग")}`;
    return effectiveAmount > 0 ? `${base}&am=${effectiveAmount}` : base;
  }, [donationConfig?.upiId, donationConfig?.accountName, effectiveAmount]);

  useEffect(() => {
    if (!isOpen) return;
    QRCode.toDataURL(upiLink, {
      width: 240,
      margin: 1.5,
      color: {
        dark: "#2a0407",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
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

  if (!isOpen || !mounted) return null;

  const predefinedAmounts = [
    { value: 500, label: "₹ 500", note: "राशन किट" },
    { value: 1100, label: "₹ 1,100", note: "शिक्षा संबल" },
    { value: 2100, label: "₹ 2,100", note: "आपदा राहत" },
    { value: 5100, label: "₹ 5,100", note: "स्वास्थ्य शिविर" },
  ];

  const handleCopy = (text: string, fieldName: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => {
        setCopiedField(null);
      }, 2500);
    }
  };

  const handleReceiptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName || !donorPhone) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptSubmitted(true);
    }, 600);
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
      className="modal-after-topbar p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-maroon-800 overflow-hidden flex flex-col modal-card-after-topbar animate-scaleIn transition-all"
        style={{
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Header with Royal Theme */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-maroon-950 via-brand-maroon-900 to-brand-maroon-950 text-white flex items-center justify-between border-b-2 border-brand-gold-500/80 shadow-md shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src="/images/logo/logo_emblem.png"
              alt="शिवशक्ति सेवा फाउंडेशन"
              width={44}
              height={44}
              className="rounded-full border border-brand-gold-400 p-0.5 bg-white/10 flex-shrink-0"
            />
            <div className="min-w-0">
              <h2
                id="donation-modal-title"
                className="font-heading text-base sm:text-lg lg:text-xl font-bold text-brand-gold-300 truncate"
              >
                सहयोग करें — शिवशक्ति सेवा कोष
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-cream-200/90 truncate">
                प्रत्येक अंशदान सीधे पीड़ित एवं जरूरतमंद परिवारों तक पहुँचता है
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-brand-cream-100 hover:text-white transition font-bold text-xs border border-white/20 active:scale-95 flex-shrink-0"
            aria-label="संवाद बंद करें"
          >
            <span className="hidden sm:inline">बंद करें</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-brand-charcoal-800 text-sm">
          {/* Quick Amount Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-brand-maroon-950 uppercase tracking-wide">
                सहयोग राशि चुनें:
              </label>
              {effectiveAmount > 0 && (
                <span className="text-xs font-bold text-brand-saffron-700 bg-brand-saffron-50 px-2.5 py-0.5 rounded-full border border-brand-saffron-200">
                  चयनित राशि: ₹ {effectiveAmount.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {predefinedAmounts.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(item.value);
                    setCustomAmount("");
                  }}
                  className={`py-2 px-2 rounded-xl text-center transition-all ${
                    selectedAmount === item.value && !customAmount
                      ? "bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-800 text-white shadow-md border border-brand-gold-400 font-bold scale-[1.02]"
                      : "bg-brand-cream-50 hover:bg-brand-cream-100 text-brand-charcoal-800 border border-brand-maroon-100"
                  }`}
                >
                  <div className="font-heading font-extrabold text-sm sm:text-base">
                    {item.label}
                  </div>
                  <div className="text-[10px] opacity-80 mt-0.5 font-medium">
                    {item.note}
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-brand-maroon-900 text-base">
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
                placeholder="अन्य इच्छित राशि यहाँ दर्ज करें (उदा. 5100)"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
              />
            </div>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex border-b border-brand-maroon-100 gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab("upi")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "upi"
                  ? "border-brand-saffron-600 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <QrCode className="w-4 h-4 text-brand-saffron-600" />
              <span>यूपीआई (UPI / QR)</span>
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "bank"
                  ? "border-brand-saffron-600 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <Building2 className="w-4 h-4 text-brand-maroon-800" />
              <span>बैंक खाता विवरण</span>
            </button>
            <button
              onClick={() => setActiveTab("receipt")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "receipt"
                  ? "border-brand-saffron-600 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>दान रसीद फॉर्म</span>
            </button>
          </div>

          {/* TAB 1: UPI & Dynamic QR */}
          {activeTab === "upi" && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 bg-brand-cream-50 rounded-2xl border border-brand-maroon-100 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                {/* QR Box */}
                <div className="w-44 h-44 rounded-2xl bg-white border-2 border-brand-gold-400 p-2.5 flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                  {qrCodeDataUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={qrCodeDataUrl}
                      alt="यूपीआई भुगतान क्यूआर कोड"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <QrCode className="w-24 h-24 text-brand-maroon-950 opacity-80" />
                  )}
                  <span className="text-[10px] text-brand-charcoal-500 font-bold mt-1">
                    PhonePe • GPay • Paytm • BHIM
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2.5 flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-charcoal-600 uppercase">
                      आधिकारिक UPI पहचान:
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-gold-100 text-brand-maroon-900 font-bold border border-brand-gold-300">
                      ₹ {effectiveAmount > 0 ? effectiveAmount.toLocaleString("en-IN") : "इच्छानुसार"}
                    </span>
                  </div>

                  <div className="font-mono text-xs sm:text-sm font-bold text-brand-maroon-950 break-all p-2.5 rounded-xl bg-white border border-brand-maroon-200 shadow-inner flex items-center justify-between">
                    <span>{donationConfig?.upiId || "9177135379@mairtel"}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(donationConfig?.upiId || "9177135379@mairtel", "modal-upi")}
                      className="ml-2 p-1.5 rounded-lg bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-maroon-900 transition flex-shrink-0"
                      title="यूपीआई कॉपी करें"
                    >
                      {copiedField === "modal-upi" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(donationConfig?.upiId || "9177135379@mairtel", "modal-upi-btn")}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      {copiedField === "modal-upi-btn" ? (
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
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>सीधे UPI ऐप से भुगतान करें</span>
                    </a>
                  </div>

                  {/* Glowing Payment App Logos */}
                  <div className="pt-2 border-t border-brand-maroon-100/70">
                    <div className="text-[10px] font-bold text-brand-charcoal-600 uppercase tracking-wider mb-1.5 text-center sm:text-left flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-saffron-600" />
                      <span>स्वीकृत यूपीआई ऐप्स (Accepted UPI Apps)</span>
                    </div>
                    <PaymentAppBadges size="sm" className="justify-center sm:justify-start" />
                  </div>
                </div>
              </div>

              {/* Quick switch to receipt form */}
              <div className="p-3 bg-brand-cream-100 rounded-xl border border-brand-gold-300/60 flex items-center justify-between">
                <span className="text-xs text-brand-charcoal-700">
                  भुगतान पूर्ण होने के बाद आधिकारिक रसीद दर्ज करें:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("receipt")}
                  className="px-3 py-1 rounded-lg bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                >
                  रसीद फॉर्म भरें →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Bank Transfer */}
          {activeTab === "bank" && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 bg-brand-cream-50 rounded-2xl border border-brand-maroon-100 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">खातेदार का नाम:</span>
                  <span className="font-bold text-brand-maroon-950">
                    {donationConfig?.accountName || "शिवशक्ति सेवा फाउंडेशन"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">बैंक का नाम:</span>
                  <span className="font-semibold text-brand-charcoal-800">
                    {donationConfig?.bankName || "भारतीय स्टेट बैंक (SBI)"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">खाता संख्या:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-brand-maroon-950 text-sm">
                      {donationConfig?.accountNumber || "43820100009458"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(donationConfig?.accountNumber || "43820100009458", "modal-acc")
                      }
                      className="p-1.5 rounded-md hover:bg-brand-cream-200 text-brand-maroon-700 transition"
                      title="खाता संख्या कॉपी करें"
                    >
                      {copiedField === "modal-acc" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">आईएफएससी कोड:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-brand-maroon-950 text-sm">
                      {donationConfig?.ifscCode || "SBIN0003574"}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(donationConfig?.ifscCode || "SBIN0003574", "modal-ifsc")
                      }
                      className="p-1.5 rounded-md hover:bg-brand-cream-200 text-brand-maroon-700 transition"
                      title="IFSC कॉपी करें"
                    >
                      {copiedField === "modal-ifsc" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-brand-charcoal-500 font-medium">शाखा:</span>
                  <span className="font-medium text-brand-charcoal-800">
                    {donationConfig?.branch || "गया मुख्य शाखा, बिहार"}
                  </span>
                </div>
              </div>

              {/* Quick switch to receipt form */}
              <div className="p-3 bg-brand-cream-100 rounded-xl border border-brand-gold-300/60 flex items-center justify-between">
                <span className="text-xs text-brand-charcoal-700">
                  बैंक ट्रांसफर के बाद विवरण दर्ज करें:
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("receipt")}
                  className="px-3 py-1 rounded-lg bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                >
                  रसीद फॉर्म भरें →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DONOR DETAILS & RECEIPT FORM (Addresses "returns only a blur screen with no forms") */}
          {activeTab === "receipt" && (
            <div className="space-y-4">
              {receiptSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-heading text-lg font-bold text-emerald-950">
                    सहयोग विवरण सफलतापूर्वक दर्ज हुआ!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    आदरणीय <strong>{donorName}</strong> जी, शिवशक्ति सेवा कोष में ₹<strong>{effectiveAmount || "अंशदान"}</strong> के पावन सहयोग हेतु आपका कोटि-कोटि धन्यवाद। सत्यापन उपरांत डिजिटल रसीद आपके व्हाट्सएप/फोन पर प्रेषित कर दी जाएगी।
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptSubmitted(false);
                        onClose();
                      }}
                      className="px-6 py-2 rounded-xl bg-brand-maroon-900 text-white font-bold text-xs hover:bg-brand-maroon-950 transition shadow-sm"
                    >
                      धन्यवाद (विंडो बंद करें)
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleReceiptSubmit} className="space-y-3.5">
                  <div className="p-3 bg-brand-gold-50 rounded-xl border border-brand-gold-300 text-xs text-brand-maroon-900 leading-relaxed">
                    कृपया अपने सहयोग का विवरण भरें ताकि संस्था आपके नाम से अधिकृत दान रसीद जारी कर सके।
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        दानदाता का पूरा नाम *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="उदा. राहुल कुमार शर्मा"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        मोबाइल / व्हाट्सएप नंबर *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="१० अंकों का मोबाइल नंबर"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        यूटीआर / ट्रांजेक्शन संदर्भ (UTR Ref No.)
                      </label>
                      <input
                        type="text"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder="उदा. 427819034251 (वैकल्पिक)"
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        शहर / जिला
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={donorCity}
                          onChange={(e) => setDonorCity(e.target.value)}
                          placeholder="उदा. गया, बिहार"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        ईमेल पता (वैकल्पिक)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        पैन नंबर (80G रसीद हेतु, वैकल्पिक)
                      </label>
                      <input
                        type="text"
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-maroon-900 via-brand-maroon-800 to-brand-maroon-950 text-white font-heading font-bold text-sm shadow-md hover:from-brand-maroon-800 hover:to-brand-maroon-900 transition flex items-center justify-center gap-2 border-b-2 border-brand-gold-500 active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-brand-gold-400" />
                    <span>
                      {isSubmitting ? "पंजीकरण दर्ज हो रहा है..." : "सहयोग विवरण एवं रसीद दर्ज करें"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Trust and Exemption Note */}
          <div className="p-3 bg-brand-gold-50 border border-brand-gold-200 rounded-xl text-xs text-brand-charcoal-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-maroon-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>पारदर्शी एवं सुरक्षित हस्तांतरण</span>
            </div>
            <p className="text-[11px] text-brand-charcoal-600 leading-relaxed">
              सहयोग के उपरांत डिजिटल रसीद प्राप्त करने हेतु सीधे हमारे हेल्पलाइन नंबर पर व्हाट्सएप भी कर सकते हैं।
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-brand-cream-100 border-t border-brand-maroon-200 flex items-center justify-between">
          <span className="text-[11px] text-brand-charcoal-600 font-medium hidden sm:inline">
            शिवशक्ति सेवा फाउंडेशन • गैर-लाभकारी संस्था
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-maroon-800 text-white font-bold text-xs hover:bg-brand-maroon-900 transition shadow-sm ml-auto active:scale-95"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );

  return <ModalPortal>{modalContent}</ModalPortal>;
}
