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
import SectionNavHub, { TabKey, SectionFooterNav } from "@/components/SectionNavHub";
import { initialFoundationData, FoundationData } from "@/data/foundationData";

export default function Home() {
  const [data, setData] = useState<FoundationData>(initialFoundationData);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const handleTabChange = (tab: TabKey, anchorId?: string) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const newHash = anchorId
        ? `#${anchorId}`
        : tab === "home"
        ? "#mukhya-prishth"
        : `#${tab}`;
      window.history.pushState(null, "", newHash);
    }

    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          const hubEl = document.getElementById("section-hub-nav");
          if (hubEl) {
            const topOffset = hubEl.getBoundingClientRect().top + window.scrollY - 75;
            window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
          }
        }
      }, 70);
    } else if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const hubEl = document.getElementById("section-hub-nav");
        if (hubEl) {
          const topOffset = hubEl.getBoundingClientRect().top + window.scrollY - 75;
          window.scrollTo({ top: Math.max(0, topOffset), behavior: "smooth" });
        }
      }, 50);
    }
  };

  // Sync tab with URL hash on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!hash || hash.includes("mukhya") || hash.includes("home")) {
        setActiveTab("home");
        return;
      }
      if (
        hash.includes("bare-mein") ||
        hash.includes("sansthapak") ||
        hash.includes("timeline") ||
        hash.includes("about")
      ) {
        setActiveTab("about");
      } else if (
        hash.includes("karya") ||
        hash.includes("sevayein") ||
        hash.includes("spotlight") ||
        hash.includes("pratiyogita") ||
        hash.includes("abhiyan") ||
        hash.includes("services")
      ) {
        setActiveTab("services");
      } else if (
        hash.includes("help") ||
        hash.includes("anurodh") ||
        hash.includes("sahayata") ||
        hash.includes("tracking") ||
        hash.includes("tracker")
      ) {
        setActiveTab("help");
      } else if (
        hash.includes("sahyog") ||
        hash.includes("prabhav") ||
        hash.includes("pardarshita") ||
        hash.includes("contributions") ||
        hash.includes("donate")
      ) {
        setActiveTab("donate");
      } else if (
        hash.includes("shiviram") ||
        hash.includes("samachar") ||
        hash.includes("chitra") ||
        hash.includes("gallery") ||
        hash.includes("whatsapp") ||
        hash.includes("events")
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
      } else if (hash.includes("all") || hash.includes("sampurna")) {
        setActiveTab("all");
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
      <a
        href="#main-content"
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

      {/* 2. Divine Festival Greeting Ribbon */}
      <FestivalGreetingBanner
        config={data.festivalGreeting}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* 3. Responsive Header with Section-Wise Navigation Link Integration */}
      <Header
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenHelp={handleOpenGeneralHelp}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={setIsMobileMenuOpen}
        activeTab={activeTab}
        onSelectTab={handleTabChange}
      />

      {/* Top Live Marquee Ticker */}
      <MarqueeTicker />

      {/* Ambient Sacred Logo Watermark across website background */}
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
        {/* 4. Cinematic Hero & Quick Impact Stats (Shown on Home and Full Page view) */}
        {(activeTab === "home" || activeTab === "all") && (
          <div id="mukhya-prishth" className="animate-fadeIn">
            <Hero
              onOpenDonation={() => setDonationModalOpen(true)}
              onOpenHelp={handleOpenGeneralHelp}
            />
            <QuickImpactBar stats={data.stats} />
          </div>
        )}

        {/* 5. Section Navigation Hub (Always accessible: sticky bar + Gateway Dashboard on Home) */}
        <SectionNavHub
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          onOpenHelp={handleOpenGeneralHelp}
          onOpenDonation={() => setDonationModalOpen(true)}
        />

        {/* SECTION 1: About Us, History & Founder's Vision */}
        {(activeTab === "about" || activeTab === "all") && (
          <section id="hamare-bare-mein" aria-label="हमारे बारे में" className="animate-fadeIn">
            <AboutSection />
            <div id="foundation-timeline">
              <FoundationTimeline />
            </div>
            <div id="sansthapak-sandesh">
              <FoundersVision />
            </div>
            <SectionFooterNav activeTab="about" onSelectTab={handleTabChange} />
          </section>
        )}

        {/* SECTION 2: Welfare Programs & Ground Field Work */}
        {(activeTab === "services" || activeTab === "all") && (
          <section id="hamari-sevayein" aria-label="सेवा प्रकल्प" className="animate-fadeIn">
            <ServicesSection
              services={data.services}
              onOpenHelpWithService={handleOpenHelpWithService}
            />
            <div id="feild-work-spotlight">
              <FieldWorkSpotlight />
            </div>
            <div id="mahila-pratiyogita">
              <WomenEmpowermentCompetition />
            </div>
            <div id="hamare-abhiyan">
              <FeaturedCampaign
                campaign={data.featuredCampaign}
                onOpenDonation={() => setDonationModalOpen(true)}
              />
            </div>
            <SectionFooterNav activeTab="services" onSelectTab={handleTabChange} />
          </section>
        )}

        {/* SECTION 3: 24x7 Help Center & Live Tracking */}
        {(activeTab === "help" || activeTab === "all") && (
          <section id="sahayata-kendra" aria-label="सहायता केंद्र" className="animate-fadeIn">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
              <div className="bg-gradient-to-r from-red-700 via-brand-maroon-900 to-red-800 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-brand-gold-400">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs uppercase tracking-widest font-bold text-brand-gold-300">
                      २४×७ आपातकालीन सेवा प्रकोष्ठ • गया जी एवं संपूर्ण बिहार
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
            <HelpTracker onOpenHelpModal={handleOpenGeneralHelp} />
            <SectionFooterNav activeTab="help" onSelectTab={handleTabChange} />
          </section>
        )}

        {/* SECTION 4: Donations, Impact & Transparency */}
        {(activeTab === "donate" || activeTab === "all") && (
          <section id="sahyog-dan" aria-label="सहयोग व दान" className="animate-fadeIn">
            <DonationSection donationConfig={data.donationConfig} />
            <HowContributionsHelp />
            <div id="hamara-prabhav">
              <ImpactStories stories={data.stories} />
            </div>
            <div id="pardarshita">
              <TransparencySection />
            </div>
            <SectionFooterNav activeTab="donate" onSelectTab={handleTabChange} />
          </section>
        )}

        {/* SECTION 5: Events, Media & Indian Photo Gallery */}
        {(activeTab === "events" || activeTab === "all") && (
          <section id="ayojan-gallery" aria-label="आयोजन व गैलरी" className="animate-fadeIn">
            <EventCountdown />
            <div id="chitra-deergha">
              <PhotoGallery photos={data.gallery} />
            </div>
            <div id="samachar">
              <NewsSection news={data.news} />
            </div>
            <div id="whatsapp-community">
              <WhatsAppCommunity phoneNumber={data.phone} />
            </div>
            <SectionFooterNav activeTab="events" onSelectTab={handleTabChange} />
          </section>
        )}

        {/* SECTION 6: Volunteer Registration, Daily Pledge & Contact */}
        {(activeTab === "volunteer" || activeTab === "all") && (
          <section id="sampark-karyalay" aria-label="जुड़ें व संपर्क" className="animate-fadeIn">
            <div id="seva-sankalp">
              <DailySankalpWidget />
            </div>
            <div id="swayamsevak">
              <VolunteerSection />
            </div>
            <div id="sampark">
              <ContactSection data={data} />
            </div>
            <SectionFooterNav activeTab="volunteer" onSelectTab={handleTabChange} />
          </section>
        )}
      </main>

      {/* 6. Comprehensive Hindi Footer with Section Navigation */}
      <Footer
        onOpenDonation={() => setDonationModalOpen(true)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onSelectTab={handleTabChange}
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

      {/* Floating 24x7 Quick Action Bar */}
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
