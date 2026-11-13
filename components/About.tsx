"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_SECTION, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>(
    ABOUT_SECTION.metrics.map(() => 0)
  );

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    if (prefersReducedMotion()) {
      setCounts(ABOUT_SECTION.metrics.map((m) => m.value));
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          ".about-left",
          { y: 36, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out" }
        );
        gsap.fromTo(
          ".about-right",
          { y: 36, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, delay: 0.1, ease: "power4.out" }
        );
        ABOUT_SECTION.metrics.forEach((metric, idx) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: metric.value,
            duration: 1.6,
            ease: "power3.out",
            onUpdate: () => {
              setCounts((prev) => {
                const next = [...prev];
                next[idx] = Math.round(obj.val);
                return next;
              });
            },
          });
        });
      },
    });

    return () => trigger.kill();
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
            className="text-[#1D5BC6]"
            style={{ textShadow: "0 0 12px rgba(29,91,198,0.26)" }}
          >
            {ABOUT_SECTION.titleHighlight}
          </span>
        </h2>

        {/* Much wider 2-card layout matching screenshot */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Quest Card: wider, spacious with soft beige background & retro border */}
          <div className="about-left flex flex-col justify-between border-2 border-[#0A1B3D] bg-[#FAF5E8] p-7 shadow-[6px_6px_0_#0A1B3D] sm:p-9 lg:col-span-6 lg:p-10">
            <div>
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border-2 border-[#0A1B3D] bg-[#A3F06D] font-pixel text-xl font-bold text-[#0A1B3D] shadow-[3px_3px_0_#0A1B3D]">
                  01
                </div>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#1D5BC6]">
                    {ABOUT_SECTION.questRole}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[#4B5C7D]">
                    {ABOUT_SECTION.questSubtitle}
                  </p>
                </div>
              </div>

              <p className="mt-8 text-base leading-relaxed text-[#0A1B3D] sm:text-lg lg:text-xl">
                {ABOUT_SECTION.questDescription}
              </p>
            </div>

            <div className="mt-8 border-t border-[#D9D0B8] pt-4 font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
              FLAGSHIP TECH ARENA • BENGALURU
            </div>
          </div>

          {/* Right Campus Illustration: tightly framed to the image with zero wasted blue space */}
          <div className="about-right flex flex-col justify-center lg:col-span-6">
            <div className="overflow-hidden border-2 border-[#0A1B3D] shadow-[6px_6px_0_#0A1B3D]">
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

        {/* Clean 4-column metric bar with responsive non-overlapping borders */}
        <div className="mt-14 grid grid-cols-2 border-y border-[#D9D0B8] sm:grid-cols-4">
          {ABOUT_SECTION.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 sm:border-r last:sm:border-r-0 sm:border-[#D9D0B8] ${
                idx % 2 === 1 ? "border-l border-[#D9D0B8] sm:border-l-0" : ""
              } ${
                idx >= 2 ? "border-t border-[#D9D0B8] sm:border-t-0" : ""
              }`}
            >
              <div className="font-pixel text-2xl font-bold tabular-nums text-[#0A1B3D] sm:text-3xl lg:text-4xl whitespace-nowrap">
                {"prefix" in metric ? metric.prefix : ""}
                {counts[idx].toLocaleString("en-IN")}
                {metric.suffix}
              </div>
              <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4B5C7D] sm:text-xs">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pixel Checkerboard Divider into Navy Events Section */}
      <div className="pixel-checker-divider" aria-hidden="true" />
    </section>
  );
}
