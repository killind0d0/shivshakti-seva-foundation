import { FoundationData } from "./foundationData";

export interface BilingualService {
  id: string;
  title: { hi: string; en: string };
  shortDesc: { hi: string; en: string };
  fullDesc: { hi: string; en: string };
  highlights: { hi: string[]; en: string[] };
}

export const englishServices: Record<string, { title: string; shortDesc: string; fullDesc: string; highlights: string[] }> = {
  "samajik-kalyan": {
    title: "Social Welfare & Empowerment",
    shortDesc: "Comprehensive social upliftment, legal guidance, and basic rights protection for destitute and underprivileged communities.",
    fullDesc: "Shivshakti Seva Foundation identifies families, destitute individuals, and disabled persons at the grassroots level, providing them with legal counseling, food supplies, clothes, and livelihood support to live with self-respect.",
    highlights: [
      "Direct identification and relief for needy families",
      "Special welfare initiatives for the disabled and destitute",
      "Social security and administrative legal guidance",
      "Community support and holistic rehabilitation",
    ],
  },
  "dharmik-sahayata": {
    title: "Sacred Spiritual Assistance",
    shortDesc: "Support for sacred religious rituals, pilgrimages, and traditional ceremonies for underprivileged families.",
    fullDesc: "In Indian ethos, service and spirituality are inseparable. We provide financial and material assistance for marriage ceremonies, ancestral rites, and religious events for poor families, as well as holy pilgrimage assistance for the elderly.",
    highlights: [
      "Marriage and sacred ritual support for daughters of poor families",
      "Pilgrimage and holy temple visits for underprivileged elders",
      "Community food kitchens (Annakshetra) during sacred festivals",
      "Cleanliness and medical service camps at pilgrimage shrines",
    ],
  },
  "sanskritik-raksha": {
    title: "Cultural Heritage Preservation",
    shortDesc: "Preserving and promoting Sanatan heritage, moral values, folk arts, and historic traditions.",
    fullDesc: "Safeguarding our ancient cultural legacy and instilling noble values in the younger generation is our solemn duty. We organize cultural workshops, folk art festivals, and moral education sessions across communities.",
    highlights: [
      "Promotion of traditional folk arts and indigenous culture",
      "Sanatan moral value and character-building workshops for children",
      "Preservation of historic and sacred cultural heritage",
      "Cultural awareness and national unity initiatives",
    ],
  },
  "swasthya-sewa": {
    title: "Healthcare & Medical Relief",
    shortDesc: "24x7 emergency medical assistance, free health camps, essential medicines, and patient support.",
    fullDesc: "No human being should suffer or lose a life due to inability to afford medical care. We conduct free diagnostic camps with specialist doctors, distribute life-saving medicines, assist with cataract eye surgeries, and run a 24x7 emergency medical helpline.",
    highlights: [
      "24x7 Emergency Medical Helpline (+91 91171 35379)",
      "Free medical checkup and medicine distribution camps",
      "Eye examinations, free spectacles, and cataract surgery support",
      "Hospital admission assistance and emergency blood coordination",
    ],
  },
  "sakshik-sewa": {
    title: "Education Support & Child Care",
    shortDesc: "School kits, books, bags, tuition fee assistance, free evening coaching, and value-based learning.",
    fullDesc: "Education is the greatest tool for social transformation. The Foundation provides school bags, books, stationery, and fee scholarships to bright students facing poverty, while running evening tuition centers in underserved villages.",
    highlights: [
      "Distribution of free textbooks, notebooks, bags, and stationery",
      "Tuition fee scholarships for deserving underprivileged students",
      "Free evening coaching and moral learning centers in villages",
      "Digital literacy training and competitive exam guidance",
    ],
  },
  "paryavaran": {
    title: "Environmental Protection & Greening",
    shortDesc: "Mass plantation drives, water body rejuvenation, plastic-free campaigns, and green planet initiatives.",
    fullDesc: "Protecting Mother Earth is protecting life itself. We conduct massive tree plantation drives, clean and conserve sacred water bodies (ponds, wells), raise awareness against single-use plastic, and establish eco-clubs in schools.",
    highlights: [
      "Massive tree plantation and plant adoption pledge",
      "Water body restoration and rainwater harvesting awareness",
      "Plastic-free campaign and distribution of eco-friendly cloth bags",
      "Cleanliness drives and environmental rallies",
    ],
  },
  "aapda-raahat": {
    title: "Disaster Relief & Emergency Rescue",
    shortDesc: "Rapid ground rescue during floods, fire outbreaks, and disasters with dry ration, tarpaulins, and shelter.",
    fullDesc: "During natural disasters, our dedicated sevadar teams are first on the ground with rescue boats, waterproof tarpaulins, clean drinking water, emergency food packets, and medical kits, followed by long-term house repair and rehabilitation.",
    highlights: [
      "Rapid disaster response and emergency rescue volunteer corps",
      "Waterproof tarpaulin shelters and emergency lighting",
      "Safe drinking water purification tablets and first aid kits",
      "Post-disaster home repair and livelihood rehabilitation",
    ],
  },
  "mahila-vikas": {
    title: "Women Empowerment & Self-Reliance",
    shortDesc: "Handicrafts & vocational skill training, self-employment mentoring, production orders, and startup equipment support.",
    fullDesc: "Empowering women socio-economically creates stronger communities. We organize self-reliance workshops for trained women, assisting them with commercial production orders, startup toolkits, and equipment to launch their own home enterprises.",
    highlights: [
      "Vocational skill mentoring and self-employment support",
      "Sustained production orders and enterprise assistance for women",
      "Handicrafts, small cottage business, and entrepreneurship centers",
      "Menstrual hygiene awareness and nutritional care kits",
    ],
  },
  "yuva-vikas": {
    title: "Youth Guidance & Nation Building",
    shortDesc: "Skill training, de-addiction counseling, sports promotion, and nation-building orientation for youth.",
    fullDesc: "Youth are the heartbeat of the nation. We steer youth energy towards positive social leadership through technical skill workshops, personality development, anti-drug counseling, and sports competitions.",
    highlights: [
      "Job-oriented skill development and technical guidance",
      "Youth anti-addiction and mental well-being counseling",
      "Sports tournaments and athletic kit distribution for rural talent",
      "Active volunteer leadership network for community service",
    ],
  },
  "anna-vastra-daan": {
    title: "Food & Warm Clothes Donation",
    shortDesc: "Dignified hot meals for the hungry, seasonal clothing, blankets, and monthly ration kit distribution.",
    fullDesc: "Feeding the hungry is the highest form of service. Through our mobile service kitchens, we distribute hot, nutritious meals, monthly ration kits (rice, flour, pulses, cooking oil) to destitute families, and warm blankets during extreme winters.",
    highlights: [
      "Daily and weekly free hot meal kitchens (Langar/Annakshetra)",
      "Monthly dry ration kits for impoverished and vulnerable families",
      "Winter warm clothes and blanket distribution drives",
      "Dignified clothing distribution through community clothes banks",
    ],
  },
};

