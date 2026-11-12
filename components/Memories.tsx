"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

export default function Memories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Alternate column vertical parallax on scroll
      gsap.to(".memories-col-odd", {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(".memories-col-even", {
        y: 36,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split photos into 4 balanced columns for the staggered masonry look
  const columns: MemoryPhoto[][] = [[], [], [], []];
  MEMORIES_GALLERY.forEach((photo, idx) => {
    columns[idx % 4].push(photo);
  });

  const heightClass = (aspect: MemoryPhoto["aspect"]) =>
    aspect === "tall" ? "h-64 sm:h-72" : aspect === "wide" ? "h-44 sm:h-48" : "h-52 sm:h-56";

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0C10] px-4 py-20 sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered floating Memories heading matching reference */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <h2 className="font-heading text-5xl font-black tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.85)] sm:text-7xl">
            Memories
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className={`flex flex-col gap-3.5 sm:gap-4 ${
                colIdx % 2 === 0 ? "memories-col-odd pt-4" : "memories-col-even -mt-4"
              }`}
            >
              {col.map((photo) => (
                <figure
                  key={photo.id}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121620] ${heightClass(
                    photo.aspect
                  )}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                  <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white/90">
                    <span>{photo.caption}</span>
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
