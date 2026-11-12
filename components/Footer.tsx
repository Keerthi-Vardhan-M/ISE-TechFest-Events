"use client";

import { ArrowUp } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";
import { prefersReducedMotion } from "@/lib/motion";

export default function Footer() {
  const scrollToRegister = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("register");
    if (!el) return;
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: HTMLElement, opts?: object) => void } }).__lenis;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(el, { offset: -20, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <footer className="bg-[#030A18] text-[#F4F6FB]">
      {/* Ready To Take The Challenge CTA Banner matching uploaded screenshot */}
      <div className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-[#0B1528] via-[#050D1C] to-[#030A18] px-4 py-20 text-center sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(22,72,168,0.32),transparent_65%)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="font-pixel text-3xl font-bold tracking-wide text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] sm:text-5xl md:text-6xl">
            READY TO TAKE THE CHALLENGE?
          </h2>
          <div className="mt-8">
            <a
              href="#register"
              onClick={scrollToRegister}
              className="inline-flex min-h-[48px] items-center justify-center bg-[#1648A8] px-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_6px_22px_rgba(22,72,168,0.55)] transition-all duration-200 hover:bg-[#1D5BC6]"
            >
              REGISTER NOW
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-[#9EB3D6]">
            SAME CIRCUITS. BIGGER DREAMS. SEE YOU IN THE ARENA.
          </p>
        </div>
      </div>

      {/* 3-Column Dark Footer */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-14 sm:px-6 md:grid-cols-3 md:pb-14">
        {/* Left */}
        <div className="space-y-3 text-center md:text-left">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-[#F4F6FB]">
            {ORGANISER_INFO.clubName}
          </p>
          <p className="font-mono text-xs text-[#9EB3D6]">
            {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-1 md:justify-start">
            {ORGANISER_INFO.socials.slice(0, 2).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center border border-white/15 px-3 font-mono text-[11px] uppercase tracking-wider text-[#D8E3F5] transition-colors hover:border-[#22E5FF] hover:text-[#22E5FF]"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="pt-1 font-mono text-xs text-[#9EB3D6] underline underline-offset-4">
            {ORGANISER_INFO.contactEmail}
          </p>
        </div>

        {/* Center Motto */}
        <div className="text-center font-pixel text-2xl font-bold leading-tight tracking-wider text-[#F4F6FB] sm:text-3xl">
          <p>AUTOMATE.</p>
          <p>TRADE.</p>
          <p>BUILD.</p>
        </div>

        {/* Right */}
        <div className="space-y-2 text-center md:text-right">
          <p className="font-heading text-sm font-bold uppercase tracking-widest text-[#F4F6FB]">
            {ORGANISER_INFO.festName}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[#9EB3D6]">
            TECHNICAL &amp; QUANT COMPETITIONS
          </p>
          <p className="font-mono text-xs text-[#9EB3D6]">
            {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                const lenis = (window as Window & { __lenis?: { scrollTo: (t: number, opts?: object) => void } }).__lenis;
                if (lenis && !prefersReducedMotion()) {
                  lenis.scrollTo(0, { duration: 1.1 });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#22E5FF] hover:text-white"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