export const englishCampaign = {
  title: "Flood Relief & Rehabilitation Mission 2026",
  subtitle: "Standing by affected families with compassionate humanitarian aid in crisis",
  badge: "Active Priority Mission",
  objective:
    "Delivering immediate emergency relief to thousands of villagers stranded by monsoon river inundations, followed by permanent home repairs and clean drinking water restoration.",
  affectedRegion: "Flood-affected rural districts and low-lying regions",
  neededHelp: [
    "Dry ration kits (Flour, Lentils, Rice, Cooking Oil, Salt, Biscuits)",
    "Clean drinking water pouches and water-purifying chlorine tablets",
    "Waterproof tarpaulin sheets and sturdy tie ropes",
    "Emergency medical supplies and ORS rehydration packs",
    "Clean dry clothes and blankets for children and senior citizens",
  ],
  workDoneSoFar: [
    "Hot meals and dry rations delivered to 5,200+ displaced families",
    "1,450+ waterproof emergency tarpaulin shelters set up",
    "2,800+ patients treated by 6 mobile medical relief teams",
    "50,000+ liters of safe purified drinking water distributed",
  ],
  nextSteps: [
    "Post-flood sanitation and disinfectant spraying to prevent waterborne epidemics",
    "Building material support for repairing damaged mud houses",
    "Purification and technical repair of submerged tube-wells and handpumps",
    "Livelihood rehabilitation for affected daily-wage laborers and farmers",
  ],
};

export const englishStats = [
  { label: "Families Supported", value: "10,000+", subtext: "Verified Ground Relief" },
  { label: "Disaster Relief Missions", value: "25+", subtext: "Floods & Emergencies" },
  { label: "Meals & Rations Served", value: "50,000+", subtext: "Nutritious Food Packs" },
  { label: "Active Volunteers", value: "1,200+", subtext: "Dedicated Sevadars" },
];

