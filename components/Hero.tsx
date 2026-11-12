"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { getEarliestEventDateISO, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

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
  onOpenRegister: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);

  const targetISO = getEarliestEventDateISO();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => computeTimeLeft(targetISO));

  useEffect(() => {
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
            { y: 26, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: MOTION_EASE }
          );
        }
      }

      if (prefersReducedMotion()) return;

      // Scroll-scrubbed parallax opening: sky zooms gently while content lifts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      if (bgRef.current) {
        tl.to(bgRef.current, { scale: 1.12, y: 45, ease: "none" }, 0);
      }
      if (contentRef.current) {
        tl.to(contentRef.current, { y: -42, opacity: 0.15, ease: "none" }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !bgRef.current) return;
    const dx = (e.clientX / window.innerWidth - 0.5) * -18;
    const dy = (e.clientY / window.innerHeight - 0.5) * -12;
    bgRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(1.04)`;
  };

  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    magneticBtnRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const resetMagnetic = () => {
    if (magneticBtnRef.current) {
      magneticBtnRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

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
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#06142E] px-4 pb-16 pt-24 sm:px-8"
    >
      {/* Full-bleed Widescreen Pixel/Voxel Floating Island Sky */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-[1.03] transition-transform duration-300 ease-out"
      >
        <Image
          src="/images/hero-sky-bg.jpg"
          alt="Floating voxel island sky backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Readability vignette on right side & bottom horizon */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040F24]/25 via-[#040F24]/35 to-[#040F24]/75" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06142E]/70 to-transparent" />
      </div>

      {/* Right-aligned content block matching reference screenshot */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center lg:justify-end">
        <div
          ref={contentRef}
          className="flex max-w-xl flex-col items-center text-center lg:mr-8 lg:w-[48%]"
        >
          <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.26em] text-[#D8E3F5] sm:text-xs">
            {ORGANISER_INFO.heroEyebrow}
          </p>

          <h1
            className="hero-reveal mt-2 font-pixel font-bold tracking-wide text-[#A3F06D] drop-shadow-[0_4px_0_#040F24]"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.4rem)", lineHeight: 1.06 }}
          >
            {ORGANISER_INFO.heroHeadline}
          </h1>

          <div className="hero-reveal my-3 h-px w-48 bg-white/30" />

          <p className="hero-reveal font-mono text-xs uppercase tracking-[0.26em] text-white sm:text-sm">
            ANNUAL TECH SYMPOSIUM 2026
          </p>

          <p className="hero-reveal mt-2 text-sm text-[#D8E3F5] sm:text-base">
            December 2026 • {ORGANISER_INFO.collegeName}, {ORGANISER_INFO.city}
          </p>

          {/* Compact Countdown */}
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
                className="flex min-w-[62px] flex-col items-center border border-white/25 bg-[#040F24]/70 px-2.5 py-2 backdrop-blur-md sm:min-w-[74px]"
              >
                <span className="font-pixel text-lg font-bold tabular-nums text-white sm:text-xl">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="mt-0.5 font-mono text-[9px] tracking-widest text-[#9EB3D6]">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Primary Buttons matching screenshot */}
          <div className="hero-reveal mt-6 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <button
              ref={magneticBtnRef}
              type="button"
              onClick={onOpenRegister}
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="inline-flex min-h-[46px] w-full items-center justify-center bg-[#1648A8] px-7 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white shadow-[0_6px_20px_rgba(22,72,168,0.45)] transition-all duration-200 hover:bg-[#1D5BC6] sm:w-auto"
            >
              REGISTER NOW
            </button>
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 border border-white/40 bg-[#040F24]/65 px-7 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:bg-[#091D42] sm:w-auto"
            >
              <span>EXPLORE EVENTS</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Track Quick Pills matching DAY 0 -> DAY 1 -> */}
          <div className="hero-reveal mt-3.5 flex flex-wrap items-center justify-center gap-2">
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[36px] items-center gap-1.5 border border-white/25 bg-[#040F24]/60 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] backdrop-blur-sm hover:border-[#22E5FF]"
            >
              <span>AUTOMATE</span>
              <ArrowRight className="h-3 w-3 text-[#22E5FF]" />
            </a>
            <a
              href="#events"
              onClick={(e) => scrollToSection(e, "events")}
              className="inline-flex min-h-[36px] items-center gap-1.5 border border-white/25 bg-[#040F24]/60 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] backdrop-blur-sm hover:border-[#19F58A]"
            >
              <span>QUANTFINANCE</span>
              <ArrowRight className="h-3 w-3 text-[#19F58A]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
