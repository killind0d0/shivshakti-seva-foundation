"use client";

import React from "react";
import { Sparkles, Flag, Heart, Users, HeartPulse, Eye, Flame } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import TraditionalDivider from "./TraditionalDivider";
import RangoliCorner from "./RangoliCorner";
import { useLanguage } from "@/context/LanguageContext";

interface Milestone {
  year: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
}

const hindiMilestones: Milestone[] = [
  {
    year: "2024",
    title: "संस्था की स्थापना",
    detail:
      "गयाजी, बिहार (भारत) की पावन धरा से शिवशक्ति सेवा फाउंडेशन की सेवा यात्रा प्रारम्भ। निःस्वार्थ सेवा, करुणा और मानवता के संकल्प के साथ।",
    icon: <Flag className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "प्रथम बाढ़ राहत अभियान",
    detail:
      "तराई क्षेत्र में 500+ परिवारों तक राहत सामग्री, भोजन पैकेट एवं आवश्यक दवाइयाँ पहुँचाईं।",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "स्वावलंबन एवं कौशल कार्यशाला",
    detail:
      "ग्रामीण युवाओं एवं बहनों के लिए आत्मनिर्भरता, हस्तशिल्प एवं कौशल प्रशिक्षण कार्यक्रम प्रारम्भ।",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "10,000+ परिवारों तक सहायता",
    detail:
      "सत्यापित जमीनी रिकॉर्ड के अनुसार 10,000 से अधिक परिवारों को प्रत्यक्ष सहायता प्रदान की गई।",
    icon: <Users className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "50,000+ भोजन पैकेट वितरण",
    detail:
      "दैनिक भोजन वितरण अभियान के माध्यम से 50,000 से अधिक पौष्टिक भोजन पैकेट जरूरतमंदों तक पहुँचाए।",
    icon: <HeartPulse className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "पितृपक्ष विशेष सेवा एवं तर्पण",
    detail:
      "पितृपक्ष की पावन तिथि पर सभी जीव-जन्तु, पुण्य आत्माओं एवं प्राणियों के देवताओं हेतु विशेष पूजन, जल तर्पण एवं भोजन वितरण कार्यक्रम।",
    icon: <Flame className="w-5 h-5" />,
  },
];

const englishMilestones: Milestone[] = [
  {
    year: "2024",
    title: "Foundation Inception",
    detail:
      "Commencement of the sacred service journey of Shivshakti Seva Foundation from GayaJi, Bihar (India), dedicated to selfless service, compassion, and human dignity.",
    icon: <Flag className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "First Flood Relief Mission",
    detail:
      "Delivered emergency relief kits, food packages, and vital medicines to 500+ vulnerable families in flood-hit regions.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "Self-Reliance & Skill Workshops",
    detail:
      "Launched rural skill development, handicrafts, and employment initiatives empowering youth and women.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "10,000+ Families Supported",
    detail:
      "Reached over 10,000 families with direct humanitarian assistance and relief according to verified field records.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "50,000+ Nutritious Meals Served",
    detail:
      "Distributed more than 50,000 warm, nutritious meals to underprivileged citizens through daily food distribution campaigns.",
    icon: <HeartPulse className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "Pitri Paksha Special Seva & Tarpan",
    detail:
      "Organized sacred puja, water tarpan, and mass food distribution for all living beings, departed souls, and presiding deities during Pitri Paksha.",
    icon: <Flame className="w-5 h-5" />,
  },
];

function TimelineCard({
  milestone,
  index,
  isLast,
  isEn,
}: {
  milestone: Milestone;
  index: number;
  isLast: boolean;
  isEn: boolean;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Timeline Dot */}
      <div
        className={`absolute left-5 md:left-1/2 w-10 h-10 rounded-full border-3 border-brand-gold-500 bg-white shadow-lg flex items-center justify-center -translate-x-1/2 z-10 transition-all duration-700 ${
          isInView ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <span className="text-brand-saffron-600">{milestone.icon}</span>
      </div>

      {/* Content Card */}
      <div
        className={`ml-10 sm:ml-12 md:ml-0 w-[calc(100%-2.5rem)] sm:w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] min-w-0 ${
          isEven ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
        } transition-all duration-700 ${
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div
          className={`p-5 rounded-2xl bg-white border border-brand-maroon-100 shadow-md hover:shadow-lg transition-shadow duration-300 ${
            isLast ? "ring-2 ring-brand-saffron-400/50" : ""
          }`}
        >
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2 ${
              isLast
                ? "bg-brand-saffron-100 text-brand-saffron-700"
                : "bg-brand-maroon-50 text-brand-maroon-700"
            }`}
          >
            <span className="font-sans font-bold tabular-nums">{milestone.year}</span>
            {isLast && <span className="animate-pulse">● {isEn ? "Upcoming" : "आगामी"}</span>}
          </div>
          <h4 className="font-heading text-lg font-bold text-brand-maroon-950 mb-1.5">
            {milestone.title}
          </h4>
          <p className="text-sm text-brand-charcoal-600 leading-relaxed">
            {milestone.detail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FoundationTimeline() {
  const { isEn, t } = useLanguage();
  const activeMilestones = isEn ? englishMilestones : hindiMilestones;

  return (
    <section
      className="py-16 sm:py-24 bg-brand-cream-50 border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label={t("संस्था की सेवा यात्रा", "Foundation's Journey of Service")}
    >
      <RangoliCorner position="top-left" size={240} className="hidden md:block" />
      <RangoliCorner position="top-right" size={240} className="hidden md:block" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-maroon-50 text-brand-maroon-700 text-xs font-bold uppercase tracking-wider">
            <Flag className="w-3.5 h-3.5 text-brand-saffron-600" />
            <span>{t("संस्था की यात्रा", "Foundation's Journey")}</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            {t("सेवा की यात्रा — एक दृष्टि में", "Journey of Compassion — At a Glance")}
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            {t("स्थापना से लेकर आज तक, हर कदम मानवता की सेवा में समर्पित।", "From inception to this day, every step is dedicated to serving humanity.")}
          </p>
          <TraditionalDivider color="gold" variant="diya" className="mt-2" />
        </div>

        {/* Timeline */}
        <div className="relative space-y-10 md:space-y-14">
          {/* Continuous Timeline Central Spine Line */}
          <div
            className="absolute left-5 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-brand-gold-400 via-brand-saffron-500 to-brand-maroon-200 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {activeMilestones.map((milestone, index) => (
            <TimelineCard
              key={`${milestone.year}-${milestone.title}`}
              milestone={milestone}
              index={index}
              isLast={index === activeMilestones.length - 1}
              isEn={isEn}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
