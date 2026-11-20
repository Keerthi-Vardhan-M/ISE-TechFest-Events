"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_SECTION, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricsBarRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth staggered entrance for "ENGINEERING ARENA DECEMBER 2026."
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          ".about-title-word",
          {
            y: 28,
            opacity: 0,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // About text & image entrance (cascades right after title)
      gsap.fromTo(
        ".about-left",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".about-right",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Dedicated ScrollTrigger on the metrics bar: rolls numbers up from 0 when in view
      if (metricsBarRef.current && !prefersReducedMotion()) {
        ScrollTrigger.create({
          trigger: metricsBarRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            ABOUT_SECTION.metrics.forEach((metric, idx) => {
              const el = numberRefs.current[idx];
              if (!el) return;

              const obj = { val: 0 };
              const prefix = "prefix" in metric ? metric.prefix : "";
              const suffix = metric.suffix ?? "";
              const duration = metric.value > 1000 ? 1.9 : metric.value > 10 ? 1.4 : 1.0;

              gsap.to(obj, {
                val: metric.value,
                duration,
                ease: "power2.out",
                onUpdate: () => {
                  const currentVal = Math.round(obj.val);
                  el.textContent = `${prefix}${currentVal.toLocaleString("en-IN")}${suffix}`;
                },
                onComplete: () => {
                  el.textContent = `${prefix}${metric.value.toLocaleString("en-IN")}${suffix}`;
                },
              });
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative text-[#0A1B3D]"
      style={{ background: "linear-gradient(135deg, #E8DCC8 0%, #F0E6D2 40%, #EDE3CF 100%)" }}
    >
      {/* Atmospheric blue shade seamlessly cascading from the hero section above */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-28 z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0a2558 0%, rgba(10, 37, 88, 0.65) 30%, rgba(22, 72, 168, 0.25) 65%, transparent 100%)",
        }}
      />
      {/* Expansive wide container exactly matching reference screenshot */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-24">
        {/* Large pixel heading matching screenshot: ENGINEERING ARENA in dark, DECEMBER 2026. in blue with butter melting entrance */}
        <h2 className="font-pixel text-3xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl">
          <span className="text-[#0A1B3D]">
            {ABOUT_SECTION.titlePrefix.split(" ").map((word, i) => (
              <span
                key={i}
                className="about-title-word inline-block mr-[0.3em] transition-transform duration-300 hover:-translate-y-1"
              >
                {word}
              </span>
            ))}
          </span>
          <span className="text-[#1648A8] inline-block">
            {ABOUT_SECTION.titleHighlight.split(" ").map((word, i) => (
              <span
                key={i}
                className="about-title-word inline-block mr-[0.25em] last:mr-0 transition-transform duration-300 hover:-translate-y-1"
              >
                {word}
              </span>
            ))}
          </span>
        </h2>

        {/* Two-column layout strictly matching reference screenshot with dialogue box & chamfered campus card */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Quest Dialog Box with Campus Guide avatar — restored to clean light whitish cream */}
          <div className="about-left flex flex-col justify-between border-2 border-[#D9D0B8] bg-[#FAF5E8] p-6 shadow-[4px_4px_0_#0A1B3D] sm:p-7 md:p-8 lg:col-span-6">
            <div>
              <div className="border border-[#D9D0B8] bg-[#F5EFE0]">
                <div className="px-4 py-4 sm:px-5">
                  <h3 className="font-pixel text-base font-bold leading-relaxed text-[#0A1B3D] sm:text-lg">
                    Ramaiah Institute of Technology
                  </h3>
                  <a
                    href="https://maps.google.com/maps?rlz=1C1UEAD_enIN1084IN1084&sca_esv=255b5630f5566803&pvq=CgkvbS8wNW4zXzmAAQE&fvr=1&vet=10CAAQoqAOahcKEwig2-jzx5aYAxUAAAAAHQAAAAAQBg..i&cs=0&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3bae17dedd4dcca9:0x6075bd8d8aed97ab"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1648A8] underline decoration-[#A3F06D] underline-offset-4 transition-colors hover:text-[#0A1B3D] sm:text-sm"
                  >
                    Location ↗
                  </a>
                </div>

                <div className="border-t border-[#D9D0B8]">
                  <h4 className="px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0A1B3D] sm:px-5">
                    Event Venues
                  </h4>
                  <div className="grid grid-cols-2 items-stretch border-t border-[#D9D0B8]">
                    {["ISE Lab 1", "ISE Lab 2"].map((venue, index) => (
                      <div
                        key={venue}
                        className={`flex h-24 items-center justify-center px-3 py-4 text-center font-pixel text-sm font-bold uppercase text-[#1648A8] sm:h-28 sm:text-base ${
                          index === 1 ? "border-l border-[#D9D0B8]" : ""
                        }`}
                      >
                        {venue}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Chamfered Campus Box matching reference screenshot */}
          <div className="about-right flex flex-col justify-between lg:col-span-6">
            <div
              className="relative p-[2.5px] bg-[#0A1B3D] shadow-[4px_4px_0_rgba(10,27,61,0.18)] transition-transform duration-300 hover:scale-[1.01]"
              style={{
                clipPath:
                  "polygon(28px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 28px)",
              }}
            >
              <div
                className="relative h-64 w-full sm:h-72 md:h-80 overflow-hidden"
                style={{
                  clipPath:
                    "polygon(26px 0%, 100% 0%, 100% calc(100% - 26px), calc(100% - 26px) 100%, 0% 100%, 0% 26px)",
                }}
              >
                <Image
                  src="/images/campus-arena.jpg"
                  alt="Isometric engineering and robotics campus arena at dusk"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-2.5 flex items-center justify-end px-1 font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
              <span>{ORGANISER_INFO.city.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* 4-column metric bar exactly matching screenshot with increasing count animation */}
        <div
          ref={metricsBarRef}
          className="mt-14 grid grid-cols-2 border-y border-[#D9D0B8] sm:grid-cols-4"
        >
          {ABOUT_SECTION.metrics.map((metric, idx) => {
            const prefix = "prefix" in metric ? metric.prefix : "";
            const suffix = metric.suffix ?? "";
            return (
              <div
                key={metric.label}
                className={`flex flex-col justify-center px-4 py-6 sm:px-6 sm:py-8 sm:border-r last:sm:border-r-0 sm:border-[#D9D0B8] ${
                  idx % 2 === 1 ? "border-l border-[#D9D0B8] sm:border-l-0" : ""
                } ${
                  idx >= 2 ? "border-t border-[#D9D0B8] sm:border-t-0" : ""
                }`}
              >
                <div className="font-pixel text-2xl font-bold tabular-nums text-[#0A1B3D] sm:text-3xl lg:text-4xl whitespace-nowrap">
                  <span
                    ref={(el) => {
                      numberRefs.current[idx] = el;
                    }}
                  >
                    {prefix}
                    {metric.value.toLocaleString("en-IN")}
                    {suffix}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4B5C7D] sm:text-xs">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pixelated Dithering Divider into Navy Events Section */}
      <div
        aria-hidden="true"
        className="h-8 w-full sm:h-10"
        style={{
          backgroundImage: "url('/images/footer-pixel-divider.png')",
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top center",
          imageRendering: "pixelated",
        }}
      />
    </section>
  );
}
