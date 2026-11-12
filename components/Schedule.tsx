"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { SCHEDULE_STAGES } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

function StageArt({ type }: { type: "forge" | "ignite" | "arena" | "trophy" }) {
  return (
    <div className="flex h-36 w-full items-center justify-center bg-gradient-to-b from-[#061A40] to-[#123D7A] p-4">
      {type === "forge" && (
        <svg viewBox="0 0 120 90" className="h-24 w-28" aria-hidden="true">
          <rect x="28" y="34" width="64" height="44" fill="#3B4D6B" stroke="#0A1B3D" strokeWidth="2" />
          <rect x="44" y="48" width="32" height="30" fill="#0A1B3D" />
          <rect x="50" y="54" width="20" height="24" fill="#FF8A1F" />
          <rect x="54" y="60" width="12" height="18" fill="#F5C451" />
          <rect x="0" y="76" width="120" height="14" fill="#46A844" />
        </svg>
      )}
      {type === "ignite" && (
        <svg viewBox="0 0 120 90" className="h-24 w-28" aria-hidden="true">
          <rect x="42" y="54" width="36" height="24" fill="#3B4D6B" stroke="#0A1B3D" strokeWidth="2" />
          <polygon points="60,16 44,48 76,48" fill="#22E5FF" />
          <polygon points="60,26 50,48 70,48" fill="#A3F06D" />
          <rect x="0" y="76" width="120" height="14" fill="#46A844" />
        </svg>
      )}
      {type === "arena" && (
        <svg viewBox="0 0 120 90" className="h-24 w-28" aria-hidden="true">
          <rect x="22" y="38" width="76" height="40" fill="#2B3E5E" stroke="#0A1B3D" strokeWidth="2" />
          <rect x="34" y="50" width="14" height="18" fill="#FF8A1F" />
          <rect x="53" y="50" width="14" height="18" fill="#22E5FF" />
          <rect x="72" y="50" width="14" height="18" fill="#19F58A" />
          <rect x="0" y="76" width="120" height="14" fill="#46A844" />
        </svg>
      )}
      {type === "trophy" && (
        <svg viewBox="0 0 120 90" className="h-24 w-28" aria-hidden="true">
          <rect x="40" y="20" width="40" height="28" fill="#F5C451" stroke="#0A1B3D" strokeWidth="2" />
          <rect x="54" y="48" width="12" height="14" fill="#D99B26" />
          <rect x="38" y="62" width="44" height="14" fill="#3B4D6B" stroke="#0A1B3D" strokeWidth="2" />
          <rect x="0" y="76" width="120" height="14" fill="#46A844" />
        </svg>
      )}
    </div>
  );
}

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".schedule-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="cream-dot-grid text-[#0A1B3D]">
      <div className="pixel-checker-divider" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl" style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}>
          Round 01 to Finale
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCHEDULE_STAGES.map((stage) => (
            <div
              key={stage.day}
              className="schedule-card quest-shadow flex flex-col justify-between border-2 border-[#0A1B3D] bg-[#FAF5E8] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div>
                <StageArt type={stage.iconType} />
                <div className="p-5">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#4B5C7D]">
                    {stage.day}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-bold text-[#0A1B3D]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5C7D]">
                    {stage.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#D9D0B8] px-5 py-3.5">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[#4B5C7D]">
                  {stage.sessions}
                </span>
                <a
                  href="#events"
                  aria-label={`View ${stage.title} details`}
                  className="inline-flex h-9 w-9 items-center justify-center border border-[#D9D0B8] bg-[#F5EFE0] text-[#0A1B3D] transition-colors hover:bg-[#A3F06D]"
                >
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
