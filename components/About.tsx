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
      // About text & image entrance
      gsap.fromTo(
        ".about-left",
        { y: 36, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
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
        { y: 36, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          delay: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Dedicated ScrollTrigger directly on the metrics bar so count-up happens right in front of user
      if (metricsBarRef.current) {
        if (prefersReducedMotion()) {
          ABOUT_SECTION.metrics.forEach((metric, idx) => {
            const el = numberRefs.current[idx];
            if (el) {
              const prefix = "prefix" in metric ? metric.prefix : "";
              el.textContent = `${prefix}${metric.value.toLocaleString("en-IN")}${metric.suffix}`;
            }
          });
          return;
        }

        ScrollTrigger.create({
          trigger: metricsBarRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // Live 60-120fps animated count-up with frame-by-frame text updates
            ABOUT_SECTION.metrics.forEach((metric, idx) => {
              const el = numberRefs.current[idx];
              if (!el) return;

              const obj = { val: 0 };
              const prefix = "prefix" in metric ? metric.prefix : "";
              const suffix = metric.suffix ?? "";
              const duration = metric.value > 1000 ? 2.2 : metric.value > 10 ? 1.8 : 1.3;

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

            // Smooth entrance for metric items
            gsap.fromTo(
              ".about-stat-card",
              { y: 24, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
              }
            );
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
      {/* Expansive wide container matching reference screenshot */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28">
        {/* Large pixel heading with soft blur/glow */}
        <h2
          className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}
        >
          {ABOUT_SECTION.titlePrefix}{" "}
          <span
            className="text-[#1648A8]"
            style={{ textShadow: "0 0 16px rgba(22,72,168,0.28)" }}
          >
            {ABOUT_SECTION.titleHighlight}
          </span>
        </h2>

        {/* Two-column layout: left statement, right campus card */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="about-left space-y-6 lg:col-span-7">
            <p className="text-xl font-medium leading-relaxed text-[#0A1B3D] sm:text-2xl md:text-3xl">
              {ABOUT_SECTION.questDescription}
            </p>
            <p className="text-sm leading-relaxed text-[#4B5C7D] sm:text-base md:text-lg">
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

        {/* Clean 4-column metric bar with live rolling count-up animations */}
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
                className={`about-stat-card flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 sm:border-r last:sm:border-r-0 sm:border-[#D9D0B8] ${
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
                    {prefix}0{suffix}
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
