"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { getEarliestEventDateISO, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, prefersReducedMotion } from "@/lib/motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeTimeLeft(targetISO: string): TimeLeft {
  const diff = Math.max(0, new Date(targetISO).getTime() - Date.now());
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
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
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
            { y: 32, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.05,
              stagger: 0.08,
              ease: "power4.out",
            }
          );
        }
      }

      if (prefersReducedMotion()) return;

      // Clean subtle content entrance on scroll - background stays completely fixed and static
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      if (contentRef.current) {
        tl.to(contentRef.current, { y: -36, opacity: 0.12, ease: "none" }, 0);
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
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#020b1f] px-4 pb-14 pt-20 sm:px-8"
    >
      {/* Entire 16:9 Artwork permanently fixed without any zoom, cropping, or shifting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#020b1f]"
      >
        <Image
          src="/images/hero-sky-bg.jpg"
          alt="Floating voxel island sky backdrop"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-contain object-center"
        />

        {/* Soft atmospheric gradient shade on the right half to guarantee 100% crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#020b1f]/25 to-[#020b1f]/70" />

        {/* Soft misty cloud sky-to-cream gradient transition into the About section at the very bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 sm:h-20"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(205, 225, 242, 0.25) 50%, rgba(235, 242, 248, 0.8) 85%, #FAF5E8 100%)",
          }}
        />
      </div>

      {/* Right-aligned content block strictly matching the reference screenshot design */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center lg:justify-end">
        <div
          ref={contentRef}
          className="flex max-w-xl flex-col items-center text-center rounded-xl p-4 sm:p-6 lg:mr-6 lg:w-[50%] lg:p-0"
        >
          {/* Eyebrow: QUANT CLUB • MSRIT PRESENTS */}
          <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.28em] text-[#D8E3F5] sm:text-xs">
            {ORGANISER_INFO.heroEyebrow}
          </p>

          {/* Event Title: AUTOMATE × QUANT */}
          <h1
            className="hero-reveal mt-2 font-pixel text-4xl font-extrabold tracking-wide text-[#A3F06D] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              textShadow: "0 4px 0 #072513, 0 8px 0 #040F24, 0 12px 24px rgba(0,0,0,0.8)",
            }}
          >
            {ORGANISER_INFO.heroHeadline}
          </h1>

          {/* Refined Diamond Star Divider */}
          <div className="hero-reveal my-3 flex w-52 items-center justify-center gap-2.5 text-white/40">
            <div className="h-px flex-1 bg-white/30" />
            <span className="text-xs text-[#A3F06D]">✦</span>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {/* Fest Name & Edition */}
          <p className="hero-reveal font-mono text-xs uppercase tracking-[0.26em] text-white sm:text-sm">
            ANNUAL TECH SYMPOSIUM 2026
          </p>

          {/* Date & Venue */}
          <p className="hero-reveal mt-1.5 text-sm text-[#D8E3F5] sm:text-base">
            December 2026 • {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}
          </p>

          {/* Compact Countdown matching older 4-box layout */}
          <div
            aria-label="Countdown to earliest event"
            className="hero-reveal mt-5 grid grid-cols-4 gap-2"
          >
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HRS", value: timeLeft.hours },
              { label: "MIN", value: timeLeft.minutes },
              { label: "SEC", value: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[62px] flex-col items-center border border-white/25 bg-[#040F24]/80 px-2.5 py-2 backdrop-blur-md shadow-md sm:min-w-[74px]"
              >
                <span
                  suppressHydrationWarning
                  className="font-pixel text-lg font-bold tabular-nums text-white sm:text-xl"
                >
                  {mounted ? String(unit.value).padStart(2, "0") : "00"}
                </span>
                <span className="mt-0.5 font-mono text-[9px] tracking-widest text-[#9EB3D6]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Two Action Buttons strictly matching reference screenshot */}
          <div className="hero-reveal mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            {/* Left Button: Crisp Solid Lime-Green REGISTER button */}
            <Link
              href="/register"
              className="inline-flex min-h-[46px] w-full items-center justify-center rounded-[3px] bg-[#A3F06D] px-8 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#040F24] shadow-[0_4px_16px_rgba(163,240,109,0.4)] transition-all duration-200 hover:bg-[#B8F588] hover:shadow-[0_6px_22px_rgba(163,240,109,0.6)] sm:w-auto"
            >
              REGISTER
            </Link>

            {/* Right Button: Dark Navy EXPLORE EVENTS button with light border */}
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[3px] border border-white/35 bg-[#0B214A]/90 px-7 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-[#0E2C63] hover:border-white sm:w-auto"
            >
              <span>EXPLORE EVENTS</span>
              <span className="text-[#A3F06D]">→</span>
            </a>
          </div>

          {/* Track Quick Pills matching DAY 0 -> DAY 1 -> */}
          <div className="hero-reveal mt-4 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[34px] items-center gap-1.5 border border-white/25 bg-[#040F24]/75 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] backdrop-blur-sm hover:border-[#22E5FF]"
            >
              <span>AUTOMATE</span>
              <span className="text-[#22E5FF]">→</span>
            </a>
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[34px] items-center gap-1.5 border border-white/25 bg-[#040F24]/75 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] backdrop-blur-sm hover:border-[#19F58A]"
            >
              <span>QUANTFINANCE</span>
              <span className="text-[#19F58A]">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
