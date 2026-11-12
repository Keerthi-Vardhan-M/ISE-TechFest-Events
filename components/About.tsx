"use client";

import { useEffect, useRef, useState } from "react";
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
        ABOUT_SECTION.metrics.forEach((metric, idx) => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: metric.value,
            duration: 1.0,
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
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
          {ABOUT_SECTION.titlePrefix}{" "}
          <span className="text-[#1D5BC6]">{ABOUT_SECTION.titleHighlight}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Quest Card with hard retro shadow */}
          <div className="quest-shadow border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-[#0A1B3D] bg-[#A3F06D] font-pixel text-lg font-bold text-[#0A1B3D]">
                01
              </div>
              <div>
                <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#1D5BC6]">
                  {ABOUT_SECTION.questRole}
                </p>
                <p className="text-sm text-[#4B5C7D]">{ABOUT_SECTION.questSubtitle}</p>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-[#0A1B3D]/90 sm:text-lg">
              {ABOUT_SECTION.questDescription}
            </p>
          </div>

          {/* Right Framed Tech Campus / Arena Illustration */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden border-2 border-[#0A1B3D] bg-[#06142E] p-3 shadow-[6px_6px_0_#0A1B3D]">
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-[#06142E] via-[#0C2A5A] to-[#123D7A] p-6">
                {/* Architectural pixel-grid campus graphic */}
                <svg
                  viewBox="0 0 360 160"
                  className="h-full w-full"
                  role="img"
                  aria-label="Campus Arena Blueprint Graphic"
                >
                  <rect x="20" y="75" width="70" height="60" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />
                  <rect x="32" y="90" width="14" height="14" fill="#22E5FF" />
                  <rect x="58" y="90" width="14" height="14" fill="#22E5FF" />
                  <rect x="115" y="45" width="125" height="90" fill="#F5EFE0" stroke="#0A1B3D" strokeWidth="2" />
                  <rect x="135" y="65" width="22" height="22" fill="#A3F06D" />
                  <rect x="168" y="65" width="22" height="22" fill="#A3F06D" />
                  <rect x="201" y="65" width="22" height="22" fill="#A3F06D" />
                  <rect x="260" y="65" width="80" height="70" fill="#FAF5E8" stroke="#0A1B3D" strokeWidth="2" />
                  <rect x="275" y="82" width="18" height="18" fill="#19F58A" />
                  <rect x="304" y="82" width="18" height="18" fill="#19F58A" />
                  <rect x="0" y="135" width="360" height="25" fill="#19F58A" fillOpacity="0.22" />
                </svg>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#9EB3D6]">
                <span>{ORGANISER_INFO.collegeName}</span>
                <span>{ORGANISER_INFO.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean 4-column metric bar with vertical dividers */}
        <div className="mt-14 grid grid-cols-2 divide-y divide-[#D9D0B8] border-y border-[#D9D0B8] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {ABOUT_SECTION.metrics.map((metric, idx) => (
            <div key={metric.label} className="px-4 py-6 sm:px-6">
              <div className="font-pixel text-3xl font-bold tabular-nums text-[#0A1B3D] sm:text-4xl">
                {"prefix" in metric ? metric.prefix : ""}
                {counts[idx].toLocaleString("en-IN")}
                {metric.suffix}
              </div>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
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
