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

  // Parallax layer refs
  const skyRef = useRef<HTMLDivElement>(null);
  const islandsRef = useRef<HTMLDivElement>(null);
  const bearRef = useRef<HTMLDivElement>(null);
  const bullRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const mobileBgRef = useRef<HTMLDivElement>(null);

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
      // Intro entrance reveal
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

      // Parallax scroll animation across all viewports with cinematic slow-scroll pinning
      if (!prefersReducedMotion() && heroRef.current) {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: isMobile ? "+=70%" : "+=90%",
            pin: true,
            pinSpacing: true,
            scrub: 0.8, // Slow, buttery scrub so users clearly witness the bull deviating
            invalidateOnRefresh: true,
          },
        });

        // 1. Green Bull: Slides noticeably to the RIGHT and upwards
        if (bullRef.current) {
          tl.to(
            bullRef.current,
            {
              x: isMobile ? 36 : isTablet ? 58 : 88,
              y: isMobile ? -24 : isTablet ? -32 : -46,
              ease: "power1.out",
              force3D: true,
            },
            0
          );
        }

        // 2. Red Bear: Moves upward and right
        if (bearRef.current) {
          tl.to(
            bearRef.current,
            {
              x: isMobile ? 18 : isTablet ? 24 : 40,
              y: isMobile ? -20 : isTablet ? -24 : -42,
              ease: "none",
              force3D: true,
            },
            0
          );
        }

        // 3. Floating Islands: Move at slower speed for depth
        if (islandsRef.current) {
          tl.to(
            islandsRef.current,
            {
              y: isMobile ? -10 : isTablet ? -12 : -20,
              ease: "none",
              force3D: true,
            },
            0
          );
        }

        // 4. Foreground: Moves slightly faster to enhance depth
        if (fgRef.current) {
          tl.to(
            fgRef.current,
            {
              y: isMobile ? -16 : isTablet ? -18 : -30,
              ease: "none",
              force3D: true,
            },
            0
          );
        }

        // 5. Background sky: Remains mostly stationary
        if (skyRef.current) {
          tl.to(
            skyRef.current,
            {
              y: isMobile ? 6 : isTablet ? 6 : 10,
              ease: "none",
              force3D: true,
            },
            0
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
      {/* Background artwork: multi-layer cinematic parallax across all viewports */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Multi-Layer Parallax Background */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          {/* Layer 1: Background Sky & Clouds (mostly stationary) */}
          <div
            ref={skyRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-layer-sky.webp"
              alt=""
              className="h-full w-full object-cover object-[28%_center] sm:object-center"
              style={{
                filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
              }}
            />
          </div>

          {/* Layer 2: Floating Islands & Waterfall (depth layer) */}
          <div
            ref={islandsRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div className="h-full w-full animate-hero-island-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-layer-islands.webp"
                alt=""
                className="h-full w-full object-cover object-[28%_center] sm:object-center"
                style={{
                  filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
                }}
              />
            </div>
          </div>

          {/* Layer 3: Red Bear & Candlesticks (moves upward and right + subtle idle float) */}
          <div
            ref={bearRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div className="h-full w-full animate-hero-bear-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-layer-bear.webp"
                alt=""
                className="h-full w-full object-cover object-[28%_center] sm:object-center"
                style={{
                  filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
                }}
              />
            </div>
          </div>

          {/* Layer 4: Green Bull & Candlestick Arc (moves upward and left + subtle floating tilt) */}
          <div
            ref={bullRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            <div className="h-full w-full animate-hero-bull-float">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-layer-bull.webp"
                alt=""
                className="h-full w-full object-cover object-[28%_center] sm:object-center"
                style={{
                  filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
                }}
              />
            </div>
          </div>

          {/* Layer 5: Foreground (Cherry tree, cliff, boy, cat, lantern) */}
          <div
            ref={fgRef}
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{ transform: "translate3d(0, 0, 0)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-layer-foreground.webp"
              alt=""
              className="h-full w-full object-cover object-[28%_center] sm:object-center"
              style={{
                filter: "contrast(1.05) saturate(1.08) brightness(1.02)",
              }}
            />
          </div>
        </div>

        {/* Mobile atmospheric contrast wash so text is readable over bull */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-b from-[#020b1f]/15 via-transparent to-[#020b1f]/35" />

        {/* Desktop-only subtle right-side gradient so text is crisp without dimming the bull/bear/clouds */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#020b1f]/15 to-[#020b1f]/70" />

        {/* Smooth atmospheric blue shade transition melting into the deep blue base */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-44"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(22, 72, 168, 0.15) 30%, rgba(10, 37, 88, 0.6) 65%, #0a2558 100%)",
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
            <span className="font-bold text-[#A3F06D]">
              MSRIT ISE
            </span>{" "}
            PRESENTS
          </p>

          {/* Event Title: AUTOMATE × QUANT */}
          <h1
            className="hero-reveal mt-2 font-pixel text-4xl font-extrabold tracking-tight text-[#A3F06D] sm:text-6xl md:text-7xl"
            style={{
              textShadow: "0 3px 0 #072513, 0 5px 0 #040F24",
            }}
          >
            {ORGANISER_INFO.heroHeadline}
          </h1>

          {/* Info, Timer & Buttons — shifted a little left in desktop web view per user request */}
          <div className="flex w-full flex-col items-center lg:items-end lg:-translate-x-12 xl:-translate-x-16">
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
      </div>
    </section>
  );
}
