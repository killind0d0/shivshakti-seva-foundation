"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  CalendarPlus,
  Send,
  Sparkles,
  Eye,
  HeartPulse,
} from "lucide-react";
import { toHindiNumerals } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import TraditionalDivider from "./TraditionalDivider";
import RangoliCorner from "./RangoliCorner";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventCountdown() {
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [targetDate] = useState(() => new Date("2026-10-15T09:00:00+05:30"));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isEventPassed, setIsEventPassed] = useState(false);

  // RSVP Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState("1");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function calculateTime() {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsEventPassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleDownloadICS = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shivshakti Seva Foundation//Event Calendar//HI",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:ssf-eye-camp-20261015@shivshaktisevafoundation.org",
      "DTSTAMP:20261001T000000Z",
      "DTSTART:20261015T033000Z",
      "DTEND:20261015T113000Z",
      "SUMMARY:शिवशक्ति सेवा फाउंडेशन — निःशुल्क नेत्र एवं स्वास्थ्य जाँच शिविर",
      "DESCRIPTION:माँ मंगलागौरी परिसर में निःशुल्क नेत्र जाँच\\, चश्मा वितरण एवं सामान्य स्वास्थ्य परामर्श शिविर।",
      "LOCATION:माँ मंगलागौरी\\, गया जी\\, बिहार 823001",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "shivshakti-seva-camp.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detection

    setIsSubmitting(true);
    try {
      const existing = JSON.parse(
        localStorage.getItem("ssf_event_rsvps") || "[]"
      );
      const newEntry = {
        name,
        phone,
        attendees,
        event: "निःशुल्क नेत्र एवं स्वास्थ्य शिविर",
        date: new Date().toISOString(),
      };
      existing.push(newEntry);
      localStorage.setItem("ssf_event_rsvps", JSON.stringify(existing));
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section
      ref={sectionRef}
      id="aagami-shiviram"
      className="relative py-16 bg-gradient-to-b from-brand-cream-50 via-white to-brand-cream-100 overflow-hidden"
    >
      <RangoliCorner position="top-right" size={140} opacity={0.12} />
      <RangoliCorner position="bottom-left" size={140} opacity={0.12} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-saffron-100 border border-brand-saffron-300 text-brand-maroon-900 text-sm font-semibold mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-saffron-600 animate-spin-slow" />
            <span>आगामी वृहद सेवा आयोजन</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-brand-maroon-950 font-bold tracking-tight">
            निःशुल्क नेत्र एवं स्वास्थ्य जाँच शिविर
          </h2>
          <p className="mt-3 text-base sm:text-lg text-brand-maroon-800">
            माँ मंगलागौरी के पावन सान्निध्य में अनुभवी चिकित्सकों द्वारा जरूरतमंद
            परिवारों के लिए निःशुल्क नेत्र परीक्षण, चश्मा वितरण एवं स्वास्थ्य परामर्श
          </p>
          <TraditionalDivider />
        </div>

        {/* Countdown + Event Highlight Card */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-brand-gold-300 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-brand-maroon-900 via-brand-maroon-950 to-brand-maroon-900 text-white p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Event Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3 text-brand-gold-400 font-semibold text-sm sm:text-base">
                  <Calendar className="w-5 h-5 text-brand-saffron-400 shrink-0" />
                  <span>गुरुवार, १५ अक्टूबर २०२६ • प्रातः ०९:०० बजे से</span>
                </div>
                <div className="flex items-start gap-3 text-brand-cream-100 text-sm sm:text-base">
                  <MapPin className="w-5 h-5 text-brand-saffron-400 shrink-0 mt-0.5" />
                  <span>माँ मंगलागौरी शक्तिपीठ परिसर, गया जी (बिहार)</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-brand-cream-200">
                    <Eye className="w-3.5 h-3.5 text-brand-gold-400" /> नेत्र परीक्षण
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-brand-cream-200">
                    <HeartPulse className="w-3.5 h-3.5 text-brand-saffron-400" /> निःशुल्क दवाइयाँ
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs text-brand-cream-200">
                    <Clock className="w-3.5 h-3.5 text-brand-gold-400" /> टोकन प्रणाली
                  </span>
                </div>
              </div>

              {/* Countdown Digits */}
              <div className="lg:col-span-6">
                <div className="text-center sm:text-right mb-3">
                  <span className="text-xs uppercase tracking-widest text-brand-gold-300 font-semibold">
                    शिविर प्रारम्भ होने में शेष समय
                  </span>
                </div>
                {isEventPassed ? (
                  <div className="text-center p-6 bg-brand-maroon-800/60 rounded-2xl border border-brand-gold-500/40">
                    <p className="text-xl font-heading text-brand-gold-300">
                      शिविर सफलता पूर्वक सम्पन्न हुआ
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { val: timeLeft.days, label: "दिन" },
                      { val: timeLeft.hours, label: "घंटे" },
                      { val: timeLeft.minutes, label: "मिनट" },
                      { val: timeLeft.seconds, label: "सेकंड" },
                    ].map((slot, idx) => (
                      <div
                        key={idx}
                        className="bg-brand-maroon-950/80 border border-brand-gold-500/50 rounded-2xl p-3 sm:p-4 text-center shadow-inner"
                      >
                        <span className="block text-2xl sm:text-4xl font-heading font-bold text-brand-gold-400">
                          {toHindiNumerals(String(slot.val).padStart(2, "0"))}
                        </span>
                        <span className="text-[11px] sm:text-xs text-brand-cream-200 font-medium">
                          {slot.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Bar inside the card */}
          <div className="bg-brand-cream-100 border-t border-brand-gold-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-brand-maroon-800 font-medium text-center sm:text-left">
              💡 शिविर में आने वाले सभी बंधुओं के लिए जल-पान एवं विश्राम की पूर्ण व्यवस्था रहेगी।
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDownloadICS}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-brand-gold-400 text-brand-maroon-900 font-semibold text-xs sm:text-sm hover:bg-brand-gold-50 active:scale-95 transition shadow-xs"
              >
                <CalendarPlus className="w-4 h-4 text-brand-saffron-600" />
                <span>कैलेंडर में जोड़ें (.ics)</span>
              </button>
            </div>
          </div>
        </div>

        {/* RSVP / Registration Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-brand-gold-300 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-heading text-brand-maroon-900 font-bold">
              शिविर उपस्थिति पूर्व-पंजीकरण (RSVP)
            </h3>
            <p className="text-xs sm:text-sm text-brand-maroon-700 mt-1">
              पूर्व-पंजीकरण से शिविर व्यवस्था एवं टोकन आवंटन में सहायता मिलती है
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h4 className="text-lg font-heading text-emerald-900 font-bold">
                पंजीकरण सफलतापूर्वक दर्ज हुआ!
              </h4>
              <p className="text-sm text-emerald-800 mt-2">
                सादर धन्यवाद, <strong>{name}</strong> जी। आपका शिविर टोकन सुरक्षित कर लिया गया है।
                कृपया निर्धारित समय पर माँ मंगलागौरी परिसर पधारें।
              </p>
              <div className="mt-4 pt-4 border-t border-emerald-200 flex justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  अन्य सदस्य का पंजीकरण करें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              {/* Honeypot field for anti-bot */}
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                    आपका पूरा नाम *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. राहुल कुमार शर्मा"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-cream-400 bg-brand-cream-50/50 text-brand-maroon-950 text-sm focus:border-brand-saffron-600 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                    मोबाइल नंबर (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="१० अंकों का मोबाइल नंबर"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-cream-400 bg-brand-cream-50/50 text-brand-maroon-950 text-sm focus:border-brand-saffron-600 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-maroon-900 mb-1">
                  उपस्थित होने वाले व्यक्तियों की संख्या
                </label>
                <select
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-cream-400 bg-brand-cream-50/50 text-brand-maroon-950 text-sm focus:border-brand-saffron-600 focus:bg-white focus:outline-none transition"
                >
                  <option value="1">१ व्यक्ति (स्वयं)</option>
                  <option value="2">२ व्यक्ति (पारिवारिक सदस्य सहित)</option>
                  <option value="3">३ व्यक्ति</option>
                  <option value="4+">४ या अधिक व्यक्ति</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-saffron-600 to-brand-saffron-700 hover:from-brand-saffron-700 hover:to-brand-saffron-800 text-white font-heading font-bold text-base shadow-md hover:shadow-lg active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>पंजीकरण किया जा रहा है...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>शिविर हेतु निःशुल्क पंजीकरण करें</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
