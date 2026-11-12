"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { EVENT_LIST, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

interface PrizeTier {
  id: string;
  rank: string;
  label: string;
  amount: string;
  image: string;
  alt: string;
  sizeClass: string;
  isGrand?: boolean;
}

const PRIZE_TIERS: PrizeTier[] = [
  {
    id: "silver",
    rank: "2ND",
    label: "1ST RUNNER UP",
    amount: "₹50,000",
    image: "/images/trophy-silver.jpg",
    alt: "1st Runner Up Luxury Silver Crystal Trophy",
    sizeClass: "h-44 w-44 sm:h-52 sm:w-52",
  },
  {
    id: "gold",
    rank: "1ST",
    label: "WINNER",
    amount: "₹100,000",
    image: "/images/trophy-gold.jpg",
    alt: "Grand Champion Luxury Gold Crystal Trophy",
    sizeClass: "h-56 w-56 sm:h-64 sm:w-64 -translate-y-2",
    isGrand: true,
  },
  {
    id: "bronze",
    rank: "3RD",
    label: "2ND RUNNER UP",
    amount: "₹25,000",
    image: "/images/trophy-bronze.jpg",
    alt: "2nd Runner Up Luxury Bronze Crystal Trophy",
    sizeClass: "h-40 w-40 sm:h-48 sm:w-48",
  },
  {
    id: "consolation",
    rank: "4TH",
    label: "CONSOLATION",
    amount: "₹25,000",
    image: "/images/trophy-blue.jpg",
    alt: "Consolation Luxury Sapphire Blue Crystal Trophy",
    sizeClass: "h-36 w-36 sm:h-44 sm:w-44",
  },
];

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTrack, setActiveTrack] = useState<"championship" | EventId>("championship");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trophy-column",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[#9EB3D6]/20 bg-[#050B17] px-4 py-20 text-[#F4F6FB] sm:px-6 lg:py-28"
    >
      {/* Subtle gold/amber triangular isometric lattice background matching reference */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 52H0L30 0zM30 104L60 52H0l30 52z' fill='none' stroke='%23F5C451' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 104px",
        }}
      />

      {/* Center atmospheric spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(245,196,81,0.08)_0%,_transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Section Header exactly matching reference */}
        <h2 className="font-heading text-4xl font-black tracking-wider text-white sm:text-6xl md:text-7xl">
          PRIZES
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#9EB3D6]">
          TOTAL POOL • ₹2,00,000+ IN CASH &amp; CRYSTAL TROPHIES
        </p>

        {/* Track Filter */}
        <div className="mt-6 inline-flex border border-[#9EB3D6]/25 bg-[#06142E]/80 p-1">
          <button
            type="button"
            onClick={() => setActiveTrack("championship")}
            className={`min-h-[38px] px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTrack === "championship"
                ? "bg-[#1648A8] text-white shadow-md"
                : "text-[#9EB3D6] hover:text-white"
            }`}
          >
            All Tracks
          </button>
          {EVENT_LIST.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setActiveTrack(ev.id)}
              className={`min-h-[38px] px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTrack === ev.id
                  ? "bg-[#1648A8] text-white shadow-md"
                  : "text-[#9EB3D6] hover:text-white"
              }`}
            >
              {ev.shortName}
            </button>
          ))}
        </div>

        {/* 4 Cups aligned exactly like the user's reference screenshot */}
        <div className="mt-14 grid grid-cols-2 items-end justify-items-center gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {PRIZE_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`trophy-column group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 ${
                tier.isGrand ? "scale-105 sm:scale-110" : ""
              }`}
            >
              {/* Photorealistic Trophy Cup */}
              <div
                className={`relative mx-auto ${tier.sizeClass} transition-transform duration-300 group-hover:scale-108`}
              >
                <Image
                  src={tier.image}
                  alt={tier.alt}
                  fill
                  sizes="(max-width: 640px) 180px, 260px"
                  className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Glowing Amount with warm orange drop shadow matching reference screenshot */}
              <div className="mt-6">
                <p
                  className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl"
                  style={{
                    textShadow:
                      "0 0 18px rgba(255, 130, 20, 0.85), 0 0 36px rgba(255, 80, 0, 0.45), 2px 2px 0px #C94A00",
                  }}
                >
                  {tier.amount}
                </p>
                <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#D8E3F5]">
                  {tier.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra perks banner */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 border-t border-[#9EB3D6]/15 pt-8 font-mono text-xs uppercase tracking-wider text-[#9EB3D6]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#A3F06D]" /> Official Merit Certificates for
            all Finalists
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#22E5FF]" /> IEEE &amp; Quant Club Medals
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#F5C451]" /> Direct Internship Interviews for
            Top 3 Teams
          </span>
        </div>
      </div>
    </section>
  );
}
