"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-4 p-8 rounded-2xl border border-brand-maroon-100 shadow-sm bg-brand-cream-50/50">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-800 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-heading font-bold text-brand-maroon-950">
          कुछ गलत हो गया
        </h2>
        <p className="text-sm text-brand-charcoal-600 leading-relaxed">
          तकनीकी समस्या के कारण यह पृष्ठ प्रदर्शित नहीं हो सका। कृपया पुनः प्रयास करें अथवा हेल्पलाइन (+91 91171 35379) पर संपर्क करें।
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-maroon-900 hover:bg-brand-maroon-950 text-white font-bold text-sm shadow-md transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>पुनः प्रयास करें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
