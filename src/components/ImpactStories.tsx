"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, MapPin, ArrowRight, X, HeartHandshake } from "lucide-react";
import { ImpactStory } from "@/data/foundationData";
import TraditionalDivider from "./TraditionalDivider";
import ModalPortal from "./ModalPortal";
import { useLanguage } from "@/context/LanguageContext";

interface ImpactStoriesProps {
  stories: ImpactStory[];
  onOpenDonation?: () => void;
}

const englishStoriesData: Record<
  string,
  {
    title: string;
    category: string;
    location: string;
    quote: string;
    summary: string;
    fullStory: string;
  }
> = {
  "story-1": {
    title: "When Floods Swept Away Everything, Shivshakti Seva Stood Beside Us",
    category: "Disaster Relief",
    location: "Flood-Affected Lowlands, Bihar",
    quote: "When water surrounded us on all sides without a grain to eat, foundation volunteers reached our roof with food and tarpaulins by boat.",
    summary:
      "Ramprasad ji's home collapsed during sudden night flooding. The Foundation not only provided emergency rations but also supplied construction materials to rebuild.",
    fullStory:
      "A sudden embankment breach inundated the village at midnight. Ramprasad ji evacuated his family to elevated ground. By dawn, volunteers from Shivshakti Seva Foundation navigated boats across turbulent waters with cooked food, clean water, and waterproof tarpaulins. Later, when floodwaters receded, technical volunteers helped rebuild the family's dwelling.",
  },
  "story-2": {
    title: "Giving Wings to Little Priya's Educational Dreams",
    category: "Child Education",
    location: "Rural Learning Center, Bihar",
    quote: "Receiving new books and my school bag made me so happy. Now I go to school every day and dream of becoming a teacher.",
    summary:
      "Facing extreme poverty, 9-year-old Priya was on the verge of dropping out. The Foundation provided textbooks, uniform, tuition fee support, and enrolled her in our evening study center.",
    fullStory:
      "Priya's father is a daily wage earner who fell critically ill and could no longer work. Facing hunger, schooling was unaffordable for the family. Our village survey team identified Priya and immediately arranged free textbooks, stationery, uniform, and school bags, enabling her to resume her education with dignity.",
  },
  "story-3": {
    title: "Finding Family and Warmth in Her Golden Years: Kamla Devi",
    category: "Elderly Care",
    location: "Urban Underserved Settlement, Bihar",
    quote: "In my old age, there was no one to ask after me. These children from the Foundation visit me every week with medicine. I now know I have a family.",
    summary:
      "78-year-old Kamla Devi lived alone and destitute. Foundation volunteers regularly provide her monthly groceries, health care, and emotional companionship.",
    fullStory:
      "Kamla Devi had no surviving family members. Age-related ailments and cataracts left her unable to cook or manage daily chores. Volunteers arranged free medical treatment, prescribed medication, and now deliver monthly nutritious rations to her doorstep alongside warm companionship.",
  },
};

