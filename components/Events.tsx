"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EVENT_LIST, type EventConfig, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";
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
        { y: 36, opacity: 0, scale: 0.96 },
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
      className="relative scroll-mt-20 overflow-hidden bg-[#06142E] px-4 py-12 transition-colors duration-700 sm:px-6 sm:py-16 lg:py-20"
      style={{
        backgroundColor:
          hoveredTheme === "automate"
            ? "#081D3D"
            : hoveredTheme === "quant"
              ? "#051B36"
              : "#06142E",
      }}
    >
      {/* Night Sky Moon with gentle ambient float */}
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute right-[8%] top-6 h-20 w-20 rounded-full bg-[#F2F7C9]/85 shadow-[0_0_60px_16px_rgba(242,247,201,0.22)] sm:right-[14%] sm:top-8 sm:h-24 sm:w-24 md:h-28 md:w-28"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6 sm:mb-8">
          <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-4xl">
            Events
          </h2>
          <p className="mt-1.5 max-w-xl text-xs text-[#9EB3D6] sm:text-sm">
            Two flagship arenas. Inspect the interactive preview, check live seat availability, and
            lock your team slot.
          </p>
        </div>

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
      </div>

      {/* Pixelated Dithering Divider transitioning from Navy Events into Light Cream Images Section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-12 w-full rotate-180 sm:h-16"
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
