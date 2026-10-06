"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, ArrowRight, X, Share2 } from "lucide-react";
import { NewsItem } from "@/data/foundationData";
import TraditionalDivider from "./TraditionalDivider";
import ModalPortal from "./ModalPortal";
import { useLanguage } from "@/context/LanguageContext";

interface NewsSectionProps {
  news: NewsItem[];
}

const englishNewsData: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    summary: string;
    fullContent: string;
  }
> = {
  "news-1": {
    title: "Upcoming Sunday: Free Comprehensive Health & Medical Screening Camp in Rural Belts",
    date: "October 15, 2026",
    category: "Health Camp",
    summary:
      "Senior visiting physicians will conduct general health checkups, blood sugar and pressure screening, alongside free medicine distribution.",
    fullContent:
      "Shivshakti Seva Foundation is organizing an intensive rural health camp. Specialist practitioners will provide free health screenings, general diagnosis, and emergency medication. Patients requiring advanced diagnostics will be guided with secondary healthcare support.",
  },
  "news-2": {
    title: "Phase 2 of Flood Relief Mission Launched: 500 Additional Families Supported",
    date: "October 08, 2026",
    category: "Relief Mission",
    summary:
      "Distribution of tarpaulins, water-purifying chlorine tablets, and 1-month dry grocery kits completed across ten submerged villages.",
    fullContent:
      "As floodwaters stabilize, Phase 2 focusing on disease prevention and shelter rehabilitation has commenced. Our volunteer ground corps successfully delivered chlorine purification packs, mosquito nets, and dry food rations.",
  },
  "news-3": {
    title: "Child Education Support: 100 Children Enrolled with Free Study Materials",
    date: "September 28, 2026",
    category: "Education Mission",
    summary:
      "Meritorious students from underprivileged households equipped with complete textbooks, school bags, and learning kits for the academic year.",
    fullContent:
      "Under our community education outreach, 100 children from low-income settlements received school bags, notebooks, geometry boxes, and uniforms. Parents were also oriented on sustaining regular school attendance.",
  },
};

function getNewsImage(item: NewsItem): string {
  const cat = (item.category || "").toLowerCase();
  const title = (item.title || "").toLowerCase();
  if (cat.includes("स्वास्थ्य") || title.includes("शिविर") || title.includes("health")) {
    return "/images/gallery/healthcare_camp.jpg";
  }
  if (cat.includes("राहत") || cat.includes("बाढ़") || title.includes("आपदा") || title.includes("flood") || title.includes("relief")) {
    return "/images/gallery/flood_relief_action.jpg";
  }
  if (cat.includes("महिला") || title.includes("सिलाई") || title.includes("स्वावलंबन") || title.includes("women")) {
    return "/images/gallery/women_support.jpg";
  }
  if (cat.includes("शिक्षा") || title.includes("बच्चे") || title.includes("education")) {
    return "/images/gallery/education_support.jpg";
  }
  return "/images/gallery/ration_kits.jpg";
}