export default function ImpactStories({ stories = [], onOpenDonation }: ImpactStoriesProps) {
  const { isEn, t } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);

  useEffect(() => {
    if (!selectedStory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStory(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStory]);

  const getStoryTitle = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].title : s.title;
  const getStoryCategory = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].category : s.category;
  const getStoryLocation = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].location : s.location;
  const getStoryQuote = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].quote : s.quote;
  const getStorySummary = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].summary : s.summary;
  const getStoryFull = (s: ImpactStory) =>
    isEn && englishStoriesData[s.id] ? englishStoriesData[s.id].fullStory : s.fullStory;

  return (
    <section
      id="hamara-prabhav"
      className="py-16 sm:py-24 bg-white border-b border-brand-maroon-100"
      aria-label={t("प्रभाव एवं सेवा की कहानियाँ", "Impact & Real Life Stories")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-cream-200 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
            <span>{t("आशा और आत्मबल", "Hope & Resilience")}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            {t("सेवा की कहानियाँ", "Stories of Impact")}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            {t(
              "जब संकट में घिरा कोई परिवार हिम्मत हारने लगता है, तब आपका सहयोग उनके लिए एक नया सवेरा बनकर आता है।",
              "When a family facing distress begins to lose hope, your compassionate contribution arrives like a radiant dawn."
            )}
          </p>
          <TraditionalDivider color="gold" variant="diya" className="mt-2" />
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(stories || []).map((story) => (
            <div
              key={story.id}
              className="group bg-brand-cream-50/70 rounded-2xl overflow-hidden border border-brand-maroon-100/90 hover:border-brand-gold-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Dignified Image */}
                <div className="relative h-56 w-full overflow-hidden bg-brand-cream-200">
                  <Image
                    src={story.image}
                    alt={getStoryTitle(story)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-brand-maroon-900/90 text-brand-gold-300 text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-sm border border-brand-gold-500/30">
                    {getStoryCategory(story)}
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-xs flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-brand-saffron-400" />
                    <span>{getStoryLocation(story)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="font-heading text-xl font-bold text-brand-maroon-950 group-hover:text-brand-saffron-600 transition-colors line-clamp-2 leading-snug">
                    {getStoryTitle(story)}
                  </h3>

                  <div className="relative pl-6 border-l-2 border-brand-gold-500/70 py-1">
                    <Quote className="w-4 h-4 text-brand-gold-600 absolute left-1 top-0 opacity-70" />
                    <p className="text-xs sm:text-sm italic text-brand-charcoal-700 leading-snug font-medium">
                      "{getStoryQuote(story)}"
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-charcoal-600 leading-relaxed line-clamp-3">
                    {getStorySummary(story)}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-brand-maroon-900 text-brand-maroon-900 hover:text-white border border-brand-maroon-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <span>{t("पूरी कहानी पढ़ें", "Read Full Story")}</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold-500 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Full Modal */}
      {selectedStory && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedStory(null)}
          >
            <div
              className="modal-card-after-topbar bg-white max-w-xl w-full rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-brand-gold-400/50 overflow-hidden flex flex-col animate-scaleIn my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 sm:h-64 w-full bg-brand-cream-200 flex-shrink-0">
                <Image
                  src={selectedStory.image}
                  alt={getStoryTitle(selectedStory)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-maroon-950/95 via-brand-maroon-950/40 to-black/40" />
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/30 shadow-lg backdrop-blur-md transition z-10"
                  aria-label={t("कहानी बंद करें", "Close Story Dialog")}
                >
                  <span>{t("बंद करें", "Close")}</span>
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] sm:text-xs text-brand-gold-300 font-bold uppercase tracking-wider">
                    {getStoryCategory(selectedStory)} • {getStoryLocation(selectedStory)}
                  </span>
                  <h3
                    id="story-modal-title"
                    className="font-heading text-lg sm:text-2xl font-bold leading-snug mt-1"
                  >
                    {getStoryTitle(selectedStory)}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-brand-charcoal-800 text-sm leading-relaxed">
                <div className="p-3.5 sm:p-4 rounded-xl bg-brand-cream-100 border-l-4 border-brand-gold-500 italic text-brand-maroon-950 font-medium">
                  "{getStoryQuote(selectedStory)}"
                </div>

                <div className="space-y-3 font-normal text-sm sm:text-base text-brand-charcoal-700 leading-relaxed">
                  <p>{getStoryFull(selectedStory)}</p>
                </div>

                <div className="p-3 rounded-lg bg-brand-cream-50 border border-brand-cream-300 text-xs text-brand-charcoal-600 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-brand-saffron-600 flex-shrink-0" />
                  <span>
                    {t(
                      "इस परिवार को यह सहायता जन-सहयोग द्वारा उपलब्ध कराई गई।",
                      "This aid was made possible through the generosity of kind citizens like you."
                    )}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-brand-cream-50 border-t border-brand-maroon-100 flex items-center justify-between">
                <a
                  href="#sahyog-dan"
                  onClick={() => {
                    setSelectedStory(null);
                    if (onOpenDonation) onOpenDonation();
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-brand-saffron-600 hover:bg-brand-saffron-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>{t("इस सेवा में सहयोग दें", "Support this Cause")}</span>
                </a>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-brand-maroon-800 text-white font-semibold text-xs hover:bg-brand-maroon-900 transition"
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
