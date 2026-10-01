"use client";

import React from "react";
import { Sparkles, Flag, Heart, Users, HeartPulse, Eye } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import TraditionalDivider from "./TraditionalDivider";
import RangoliCorner from "./RangoliCorner";

interface Milestone {
  year: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
}

const milestones: Milestone[] = [
  {
    year: "2024",
    title: "संस्था की स्थापना",
    detail:
      "माँ मंगलागौरी, गया जी (बिहार) से शिवशक्ति सेवा फाउंडेशन की सेवा यात्रा प्रारम्भ। निःस्वार्थ सेवा, करुणा और मानवता के संकल्प के साथ।",
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
    title: "महिला स्वावलंबन कार्यशाला",
    detail:
      "ग्रामीण बहनों के लिए सिलाई, कढ़ाई एवं हस्तशिल्प प्रशिक्षण कार्यक्रम प्रारम्भ। स्वावलंबन की ओर पहला कदम।",
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
    title: "निःशुल्क नेत्र एवं स्वास्थ्य शिविर",
    detail:
      "15 अक्टूबर 2026 — ग्रामीण क्षेत्रों में निःशुल्क नेत्र परीक्षण एवं स्वास्थ्य शिविर का आयोजन। आगामी।",
    icon: <Eye className="w-5 h-5" />,
  },
];

function TimelineCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });
  const isEven = index % 2 === 0;
  const isLast = index === milestones.length - 1;

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
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
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
            {isLast && <span className="animate-pulse">● आगामी</span>}
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
  return (
    <section
      className="py-16 sm:py-24 bg-brand-cream-50 border-b border-brand-maroon-100 relative overflow-hidden"
      aria-label="संस्था की सेवा यात्रा"
    >
      <RangoliCorner position="top-left" />
      <RangoliCorner position="top-right" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-maroon-50 text-brand-maroon-700 text-xs font-bold uppercase tracking-wider">
            <Flag className="w-3.5 h-3.5 text-brand-saffron-600" />
            <span>संस्था की यात्रा</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
            सेवा की यात्रा — एक दृष्टि में
          </h2>
          <p className="text-base sm:text-lg text-brand-charcoal-600 font-normal leading-relaxed">
            स्थापना से लेकर आज तक, हर कदम मानवता की सेवा में समर्पित।
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

          {milestones.map((milestone, index) => (
            <TimelineCard
              key={`${milestone.year}-${milestone.title}`}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
