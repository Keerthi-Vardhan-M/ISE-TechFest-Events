"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

interface EventCardProps {
  event: EventConfig;
  seatsLeft: number;
  onOpenDetails: (event: EventConfig) => void;
  onSelectRegister: (eventId: EventId) => void;
  onHoverTheme: (theme: EventId | null) => void;
}

export default function EventCard({
  event,
  seatsLeft,
  onOpenDetails,
  onSelectRegister,
  onHoverTheme,
}: EventCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const isAutomate = event.id === "automate";
  const pctLeft = Math.max(0, Math.min(100, Math.round((seatsLeft / event.seatCap) * 100)));

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * 7;
    const rotateX = -py * 7;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`;
  };

  const handleMouseEnter = () => {
    onHoverTheme(event.id);
  };

  const handleMouseLeave = () => {
    onHoverTheme(null);
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    }
  };

  return (
    <article
      ref={cardRef}
      data-theme={event.theme}
      data-cursor={event.theme}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(event)}
      className="event-card group relative mx-auto mt-14 flex w-full max-w-[440px] cursor-pointer flex-col justify-between border border-[#9EB3D6]/25 bg-[#0A1E46]/90 p-6 transition-shadow duration-300 hover:border-[#9EB3D6]/55 hover:shadow-[0_14px_40px_rgba(4,15,36,0.65)] sm:p-7"
      style={{
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
      }}
    >
      <div>
        {/* Top Row: Borderless 3D Mascot popping above top edge + TEAM Badge */}
        <div className="mb-2 flex items-start justify-between">
          <div className="animate-float-slow relative -mt-20 h-28 w-32 sm:h-32 sm:w-36">
            <Image
              src={isAutomate ? "/images/event-automate.jpg" : "/images/event-quant.jpg"}
              alt={
                isAutomate
                  ? "3D tech builder and robotic arm mascot"
                  : "3D golden charging bull and candlestick mascot"
              }
              fill
              sizes="144px"
              className="object-contain mix-blend-lighten drop-shadow-[0_12px_18px_rgba(0,0,0,0.55)]"
            />
          </div>

          <span className="border border-[#9EB3D6]/30 bg-[#06142E]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F4F6FB]">
            TEAM
          </span>
        </div>

        {/* Title & Category matching reference card shape */}
        <h3 className="font-pixel text-2xl font-bold tracking-tight text-[#F4F6FB] sm:text-[26px]">
          {event.name}
        </h3>
        <p
          className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent-primary)" }}
        >
          {event.categoryLabel}
        </p>

        {/* Tagline & Description */}
        <p className="mt-4 text-sm font-medium text-[#F4F6FB]/95">{event.tagline}</p>
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-[#9EB3D6] sm:text-sm">
          {event.description}
        </p>

        {/* Compact 1-line Meta & Live Seats */}
        <div className="mt-5 space-y-2.5 border-t border-[#9EB3D6]/15 pt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#D8E3F5]">
            <span>{event.dateDisplay}</span>
            <span className="text-[#9EB3D6]/50">•</span>
            <span>{event.teamSize.label}</span>
            <span className="text-[#9EB3D6]/50">•</span>
            <span className="font-bold text-[#A3F06D]">{event.feeDisplay}</span>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-[#9EB3D6]">
              <span>SEATS LEFT</span>
              <span>
                {seatsLeft} / {event.seatCap}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden bg-[#040F24]">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${pctLeft}%`,
                  backgroundColor: seatsLeft <= 8 ? "#FF8A1F" : "var(--accent-primary)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row matching reference: Prize Pool on left, Square → button on right */}
      <div
        className="mt-6 flex items-center justify-between gap-3 pt-2"
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
            className="inline-flex min-h-[40px] items-center justify-center border border-[#9EB3D6]/25 bg-[#06142E]/70 px-3 font-mono text-[11px] uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#9EB3D6]/60 hover:text-white"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onSelectRegister(event.id)}
            aria-label={`Register for ${event.name}`}
            className="inline-flex h-10 w-10 items-center justify-center border border-[#9EB3D6]/35 bg-[#091D42] text-[#F4F6FB] transition-colors hover:border-[#A3F06D] hover:bg-[#A3F06D] hover:text-[#040F24]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
