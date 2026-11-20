"use client";

import Link from "next/link";
import { ORGANISER_INFO } from "@/content/events";
import { prefersReducedMotion } from "@/lib/motion";

interface FooterProps {
  onOpenRegister?: () => void;
}

export default function Footer({ onOpenRegister }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: HTMLElement, opts?: object) => void } }).__lenis;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(el, {
        offset: -16,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#040D1E] text-[#F4F6FB]">
      {/* Pixelated Dithering Checkerboard Divider matching uploaded reference screenshot */}
      <div
        aria-hidden="true"
        className="h-12 w-full sm:h-16"
        style={{
          backgroundImage: "url('/images/footer-pixel-divider.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top center",
          imageRendering: "pixelated",
        }}
      />

      {/* Scattered background twinkling pixel stars matching screenshot */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-[12%] top-[34%] font-pixel text-[11px] text-[#A3F06D]/60 animate-pulse">✦</span>
        <span className="absolute left-[38%] top-[22%] font-pixel text-[9px] text-white/50">✦</span>
        <span className="absolute left-[58%] top-[28%] font-pixel text-[14px] text-white/70 animate-pulse">✦</span>
        <span className="absolute right-[24%] top-[18%] font-pixel text-[8px] text-[#22E5FF]/50">✦</span>
        <span className="absolute right-[14%] top-[45%] font-pixel text-[10px] text-white/60">✦</span>
        <span className="absolute left-[48%] top-[54%] font-pixel text-[8px] text-white/40">✦</span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-16 lg:px-12">
        {/* Top Row: Stylized Retro Logo & Tagline on Left, Light Green REGISTER Button on Right */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Left Brand Info */}
          <div>
            <h3
              className="font-pixel text-4xl font-extrabold tracking-wide text-[#A3F06D] sm:text-5xl lg:text-6xl"
              style={{
                textShadow: "0 2px 0 #040F24",
              }}
            >
              SYNCHRON'ISE
            </h3>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-[#D8E3F5]">
              SAME CIRCUITS. BIGGER DREAMS.
            </p>
            <p className="mt-1 font-mono text-xs tracking-wider text-[#9EB3D6]">
              {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}. 26 November 2026.
            </p>
          </div>

        </div>

        {/* Center Thin Divider with Pixel Star Emblem */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="h-px w-full bg-white/15" />
          <span className="absolute bg-[#040D1E] px-3 font-pixel text-xs text-[#A3F06D]">
            ❖
          </span>
        </div>

        {/* Bottom Row: Navigation and legal links */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          {/* Left: Nav & Legal Links */}
          <div className="space-y-3">
            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={() => scrollTo("about")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                ABOUT
              </button>
              <button
                type="button"
                onClick={() => scrollTo("memories")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                MEMORIES
              </button>
              <button
                type="button"
                onClick={() => scrollTo("events")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                EVENTS
              </button>
              <button
                type="button"
                onClick={() => scrollTo("prizes")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                PRIZES
              </button>
              <button
                type="button"
                onClick={() => scrollTo("sponsors")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                SPONSORS
              </button>
              <button
                type="button"
                onClick={() => scrollTo("rules-faq")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                FAQ
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#D8E3F5] transition-colors hover:text-[#A3F06D]"
              >
                CONTACT
              </button>
            </nav>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#9EB3D6]/80 sm:gap-5">
              <span>About us</span>
              <span>•</span>
              <span>Terms</span>
              <span>•</span>
              <span>Privacy</span>
              <span>•</span>
              <Link href="/admin" className="text-[#A3F06D]/75 hover:text-[#A3F06D] transition-colors">
                Organizer Portal
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
