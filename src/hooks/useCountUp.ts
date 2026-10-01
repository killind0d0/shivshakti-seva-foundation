"use client";

import { useEffect, useState } from "react";

// Return standard Arabic/English digits for clear, universal readability
export function toHindiNumerals(numStr: string | number): string {
  return String(numStr);
}

// Convert number to Indian formatted string (e.g., 50,000)
export function formatIndianNumber(val: number): string {
  return new Intl.NumberFormat("en-IN").format(Math.round(val));
}

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number; // in ms
  isInView?: boolean;
  toHindi?: boolean;
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  isInView = true,
  toHindi = false,
}: UseCountUpOptions) {
  const [current, setCurrent] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextValue = Math.round(start + (end - start) * easedProgress);

      setCurrent(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, start, duration, isInView]);

  const formattedFormatted = formatIndianNumber(current);
  return toHindi ? toHindiNumerals(formattedFormatted) : formattedFormatted;
}
