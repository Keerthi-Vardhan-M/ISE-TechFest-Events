"use client";

import { useRef, useState } from "react";
import { ArrowRight, Calendar, MapPin, Users, Wallet } from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import RobotArm from "./animations/RobotArm";
import BullChart from "./animations/BullChart";

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
  const [active, setActive] = useState(false);

  const isAutomate = event.id === "automate";
  const pctLeft = Math.max(0, Math.min(100, Math.round((seatsLeft / event.seatCap) * 100)));

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = px * 8;
    const rotateX = -py * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(
      2
    )}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`;
  };

  const handleMouseEnter = () => {
    setActive(true);
    onHoverTheme(event.id);
  };

  const handleMouseLeave = () => {
    setActive(false);
    onHoverTheme(null);
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    }
  };

  const handleTapCard = () => {
    if (!isTouchDevice()) return;
    setActive((prev) => !prev);
  };

  return (
    <article
      ref={cardRef}
      data-theme={event.theme}
      data-cursor={event.theme}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTapCard}
      className={`event-card relative flex flex-col justify-between overflow-hidden border p-5 transition-shadow duration-300 sm:p-7 ${
        isAutomate
          ? "blueprint-grid border-[#22E5FF]/35 bg-[#091D42]/90 hover:shadow-[0_0_45px_rgba(34,229,255,0.22)]"
          : "quant-grid border-[#19F58A]/35 bg-[#081A3B]/92 hover:shadow-[0_0_45px_rgba(25,245,138,0.22)]"
      }`}
      style={{
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
      }}
    >
      {isAutomate && (
        <div aria-hidden="true" className="hazard-stripe absolute inset-y-0 left-0 w-2 opacity-85" />
      )}

      <div className={isAutomate ? "pl-2.5" : ""}>
        {/* Top Row: Category & TEAM Badge matching reference */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent-primary)" }}
          >
            {event.categoryLabel}
          </span>
          <span className="border border-[#9EB3D6]/30 bg-[#040F24]/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#F4F6FB]">
            TEAM
          </span>
        </div>

        {/* Title & Tagline */}
        <h3
          className={`text-2xl font-bold tracking-tight text-[#F4F6FB] sm:text-3xl ${
            isAutomate ? "font-heading" : "font-display tracking-wide text-3xl sm:text-4xl"
          }`}
        >
          {event.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#9EB3D6]">{event.tagline}</p>

        {/* Interactive Animation Area */}
        <div className="mt-5">
          {isAutomate ? <RobotArm active={active} /> : <BullChart active={active} />}
        </div>

        {/* Metadata */}
        <dl className="mt-5 grid grid-cols-2 gap-3 border border-[#9EB3D6]/20 bg-[#040F24]/60 p-3.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#9EB3D6]">Date</dt>
              <dd className="font-medium text-[#F4F6FB]">{event.dateDisplay}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#9EB3D6]">Venue</dt>
              <dd className="font-medium text-[#F4F6FB] line-clamp-1">{event.venue}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#9EB3D6]">Team</dt>
              <dd className="font-medium text-[#F4F6FB]">{event.teamSize.label}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#9EB3D6]">Fee</dt>
              <dd className="font-medium text-[#F4F6FB]">{event.feeDisplay}</dd>
            </div>
          </div>
        </dl>

        {/* Live Seats Bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
            <span className="text-[#9EB3D6]">SEATS LEFT</span>
            <span className="font-semibold text-[#F4F6FB]">
              {seatsLeft} / {event.seatCap}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden bg-[#040F24]">
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

      {/* Bottom Row matching reference: Prize Pool on left, Details + Register square arrow on right */}
      <div
        className={`mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#9EB3D6]/20 pt-4 ${
          isAutomate ? "pl-2.5" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-pixel text-lg font-bold text-[#A3F06D]">{event.prizePool}</span>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-[#9EB3D6]">
            IN PRIZES
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onOpenDetails(event)}
            className="inline-flex min-h-[44px] items-center justify-center border border-[#9EB3D6]/35 bg-[#040F24]/70 px-4 font-mono text-xs font-semibold uppercase tracking-wider text-[#F4F6FB] transition-colors hover:bg-[#040F24]"
          >
            Details
          </button>
          <button
            type="button"
            onClick={() => onSelectRegister(event.id)}
            aria-label={`Register for ${event.name}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 bg-[#A3F06D] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#040F24] transition-transform hover:brightness-105 active:scale-[0.98]"
          >
            <span>Register</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
