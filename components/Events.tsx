"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EVENT_LIST, type EventConfig, type EventId } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";
import EventCard from "./EventCard";

interface EventsProps {
  seats: Record<EventId, number>;
  onSelectRegister?: (eventId: EventId) => void;
}

export default function Events({ seats, onSelectRegister }: EventsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredTheme, setHoveredTheme] = useState<EventId | null>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".event-card");
      if (!cards || cards.length < 2) return;

      if (prefersReducedMotion()) {
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          }
        );
        return;
      }

      gsap.fromTo(
        cards,
        { y: 32, opacity: 0, scale: 0.96 },
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

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative scroll-mt-16 overflow-hidden px-4 pt-12 pb-14 sm:px-6 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-18"
      style={{
        background: "linear-gradient(180deg, #09183B 0%, #0C2556 32%, #0E2F68 68%, #12397B 100%)",
      }}
    >
      {/* Night Sky Glowing Moon matching reference screenshot */}
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute right-[18%] top-5 h-20 w-20 rounded-full bg-[#FFFDD0] shadow-[0_0_80px_22px_rgba(255,253,208,0.28)] sm:right-[22%] sm:top-6 sm:h-24 sm:w-24"
      />

      {/* Scattered Pixel Stars */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[8%] top-[18%] font-pixel text-[10px] text-white/50 animate-pulse">✦</span>
        <span className="absolute left-[34%] top-[12%] font-pixel text-[8px] text-[#A3F06D]/70">✦</span>
        <span className="absolute left-[54%] top-[24%] font-pixel text-[11px] text-white/60 animate-pulse">✦</span>
        <span className="absolute right-[12%] top-[38%] font-pixel text-[9px] text-[#22E5FF]/70">✦</span>
        <span className="absolute right-[32%] top-[16%] font-pixel text-[8px] text-white/40">✦</span>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header row: Events on left, ALL EVENTS -> on right matching screenshot */}
        <div className="mb-8 flex items-center justify-between sm:mb-10">
          <div>
            <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
              Events
            </h2>
            <p className="mt-1 text-xs text-[#9EB3D6] sm:text-sm">
              Two flagship arenas. Check live seat availability and lock your team slot.
            </p>
          </div>

          <Link
            href="#events"
            className="hidden items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#D8E3F5] transition-colors hover:text-[#22E5FF] sm:inline-flex"
          >
            <span>ALL EVENTS</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* 2-Card Grid with compact spacing */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {EVENT_LIST.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              seatsLeft={seats[ev.id]}
              onSelectRegister={onSelectRegister}
              onHoverTheme={setHoveredTheme}
            />
          ))}
        </div>

        {/* Bottom Horizontal Track Progress Indicator matching reference screenshot */}
        <div className="mx-auto mt-8 flex max-w-4xl items-center gap-3 px-1 sm:mt-10">
          <div className="h-1 flex-1 bg-[#22E5FF] shadow-[0_0_8px_rgba(34,229,255,0.6)]" />
          <div className="h-1 flex-1 bg-[#13356E] border border-[#1E4B94]/60" />
        </div>
      </div>

      {/* Pixelated Dithering Divider transitioning from Blue Events into Light Cream Images Section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-10 w-full rotate-180 sm:h-12"
        style={{
          backgroundImage: "url('/images/footer-pixel-divider.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "bottom center",
          imageRendering: "pixelated",
        }}
      />
    </section>
  );
}
