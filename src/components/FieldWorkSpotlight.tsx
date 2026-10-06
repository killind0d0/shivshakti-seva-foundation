"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Camera,
  MapPin,
  Calendar,
  Users,
  Eye,
  PlusCircle,
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Upload,
} from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ModalPortal from "./ModalPortal";
import { useLanguage } from "@/context/LanguageContext";
import { openWhatsAppDirect } from "@/utils/whatsappHelper";

interface FieldStory {
  id: string;
  titleHi: string;
  titleEn: string;
  categoryHi: string;
  categoryEn: string;
  badgeColor: string;
  dateHi: string;
  dateEn: string;
  locationHi: string;
  locationEn: string;
  beneficiariesHi: string;
  beneficiariesEn: string;
  image: string;
  summaryHi: string;
  summaryEn: string;
  fullStoryHi: string;
  fullStoryEn: string;
  keyOutcomesHi: string[];
  keyOutcomesEn: string[];
}

const initialStories: FieldStory[] = [
  {
    id: "flood-relief-mission",
    titleHi: "आपदा ग्रस्त बस्तियों में आपातकालीन राशन एवं वस्त्र राहत अभियान",
    titleEn: "Emergency Ration & Clothing Relief Mission in Flood-Affected Areas",
    categoryHi: "बाढ़ एवं आपदा राहत",
    categoryEn: "Flood & Disaster Relief",
    badgeColor: "bg-red-700 text-white",
    dateHi: "हालिया अभियान",
    dateEn: "Recent Mission",
    locationHi: "जलमग्न ग्रामीण अंचल एवं राहत शिविर",
    locationEn: "Inundated Rural Belts & Relief Shelters",
    beneficiariesHi: "३५०+ प्रभावित परिवार",
    beneficiariesEn: "350+ Affected Families",
    image: "/images/gallery/flood_relief_action.jpg",
    summaryHi:
      "अचानक आई बाढ़ के पानी से कटे दूरदराज के क्षेत्रों में नावों और स्थानीय स्वयंसेवकों के माध्यम से सूखा राशन, शुद्ध पेयजल तथा सुरक्षित वस्त्र पहुँचाए गए।",
    summaryEn:
      "In remote hamlets cut off by sudden flood waters, our volunteers navigated boats and footpaths to deliver essential dry rations, clean drinking water, and dry clothes.",
    fullStoryHi:
      "शिवशक्ति सेवा फाउंडेशन की आपातकालीन राहत टुकड़ी ने स्थानीय प्रशासन और युवाओं के सहयोग से जलमग्न बस्तियों तक राहत सामग्री पहुँचाई। हर किट में आटा, चावल, दालें, नमक, मसाले, तिरपाल, माचिस, मोमबत्ती और प्राथमिक दवाएं शामिल थीं। बुजुर्गों और शिशुओं वाले परिवारों को विशेष प्राथमिकता दी गई।",
    fullStoryEn:
      "The rapid response team of Shivshakti Seva Foundation, alongside local youth volunteers, delivered essential relief kits to submerged villages. Each family received flour, rice, pulses, salt, tarpaulins, candles, and emergency medicines, prioritizing households with infants and elderly members.",
    keyOutcomesHi: [
      "३५०+ जरूरतमंद परिवारों को सुरक्षित सूखा राशन",
      "शिशुओं एवं महिलाओं के लिए स्वच्छ वस्त्र व प्राथमिक स्वास्थ्य किट",
      "पानी उतरने तक निरंतर भोजन पैकेट वितरण का संकल्प",
    ],
    keyOutcomesEn: [
      "Secured dry ration kits delivered to 350+ vulnerable families",
      "Clean clothing and primary hygiene supplies for women and infants",
      "Committed daily food distribution until water levels fully recede",
    ],
  },
  {
    id: "women-empowerment-camp",
    titleHi: "ग्रामीण बहनों के लिए निशुल्क हुनर प्रशिक्षण एवं स्वावलंबन कार्यशाला",
    titleEn: "Free Skill Development & Self-Reliance Workshop for Rural Women",
    categoryHi: "महिला स्वावलंबन",
    categoryEn: "Women Self-Reliance",
    badgeColor: "bg-amber-700 text-white",
    dateHi: "प्रगति पर",
    dateEn: "Ongoing Program",
    locationHi: "कौशल विकास केंद्र, गयाजी, बिहार",
    locationEn: "Skill Development Center, GayaJi, Bihar",
    beneficiariesHi: "४५+ प्रशिक्षित बहनें",
    beneficiariesEn: "45+ Trained Women",
    image: "/images/gallery/women_support.jpg",
    summaryHi:
      "आर्थिक रूप से कमजोर परिवारों की महिलाओं को आत्मनिर्भर बनाने हेतु सिलाई, हस्तशिल्प एवं स्वरोजगार का व्यावहारिक प्रशिक्षण दिया गया।",
    summaryEn:
      "Hands-on vocational training in tailoring, embroidery, and handicraft production designed to enable sustainable domestic livelihoods for rural women.",
    fullStoryHi:
      "महिला सशक्तिकरण का वास्तविक अर्थ है उन्हें स्वावलंबन के साधन प्रदान करना। इस कार्यशाला में बहनों को व्यावसायिक कटिंग, सिलाई तकनीक तथा स्थानीय बाजार में उत्पाद बिक्री का मार्गदर्शन दिया गया ताकि वे सम्मानपूर्वक अपने परिवार की आय में योगदान दे सकें।",
    fullStoryEn:
      "True empowerment lies in economic self-reliance. This workshop provided comprehensive hands-on training in contemporary garment fabrication, fabric cutting, and market linkages so participants can establish micro-enterprises and generate sustainable income.",
    keyOutcomesHi: [
      "४५+ महिलाओं को आधुनिक कटिंग व सिलाई का सीधा प्रशिक्षण",
      "स्वरोजगार एवं स्थानीय उत्पादन आर्डर से सीधा जुड़ाव",
      "परिवार की आमदनी में आत्मनिर्भर योगदान का मार्ग प्रशस्त",
    ],
    keyOutcomesEn: [
      "45+ women trained in modern garment stitching and craft skills",
      "Direct linkage with local handicraft and tailoring orders",
      "Pathway created for sustainable supplementary household income",
    ],
  },
  {
    id: "annapurna-food-camp",
    titleHi: "अस्पताल परिसर एवं असहाय बस्तियों में दैनिक पौष्टिक भोजन सेवा",
    titleEn: "Daily Nutritious Food Relief outside Hospitals and Underserved Belts",
    categoryHi: "अन्नपूर्णा सेवा",
    categoryEn: "Annapurna Seva",
    badgeColor: "bg-emerald-800 text-white",
    dateHi: "दैनिक सेवा",
    dateEn: "Daily Program",
    locationHi: "सदर अस्पताल व गयाजी क्षेत्र",
    locationEn: "District Hospital & GayaJi Area",
    beneficiariesHi: "५००+ नागरिक प्रतिदिन",
    beneficiariesEn: "500+ Individuals Daily",
    image: "/images/gallery/food_distribution.jpg",
    summaryHi:
      "अस्पताल में भर्ती मरीजों के परिजनों एवं सड़कों पर जीवन यापन करने वाले असहाय वृद्धजनों को सम्मानपूर्वक गरमा-गरम सात्विक भोजन उपलब्ध कराया गया।",
    summaryEn:
      "Fresh, warm, hygienic meals served with dignity to attendants of hospitalized patients and vulnerable persons in need of daily nourishment.",
    fullStoryHi:
      "अस्पतालों में दूरदराज से आने वाले गरीब परिजनों के पास भोजन का भी संकट रहता है। शिवशक्ति सेवा फाउंडेशन के स्वयंसेवक प्रतिदिन शुद्ध, ताजा और पौष्टिक भोजन तैयार कर सेवाभाव से परोसते हैं। हमारा प्रयास है कि कोई भी व्यक्ति भूख से व्याकुल न रहे।",
    fullStoryEn:
      "Impoverished families traveling from distant villages to government hospitals often struggle to afford basic meals. Volunteers from Shivshakti Seva Foundation prepare and distribute wholesome meals with devotion every single day to ensure no one remains hungry.",
    keyOutcomesHi: [
      "दैनिक ५०० से अधिक जरूरतमंदों को भरपेट पौष्टिक आहार",
      "पूर्ण स्वच्छता एवं सनातन आतिथ्य सत्कार के साथ वितरण",
      "कोई भी व्यक्ति भूखा न सोए — इस संकल्प की सिद्धि",
    ],
    keyOutcomesEn: [
      "500+ wholesome nutritious meals served daily across critical spots",
      "Prepared under stringent hygienic standards and served with warmth",
      "Dedicated mission to eradicate hunger outside public hospitals",
    ],
  },
  {
    id: "health-care-camp",
    titleHi: "निशुल्क स्वास्थ्य परीक्षण एवं प्राथमिक उपचार शिविर — बुजुर्गों की विशेष देखभाल",
    titleEn: "Free General Health Screening & Medical Camp for Elders & Children",
    categoryHi: "स्वास्थ्य सेवा",
    categoryEn: "Healthcare Mission",
    badgeColor: "bg-blue-800 text-white",
    dateHi: "विगत सप्ताह",
    dateEn: "Recent Camp",
    locationHi: "सेवा केंद्र परिसर, गयाजी, बिहार",
    locationEn: "Seva Center, GayaJi, Bihar",
    beneficiariesHi: "२००+ वृद्धजन एवं बच्चे",
    beneficiariesEn: "200+ Elders & Children",
    image: "/images/gallery/healthcare_camp.jpg",
    summaryHi:
      "वरिष्ठ चिकित्सकों के सानिध्य में सामान्य जांच, रक्तचाप व मधुमेह परीक्षण एवं निशुल्क आवश्यक दवाओं का वितरण सुनिश्चित किया गया।",
    summaryEn:
      "Qualified medical professionals provided free general health checkups, blood sugar and pressure screening, and essential medicines.",
    fullStoryHi:
      "स्वास्थ्य ही जीवन का आधार है। धन के अभाव में कई बुजुर्ग अपनी बीमारियों को छिपाते रहते हैं। इस शिविर में रक्तचाप, मधुमेह व सामान्य स्वास्थ्य की जांच कर निशुल्क आवश्यक दवाइयाँ वितरित की गईं तथा गंभीर मामलों में उच्च चिकित्सालयों में मार्गदर्शन प्रदान किया गया।",
    fullStoryEn:
      "Healthcare accessibility remains a core barrier for marginalized rural elders. This camp provided thorough health diagnostics, free doctor consultations, and generic medicines, with dedicated referral support for patients needing secondary hospitalization.",
    keyOutcomesHi: [
      "२००+ ग्रामीणों की संपूर्ण स्वास्थ्य जांच",
      "निशुल्क आवश्यक दवाओं एवं परामर्श का वितरण",
      "गंभीर रोगियों के लिए अग्रिम चिकित्सा सहायता का प्रबंध",
    ],
    keyOutcomesEn: [
      "200+ villagers received free medical screening and consultations",
      "Free dispensing of essential diagnostic tests and prescribed drugs",
      "Referral assistance established for chronic and advanced patients",
    ],
  },
];

