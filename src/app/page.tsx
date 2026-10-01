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
import SectionNavHub, { TabKey } from "@/components/SectionNavHub";
import { initialFoundationData, FoundationData } from "@/data/foundationData";

export default function Home() {
  const [data, setData] = useState<FoundationData>(initialFoundationData);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    // Smooth scroll to hub navigation
    const hubEl = document.getElementById("section-hub-nav");
    if (hubEl) {
      const topOffset = hubEl.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
    }
  };

  // Sync tab with URL hash
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!hash || hash.includes("mukhya")) {
        return;
      }
      if (
        hash.includes("bare-mein") ||
        hash.includes("sansthapak") ||
        hash.includes("timeline")
      ) {
        setActiveTab("about");
      } else if (
        hash.includes("karya") ||
        hash.includes("sevayein") ||
        hash.includes("spotlight") ||
        hash.includes("pratiyogita") ||
        hash.includes("abhiyan")
      ) {
        setActiveTab("services");
      } else if (
        hash.includes("help") ||
        hash.includes("anurodh") ||
        hash.includes("sahayata")
      ) {
        setActiveTab("help");
      } else if (
        hash.includes("sahyog") ||
        hash.includes("prabhav") ||
        hash.includes("pardarshita") ||
        hash.includes("contributions")
      ) {
        setActiveTab("donate");
      } else if (
        hash.includes("shiviram") ||
        hash.includes("samachar") ||
        hash.includes("chitra") ||
        hash.includes("gallery") ||
        hash.includes("whatsapp")
      ) {
        setActiveTab("events");
      } else if (
        hash.includes("sankalp") ||
        hash.includes("swayamsevak") ||
        hash.includes("volunteer") ||
        hash.includes("sampark") ||
        hash.includes("contact")
      ) {
        setActiveTab("volunteer");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

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
    <div className="flex flex-col min-h-screen bg-brand-cream-100 font-sans selection:bg-brand-saffron-500 selection:text-white pb-16 md:pb-0">
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

        {/* Section Navigation Hub & Quick Access Gateway */}
        <SectionNavHub
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          onOpenHelp={handleOpenGeneralHelp}
          onOpenDonation={() => setDonationModalOpen(true)}
        />

        {/* Focused Category View Banner (when a specific category is active) */}
        {activeTab !== "all" && (
          <div className="bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-950 text-white py-3 px-4 sm:px-8 border-y-2 border-brand-gold-400 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold-400 animate-pulse" />
                <span>
                  चयनित खंड प्रदर्शित हो रहा है:{" "}
                  <strong className="text-brand-gold-300">
                    {activeTab === "help" && "सहायता केंद्र (Help & Tracking)"}
                    {activeTab === "donate" && "सहयोग व दान (Donate & Transparency)"}
                    {activeTab === "services" && "सेवा प्रकल्प व धरातल (Welfare & Field)"}
                    {activeTab === "events" && "आयोजन व समाचार (Events & Media)"}
                    {activeTab === "about" && "परिचय व नेतृत्व (About & Vision)"}
                    {activeTab === "volunteer" && "जुड़ें व संपर्क (Join & Contact)"}
                  </strong>
                </span>
              </div>
              <button
                onClick={() => handleTabChange("all")}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/25 transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>← सम्पूर्ण पृष्ठ देखें (Show All Sections)</span>
              </button>
            </div>
          </div>
        )}

        {/* 1. About Us & Leadership Group */}
        {(activeTab === "all" || activeTab === "about") && (
          <div id="vibhag-parichay" className="animate-fadeIn">
            {/* 5. About Us Section (Mission, Philosophy & 4 Pillars) */}
            <AboutSection />

            {/* 5b. Foundation Journey / Milestones Timeline */}
            <FoundationTimeline />

            {/* 6. Founder & Chief Sevadaar's Vision Letter */}
            <FoundersVision />
          </div>
        )}

        {/* 2. Help Center & Tracking Group */}
        {(activeTab === "all" || activeTab === "help") && (
          <div id="vibhag-sahayata" className="animate-fadeIn">
            {activeTab === "help" && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
                <div className="bg-gradient-to-r from-red-700 via-brand-maroon-900 to-red-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-brand-gold-400">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                      <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-300">
                        24×7 आपातकालीन सेवा प्रकोष्ठ
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                        क्या आपको या किसी परिचित को तत्काल सहायता चाहिए?
                      </h3>
                      <p className="text-sm text-brand-cream-100 max-w-xl">
                        राशन, बाढ़ राहत, चिकित्सा सेवा या आपातकालीन संबल हेतु सीधे हमारे सेवा दल से संपर्क करें या नीचे ऑनलाइन आवेदन भेजें।
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={handleOpenGeneralHelp}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-brand-maroon-950 font-heading font-bold text-sm hover:bg-brand-cream-100 shadow-md transition cursor-pointer"
                      >
                        नया सहायता अनुरोध दर्ज करें
                      </button>
                      <a
                        href="tel:+919117135379"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-brand-gold-500 text-brand-maroon-950 font-heading font-bold text-sm hover:bg-brand-gold-400 shadow-md transition text-center"
                      >
                        📞 91171 35379 पर तुरंत कॉल करें
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <HelpTracker onOpenHelpModal={handleOpenGeneralHelp} />
          </div>
        )}

        {/* 3. Welfare Services & Field Work Group */}
        {(activeTab === "all" || activeTab === "services") && (
          <div id="vibhag-sevayein" className="animate-fadeIn">
            {/* 7. Our Services (10 Core Welfare Services) */}
            <div id="hamare-karya">
              <ServicesSection
                services={data.services}
                onOpenHelpWithService={handleOpenHelpWithService}
              />
            </div>

            {/* 9. Ground Field Work Spotlight & Story Upload */}
            <FieldWorkSpotlight />

            {/* 9. Women Empowerment & Self-Reliance Skill Competition */}
            <WomenEmpowermentCompetition />

            {/* 9. Featured Relief Campaign (Flood Relief & Rehabilitation) */}
            <FeaturedCampaign
              campaign={data.featuredCampaign}
              onOpenDonation={() => setDonationModalOpen(true)}
            />
          </div>
        )}

        {/* 4. Donation & Transparency Group */}
        {(activeTab === "all" || activeTab === "donate") && (
          <div id="vibhag-sahyog" className="animate-fadeIn">
            {/* 13. Prominent & Tasteful Donation Section (UPI, Bank, QR) */}
            <DonationSection donationConfig={data.donationConfig} />

            {/* 8. How Contributions Help (Transparent Journey) */}
            <HowContributionsHelp />

            {/* 9. Impact Stories (Real stories of hope, dignity & community) */}
            <ImpactStories stories={data.stories} />

            {/* 11. Transparency & Accountability (Audited records & governance) */}
            <TransparencySection />
          </div>
        )}

        {/* 5. Events, Media & News Group */}
        {(activeTab === "all" || activeTab === "events") && (
          <div id="vibhag-ayojan" className="animate-fadeIn">
            {/* 13b. Upcoming Welfare Event Countdown & RSVP */}
            <EventCountdown />

            {/* 14. News & Activities */}
            <NewsSection news={data.news} />

            {/* 10. Photo Gallery with Categories & Accessible Lightbox */}
            <PhotoGallery photos={data.gallery} />

            {/* 8. WhatsApp Community Group & Instant QR Code */}
            <WhatsAppCommunity phoneNumber={data.phone} />
          </div>
        )}

        {/* 6. Join, Volunteer & Contact Group */}
        {(activeTab === "all" || activeTab === "volunteer") && (
          <div id="vibhag-sampark" className="animate-fadeIn">
            {/* 8. Daily Community Service Pledge (Interactive Micro-Moment & Blessing Counter) */}
            <DailySankalpWidget />

            {/* 12. Volunteer Registration Section */}
            <VolunteerSection />

            {/* 15. Contact Section & Inquiry Form */}
            <ContactSection data={data} />
          </div>
        )}
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
