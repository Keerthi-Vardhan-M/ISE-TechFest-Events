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
                textShadow: "0 3px 0 #040F24, 0 0 6px rgba(163, 240, 109, 0.22)",
              }}
            >
              {ORGANISER_INFO.heroHeadline}
            </h3>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-[#D8E3F5]">
              SAME CIRCUITS. BIGGER DREAMS.
            </p>
            <p className="mt-1 font-mono text-xs tracking-wider text-[#9EB3D6]">
              {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}. 25 November 2026.
            </p>
          </div>

          {/* Right Action: Light-Green Rectangular REGISTER Button matching screenshot */}
          <div>
            <Link
              href="/register"
              className="inline-flex min-h-[48px] items-center justify-center bg-[#A3F06D] px-9 font-pixel text-xs font-bold uppercase tracking-widest text-[#040F24] shadow-[0_4px_16px_rgba(163,240,109,0.4)] transition-all duration-200 hover:bg-[#B6F586] hover:scale-103"
            >
              REGISTER
            </Link>
          </div>
        </div>

        {/* Center Thin Divider with Pixel Star Emblem */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="h-px w-full bg-white/15" />
          <span className="absolute bg-[#040D1E] px-3 font-pixel text-xs text-[#A3F06D]">
            ❖
          </span>
        </div>

        {/* Bottom Row: Navigation Links on Left, Boxed Social Button Pills on Right */}
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
              <span>Refunds</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Right: Boxed Social Button Pills matching reference screenshot */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#1E3A6E] bg-[#0A1A38] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:bg-[#122A56] hover:text-white"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>INSTAGRAM</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#1E3A6E] bg-[#0A1A38] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:bg-[#122A56] hover:text-white"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LINKEDIN</span>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#1E3A6E] bg-[#0A1A38] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:bg-[#122A56] hover:text-white"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136c-1.871-.502-9.376-.502-9.376-.502s-7.504 0-9.377.502a3.016 3.016 0 0 0-2.122 2.136c-.5 1.874-.5 5.814-.5 5.814s0 3.94.5 5.814a3.016 3.016 0 0 0 2.122 2.136c1.873.502 9.377.502 9.377.502s7.505 0 9.377-.502a3.016 3.016 0 0 0 2.122-2.136c.5-1.874.5-5.814.5-5.814s0-3.94-.5-5.814zm-14.498 9.314v-7l6.5 3.5-6.5 3.5z" />
              </svg>
              <span>YOUTUBE</span>
            </a>

            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#1E3A6E] bg-[#0A1A38] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:bg-[#122A56] hover:text-white"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>DISCORD</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${ORGANISER_INFO.contactEmail}`}
              className="inline-flex min-h-[38px] items-center gap-2 border border-[#1E3A6E] bg-[#0A1A38] px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:bg-[#122A56] hover:text-white"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
              <span>EMAIL</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
