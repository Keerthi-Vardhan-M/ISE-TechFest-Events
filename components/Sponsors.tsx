"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink } from "lucide-react";
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
        { y: 44, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleTier = SPONSORS_DATA.tiers[0];

  return (
    <section
      id="sponsors"
      ref={sectionRef}
      className="cream-dot-grid relative px-3 py-16 text-[#F4F6FB] sm:px-6 sm:py-20 lg:py-24"
    >
      {/* Curved Dark Container directly replicating the reference design */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border-t-4 border-b-4 border-[#FF6B35] bg-[#0A1329] p-7 shadow-[0_24px_70px_rgba(6,20,46,0.35)] sm:rounded-[52px] sm:p-12 md:p-16">
        {/* Subtle grid pattern inside dark container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-12"
          style={{
            backgroundImage: "radial-gradient(#22E5FF 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 text-center">
          {/* Top Bar Accent Pill from reference */}
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-[#FF6B35]" />

          {/* Bold Retro Sponsors Heading */}
          <h2
            className="font-pixel text-4xl font-bold tracking-wider text-[#FAF5E8] sm:text-6xl md:text-7xl"
            style={{ textShadow: "0 4px 20px rgba(255,107,53,0.35)" }}
          >
            {SPONSORS_DATA.title}
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-[#9EB3D6]">
            {SPONSORS_DATA.subtitle}
          </p>

          {/* Title Sponsor Divider Line matching reference */}
          <div className="mx-auto my-10 flex max-w-2xl items-center gap-4 sm:my-14">
            <div className="h-px flex-1 bg-[#FF6B35]/40" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-[#FF6B35]">
              {titleTier.name}
            </span>
            <div className="h-px flex-1 bg-[#FF6B35]/40" />
          </div>

          {/* Giant GitHub Title Sponsor Card matching reference screenshot */}
          <div className="sponsor-card mx-auto max-w-3xl">
            {titleTier.sponsors.map((sp) => (
              <a
                key={sp.name}
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border-2 border-[#1648A8] bg-[#06142E]/90 p-8 shadow-[0_12px_40px_rgba(4,15,36,0.85)] transition-all duration-300 hover:border-[#FF6B35] hover:shadow-[0_16px_50px_rgba(255,107,53,0.25)] sm:p-14"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,107,53,0.12)_0%,_transparent_70%)]"
                />

                <GitHubLogo />

                {sp.desc && (
                  <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#9EB3D6]">
                    {sp.desc}
                  </p>
                )}

                <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[#FF6B35] group-hover:underline">
                  <span>Visit GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

