"use client";

import { useState, useEffect } from "react";

const BASE_VISITOR_COUNT = 1480;

export function useVisitorCount(): number {
  const [visitorCount, setVisitorCount] = useState<number>(BASE_VISITOR_COUNT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ssf_browser_visits");
      let current = stored ? parseInt(stored, 10) : 0;
      if (isNaN(current) || current < 0) current = 0;
      current += 1;
      localStorage.setItem("ssf_browser_visits", current.toString());
      setVisitorCount(BASE_VISITOR_COUNT + current);
    } catch {
      setVisitorCount(BASE_VISITOR_COUNT + 1);
    }
  }, []);

  return visitorCount;
}
