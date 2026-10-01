"use client";

import React, { useState, useEffect } from "react";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickImpactBar from "@/components/QuickImpactBar";
import MarqueeTicker from "@/components/MarqueeTicker";
import AboutSection from "@/components/AboutSection";
import FoundersVision from "@/components/FoundersVision";
import ServicesSection from "@/components/ServicesSection";
import DailySankalpWidget from "@/components/DailySankalpWidget";
import FieldWorkSpotlight from "@/components/FieldWorkSpotlight";
import WomenEmpowermentCompetition from "@/components/WomenEmpowermentCompetition";
import WhatsAppCommunity from "@/components/WhatsAppCommunity";
import FeaturedCampaign from "@/components/FeaturedCampaign";
import HowContributionsHelp from "@/components/HowContributionsHelp";
import ImpactStories from "@/components/ImpactStories";
import PhotoGallery from "@/components/PhotoGallery";
import TransparencySection from "@/components/TransparencySection";
import VolunteerSection from "@/components/VolunteerSection";
import DonationSection from "@/components/DonationSection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DonationModal from "@/components/DonationModal";
import NeedHelpModal from "@/components/NeedHelpModal";
import AdminModal from "@/components/AdminModal";
import FloatingQuickAction from "@/components/FloatingQuickAction";
import FestivalGreetingBanner from "@/components/FestivalGreetingBanner";
import StickyDonateBar from "@/components/StickyDonateBar";
import FoundationTimeline from "@/components/FoundationTimeline";
import EventCountdown from "@/components/EventCountdown";
import HelpTracker from "@/components/HelpTracker";
import { initialFoundationData, FoundationData } from "@/data/foundationData";

export default function Home() {
  const [data, setData] = useState<FoundationData>(initialFoundationData);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Load custom CMS updates from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ssf_foundation_data");
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Lock body scroll and prevent background touch bleed when any modal is open
  const isAnyModalOpen = donationModalOpen || helpModalOpen || adminModalOpen;
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isAnyModalOpen]);

  const handleSaveData = (updated: FoundationData) => {
    setData(updated);
    try {
      localStorage.setItem("ssf_foundation_data", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetData = () => {
    setData(initialFoundationData);
    try {
      localStorage.removeItem("ssf_foundation_data");
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenHelpWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setHelpModalOpen(true);
  };

  const handleOpenGeneralHelp = () => {
    setPreselectedService(undefined);
    setHelpModalOpen(true);
  };

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream-100 font-sans selection:bg-brand-saffron-500 selection:text-white">
      <a href="#main-content" 
         className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-maroon-900 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500 font-heading text-sm"
      >
        मुख्य सामग्री पर जाएँ
      </a>
      {/* Top Scroll Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-brand-saffron-500 via-brand-gold-400 to-brand-saffron-600 z-50 transition-all duration-100 ease-out origin-left pointer-events-none shadow-sm"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* 1. Accessibility & Urgent Assistance Top Bar */}
      <AccessibilityToolbar
        onOpenHelp={handleOpenGeneralHelp}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 2. Divine Festival Greeting Ribbon (Pure Hindi phrase, dignified royal look, zero emojis) */}
      <FestivalGreetingBanner
        config={data.festivalGreeting}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 3. Responsive Header with Official Logo */}
      <Header
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenHelp={handleOpenGeneralHelp}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={setIsMobileMenuOpen}
      />

      {/* Top Live Marquee Ticker (Right under the header) */}
      <MarqueeTicker />

      {/* Subtle Ambient Sacred Logo Watermark across website background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <div
          className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] bg-no-repeat bg-contain bg-center opacity-[0.025] filter grayscale contrast-125"
          style={{ backgroundImage: "url('/images/logo/logo_emblem.png')" }}
        />
      </div>

      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 focus:outline-none">
        {/* 3. Hero Section with Cinematic Dignity and Logo Emblem */}
        <Hero
          onOpenDonation={() => setDonationModalOpen(true)}
          onOpenHelp={handleOpenGeneralHelp}
        />

        {/* 4. Quick Impact / Trust Bar (Adhering to Rule 15 with verified data) */}
        <QuickImpactBar stats={data.stats} />

        {/* 5. About Us Section (Mission, Philosophy & 4 Pillars) */}
        <AboutSection />

        {/* 5b. Foundation Journey / Milestones Timeline */}
        <FoundationTimeline />

        {/* 6. Founder & Chief Sevadaar's Vision Letter (Breaks Card Fatigue & Adds Human Trust) */}
        <FoundersVision />

        {/* 7. Our Services (10 Core Welfare Services with Hover Reveal Backgrounds) */}
        <div id="hamare-karya">
          <ServicesSection
            services={data.services}
            onOpenHelpWithService={handleOpenHelpWithService}
          />
        </div>

        {/* 7b. Help Request Tracker */}
        <HelpTracker onOpenHelpModal={handleOpenGeneralHelp} />

        {/* 8. Daily Community Service Pledge (Interactive Micro-Moment & Blessing Counter) */}
        <DailySankalpWidget />

        {/* 9. Ground Field Work Spotlight & Story Upload */}
        <FieldWorkSpotlight />

        {/* 9. Women Empowerment & Self-Reliance Skill Competition */}
        <WomenEmpowermentCompetition />

        {/* 8. WhatsApp Community Group & Instant QR Code */}
        <WhatsAppCommunity
          phoneNumber={data.phone}
        />

        {/* 9. Featured Relief Campaign (Flood Relief & Rehabilitation) */}
        <FeaturedCampaign
          campaign={data.featuredCampaign}
          onOpenDonation={() => setDonationModalOpen(true)}
        />

        {/* 8. How Contributions Help (Transparent Journey) */}
        <HowContributionsHelp />

        {/* 9. Impact Stories (Real stories of hope, dignity & community) */}
        <ImpactStories stories={data.stories} />

        {/* 10. Photo Gallery with Categories & Accessible Lightbox */}
        <PhotoGallery photos={data.gallery} />

        {/* 11. Transparency & Accountability (Audited records & governance) */}
        <TransparencySection />

        {/* 12. Volunteer Registration Section */}
        <VolunteerSection />

        {/* 13. Prominent & Tasteful Donation Section (UPI, Bank, QR) */}
        <DonationSection donationConfig={data.donationConfig} />

        {/* 13b. Upcoming Welfare Event Countdown & RSVP */}
        <EventCountdown />

        {/* 14. News & Activities */}
        <NewsSection news={data.news} />

        {/* 15. Contact Section & Inquiry Form */}
        <ContactSection data={data} />
      </main>

      {/* 16. Comprehensive Hindi Footer */}
      <Footer
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Global Modals */}
      <DonationModal
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
        donationConfig={data.donationConfig}
      />

      <NeedHelpModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
        preselectedService={preselectedService}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />

      {/* Floating 24x7 Quick Action Bar (Auto-hidden when sidebar/drawer or modal is open) */}
      <FloatingQuickAction
        phoneNumber={data.phone}
        onOpenHelp={handleOpenGeneralHelp}
        isHidden={
          isMobileMenuOpen ||
          donationModalOpen ||
          helpModalOpen ||
          adminModalOpen
        }
      />

      {/* Sticky Mobile Donate CTA */}
      <StickyDonateBar onOpenDonation={() => setDonationModalOpen(true)} />

      {/* Indian Festive Theme Auto-Decorator & Visual Preview */}
    </div>
  );
}
