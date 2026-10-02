import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-2xl border border-brand-maroon-100 shadow-sm bg-brand-cream-50/50">
        <div className="text-4xl font-extrabold text-brand-maroon-900 font-heading">
          404
        </div>
        <h2 className="text-xl font-heading font-bold text-brand-maroon-950">
          पृष्ठ नहीं मिला
        </h2>
        <p className="text-sm text-brand-charcoal-600 leading-relaxed">
          आप जिस पृष्ठ को खोज रहे हैं वह उपलब्ध नहीं है अथवा स्थानांतरित कर दिया गया है।
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>मुखपृष्ठ पर जाएँ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
