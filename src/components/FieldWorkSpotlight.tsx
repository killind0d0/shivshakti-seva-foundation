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

interface FieldStory {
  id: string;
  title: string;
  category: string;
  badgeColor: string;
  date: string;
  location: string;
  beneficiaries: string;
  image: string;
  summary: string;
  fullStory: string;
  keyOutcomes: string[];
}

const initialStories: FieldStory[] = [
  {
    id: "flood-relief-mission",
    title: "आपदा ग्रस्त बस्तियों में आपातकालीन राशन एवं वस्त्र राहत अभियान",
    category: "बाढ़ एवं आपदा राहत",
    badgeColor: "bg-red-700 text-white",
    date: "हालिया अभियान",
    location: "जलमग्न ग्रामीण अंचल एवं राहत शिविर",
    beneficiaries: "३५०+ प्रभावित परिवार",
    image: "/images/gallery/flood_relief_action.jpg",
    summary:
      "अचानक आई बाढ़ के पानी से कटे दूरदराज के क्षेत्रों में नावों और स्थानीय स्वयंसेवकों के माध्यम से सूखा राशन, शुद्ध पेयजल तथा सुरक्षित वस्त्र पहुँचाए गए।",
    fullStory:
      "शिवशक्ति सेवा फाउंडेशन की आपातकालीन राहत टुकड़ी ने स्थानीय प्रशासन और युवाओं के सहयोग से जलमग्न बस्तियों तक राहत सामग्री पहुँचाई। हर किट में आटा, चावल, दालें, नमक, मसाले, तिरपाल, माचिस, मोमबत्ती और प्राथमिक दवाएं शामिल थीं। बुजुर्गों और शिशुओं वाले परिवारों को विशेष प्राथमिकता दी गई।",
    keyOutcomes: [
      "३५०+ जरूरतमंद परिवारों को सुरक्षित सूखा राशन",
      "शिशुओं एवं महिलाओं के लिए स्वच्छ वस्त्र व प्राथमिक स्वास्थ्य किट",
      "पानी उतरने तक निरंतर भोजन पैकेट वितरण का संकल्प",
    ],
  },
  {
    id: "women-empowerment-camp",
    title: "ग्रामीण बहनों के लिए निशुल्क सिलाई प्रशिक्षण एवं स्वावलंबन कार्यशाला",
    category: "महिला स्वावलंबन",
    badgeColor: "bg-amber-700 text-white",
    date: "प्रगति पर",
    location: "कौशल विकास केंद्र",
    beneficiaries: "४५+ प्रशिक्षित बहनें",
    image: "/images/gallery/women_support.jpg",
    summary:
      "आर्थिक रूप से कमजोर परिवारों की महिलाओं को आत्मनिर्भर बनाने हेतु सिलाई, कढ़ाई एवं हस्तशिल्प का व्यावहारिक प्रशिक्षण दिया गया।",
    fullStory:
      "महिला सशक्तिकरण केवल भाषणों से नहीं बल्कि स्वावलंबन के ठोस औजारों से संभव है। इसी सोच के साथ फाउंडेशन ने प्रशिक्षण पूर्ण करने वाली बहनों के बीच एक विशेष प्रतियोगिता आयोजित की है। जीतने वाली बहनों को घर बैठे काम के ऑर्डर और सिलाई मशीन उपहार दी जा रही है।",
    keyOutcomes: [
      "४५+ महिलाओं को आधुनिक कटिंग व स्टिचिंग का सीधा प्रशिक्षण",
      "प्रतियोगिता द्वारा शीर्ष प्रतिभाओं को तत्काल कार्य आर्डर",
      "परिवार की आमदनी में आत्मनिर्भर योगदान का मार्ग प्रशस्त",
    ],
  },
  {
    id: "annapurna-food-camp",
    title: "अस्पताल परिसर एवं असहाय बस्तियों में दैनिक पौष्टिक भोजन सेवा",
    category: "अन्नपूर्णा सेवा",
    badgeColor: "bg-emerald-800 text-white",
    date: "दैनिक सेवा",
    location: "सदर अस्पताल व बस्ती क्षेत्र",
    beneficiaries: "५००+ नागरिक प्रतिदिन",
    image: "/images/gallery/food_distribution.jpg",
    summary:
      "अस्पताल में भर्ती मरीजों के परिजनों एवं सड़कों पर जीवन यापन करने वाले असहाय वृद्धजनों को सम्मानपूर्वक गरमा-गरम सात्विक भोजन उपलब्ध कराया गया।",
    fullStory:
      "अस्पतालों में दूरदराज से आने वाले गरीब परिजनों के पास भोजन का भी संकट रहता है। शिवशक्ति सेवा फाउंडेशन के स्वयंसेवक प्रतिदिन शुद्ध, ताजा और पौष्टिक भोजन तैयार कर सेवाभाव से परोसते हैं। हमारा प्रयास है कि कोई भी व्यक्ति भूख से व्याकुल न रहे।",
    keyOutcomes: [
      "दैनिक ५०० से अधिक जरूरतमंदों को भरपेट पौष्टिक आहार",
      "पूर्ण स्वच्छता एवं सनातन आतिथ्य सत्कार के साथ वितरण",
      "कोई भी व्यक्ति भूखा न सोए — इस संकल्प की सिद्धि",
    ],
  },
  {
    id: "health-eye-camp",
    title: "निशुल्क नेत्र एवं स्वास्थ्य परीक्षण शिविर — बुजुर्गों की विशेष देखभाल",
    category: "स्वास्थ्य सेवा",
    badgeColor: "bg-blue-800 text-white",
    date: "विगत सप्ताह",
    location: "सेवा केंद्र परिसर",
    beneficiaries: "२००+ वृद्धजन एवं बच्चे",
    image: "/images/gallery/healthcare_camp.jpg",
    summary:
      "वरिष्ठ चिकित्सकों के सानिध्य में सामान्य जांच, मोतियाबिंद परीक्षण एवं निशुल्क आवश्यक दवाओं का वितरण सुनिश्चित किया गया।",
    fullStory:
      "स्वास्थ्य ही जीवन का आधार है। धन के अभाव में कई बुजुर्ग अपनी बीमारियों को छिपाते रहते हैं। इस शिविर में रक्तचाप, मधुमेह, नेत्र जांच कर निशुल्क चश्मे और दवाइयाँ वितरित की गईं तथा गंभीर मामलों में उच्च चिकित्सालयों में मार्गदर्शन प्रदान किया गया।",
    keyOutcomes: [
      "२००+ ग्रामीणों की संपूर्ण स्वास्थ्य जांच",
      "निशुल्क आवश्यक दवाओं एवं परामर्श का वितरण",
      "गंभीर रोगियों के लिए अग्रिम चिकित्सा सहायता का प्रबंध",
    ],
  },
];

