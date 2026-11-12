"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";

export default function Memories() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLetters = "Memories".split("");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".memory-char", { opacity: 1, y: 0, filter: "none" });
        return;
      }

      // Hide initially so it never appears beforehand
      gsap.set(".memory-char", { opacity: 0, y: 40, scale: 0.85, filter: "blur(10px)" });

      // Letter-by-letter reveal tied to scrolling deep inside the images
      gsap.to(".memory-char", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 25%", // reveals only once images are deeply in view
          end: "center 45%",
          scrub: 1.2,
        },
      });

      // Gentle alternating parallax drift that stays strictly contained
      gsap.fromTo(
        ".memories-col-up",
        { y: 25 },
        {
          y: -30,
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
        { y: -25 },
        {
          y: 30,
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

  // Split photos into 4 balanced columns for the masonry layout
  const columns: MemoryPhoto[][] = [[], [], [], []];
  MEMORIES_GALLERY.forEach((photo, idx) => {
    columns[idx % 4].push(photo);
  });

  const heightClass = (aspect: MemoryPhoto["aspect"]) =>
    aspect === "tall" ? "h-48 sm:h-56" : aspect === "wide" ? "h-36 sm:h-42" : "h-40 sm:h-48";

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06142E] px-4 pt-16 pb-32 sm:px-6 sm:pt-20 sm:pb-40 lg:pb-44"
    >
      {/* Background radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,229,255,0.06)_0%,_transparent_70%)]"
      />

      {/* Top and Bottom soft fade masks to ensure zero clipping and zero spill into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 z-20 h-24 bg-gradient-to-b from-[#06142E] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-36 bg-gradient-to-t from-[#06142E] via-[#06142E]/85 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Floating Memories Title: Invisible until user actively scrolls into the images, then slowly reveals letter by letter */}
        <div className="pointer-events-none sticky top-1/2 z-30 -translate-y-1/2 text-center">
          <h2 className="font-heading text-5xl font-black tracking-tight text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)] sm:text-7xl lg:text-8xl">
            {titleLetters.map((char, i) => (
              <span
                key={i}
                className="memory-char inline-block transition-transform duration-300"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Dynamic Moving Gallery Columns */}
        <div className="relative z-10 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4">
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
