import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#7c1119",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shivshaktisevafoundation.in"),
  title: "शिवशक्ति सेवा फाउंडेशन | मानव सेवा • राहत कार्य • पुनर्वास",
  description:
    "शिवशक्ति सेवा फाउंडेशन गरीब, जरूरतमंद, असहाय और प्राकृतिक आपदा से प्रभावित लोगों की सेवा, राहत, भोजन वितरण, शिक्षा एवं स्वास्थ्य सहायता के लिए समर्पित संस्था है।",
  keywords: [
    "शिवशक्ति सेवा फाउंडेशन",
    "सामाजिक सेवा",
    "मानव सेवा",
    "बाढ़ राहत",
    "भोजन वितरण",
    "गरीबों की सहायता",
    "जरूरतमंदों की सहायता",
    "आपदा राहत",
    "पुनर्वास",
    "स्वयंसेवक",
    "दान",
    "सहयोग",
  ],
  authors: [{ name: "शिवशक्ति सेवा फाउंडेशन" }],
  openGraph: {
    title: "शिवशक्ति सेवा फाउंडेशन | सेवा केवल सहायता नहीं, मानवता के प्रति हमारा दायित्व है",
    description:
      "गरीब, असहाय और आपदा प्रभावित परिवारों के साथ मिलकर राहत, पुनर्वास और सम्मानपूर्ण जीवन निर्माण के लिए समर्पित संस्था।",
    url: "https://shivshaktisevafoundation.in",
    siteName: "शिवशक्ति सेवा फाउंडेशन",
    images: [
      {
        url: "/images/logo/official_logo.png",
        width: 1200,
        height: 630,
        alt: "शिवशक्ति सेवा फाउंडेशन का आधिकारिक प्रतीक चिन्ह",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "शिवशक्ति सेवा फाउंडेशन",
    description:
      "मानव सेवा और राहत कार्यों के लिए समर्पित सामाजिक कल्याण संस्था।",
    images: ["/images/logo/official_logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" dir="ltr" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        {/* Structured Data for NGO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "शिवशक्ति सेवा फाउंडेशन",
              alternateName: "Shivshakti Seva Foundation",
              url: "https://shivshaktisevafoundation.in",
              logo: "https://shivshaktisevafoundation.in/images/logo/official_logo.png",
              description:
                "गरीब और जरूरतमंद लोगों की सहायता, बाढ़ एवं प्राकृतिक आपदा राहत, भोजन वितरण और पुनर्वास कार्यों के लिए समर्पित संस्था।",
              areaServed: "भारत",
              knowsLanguage: "hi",
              slogan: "सेवा केवल सहायता नहीं, मानवता के प्रति हमारा दायित्व है।",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-brand-cream-100 text-brand-charcoal-900 antialiased selection:bg-brand-saffron-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