export default function FieldWorkSpotlight() {
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
              title: p.title,
              category: p.category || "धरातल सेवा कार्य",
              badgeColor: "bg-brand-maroon-800 text-brand-gold-300",
              date: p.date || "हालिया कार्य",
              location: p.location || "माँ मंगलागौरी, गया जी",
              beneficiaries: "धरातल पर लाभान्वित बंधु",
              image: p.image || "/images/gallery/sevadar-working.png",
              summary: p.summary,
              fullStory: p.fullStory || p.summary,
              keyOutcomes: [
                "धरातल पर प्रत्यक्ष सहायता",
                `अधिकृत सेवादार द्वारा प्रलेखित: ${p.addedBy || "शिवशक्ति टीम"}`,
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
      title: formData.title,
      category: formData.category,
      badgeColor: "bg-brand-saffron-700 text-white",
      date: formData.date || "हालिया धरातल रिपोर्ट",
      location: formData.location,
      beneficiaries: "स्थानीय ग्रामीण जन",
      image: "/images/gallery/ration_kits.jpg", // fallback default
      summary: formData.storyDetails.slice(0, 140) + "...",
      fullStory: formData.storyDetails,
      keyOutcomes: [
        "धरातल पर त्वरित सेवा एवं राहत सामग्री वितरण",
        "स्थानीय स्वयंसेवकों की सक्रिय भागीदारी",
        "संबंधित परिवारों तक प्रत्यक्ष सहायता",
      ],
    };

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

  return (
    <section
      id="field-work-spotlight"
      className="py-16 sm:py-24 bg-gradient-to-b from-brand-cream-100/60 via-white to-brand-cream-50 border-b border-brand-maroon-100"
      aria-label="धरातल सेवा स्पॉटलाइट एवं वास्तविक कहानियाँ"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold-100 border border-brand-gold-300 text-brand-maroon-900 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-brand-saffron-600" />
              <span>धरातल से सीधा दृश्य • हमारी वास्तविक सेवा</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-maroon-950 tracking-tight">
              धरातल सेवा स्पॉटलाइट
            </h2>
            <p className="text-base sm:text-lg text-brand-charcoal-700 font-normal leading-relaxed">
              विपरीत परिस्थितियों में वास्तविक सेवादारों द्वारा जरूरतमंदों तक पहुँचाई जा रही
              मदद, राहत और आत्मसम्मान की सजीव कहानियाँ।
            </p>
          </div>

          {/* Action button to share/upload field work */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsUploadOpen(true)}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all border border-brand-gold-400/40"
            >
              <PlusCircle className="w-4 h-4 text-brand-gold-400" />
              <span>धरातल कार्य / फ़ोटो साझा करें</span>
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
                alt={featuredStory.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/30 lg:to-brand-maroon-950" />

              {/* Photo watermark badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>लाइव धरातल फ़ोटो</span>
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
                    {featuredStory.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-gold-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold-400" />
                    <span>{featuredStory.date}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                  {featuredStory.title}
                </h3>

                {/* Location & Beneficiaries */}
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-brand-cream-200 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-saffron-400 flex-shrink-0" />
                    <span>{featuredStory.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-gold-400 flex-shrink-0" />
                    <span>{featuredStory.beneficiaries}</span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-sm sm:text-base text-brand-cream-100 font-normal leading-relaxed pt-2">
                  {featuredStory.summary}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-brand-maroon-800 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedStoryModal(featuredStory)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-saffron-600 to-brand-saffron-700 hover:from-brand-saffron-500 hover:to-brand-saffron-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>पूरी कहानी व परिणाम पढ़ें</span>
                </button>
                <a
                  href="#sahyog"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all inline-flex items-center gap-1.5"
                >
                  <span>इस कार्य में सहयोग दें</span>
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
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${story.badgeColor}`}
                    >
                      {story.category}
                    </span>
                  </div>
                  {isCurrentFeatured && (
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-brand-saffron-600 text-white text-[11px] font-bold flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3 text-brand-gold-300" />
                      <span>प्रदर्शित</span>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-brand-charcoal-500 mb-1.5 font-medium">
                      <MapPin className="w-3 h-3 text-brand-saffron-600" />
                      <span className="truncate">{story.location}</span>
                    </div>
                    <h4 className="font-heading text-sm font-bold text-brand-maroon-950 line-clamp-2 leading-snug">
                      {story.title}
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
                      <span>विस्तृत विवरण</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] text-brand-charcoal-600 font-medium">
                      {story.beneficiaries}
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
                  alt={selectedStoryModal.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <button
                  onClick={() => setSelectedStoryModal(null)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/30 shadow-lg backdrop-blur-md transition z-10"
                  aria-label="बंद करें"
                >
                  <span>बंद करें</span>
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-5 right-5 sm:left-6 sm:right-6">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded ${selectedStoryModal.badgeColor} mb-2 inline-block`}
                  >
                    {selectedStoryModal.category}
                  </span>
                  <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-snug">
                    {selectedStoryModal.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 space-y-5">
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-brand-charcoal-600 pb-3 border-b border-brand-cream-300">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-saffron-600" />
                    <span>दिनांक: {selectedStoryModal.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-saffron-600" />
                    <span>स्थान: {selectedStoryModal.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-gold-600" />
                    <span>लाभार्थी: {selectedStoryModal.beneficiaries}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-brand-maroon-900 mb-2">
                    धरातल का वास्तविक विवरण
                  </h4>
                  <p className="text-sm sm:text-base text-brand-charcoal-700 leading-relaxed font-normal">
                    {selectedStoryModal.fullStory}
                  </p>
                </div>

                <div>
                  <h4 className="font-heading text-base font-bold text-brand-maroon-900 mb-3">
                    मुख्य परिणाम एवं प्रभाव
                  </h4>
                  <ul className="space-y-2">
                    {selectedStoryModal.keyOutcomes.map((outcome, idx) => (
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
                    शिवशक्ति सेवा फाउंडेशन • सेवा ही धर्म
                  </span>
                  <button
                    onClick={() => setSelectedStoryModal(null)}
                    className="px-5 py-2 rounded-xl bg-brand-maroon-900 text-white text-xs font-bold hover:bg-brand-maroon-950 transition"
                  >
                    बंद करें
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
                aria-label="बंद करें"
              >
                <span>बंद करें</span>
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-5 pr-16 sm:pr-0">
                <div className="w-10 h-10 rounded-xl bg-brand-maroon-100 flex items-center justify-center flex-shrink-0">
                  <Upload className="w-5 h-5 text-brand-maroon-800" />
                </div>
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-maroon-950">
                    धरातल कार्य एवं फ़ोटो साझा करें
                  </h3>
                  <p className="text-xs text-brand-charcoal-600">
                    सेवादार या प्रत्यक्षदर्शी अपनी फील्ड रिपोर्ट यहाँ दर्ज करें
                  </p>
                </div>
              </div>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-heading text-lg font-bold text-emerald-900">
                    आपकी धरातल रिपोर्ट सफलतापूर्वक दर्ज कर ली गई है!
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    फाउंडेशन की टीम द्वारा सत्यापन के उपरांत यह विवरण व छायाचित्र स्पॉटलाइट में
                    प्रदर्शित किया जाएगा। आपके सेवाभाव को नमन।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        आपका नाम *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. राहुल शर्मा"
                        value={formData.reporterName}
                        onChange={(e) =>
                          setFormData({ ...formData, reporterName: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        संपर्क फ़ोन नंबर *
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
                        कार्य का प्रकार / श्रेणी
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                      >
                        <option value="बाढ़ एवं आपदा राहत">बाढ़ एवं आपदा राहत</option>
                        <option value="महिला स्वावलंबन">महिला स्वावलंबन</option>
                        <option value="अन्न एवं वस्त्र दान">अन्न एवं वस्त्र दान</option>
                        <option value="स्वास्थ्य एवं चिकित्सा शिविर">
                          स्वास्थ्य एवं चिकित्सा शिविर
                        </option>
                        <option value="सामाजिक कल्याण एवं शिक्षा">
                          सामाजिक कल्याण एवं शिक्षा
                        </option>
                        <option value="धार्मिक व सांस्कृतिक रक्षा">
                          धार्मिक व सांस्कृतिक रक्षा
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                        स्थान / क्षेत्र *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. पश्चिमी चंपारण / पटना"
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
                      सेवा अभियान का शीर्षक *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. बाढ़ प्रभावित परिवारों को भोजन किट वितरण"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-brand-maroon-200 focus:border-brand-saffron-600 focus:outline-none bg-brand-cream-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-charcoal-800 mb-1">
                      धरातल सेवा का विवरण एवं अनुभव *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="कहाँ सेवा हुई, कितने लोगों तक सहायता पहुँची और क्या आवश्यकताएं हैं..."
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
                      छायाचित्र / फ़ोटो चुनें (वैकल्पिक)
                    </p>
                    <p className="text-[10px] text-brand-charcoal-500 mb-2">
                      PNG, JPG या JPEG (अधिकतम 10MB)
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
                      रद्द करें
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-brand-saffron-600 hover:bg-brand-saffron-700 text-white text-xs font-bold shadow-md transition"
                    >
                      धरातल रिपोर्ट जमा करें
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
