"use client";

import React, { useState, useEffect } from "react";
import { HeartHandshake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface StickyDonateBarProps {
  onOpenDonation: () => void;
}

export default function StickyDonateBar({ onOpenDonation }: StickyDonateBarProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDonationSectionVisible, setIsDonationSectionVisible] = useState(false);

  useEffect(() => {
    // Show bar after scrolling past hero section
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Hide when donation section is visible (no need to show CTA when already there)
    const donationSection =
      document.getElementById("sahyog-karein") ||
      document.getElementById("sahyog-dan");
    if (!donationSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDonationSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(donationSection);
    return () => observer.disconnect();
  }, []);

  // Hide on desktop, when not scrolled, or when donation section is visible
  if (!isVisible || isDonationSectionVisible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden animate-slideUp"
      role="complementary"
      aria-label={t("त्वरित दान बटन", "Quick Donate Button")}
    >
      <div className="p-3 bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-950 border-t-2 border-brand-gold-500 shadow-2xl">
        <button
          onClick={onOpenDonation}
          className="w-full py-3.5 bg-gradient-to-r from-brand-saffron-600 to-brand-saffron-500 text-white rounded-xl
                     font-heading text-base sm:text-lg flex items-center justify-center gap-2.5
                     active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl font-bold"
          aria-label={t("दान करें — एक परिवार की मदद करें", "Donate — Support a Family in Need")}
        >
          <HeartHandshake className="w-5 h-5" />
          <span>{t("सहयोग करें — एक परिवार की मदद करें", "Donate — Support a Family in Need")}</span>
        </button>
      </div>
    </div>
  );
}
