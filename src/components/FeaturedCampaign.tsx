"use client";

import React from "react";
import Image from "next/image";
import {
  LifeBuoy,
  MapPin,
  Target,
  CheckCircle,
  Clock,
  HeartHandshake,
  AlertCircle,
  HelpCircle,
  Share2,
} from "lucide-react";
import { CampaignData } from "@/data/foundationData";
import { useInView } from "@/hooks/useInView";

interface FeaturedCampaignProps {
  campaign: CampaignData;
  onOpenDonation: () => void;
}

export default function FeaturedCampaign({
  campaign,
  onOpenDonation,
}: FeaturedCampaignProps) {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({
    threshold: 0.15,
    triggerOnce: true,
  });

  const handleShare = () => {
    const text = `शिवशक्ति सेवा फाउंडेशन — ${campaign.title}\n${campaign.subtitle}\nसहयोग हेतु वेबसाइट देखें: ${typeof window !== "undefined" ? window.location.href : ""}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: campaign.title, text }).catch(() => {});
    } else if (typeof window !== "undefined") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hamare-abhiyan"
      className="py-16 sm:py-24 bg-brand-maroon-950 text-white relative overflow-hidden"
      aria-label="प्रमुख राहत अभियान"
    >
      {/* Background ambient texture */}
      <div className="absolute inset-0 bg-pattern-subtle opacity-5 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-maroon-900 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-brand-maroon-800 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-saffron-500/20 text-brand-saffron-400 border border-brand-saffron-500/30 text-xs font-bold uppercase tracking-wider">
              <LifeBuoy className="w-3.5 h-3.5 text-brand-saffron-400 animate-spin [animation-duration:8s]" />
              <span>{campaign.badge}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-cream-50 tracking-tight">
              {campaign.title}
            </h2>
            <p className="text-base sm:text-lg text-brand-cream-300">
              {campaign.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-brand-gold-300 bg-brand-maroon-900/90 px-3.5 py-2 rounded-xl border border-brand-gold-500/30 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="font-semibold">वर्तमान में जमीनी स्तर पर सक्रिय</span>
          </div>
        </div>

        {/* Editorial Layout: Left Imagery & Progress, Right Content Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dignified Image + Financial / Resource Progress */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-maroon-800 bg-brand-maroon-900 aspect-[4/3] group">
              <Image
                src={campaign.imageUrl || "/images/gallery/flood_relief_action.jpg"}
                alt="बाढ़ राहत एवं पुनर्वास अभियान का जमीनी दृश्य"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-300">
                  <MapPin className="w-4 h-4 text-brand-saffron-400" />
                  <span>प्रभावित क्षेत्र: {campaign.affectedRegion}</span>
                </div>
              </div>
            </div>

            {/* Transparent Resource & Support Progress Box */}
            <div className="p-6 rounded-2xl bg-brand-maroon-900/90 border border-brand-gold-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-cream-300 uppercase tracking-wider font-semibold">
                    राहत संबल प्रगति
                  </span>
                  <div className="font-heading text-2xl font-bold text-brand-gold-400">
                    {campaign.collectedAmount}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-brand-cream-400">
                    अनुमानित लक्ष्य
                  </span>
                  <div className="text-sm font-semibold text-brand-cream-200">
                    {campaign.targetAmount}
                  </div>
                </div>
              </div>

              {/* Scroll-Triggered Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-brand-maroon-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-brand-maroon-800">
                  <div
                    className="bg-gradient-to-r from-brand-gold-500 via-brand-saffron-400 to-brand-gold-500 bg-[length:200%_100%] animate-shimmer h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: isInView ? `${campaign.percent}%` : "0%" }}
                    role="progressbar"
                    aria-valuenow={isInView ? campaign.percent : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="flex justify-between text-xs text-brand-cream-300 font-medium">
                  <span>{campaign.percent}% लक्ष्य पूर्ण</span>
                  <span>शेष आवश्यकता प्रगति पर</span>
                </div>
                <p className="text-[10px] text-brand-cream-400/70 text-right mt-0.5">
                  अंतिम अद्यतन: ०१ अक्टूबर २०२६
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={onOpenDonation}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-saffron-500 to-brand-saffron-600 hover:from-brand-saffron-600 hover:to-brand-saffron-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition border-b-2 border-brand-gold-400 active:scale-95"
                >
                  <HeartHandshake className="w-5 h-5 text-brand-gold-200" />
                  <span>अभियान में सहयोग करें</span>
                </button>
                <button
                  onClick={handleShare}
                  className="py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-brand-cream-100 text-sm font-semibold flex items-center justify-center gap-2 border border-white/20 transition active:scale-95"
                  title="इस अभियान को साझा करें"
                >
                  <Share2 className="w-4 h-4 text-brand-gold-300" />
                  <span className="hidden sm:inline">साझा करें</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Editorial Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. अभियान का उद्देश्य */}
            <div className="p-6 rounded-2xl bg-brand-maroon-900/40 border border-brand-maroon-800 space-y-2">
              <div className="flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>अभियान का उद्देश्य</span>
              </div>
              <p className="text-sm sm:text-base text-brand-cream-200 leading-relaxed font-normal">
                {campaign.objective}
              </p>
            </div>

            {/* 2. आवश्यक सहायता */}
            <div className="p-6 rounded-2xl bg-brand-maroon-900/40 border border-brand-maroon-800 space-y-3">
              <div className="flex items-center gap-2 text-brand-saffron-400 font-bold text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>आवश्यक सहायता सामग्री</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campaign.neededHelp.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-brand-maroon-950/60 border border-brand-maroon-800 text-xs sm:text-sm text-brand-cream-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. अब तक का कार्य (Verified field milestones) */}
            <div className="p-6 rounded-2xl bg-brand-maroon-900/40 border border-brand-maroon-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>अब तक का कार्य (जमीनी प्रगति)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campaign.workDoneSoFar.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-brand-maroon-950/60 border border-brand-maroon-800 text-xs sm:text-sm text-brand-cream-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. आगे की आवश्यकता (Next phase) */}
            <div className="p-6 rounded-2xl bg-brand-maroon-900/40 border border-brand-maroon-800 space-y-3">
              <div className="flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
                <LifeBuoy className="w-4 h-4" />
                <span>आगे की आवश्यकता एवं आगामी चरण</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {campaign.nextSteps.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-brand-maroon-950/60 border border-brand-maroon-800 text-xs sm:text-sm text-brand-cream-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron-400 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
