"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";
import { ensureGsapRegistered, prefersReducedMotion } from "@/lib/motion";
import HeraldicCrest from "./HeraldicCrest";

export default function Memories() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);
  const titleLetters = "Memories".split("");

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".memory-char", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Memories bridge: arch curtains part slowly as the user scrolls
      if (leftCurtainRef.current && rightCurtainRef.current) {
        const bridgeTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
            end: "top 22%",
            scrub: 1.2,
          },
        });

        bridgeTl.to(
          leftCurtainRef.current,
          {
            xPercent: -105,
            ease: "power1.inOut",
          },
          0
        );

        bridgeTl.to(
          rightCurtainRef.current,
          {
            xPercent: 105,
            ease: "power1.inOut",
          },
          0
        );

        if (crestRef.current) {
          bridgeTl.to(
            crestRef.current,
            {
              y: -22,
              scale: 0.94,
              opacity: 0.92,
              ease: "power1.inOut",
            },
            0
          );
        }
      }

      // Memories text appears when user reaches this stage
      gsap.fromTo(
        ".memory-char",
        {
          opacity: 0,
          y: 28,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 68%",
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
      className="relative w-full overflow-hidden bg-[#06142E] px-2 pt-16 pb-6 sm:px-3 sm:pt-20 sm:pb-8 md:px-4 md:pt-24 md:pb-10"
    >
      {/* Background ambient radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,229,255,0.06)_0%,_transparent_75%)]"
      />

      {/* Top and Bottom soft gradient blend masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 z-15 h-28 bg-gradient-to-b from-[#06142E] via-[#06142E]/85 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 z-15 h-32 bg-gradient-to-t from-[#06142E] via-[#06142E]/85 to-transparent"
      />

      {/* ================= ARCH BRIDGE CURTAINS THAT PART ON SCROLL ================= */}
      {/* Left Curtain */}
      <div
        ref={leftCurtainRef}
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[53%] bg-[#06142E] will-change-transform"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 right-0 h-full w-24 sm:w-36 md:w-52 translate-x-[99%] fill-[#06142E]"
        >
          <path d="M0,0 L65,0 C78,28 42,68 8,100 L0,100 Z" />
        </svg>
      </div>

      {/* Right Curtain */}
      <div
        ref={rightCurtainRef}
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[53%] bg-[#06142E] will-change-transform"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-0 left-0 h-full w-24 sm:w-36 md:w-52 -translate-x-[99%] fill-[#06142E]"
        >
          <path d="M100,0 L35,0 C22,28 58,68 92,100 L100,100 Z" />
        </svg>
      </div>

      {/* Center Heraldic Crest bridging Events and Memories */}
      <div
        ref={crestRef}
        className="pointer-events-none absolute top-1 sm:top-2 md:top-3 left-1/2 -translate-x-1/2 z-25 w-full max-w-[540px] sm:max-w-[700px] md:max-w-[840px] px-3 will-change-transform"
      >
        <HeraldicCrest />
      </div>

      {/* Centered Memories Title: refined size, appears when reaching this stage */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <div className="rounded-2xl border border-white/20 bg-[#06142E]/80 px-6 py-3 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.22em] text-white drop-shadow-[0_4px_16px_rgba(34,229,255,0.4)] sm:text-3xl md:text-4xl">
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

                  {/* Set 2 (Identical mirror for seamless infinite loop) */}
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 flex-col gap-2.5 pb-2.5 sm:gap-3 sm:pb-3 md:gap-3.5 md:pb-3.5 lg:gap-4 lg:pb-4"
                  >
                    {col.map((photo, pIdx) => (
                      <figure
                        key={`set2-${photo.id}-${pIdx}`}
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
