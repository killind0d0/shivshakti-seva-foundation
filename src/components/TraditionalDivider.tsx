"use client";

import React from "react";

interface TraditionalDividerProps {
  color?: "gold" | "maroon" | "white";
  className?: string;
  variant?: "lotus" | "mandala" | "diya";
}

export default function TraditionalDivider({
  color = "gold",
  className = "my-4",
  variant = "lotus",
}: TraditionalDividerProps) {
  const isWhite = color === "white";
  const strokeColor = isWhite ? "#ffffff" : color === "maroon" ? "#7c1119" : "#d4af37";
  const glowColor = isWhite ? "rgba(255,255,255,0.4)" : "#e0bf58";

  return (
    <div
      className={`flex items-center justify-center gap-3 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Ornate Line with traditional spiral flourish */}
      <svg
        className="w-20 sm:w-28 h-4 overflow-visible"
        viewBox="0 0 120 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 H95 C102 8 106 3 112 5 C116 7 114 12 110 12 C106 12 105 8 108 6"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="8" r="1.5" fill={strokeColor} />
        <circle cx="55" cy="8" r="2" fill={strokeColor} />
      </svg>

      {/* Center Sacred Indian Emblem / Motif */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-[10px] font-bold" style={{ color: strokeColor }}>
          ✦
        </span>
        {variant === "lotus" ? (
          /* Stylized Sacred Lotus SVG */
          <svg
            className="w-7 h-7"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center Petal */}
            <path
              d="M16 4 C14 10 13 18 16 26 C19 18 18 10 16 4 Z"
              fill={strokeColor}
              opacity="0.9"
            />
            {/* Left Petals */}
            <path
              d="M16 12 C11 12 7 17 8 23 C11 23 14 21 16 19"
              stroke={strokeColor}
              strokeWidth="1.2"
              fill={strokeColor}
              fillOpacity="0.25"
            />
            <path
              d="M16 16 C8 17 4 23 6 27 C10 27 13 25 16 23"
              stroke={strokeColor}
              strokeWidth="1"
              fill={strokeColor}
              fillOpacity="0.15"
            />
            {/* Right Petals */}
            <path
              d="M16 12 C21 12 25 17 24 23 C21 23 18 21 16 19"
              stroke={strokeColor}
              strokeWidth="1.2"
              fill={strokeColor}
              fillOpacity="0.25"
            />
            <path
              d="M16 16 C24 17 28 23 26 27 C22 27 19 25 16 23"
              stroke={strokeColor}
              strokeWidth="1"
              fill={strokeColor}
              fillOpacity="0.15"
            />
            {/* Base water line */}
            <path
              d="M10 28 C13 29 19 29 22 28"
              stroke={strokeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Stylized Diya / Mandala */
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flame */}
            <path
              d="M12 2 C10 6 9 9 12 13 C15 9 14 6 12 2 Z"
              fill={strokeColor}
            />
            {/* Clay Bowl */}
            <path
              d="M5 14 C5 19 19 19 19 14 Z"
              stroke={strokeColor}
              strokeWidth="1.5"
              fill={strokeColor}
              fillOpacity="0.2"
            />
          </svg>
        )}
        <span className="text-[10px] font-bold" style={{ color: strokeColor }}>
          ✦
        </span>
      </div>

      {/* Right Ornate Line (Mirrored) */}
      <svg
        className="w-20 sm:w-28 h-4 overflow-visible transform scale-x-[-1]"
        viewBox="0 0 120 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 8 H95 C102 8 106 3 112 5 C116 7 114 12 110 12 C106 12 105 8 108 6"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="8" r="1.5" fill={strokeColor} />
        <circle cx="55" cy="8" r="2" fill={strokeColor} />
      </svg>
    </div>
  );
}
