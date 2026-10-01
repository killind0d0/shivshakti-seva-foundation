"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Menu,
  X,
  HeartHandshake,
  ChevronDown,
  Sparkles,
  MessageCircle,
  ImageIcon,
  Newspaper,
  Award,
  Phone,
  ArrowRight,
  Camera,
  Flame,
  Heart,
} from "lucide-react";

interface HeaderProps {
  onOpenDonation: () => void;
  onOpenHelp: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: (open: boolean) => void;
}

export default function Header({
  onOpenDonation,
  onOpenHelp,
  isMobileMenuOpen,
  onToggleMobileMenu,
}: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const mobileMenuOpen =
    isMobileMenuOpen !== undefined ? isMobileMenuOpen : internalMobileMenuOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  const setMobileMenuOpen = (open: boolean) => {
    setInternalMobileMenuOpen(open);
    if (onToggleMobileMenu) {
      onToggleMobileMenu(open);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("mobile-menu-active");
    } else {
      document.body.classList.remove("mobile-menu-active");
    }
    return () => {
      document.body.classList.remove("mobile-menu-active");
    };
  }, [mobileMenuOpen]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("mukhya-prishth");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scroll Spy Implementation
      const sections = [
        "mukhya-prishth",
        "hamare-bare-mein",
        "sansthapak-sandesh",
        "hamari-sevayein",
        "seva-sankalp",
        "feild-work-spotlight",
        "mahila-pratiyogita",
        "whatsapp-community",
        "hamare-abhiyan",
        "hamara-prabhav",
        "chitra-deergha",
        "samachar",
        "sampark",
      ];

      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    }, 60);
  };

  const isLinkActive = (href: string) => {
    return activeSection === href.replace("#", "");
  };

  // Main primary links shown directly on desktop
  const primaryLinks = [
    { label: "मुख्य पृष्ठ", href: "#mukhya-prishth" },
    { label: "हमारे बारे में", href: "#hamare-bare-mein" },
    { label: "हमारी सेवाएँ", href: "#hamari-sevayein" },
    { label: "अभियान", href: "#hamare-abhiyan" },
    { label: "प्रभाव", href: "#hamara-prabhav" },
    { label: "संपर्क", href: "#sampark" },
  ];

  // Secondary/special links grouped in refined dropdown
  const specialLinks = [
    {
      label: "संस्थापक का संदेश",
      sublabel: "निःस्वार्थ सेवा व सत्यं शिवं सुन्दरम्",
      href: "#sansthapak-sandesh",
      icon: Heart,
      badge: "पावन विचार",
    },
    {
      label: "आज का सेवा संकल्प",
      sublabel: "सामूहिक जन-संकल्प में सम्मिलित हों",
      href: "#seva-sankalp",
      icon: Flame,
      badge: "संकल्प लें",
    },
    {
      label: "धरातल स्पॉटलाइट",
      sublabel: "वास्तविक कहानियाँ एवं छायाचित्र",
      href: "#feild-work-spotlight",
      icon: Camera,
      badge: "सजीव दृश्य",
    },
    {
      label: "महिला स्वावलंबन",
      sublabel: "हुनर प्रतियोगिता एवं आजीविका संबल",
      href: "#mahila-pratiyogita",
      icon: Award,
      badge: "प्रतियोगिता",
    },
    {
      label: "व्हाट्सएप ग्रुप",
      sublabel: "आधिकारिक कम्युनिटी एवं त्वरित सूचनाएं",
      href: "#whatsapp-community",
      icon: MessageCircle,
      badge: "२४×७ लाइव",
    },
    {
      label: "चित्र दीर्घा",
      sublabel: "राहत एवं जनकल्याण कार्यों के दृश्य",
      href: "#chitra-deergha",
      icon: ImageIcon,
    },
    {
      label: "समाचार एवं गतिविधियाँ",
      sublabel: "आगामी शिविर एवं ताज़ा समाचार",
      href: "#samachar",
      icon: Newspaper,
    },
  ];

  // Complete list for mobile drawer
  const allMobileLinks = [
    { label: "मुख्य पृष्ठ", href: "#mukhya-prishth" },
    { label: "हमारे बारे में", href: "#hamare-bare-mein" },
    {
      label: "संस्थापक का संदेश",
      href: "#sansthapak-sandesh",
      highlight: true,
    },
    { label: "हमारी सेवाएँ", href: "#hamari-sevayein" },
    {
      label: "आज का सेवा संकल्प",
      href: "#seva-sankalp",
      highlight: true,
    },
    {
      label: "धरातल स्पॉटलाइट (फ़ोटो व कहानियाँ)",
      href: "#feild-work-spotlight",
      highlight: true,
    },
    {
      label: "महिला स्वावलंबन (प्रतियोगिता)",
      href: "#mahila-pratiyogita",
      highlight: true,
    },
    {
      label: "व्हाट्सएप ग्रुप (कम्युनिटी)",
      href: "#whatsapp-community",
      highlight: true,
    },
    { label: "आपदा राहत अभियान", href: "#hamare-abhiyan" },
    { label: "हमारा प्रभाव", href: "#hamara-prabhav" },
    { label: "चित्र दीर्घा", href: "#chitra-deergha" },
    { label: "समाचार एवं गतिविधियाँ", href: "#samachar" },
    { label: "संपर्क करें", href: "#sampark" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-1.5 border-b border-brand-maroon-100/80"
          : "bg-white shadow-xs py-2 border-b border-brand-maroon-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-1.5 sm:gap-3 min-h-[4rem] sm:min-h-[5.25rem] lg:min-h-[5.75rem] py-1 sm:py-1.5">
          {/* 1. Official Logo & Compact Brand Title */}
          <a
            href="#mukhya-prishth"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#mukhya-prishth");
            }}
            className="flex items-center gap-2 sm:gap-3.5 group focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 rounded-xl p-0.5 sm:p-1 transition min-w-0"
            aria-label="शिवशक्ति सेवा फाउंडेशन मुख्य पृष्ठ"
          >
            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo/logo_emblem.png"
                alt="शिवशक्ति सेवा फाउंडेशन आधिकारिक प्रतीक"
                width={84}
                height={84}
                className="object-contain rounded-full shadow-md drop-shadow-md w-11 h-11 xs:w-13 xs:h-13 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 border-2 border-brand-gold-400/70 p-0.5 bg-brand-maroon-950/10"
                priority
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-heading text-[15px] xs:text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-brand-maroon-950 leading-tight group-hover:text-brand-saffron-600 transition-colors whitespace-nowrap">
                शिवशक्ति सेवा फाउंडेशन
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-brand-maroon-700 tracking-wider hidden sm:block">
                मानव सेवा • करुणा • सामाजिक उत्थान
              </span>
            </div>
          </a>

          {/* 2. Refined Desktop Navigation (Slim, Non-wrapping, High elegance with Active Scroll Spy) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
            aria-label="मुख्य नेविगेशन"
          >
            {primaryLinks.slice(0, 3).map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-1.5 xl:px-2.5 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "text-brand-maroon-950 font-bold bg-amber-100/90 shadow-2xs border-b-2 border-brand-saffron-600"
                      : "text-brand-charcoal-700 hover:text-brand-maroon-900 hover:bg-brand-cream-100"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            {/* Special Initiatives Dropdown ("विशेष पहल ▾") */}
            {(() => {
              const isSpecialActive = specialLinks.some((item) => isLinkActive(item.href));
              return (
                <div
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`px-1.5 xl:px-2.5 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
                      dropdownOpen
                        ? "bg-brand-maroon-900 text-white"
                        : isSpecialActive
                        ? "text-brand-maroon-950 bg-amber-100/90 font-bold border-b-2 border-brand-saffron-600"
                        : "text-brand-maroon-900 bg-brand-cream-100 hover:bg-brand-cream-200"
                    }`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-saffron-600" />
                    <span>विशेष पहल</span>
                    {isSpecialActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-saffron-600 animate-pulse" />
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Panel */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-brand-maroon-100 p-2 z-50 animate-fadeIn">
                      <div className="space-y-1">
                        {specialLinks.map((item) => {
                          const IconComponent = item.icon;
                          const isItemActive = isLinkActive(item.href);
                          return (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                              }}
                              className={`flex items-start gap-2.5 p-2 rounded-xl transition group ${
                                isItemActive
                                  ? "bg-brand-saffron-50 border border-brand-saffron-300 shadow-xs"
                                  : "hover:bg-brand-cream-100"
                              }`}
                            >
                              <div
                                className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 transition-colors ${
                                   isItemActive
                                    ? "bg-brand-maroon-900 text-white"
                                    : "bg-brand-cream-200 text-brand-maroon-900 group-hover:bg-brand-maroon-900 group-hover:text-white"
                                }`}
                              >
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span
                                    className={`text-xs font-bold transition-colors ${
                                      isItemActive
                                        ? "text-brand-maroon-950 font-black"
                                        : "text-brand-maroon-950 group-hover:text-brand-saffron-600"
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-brand-saffron-100 text-brand-saffron-700">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-brand-charcoal-500 leading-tight mt-0.5 truncate">
                                  {item.sublabel}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Remaining Primary Links */}
            {primaryLinks.slice(3).map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`px-1.5 xl:px-2.5 py-1 text-[11px] xl:text-xs 2xl:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? "text-brand-maroon-950 font-bold bg-amber-100/90 shadow-2xs border-b-2 border-brand-saffron-600"
                      : "text-brand-charcoal-700 hover:text-brand-maroon-900 hover:bg-brand-cream-100"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* 3. Right Action Buttons: Sleek & Compact */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Quick Phone Call Button on Desktop */}
            <a
              href="tel:+919117135379"
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-bold text-brand-maroon-900 hover:text-brand-saffron-600 px-2 py-1 rounded-lg transition"
              title="सीधे फोन करें"
            >
              <Phone className="w-3.5 h-3.5 text-brand-saffron-600" />
              <span className="font-sans font-bold tracking-wide">91171 35379</span>
            </a>

            {/* Primary CTA (सहयोग करें) */}
            <button
              onClick={onOpenDonation}
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold text-white bg-gradient-to-r from-brand-maroon-800 via-brand-maroon-700 to-brand-maroon-900 hover:from-brand-maroon-700 hover:to-brand-maroon-800 rounded-xl shadow-xs hover:shadow-md transition active:scale-95 border-b-2 border-brand-gold-500 whitespace-nowrap"
              aria-label="संस्था को सहयोग प्रदान करें"
            >
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold-400" />
              <span>सहयोग करें</span>
            </button>

            {/* Mobile / Tablet Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 sm:p-1.5 rounded-xl text-brand-maroon-900 hover:bg-brand-cream-200 focus:outline-none focus:ring-2 focus:ring-brand-saffron-500 transition"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "मेनू बंद करें" : "मेनू खोलें"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Full Mobile Navigation Drawer (Mounted via React Portal directly into document.body to completely escape header stacking context & backdrop-filter) */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            className="lg:hidden fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm animate-fadeIn"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99999,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-label="मोबाइल नेविगेशन मेनू"
          >
            <div
              className="bg-white max-w-sm w-full h-full ml-auto overflow-y-auto p-5 sm:p-6 flex flex-col justify-between shadow-2xl border-l-2 border-brand-gold-500/50 pb-10"
              style={{
                touchAction: "pan-y",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="space-y-4">
                <div className="pb-3 border-b border-brand-maroon-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/logo/logo_emblem.png"
                      alt="शिवशक्ति सेवा फाउंडेशन"
                      width={72}
                      height={72}
                      className="rounded-full shadow-md w-16 h-16 sm:w-18 sm:h-18 border-2 border-brand-gold-500 object-contain p-0.5 bg-brand-maroon-950/10"
                    />
                    <div>
                      <h2 className="font-heading text-base font-bold text-brand-maroon-950">
                        शिवशक्ति सेवा फाउंडेशन
                      </h2>
                      <p className="text-[10px] text-brand-charcoal-600 font-medium">
                        मानव सेवा • करुणा • सामाजिक उत्थान
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-brand-maroon-900 hover:bg-brand-cream-200 transition"
                    aria-label="मेनू बंद करें"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Complete Categorized Navigation List */}
                <nav className="flex flex-col gap-1.5" aria-label="मोबाइल नेविगेशन">
                  {allMobileLinks.map((link) => {
                    const isItemActive = isLinkActive(link.href);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }}
                        className={`px-3 py-2 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                          isItemActive
                            ? "bg-amber-100 text-brand-maroon-950 font-extrabold border-l-4 border-brand-saffron-600 shadow-xs"
                            : link.highlight
                            ? "bg-brand-saffron-50 text-brand-maroon-900 border border-brand-saffron-200 font-bold"
                            : "text-brand-charcoal-800 hover:bg-brand-cream-100 hover:text-brand-maroon-900"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isItemActive ? "text-brand-saffron-600 font-bold" : "text-brand-charcoal-400"}`} />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Actions in Drawer: Fully visible with tap-to-call clarity */}
              <div className="pt-4 border-t border-brand-maroon-100 space-y-3 mt-6">
                {/* Direct Tap to Call Banner for Mobile */}
                <a
                  href="tel:+919117135379"
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold flex flex-col items-center justify-center gap-0.5 border border-emerald-500/50 shadow-sm transition active:scale-98"
                  title="टैप करते ही सीधा डायलर खुलेगा"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-200 animate-pulse" />
                    <span className="text-sm font-sans font-extrabold tracking-wide">+91 91171 35379</span>
                  </div>
                  <span className="text-[10px] text-emerald-100 font-medium">
                    (टैप करें — डायरेक्ट डायलर खुलेगा, नंबर लिखने की आवश्यकता नहीं)
                  </span>
                </a>

                {/* Action Buttons: Sahayata Mangen & Sahyog Karen */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenHelp();
                    }}
                    className="py-2.5 px-2 rounded-xl bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-maroon-950 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-brand-maroon-200"
                  >
                    <span>सहायता मांगें</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenDonation();
                    }}
                    className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-brand-maroon-900 to-brand-maroon-800 hover:from-brand-maroon-850 hover:to-brand-saffron-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition border-b-2 border-brand-gold-400"
                  >
                    <HeartHandshake className="w-4 h-4 text-brand-gold-300" />
                    <span>सहयोग करें</span>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
