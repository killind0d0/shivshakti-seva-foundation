"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "hi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (hi: string, en: string) => string;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "hi",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (hi, _en) => hi,
  isEn: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hi");

  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/hi\/([a-z]{2})/i);
      const saved = localStorage.getItem("ssf_lang") as Language | null;
      const detected = (match ? match[1] : saved || "hi").toLowerCase();
      const active: Language = detected === "en" ? "en" : "hi";
      setLanguageState(active);
      document.documentElement.lang = active;
      document.documentElement.setAttribute("data-ssf-lang", active);
    } catch {}

    const handleCustomLang = (e: any) => {
      if (e.detail?.lang) {
        const next = e.detail.lang === "en" ? "en" : "hi";
        setLanguageState(next);
      }
    };
    window.addEventListener("ssf-language-change", handleCustomLang);
    return () => window.removeEventListener("ssf-language-change", handleCustomLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("ssf_lang", lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-ssf-lang", lang);

      // Emit custom event for any standalone components
      window.dispatchEvent(
        new CustomEvent("ssf-language-change", { detail: { lang } })
      );

      // Set Google Translate cookie so fallback translator stays in sync
      const cookieValue = `/hi/${lang}`;
      const hostname = window.location.hostname;
      if (lang === "hi") {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=/hi/hi; path=/;";
      } else {
        document.cookie = `googtrans=${cookieValue}; path=/;`;
        if (!hostname.includes("localhost") && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
          const parts = hostname.split(".");
          if (parts.length > 1) {
            const rootDomain = "." + parts.slice(-2).join(".");
            document.cookie = `googtrans=${cookieValue}; path=/; domain=${rootDomain};`;
          }
        }
      }

      // Also trigger Google combo if loaded
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select && select.value !== lang) {
        select.value = lang;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } catch (e) {
      console.error("Language switch error:", e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "hi" ? "en" : "hi");
  };

  const t = (hi: string, en: string) => {
    return language === "en" ? en : hi;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isEn: language === "en",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
