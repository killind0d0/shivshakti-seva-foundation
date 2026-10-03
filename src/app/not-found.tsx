import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-brand-maroon-200">
        <div className="w-20 h-20 mx-auto rounded-full bg-brand-maroon-100 text-brand-maroon-800 flex items-center justify-center text-3xl font-bold font-heading">
          ४०४
        </div>
        <div className="space-y-2">
          <h1 className="font-heading text-2xl font-bold text-brand-maroon-950">
            पृष्ठ नहीं मिला (Page Not Found)
          </h1>
          <p className="text-sm text-brand-charcoal-600 leading-relaxed">
            क्षमा करें, जिस पृष्ठ की आप खोज कर रहे हैं वह उपलब्ध नहीं है अथवा हटा दिया गया है।
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-maroon-800 hover:bg-brand-maroon-900 text-white font-semibold text-sm shadow-md transition"
          >
            <Home className="w-4 h-4 text-brand-gold-400" />
            <span>मुख्य पृष्ठ पर वापस जाएं</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
