"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  FileText,
  Download,
  CheckCircle,
  Building,
  Info,
  ExternalLink,
  X,
  Phone,
  Mail,
  MessageCircle,
  Eye,
  Building2,
} from "lucide-react";
import RangoliCorner from "./RangoliCorner";
import ModalPortal from "./ModalPortal";

interface TransparencyDoc {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  note: string;
  status: "उपलब्ध (सार्वजनिक PDF)" | "सत्यापित अनुरोध पर उपलब्ध";
  pdfUrl?: string;
  description: string;
}

export default function TransparencySection() {
  const [selectedDoc, setSelectedDoc] = useState<TransparencyDoc | null>(null);

  const reports: TransparencyDoc[] = [
    {
      id: "mandate",
      title: "संस्था पंजीकरण, ट्रस्ट डीड एवं विधिक घोषणा सारांश (२०२६)",
      type: "वैधानिक अभिलेख (PDF)",
      size: "१५ केबी",
      date: "२०२६ अधिकृत",
      note: "सार्वजनिक सत्यापन हेतु प्रमाणित सारांश",
      status: "उपलब्ध (सार्वजनिक PDF)",
      pdfUrl: "/docs/shivshakti_seva_foundation_mandate_2026.pdf",
      description:
        "शिवशक्ति सेवा फाउंडेशन का आधिकारिक विधिक स्वरूप, पंजीकृत कार्यालय, मुख्य न्यास उद्देश्य, 80G आयकर विधिक स्थिति एवं सार्वजनिक पारदर्शिता घोषणा पत्र।",
    },
    {
      id: "annual-report",
      title: "वार्षिक सेवा एवं गतिविधि सारांश रिपोर्ट (२०२५-२६)",
      type: "वार्षिक सेवा अभिलेख",
      size: "२.४ एमबी",
      date: "मार्च २०२६",
      note: "संस्था द्वारा अधिकृत एवं सत्यापित प्रारूप",
      status: "सत्यापित अनुरोध पर उपलब्ध",
      description:
        "विगत वित्तीय वर्ष में संस्था द्वारा संचालित राहत शिविर, भोजन व राशन किट वितरण, स्वास्थ्य शिविर एवं बाल शिक्षा सहायता अभियानों की संकलित रिपोर्ट।",
    },
    {
      id: "relief-audit",
      title: "बाढ़ राहत एवं पुनर्वास व्यय पारदर्शिता पत्रक",
      type: "ऑडिट व्यय विवरण",
      size: "१.८ एमबी",
      date: "सितंबर २०२६",
      note: "जमीनी राहत सामग्री क्रय एवं वितरण विवरण",
      status: "सत्यापित अनुरोध पर उपलब्ध",
      description:
        "आपदा प्रभावित क्षेत्रों में तिरपाल, सूखा राशन किट, दवाइयों एवं नाव रेस्क्यू पर हुए वास्तविक व्यय का वाउचर व लाभार्थी आधारित लेखा विवरण।",
    },
  ];

  // Close modal on escape
  useEffect(() => {
    if (!selectedDoc) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedDoc(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDoc]);

  return (
    <section
      id="transparency"
      className="py-16 sm:py-24 bg-white border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label="पारदर्शिता एवं उत्तरदायित्व"
    >
      {/* Background Indian Rangoli / Kolam Diagonal Motifs (Desktop Only, Zero Text Overlap) */}
      <RangoliCorner position="top-right" size={360} opacity={0.065} className="hidden lg:block" />
      <RangoliCorner position="bottom-left" size={360} opacity={0.065} className="hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>विश्वास और सत्यनिष्ठा</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            पारदर्शिता और उत्तरदायित्व
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            शिवशक्ति सेवा फाउंडेशन में हम मानते हैं कि जन-सहयोग केवल धन नहीं,
            बल्कि एक पावन अमानत है जिसकी पाई-पाई का हिसाब समाज के समक्ष प्रस्तुत
            होना चाहिए।
          </p>
          <div className="w-16 h-1 bg-brand-gold-500 mx-auto rounded-full mt-2" />
        </div>

        {/* 3 Pillars of Transparency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-brand-cream-50 border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-maroon-200 group-hover:bg-brand-cream-200 flex items-center justify-center transition-colors">
              <ShieldCheck className="w-6 h-6 text-brand-maroon-800" />
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors">
              प्रत्यक्ष सेवा उपयोग संकल्प
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed font-normal">
              राहत एवं सेवा कार्यों हेतु प्राप्त दान राशि का अधिकतम भाग सीधे
              राशन, दवाइयों, तिरपाल और शिक्षा सामग्री के क्रय में उपयोग किया
              जाता है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-cream-50 border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-maroon-200 group-hover:bg-brand-cream-200 flex items-center justify-center transition-colors">
              <Building className="w-6 h-6 text-brand-saffron-600" />
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors">
              वार्षिक वित्तीय लेखापरीक्षण (ऑडिट)
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed font-normal">
              संस्था के सभी खातों का संचालन स्वतंत्र चार्टर्ड अकाउंटेंट द्वारा
              ऑडिट किया जाता है और रिपोर्ट समय-समय पर सार्वजनिक की जाती है।
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-cream-50 border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-white border border-brand-maroon-200 group-hover:bg-brand-cream-200 flex items-center justify-center transition-colors">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors">
              सत्यापित जमीनी लाभार्थी सूची
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed font-normal">
              सामग्री वितरण के समय प्रत्येक लाभार्थी परिवार का ब्यौरा दर्ज किया
              जाता है ताकि किसी भी प्रकार के दोहराव अथवा अपव्यय से बचा जा सके।
            </p>
          </div>
        </div>

        {/* Visual Fund Utilization Bar */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white border border-brand-maroon-100 shadow-md mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="font-heading text-base sm:text-lg font-bold text-brand-maroon-950">
              निधि उपयोग अनुपात (प्रति ₹१०० सहयोग का वितरण)
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block w-fit">
              १००% पारदर्शी प्रबंधन
            </span>
          </div>

          {/* Segmented bar */}
          <div className="w-full h-4 rounded-full overflow-hidden flex bg-brand-cream-200 p-0.5 border border-brand-maroon-100 shadow-inner">
            <div className="bg-emerald-600 h-full rounded-l-full" style={{ width: "85%" }} title="85% प्रत्यक्ष राहत" />
            <div className="bg-brand-saffron-500 h-full" style={{ width: "10%" }} title="10% जमीनी व्यवस्था" />
            <div className="bg-brand-gold-500 h-full rounded-r-full" style={{ width: "5%" }} title="5% प्रशासनिक" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs font-medium text-brand-charcoal-700">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-600 flex-shrink-0" />
              <span><strong>८५%</strong> प्रत्यक्ष सेवा एवं राहत सामग्री</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-saffron-500 flex-shrink-0" />
              <span><strong>१०%</strong> परिवहन, भंडारण एवं फील्ड लॉजिस्टिक्स</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-gold-500 flex-shrink-0" />
              <span><strong>५%</strong> प्रशासनिक एवं वैधानिक संधारण</span>
            </div>
          </div>
        </div>

        {/* Public Reports & Download / Request Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream-100/70 border border-brand-maroon-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-maroon-950">
                सार्वजनिक रिपोर्ट एवं विधिक दस्तावेज
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-600">
                संस्था की कार्यप्रणाली, विधिक स्वरूप और वैधानिक विवरण की अधिकृत प्रतियां
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-maroon-800 bg-white px-3 py-1.5 rounded-lg border border-brand-cream-300">
              <Info className="w-4 h-4 text-brand-gold-600" />
              <span>संस्था द्वारा अधिकृत सार्वजनिक अभिलेख</span>
            </div>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-xl bg-white border border-brand-maroon-100/70 hover:border-brand-gold-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-maroon-50 text-brand-maroon-800 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-sm sm:text-base text-brand-maroon-950">
                        {report.title}
                      </h4>
                      {report.pdfUrl && (
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                          PDF उपलब्ध
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-brand-charcoal-500 mt-0.5">
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                      <span>•</span>
                      <span className="text-brand-saffron-600 font-medium">
                        {report.note}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {report.pdfUrl && (
                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-xs"
                      title="आधिकारिक पीडीएफ दस्तावेज सीधे खोलें"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF डाउनलोड</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedDoc(report)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-brand-cream-100 hover:bg-brand-maroon-900 text-brand-maroon-900 hover:text-white border border-brand-maroon-200 text-xs font-bold transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>दस्तावेज देखें / अनुरोध करें</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Transparency & Document Verification Modal */}
      {selectedDoc && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-maroon-950/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedDoc(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-brand-gold-400 space-y-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-brand-cream-100 text-brand-charcoal-400 hover:text-brand-maroon-900 transition cursor-pointer"
                aria-label="बंद करें"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-6">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand-saffron-100 text-brand-saffron-800 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-saffron-700" />
                  <span>आधिकारिक विधिक एवं पारदर्शिता अभिलेख</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-brand-maroon-950 leading-snug">
                  {selectedDoc.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed">
                  {selectedDoc.description}
                </p>
              </div>

              {/* Official Trust Registration Information Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-cream-50 border border-brand-maroon-100 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-brand-cream-200">
                  <Building2 className="w-4 h-4 text-brand-maroon-800" />
                  <span className="font-heading text-xs sm:text-sm font-bold text-brand-maroon-950">
                    शिवशक्ति सेवा फाउंडेशन — अधिकृत विधिक विवरण
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-brand-charcoal-500 block">संस्था का नाम:</span>
                    <strong className="text-brand-maroon-950">शिवशक्ति सेवा फाउंडेशन</strong>
                  </div>

                  <div>
                    <span className="text-brand-charcoal-500 block">विधिक स्वरूप:</span>
                    <strong className="text-brand-charcoal-800">पंजीकृत सामाजिक सेवा न्यास</strong>
                  </div>

                  <div>
                    <span className="text-brand-charcoal-500 block">पंजीकृत मुख्य कार्यालय:</span>
                    <span className="text-brand-charcoal-800 font-medium">
                      माँ मंगलागौरी, गया जी (बिहार) - 823001
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-charcoal-500 block">आयकर अधिनियम 80G स्थिति:</span>
                    <span className="text-amber-800 font-semibold">
                      80G आयकर छूट प्रमाण पत्र विधिक प्रक्रियाधीन
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-charcoal-500 block">अधिकृत हेल्पलाइन:</span>
                    <a href="tel:+919117135379" className="font-sans font-bold text-brand-maroon-900 hover:underline">
                      +91 91171 35379 (24×7)
                    </a>
                  </div>

                  <div>
                    <span className="text-brand-charcoal-500 block">अधिकृत ईमेल:</span>
                    <a href="mailto:akashgiri91171@gmail.com" className="font-sans font-semibold text-brand-maroon-900 hover:underline">
                      akashgiri91171@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="space-y-3 pt-1">
                {selectedDoc.pdfUrl ? (
                  <div className="space-y-2">
                    <a
                      href={selectedDoc.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>आधिकारिक सारांश दस्तावेज खोलें व डाउनलोड करें (PDF)</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-[11px] text-center text-brand-charcoal-500">
                      संस्था द्वारा सार्वजनिक अवलोकन हेतु जारी अधिकृत सारांश प्रारूप
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Info className="w-4 h-4 text-amber-700" />
                      <span>दस्तावेज प्रतिलिपि उपलब्धता सूचना:</span>
                    </p>
                    <p className="leading-relaxed">
                      यह विस्तृत ऑडिट व गतिविधि अभिलेख न्यास के आंतरिक रिकॉर्ड एवं विधिक संधारण में सुरक्षित है। आप व्हाट्सएप या ईमेल के माध्यम से संस्था सचिव / अधिकृत अधिकारी से इसकी सत्यापित मुद्रित अथवा डिजिटल प्रतिलिपि सीधे प्राप्त कर सकते हैं।
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <a
                    href={`https://wa.me/919117135379?text=${encodeURIComponent(
                      `नमस्ते शिवशक्ति सेवा फाउंडेशन, मुझे संस्था के आधिकारिक दस्तावेज "${selectedDoc.title}" की प्रतिलिपि की आवश्यकता है। कृपया मार्गदर्शन करें।`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>व्हाट्सएप पर प्रतिलिपि मांगें</span>
                  </a>

                  <a
                    href={`mailto:akashgiri91171@gmail.com?subject=${encodeURIComponent(
                      `दस्तावेज प्रतिलिपि अनुरोध: ${selectedDoc.title}`
                    )}&body=${encodeURIComponent(
                      `नमस्ते शिवशक्ति सेवा फाउंडेशन,\n\nकृपया मुझे संस्था के अधिकृत दस्तावेज "${selectedDoc.title}" की सत्यापित प्रतिलिपि प्रेषित करने की कृपा करें।\n\nअनुरोधकर्ता का नाम:\nमोबाइल नंबर:\nउद्देश्य:`
                    )}`}
                    className="py-2.5 px-4 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-brand-gold-400" />
                    <span>ईमेल द्वारा अनुरोध भेजें</span>
                  </a>
                </div>

                <div className="pt-2 text-center">
                  <a
                    href="tel:+919117135379"
                    className="inline-flex items-center gap-1 text-xs text-brand-charcoal-600 hover:text-brand-maroon-900 font-medium transition"
                  >
                    <Phone className="w-3 h-3 text-brand-gold-600" />
                    <span>कार्यालय में सीधे बात करें: <strong>+91 91171 35379</strong></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
