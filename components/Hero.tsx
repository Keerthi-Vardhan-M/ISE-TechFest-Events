"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowDownRight, Calendar, Sparkles } from "lucide-react";
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
      const words = heroRef.current?.querySelectorAll(".hero-word");
      if (!words?.length) return;

      if (prefersReducedMotion()) {
        gsap.fromTo(words, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      } else {
        gsap.fromTo(
          words,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.06,
            ease: MOTION_EASE,
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !magneticBtnRef.current) return;
    const rect = magneticBtnRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    magneticBtnRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const resetMagnetic = () => {
    if (magneticBtnRef.current) {
      magneticBtnRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const words = ORGANISER_INFO.heroHeadline.split(" ");

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,229,255,0.09),transparent_55%),radial-gradient(circle_at_75%_65%,rgba(25,245,138,0.07),transparent_50%)]"
      />

      <HeroCanvas />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#8A90A2] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-[#22E5FF]" />
          <span>{ORGANISER_INFO.heroEyebrow}</span>
        </div>

        <h1
          className="font-heading font-bold tracking-tight text-[#EDEFF5]"
          style={{ fontSize: "clamp(2.4rem, 8.2vw, 5.5rem)", lineHeight: 1.03 }}
        >
          {words.map((word, idx) => (
            <span key={`${word}-${idx}`} className="hero-word inline-block mr-[0.26em] last:mr-0">
              {word}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#8A90A2] sm:text-lg">
          {ORGANISER_INFO.heroSubline}
        </p>

        {/* Countdown */}
        <div
          aria-label="Countdown to earliest event"
          className="mt-8 grid grid-cols-4 gap-2.5 sm:gap-4"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="glass-surface flex min-w-[68px] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[88px] sm:px-5"
            >
              <span className="font-mono text-2xl font-bold tabular-nums text-[#EDEFF5] sm:text-3xl">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="mt-1 font-mono text-[10px] tracking-widest text-[#8A90A2]">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <a
            ref={magneticBtnRef}
            href="#register"
            onMouseMove={handleMagnetic}
            onMouseLeave={resetMagnetic}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#22E5FF] to-[#19F58A] px-7 font-heading text-base font-bold text-[#07080B] shadow-[0_0_30px_rgba(34,229,255,0.22)] transition-transform duration-200 hover:brightness-110 sm:w-auto"
          >
            <span>Register Now</span>
            <ArrowDownRight className="h-4 w-4" />
          </a>
          <a
            href="#events"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-7 font-heading text-base font-medium text-[#EDEFF5] transition-colors hover:bg-white/[0.08] sm:w-auto"
          >
            <Calendar className="h-4 w-4 text-[#8A90A2]" />
            <span>Explore Events</span>
          </a>
        </div>
      </div>
    </section>
  );
}

