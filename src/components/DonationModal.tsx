"use client";

import React, { useState, useEffect, useMemo } from "react";
import ModalPortal from "./ModalPortal";
import Image from "next/image";
import QRCode from "qrcode";
import {
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
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { FoundationData } from "@/data/foundationData";
import { getWhatsAppUrl, openWhatsAppDirect } from "@/utils/whatsappHelper";
import PaymentAppBadges from "./PaymentAppBadges";
import { useLanguage } from "@/context/LanguageContext";

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
  const { isEn, t } = useLanguage();
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
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [receiptWhatsappText, setReceiptWhatsappText] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryUpi = donationConfig?.upiId || "9177135379@mairtel";
  const secondaryUpi = donationConfig?.secondaryUpiId || "9117135379@upi";
  const [selectedUpiId, setSelectedUpiId] = useState<string>(primaryUpi);

  useEffect(() => {
    setSelectedUpiId(primaryUpi);
  }, [primaryUpi]);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : (selectedAmount || 0);

  const upiLink = useMemo(() => {
    const cleanUpi = selectedUpiId || primaryUpi;
    const cleanName = donationConfig?.accountName || "शिवशक्ति सेवा फाउंडेशन";
    const base = `upi://pay?pa=${encodeURIComponent(cleanUpi)}&pn=${encodeURIComponent(cleanName)}&cu=INR&tn=${encodeURIComponent("शिवशक्ति सेवा सहयोग")}`;
    return effectiveAmount > 0 ? `${base}&am=${effectiveAmount}` : base;
  }, [selectedUpiId, primaryUpi, donationConfig?.accountName, effectiveAmount]);

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
    { value: 500, label: "₹ 500", note: t("राशन किट", "Ration Kit") },
    { value: 1100, label: "₹ 1,100", note: t("शिक्षा संबल", "Education Aid") },
    { value: 2100, label: "₹ 2,100", note: t("आपदा राहत", "Disaster Relief") },
    { value: 5100, label: "₹ 5,100", note: t("स्वास्थ्य शिविर", "Medical Camp") },
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

  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !donorPhone.trim()) {
      setReceiptError(t("कृपया अपना नाम और मोबाइल नंबर अवश्य दर्ज करें।", "Please enter your name and phone number."));
      return;
    }
    setReceiptError(null);
    setIsSubmitting(true);

    const msg = isEn
      ? `🙏 *80G DONATION RECEIPT REQUEST — Shivshakti Seva Foundation*\n• Donor: ${donorName.trim()}\n• Mobile: ${donorPhone.trim()}\n• Email: ${donorEmail.trim() || "N/A"}\n• City: ${donorCity.trim() || "N/A"}\n• PAN: ${donorPan.trim() || "N/A"}\n• UTR/Transaction Ref: ${transactionRef.trim() || "N/A"}\n• Amount: ₹${effectiveAmount}\n• Date: ${new Date().toLocaleDateString("en-US")}`
      : `🙏 *80G दान रसीद अनुरोध — शिवशक्ति सेवा फाउंडेशन*\n• दाता: ${donorName.trim()}\n• मोबाइल: ${donorPhone.trim()}\n• ईमेल: ${donorEmail.trim() || "लागू नहीं"}\n• शहर: ${donorCity.trim() || "लागू नहीं"}\n• पैन नंबर: ${donorPan.trim() || "लागू नहीं"}\n• यूटीआर/लेनदेन आईडी: ${transactionRef.trim() || "लागू नहीं"}\n• सहयोग राशि: ₹${effectiveAmount}\n• दिनांक: ${new Date().toLocaleDateString("hi-IN")}`;
    setReceiptWhatsappText(msg);

    // Immediately open WhatsApp so donation receipt request reaches Foundation accounts team
    openWhatsAppDirect(msg);

    const submissionData = {
      type: "donation_receipt",
      donorName: donorName.trim(),
      donorPhone: donorPhone.trim(),
      donorEmail: donorEmail.trim(),
      donorCity: donorCity.trim(),
      donorPan: donorPan.trim(),
      transactionRef: transactionRef.trim(),
      amount: effectiveAmount,
    };

    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
    } catch (err) {
      console.warn("Submissions API unreachable, saving donation receipt locally:", err);
    }

    // Save locally for offline backup
    try {
      const stored = JSON.parse(
        localStorage.getItem("ssf_donation_receipts") || "[]"
      );
      stored.push({
        ...submissionData,
        date: new Date().toLocaleDateString("hi-IN"),
        id: Date.now(),
      });
      localStorage.setItem("ssf_donation_receipts", JSON.stringify(stored));
    } catch (err) {
      console.error("Local storage error:", err);
    }

    setIsSubmitting(false);
    setReceiptSubmitted(true);
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
                {t("सहयोग करें — शिवशक्ति सेवा कोष", "Contribute — Shivshakti Seva Fund")}
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-cream-200/90 truncate">
                {t(
                  "प्रत्येक अंशदान सीधे पीड़ित एवं जरूरतमंद परिवारों तक पहुँचता है",
                  "Every contribution directly reaches distressed and underprivileged families"
                )}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-brand-cream-100 hover:text-white transition font-bold text-xs border border-white/20 active:scale-95 flex-shrink-0"
            aria-label={t("संवाद बंद करें", "Close Dialog")}
          >
            <span className="hidden sm:inline">{t("बंद करें", "Close")}</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-brand-charcoal-800 text-sm">
          {/* Quick Amount Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-brand-maroon-950 uppercase tracking-wide">
                {t("सहयोग राशि चुनें:", "Select Contribution Amount:")}
              </label>
              {effectiveAmount > 0 && (
                <span className="text-xs font-bold text-brand-saffron-700 bg-brand-saffron-50 px-2.5 py-0.5 rounded-full border border-brand-saffron-200">
                  {t("चयनित राशि:", "Selected Amount:")} ₹ {effectiveAmount.toLocaleString("en-IN")}
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
                placeholder={t("अन्य इच्छित राशि यहाँ दर्ज करें (उदा. 5100)", "Enter any other amount (e.g. 5100)")}
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
              <span>{t("यूपीआई (UPI / QR)", "UPI / QR Code")}</span>
            </button>
            {Boolean(donationConfig?.accountNumber) && (
              <button
                onClick={() => setActiveTab("bank")}
                className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                  activeTab === "bank"
                    ? "border-brand-saffron-600 text-brand-maroon-950 font-extrabold"
                    : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
                }`}
              >
                <Building2 className="w-4 h-4 text-brand-maroon-800" />
                <span>{t("बैंक खाता विवरण", "Bank Account")}</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab("receipt")}
              className={`pb-2.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === "receipt"
                  ? "border-brand-saffron-600 text-brand-maroon-950 font-extrabold"
                  : "border-transparent text-brand-charcoal-500 hover:text-brand-charcoal-800"
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{t("दान रसीद फॉर्म", "Receipt Request")}</span>
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
                      alt={t("यूपीआई भुगतान क्यूआर कोड", "UPI Payment QR Code")}
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
                <div className="space-y-3 flex-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-charcoal-600 uppercase">
                      {t("आधिकारिक UPI पहचान:", "Official UPI ID:")}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-gold-100 text-brand-maroon-900 font-bold border border-brand-gold-300">
                      ₹ {effectiveAmount > 0 ? effectiveAmount.toLocaleString("en-IN") : (isEn ? "Any Amount" : "इच्छानुसार")}
                    </span>
                  </div>

                  {/* Dual UPI Options Selector */}
                  <div className="space-y-2">
                    {/* Primary UPI: Airtel Payments Bank */}
                    <div
                      onClick={() => setSelectedUpiId(primaryUpi)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 text-left ${
                        selectedUpiId === primaryUpi
                          ? "border-brand-saffron-500 bg-white shadow-xs ring-1 ring-brand-saffron-400"
                          : "border-brand-cream-300 bg-brand-cream-100/60 hover:bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-brand-saffron-800 bg-brand-saffron-100 px-1.5 py-0.2 rounded">
                            {t("एयरटेल पेमेंट्स बैंक", "Airtel Payments Bank")}
                          </span>
                          {selectedUpiId === primaryUpi && (
                            <span className="text-[10px] text-emerald-700 font-bold">
                              {t("• क्यूआर सक्रिय", "• Active QR")}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-brand-maroon-950 block mt-0.5">
                          {primaryUpi}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(primaryUpi, "modal-upi-primary");
                        }}
                        className="p-1.5 rounded-lg bg-brand-cream-200 hover:bg-brand-cream-300 text-brand-maroon-900 transition flex-shrink-0"
                        title={t("यूपीआई कॉपी करें", "Copy UPI ID")}
                      >
                        {copiedField === "modal-upi-primary" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Secondary UPI: SBI / BHIM */}
                    <div
                      onClick={() => setSelectedUpiId(secondaryUpi)}
                      className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-2 text-left ${
                        selectedUpiId === secondaryUpi
                          ? "border-brand-saffron-500 bg-white shadow-xs ring-1 ring-brand-saffron-400"
                          : "border-brand-cream-300 bg-brand-cream-100/60 hover:bg-white"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-brand-maroon-800 bg-brand-cream-200 px-1.5 py-0.2 rounded">
                            {t("एसबीआई / भीम यूपीआई", "SBI / BHIM UPI")}
                          </span>
                          {selectedUpiId === secondaryUpi && (
                            <span className="text-[10px] text-emerald-700 font-bold">
                              {t("• क्यूआर सक्रिय", "• Active QR")}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-xs sm:text-sm font-bold text-brand-maroon-950 block mt-0.5">
                          {secondaryUpi}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(secondaryUpi, "modal-upi-secondary");
                        }}
                        className="p-1.5 rounded-lg bg-brand-cream-200 hover:bg-brand-cream-300 text-brand-maroon-900 transition flex-shrink-0"
                        title={t("यूपीआई कॉपी करें", "Copy UPI ID")}
                      >
                        {copiedField === "modal-upi-secondary" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(selectedUpiId, "modal-upi-active-btn")}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      {copiedField === "modal-upi-active-btn" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t("सक्रिय आईडी कॉपी हो गई!", "Active ID Copied!")}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-brand-gold-400" />
                          <span>{t(`सक्रिय आईडी (${selectedUpiId}) कॉपी करें`, `Copy Active ID (${selectedUpiId})`)}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={upiLink}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{t("सीधे UPI ऐप से भुगतान करें", "Pay directly via UPI App")}</span>
                    </a>
                  </div>

                  {/* Glowing Payment App Logos */}
                  <div className="pt-2 border-t border-brand-maroon-100/70">
                    <div className="text-[10px] font-bold text-brand-charcoal-600 uppercase tracking-wider mb-1.5 text-center sm:text-left flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-saffron-600" />
                      <span>{t("स्वीकृत यूपीआई ऐप्स (Accepted UPI Apps)", "Accepted UPI Payment Apps")}</span>
                    </div>
                    <PaymentAppBadges size="sm" className="justify-center sm:justify-start" />
                  </div>
                </div>
              </div>

              {/* Quick switch to receipt form */}
              <div className="p-3 bg-brand-cream-100 rounded-xl border border-brand-gold-300/60 flex items-center justify-between">
                <span className="text-xs text-brand-charcoal-700">
                  {t("भुगतान पूर्ण होने के बाद आधिकारिक रसीद दर्ज करें:", "After payment, submit details for donation receipt:")}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("receipt")}
                  className="px-3 py-1 rounded-lg bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                >
                  {t("रसीद फॉर्म भरें →", "Request Receipt →")}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Bank Transfer */}
          {activeTab === "bank" && Boolean(donationConfig?.accountNumber) && (
            <div className="space-y-4">
              {/* Notice Banner */}
              <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-amber-950 leading-snug">
                      {t(
                        "बैंक हस्तांतरण (NEFT/RTGS) विवरण एवं 80G रसीद हेतु कृपया सीधे हमारे कार्यालय फोन +91 91171 35379 पर संपर्क करें।",
                        "For Bank Transfer (NEFT/RTGS) details & 80G receipt, please contact our office helpline directly at +91 91171 35379."
                      )}
                    </h4>
                    <p className="text-[11px] text-amber-900 leading-relaxed font-normal">
                      {t(
                        "सुरक्षा, पारदर्शिता एवं विधिक सत्यापन के तहत ट्रस्ट खाता विवरण कार्यालय द्वारा अधिकृत संपर्क पर तुरंत उपलब्ध कराया जाता है।",
                        "For security and verification, trust bank details are promptly shared via authorized office communication."
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 pl-0 sm:pl-7">
                  <a
                    href="tel:+919117135379"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs shadow-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>{t("कार्यालय हेल्पलाइन: +91 91171 35379", "Office Helpline: +91 91171 35379")}</span>
                  </a>
                  <a
                    href={`https://wa.me/919117135379?text=${encodeURIComponent(
                      isEn
                        ? "Hello Shivshakti Seva Foundation, please share Bank Transfer (NEFT/RTGS) details and 80G receipt procedure."
                        : "नमस्ते शिवशक्ति सेवा फाउंडेशन, कृपया बैंक हस्तांतरण (NEFT/RTGS) विवरण एवं 80G रसीद प्रक्रिया साझा करें।"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition"
                  >
                    <span>{t("व्हाट्सएप पर विवरण प्राप्त करें", "Get Bank Details on WhatsApp")}</span>
                  </a>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-brand-cream-50 rounded-2xl border border-brand-maroon-100 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">{t("खातेदार का नाम:", "Account Name:")}</span>
                  <span className="font-bold text-brand-maroon-950">
                    {donationConfig?.accountName || "शिवशक्ति सेवा फाउंडेशन"}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">{t("बैंक का नाम:", "Bank Name:")}</span>
                  <span className="font-semibold text-brand-charcoal-800">
                    {donationConfig?.bankName || (isEn ? "State Bank of India / Airtel Payments Bank" : "भारतीय स्टेट बैंक (SBI) / एयरटेल पेमेंट्स बैंक")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">{t("खाता संख्या:", "Account Number:")}</span>
                  {donationConfig?.accountNumber && !donationConfig.accountNumber.includes("XXXX") ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-maroon-950 text-sm">
                        {donationConfig.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(donationConfig.accountNumber, "modal-acc")
                        }
                        className="p-1.5 rounded-md hover:bg-brand-cream-200 text-brand-maroon-700 transition"
                        title={t("खाता संख्या कॉपी करें", "Copy Account Number")}
                      >
                        {copiedField === "modal-acc" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-brand-maroon-900 bg-brand-cream-200/80 px-2.5 py-1 rounded">
                      {t("कार्यालय संपर्क द्वारा सत्यापन पश्चात उपलब्ध (+91 91171 35379)", "Available upon office verification (+91 91171 35379)")}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-brand-cream-200">
                  <span className="text-brand-charcoal-500 font-medium">{t("आईएफएससी कोड:", "IFSC Code:")}</span>
                  {donationConfig?.ifscCode && !donationConfig.ifscCode.includes("XXXX") ? (
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-maroon-950 text-sm">
                        {donationConfig.ifscCode}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(donationConfig.ifscCode, "modal-ifsc")
                        }
                        className="p-1.5 rounded-md hover:bg-brand-cream-200 text-brand-maroon-700 transition"
                        title={t("IFSC कॉपी करें", "Copy IFSC")}
                      >
                        {copiedField === "modal-ifsc" ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs font-medium text-brand-charcoal-700">
                      SBIN / AIRP (Verified on Request)
                    </span>
                  )}
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-brand-charcoal-500 font-medium">{t("शाखा:", "Branch:")}</span>
                  <span className="font-medium text-brand-charcoal-800">
                    {donationConfig?.branch || (isEn ? "Main Branch, Bihar" : "मुख्य शाखा, बिहार")}
                  </span>
                </div>
              </div>

              {/* Quick switch to receipt form */}
              <div className="p-3 bg-brand-cream-100 rounded-xl border border-brand-gold-300/60 flex items-center justify-between">
                <span className="text-xs text-brand-charcoal-700">
                  {t("बैंक ट्रांसफर के बाद विवरण दर्ज करें:", "After Bank Transfer, request receipt:")}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("receipt")}
                  className="px-3 py-1 rounded-lg bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                >
                  {t("रसीद फॉर्म भरें →", "Request Receipt →")}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: DONOR DETAILS & RECEIPT FORM */}
          {activeTab === "receipt" && (
            <div className="space-y-4">
              {receiptSubmitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-center space-y-3 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-heading text-lg font-bold text-emerald-950">
                    {t("सहयोग विवरण सफलतापूर्वक दर्ज हुआ!", "Donation Details Submitted Successfully!")}
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                    {t(
                      `आदरणीय ${donorName} जी, शिवशक्ति सेवा कोष में ₹${effectiveAmount || "अंशदान"} के पावन सहयोग हेतु आपका कोटि-कोटि धन्यवाद। सत्यापन उपरांत डिजिटल रसीद आपके व्हाट्सएप/फोन पर प्रेषित कर दी जाएगी।`,
                      `Dear ${donorName}, thank you wholeheartedly for your noble contribution of ₹${effectiveAmount || "donation"} to the Shivshakti Seva Fund. Upon verification, your digital 80G receipt will be sent to your WhatsApp/email.`
                    )}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={getWhatsAppUrl(receiptWhatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 animate-pulse"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>{t("📤 अपना फ़ॉर्म फाउंडेशन को भेजें (Send on WhatsApp)", "📤 Send Details on WhatsApp")}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptSubmitted(false);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-maroon-900 text-white font-bold text-xs hover:bg-brand-maroon-950 transition shadow-sm"
                    >
                      {t("विंडो बंद करें", "Close Window")}
                    </button>
                  </div>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    {t(
                      "WhatsApp से भेजना आवश्यक है ताकि फाउंडेशन को आपका अनुरोध प्राप्त हो (+91 91171 35379)।",
                      "Sending via WhatsApp is required so our team directly receives and verifies your receipt request (+91 91171 35379)."
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReceiptSubmit} className="space-y-3.5">
                  {receiptError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{receiptError}</span>
                    </div>
                  )}
                  <div className="p-3 bg-brand-gold-50 rounded-xl border border-brand-gold-300 text-xs text-brand-maroon-900 leading-relaxed">
                    {t(
                      "कृपया अपने सहयोग का विवरण भरें ताकि संस्था आपके नाम से अधिकृत दान रसीद जारी कर सके।",
                      "Please provide your transaction details so our trust can issue your official 80G tax exemption receipt."
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        {t("दानदाता का पूरा नाम *", "Donor's Full Name *")}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder={t("उदा. राहुल कुमार शर्मा", "e.g. John Doe / Rajesh Sharma")}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        {t("मोबाइल / व्हाट्सएप नंबर *", "Mobile / WhatsApp Number *")}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder={t("१० अंकों का मोबाइल नंबर", "10-digit mobile number")}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        {t("यूटीआर / ट्रांजेक्शन संदर्भ (UTR Ref No.)", "UTR / Transaction Ref No.")}
                      </label>
                      <input
                        type="text"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder={t("उदा. 427819034251 (वैकल्पिक)", "e.g. 427819034251 (Optional)")}
                        className="w-full px-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        {t("शहर / जिला", "City / District")}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-brand-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={donorCity}
                          onChange={(e) => setDonorCity(e.target.value)}
                          placeholder={t("उदा. गया, बिहार", "e.g. Gaya, Bihar")}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-brand-maroon-200 text-xs sm:text-sm bg-brand-cream-50 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-maroon-950 mb-1">
                        {t("ईमेल पता (वैकल्पिक)", "Email Address (Optional)")}
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
                        {t("पैन नंबर (80G रसीद हेतु, वैकल्पिक)", "PAN Number (For 80G Receipt, Optional)")}
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
                      {isSubmitting
                        ? t("पंजीकरण दर्ज हो रहा है...", "Submitting details...")
                        : t("सहयोग विवरण एवं रसीद दर्ज करें", "Submit Donation Details & Request Receipt")}
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
              <span>{t("पारदर्शी एवं सुरक्षित हस्तांतरण", "Transparent & Secure Transactions")}</span>
            </div>
            <p className="text-[11px] text-brand-charcoal-600 leading-relaxed">
              {t(
                "सहयोग के उपरांत डिजिटल रसीद प्राप्त करने हेतु सीधे हमारे हेल्पलाइन नंबर पर व्हाट्सएप भी कर सकते हैं।",
                "After contributing, you can also directly WhatsApp our helpline (+91 91171 35379) for instant verification and receipt."
              )}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-brand-cream-100 border-t border-brand-maroon-200 flex items-center justify-between">
          <span className="text-[11px] text-brand-charcoal-600 font-medium hidden sm:inline">
            {t("शिवशक्ति सेवा फाउंडेशन • गैर-लाभकारी संस्था", "Shivshakti Seva Foundation • Non-Profit Organization")}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-maroon-800 text-white font-bold text-xs hover:bg-brand-maroon-900 transition shadow-sm ml-auto active:scale-95"
          >
            {t("बंद करें", "Close")}
          </button>
        </div>
      </div>
    </div>
  );

  return <ModalPortal>{modalContent}</ModalPortal>;
}
