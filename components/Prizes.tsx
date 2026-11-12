"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Castle, Crown } from "lucide-react";
import { EVENTS, EVENT_LIST, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeEvent, setActiveEvent] = useState<EventId>("automate");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".podium-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = EVENTS[activeEvent];
  const first = current.podium[0];
  const second = current.podium[1];
  const third = current.podium[2];

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="cream-dot-grid px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
          PRIZES <span className="text-[#C82333]">&amp;</span> REWARDS
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#4B5C7D]">
          IDEAS DESERVE RECOGNITION
        </p>

        {/* Event Track Switcher */}
        <div className="mt-7 inline-flex border-2 border-[#0A1B3D] bg-[#FAF5E8] p-1">
          {EVENT_LIST.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setActiveEvent(ev.id)}
              className={`min-h-[44px] px-5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                activeEvent === ev.id
                  ? "bg-[#0A1B3D] text-[#A3F06D]"
                  : "text-[#4B5C7D] hover:text-[#0A1B3D]"
              }`}
            >
              {ev.name}
            </button>
          ))}
        </div>

        {/* Grand Reward Total */}
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#4B5C7D]">
            THE GRAND REWARD — {current.shortName.toUpperCase()}
          </p>
          <p className="mt-1 font-pixel text-4xl font-bold text-[#C82333] sm:text-5xl">
            {current.prizePool}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-[#0A1B3D]">
            TOTAL PRIZE POOL
          </p>
        </div>

        {/* 3-Card Podium matching reference screenshot (2nd | elevated 1st | 3rd) */}
        <div className="mt-10 grid grid-cols-1 items-end gap-5 sm:grid-cols-3">
          {/* 2nd Prize */}
          <div className="podium-card order-2 border border-[#D9D0B8] bg-[#FAF5E8] p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 sm:order-1">
            <Castle className="mx-auto h-9 w-9 text-[#0A1B3D]" />
            <p className="mt-4 font-heading text-2xl font-bold text-[#0A1B3D]">2ND</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4B5C7D]">PRIZE</p>
            <div className="my-4 h-px bg-[#D9D0B8]" />
            <p className="font-heading text-base font-bold text-[#0A1B3D]">{second.title}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-[#C82333]">{second.reward}</p>
          </div>

          {/* 1st Prize (Elevated Center) */}
          <div className="podium-card order-1 border-2 border-[#C82333] bg-[#FAF5E8] p-9 shadow-[0_12px_30px_rgba(200,35,51,0.12)] transition-transform duration-300 hover:-translate-y-2 sm:order-2 sm:py-12">
            <Crown className="mx-auto h-11 w-11 text-[#C82333]" />
            <p className="mt-4 font-heading text-3xl font-bold text-[#C82333]">1ST</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4B5C7D]">PRIZE</p>
            <div className="my-4 h-px bg-[#D9D0B8]" />
            <p className="font-heading text-lg font-bold text-[#0A1B3D]">{first.title}</p>
            <p className="mt-1 font-mono text-base font-bold text-[#C82333]">{first.reward}</p>
          </div>

          {/* 3rd Prize */}
          <div className="podium-card order-3 border border-[#D9D0B8] bg-[#FAF5E8] p-7 shadow-sm transition-transform duration-300 hover:-translate-y-1.5">
            <Castle className="mx-auto h-9 w-9 text-[#0A1B3D]" />
            <p className="mt-4 font-heading text-2xl font-bold text-[#0A1B3D]">3RD</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#4B5C7D]">PRIZE</p>
            <div className="my-4 h-px bg-[#D9D0B8]" />
            <p className="font-heading text-base font-bold text-[#0A1B3D]">{third.title}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-[#C82333]">{third.reward}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
