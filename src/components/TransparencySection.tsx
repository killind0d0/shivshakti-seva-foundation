"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Download,
  CheckCircle,
  Building,
  Info,
  ExternalLink,
} from "lucide-react";
import RangoliCorner from "./RangoliCorner";

export default function TransparencySection() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const reports = [
    {
      title: "वार्षिक सेवा एवं गतिविधि सारांश रिपोर्ट (२०२५-२६)",
      type: "पीडीएफ दस्तावेज",
      size: "२.४ एमबी",
      date: "मार्च २०२६",
      note: "संस्था द्वारा अधिकृत एवं सत्यापित प्रारूप",
    },
    {
      title: "बाढ़ राहत एवं पुनर्वास व्यय पारदर्शिता पत्रक",
      type: "ऑडिट दस्तावेज",
      size: "१.८ एमबी",
      date: "सितंबर २०२६",
      note: "जमीनी राहत सामग्री क्रय एवं वितरण विवरण",
    },
    {
      title: "संस्था पंजीकरण, ट्रस्ट डीड एवं वैधानिक दस्तावेज",
      type: "सत्यापन अभिलेख",
      size: "३.१ एमबी",
      date: "वैधानिक",
      note: "सक्षम प्राधिकारी द्वारा अनुमोदित अभिलेख",
    },
  ];

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

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

        {/* Public Reports & Download Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream-100/70 border border-brand-maroon-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-brand-maroon-950">
                सार्वजनिक रिपोर्ट एवं विधिक दस्तावेज
              </h3>
              <p className="text-xs sm:text-sm text-brand-charcoal-600">
                संस्था की कार्यप्रणाली और वैधानिक विवरण की प्रतियां
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-maroon-800 bg-white px-3 py-1.5 rounded-lg border border-brand-cream-300">
              <Info className="w-4 h-4 text-brand-gold-600" />
              <span>संस्था द्वारा अधिकृत सार्वजनिक अभिलेख</span>
            </div>
          </div>

          {downloadSuccess && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>"{downloadSuccess}" दस्तावेज की प्रतिलिपि तैयार की गई है।</span>
            </div>
          )}

          <div className="space-y-3">
            {reports.map((report, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-brand-maroon-100/70 hover:border-brand-gold-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-brand-maroon-50 text-brand-maroon-800 flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-brand-maroon-950">
                      {report.title}
                    </h4>
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

                <button
                  onClick={() => handleDownload(report.title)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-cream-100 hover:bg-brand-maroon-800 text-brand-maroon-900 hover:text-white border border-brand-maroon-200 text-xs font-bold transition flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>डाउनलोड करें</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
