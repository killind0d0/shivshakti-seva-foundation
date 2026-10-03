"use client";

import React, { useState, useEffect } from "react";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import DevSetupBanner from "@/components/DevSetupBanner";
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
import dynamic from "next/dynamic";

const DonationModal = dynamic(() => import("@/components/DonationModal"), { ssr: false });
const NeedHelpModal = dynamic(() => import("@/components/NeedHelpModal"), { ssr: false });
const AdminModal = dynamic(() => import("@/components/AdminModal"), { ssr: false });
import FloatingQuickAction from "@/components/FloatingQuickAction";
import FestivalGreetingBanner from "@/components/FestivalGreetingBanner";
import StickyDonateBar from "@/components/StickyDonateBar";
import FoundationTimeline from "@/components/FoundationTimeline";
import EventCountdown from "@/components/EventCountdown";
import HelpTracker from "@/components/HelpTracker";
import QuickAccessBar from "@/components/SectionNavHub";
import { initialFoundationData, FoundationData } from "@/data/foundationData";

export default function Home() {
  const [data, setData] = useState<FoundationData>(initialFoundationData);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Load custom CMS updates from localStorage on mount and fetch globally persisted server data
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ssf_foundation_data");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.services) && parsed.services.length > 0 && parsed.heroHeadline) {
          if (parsed?.donationConfig) {
            if (!parsed.donationConfig.secondaryUpiId) {
              parsed.donationConfig.secondaryUpiId = "9117135379@upi";
            }
            if (!parsed.donationConfig.contactNotice) {
              parsed.donationConfig.contactNotice = "बैंक हस्तांतरण (NEFT/RTGS) विवरण एवं 80G रसीद हेतु कृपया सीधे हमारे कार्यालय फोन +91 91171 35379 पर संपर्क करें।";
            }
          }
          setData({ ...initialFoundationData, ...parsed });
        } else {
          // Clear corrupted or incomplete local cache
          localStorage.removeItem("ssf_foundation_data");
        }
      }
    } catch (e) {
      console.error("Local storage parse error:", e);
      try {
        localStorage.removeItem("ssf_foundation_data");
      } catch {}
    }

    // Fetch authoritative server-persisted CMS data for global synchronization across all devices
    fetch("/api/foundation-data")
      .then((res) => res.json())
      .then((resData) => {
        if (
          resData.success &&
          resData.data &&
          Array.isArray(resData.data.services) &&
          resData.data.services.length > 0 &&
          resData.data.heroHeadline
        ) {
          const merged = { ...initialFoundationData, ...resData.data };
          setData(merged);
          try {
            localStorage.setItem("ssf_foundation_data", JSON.stringify(merged));
          } catch {}
        }
      })
      .catch((err) => {
        console.warn("Could not fetch server CMS data:", err);
      });
  }, []);

  // Lock body scroll when any modal is open
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
    <div className="flex flex-col min-h-screen w-full bg-brand-cream-100 font-sans selection:bg-brand-saffron-500 selection:text-white pb-16 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-brand-maroon-900 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-gold-500 font-heading text-sm"
      >
        मुख्य सामग्री पर जाएँ
      </a>

      {/* Top Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-saffron-500 via-brand-gold-400 to-brand-saffron-600 z-50 transition-all duration-100 ease-out origin-left pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      {/* Development & Setup Status Banner (Toggleable in src/config/devBannerConfig.ts) */}
      <DevSetupBanner />

      {/* 1. Accessibility Toolbar (compact top bar) */}
      <AccessibilityToolbar
        onOpenHelp={handleOpenGeneralHelp}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 2. Festival Greeting Banner */}
      <FestivalGreetingBanner
        config={data.festivalGreeting}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 3. Main Header — single sticky navigation */}
      <Header
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenHelp={handleOpenGeneralHelp}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={setIsMobileMenuOpen}
      />

      {/* 4. Top Live Marquee Ticker (Shifted back to its prominent original position below Header) */}
      <MarqueeTicker />

      {/* Ambient Sacred Logo Watermark */}
      <div
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
        aria-hidden="true"
      >
        <div
          className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] bg-no-repeat bg-contain bg-center opacity-[0.025] filter grayscale contrast-125"
          style={{ backgroundImage: "url('/images/logo/logo_emblem.png')" }}
        />
      </div>

      {/* ========== MAIN CONTENT — Clean Single-Page Scroll ========== */}
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 w-full focus:outline-none">

        {/* SECTION 1: Hero Banner */}
        <Hero
          onOpenDonation={() => setDonationModalOpen(true)}
          onOpenHelp={handleOpenGeneralHelp}
        />

        {/* SECTION 2: Quick Impact Trust Bar (verified stats) */}
        <QuickImpactBar stats={data.stats} />

        {/* SECTION 3: Quick Access Bar (Help · Donate · Programs · Call) */}
        <QuickAccessBar
          onOpenHelp={handleOpenGeneralHelp}
          onOpenDonation={() => setDonationModalOpen(true)}
        />

        {/* SECTION 4: About Us — Who We Are, 4 Pillars, Philosophy */}
        <div id="hamare-bare-mein">
          <AboutSection />
        </div>

        {/* SECTION 5: Founder's Vision & Chief Sevadar Letter */}
        <div id="sansthapak-sandesh">
          <FoundersVision />
        </div>

        {/* SECTION 6: Foundation Journey / Milestones Timeline */}
        <div id="foundation-timeline">
          <FoundationTimeline />
        </div>

        {/* SECTION 7: Our 10 Core Welfare Services */}
        <div id="hamari-sevayein">
          <ServicesSection
            services={data.services}
            onOpenHelpWithService={handleOpenHelpWithService}
          />
        </div>

        {/* SECTION 8: Ground Field Work Spotlight & Stories */}
        <div id="field-work-spotlight">
          <FieldWorkSpotlight />
        </div>

        {/* SECTION 9: Women Empowerment & Self-Reliance Skill Competition */}
        <div id="mahila-pratiyogita">
          <WomenEmpowermentCompetition />
        </div>

        {/* SECTION 10: Featured Relief Campaign (Flood Relief) */}
        <div id="hamare-abhiyan">
          <FeaturedCampaign
            campaign={data.featuredCampaign}
            onOpenDonation={() => setDonationModalOpen(true)}
          />
        </div>

        {/* SECTION 11: Donation Section (UPI, Bank, QR) */}
        <div id="sahyog-dan">
          <DonationSection donationConfig={data.donationConfig} />
        </div>

        {/* SECTION 12: How Contributions Help (Transparent Journey) */}
        <HowContributionsHelp />

        {/* SECTION 13: Impact Stories */}
        <div id="hamara-prabhav">
          <ImpactStories stories={data.stories} />
        </div>

        {/* SECTION 14: Transparency & Accountability */}
        <div id="pardarshita">
          <TransparencySection />
        </div>

        {/* SECTION 15: Upcoming Event Countdown & RSVP */}
        <div id="ayojan-shiviram">
          <EventCountdown />
        </div>

        {/* SECTION 16: News & Activities */}
        <div id="samachar">
          <NewsSection news={data.news} />
        </div>

        {/* SECTION 17: Photo Gallery */}
        <div id="chitra-deergha">
          <PhotoGallery photos={data.gallery} />
        </div>

        {/* SECTION 18: WhatsApp Community */}
        <div id="whatsapp-community">
          <WhatsAppCommunity phoneNumber={data.phone} />
        </div>

        {/* SECTION 19: Help Tracker */}
        <div id="sahayata-tracker">
          <HelpTracker onOpenHelpModal={handleOpenGeneralHelp} />
        </div>

        {/* SECTION 20: Daily Service Pledge */}
        <div id="seva-sankalp">
          <DailySankalpWidget />
        </div>

        {/* SECTION 21: Volunteer Registration */}
        <div id="swayamsevak">
          <VolunteerSection />
        </div>

        {/* SECTION 22: Contact Section */}
        <div id="sampark">
          <ContactSection data={data} />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Global Modals — Dynamically Loaded On Demand */}
      {donationModalOpen && (
        <DonationModal
          isOpen={donationModalOpen}
          onClose={() => setDonationModalOpen(false)}
          donationConfig={data.donationConfig}
        />
      )}

      {helpModalOpen && (
        <NeedHelpModal
          isOpen={helpModalOpen}
          onClose={() => setHelpModalOpen(false)}
          preselectedService={preselectedService}
        />
      )}

      {adminModalOpen && (
        <AdminModal
          isOpen={adminModalOpen}
          onClose={() => setAdminModalOpen(false)}
          data={data}
          onSaveData={handleSaveData}
          onResetData={handleResetData}
        />
      )}

      {/* Floating Quick Action Bar */}
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
    </div>
  );
}
