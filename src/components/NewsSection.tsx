"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Tag, ArrowRight, X, Sparkles, Share2, Eye } from "lucide-react";
import { NewsItem } from "@/data/foundationData";
import TraditionalDivider from "./TraditionalDivider";

interface NewsSectionProps {
  news: NewsItem[];
}

function getNewsImage(item: NewsItem): string {
  const cat = (item.category || "").toLowerCase();
  const title = (item.title || "").toLowerCase();
  if (cat.includes("स्वास्थ्य") || title.includes("शिविर") || title.includes("नेत्र")) {
    return "/images/gallery/healthcare_camp.jpg";
  }
  if (cat.includes("राहत") || cat.includes("बाढ़") || title.includes("आपदा")) {
    return "/images/gallery/flood_relief_action.jpg";
  }
  if (cat.includes("महिला") || title.includes("सिलाई") || title.includes("स्वावलंबन")) {
    return "/images/gallery/women_support.jpg";
  }
  if (cat.includes("शिक्षा") || title.includes("बच्चे")) {
    return "/images/gallery/education_support.jpg";
  }
  return "/images/gallery/ration_kits.jpg";
}

export default function NewsSection({ news }: NewsSectionProps) {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", name: "सभी समाचार" },
    { id: "राहत अभियान", name: "राहत अभियान" },
    { id: "स्वास्थ्य शिविर", name: "स्वास्थ्य शिविर" },
    { id: "संस्था गतिविधियाँ", name: "संस्था गतिविधियाँ" },
  ];

  const filteredNews =
    activeFilter === "all"
      ? news
      : news.filter((item) =>
          item.category.includes(activeFilter) || item.title.includes(activeFilter)
        );

  const handleShare = (item: NewsItem) => {
    const text = `शिवशक्ति सेवा फाउंडेशन — ${item.title}\n${item.summary}\nअधिक जानकारी हेतु: ${typeof window !== "undefined" ? window.location.href : ""}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: item.title, text }).catch(() => {});
    } else if (typeof window !== "undefined") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <section
      id="samachar"
      className="py-16 sm:py-24 bg-brand-cream-50/80 border-b border-brand-maroon-100"
      aria-label="समाचार एवं गतिविधियाँ"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>गतिविधियाँ एवं सूचनाएं</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            समाचार एवं गतिविधियाँ
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            संस्था के नवीनतम सेवा अभियानों, स्वास्थ्य शिविरों और सामाजिक
            जागरूकता कार्यक्रमों की अद्यतन जानकारी।
          </p>
          <TraditionalDivider color="gold" variant="lotus" className="mt-2" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === cat.id
                  ? "bg-brand-maroon-800 text-white shadow-md"
                  : "bg-white text-brand-charcoal-700 hover:bg-brand-cream-200 border border-brand-cream-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* News Cards Grid with Rich Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredNews.map((item) => {
            const imgPath = getNewsImage(item);
            return (
              <article
                key={item.id}
                className="group bg-white rounded-2xl border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-brand-cream-200">
                    <Image
                      src={imgPath}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-maroon-900/90 backdrop-blur-sm text-brand-gold-300 px-2.5 py-0.5 rounded text-[11px] font-bold border border-brand-gold-500/30">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-white text-xs flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-saffron-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-brand-charcoal-600 leading-relaxed line-clamp-3 font-normal">
                      {item.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 border-t border-brand-cream-200/80 flex items-center justify-between mt-2">
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-xs font-bold text-brand-maroon-800 hover:text-brand-saffron-600 flex items-center gap-1 transition"
                  >
                    <span>विस्तृत समाचार पढ़ें</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold-500 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleShare(item)}
                    className="p-1.5 rounded-lg text-brand-charcoal-400 hover:text-brand-saffron-600 hover:bg-brand-cream-100 transition"
                    title="समाचार साझा करें"
                    aria-label="समाचार साझा करें"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* News Full Modal with Scale-In Animation */}
      {selectedNews && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white max-w-xl w-full rounded-3xl shadow-2xl border-2 border-brand-gold-400/50 overflow-hidden flex flex-col max-h-[85vh] animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-gradient-to-r from-brand-maroon-950 to-brand-maroon-900 text-white flex items-center justify-between border-b border-brand-gold-500/30">
              <div>
                <span className="text-xs text-brand-gold-400 font-semibold">
                  {selectedNews.category} • {selectedNews.date}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-cream-50 mt-1">
                  {selectedNews.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-1.5 rounded-lg text-brand-cream-300 hover:text-white hover:bg-brand-maroon-800 transition"
                aria-label="बंद करें"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-brand-charcoal-800 text-sm leading-relaxed">
              <p className="text-base font-normal leading-relaxed">{selectedNews.fullContent}</p>
              <div className="p-4 bg-brand-cream-100 rounded-xl text-xs text-brand-charcoal-700 border border-brand-cream-300">
                स्थान एवं आगामी सेवा शिविर में सहयोग हेतु हमारे केंद्रीय हेल्पलाइन नंबर <strong className="text-brand-maroon-900">+91 91171 35379</strong> पर संपर्क करें।
              </div>
            </div>

            <div className="p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex items-center justify-between">
              <button
                onClick={() => handleShare(selectedNews)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <Share2 className="w-4 h-4" />
                <span>व्हाट्सएप पर साझा करें</span>
              </button>
              <button
                onClick={() => setSelectedNews(null)}
                className="px-5 py-2 rounded-xl bg-brand-maroon-800 text-white font-bold text-xs hover:bg-brand-maroon-900 transition"
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
