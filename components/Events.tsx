"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EVENT_LIST, type EventConfig, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";
import EventCard from "./EventCard";

interface EventsProps {
  seats: Record<EventId, number>;
  onSelectRegister: (eventId: EventId) => void;
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
        { y: 55, opacity: 0, filter: "blur(12px)", scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.25,
          stagger: 0.16,
          ease: "power4.out",
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
      className="relative scroll-mt-20 overflow-hidden bg-[#06142E] px-4 pt-28 pb-24 transition-colors duration-700 sm:px-6 sm:pt-36 sm:pb-32 lg:pt-40 lg:pb-36"
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
        className="animate-float-slow pointer-events-none absolute right-[12%] top-20 h-28 w-28 rounded-full bg-[#F2F7C9]/85 shadow-[0_0_90px_24px_rgba(242,247,201,0.28)] sm:right-[18%] sm:top-24 sm:h-36 sm:w-36"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="font-pixel text-4xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
            Events
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#9EB3D6] sm:text-base">
            Two flagship arenas. Inspect the interactive preview, check live seat availability, and
            lock your team slot.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
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
    </section>
  );
}
