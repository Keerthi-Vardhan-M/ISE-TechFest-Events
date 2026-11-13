"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_SECTION, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth staggered entrance for "ENGINEERING ARENA DECEMBER 2026."
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".about-title-word",
          {
            y: 28,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // About text & image entrance (cascades right after title)
      gsap.fromTo(
        ".about-left",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-right",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Dedicated ScrollTrigger on the metrics bar: rolls numbers up from 0 when in view
      if (metricsBarRef.current && !prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: metricsBarRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            ABOUT_SECTION.metrics.forEach((metric, idx) => {
              const el = numberRefs.current[idx];
              if (!el) return;

              const obj = { val: 0 };
              const prefix = "prefix" in metric ? metric.prefix : "";
              const suffix = metric.suffix ?? "";
              const duration = metric.value > 1000 ? 1.9 : metric.value > 10 ? 1.4 : 1.0;

              gsap.to(obj, {
                val: metric.value,
                duration,
                ease: "power2.out",
                onUpdate: () => {
                  const currentVal = Math.round(obj.val);
                  el.textContent = `${prefix}${currentVal.toLocaleString("en-IN")}${suffix}`;
                },
                onComplete: () => {
                  el.textContent = `${prefix}${metric.value.toLocaleString("en-IN")}${suffix}`;
                },
              });
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="cream-dot-grid relative text-[#0A1B3D]"
    >
      {/* Expansive wide container exactly matching reference screenshot */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-24">
        {/* Large pixel heading matching screenshot: ENGINEERING ARENA in dark, DECEMBER 2026. in blue with butter melting entrance */}
        <h2
          className="font-pixel text-3xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}
        >
          <span className="text-[#0A1B3D]">
            {ABOUT_SECTION.titlePrefix.split(" ").map((word, i) => (
              <span
                key={i}
                className="about-title-word inline-block mr-[0.3em] transition-transform duration-300 hover:-translate-y-1"
              >
                {word}
              </span>
            ))}
          </span>
          <span
            className="text-[#1648A8] inline-block"
            style={{ textShadow: "0 0 16px rgba(22,72,168,0.28)" }}
          >
            {ABOUT_SECTION.titleHighlight.split(" ").map((word, i) => (
              <span
                key={i}
                className="about-title-word inline-block mr-[0.25em] last:mr-0 transition-transform duration-300 hover:-translate-y-1"
              >
                {word}
              </span>
            ))}
          </span>
        </h2>

        {/* Two-column layout strictly matching reference screenshot with dialogue box & chamfered campus card */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Quest Dialog Box with Campus Guide avatar */}
          <div className="about-left flex flex-col justify-between border-2 border-[#C4B79B] bg-[#FAF5E8] p-6 shadow-[4px_4px_0_#0A1B3D] sm:p-7 md:p-8 lg:col-span-6">
            <div>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#C4B79B] bg-[#F5EFE0] p-1 shadow-sm sm:h-16 sm:w-16">
                  <Image
                    src="/images/campus-guide-avatar.png"
                    alt="Campus Guide Avatar"
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0A1B3D]">
                    {ABOUT_SECTION.questRole}
                  </p>
                  <p className="mt-1 text-xs text-[#4B5C7D] sm:text-sm">
                    {ABOUT_SECTION.questSubtitle}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-[#0A1B3D] sm:text-base lg:text-lg">
                {ABOUT_SECTION.questDescription}
              </p>
            </div>
          </div>

          {/* Right Chamfered Campus Box matching reference screenshot */}
          <div className="about-right flex flex-col justify-between lg:col-span-6">
            <div
              className="relative p-[2.5px] bg-[#0A1B3D] shadow-[4px_4px_0_rgba(10,27,61,0.18)] transition-transform duration-300 hover:scale-[1.01]"
              style={{
                clipPath:
                  "polygon(28px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 28px)",
              }}
            >
              <div
                className="relative h-64 w-full sm:h-72 md:h-80 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(26px 0%, 100% 0%, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0% 100%, 0% 26px)",
                }}
              >
                <Image
                  src="/images/campus-arena.jpg"
                  alt="Isometric engineering and robotics campus arena at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-between px-1 font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
              <span>OUR NEW CAMPUS</span>
              <span>{ORGANISER_INFO.city.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* 4-column metric bar exactly matching screenshot with increasing count animation */}
        <div
          ref={metricsBarRef}
          className="mt-14 grid grid-cols-2 border-y border-[#D9D0B8] sm:grid-cols-4"
        >
          {ABOUT_SECTION.metrics.map((metric, idx) => {
            const prefix = "prefix" in metric ? metric.prefix : "";
            const suffix = metric.suffix ?? "";
            return (
              <div
                key={metric.label}
                className={`flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 sm:border-r last:sm:border-r-0 sm:border-[#D9D0B8] ${
                  idx % 2 === 1 ? "border-l border-[#D9D0B8] sm:border-l-0" : ""
                } ${
                  idx >= 2 ? "border-t border-[#D9D0B8] sm:border-t-0" : ""
                }`}
              >
                <div className="font-pixel text-2xl font-bold tabular-nums text-[#0A1B3D] sm:text-3xl lg:text-4xl whitespace-nowrap">
                  <span
                    ref={(el) => {
                      numberRefs.current[idx] = el;
                    }}
                  >
                    {prefix}
                    {metric.value.toLocaleString("en-IN")}
                    {suffix}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4B5C7D] sm:text-xs">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pixelated Dithering Divider into Navy Events Section */}
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
    </section>
  );
}
