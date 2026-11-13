"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SPONSORS_DATA } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

function GDGLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2 font-pixel text-2xl sm:text-3xl text-[#22E5FF]">
        <span>&lt;&gt;</span>
        <span className="text-white">GDG</span>
      </div>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A3F06D]">
        Google Developer Groups
      </span>
    </div>
  );
}

function VoiceClubLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <span className="font-pixel text-2xl font-bold tracking-wider text-[#A3F06D] sm:text-3xl">
        VOICE CLUB
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#9EB3D6]">
        TECH &amp; ORATION
      </span>
    </div>
  );
}

function MsritLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <span className="font-pixel text-2xl font-bold tracking-wider text-[#22E5FF] sm:text-3xl">
        MSRIT
      </span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#9EB3D6]">
        RAMAIAH INSTITUTE OF TECHNOLOGY
      </span>
    </div>
  );
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sponsor-card",
        { y: 32, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tier = SPONSORS_DATA.tiers[0];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="cream-dot-grid relative px-3 py-16 text-[#F4F6FB] sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border-t-4 border-b-4 border-[#22E5FF] bg-[#0A1329] p-7 shadow-[0_24px_70px_rgba(6,20,46,0.35)] sm:rounded-[52px] sm:p-12 md:p-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-12"
          style={{
            backgroundImage: "radial-gradient(#22E5FF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#22E5FF]" />

          <h2
            className="font-pixel text-4xl font-bold tracking-wider text-[#FAF5E8] sm:text-6xl md:text-7xl"
            style={{ textShadow: "0 2px 6px rgba(34,229,255,0.18)" }}
          >
            {SPONSORS_DATA.title}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#9EB3D6]">
            {SPONSORS_DATA.subtitle}
          </p>

          {/* Divider Line */}
          <div className="mx-auto my-8 flex max-w-2xl items-center gap-4 sm:my-12">
            <div className="h-px flex-1 bg-[#22E5FF]/40" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#22E5FF]">
              {tier.name}
            </span>
            <div className="h-px flex-1 bg-[#22E5FF]/40" />
          </div>

          {/* 3 Sponsor Cards: Google Developer Groups, Voice Club, MSRIT */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {tier.sponsors.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target={sp.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="sponsor-card group flex flex-col justify-between rounded-xl border border-white/15 bg-[#06142E]/85 p-6 shadow-md transition-all duration-300 hover:border-[#22E5FF] hover:bg-[#091D42]"
              >
                <div className="py-3">
                  {sp.logo === "gdg" && <GDGLogo />}
                  {sp.logo === "voice" && <VoiceClubLogo />}
                  {sp.logo === "msrit" && <MsritLogo />}
                </div>

                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#9EB3D6]">
                    {sp.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