export const englishGeneral = {
  foundationName: "Shivshakti Seva Foundation",
  foundationTagline: "Humanity Service • Compassion • Rehabilitation",
  address: "GayaJi, Bihar, India",
  motto: "Service is not mere charity, but our sacred duty towards humanity.",
  phoneLabel: "+91 91171 35379 (24x7 Helpline)",
  officeHours: "24x7 Available Always (Round-the-clock service)",
  nav: {
    home: "Home",
    about: "About Us",
    services: "Our Services",
    campaigns: "Campaigns",
    impact: "Impact",
    contact: "Contact",
    donate: "Support / Donate",
    requestHelp: "Request Help",
    visitorCount: "Visitors",
    foundersMessage: "Founder's Message",
    dailyPledge: "Today's Service Pledge",
    fieldSpotlight: "Field Spotlight",
    specialProgram: "Special Program",
    whatsappGroup: "WhatsApp Group",
    gallery: "Photo Gallery",
    news: "News & Events",
    transparency: "Transparency",
    timeline: "Journey Timeline",
    admin: "Admin Portal",
  },
  hero: {
    badge: "Service is not mere charity, but our sacred duty towards humanity",
    headlineLine1: "Humanity Service • Relief Work • Rehabilitation",
    headlineLine2: "Standing with every vulnerable family in times of crisis",
    subtext:
      "Shivshakti Seva Foundation is a dedicated charitable organization based in GayaJi, Bihar, serving underprivileged families, flood victims, and children with free food, healthcare, and education.",
    btnDonate: "Support / Donate",
    btnHelp: "Request Help",
    directRelief: "100% Direct Ground Relief",
    transparencyReport: "Transparency Report",
    phoneAssistance: "24×7 Assistance Helpline:",
  },
  quickImpact: {
    heading: "Verified Ground Impact & Public Trust",
    subheading: "Every contribution directly reaches those who need it most.",
  },
  about: {
    badge: "Who We Are",
    heading: "Selfless Service to Humanity & Sanatan Values",
    lead: "Shivshakti Seva Foundation is rooted in the sacred city of GayaJi, Bihar, dedicated to alleviating human suffering through immediate disaster relief, nutrition, healthcare, and sustainable community empowerment.",
    missionTitle: "Our Sacred Mission",
    missionText:
      "To ensure that no destitute person is left hungry, no flood victim is left shelterless, and no child is denied education due to poverty.",
    pillarsTitle: "Four Core Pillars of Our Foundation",
    pillars: [
      {
        title: "Humanity Service",
        desc: "Serving every living being with selfless devotion seeing the divine in all.",
      },
      {
        title: "Social Equality",
        desc: "Dignity, respect, and aid for every individual regardless of caste, creed, or background.",
      },
      {
        title: "Rapid Disaster Relief",
        desc: "Immediate on-ground deployment of boats, tarpaulins, and ration during floods and crises.",
      },
      {
        title: "Community Upliftment",
        desc: "Sustainable self-reliance through schooling, vocational skills, and women empowerment.",
      },
    ],
    btnLearnMore: "Read Complete Mission & Constitution",
  },
  foundersVision: {
    badge: "Founder's Vision",
    heading: "Letter from the Chief Sevadar",
    quote: "True religion is that which wipes the tears of the suffering and kindles hope in their hearts.",
    author: "Shri Akash Giri (Chief Sevadar & Founder)",
    role: "Shivshakti Seva Foundation, GayaJi (Bihar)",
    paragraphs: [
      "Welcome to Shivshakti Seva Foundation. From the day of our inception, our mission has been clear: reach the unreached, stand by those whom circumstance has pushed to the margins, and serve unconditionally.",
      "Whether it is midnight rescue operations during the ferocious Bihar floods, feeding hungry souls at sacred shrines, or putting textbooks into the eager hands of village children, we believe service is not charity—it is our sacred duty towards humanity.",
      "We invite every kind-hearted citizen and well-wisher across India and the world to join hands with us in this noble movement.",
    ],
    verifiedPledge: "100% Transparent Financial Management • Zero Waste • Direct Grassroots Impact",
  },
  services: {
    badge: "What We Do",
    heading: "Our 10 Core Welfare Services",
    subheading: "Delivering holistic relief, education, healthcare, and empowerment across communities.",
    btnRequestHelp: "Request Aid for this Service",
    btnLearnMore: "View Service Details",
  },
  donation: {
    badge: "Sacred Contribution",
    heading: "Support Our Relief & Welfare Initiatives",
    subheading: "Your donation directly feeds hungry families, buys tarpaulins for flood victims, and educates children.",
    directUpi: "Direct UPI Contribution (Instant 0% Fee)",
    bankTransfer: "Official Bank Account Details (NEFT / RTGS / IMPS)",
    bankName: "Bank:",
    accountName: "Account Name:",
    accountNo: "Account No:",
    ifsc: "IFSC Code:",
    branch: "Branch:",
    taxNote: "80G Income Tax Exemption certificate is in legal processing.",
    contactNotice: "For NEFT/RTGS receipts and donation queries, please contact our office directly at +91 91171 35379.",
    verifiedBadge: "Verified Official Account of Shivshakti Seva Foundation",
    btnCopyUpi: "Copy UPI ID",
    btnScanPay: "Scan QR Code to Donate",
  },
  transparency: {
    badge: "Trust & Accountability",
    heading: "Committed to 100% Transparent Governance",
    subheading: "We maintain complete public accountability with verified reports and audited records.",
    regNumberLabel: "Registered Address:",
    regAddress: "GayaJi, Bihar, India",
    auditStatus: "Annual Financial Audit & Reports Available for Public Review",
  },
  footer: {
    aboutText:
      "Shivshakti Seva Foundation is a registered charitable trust based in GayaJi, Bihar, India, committed to selfless humanitarian aid, flood relief, food kitchens, medical camps, and child education.",
    quickLinks: "Quick Navigation",
    servicesHeading: "Our Services",
    contactHeading: "Official Headquarters",
    address: "GayaJi, Bihar, India",
    phone: "+91 91171 35379 (24×7 Available)",
    email: "akashgiri91171@gmail.com",
    copyright: "© 2026 Shivshakti Seva Foundation. All Rights Reserved.",
    visitorCountLabel: "Total Verified Visitors:",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms & Conditions",
    developedWithLove: "Dedicated with devotion to the service of humanity",
  },
};
