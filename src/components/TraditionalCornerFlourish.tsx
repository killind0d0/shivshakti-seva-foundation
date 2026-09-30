"use client";

import React from "react";

interface TraditionalCornerFlourishProps {
  color?: string; // default gold
  size?: number; // default 28px
  className?: string;
}

export default function TraditionalCornerFlourish({
  color = "#d4af37",
  size = 28,
  className = "",
}: TraditionalCornerFlourishProps) {
  const cornerSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none select-none opacity-85"
    >
      {/* Outer corner L */}
      <path
        d="M2 34 V12 C2 6 6 2 12 2 H34"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Inner decorative curl */}
      <path
        d="M6 26 V14 C6 9 9 6 14 6 H26"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Corner floral dot */}
      <circle cx="10" cy="10" r="2.5" fill={color} />
      <circle cx="20" cy="6" r="1.2" fill={color} />
      <circle cx="6" cy="20" r="1.2" fill={color} />
    </svg>
  );

  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Top-Left */}
      <div className="absolute top-2 left-2">{cornerSvg}</div>

      {/* Top-Right */}
      <div className="absolute top-2 right-2 transform scale-x-[-1]">
        {cornerSvg}
      </div>

      {/* Bottom-Left */}
      <div className="absolute bottom-2 left-2 transform scale-y-[-1]">
        {cornerSvg}
      </div>

      {/* Bottom-Right */}
      <div className="absolute bottom-2 right-2 transform scale-[-1]">
        {cornerSvg}
      </div>
    </div>
  );
}
