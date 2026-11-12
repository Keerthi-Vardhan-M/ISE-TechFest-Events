"use client";

import { ArrowUp } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#030D20] px-4 pb-24 pt-14 text-[#F4F6FB] sm:px-6 md:pb-14"
    >
      <div className="mx-auto max-w-6xl">
        <div className="space-y-2">
          <p className="font-pixel text-2xl font-bold tracking-wider text-[#A3F06D]">
            {ORGANISER_INFO.logoText}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9EB3D6]">
            {ORGANISER_INFO.clubName}
          </p>
          <p className="text-sm text-[#D8E3F5]">
            {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}. December 2026.
          </p>
        </div>

        {/* Horizontal divider with diamond center matching screenshot */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#9EB3D6]/20" />
          <span className="text-xs text-[#F4F6FB]" aria-hidden="true">
            ❖
          </span>
          <div className="h-px flex-1 bg-[#9EB3D6]/20" />
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-5 font-mono text-xs uppercase tracking-[0.18em] text-[#9EB3D6]">
            <a href="#events" className="min-h-[44px] inline-flex items-center hover:text-[#A3F06D]">
              Events
            </a>
            <a href="#schedule" className="min-h-[44px] inline-flex items-center hover:text-[#A3F06D]">
              Schedule
            </a>
            <a href="#about" className="min-h-[44px] inline-flex items-center hover:text-[#A3F06D]">
              About
            </a>
            <a href="#prizes" className="min-h-[44px] inline-flex items-center hover:text-[#A3F06D]">
              Prizes
            </a>
            <a href="#rules-faq" className="min-h-[44px] inline-flex items-center hover:text-[#A3F06D]">
              FAQ
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ORGANISER_INFO.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[42px] items-center border border-[#9EB3D6]/25 bg-[#06142E] px-4 font-mono text-[11px] uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#A3F06D] hover:text-[#A3F06D]"
              >
                {s.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="inline-flex min-h-[42px] items-center gap-1.5 border border-[#A3F06D]/40 bg-[#A3F06D]/10 px-4 font-mono text-[11px] uppercase tracking-wider text-[#A3F06D] hover:bg-[#A3F06D]/20"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
