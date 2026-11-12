"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { EVENT_LIST, type EventConfig, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

interface EventsProps {
  seats: Record<EventId, number>;
  onSelectRegister: (eventId: EventId) => void;
}

export default function Events({ seats, onSelectRegister }: EventsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedModalEvent, setSelectedModalEvent] = useState<EventConfig | null>(null);
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
        cards[0],
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );

      gsap.fromTo(
        cards[1],
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: MOTION_EASE,
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
      className="relative overflow-hidden bg-[#06142E] px-4 py-20 transition-colors duration-500 sm:px-6 lg:py-28"
      style={{
        backgroundColor:
          hoveredTheme === "automate"
            ? "#081D3D"
            : hoveredTheme === "quant"
              ? "#051B36"
              : "#06142E",
      }}
    >
      {/* Night Sky Moon & Clouds matching reference Events screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-10 h-32 w-32 rounded-full bg-[#F2F7C9]/85 shadow-[0_0_90px_24px_rgba(242,247,201,0.28)] sm:h-40 sm:w-40"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-pixel text-4xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
              Events
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[#9EB3D6] sm:text-base">
              Two flagship arenas. Inspect the interactive preview, check live seat availability, and
              lock your team slot.
            </p>
          </div>
          <a
            href="#register"
            className="inline-flex min-h-[44px] items-center font-mono text-xs uppercase tracking-[0.2em] text-[#A3F06D] hover:underline"
          >
            REGISTER TEAM →
          </a>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {EVENT_LIST.map((ev) => (
            <EventCard
              key={ev.id}
              event={ev}
              seatsLeft={seats[ev.id]}
              onOpenDetails={setSelectedModalEvent}
              onSelectRegister={onSelectRegister}
              onHoverTheme={setHoveredTheme}
            />
          ))}
        </div>
      </div>

      <EventModal
        event={selectedModalEvent}
        onClose={() => setSelectedModalEvent(null)}
        onRegister={onSelectRegister}
      />
    </section>
  );
}
