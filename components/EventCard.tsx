"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Calendar, MapPin, Users, Wallet } from "lucide-react";
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
    const rotateY = px * 8; // max 8 deg
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
      className={`event-card relative flex flex-col justify-between overflow-hidden rounded-[22px] border p-5 transition-shadow duration-300 sm:p-7 ${
        isAutomate
          ? "blueprint-grid border-[#22E5FF]/25 bg-[#10141A]/90 hover:shadow-[0_0_45px_rgba(34,229,255,0.18)]"
          : "quant-grid border-[#19F58A]/25 bg-[#060B16]/92 hover:shadow-[0_0_45px_rgba(25,245,138,0.18)]"
      }`}
      style={{
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease",
      }}
    >
      {/* Hazard stripe edge detail for Automate */}
      {isAutomate && (
        <div
          aria-hidden="true"
          className="hazard-stripe absolute inset-y-0 left-0 w-2 opacity-80"
        />
      )}

      <div className={isAutomate ? "pl-2.5" : ""}>
        {/* Category & Seat Badge */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider"
            style={{
              borderColor: "var(--theme-border)",
              color: "var(--accent-primary)",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            {event.categoryLabel}
          </span>
          <span className="font-mono text-xs text-[#8A90A2]">
            Prize Pool: <strong className="text-[#EDEFF5]">{event.prizePool}</strong>
          </span>
        </div>

        {/* Title & Tagline */}
        <h3
          className={`text-3xl font-bold tracking-tight text-[#EDEFF5] sm:text-4xl ${
            isAutomate ? "font-heading" : "font-display tracking-wide text-4xl sm:text-5xl"
          }`}
        >
          {event.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#8A90A2] sm:text-base">
          {event.tagline}
        </p>

        {/* Theme Illustration Area */}
        <div className="mt-5">
          {isAutomate ? <RobotArm active={active} /> : <BullChart active={active} />}
        </div>

        {/* Key Metadata Grid */}
        <dl className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-3.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#8A90A2]">Date</dt>
              <dd className="font-medium text-[#EDEFF5]">{event.dateDisplay}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#8A90A2]">Venue</dt>
              <dd className="font-medium text-[#EDEFF5] line-clamp-1">{event.venue}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#8A90A2]">Team Size</dt>
              <dd className="font-medium text-[#EDEFF5]">{event.teamSize.label}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
            <div>
              <dt className="font-mono text-[10px] uppercase text-[#8A90A2]">Entry Fee</dt>
              <dd className="font-medium text-[#EDEFF5]">{event.feeDisplay}</dd>
            </div>
          </div>
        </dl>

        {/* Live Seats Bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
            <span className="text-[#8A90A2]">LIVE SEATS REMAINING</span>
            <span className="font-semibold text-[#EDEFF5]">
              {seatsLeft} / {event.seatCap}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pctLeft}%`,
                backgroundColor:
                  seatsLeft <= 8 ? "#FF8A1F" : "var(--accent-primary)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={`mt-6 flex flex-col gap-3 sm:flex-row ${isAutomate ? "pl-2.5" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenDetails(event)}
          className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-4 font-heading text-sm font-semibold text-[#EDEFF5] transition-colors hover:bg-white/[0.1]"
        >
          Details & Rules
        </button>
        <button
          type="button"
          onClick={() => onSelectRegister(event.id)}
          className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-1.5 rounded-xl px-4 font-heading text-sm font-bold text-[#07080B] transition-transform hover:brightness-110 active:scale-[0.98]"
          style={{ backgroundColor: "var(--accent-primary)" }}
        >
          <span>Register</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

