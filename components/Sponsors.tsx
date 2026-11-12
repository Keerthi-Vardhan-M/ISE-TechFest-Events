"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink, Handshake } from "lucide-react";
import { SPONSORS_DATA } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

function GitHubLogo() {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {/* GitHub Octocat Silhouette SVG */}
      <svg
        className="h-16 w-16 fill-white transition-transform duration-300 group-hover:scale-106 sm:h-20 sm:w-20 md:h-24 md:w-24"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
      {/* GitHub Wordmark */}
      <span className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
        GitHub
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
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleTier = SPONSORS_DATA.tiers[0];
  const platformTier = SPONSORS_DATA.tiers[1];
  const trackTier = SPONSORS_DATA.tiers[2];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06142E] px-4 py-20 text-[#F4F6FB] sm:px-6 lg:py-28"
    >
      {/* Curved Header Container styled for our cyber-pixel theme */}
      <div className="relative mx-auto max-w-6xl rounded-t-[36px] border-t-4 border-[#22E5FF] bg-[#071738] p-8 shadow-[0_20px_60px_rgba(3,10,24,0.7)] sm:rounded-t-[48px] sm:p-12 md:p-16">
        {/* Subtle dot grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(#22E5FF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 text-center">
          {/* Top Bar Accent */}
          <div className="mx-auto mb-3 h-1 w-14 rounded-full bg-[#22E5FF]" />

          <h2
            className="font-pixel text-4xl font-bold tracking-wider text-white sm:text-6xl md:text-7xl"
            style={{ textShadow: "0 0 16px rgba(34,229,255,0.35)" }}
          >
            {SPONSORS_DATA.title}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#9EB3D6]">
            {SPONSORS_DATA.subtitle}
          </p>

          {/* Title Sponsor Divider Line */}
          <div className="mx-auto my-12 flex max-w-2xl items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#22E5FF]">
              {titleTier.name}
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          {/* Giant Title Sponsor Card matching reference screenshot */}
          <div className="sponsor-card mx-auto max-w-3xl">
            {titleTier.sponsors.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border-2 border-[#1648A8] bg-[#0A1E46]/95 p-10 shadow-[0_12px_40px_rgba(4,15,36,0.85)] transition-all duration-300 hover:border-[#22E5FF] hover:shadow-[0_16px_50px_rgba(34,229,255,0.25)] sm:p-14"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(34,229,255,0.18)_0%,_transparent_70%)]"
                />

                <GitHubLogo />

                {sp.desc && (
                  <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#9EB3D6]">
                    {sp.desc}
                  </p>
                )}

                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[#22E5FF] group-hover:underline">
                  <span>Visit GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>

          {/* Platform & Cloud Partners Tier */}
          <div className="mx-auto my-14 flex max-w-2xl items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#A3F06D]">
              {platformTier.name}
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {platformTier.sponsors.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-card group flex min-h-[110px] flex-col items-center justify-center rounded-xl border border-[#9EB3D6]/20 bg-[#091D42]/85 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#A3F06D] hover:shadow-[0_8px_24px_rgba(163,240,109,0.15)]"
              >
                <span className="font-heading text-lg font-bold text-white transition-colors group-hover:text-[#A3F06D]">
                  {sp.name}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                  {sp.tier}
                </span>
              </a>
            ))}
          </div>

          {/* Track & Ecosystem Partners Tier */}
          <div className="mx-auto my-14 flex max-w-2xl items-center gap-4">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#F5C451]">
              {trackTier.name}
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {trackTier.sponsors.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-card group flex min-h-[110px] flex-col items-center justify-center rounded-xl border border-[#9EB3D6]/20 bg-[#091D42]/85 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#F5C451] hover:shadow-[0_8px_24px_rgba(245,196,81,0.15)]"
              >
                <span className="font-heading text-base font-bold text-white transition-colors group-hover:text-[#F5C451]">
                  {sp.name}
                </span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                  {sp.tier}
                </span>
              </a>
            ))}
          </div>

          {/* Partner CTA */}
          <div className="mt-16 flex flex-col items-center justify-center border-t border-white/10 pt-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#9EB3D6]">
              INTERESTED IN PARTNERING WITH AUTO×QUANT &apos;26?
            </p>
            <a
              href="mailto:sponsor@campusfest.edu"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#1648A8] px-7 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_16px_rgba(22,72,168,0.4)] transition-all duration-200 hover:bg-[#1D5BC6] hover:scale-103"
            >
              <Handshake className="h-4 w-4" />
              <span>BECOME A SPONSOR</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
