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
      className="relative overflow-hidden px-4 py-20 transition-colors duration-500 sm:px-6 lg:py-28"
      style={{
        backgroundColor:
          hoveredTheme === "automate"
            ? "rgba(16, 28, 36, 0.35)"
            : hoveredTheme === "quant"
              ? "rgba(6, 22, 18, 0.35)"
              : "transparent",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#22E5FF]">
            THE TWO TRACKS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#EDEFF5] sm:text-5xl">
            Choose your arena.
          </h2>
          <p className="mt-3 text-base text-[#8A90A2]">
            Two distinct engineering & quantitative showdowns. Inspect the rounds, watch live seat
            availability, and lock your team slot before the cap hits.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
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

