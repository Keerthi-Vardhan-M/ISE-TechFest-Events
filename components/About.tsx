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
          { x: -45, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        gsap.fromTo(
          ".about-right",
          { x: 45, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
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
      className="dark-dot-grid relative bg-[#06142E] text-[#F4F6FB]"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
          {ABOUT_SECTION.titlePrefix}{" "}
          <span className="text-[#A3F06D]">{ABOUT_SECTION.titleHighlight}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Quest Card */}
          <div className="about-left navy-card p-6 sm:p-8 lg:col-span-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#A3F06D]/40 bg-[#A3F06D]/15 font-pixel text-lg font-bold text-[#A3F06D]">
                01
              </div>
              <div>
                <p className="font-mono text-xs font-bold tracking-[0.18em] text-[#22E5FF]">
                  {ABOUT_SECTION.questRole}
                </p>
                <p className="text-sm text-[#9EB3D6]">{ABOUT_SECTION.questSubtitle}</p>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-[#D8E3F5] sm:text-lg">
              {ABOUT_SECTION.questDescription}
            </p>
          </div>

          {/* Right Framed Tech Campus / Arena Illustration */}
          <div className="about-right lg:col-span-6">
            <div className="navy-card overflow-hidden p-3">
              <div className="relative h-60 w-full overflow-hidden sm:h-64">
                <Image
                  src="/images/campus-arena.jpg"
                  alt="Isometric engineering and robotics campus arena at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-[#9EB3D6]">
                <span>{ORGANISER_INFO.collegeName}</span>
                <span>{ORGANISER_INFO.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column metric bar */}
        <div className="mt-14 grid grid-cols-2 divide-y divide-[#9EB3D6]/15 border-y border-[#9EB3D6]/20 bg-[#081A3D]/40 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {ABOUT_SECTION.metrics.map((metric, idx) => (
            <div key={metric.label} className="px-4 py-6 sm:px-6">
              <div className="font-pixel text-3xl font-bold tabular-nums text-[#A3F06D] sm:text-4xl">
                {"prefix" in metric ? metric.prefix : ""}
                {counts[idx].toLocaleString("en-IN")}
                {metric.suffix}
              </div>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-[#9EB3D6]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
