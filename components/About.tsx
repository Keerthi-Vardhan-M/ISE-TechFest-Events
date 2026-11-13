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
      // Butter-melting staggered entrance for "ENGINEERING ARENA DECEMBER 2026."
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".about-title-word",
          {
            y: 38,
            opacity: 0,
            filter: "blur(12px)",
            scale: 0.94,
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1.2,
            stagger: 0.09,
            ease: "power4.out",
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
        { y: 32, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          delay: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-right",
        { y: 32, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          delay: 0.28,
          ease: "power4.out",
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

        {/* Two-column layout: left clean statement, right campus card exactly as screenshot */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="about-left space-y-4 lg:col-span-7">
            <p className="text-base font-normal leading-relaxed text-[#0A1B3D] sm:text-lg lg:text-xl">
              {ABOUT_SECTION.questDescription}
            </p>
            <p className="text-xs font-normal text-[#4B5C7D] sm:text-sm">
              {ABOUT_SECTION.questSubtitle}
            </p>
          </div>

          <div className="about-right lg:col-span-5">
            <div className="overflow-hidden border border-[#D9D0B8] bg-[#FAF5E8] p-2.5 shadow-[0_12px_36px_rgba(10,27,61,0.08)]">
              <div className="relative h-64 w-full sm:h-72 md:h-80">
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

      {/* Pixel Checkerboard Divider into Navy Events Section */}
      <div className="pixel-checker-divider" aria-hidden="true" />
    </section>
  );
}
