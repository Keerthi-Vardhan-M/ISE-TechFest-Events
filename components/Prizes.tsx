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

const THREE_PRIZES: PrizeTier[] = [
  {
    id: "silver",
    rank: "2ND",
    label: "1ST RUNNER UP",
    amount: "₹5,000",
    image: "/images/trophy-silver.jpg",
    alt: "1st Runner Up Luxury Silver Crystal Trophy",
    sizeClass: "h-48 w-48 sm:h-56 sm:w-56",
  },
  {
    id: "gold",
    rank: "1ST",
    label: "WINNER",
    amount: "₹10,000",
    image: "/images/trophy-gold.jpg",
    alt: "Grand Champion Luxury Gold Crystal Trophy",
    sizeClass: "h-60 w-60 sm:h-72 sm:w-72 -translate-y-3",
    isGrand: true,
  },
  {
    id: "bronze",
    rank: "3RD",
    label: "2ND RUNNER UP",
    amount: "₹3,000",
    image: "/images/trophy-bronze.jpg",
    alt: "2nd Runner Up Luxury Bronze Crystal Trophy",
    sizeClass: "h-44 w-44 sm:h-52 sm:w-52",
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
        { y: 48, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
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
      className="cream-dot-grid relative border-b border-[#D9D0B8] px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Section Header with warm retro styling */}
        <h2
          className="font-pixel text-4xl font-bold tracking-tight text-[#0A1B3D] sm:text-6xl md:text-7xl"
          style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}
        >
          PRIZES
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#4B5C7D]">
          TOTAL POOL • ₹36,000+ IN CASH &amp; CRYSTAL TROPHIES
        </p>

        {/* Clean Cream/Navy Track Filter */}
        <div className="mt-6 inline-flex border border-[#D9D0B8] bg-[#FAF5E8] p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTrack("championship")}
            className={`min-h-[38px] px-5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTrack === "championship"
                ? "bg-[#1648A8] text-white shadow-sm"
                : "text-[#4B5C7D] hover:text-[#0A1B3D]"
            }`}
          >
            All Tracks
          </button>
          {EVENT_LIST.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setActiveTrack(ev.id)}
              className={`min-h-[38px] px-5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTrack === ev.id
                  ? "bg-[#1648A8] text-white shadow-sm"
                  : "text-[#4B5C7D] hover:text-[#0A1B3D]"
              }`}
            >
              {ev.shortName}
            </button>
          ))}
        </div>

        {/* 3 Trophy Cups Podium: Silver, Gold (Center Elevated), Bronze */}
        <div className="mt-14 grid grid-cols-1 items-end justify-items-center gap-y-12 sm:grid-cols-3 sm:gap-x-8">
          {THREE_PRIZES.map((tier) => (
            <div
              key={tier.id}
              className={`trophy-column group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 ${
                tier.isGrand ? "order-1 sm:order-2 scale-105 sm:scale-110" : tier.id === "silver" ? "order-2 sm:order-1" : "order-3"
              }`}
            >
              {/* Photorealistic Trophy Cup blending seamlessly into warm cream background */}
              <div
                className={`relative mx-auto ${tier.sizeClass} animate-float-slow transition-transform duration-500 ease-out group-hover:scale-108`}
              >
                <Image
                  src={tier.image}
                  alt={tier.alt}
                  fill
                  sizes="(max-width: 640px) 220px, 280px"
                  className="object-contain drop-shadow-[0_14px_24px_rgba(10,27,61,0.18)]"
                />
              </div>

              {/* Glowing Prize Amount & Rank Label */}
              <div className="mt-5">
                <p
                  className="font-heading text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
                  style={{
                    color: tier.isGrand ? "#C94A00" : "#0A1B3D",
                    textShadow: tier.isGrand
                      ? "0 0 16px rgba(255, 110, 20, 0.45)"
                      : "0 0 12px rgba(10, 27, 61, 0.15)",
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