export default function NewsSection({ news = [] }: NewsSectionProps) {
  const { isEn, t } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", name: t("सभी समाचार", "All News") },
    { id: "राहत", name: t("राहत अभियान", "Relief Missions") },
    { id: "स्वास्थ्य", name: t("स्वास्थ्य शिविर", "Medical Camps") },
    { id: "शिक्षा", name: t("शिक्षा अभियान", "Education Drives") },
  ];

  const safeNews = news || [];
  const filteredNews =
    activeFilter === "all"
      ? safeNews
      : safeNews.filter(
          (item) =>
            item.category.includes(activeFilter) ||
            item.title.includes(activeFilter) ||
            (englishNewsData[item.id] &&
              (englishNewsData[item.id].category.toLowerCase().includes(activeFilter.toLowerCase()) ||
                englishNewsData[item.id].title.toLowerCase().includes(activeFilter.toLowerCase())))
        );

  const getNewsTitle = (item: NewsItem) =>
    isEn && englishNewsData[item.id] ? englishNewsData[item.id].title : item.title;
  const getNewsCategory = (item: NewsItem) =>
    isEn && englishNewsData[item.id] ? englishNewsData[item.id].category : item.category;
  const getNewsDate = (item: NewsItem) =>
    isEn && englishNewsData[item.id] ? englishNewsData[item.id].date : item.date;
  const getNewsSummary = (item: NewsItem) =>
    isEn && englishNewsData[item.id] ? englishNewsData[item.id].summary : item.summary;
  const getNewsContent = (item: NewsItem) =>
    isEn && englishNewsData[item.id] ? englishNewsData[item.id].fullContent : item.fullContent;

  const handleShare = (item: NewsItem) => {
    const title = getNewsTitle(item);
    const summary = getNewsSummary(item);
    const text = `${t("शिवशक्ति सेवा फाउंडेशन", "Shivshakti Seva Foundation")} — ${title}\n${summary}\n${typeof window !== "undefined" ? window.location.href : ""}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title, text }).catch(() => {});
    } else if (typeof window !== "undefined") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <section
      id="samachar"
      className="py-16 sm:py-24 bg-brand-cream-50/80 border-b border-brand-maroon-100"
      aria-label={t("समाचार एवं गतिविधियाँ", "News & Activities")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>{t("गतिविधियाँ एवं सूचनाएं", "Updates & Announcements")}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            {t("समाचार एवं गतिविधियाँ", "News & Activities")}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            {t(
              "संस्था के नवीनतम सेवा अभियानों, स्वास्थ्य शिविरों और सामाजिक जागरूकता कार्यक्रमों की अद्यतन जानकारी।",
              "Stay updated with our latest field initiatives, healthcare camps, and community development missions."
            )}
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
                      alt={getNewsTitle(item)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-maroon-900/90 backdrop-blur-sm text-brand-gold-300 px-2.5 py-0.5 rounded text-[11px] font-bold border border-brand-gold-500/30">
                        {getNewsCategory(item)}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-white text-xs flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-saffron-400" />
                      <span>{getNewsDate(item)}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-heading text-lg font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors leading-snug line-clamp-2">
                      {getNewsTitle(item)}
                    </h3>

                    <p className="text-sm text-brand-charcoal-600 leading-relaxed line-clamp-3 font-normal">
                      {getNewsSummary(item)}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-5 pt-0 border-t border-brand-cream-200/80 flex items-center justify-between mt-2">
                  <button
                    onClick={() => setSelectedNews(item)}
                    className="text-xs font-bold text-brand-maroon-800 hover:text-brand-saffron-600 flex items-center gap-1 transition"
                  >
                    <span>{t("विस्तृत समाचार पढ़ें", "Read Full Article")}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold-500 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => handleShare(item)}
                    className="p-1.5 rounded-lg text-brand-charcoal-400 hover:text-brand-saffron-600 hover:bg-brand-cream-100 transition"
                    title={t("समाचार साझा करें", "Share Article")}
                    aria-label={t("समाचार साझा करें", "Share Article")}
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
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedNews(null)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-xl w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-gold-400/50 overflow-hidden flex flex-col animate-scaleIn my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-5 bg-gradient-to-r from-brand-maroon-950 to-brand-maroon-900 text-white flex items-center justify-between border-b border-brand-gold-500/30 gap-3">
                <div>
                  <span className="text-xs text-brand-gold-400 font-semibold">
                    {getNewsCategory(selectedNews)} • {getNewsDate(selectedNews)}
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-cream-50 mt-1">
                    {getNewsTitle(selectedNews)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition border border-white/20 flex-shrink-0"
                  aria-label={t("बंद करें", "Close")}
                >
                  <span>{t("बंद करें", "Close")}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-brand-charcoal-800 text-sm leading-relaxed">
                <p className="text-sm sm:text-base font-normal leading-relaxed">{getNewsContent(selectedNews)}</p>
                <div className="p-4 bg-brand-cream-100 rounded-xl text-xs text-brand-charcoal-700 border border-brand-cream-300">
                  {t(
                    "स्थान एवं आगामी सेवा शिविर में सहयोग हेतु हमारे केंद्रीय हेल्पलाइन नंबर +91 91171 35379 पर संपर्क करें।",
                    "For location specifics and participating in upcoming relief camps, contact our central helpline at +91 91171 35379."
                  )}
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex items-center justify-between">
                <button
                  onClick={() => handleShare(selectedNews)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t("व्हाट्सएप पर साझा करें", "Share on WhatsApp")}</span>
                </button>
                <button
                  onClick={() => setSelectedNews(null)}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-brand-maroon-800 text-white font-bold text-xs hover:bg-brand-maroon-900 transition"
                >
                  {t("बंद करें", "Close")}
                </button>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
