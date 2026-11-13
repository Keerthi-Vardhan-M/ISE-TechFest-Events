"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";

interface EventCardProps {
  event: EventConfig;
  seatsLeft?: number;
  onOpenDetails?: (event: EventConfig) => void;
  onSelectRegister?: (eventId: EventId) => void;
  onHoverTheme: (theme: EventId | null) => void;
}

export default function EventCard({
  event,
  onOpenDetails,
  onSelectRegister,
  onHoverTheme,
}: EventCardProps) {
  const router = useRouter();
  const isAutomate = event.id === "automate";

  const handleCardClick = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <article
      data-theme={event.theme}
      data-cursor={event.theme}
      onMouseEnter={() => onHoverTheme(event.id)}
      onMouseLeave={() => onHoverTheme(null)}
      onClick={handleCardClick}
      className="event-card group relative mx-auto mt-12 flex w-full max-w-[320px] cursor-pointer flex-col justify-between border border-[#9EB3D6]/25 bg-[#0A1E46]/95 p-5 shadow-[0_10px_28px_rgba(4,15,36,0.6)] transition-all duration-200 hover:border-[#22E5FF]/60 sm:max-w-[340px] sm:p-6"
    >
      <div>
        {/* Top Row: 3D Mascot popping slightly above top edge + TEAM badge */}
        <div className="mb-2 flex items-start justify-between">
          <div className="relative -mt-16 h-24 w-28 sm:h-28 sm:w-32">
            <Image
              src={isAutomate ? "/images/event-automate.jpg" : "/images/event-quant.jpg"}
              alt={
                isAutomate
                  ? "3D tech builder and robotic arm mascot"
                  : "3D golden charging bull and candlestick mascot"
              }
              fill
              sizes="128px"
              className="object-contain mix-blend-lighten drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)]"
            />
          </div>

          <span className="border border-[#9EB3D6]/30 bg-[#06142E]/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#F4F6FB]">
            TEAM
          </span>
        </div>

        {/* Title & Category matching reference screenshot */}
        <h3 className="font-pixel text-xl font-bold tracking-tight text-[#F4F6FB] sm:text-[22px]">
          {event.name}
        </h3>
        <p
          className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent-primary)" }}
        >
          {event.categoryLabel}
        </p>

        {/* Short, crisp tagline */}
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#D8E3F5] sm:text-sm">
          {event.tagline}
        </p>
      </div>

      {/* Bottom Row: Prize Pool on left, Details Link & Register Arrow on right */}
      <div
        className="mt-6 flex items-center justify-between gap-2 border-t border-[#9EB3D6]/15 pt-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <span className="font-pixel text-base font-bold text-[#A3F06D] sm:text-lg">
            {event.prizePool}
          </span>
          <span className="ml-1.5 font-mono text-[9px] uppercase tracking-wider text-[#9EB3D6]">
            PRIZES
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href={`/events/${event.id}`}
            className="inline-flex min-h-[34px] items-center justify-center border border-[#9EB3D6]/25 bg-[#06142E]/70 px-2.5 font-mono text-[10px] uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:text-white"
          >
            Details
          </Link>
          <Link
            href={`/register?event=${event.id}`}
            aria-label={`Register for ${event.name}`}
            className="inline-flex h-8 w-8 items-center justify-center border border-[#9EB3D6]/35 bg-[#091D42] text-[#F4F6FB] transition-colors hover:border-[#A3F06D] hover:bg-[#A3F06D] hover:text-[#040F24]"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
