"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ZoomIn, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryPhoto } from "@/data/foundationData";
import TraditionalDivider from "./TraditionalDivider";
import RangoliCorner from "./RangoliCorner";
import ModalPortal from "./ModalPortal";
import { useLanguage } from "@/context/LanguageContext";

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
}

export default function PhotoGallery({ photos = [] }: PhotoGalleryProps) {
  const { isEn, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const categories = [
    { id: "all", name: t("सभी चित्र", "All Photos") },
    { id: "relief", name: t("राहत एवं बाढ़ सहायता", "Disaster Relief") },
    { id: "food", name: t("भोजन वितरण", "Food Distribution") },
    { id: "education", name: t("शिक्षा एवं बच्चे", "Education & Children") },
    { id: "health", name: t("स्वास्थ्य शिविर", "Medical Camps") },
    { id: "elderly", name: t("वृद्ध सहायता", "Elderly Care") },
    { id: "women", name: t("महिला कल्याण", "Women Empowerment") },
    { id: "volunteers", name: t("स्वयंसेवक एवं समुदाय", "Volunteers & Community") },
  ];

  const safePhotos = photos || [];
  const filteredPhotos =
    activeCategory === "all"
      ? safePhotos
      : safePhotos.filter((p) => p.category === activeCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (activePhotoIndex !== null && filteredPhotos.length > 0) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    if (activePhotoIndex !== null && filteredPhotos.length > 0) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, closeLightbox, nextPhoto, prevPhoto]);

  return (
    <section
      id="chitra-deergha"
      className="py-16 sm:py-24 bg-brand-cream-50 bg-pattern-mandala border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label={t("चित्र दीर्घा", "Photo Gallery")}
    >
      {/* Background Indian Rangoli / Kolam Diagonal Motifs (Desktop Only, Zero Text Overlap) */}
      <RangoliCorner position="top-right" size={360} opacity={0.065} className="hidden lg:block" />
      <RangoliCorner position="bottom-left" size={360} opacity={0.065} className="hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>{t("जमीनी सेवा की झलकियाँ", "Glimpses of Grassroots Action")}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            {t("चित्र दीर्घा", "Photo Gallery")}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            {t(
              "प्रत्येक तस्वीर मानवीय संवेदना, निःस्वार्थ सेवा और उम्मीद के पुनः जागृत होने की सजीव गवाह है।",
              "Each photograph is living testimony to compassion, selfless service, and rekindled hope across our communities."
            )}
          </p>
          <TraditionalDivider color="gold" variant="lotus" className="mt-2" />
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-maroon-800 text-white shadow-md"
                  : "bg-white text-brand-charcoal-700 hover:bg-brand-cream-200 border border-brand-cream-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer bg-brand-cream-200 shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-maroon-100"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-950/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Zoom icon badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-brand-gold-300 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[11px] font-bold text-brand-gold-400 bg-brand-maroon-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                  {photo.categoryName}
                </span>
                <h3 className="font-heading text-base font-bold leading-snug line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-brand-cream-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-brand-saffron-400 flex-shrink-0" />
                  <span>{photo.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar p-3 sm:p-5 bg-black/95 backdrop-blur-md animate-fadeIn"
            onClick={closeLightbox}
            onTouchStart={(e) => setTouchStartX(e.changedTouches[0].screenX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const touchEndX = e.changedTouches[0].screenX;
              if (touchStartX - touchEndX > 50) nextPhoto();
              if (touchEndX - touchStartX > 50) prevPhoto();
              setTouchStartX(null);
            }}
          >
            <div
              className="relative max-w-4xl w-full bg-brand-maroon-950 text-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-maroon-800 modal-card-after-topbar flex flex-col animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dedicated Top Bar with Counter & Clear Close Button */}
              <div className="p-3 sm:p-4 bg-brand-maroon-950 border-b border-brand-maroon-800/80 flex items-center justify-between z-30 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-brand-gold-300">
                    {t("छायाचित्र दीर्घा", "Photo Gallery")} • {activePhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
                <button
                  onClick={closeLightbox}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 active:scale-95 cursor-pointer"
                  aria-label={t("दीर्घा बंद करें", "Close Gallery")}
                >
                  <span>{t("बंद करें", "Close")}</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-brand-maroon-800 text-white transition shadow-md"
                aria-label={t("पिछला चित्र", "Previous photo")}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-brand-maroon-800 text-white transition shadow-md"
                aria-label={t("अगला चित्र", "Next photo")}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image display */}
              <div className="relative h-64 sm:h-[420px] lg:h-[460px] w-full bg-black flex-1 min-h-[220px]">
                <Image
                  src={filteredPhotos[activePhotoIndex].imageUrl}
                  alt={filteredPhotos[activePhotoIndex].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Caption bar */}
              <div className="p-4 sm:p-5 bg-brand-maroon-950 border-t border-brand-maroon-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-2 text-xs text-brand-gold-400 font-semibold mb-1">
                    <span>{filteredPhotos[activePhotoIndex].categoryName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-saffron-400" />
                      {filteredPhotos[activePhotoIndex].location}
                    </span>
                  </div>
                  <h4 className="font-heading text-base sm:text-lg font-bold text-brand-cream-50">
                    {filteredPhotos[activePhotoIndex].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-cream-300 mt-0.5 line-clamp-2">
                    {filteredPhotos[activePhotoIndex].caption}
                  </p>
                </div>

                <div className="text-xs text-brand-cream-400 text-right flex-shrink-0">
                  {t(
                    `चित्र ${activePhotoIndex + 1} / ${filteredPhotos.length}`,
                    `Photo ${activePhotoIndex + 1} of ${filteredPhotos.length}`
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
