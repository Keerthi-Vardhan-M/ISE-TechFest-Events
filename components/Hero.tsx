"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { getEarliestEventDateISO, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetISO: string): TimeLeft {
  const targetTime = new Date(targetISO).getTime();
  const now = Date.now();
  let diff = targetTime - now;

  // Fallback: If device clock is set past target date or has discrepancy, show countdown to 25 Nov
  if (isNaN(diff) || diff <= 0) {
    const targetDate = new Date(targetISO);
    const currentDate = new Date();
    // Compute remaining to Nov 25 using current year or next
    let nextTarget = new Date(currentDate.getFullYear(), 10, 25, 9, 0, 0);
    if (nextTarget.getTime() <= now) {
      nextTarget = new Date(currentDate.getFullYear() + 1, 10, 25, 9, 0, 0);
    }
    diff = Math.max(0, nextTarget.getTime() - now);
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface HeroProps {
  onOpenRegister?: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const targetISO = getEarliestEventDateISO();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(targetISO));

  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetISO));
    const id = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetISO));
    }, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  useEffect(() => {
    ensureGsapRegistered();
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const items = heroRef.current?.querySelectorAll(".hero-reveal");
      if (items?.length) {
        if (prefersReducedMotion()) {
          gsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.35 });
        } else {
          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as Window & { __lenis?: { scrollTo: (t: HTMLElement, opts?: object) => void } }).__lenis;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(el, { offset: -16, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#020b1f] px-0 pt-16 pb-12 text-white sm:pt-24 sm:pb-16"
    >
      {/* Background artwork: mobile gets the portrait bull artwork, desktop gets the 2K panoramic sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <picture className="block h-full w-full">
          <source media="(max-width: 767px)" srcSet="/images/hero-bull-mobile.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-sky-bg.jpg"
            alt="Floating voxel island sky backdrop"
            className="h-full w-full object-cover object-[22%_top] md:object-center"
            style={{
              imageRendering: "crisp-edges",
              filter: "contrast(1.06) saturate(1.08) brightness(1.02)",
            }}
          />
        </picture>

        {/* Mobile atmospheric contrast wash so text is readable over bull */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#020b1f]/35 via-transparent to-[#020b1f]/65" />

        {/* Desktop-only subtle right-side gradient so text is crisp without dimming the bull/bear/clouds */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#020b1f]/15 to-[#020b1f]/70" />

        {/* Smooth bluish and sand shade transition melting seamlessly into the section below */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(68, 128, 186, 0.25) 28%, rgba(132, 172, 210, 0.52) 55%, rgba(216, 212, 192, 0.8) 82%, #FAF5E8 100%)",
          }}
        />
      </div>

      {/* Hero Content — strictly centered layout on mobile, right-aligned on desktop matching reference */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 text-center lg:mr-8 lg:max-w-2xl lg:items-end lg:text-right"
      >
        <div className="flex w-full flex-col items-center text-center lg:items-end lg:text-right">
          {/* Eyebrow: VOICE CLUB • MSRIT ISE PRESENTS with MSRIT ISE highlighted */}
          <p className="hero-reveal font-mono text-[10px] uppercase tracking-[0.28em] text-[#D8E3F5] sm:text-xs">
            VOICE CLUB •{" "}
            <span className="font-bold text-[#A3F06D] drop-shadow-[0_0_8px_rgba(163,240,109,0.6)]">
              MSRIT ISE
            </span>{" "}
            PRESENTS
          </p>

          {/* Event Title: AUTOMATE × QUANT */}
          <h1
            className="hero-reveal mt-2 font-pixel text-4xl font-extrabold tracking-tight text-[#A3F06D] sm:text-6xl md:text-7xl"
            style={{
              textShadow: "0 3px 0 #072513, 0 6px 0 #040F24, 0 10px 24px rgba(0,0,0,0.8)",
            }}
          >
            {ORGANISER_INFO.heroHeadline}
          </h1>

          {/* Star Divider matching reference screenshot */}
          <div className="hero-reveal my-2.5 flex w-44 items-center justify-center gap-2 text-white/40 sm:my-3 sm:w-56">
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-xs text-[#A3F06D]">✦</span>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {/* Subtitle: CHANGE OF ERA / ANNUAL FEST 2026 */}
          <p className="hero-reveal font-mono text-xs uppercase tracking-[0.24em] text-white sm:text-sm">
            ANNUAL TECH SYMPOSIUM 2026
          </p>

          {/* Date & Location: "25 November 2026 • Bengaluru" */}
          <p className="hero-reveal mt-1 text-xs text-[#D8E3F5] sm:text-sm">
            25 November 2026 • {ORGANISER_INFO.city}
          </p>

          {/* Countdown timer */}
          <div
            aria-label="Countdown to earliest event"
            className="hero-reveal mt-4 grid grid-cols-4 gap-1.5 sm:mt-5 sm:gap-2.5"
          >
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HRS", value: timeLeft.hours },
              { label: "MIN", value: timeLeft.minutes },
              { label: "SEC", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[56px] flex-col items-center border border-white/25 bg-[#040F24]/80 px-2 py-1.5 backdrop-blur-md shadow-md sm:min-w-[70px] sm:py-2"
              >
                <span
                  suppressHydrationWarning
                  className="font-pixel text-base font-bold tabular-nums text-white sm:text-xl"
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="font-mono text-[8px] tracking-widest text-[#9EB3D6] sm:text-[9px]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Two Hero Action Buttons strictly matching reference screenshot (Slide 3) */}
          <div className="hero-reveal mt-5 flex w-full max-w-sm flex-row items-center justify-center gap-2.5 sm:mt-6 sm:max-w-none sm:gap-3">
            {/* Left: Solid Lime REGISTER button */}
            <Link
              href="/register"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[3px] bg-[#A3F06D] px-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#040F24] shadow-[0_4px_16px_rgba(163,240,109,0.35)] transition-all hover:bg-[#B8F588] sm:min-h-[46px] sm:flex-initial sm:px-8"
            >
              REGISTER
            </Link>

            {/* Right: Dark Navy EXPLORE EVENTS button */}
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-[3px] border border-white/35 bg-[#0B214A]/90 px-4 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-md backdrop-blur-sm transition-all hover:bg-[#0E2C63] hover:border-white sm:min-h-[46px] sm:flex-initial sm:px-7"
            >
              <span>EXPLORE EVENTS</span>
              <span className="text-[#A3F06D]">→</span>
            </a>
          </div>

          {/* Track Quick Links matching reference "SCHEDULE, DAY 0 TO DAY 3 →" */}
          <div className="hero-reveal mt-4">
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-white/90 underline decoration-[#A3F06D]/60 decoration-1 underline-offset-4 transition-colors hover:text-[#A3F06D]"
            >
              <span>EXPLORE SCHEDULE &amp; ARENAS</span>
              <span className="text-[#A3F06D] transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
