"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "/images/gallery/flood_relief_action.jpg",
  afterImage = "/images/gallery/hero_community.jpg",
  beforeLabel = "आपदा से पहले / विपदा की स्थिति",
  afterLabel = "फाउंडेशन के सहयोग के बाद — सुरक्षित परिवार",
  title = "जमीनी सेवा का वास्तविक प्रभाव — पहले और बाद में",
  description = "स्लाइडर को दाएँ-बाएँ खिसकाकर देखें कि आपके सहयोग से किस प्रकार संकटग्रस्त परिवारों के जीवन में सुरक्षा व स्वावलंबन आया।",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(5, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <div className="w-full my-8 bg-brand-cream-50/70 p-4 sm:p-6 rounded-3xl border border-brand-gold-300 shadow-md">
      {/* Title & Info */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold-100 border border-brand-gold-300 text-brand-maroon-900 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-saffron-600" />
          <span>प्रत्यक्ष परिवर्तन प्रमाण</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-heading text-brand-maroon-950 font-bold">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-brand-maroon-700 mt-1">
          {description}
        </p>
      </div>

      {/* Slider Visual Container */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="पहले और बाद की तुलना स्लाइडर"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={5}
        aria-valuemax={95}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-brand-gold-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-gold-400"
      >
        {/* After Image (Background - Revealed) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-emerald-800/90 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Before Image (Foreground - Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute top-4 left-4 bg-brand-maroon-900/90 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-saffron-600 border-2 border-white shadow-xl flex items-center justify-center text-white">
            <ArrowLeftRight className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Bottom Helper Instruction */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[11px] font-medium pointer-events-none flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold-300" />
          <span>तुलना के लिए स्लाइडर को खींचें</span>
        </div>
      </div>
    </div>
  );
}
