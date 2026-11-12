"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_SECTION } from "@/content/events";
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
            duration: 1.1,
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
    <section id="about" ref={sectionRef} className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#19F58A]">
            {ABOUT_SECTION.eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#EDEFF5] sm:text-5xl">
            {ABOUT_SECTION.title}
          </h2>
          <p className="mt-3 text-base text-[#8A90A2]">{ABOUT_SECTION.subtitle}</p>
        </div>

        {/* Animated Counters */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ABOUT_SECTION.metrics.map((metric, idx) => (
            <div
              key={metric.label}
              className="glass-surface rounded-2xl p-5 sm:p-6"
            >
              <div className="font-heading text-3xl font-bold tabular-nums text-[#EDEFF5] sm:text-4xl">
                {"prefix" in metric ? metric.prefix : ""}
                {counts[idx].toLocaleString("en-IN")}
                {metric.suffix}
              </div>
              <p className="mt-1.5 text-sm font-medium text-[#EDEFF5]">{metric.label}</p>
              <p className="mt-0.5 font-mono text-[11px] text-[#8A90A2]">{metric.note}</p>
            </div>
          ))}
        </div>

        {/* 4 Value Points */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ABOUT_SECTION.highlights.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/8 bg-[#0F1218]/60 p-6 transition-colors hover:border-white/15"
            >
              <span className="font-mono text-xs text-[#22E5FF]">0{idx + 1}</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-[#EDEFF5]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8A90A2]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

