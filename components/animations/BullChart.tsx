"use client";

import { useEffect, useRef, useState } from "react";

interface BullChartProps {
  active: boolean;
}

const CANDLES = [
  { x: 24, open: 105, close: 96, high: 90, low: 112, bull: true },
  { x: 52, open: 96, close: 102, high: 92, low: 108, bull: false },
  { x: 80, open: 102, close: 88, high: 83, low: 106, bull: true },
  { x: 108, open: 88, close: 92, high: 84, low: 98, bull: false },
  { x: 136, open: 92, close: 74, high: 68, low: 95, bull: true },
  { x: 164, open: 74, close: 78, high: 70, low: 84, bull: false },
  { x: 192, open: 78, close: 54, high: 48, low: 80, bull: true },
  { x: 220, open: 54, close: 38, high: 30, low: 58, bull: true },
  { x: 248, open: 38, close: 22, high: 16, low: 42, bull: true },
];

export default function BullChart({ active }: BullChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-52 w-full overflow-hidden rounded-2xl border border-[#19F58A]/20 bg-[#050912]/95 p-3"
      role="img"
      aria-label="Animated candlestick chart breaking upward with charging bull silhouette"
    >
      <svg viewBox="0 0 340 130" className="relative z-10 h-36 w-full">
        {/* Horizontal reference lines */}
        <line x1="10" y1="35" x2="330" y2="35" stroke="#19F58A" strokeOpacity="0.1" strokeDasharray="3 3" />
        <line x1="10" y1="75" x2="330" y2="75" stroke="#19F58A" strokeOpacity="0.1" strokeDasharray="3 3" />

        {/* Candlesticks */}
        {CANDLES.map((c, idx) => {
          const top = Math.min(c.open, c.close);
          const height = Math.max(6, Math.abs(c.close - c.open));
          const color = c.bull ? "#19F58A" : "#FF3B5C";
          return (
            <g
              key={c.x}
              style={{
                opacity: entered ? 1 : 0,
                transform: entered ? "scaleY(1)" : "scaleY(0.1)",
                transformOrigin: `${c.x}px 115px`,
                transition: `opacity 0.45s ease ${idx * 65}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${idx * 65}ms`,
              }}
            >
              <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="1.5" />
              <rect x={c.x - 6} y={top} width="12" height={height} rx="2" fill={color} />
            </g>
          );
        })}

        {/* Green breakout trendline */}
        <path
          d="M 24 102 L 108 86 L 192 58 L 256 20 L 315 14"
          fill="none"
          stroke="#19F58A"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="360"
          strokeDashoffset={entered ? "0" : "360"}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1) 0.2s" }}
        />

        {/* Charging Bull Silhouette (charges in on hover or tap) */}
        <g
          style={{
            transform: active ? "translate3d(210px, 44px, 0) scale(1)" : "translate3d(275px, 48px, 0) scale(0.9)",
            opacity: active ? 1 : 0.45,
            transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease",
          }}
        >
          <path
            d="M18 46 L26 28 L42 22 L58 18 L70 10 L66 20 L78 16 L72 26 L84 32 L76 38 L66 36 L60 48 L54 48 L56 38 L40 40 L34 52 L28 52 L32 40 L20 46 Z"
            fill="#F5C451"
            fillOpacity="0.92"
          />
          <circle cx="71" cy="24" r="1.6" fill="#060B16" />
        </g>
      </svg>

      {/* Ticker strip at bottom */}
      <div className="relative z-10 flex h-8 items-center overflow-hidden rounded-lg border border-[#19F58A]/20 bg-[#060B16]/90 font-mono text-[11px]">
        <div className="animate-ticker flex whitespace-nowrap">
          <span className="mx-4 text-[#19F58A]">SEATS ▲ FILLING FAST</span>
          <span className="mx-4 text-[#F5C451]">ALPHA +18.4%</span>
          <span className="mx-4 text-[#EDEFF5]">NIFTY_SIM ▲ 24,890</span>
          <span className="mx-4 text-[#19F58A]">SEATS ▲ FILLING FAST</span>
          <span className="mx-4 text-[#F5C451]">ALPHA +18.4%</span>
          <span className="mx-4 text-[#EDEFF5]">NIFTY_SIM ▲ 24,890</span>
        </div>
      </div>
    </div>
  );
}

