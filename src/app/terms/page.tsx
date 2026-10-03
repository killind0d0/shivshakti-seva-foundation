import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "नियम एवं शर्तें | शिवशक्ति सेवा फाउंडेशन",
  description: "शिवशक्ति सेवा फाउंडेशन के उपयोग के नियम एवं शर्तें (Terms of Use)",
};

export default function TermsOfUsePage() {
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
          नियम एवं शर्तें (Terms of Use)
        </h1>
        
        <div className="space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            <strong>अंतिम अद्यतन:</strong> ०१ अक्टूबर २०२६
          </p>

          <p>
            शिवशक्ति सेवा फाउंडेशन की वेबसाइट पर आपका स्वागत है। हमारी वेबसाइट का उपयोग करके, आप निम्नलिखित नियमों और शर्तों (Terms of Use) से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया इस वेबसाइट का उपयोग न करें।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            १. वेबसाइट का उपयोग
          </h2>
          <p>
            यह वेबसाइट शिवशक्ति सेवा फाउंडेशन के जनकल्याणकारी कार्यों की जानकारी प्रदान करने और जन-सहयोग प्राप्त करने के उद्देश्य से संचालित है। आप इस साइट का उपयोग केवल वैध और धर्मार्थ उद्देश्यों के लिए करने हेतु सहमत हैं। किसी भी दुर्भावनापूर्ण गतिविधि, डेटा चोरी, या अनधिकृत एक्सेस का प्रयास सख्त वर्जित है।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            २. दान संबंधी शर्तें (Donation Terms)
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>संस्था को दिया जाने वाला प्रत्येक दान पूर्णतः स्वैच्छिक है।</li>
            <li>प्राप्त राशि का उपयोग प्राकृतिक आपदा राहत, भोजन वितरण, शिक्षा, स्वास्थ्य, महिला सशक्तिकरण एवं अन्य जनकल्याणकारी कार्यों में किया जाता है।</li>
            <li>दान की गई राशि सामान्यतः वापस (Refund) नहीं की जाती है। यदि दान प्रक्रिया में कोई तकनीकी त्रुटि होती है, तो आप हमारी संपर्क जानकारी के माध्यम से सहायता का अनुरोध कर सकते हैं।</li>
            <li>हम सभी वित्तीय लेन-देन के लिए सुरक्षित भुगतान गेटवे का उपयोग करते हैं, फिर भी किसी भी तृतीय-पक्ष बैंक या गेटवे की विफलता के लिए संस्था सीधे उत्तरदायी नहीं होगी।</li>
          </ul>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ३. स्वयंसेवक समझौता (Volunteer Agreement)
          </h2>
          <p>
            स्वयंसेवक के रूप में पंजीकरण करके, आप स्वेच्छा से फाउंडेशन के अभियानों में अपना समय और श्रम दान करने के लिए सहमत होते हैं। स्वयंसेवक होना कोई वैतनिक रोजगार नहीं है। फाउंडेशन किसी भी समय बिना पूर्व सूचना के स्वयंसेवकों के पंजीकरण को रद्द करने या अस्वीकार करने का अधिकार सुरक्षित रखता है।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ४. सामग्री अधिकार (Content Rights)
          </h2>
          <p>
            इस वेबसाइट पर उपलब्ध सभी सामग्री, जिसमें लोगो, चित्र, डिज़ाइन, लेख और ग्राफ़िक्स शामिल हैं, शिवशक्ति सेवा फाउंडेशन की संपत्ति हैं। किसी भी अनधिकृत, व्यावसायिक, या भ्रामक प्रयोजन हेतु संस्था के नाम, प्रतीक चिन्ह (Logo) या सामग्री का उपयोग कॉपीराइट कानूनों का उल्लंघन माना जाएगा।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ५. दायित्व की सीमाएं (Liability Limitations)
          </h2>
          <p>
            हम वेबसाइट पर सटीक और अद्यतन जानकारी प्रदान करने का पूरा प्रयास करते हैं। हालाँकि, हम साइट के निर्बाध या त्रुटि-मुक्त होने की गारंटी नहीं देते हैं। शिवशक्ति सेवा फाउंडेशन इस वेबसाइट के उपयोग से होने वाले किसी भी प्रत्यक्ष, अप्रत्यक्ष या आकस्मिक नुकसान के लिए उत्तरदायी नहीं होगा।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ६. शासी कानून (Governing Law)
          </h2>
          <p>
            ये नियम और शर्तें भारत के कानूनों के तहत शासित होंगी। इस वेबसाइट या फाउंडेशन के संचालन से उत्पन्न होने वाला कोई भी विवाद या दावा केवल गया, बिहार, भारत के न्यायालयों के क्षेत्राधिकार के अधीन होगा।
          </p>

          <h2 className="font-heading text-xl font-bold text-brand-maroon-800 mt-8 mb-4">
            ७. शर्तों में संशोधन
          </h2>
          <p>
            फाउंडेशन किसी भी समय इन नियमों और शर्तों को अद्यतन या संशोधित करने का अधिकार सुरक्षित रखता है। कोई भी बदलाव वेबसाइट पर पोस्ट किए जाने के तुरंत बाद प्रभावी होगा।
          </p>

          <div className="bg-brand-cream-50 p-4 rounded-lg border border-brand-maroon-100 mt-8">
            <p className="font-bold text-brand-maroon-900 mb-2">संपर्क सूत्र:</p>
            <p>शिवशक्ति सेवा फाउंडेशन</p>
            <p>माँ मंगलागौरी, गया जी (बिहार) - ८२३००१</p>
            <p>ईमेल: <a href="mailto:akashgiri91171@gmail.com" className="text-brand-maroon-700 hover:underline">akashgiri91171@gmail.com</a></p>
            <p>फोन: <a href="tel:+919117135379" className="text-brand-maroon-700 hover:underline">+91 91171 35379</a></p>
            <p>वेबसाइट: <a href="https://shivshaktifoundation.in" className="text-brand-maroon-700 hover:underline">www.shivshaktifoundation.in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