export default function FieldWorkSpotlight() {
  const { isEn, t } = useLanguage();
  const [stories, setStories] = useState<FieldStory[]>(initialStories);
  const [featuredStory, setFeaturedStory] = useState<FieldStory>(initialStories[0]);
  const [selectedStoryModal, setSelectedStoryModal] = useState<FieldStory | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Load ground photos added by Admin or authorized Staff
  useEffect(() => {
    const loadGroundPhotos = () => {
      try {
        const stored = localStorage.getItem("ssf_ground_photos");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const formatted: FieldStory[] = parsed.map((p: any) => ({
              id: p.id,
              titleHi: p.title,
              titleEn: p.titleEn || p.title,
              categoryHi: p.category || "धरातल सेवा कार्य",
              categoryEn: p.categoryEn || "Ground Welfare Work",
              badgeColor: "bg-brand-maroon-800 text-brand-gold-300",
              dateHi: p.date || "हालिया कार्य",
              dateEn: p.dateEn || "Recent Activity",
              locationHi: p.location || "गयाजी, बिहार, भारत",
              locationEn: p.locationEn || "GayaJi, Bihar, India",
              beneficiariesHi: "धरातल पर लाभान्वित बंधु",
              beneficiariesEn: "Direct Ground Beneficiaries",
              image: p.image || "/images/gallery/sevadar-working.png",
              summaryHi: p.summary,
              summaryEn: p.summaryEn || p.summary,
              fullStoryHi: p.fullStory || p.summary,
              fullStoryEn: p.fullStoryEn || p.summary,
              keyOutcomesHi: [
                "धरातल पर प्रत्यक्ष सहायता",
                `अधिकृत सेवादार द्वारा प्रलेखित: ${p.addedBy || "शिवशक्ति टीम"}`,
              ],
              keyOutcomesEn: [
                "Direct verified field assistance",
                `Documented by authorized sevadar: ${p.addedBy || "Shivshakti Team"}`,
              ],
            }));
            setStories([...formatted, ...initialStories]);
            setFeaturedStory(formatted[0]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadGroundPhotos();
    window.addEventListener("storage", loadGroundPhotos);
    return () => window.removeEventListener("storage", loadGroundPhotos);
  }, []);

  // Form state for uploading/submitting field report
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterPhone: "",
    category: "बाढ़ एवं आपदा राहत",
    location: "",
    date: "",
    title: "",
    storyDetails: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.reporterName || !formData.location) return;

    const newStory: FieldStory = {
      id: `user-report-${Date.now()}`,
      titleHi: formData.title,
      titleEn: formData.title,
      categoryHi: formData.category,
      categoryEn: formData.category,
      badgeColor: "bg-brand-saffron-700 text-white",
      dateHi: formData.date || "हालिया धरातल रिपोर्ट",
      dateEn: formData.date || "Recent Field Report",
      locationHi: formData.location,
      locationEn: formData.location,
      beneficiariesHi: "स्थानीय ग्रामीण जन",
      beneficiariesEn: "Local Community Members",
      image: "/images/gallery/ration_kits.jpg",
      summaryHi: formData.storyDetails.slice(0, 140) + "...",
      summaryEn: formData.storyDetails.slice(0, 140) + "...",
      fullStoryHi: formData.storyDetails,
      fullStoryEn: formData.storyDetails,
      keyOutcomesHi: [
        "धरातल पर त्वरित सेवा एवं राहत सामग्री वितरण",
        "स्थानीय स्वयंसेवकों की सक्रिय भागीदारी",
        "संबंधित परिवारों तक प्रत्यक्ष सहायता",
      ],
      keyOutcomesEn: [
        "Immediate ground relief and ration supply distribution",
        "Active grassroots participation by local volunteers",
        "Direct assistance received by beneficiary households",
      ],
    };

    const waMsg = `📸 *धरातल सेवा रिपोर्ट / छायाचित्र विवरण — शिवशक्ति सेवा फाउंडेशन*\n• शीर्षक: ${formData.title.trim()}\n• रिपोर्टर का नाम: ${formData.reporterName.trim()}\n• फ़ोन नंबर: ${formData.reporterPhone.trim() || "लागू नहीं"}\n• श्रेणी: ${formData.category}\n• सेवा स्थान: ${formData.location.trim()}\n• दिनांक: ${formData.date.trim() || new Date().toLocaleDateString("hi-IN")}\n• विवरण: ${formData.storyDetails.trim() || "धरातल सेवा गतिविधि"}\n\nसत्यापन उपरांत वेबसाइट पर प्रकाशित करने की कृपा करें।`;

    // Immediately open WhatsApp so the field report reaches the foundation
    openWhatsAppDirect(waMsg);

    // Also send to API
    try {
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formData.reporterName,
          phone: formData.reporterPhone || "9117135379",
          subject: `धरातल रिपोर्ट: ${formData.title}`,
          message: `[श्रेणी: ${formData.category}, स्थान: ${formData.location}] ${formData.storyDetails}`,
          location: formData.location,
        }),
      }).catch(() => {});
    } catch {}

    setStories([newStory, ...stories]);
    setFeaturedStory(newStory);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsUploadOpen(false);
      setFormData({
        reporterName: "",
        reporterPhone: "",
        category: "बाढ़ एवं आपदा राहत",
        location: "",
        date: "",
        title: "",
        storyDetails: "",
      });
    }, 2200);
  };

  const getTitle = (s: FieldStory) => (isEn ? s.titleEn : s.titleHi);
  const getCategory = (s: FieldStory) => (isEn ? s.categoryEn : s.categoryHi);
  const getDate = (s: FieldStory) => (isEn ? s.dateEn : s.dateHi);
  const getLocation = (s: FieldStory) => (isEn ? s.locationEn : s.locationHi);
  const getBeneficiaries = (s: FieldStory) => (isEn ? s.beneficiariesEn : s.beneficiariesHi);
  const getSummary = (s: FieldStory) => (isEn ? s.summaryEn : s.summaryHi);
  const getFullStory = (s: FieldStory) => (isEn ? s.fullStoryEn : s.fullStoryHi);
  const getKeyOutcomes = (s: FieldStory) => (isEn ? s.keyOutcomesEn : s.keyOutcomesHi);

  return (
    <section
      id="field-work-spotlight"
      className="py-16 sm:py-24 bg-gradient-to-b from-brand-cream-100/60 via-white to-brand-cream-50 border-b border-brand-maroon-100"
      aria-label={t("धरातल सेवा स्पॉटलाइट एवं वास्तविक कहानियाँ", "Field Work Spotlight & Real Stories")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold-100 border border-brand-gold-300 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-brand-saffron-600" />
              <span>{t("धरातल से सीधा दृश्य • हमारी वास्तविक सेवा", "Live from the Ground • Verified Action")}</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
              {t("धरातल सेवा स्पॉटलाइट", "Field Work Spotlight")}
            </h2>
            <p className="text-base sm:text-lg text-brand-charcoal-700 font-normal leading-relaxed">
              {t(
                "विपरीत परिस्थितियों में वास्तविक सेवादारों द्वारा जरूरतमंदों तक पहुँचाई जा रही मदद, राहत और आत्मसम्मान की सजीव कहानियाँ।",
                "Authentic field dispatches documenting food, relief, healthcare, and dignity brought to vulnerable communities in challenging times."
              )}
            </p>
          </div>

          {/* Action button to share/upload field work */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all border border-brand-gold-400/40"
            >
              <PlusCircle className="w-4 h-4 text-brand-gold-400" />
              <span>{t("धरातल कार्य / फ़ोटो साझा करें", "Share Field Report / Photos")}</span>
            </button>
          </div>
        </div>

        {/* Featured Big Spotlight Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-gold-400/40 bg-brand-maroon-950 text-white mb-12 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left: Real Action Photography */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden">
              <Image
                src={featuredStory.image}
                alt={getTitle(featuredStory)}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/30 lg:to-brand-maroon-950" />

              {/* Photo watermark badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>{t("लाइव धरातल फ़ोटो", "Live Ground Photo")}</span>
              </div>
            </div>

            {/* Right: Story details */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative z-10 bg-brand-maroon-950/95 lg:bg-transparent">
              <div className="space-y-4">
                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${featuredStory.badgeColor}`}
                  >
                    {getCategory(featuredStory)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-gold-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>{getDate(featuredStory)}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                  {getTitle(featuredStory)}
                </h3>

                {/* Location & Beneficiaries */}
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-brand-cream-200 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-saffron-400 flex-shrink-0" />
                    <span>{getLocation(featuredStory)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                    <span>{getBeneficiaries(featuredStory)}</span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm sm:text-base text-brand-cream-100 font-normal leading-relaxed pt-2">
                  {getSummary(featuredStory)}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-brand-maroon-800 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedStoryModal(featuredStory)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-saffron-600 to-brand-saffron-700 hover:from-brand-saffron-500 hover:to-brand-saffron-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t("पूरी कहानी व परिणाम पढ़ें", "Read Full Story & Outcomes")}</span>
                </button>
                <a
                  href="#sahyog-dan"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all inline-flex items-center gap-1.5"
                >
                  <span>{t("इस कार्य में सहयोग दें", "Support this Cause")}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Real Ground Impact Before/After Comparison */}
        <BeforeAfterSlider />

        {/* Thumbnail Selector / Story Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stories.map((story) => {
            const isCurrentFeatured = story.id === featuredStory.id;
            return (
              <div
                key={story.id}
                onClick={() => setFeaturedStory(story)}
                className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white ${
                  isCurrentFeatured
                    ? "border-brand-saffron-600 shadow-xl ring-2 ring-brand-saffron-400/50"
                    : "border-brand-maroon-100 hover:border-brand-gold-400 hover:shadow-lg"
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden bg-brand-cream-200">
                  <Image
                    src={story.image}
                    alt={getTitle(story)}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${story.badgeColor}`}
                    >
                      {getCategory(story)}
                    </span>
                  </div>
                  {isCurrentFeatured && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-brand-saffron-600 text-white text-[11px] font-bold flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3 text-brand-gold-300" />
                      <span>{t("प्रदर्शित", "Featured")}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-brand-charcoal-500 mb-1.5 font-medium">
                      <MapPin className="w-3 h-3 text-brand-saffron-600" />
                      <span className="truncate">{getLocation(story)}</span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-brand-maroon-950 line-clamp-2 leading-snug">
                      {getTitle(story)}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-cream-200 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStoryModal(story);
                      }}
                      className="text-xs font-bold text-brand-saffron-700 hover:text-brand-saffron-800 inline-flex items-center gap-1"
                    >
                      <span>{t("विस्तृत विवरण", "View Details")}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] text-brand-charcoal-600 font-medium">
                      {getBeneficiaries(story)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Detail Modal */}
      {selectedStoryModal && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedStoryModal(null)}
          >
            <div
              className="modal-card-after-topbar bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-y-auto shadow-2xl border border-brand-gold-300 relative my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              <div className="relative h-56 sm:h-64 w-full flex-shrink-0">
                <Image
                  src={selectedStoryModal.image}
                  alt={getTitle(selectedStoryModal)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedStoryModal(null)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/30 shadow-lg backdrop-blur-md transition z-10"
                  aria-label={t("बंद करें", "Close")}
                >
                  <span>{t("बंद करें", "Close")}</span>
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded ${selectedStoryModal.badgeColor} mb-2 inline-block`}
                  >
                    {getCategory(selectedStoryModal)}
                  </span>
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-snug">
                    {getTitle(selectedStoryModal)}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 space-y-5">
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-brand-charcoal-600 pb-3 border-b border-brand-cream-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-saffron-600" />
                    <span>{t("दिनांक:", "Date:")} {getDate(selectedStoryModal)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-saffron-600" />
                    <span>{t("स्थान:", "Location:")} {getLocation(selectedStoryModal)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-gold-600" />
                    <span>{t("लाभार्थी:", "Beneficiaries:")} {getBeneficiaries(selectedStoryModal)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-brand-maroon-900 mb-2">
                    {t("धरातल का वास्तविक विवरण", "Field Work Narrative")}
                  </h4>
                  <p className="text-sm sm:text-base text-brand-charcoal-700 leading-relaxed font-normal">
                    {getFullStory(selectedStoryModal)}
                  </p>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-brand-maroon-900 mb-3">
                    {t("मुख्य परिणाम एवं प्रभाव", "Key Outcomes & Impact")}
                  </h4>
                  <ul className="space-y-2">
                    {getKeyOutcomes(selectedStoryModal).map((outcome, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-charcoal-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-brand-cream-300 flex items-center justify-between">
                  <span className="text-xs text-brand-charcoal-500">
                    {t("शिवशक्ति सेवा फाउंडेशन • सेवा ही धर्म", "Shivshakti Seva Foundation • Service is Worship")}
                  </span>
                  <button
                    onClick={() => setSelectedStoryModal(null)}
                    className="px-5 py-2 rounded-xl bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                  >
                    {t("बंद करें", "Close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      {/* Upload/Share Field Report Modal */}
      {isUploadOpen && (
        <ModalPortal>
          <div
            role="dialog"
            aria-modal="true"
            className="modal-after-topbar flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsUploadOpen(false)}
          >
            <div
              className="modal-card-after-topbar bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl border border-brand-gold-400 relative overflow-y-auto my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsUploadOpen(false)}
                className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-brand-cream-100 hover:bg-brand-cream-200 text-brand-charcoal-700 text-xs font-semibold flex items-center gap-1.5 border border-brand-maroon-200 shadow-sm transition z-10"
                aria-label={t("बंद करें", "Close")}
              >
                <span>{t("बंद करें", "Close")}</span>
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5 pr-16 sm:pr-0">
                <div className="w-10 h-10 rounded-xl bg-brand-maroon-100 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-brand-maroon-800" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-maroon-950">
                    {t("धरातल कार्य एवं फ़ोटो साझा करें", "Share Field Report & Photos")}
                  </h3>
                  <p className="text-xs text-brand-charcoal-600">
                    {t(
                      "सेवादार या प्रत्यक्षदर्शी अपनी फील्ड रिपोर्ट यहाँ दर्ज करें",
                      "Volunteers and eyewitnesses can document ground updates here"
                    )}
                  </p>
                </div>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-heading text-lg font-bold text-emerald-900">
                    {t("आपकी धरातल रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है!", "Your Field Report Has Been Successfully Submitted!")}
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    {t(
                      "फाउंडेशन की टीम द्वारा सत्यापन के उपरांत यह विवरण व छायाचित्र स्पॉटलाइट में प्रदर्शित किया जाएगा। आपके सेवाभाव को नमन।",
                      "After verification by our coordination team, this record and imagery will be published to the spotlight. Thank you for your service."
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        {t("आपका नाम *", "Your Name *")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t("उदा. राहुल शर्मा", "e.g. John Doe / Rahul Sharma")}
                        value={formData.reporterName}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterName: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        {t("संपर्क फ़ोन नंबर *", "Contact Phone Number *")}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="उदा. 9117135379"
                        value={formData.reporterPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterPhone: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        {t("कार्य का प्रकार / श्रेणी", "Category of Service")}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      >
                        <option value={t("बाढ़ एवं आपदा राहत", "Disaster & Flood Relief")}>{t("बाढ़ एवं आपदा राहत", "Disaster & Flood Relief")}</option>
                        <option value={t("महिला स्वावलंबन", "Women Self-Reliance")}>{t("महिला स्वावलंबन", "Women Self-Reliance")}</option>
                        <option value={t("अन्न एवं वस्त्र दान", "Food & Clothing Relief")}>{t("अन्न एवं वस्त्र दान", "Food & Clothing Relief")}</option>
                        <option value={t("स्वास्थ्य एवं चिकित्सा शिविर", "Health & Medical Camps")}>
                          {t("स्वास्थ्य एवं चिकित्सा शिविर", "Health & Medical Camps")}
                        </option>
                        <option value={t("सामाजिक कल्याण एवं शिक्षा", "Social Welfare & Education")}>
                          {t("सामाजिक कल्याण एवं शिक्षा", "Social Welfare & Education")}
                        </option>
                        <option value={t("धार्मिक व सांस्कृतिक रक्षा", "Cultural & Heritage Preservation")}>
                          {t("धार्मिक व सांस्कृतिक रक्षा", "Cultural & Heritage Preservation")}
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        {t("स्थान / क्षेत्र *", "Location / District *")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t("उदा. गयाजी, बिहार", "e.g. GayaJi, Bihar")}
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                      {t("सेवा अभियान का शीर्षक *", "Title of Service Initiative *")}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t("उदा. बाढ़ प्रभावित परिवारों को भोजन किट वितरण", "e.g. Relief kits distribution in flood affected areas")}
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                      {t("धरातल सेवा का विवरण एवं अनुभव *", "Field Work Narrative & Details *")}
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={t(
                        "कहाँ सेवा हुई, कितने लोगों तक सहायता पहुँची और क्या आवश्यकताएं हैं...",
                        "Where did the service take place, how many families were assisted, and current needs..."
                      )}
                      value={formData.storyDetails}
                      onChange={(e) =>
                        setFormData({ ...formData, storyDetails: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                    />
                  </div>

                  {/* Photo upload placeholder box */}
                  <div className="p-3 border-2 border-dashed border-brand-gold-400 rounded-xl bg-brand-gold-50/50 text-center">
                    <Camera className="w-5 h-5 text-brand-maroon-700 mx-auto mb-1" />
                    <p className="text-[11px] font-bold text-brand-maroon-900">
                      {t("छायाचित्र / फ़ोटो चुनें (वैकल्पिक)", "Choose Photographs / Documents (Optional)")}
                    </p>
                    <p className="text-[10px] text-brand-charcoal-500 mb-2">
                      PNG, JPG, JPEG (Max 10MB)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="text-[11px] text-brand-charcoal-600 file:mr-2 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-brand-maroon-800 file:text-white hover:file:bg-brand-maroon-900 cursor-pointer"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsUploadOpen(false)}
                      className="px-4 py-2 rounded-lg border border-brand-charcoal-300 text-xs font-semibold text-brand-charcoal-700 hover:bg-brand-cream-100"
                    >
                      {t("रद्द करें", "Cancel")}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-brand-saffron-600 hover:bg-brand-saffron-700 text-white text-xs font-bold shadow-md transition"
                    >
                      {t("धरातल रिपोर्ट जमा करें", "Submit Field Report")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
