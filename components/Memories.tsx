"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function Memories() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (titleRef.current) {
          gsap.set(titleRef.current, { opacity: 1, scale: 1 });
        }
        return;
      }

      // Memories title dynamic reveal when user scrolls into section
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, scale: 0.7, y: 60, filter: "blur(12px)" },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: MOTION_EASE,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "center center",
              scrub: 0.6,
            },
          }
        );
      }

      // Dynamic alternating column vertical scrub motion on scroll
      gsap.fromTo(
        ".memories-col-odd",
        { y: 60 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".memories-col-even",
        { y: -60 },
        {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split photos into 4 balanced columns for the staggered masonry look
  const columns: MemoryPhoto[][] = [[], [], [], []];
  MEMORIES_GALLERY.forEach((photo, idx) => {
    columns[idx % 4].push(photo);
  });

  const heightClass = (aspect: MemoryPhoto["aspect"]) =>
    aspect === "tall" ? "h-64 sm:h-76" : aspect === "wide" ? "h-44 sm:h-52" : "h-52 sm:h-60";

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06142E] px-4 py-24 sm:px-6 lg:py-32"
    >
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,229,255,0.06)_0%,_transparent_65%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Dynamic floating Memories heading that appears and scales up on scroll */}
        <div
          ref={titleRef}
          className="pointer-events-none sticky top-1/2 z-30 -translate-y-1/2 text-center"
        >
          <div className="inline-block rounded-full bg-[#06142E]/70 px-8 py-3 backdrop-blur-md">
            <h2 className="font-heading text-5xl font-black tracking-tight text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.9)] sm:text-7xl lg:text-8xl">
              Memories
            </h2>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-[#A3F06D]">
              FLASHBACKS • 2025 EDITION
            </p>
          </div>
        </div>

        {/* Dynamic Moving Gallery Columns */}
        <div className="relative z-10 -mt-16 grid grid-cols-2 gap-3.5 sm:gap-5 md:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-4 sm:gap-5 ${
                colIdx % 2 === 0 ? "memories-col-odd" : "memories-col-even"
              }`}
            >
              {col.map((photo) => (
                <figure
                  key={photo.id}
                  className={`group relative overflow-hidden rounded-2xl border border-[#9EB3D6]/20 bg-[#0A1E46]/80 transition-all duration-300 hover:border-[#22E5FF]/60 hover:shadow-[0_12px_32px_rgba(4,15,36,0.8)] ${heightClass(
                    photo.aspect
                  )}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/90 via-[#06142E]/20 to-transparent opacity-75 transition-opacity group-hover:opacity-95" />
                  <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white">
                    <span className="font-medium text-[#D8E3F5]">{photo.caption}</span>
                    <span className="rounded bg-[#06142E]/80 px-1.5 py-0.5 text-[9px] text-[#A3F06D]">
                      2025
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
