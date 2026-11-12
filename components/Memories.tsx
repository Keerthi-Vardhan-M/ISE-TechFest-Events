"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function Memories() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLetters = "Memories".split("");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".memory-char", { opacity: 1, y: 0 });
        return;
      }

      // Letter-by-letter smooth slow entrance as user scrolls to photo section
      gsap.fromTo(
        ".memory-char",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Alternating columns moving vertically upward & downward slowly with scroll scrub
      gsap.fromTo(
        ".memories-col-up",
        { y: 80 },
        {
          y: -160,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        ".memories-col-down",
        { y: -80 },
        {
          y: 160,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split photos into 4 balanced columns for the staggered masonry layout
  const columns: MemoryPhoto[][] = [[], [], [], []];
  MEMORIES_GALLERY.forEach((photo, idx) => {
    columns[idx % 4].push(photo);
  });

  const heightClass = (aspect: MemoryPhoto["aspect"]) =>
    aspect === "tall" ? "h-52 sm:h-64" : aspect === "wide" ? "h-36 sm:h-44" : "h-44 sm:h-52";

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06142E] px-4 py-12 sm:px-6 lg:py-16"
    >
      {/* Background radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,229,255,0.06)_0%,_transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Floating Memories Title: Card container removed, appears cleanly letter-by-letter on scroll */}
        <div className="pointer-events-none sticky top-1/2 z-30 -translate-y-1/2 text-center">
          <h2 className="font-heading text-5xl font-black tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)] sm:text-7xl lg:text-8xl">
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="memory-char inline-block transition-transform duration-300"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Dynamic Moving Gallery Columns (Upward / Downward slow vertical motion) */}
        <div className="relative z-10 -mt-6 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-3.5 sm:gap-4 ${
                colIdx % 2 === 0 ? "memories-col-up" : "memories-col-down"
              }`}
            >
              {col.map((photo) => (
                <figure
                  key={photo.id}
                  className={`group relative overflow-hidden rounded-2xl border border-[#9EB3D6]/20 bg-[#0A1E46]/80 transition-all duration-300 hover:border-[#22E5FF]/60 hover:shadow-[0_14px_36px_rgba(4,15,36,0.85)] ${heightClass(
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/90 via-[#06142E]/25 to-transparent opacity-75 transition-opacity group-hover:opacity-95" />
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
