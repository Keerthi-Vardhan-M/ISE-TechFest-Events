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
        gsap.set(".memory-char", { opacity: 1, y: 0, scale: 1, filter: "none" });
        return;
      }

      // Memories text appears when user reaches this stage
      gsap.fromTo(
        ".memory-char",
        {
          opacity: 0,
          y: 28,
          scale: 0.85,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        }
      );
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
      className="cream-dot-grid relative w-full overflow-hidden bg-[#FAF5E8] px-2 py-4 sm:px-3 sm:py-6 md:px-4 md:py-8"
    >
      {/* Background ambient radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,27,61,0.04)_0%,_transparent_75%)]"
      />

      {/* Top and Bottom soft gradient blend masks matching light parchment theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 z-20 h-28 bg-gradient-to-b from-[#FAF5E8] via-[#FAF5E8]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-32 bg-gradient-to-t from-[#FAF5E8] via-[#FAF5E8]/85 to-transparent"
      />

      {/* Centered Memories Title: clean text in dark navy without card box */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.22em] text-[#0A1B3D] drop-shadow-[0_4px_16px_rgba(250,245,232,0.95)] sm:text-3xl md:text-4xl">
          {titleLetters.map((char, i) => (
            <span
              key={i}
              className="memory-char inline-block will-change-transform"
              style={{ opacity: 0 }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Edge-to-Edge Continuous Downward Vertical Moving Gallery - Never Pauses */}
      <div className="relative z-10 h-[580px] w-full overflow-hidden sm:h-[660px] md:h-[720px] lg:h-[780px]">
        <div className="grid h-full grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-3.5 lg:gap-4">
          {columns.map((col, colIdx) => {
            const animClass = columnAnimationClasses[colIdx % 4];

            return (
              <div key={colIdx} className="relative h-full overflow-hidden">
                <div
                  className={`flex flex-col h-max will-change-transform ${animClass}`}
                >
                  {/* Set 1 */}
                  <div className="flex shrink-0 flex-col gap-2.5 pb-2.5 sm:gap-3 sm:pb-3 md:gap-3.5 md:pb-3.5 lg:gap-4 lg:pb-4">
                    {col.map((photo, pIdx) => (
                      <figure
                        key={`set1-${photo.id}-${pIdx}`}
                        className="group relative h-48 w-full shrink-0 overflow-hidden rounded-xl border-2 border-[#D9D0B8] bg-[#FAF5E8] shadow-[0_6px_20px_rgba(10,27,61,0.08)] transition-all duration-300 ease-out hover:border-[#0A1B3D] hover:shadow-[0_12px_28px_rgba(10,27,61,0.15)] sm:h-56 sm:rounded-2xl md:h-60 lg:h-64"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D]/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                        <figcaption className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white sm:bottom-3 sm:left-3.5 sm:right-3.5">
                          <span className="font-medium text-[#FAF5E8] drop-shadow-sm">
                            {photo.caption}
                          </span>
                          <span className="border border-white/20 bg-[#0A1B3D]/80 px-1.5 py-0.5 text-[9px] font-bold text-[#A3F06D]">
                            2025
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>

                  {/* Set 2 (Identical mirror for seamless infinite loop) */}
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 flex-col gap-2.5 pb-2.5 sm:gap-3 sm:pb-3 md:gap-3.5 md:pb-3.5 lg:gap-4 lg:pb-4"
                  >
                    {col.map((photo, pIdx) => (
                      <figure
                        key={`set2-${photo.id}-${pIdx}`}
                        className="group relative h-48 w-full shrink-0 overflow-hidden rounded-xl border-2 border-[#D9D0B8] bg-[#FAF5E8] shadow-[0_6px_20px_rgba(10,27,61,0.08)] transition-all duration-300 ease-out hover:border-[#0A1B3D] hover:shadow-[0_12px_28px_rgba(10,27,61,0.15)] sm:h-56 sm:rounded-2xl md:h-60 lg:h-64"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B3D]/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                        <figcaption className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-white sm:bottom-3 sm:left-3.5 sm:right-3.5">
                          <span className="font-medium text-[#FAF5E8] drop-shadow-sm">
                            {photo.caption}
                          </span>
                          <span className="border border-white/20 bg-[#0A1B3D]/80 px-1.5 py-0.5 text-[9px] font-bold text-[#A3F06D]">
                            2025
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean border dividing into Prizes */}
      <div className="border-b border-[#D9D0B8] mt-6" aria-hidden="true" />
    </section>
  );
}
