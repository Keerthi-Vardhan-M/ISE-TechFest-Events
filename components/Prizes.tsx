"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EVENT_LIST, EVENTS, type EventId } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";
import TrophySvg from "./TrophySvg";

interface PrizeTier {
  id: "gold" | "silver" | "bronze";
  rank: string;
  label: string;
  amount: string;
  sizeClass: string;
  isGrand?: boolean;
}
export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTrack, setActiveTrack] = useState<EventId>("automate");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trophy-column",
        { y: 36, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTiers = (): PrizeTier[] => {
    const ev = EVENTS[activeTrack];
    return [
      {
        id: "silver",
        rank: "2ND",
        label: ev.podium[1]?.title || "RUNNER UP",
        amount: ev.podium[1]?.reward.split("+")[0].trim() || "₹5,000",
        sizeClass: "w-44 h-52 sm:w-56 sm:h-64",
      },
      {
        id: "gold",
        rank: "1ST",
        label: ev.podium[0]?.title || "CHAMPION",
        amount: ev.podium[0]?.reward.split("+")[0].trim() || "₹10,000",
        sizeClass: "w-52 h-64 sm:w-64 sm:h-76 -translate-y-3",
        isGrand: true,
      },
      {
        id: "bronze",
        rank: "3RD",
        label: ev.podium[2]?.title || "PRECISION AWARD",
        amount: ev.podium[2]?.reward.split("+")[0].trim() || "₹3,000",
        sizeClass: "w-40 h-48 sm:w-52 sm:h-60",
      },
    ];
  };

  const prizeTiers = getTiers();

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="cream-dot-grid relative border-b border-[#D9D0B8] px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Section Header with warm retro styling */}
        <h2 className="font-pixel text-4xl font-bold tracking-tight text-[#0A1B3D] sm:text-6xl md:text-7xl">
          PRIZES
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#4B5C7D]">
          TOTAL CASH PRIZE POOL • ₹20,000+
        </p>

        {/* Track selector */}
        <div role="tablist" aria-label="Choose an event for prize details" className="mt-6 inline-flex border border-[#D9D0B8] bg-[#FAF5E8] p-1 shadow-sm">
          {EVENT_LIST.map((ev) => (
            <button
              key={ev.id}
              type="button"
              role="tab"
              aria-selected={activeTrack === ev.id}
              aria-controls="prize-podium"
              onClick={() => {
                if (activeTrack !== ev.id) setActiveTrack(ev.id);
              }}
              className={`min-h-[42px] touch-manipulation px-5 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1648A8] ${
                activeTrack === ev.id
                  ? "bg-[#1648A8] text-white shadow-sm"
                  : "text-[#4B5C7D] hover:text-[#0A1B3D]"
              }`}
            >
              {ev.shortName}
            </button>
          ))}
        </div>

        {/* Cash prize podium */}
        <div id="prize-podium" role="tabpanel" aria-live="polite" className="mt-14 grid grid-cols-1 items-end justify-items-center gap-y-12 sm:grid-cols-3 sm:gap-x-8">
          {prizeTiers.map((tier) => (
            <div
              key={tier.id}
              className={`trophy-column group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 ${
                tier.isGrand
                  ? "order-1 sm:order-2 scale-105 sm:scale-110"
                  : tier.id === "silver"
                  ? "order-2 sm:order-1"
                  : "order-3"
              }`}
            >
              <div
                className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#D9D0B8] bg-[#FAF5E8] font-pixel text-2xl font-bold text-[#1648A8] shadow-[0_12px_24px_rgba(10,27,61,0.14)] animate-float-slow transition-transform duration-500 ease-out group-hover:scale-105 sm:h-44 sm:w-44 ${tier.isGrand ? "ring-4 ring-[#A3F06D]/50" : ""}`}
              >
                <TrophySvg tier={tier.id} badgeText={tier.rank} className={`${tier.sizeClass} drop-shadow-[0_12px_24px_rgba(10,27,61,0.14)]`} />
              </div>

              {/* Clean Crisp Prize Amount & Rank Label */}
              <div className="mt-4">
                <p
                  className="font-heading text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
                  style={{
                    color: tier.isGrand ? "#C94A00" : "#0A1B3D",
                  }}
                >
                  {tier.amount}
                </p>
                <p className="mt-1.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#4B5C7D]">
                  {tier.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
