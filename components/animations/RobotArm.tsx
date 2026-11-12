"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

interface RobotArmProps {
  active: boolean;
}

const TERMINAL_LINE = "> task_01: automated [DONE]";

export default function RobotArm({ active }: RobotArmProps) {
  const [typed, setTyped] = useState("");
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (!active) {
      setTyped("");
      return;
    }
    if (reduced) {
      setTyped(TERMINAL_LINE);
      return;
    }

    let i = 0;
    setTyped("");
    const timer = setInterval(() => {
      i += 1;
      setTyped(TERMINAL_LINE.slice(0, i));
      if (i >= TERMINAL_LINE.length) {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [active, reduced]);

  return (
    <div
      className="relative h-52 w-full overflow-hidden rounded-2xl border border-[#22E5FF]/20 bg-[#0A0E14]/90 p-3"
      role="img"
      aria-label="Animated robotic arm picking up a crate labelled BORING TASK"
    >
      {/* Rotating gears behind content */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="animate-spin-slow pointer-events-none absolute -right-6 -top-6 h-32 w-32 text-[#22E5FF]/10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="50" cy="50" r="24" />
        <circle cx="50" cy="50" r="10" />
        <path d="M50 12v10M50 78v10M12 50h10M78 50h10M23 23l7 7M70 70l7 7M23 77l7-7M70 30l7-7" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="animate-spin-slow-reverse pointer-events-none absolute bottom-6 left-4 h-20 w-20 text-[#B6FF3B]/10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <circle cx="50" cy="50" r="22" />
        <path d="M50 16v10M50 74v10M16 50h10M74 50h10" />
      </svg>

      {/* Main Robotic Arm & Conveyor SVG */}
      <svg viewBox="0 0 360 155" className="relative z-10 h-36 w-full">
        {/* Conveyor belt */}
        <rect x="20" y="124" width="320" height="14" rx="7" fill="#161C24" stroke="#22E5FF" strokeOpacity="0.3" />
        <circle cx="38" cy="131" r="4" fill="#22E5FF" fillOpacity="0.5" />
        <circle cx="180" cy="131" r="4" fill="#22E5FF" fillOpacity="0.5" />
        <circle cx="322" cy="131" r="4" fill="#22E5FF" fillOpacity="0.5" />

        {/* Robotic Arm Base */}
        <rect x="52" y="106" width="46" height="18" rx="4" fill="#1D2530" stroke="#22E5FF" strokeWidth="1.5" />
        <circle cx="75" cy="106" r="8" fill="#22E5FF" />

        {/* Arm segments (pivots when active) */}
        <g
          style={{
            transformOrigin: "75px 106px",
            transform: active ? "rotate(14deg)" : "rotate(-8deg)",
            transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect x="70" y="46" width="10" height="60" rx="5" fill="#25303F" stroke="#22E5FF" strokeWidth="1.4" />
          <circle cx="75" cy="46" r="7" fill="#B6FF3B" />

          {/* Forearm */}
          <g
            style={{
              transformOrigin: "75px 46px",
              transform: active ? "rotate(56deg)" : "rotate(32deg)",
              transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <rect x="71" y="42" width="96" height="9" rx="4.5" fill="#25303F" stroke="#22E5FF" strokeWidth="1.4" />
            {/* Gripper */}
            <path d="M167 38 L178 33 M167 55 L178 60" stroke="#FF8A1F" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Crate labelled BORING TASK */}
        <g
          style={{
            transform: active ? "translate3d(42px, -36px, 0)" : "translate3d(0px, 0px, 0)",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <rect
            x="176"
            y="88"
            width="86"
            height="34"
            rx="5"
            fill="#151B24"
            stroke="#FF8A1F"
            strokeWidth="1.8"
          />
          <text
            x="219"
            y="109"
            textAnchor="middle"
            fill="#EDEFF5"
            fontSize="9.5"
            fontFamily="monospace"
            fontWeight="700"
          >
            BORING TASK
          </text>
        </g>
      </svg>

      {/* Terminal output bar */}
      <div className="relative z-10 flex h-8 items-center rounded-lg border border-white/10 bg-[#07080B]/90 px-3 font-mono text-xs">
        <span className={active ? "text-[#B6FF3B]" : "text-[#8A90A2]"}>
          {active ? typed || ">" : "> hover or tap to run task_01"}
        </span>
        {active && <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#22E5FF]" />}
      </div>
    </div>
  );
}

