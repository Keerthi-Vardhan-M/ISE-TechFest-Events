"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SPONSORS_DATA } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

function GDGLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2.5">
        <Image
          src="/images/gdg-logo.svg"
          alt="Google Developer Groups"
          width={46}
          height={36}
          className="h-8 w-auto object-contain"
        />
        <span className="font-heading text-xl font-extrabold tracking-tight text-white">
          GDG
        </span>
      </div>
      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#A3F06D]">
        Google Developer Groups
      </span>
    </div>
  );
}

function VoiceClubLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <span className="font-pixel text-2xl font-bold tracking-wider text-white sm:text-3xl">
        VOICE CLUB
      </span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A3F06D]">
        TECH &amp; ORATION
      </span>
    </div>
  );
}

function MsritLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <Image
        src="/images/msrit-logo.png"
        alt="Ramaiah Institute of Technology"
        width={180}
        height={46}
        className="h-9 w-auto object-contain brightness-110"
      />
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#D8E8FC]">
        HOST INSTITUTION
      </span>
    </div>
  );
}

function HeapifyLogo() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center rounded-lg bg-black/60 px-4 py-1.5 border border-white/20 shadow-sm">
        <Image
          src="/images/heapify-logo.png"
          alt="Heapify Global Community"
          width={130}
          height={38}
          className="h-8 w-auto object-contain"
        />
      </div>
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#A3F06D]">
        COMMUNITY PARTNER
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

          <h2 className="font-pixel text-4xl font-bold tracking-wider text-[#FAF5E8] sm:text-6xl md:text-7xl">
            {SPONSORS_DATA.title}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#9EB3D6]">
            {SPONSORS_DATA.subtitle}
          </p>

          {/* Iterate over all tiers: Official Sponsors & Community Partner */}
          {SPONSORS_DATA.tiers.map((tier, tIdx) => {
            const isSingle = tier.sponsors.length === 1;
            return (
              <div key={tier.name} className={tIdx > 0 ? "mt-12" : ""}>
                {/* Divider Line */}
                <div className="mx-auto my-8 flex max-w-2xl items-center gap-4 sm:my-10">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: `${tier.accent}66` }}
                  />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-[0.28em]"
                    style={{ color: tier.accent }}
                  >
                    {tier.name}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: `${tier.accent}66` }}
                  />
                </div>

                {/* Sponsor Cards Grid with Exact Royal Blue Register Button Background */}
                <div
                  className={
                    isSingle
                      ? "mx-auto max-w-md"
                      : "grid grid-cols-1 gap-5 sm:grid-cols-3"
                  }
                >
                  {tier.sponsors.map((sp) => (
                    <a
                      key={sp.name}
                      href={sp.url}
                      target={sp.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="sponsor-card group flex flex-col justify-between rounded-xl border border-[#2B548A] bg-[#1648A8] p-6 shadow-[0_4px_16px_rgba(22,72,168,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#22E5FF] hover:bg-[#1D5BC6] hover:shadow-[0_8px_24px_rgba(34,229,255,0.4)]"
                    >
                      <div className="py-3 flex min-h-[72px] items-center justify-center">
                        {sp.logo === "gdg" && <GDGLogo />}
                        {sp.logo === "voice" && <VoiceClubLogo />}
                        {sp.logo === "msrit" && <MsritLogo />}
                        {sp.logo === "heapify" && <HeapifyLogo />}
                      </div>

                      <div className="mt-4 border-t border-white/20 pt-3 text-center">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#D8E8FC]">
                          {sp.desc}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
