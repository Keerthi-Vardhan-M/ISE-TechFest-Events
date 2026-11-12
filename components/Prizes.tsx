"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
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
      className="dark-dot-grid border-b border-[#9EB3D6]/20 bg-[#06142E] px-4 py-20 text-[#F4F6FB] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
          PRIZES <span className="text-[#A3F06D]">&amp;</span> REWARDS
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[#9EB3D6]">
          IDEAS DESERVE RECOGNITION
        </p>

        {/* Event Track Switcher */}
        <div className="mt-7 inline-flex border border-[#9EB3D6]/30 bg-[#040F24] p-1">
          {EVENT_LIST.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setActiveEvent(ev.id)}
              className={`min-h-[42px] px-5 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                activeEvent === ev.id
                  ? "bg-[#1648A8] text-white shadow-md"
                  : "text-[#9EB3D6] hover:text-white"
              }`}
            >
              {ev.name}
            </button>
          ))}
        </div>

        {/* Grand Reward Total */}
        <div className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#9EB3D6]">
            THE GRAND REWARD — {current.shortName.toUpperCase()}
          </p>
          <p className="mt-1 font-pixel text-4xl font-bold text-[#A3F06D] sm:text-5xl">
            {current.prizePool}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-[#D8E3F5]">
            TOTAL PRIZE POOL
          </p>
        </div>

        {/* 3-Card Podium */}
        <div className="mt-10 grid grid-cols-1 items-end gap-5 sm:grid-cols-3">
          {/* 2nd Prize — Silver */}
          <div className="podium-card navy-card group order-2 p-6 transition-transform duration-300 hover:-translate-y-1.5 sm:order-1">
            <div className="relative mx-auto h-36 w-36 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/trophy-silver.jpg"
                alt="2nd Place Silver Crystal Trophy Cup"
                fill
                sizes="144px"
                className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
              />
            </div>
            <p className="mt-3 font-heading text-2xl font-bold text-[#F4F6FB]">2ND</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9EB3D6]">
              1ST RUNNER UP
            </p>
            <div className="my-3.5 h-px bg-[#9EB3D6]/20" />
            <p className="font-heading text-base font-bold text-[#F4F6FB]">{second.title}</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#22E5FF]">{second.reward}</p>
          </div>

          {/* 1st Prize — Gold (Elevated) */}
          <div className="podium-card navy-card group order-1 border-2 border-[#A3F06D] p-8 shadow-[0_16px_40px_rgba(4,15,36,0.85)] transition-transform duration-300 hover:-translate-y-2 sm:order-2 sm:py-10">
            <div className="relative mx-auto h-48 w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/trophy-gold.jpg"
                alt="1st Place Gold Crystal Trophy Cup"
                fill
                sizes="192px"
                className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
              />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold text-[#A3F06D]">1ST</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#F5C451]">WINNER</p>
            <div className="my-3.5 h-px bg-[#9EB3D6]/20" />
            <p className="font-heading text-lg font-bold text-[#F4F6FB]">{first.title}</p>
            <p className="mt-1 font-mono text-base font-bold text-[#A3F06D]">{first.reward}</p>
          </div>

          {/* 3rd Prize — Bronze */}
          <div className="podium-card navy-card group order-3 p-6 transition-transform duration-300 hover:-translate-y-1.5">
            <div className="relative mx-auto h-32 w-32 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/trophy-bronze.jpg"
                alt="3rd Place Bronze Crystal Trophy Cup"
                fill
                sizes="128px"
                className="object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)]"
              />
            </div>
            <p className="mt-3 font-heading text-2xl font-bold text-[#F4F6FB]">3RD</p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9EB3D6]">
              2ND RUNNER UP
            </p>
            <div className="my-3.5 h-px bg-[#9EB3D6]/20" />
            <p className="font-heading text-base font-bold text-[#F4F6FB]">{third.title}</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#22E5FF]">{third.reward}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
