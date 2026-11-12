"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { getEarliestEventDateISO, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";
import HeroCanvas from "./animations/HeroCanvas";

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

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
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
      if (!items?.length) return;

      if (prefersReducedMotion()) {
        gsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.35 });
      } else {
        gsap.fromTo(
          items,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: MOTION_EASE }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#041029] via-[#09214D] to-[#0D2E66] px-4 pb-16 pt-24 sm:px-6"
    >
      {/* Glowing Moon & Starry Pixel Sky Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[22%] h-56 w-56 -translate-x-1/2 rounded-full bg-[#F2F7C9]/90 shadow-[0_0_120px_35px_rgba(242,247,201,0.35)] sm:h-72 sm:w-72"
      />

      {/* Floating Pixel Clouds */}
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute left-[8%] top-[28%] hidden h-8 w-24 bg-white/85 shadow-[8px_8px_0_rgba(158,179,214,0.35)] sm:block"
      />
      <div
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute right-[10%] top-[34%] hidden h-7 w-20 bg-white/80 shadow-[8px_8px_0_rgba(158,179,214,0.35)] sm:block"
        style={{ animationDelay: "1.5s" }}
      />

      <HeroCanvas />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.28em] text-[#9EB3D6] sm:text-xs">
          {ORGANISER_INFO.heroEyebrow}
        </p>

        <h1
          className="hero-reveal mt-3 font-pixel font-bold tracking-wide text-[#A3F06D] drop-shadow-[0_4px_0_#040F24]"
          style={{ fontSize: "clamp(2.5rem, 8.5vw, 5.4rem)", lineHeight: 1.05 }}
        >
          {ORGANISER_INFO.heroHeadline}
        </h1>

        <p className="hero-reveal mt-2 font-mono text-xs uppercase tracking-[0.3em] text-[#F4F6FB] sm:text-sm">
          ANNUAL TECH SYMPOSIUM 2026
        </p>

        <p className="hero-reveal mt-4 max-w-xl text-sm leading-relaxed text-[#D8E3F5] sm:text-base">
          {ORGANISER_INFO.heroSubline}
        </p>

        {/* Crisp Countdown */}
        <div
          aria-label="Countdown to earliest event"
          className="hero-reveal mt-7 grid grid-cols-4 gap-2 sm:gap-3"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex min-w-[66px] flex-col items-center border border-[#9EB3D6]/30 bg-[#040F24]/75 px-3 py-2.5 backdrop-blur-sm sm:min-w-[82px]"
            >
              <span className="font-pixel text-xl font-bold tabular-nums text-[#F4F6FB] sm:text-2xl">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-widest text-[#9EB3D6]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons matching reference */}
        <div className="hero-reveal mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            ref={magneticBtnRef}
            href="#register"
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="inline-flex min-h-[48px] w-full items-center justify-center bg-[#A3F06D] px-7 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#040F24] shadow-[4px_4px_0_#040F24] transition-transform duration-200 hover:brightness-105 sm:w-auto"
          >
            REGISTER NOW
          </a>
          <a
            href="#events"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#9EB3D6]/45 bg-[#040F24]/65 px-7 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F6FB] backdrop-blur-sm transition-colors hover:bg-[#091D42] sm:w-auto"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Track Quick Pills matching DAY 0 -> DAY 1 -> style */}
        <div className="hero-reveal mt-4 flex flex-wrap items-center justify-center gap-2">
          <a
            href="#events"
            className="inline-flex min-h-[38px] items-center gap-1.5 border border-[#9EB3D6]/30 bg-[#040F24]/55 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] hover:border-[#22E5FF]"
          >
            <span>TRACK 01: AUTOMATE</span>
            <ArrowRight className="h-3 w-3 text-[#22E5FF]" />
          </a>
          <a
            href="#events"
            className="inline-flex min-h-[38px] items-center gap-1.5 border border-[#9EB3D6]/30 bg-[#040F24]/55 px-3.5 font-mono text-[11px] tracking-wider text-[#D8E3F5] hover:border-[#19F58A]"
          >
            <span>TRACK 02: QUANTFINANCE</span>
            <ArrowRight className="h-3 w-3 text-[#19F58A]" />
          </a>
        </div>
      </div>

      {/* Bottom Horizon Water Reflection Strip */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#06142E] to-transparent"
      />
    </section>
  );
}
