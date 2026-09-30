"use client";

import React from "react";

interface RangoliCornerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: number;
  className?: string;
  opacity?: number;
  color?: string;
}

export default function RangoliCorner({
  position = "top-right",
  size = 320,
  className = "",
  opacity = 0.065,
  color = "#b58d24",
}: RangoliCornerProps) {
  // Transform and position styles based on corner
  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-0 right-0 origin-top-right";
      case "top-left":
        return "top-0 left-0 origin-top-left -scale-x-100";
      case "bottom-right":
        return "bottom-0 right-0 origin-bottom-right -scale-y-100";
      case "bottom-left":
        return "bottom-0 left-0 origin-bottom-left -scale-x-100 -scale-y-100";
      default:
        return "top-0 right-0";
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${getPositionClasses()} ${className}`}
      style={{ width: size, height: size, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Sacred Traditional Indian Rangoli & Kolam Motifs */}
        <g stroke={color} strokeWidth="1.2">
          {/* Outer Curved Boundary of Rangoli */}
          <path
            d="M300,0 C300,165.685 165.685,300 0,300 L0,270 C149.117,270 270,149.117 270,0 Z"
            fill={color}
            fillOpacity="0.04"
          />

          {/* Concentric Decorative Petal Arcs */}
          <path
            d="M300,40 C300,183.594 183.594,300 40,300"
            strokeDasharray="4 4"
          />
          <path
            d="M300,75 C300,199.249 199.249,300 75,300"
          />
          <path
            d="M300,110 C300,214.903 214.903,300 110,300"
            strokeWidth="0.8"
          />

          {/* Intricate Lotus Petals (कमल दल) radiating towards center */}
          {[0, 15, 30, 45, 60, 75, 90].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const r1 = 120;
            const r2 = 210;
            const x1 = 300 - Math.cos(rad) * r1;
            const y1 = Math.sin(rad) * r1;
            const x2 = 300 - Math.cos(rad) * r2;
            const y2 = Math.sin(rad) * r2;
            return (
              <g key={`petal-${i}`}>
                <path
                  d={`M300,0 Q${(x1 + x2) / 2 - 15},${(y1 + y2) / 2 + 15} ${x2},${y2} Q${(x1 + x2) / 2 + 15},${(y1 + y2) / 2 - 15} 300,0`}
                  fill={color}
                  fillOpacity="0.03"
                />
                <circle cx={x2} cy={y2} r="3" fill={color} fillOpacity="0.6" />
              </g>
            );
          })}

          {/* Traditional Paisley / Kairi (अम्बी/कैरी) Accent */}
          <path
            d="M260,35 C280,60 250,110 210,130 C170,150 140,110 160,80 C180,50 240,10 260,35 Z"
            fill={color}
            fillOpacity="0.035"
            strokeWidth="1.2"
          />
          <path
            d="M35,260 C60,280 110,250 130,210 C150,170 110,140 80,160 C50,180 10,240 35,260 Z"
            fill={color}
            fillOpacity="0.035"
            strokeWidth="1.2"
          />

          {/* Central Diya/Mandala Core Arc */}
          <circle cx="300" cy="0" r="45" fill={color} fillOpacity="0.08" />
          <circle cx="300" cy="0" r="70" strokeWidth="1.5" />
          <circle cx="300" cy="0" r="95" strokeDasharray="3 3" />

          {/* Kolam Dots & Floral Crosses */}
          <g fill={color} stroke="none">
            <circle cx="230" cy="70" r="2.5" />
            <circle cx="210" cy="90" r="2.5" />
            <circle cx="190" cy="110" r="3" />
            <circle cx="160" cy="140" r="3" />
            <circle cx="140" cy="160" r="3" />
            <circle cx="110" cy="190" r="3" />
            <circle cx="90" cy="210" r="2.5" />
            <circle cx="70" cy="230" r="2.5" />

            {/* Sacred Lotus Seed Dots */}
            <circle cx="280" cy="15" r="2" />
            <circle cx="260" cy="30" r="2" />
            <circle cx="240" cy="45" r="2" />
            <circle cx="45" cy="240" r="2" />
            <circle cx="30" cy="260" r="2" />
            <circle cx="15" cy="280" r="2" />
          </g>

          {/* Classical Temple Spire Arch Line */}
          <path
            d="M300,160 Q210,180 180,210 Q160,240 160,300"
            strokeWidth="0.8"
            strokeDasharray="6 3"
          />
        </g>
      </svg>
    </div>
  );
}
