"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";

interface EventCardProps {
  event: EventConfig;
  seatsLeft?: number;
  onOpenDetails: (event: EventConfig) => void;
  onSelectRegister: (eventId: EventId) => void;
  onHoverTheme: (theme: EventId | null) => void;
}

export default function EventCard({
  event,
  onOpenDetails,
  onSelectRegister,
  onHoverTheme,
}: EventCardProps) {
  const isAutomate = event.id === "automate";

  return (
    <article
      data-theme={event.theme}
      data-cursor={event.theme}
      onMouseEnter={() => onHoverTheme(event.id)}
      onMouseLeave={() => onHoverTheme(null)}
      onClick={() => onOpenDetails(event)}
      className="event-card group relative mx-auto mt-14 flex w-full max-w-[360px] cursor-pointer flex-col justify-between border border-[#9EB3D6]/25 bg-[#0A1E46]/95 p-6 shadow-[0_12px_32px_rgba(4,15,36,0.65)] transition-colors duration-200 hover:border-[#22E5FF]/60 sm:max-w-[370px] sm:p-7"
    >
      <div>
        {/* Top Row: Mascot centered/popping above edge + TEAM badge */}
        <div className="mb-3 flex items-start justify-between">
          <div className="relative -mt-20 h-28 w-32 sm:h-32 sm:w-36">
            <Image
              src={isAutomate ? "/images/event-automate.jpg" : "/images/event-quant.jpg"}
              alt={
                isAutomate
                  ? "3D tech builder and robotic arm mascot"
                  : "3D golden charging bull and candlestick mascot"
              }
              fill
              sizes="144px"
              className="object-contain mix-blend-lighten drop-shadow-[0_10px_16px_rgba(0,0,0,0.55)]"
            />
          </div>

          <span className="border border-[#9EB3D6]/30 bg-[#06142E]/80 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#F4F6FB]">
            TEAM
          </span>
        </div>

        {/* Title & Category matching reference screenshot */}
        <h3 className="font-pixel text-2xl font-bold tracking-tight text-[#F4F6FB]">
          {event.name}
        </h3>
        <p
          className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent-primary)" }}
        >
          {event.categoryLabel}
        </p>

        {/* Crisp Tagline */}
        <p className="mt-4 text-sm leading-relaxed text-[#D8E3F5]">
          {event.tagline}
        </p>
      </div>

      {/* Bottom Row matching reference: Prize Pool on left, Square arrow button on right */}
      <div
        className="mt-8 flex items-center justify-between gap-3 border-t border-[#9EB3D6]/15 pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-pixel text-lg font-bold text-[#A3F06D]">{event.prizePool}</span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
            IN PRIZES
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="inline-flex min-h-[38px] items-center justify-center border border-[#9EB3D6]/25 bg-[#06142E]/70 px-3 font-mono text-[11px] uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#9EB3D6]/60 hover:text-white"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onSelectRegister(event.id)}
            aria-label={`Register for ${event.name}`}
            className="inline-flex h-9 w-9 items-center justify-center border border-[#9EB3D6]/35 bg-[#091D42] text-[#F4F6FB] transition-colors hover:border-[#A3F06D] hover:bg-[#A3F06D] hover:text-[#040F24]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
