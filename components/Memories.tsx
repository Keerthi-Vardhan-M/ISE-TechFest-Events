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

      // Hide letters initially so it reveals strictly after scrolling to this stage
      gsap.set(".memory-char", { opacity: 0, y: 26, scale: 0.88, filter: "blur(10px)" });

      // Letter-by-letter reveal tied to scrolling into the Memories stage
      gsap.to(".memory-char", {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center 48%",
          scrub: 1.4,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split photos into 4 balanced columns, duplicating for seamless continuous vertical loop
  const columns: MemoryPhoto[][] = [[], [], [], []];
  MEMORIES_GALLERY.forEach((photo, idx) => {
    columns[idx % 4].push(photo);
  });

  const columnAnimationClasses = [
    "animate-vertical-down-1",
    "animate-vertical-down-2",
    "animate-vertical-down-3",
    "animate-vertical-down-4",
  ];

  return (
    <section
      id="memories"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#06142E] px-2 py-4 sm:px-3 sm:py-6 md:px-4 md:py-8"
    >
      {/* Background ambient radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,229,255,0.06)_0%,_transparent_75%)]"
      />

      {/* Top and Bottom soft gradient blend masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 z-20 h-28 bg-gradient-to-b from-[#06142E] via-[#06142E]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-32 bg-gradient-to-t from-[#06142E] via-[#06142E]/85 to-transparent"
      />

      {/* Centered Memories Title: refined smaller size, appears after scrolling to this stage */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <h2 className="font-heading text-3xl font-black tracking-widest text-white/95 drop-shadow-[0_8px_32px_rgba(0,0,0,0.98)] sm:text-4xl md:text-5xl lg:text-6xl">
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

      {/* Edge-to-Edge Continuous Downward Vertical Moving Gallery */}
      <div className="pause-hover relative z-10 h-[580px] w-full overflow-hidden sm:h-[660px] md:h-[720px] lg:h-[780px]">
        <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-3.5 lg:gap-4">
          {columns.map((col, colIdx) => {
            // Duplicate array items so the vertical transform loops infinitely with zero seams
            const doubleCol = [...col, ...col];
            const animClass = columnAnimationClasses[colIdx % 4];

            return (
              <div key={colIdx} className="relative h-full overflow-hidden">
                <div
                  className={`flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4 ${animClass}`}
                  style={{ willChange: "transform" }}
                >
                  {doubleCol.map((photo, pIdx) => (
                    <figure
                      key={`${photo.id}-${pIdx}`}
                      className="group relative h-48 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0A1E46]/70 shadow-[0_8px_24px_rgba(4,15,36,0.6)] transition-all duration-300 ease-out hover:border-[#22E5FF]/70 hover:shadow-[0_16px_40px_rgba(34,229,255,0.2)] sm:h-56 sm:rounded-2xl md:h-60 lg:h-64"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#06142E]/85 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                      <figcaption className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white sm:bottom-3 sm:left-3.5 sm:right-3.5">
                        <span className="font-medium text-[#D8E3F5] drop-shadow-sm">
                          {photo.caption}
                        </span>
                        <span className="rounded bg-[#06142E]/80 px-1.5 py-0.5 text-[9px] text-[#A3F06D]">
                          2025
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pixel Checkerboard Divider into Cream Prizes Section */}
      <div className="pixel-checker-divider mt-8" aria-hidden="true" />
    </section>
  );
}
