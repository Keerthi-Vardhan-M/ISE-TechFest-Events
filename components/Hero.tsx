"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const emblemRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
      if (items?.length) {
        if (prefersReducedMotion()) {
          gsap.fromTo(items, { opacity: 0 }, { opacity: 1, duration: 0.35 });
        } else {
          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: MOTION_EASE }
          );
        }
      }

      if (prefersReducedMotion()) return;

      // Scroll-scrubbed opening animation (crest scales/lifts, side wings part open)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      if (emblemRef.current) {
        tl.to(emblemRef.current, { scale: 1.26, y: -48, opacity: 0.2, ease: "none" }, 0);
      }
      if (leftCurtainRef.current) {
        tl.to(leftCurtainRef.current, { xPercent: -16, opacity: 0, ease: "none" }, 0);
      }
      if (rightCurtainRef.current) {
        tl.to(rightCurtainRef.current, { xPercent: 16, opacity: 0, ease: "none" }, 0);
      }
      if (contentRef.current) {
        tl.to(contentRef.current, { y: -36, opacity: 0.15, ease: "none" }, 0);
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#06142E] px-4 pb-16 pt-28 sm:px-6"
    >
      {/* Left & Right Architectural Curtain Wings that part open on scroll */}
      <div
        ref={leftCurtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#030B1B] via-[#041029]/60 to-transparent"
      />
      <div
        ref={rightCurtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#030B1B] via-[#041029]/60 to-transparent"
      />

      <HeroCanvas />

      <div ref={contentRef} className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        {/* Custom Celestial-Engineering Crest */}
        <div
          ref={emblemRef}
          className="hero-reveal relative mb-4 h-36 w-36 overflow-hidden rounded-full border border-[#22E5FF]/35 shadow-[0_0_60px_rgba(34,229,255,0.28)] sm:h-44 sm:w-44"
        >
          <Image
            src="/images/hero-emblem.jpg"
            alt="Automate and Quant celestial engineering crest"
            fill
            priority
            sizes="(max-width: 640px) 144px, 176px"
            className="object-cover"
          />
        </div>

        <p className="hero-reveal font-mono text-[11px] uppercase tracking-[0.28em] text-[#9EB3D6] sm:text-xs">
          {ORGANISER_INFO.heroEyebrow}
        </p>

        <h1
          className="hero-reveal mt-2 font-pixel font-bold tracking-wide text-[#A3F06D] drop-shadow-[0_4px_0_#040F24]"
          style={{ fontSize: "clamp(2.2rem, 7.6vw, 4.9rem)", lineHeight: 1.06 }}
        >
          {ORGANISER_INFO.heroHeadline}
        </h1>

        <p className="hero-reveal mt-2 font-mono text-xs uppercase tracking-[0.26em] text-[#F4F6FB] sm:text-sm">
          ✦ REGISTRATION OPEN FOR DECEMBER 2026 ✦
        </p>

        <p className="hero-reveal mt-3 max-w-xl text-sm leading-relaxed text-[#D8E3F5] sm:text-base">
          {ORGANISER_INFO.heroSubline}
        </p>

        {/* Countdown */}
        <div
          aria-label="Countdown to earliest event"
          className="hero-reveal mt-6 grid grid-cols-4 gap-2 sm:gap-3"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="flex min-w-[66px] flex-col items-center border border-[#9EB3D6]/30 bg-[#040F24]/80 px-3 py-2.5 backdrop-blur-sm sm:min-w-[82px]"
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

        {/* Action Buttons */}
        <div className="hero-reveal mt-7 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
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
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#9EB3D6]/45 bg-[#040F24]/70 px-7 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#F4F6FB] backdrop-blur-sm transition-colors hover:bg-[#091D42] sm:w-auto"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Horizon Seam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5EFE0]/15 to-transparent"
      />
    </section>
  );
}
