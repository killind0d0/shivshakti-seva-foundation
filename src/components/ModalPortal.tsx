"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof document !== "undefined") {
      const prevCount = parseInt(document.body.getAttribute("data-modal-count") || "0", 10);
      const nextCount = prevCount + 1;
      document.body.setAttribute("data-modal-count", nextCount.toString());
      document.body.classList.add("modal-open");
    }

    return () => {
      if (typeof document !== "undefined") {
        const current = parseInt(document.body.getAttribute("data-modal-count") || "1", 10);
        const remaining = Math.max(0, current - 1);
        if (remaining === 0) {
          document.body.removeAttribute("data-modal-count");
          document.body.classList.remove("modal-open");
        } else {
          document.body.setAttribute("data-modal-count", remaining.toString());
        }
      }
    };
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}
