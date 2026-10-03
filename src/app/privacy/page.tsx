import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "गोपनीयता नीति | शिवशक्ति सेवा फाउंडेशन",
  description: "शिवशक्ति सेवा फाउंडेशन की गोपनीयता नीति (Privacy Policy)",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-cream-100 text-brand-charcoal-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-brand-maroon-100">
        
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-brand-maroon-700 hover:text-brand-maroon-900 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य पृष्ठ पर लौटें</span>
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-maroon-900 mb-6 pb-4 border-b-2 border-brand-gold-300">
          गोपनीयता नीति (Privacy Policy)
        </h1>
        
        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>अंतिम अद्यतन:</strong> ०१ अक्टूबर २०२६
          </p>

          <p>
            शिवशक्ति सेवा फाउंडेशन ("हम", "हमारा", "संस्था") आपके द्वारा साझा की गई जानकारी की गोपनीयता और सुरक्षा के प्रति प्रतिबद्ध है। यह गोपनीयता नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट और सेवाओं का उपयोग करते हैं, तो हम आपकी जानकारी को कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            १. हम क्या जानकारी एकत्र करते हैं?
          </h2>
          <p>हम निम्नलिखित व्यक्तिगत जानकारी एकत्र कर सकते हैं:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>व्यक्तिगत पहचान:</strong> नाम, फोन नंबर, ईमेल पता, शहर/जिला, और पूर्ण पता।</li>
            <li><strong>फॉर्म डेटा:</strong> यह जानकारी हमारे ५ विभिन्न फॉर्म (स्वयंसेवक, संपर्क, सहायता अनुरोध, महिला प्रतियोगिता, दान रसीद) के माध्यम से एकत्र की जाती है।</li>
            <li><strong>तकनीकी डेटा:</strong> वेबसाइट विज़िटर की संख्या और ब्राउज़िंग प्राथमिकताओं को ट्रैक करने के लिए स्थानीय संग्रहण (localStorage) डेटा (जैसे ssf_volunteers, ssf_foundation_data आदि)।</li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            २. हम आपकी जानकारी का उपयोग कैसे करते हैं?
          </h2>
          <p>एकत्र की गई जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए किया जाता है:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>सहायता अनुरोधों (Help Requests) का समन्वय और समाधान करने के लिए।</li>
            <li>दान रसीदें जारी करने और दाताओं के साथ पत्राचार के लिए।</li>
            <li>स्वयंसेवकों (Volunteers) के साथ संचार स्थापित करने के लिए।</li>
            <li>महिला स्वावलंबन प्रतियोगिताओं के पंजीकरण और समन्वय के लिए।</li>
            <li>हमारे व्हाट्सएप कम्युनिटी ग्रुप में आपको जोड़ने और फाउंडेशन की गतिविधियों की सूचना देने के लिए।</li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ३. फोन नंबर और व्हाट्सएप ग्रुप
          </h2>
          <p>
            आपके द्वारा प्रदान किया गया फोन नंबर हमारे आधिकारिक व्हाट्सएप कम्युनिटी ग्रुप में जोड़ने के लिए उपयोग किया जा सकता है। हम इसका उपयोग केवल संस्था के अभियानों, राहत कार्यों और आवश्यक सूचनाओं के प्रसार के लिए करते हैं। हम आपका नंबर किसी भी तृतीय-पक्ष विज्ञापनदाता को नहीं बेचते या साझा नहीं करते हैं।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ४. यूपीआई (UPI) और दान संबंधी डेटा
          </h2>
          <p>
            दान के लिए हम सुरक्षित यूपीआई और बैंकिंग गेटवे का उपयोग करते हैं। हम आपके बैंक खाते या क्रेडिट/डेबिट कार्ड के संवेदनशील वित्तीय विवरण (जैसे पिन या पासवर्ड) अपनी वेबसाइट या सर्वर पर संगृहीत नहीं करते हैं। दान की जानकारी केवल रसीद जनरेशन और वैधानिक ऑडिट उद्देश्यों के लिए सहेजी जाती है।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ५. लोकल स्टोरेज (Local Storage) और कुकीज़
          </h2>
          <p>
            हम वेबसाइट की कार्यक्षमता बढ़ाने और आपके ब्राउज़िंग अनुभव को बेहतर बनाने के लिए ब्राउज़र के लोकल स्टोरेज का उपयोग करते हैं। इसमें फॉर्म ड्राफ्ट, विज़िटर काउंट, और साइट प्राथमिकताएँ शामिल हैं। आप अपने ब्राउज़र सेटिंग्स के माध्यम से किसी भी समय इस डेटा को हटा सकते हैं।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ६. डेटा संरक्षण और प्रतिधारण (Data Retention)
          </h2>
          <p>
            हम आपकी जानकारी को अनधिकृत पहुँच, परिवर्तन या विनाश से बचाने के लिए उचित सुरक्षा उपाय अपनाते हैं। आपकी व्यक्तिगत जानकारी केवल तब तक सहेजी जाती है जब तक कि उसे एकत्र करने के उद्देश्यों (जैसे सेवा प्रदान करना या कानूनी दायित्वों का पालन करना) को पूरा करने के लिए आवश्यक हो।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ७. आपके अधिकार और संपर्क
          </h2>
          <p>
            आप अपनी व्यक्तिगत जानकारी की समीक्षा करने, उसे अपडेट करने, या हमारे डेटाबेस से हटाने का अनुरोध कर सकते हैं। डेटा से संबंधित किसी भी पूछताछ या शिकायत के लिए, कृपया हमसे संपर्क करें:
          </p>
          <div className="bg-brand-cream-50 p-4 rounded-lg border border-brand-maroon-100 mt-4">
            <p><strong>शिवशक्ति सेवा फाउंडेशन</strong></p>
            <p>पता: माँ मंगलागौरी, गया जी (बिहार) - ८२३००१</p>
            <p>ईमेल: <a href="mailto:akashgiri91171@gmail.com" className="text-brand-maroon-700 hover:underline">akashgiri91171@gmail.com</a></p>
            <p>फोन: <a href="tel:+919117135379" className="text-brand-maroon-700 hover:underline">+91 91171 35379</a></p>
            <p>वेबसाइट: <a href="https://shivshaktisevafoundation.in" className="text-brand-maroon-700 hover:underline">www.shivshaktisevafoundation.in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
