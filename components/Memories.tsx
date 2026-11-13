"use client";

import Image from "next/image";
import { MEMORIES_GALLERY, type MemoryPhoto } from "@/content/events";

export default function Memories() {
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
      className="cream-dot-grid relative w-full overflow-hidden bg-[#FAF5E8] px-1 pt-1 pb-0 sm:px-2"
    >
      {/* Background ambient radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,27,61,0.03)_0%,_transparent_75%)]"
      />

      {/* Top gentle blend mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 z-20 h-12 bg-gradient-to-b from-[#FAF5E8] to-transparent sm:h-16"
      />

      {/* Edge-to-Edge Continuous Downward Vertical Moving Gallery with minimal gap */}
      <div className="relative z-10 h-[560px] w-full overflow-hidden sm:h-[640px] md:h-[700px] lg:h-[760px]">
        <div className="grid h-full grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
          {columns.map((col, colIdx) => {
            const animClass = columnAnimationClasses[colIdx % 4];

            return (
              <div key={colIdx} className="relative h-full overflow-hidden">
                <div
                  className={`flex flex-col h-max will-change-transform ${animClass}`}
                >
                  {/* Set 1 */}
                  <div className="flex shrink-0 flex-col gap-1.5 pb-1.5 sm:gap-2 sm:pb-2">
                    {col.map((photo, pIdx) => (
                      <figure
                        key={`set1-${photo.id}-${pIdx}`}
                        className="group relative h-48 w-full shrink-0 overflow-hidden rounded-md border border-[#D9D0B8]/70 bg-[#FAF5E8] shadow-[0_2px_8px_rgba(10,27,61,0.06)] transition-all duration-300 ease-out hover:border-[#0A1B3D]/80 sm:h-56 md:h-64 lg:h-72"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                        />
                      </figure>
                    ))}
                  </div>

                  {/* Set 2 (Identical mirror for seamless infinite loop) */}
                  <div
                    aria-hidden="true"
                    className="flex shrink-0 flex-col gap-1.5 pb-1.5 sm:gap-2 sm:pb-2"
                  >
                    {col.map((photo, pIdx) => (
                      <figure
                        key={`set2-${photo.id}-${pIdx}`}
                        className="group relative h-48 w-full shrink-0 overflow-hidden rounded-md border border-[#D9D0B8]/70 bg-[#FAF5E8] shadow-[0_2px_8px_rgba(10,27,61,0.06)] transition-all duration-300 ease-out hover:border-[#0A1B3D]/80 sm:h-56 md:h-64 lg:h-72"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 25vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shaded Zigzag Sawtooth Border sitting directly over the bottom of the moving images */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 z-20 flex flex-col justify-end"
        >
          {/* Atmospheric dark gradient shade over the images */}
          <div className="h-14 w-full bg-gradient-to-t from-[#0A1B3D]/30 via-[#0A1B3D]/10 to-transparent sm:h-18" />

          {/* Crisp Zigzag Teeth Border cutting into images with upward drop shadow */}
          <div
            className="h-4 w-full sm:h-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 12' width='24' height='12'%3E%3Cpath d='M0 12 L12 0 L24 12 Z' fill='%23FAF5E8' stroke='%230A1B3D' stroke-width='1.2' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat-x",
              backgroundPosition: "bottom center",
              filter: "drop-shadow(0 -4px 6px rgba(10,27,61,0.22))",
            }}
          />
        </div>
      </div>

      {/* Pixelated Dithering Divider matching the footer/events style transitioning into Prizes */}
      <div
        aria-hidden="true"
        className="relative z-20 h-10 w-full sm:h-12"
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
