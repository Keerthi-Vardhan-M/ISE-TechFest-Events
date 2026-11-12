"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, Medal, Trophy } from "lucide-react";
import { EVENT_LIST } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function Prizes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prize-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="bg-[#06142E] px-4 py-20 text-[#F4F6FB] sm:px-6 lg:py-24"
    >
      <div className="pixel-checker-divider -mx-4 -mt-20 mb-16 sm:-mx-6 lg:-mt-24" aria-hidden="true" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#A3F06D]">
            REWARDS & PODIUM
          </p>
          <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
            Compete for the podium.
          </h2>
          <p className="mt-3 text-base text-[#9EB3D6]">
            Dedicated prize pools for both tracks, plus finalist certificates and trophy honors.
          </p>
        </div>

        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
          {EVENT_LIST.map((ev) => (
            <div
              key={ev.id}
              data-theme={ev.theme}
              className="prize-card w-[88vw] shrink-0 snap-center border border-[#9EB3D6]/30 bg-[#091D42]/90 p-6 shadow-[6px_6px_0_#030B1A] transition-transform duration-300 hover:-translate-y-1 sm:p-8 md:w-auto"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#9EB3D6]/20 pb-5">
                <div>
                  <span
                    className="font-mono text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {ev.categoryLabel}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-[#F4F6FB]">
                    {ev.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] uppercase text-[#9EB3D6]">Total Pool</span>
                  <p className="font-pixel text-2xl font-bold text-[#A3F06D] sm:text-3xl">
                    {ev.prizePool}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {ev.podium.map((p, idx) => {
                  const Icon = idx === 0 ? Trophy : idx === 1 ? Medal : Award;
                  return (
                    <div
                      key={p.rank}
                      className="flex items-center justify-between gap-3 border border-[#9EB3D6]/20 bg-[#040F24]/70 px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center border border-[#9EB3D6]/25 bg-[#091D42]"
                          style={{ color: idx === 0 ? "var(--accent-primary)" : "#F4F6FB" }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] uppercase text-[#9EB3D6]">
                            {p.rank} Place
                          </span>
                          <p className="font-heading text-base font-semibold text-[#F4F6FB]">
                            {p.title}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: "var(--accent-primary)" }}
                      >
                        {p.reward}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pixel-checker-divider -mx-4 -mb-20 mt-20 sm:-mx-6 lg:-mb-24" aria-hidden="true" />
    </section>
  );
}
