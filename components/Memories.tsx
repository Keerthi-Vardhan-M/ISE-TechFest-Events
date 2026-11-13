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
      className="cream-dot-grid relative w-full overflow-hidden bg-[#FAF5E8] px-1 py-2 sm:px-2 sm:py-3"
    >
      {/* Background ambient radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,27,61,0.03)_0%,_transparent_75%)]"
      />

      {/* Top and Bottom gentle gradient blend masks matching light theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 z-20 h-16 bg-gradient-to-b from-[#FAF5E8] to-transparent sm:h-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 z-20 h-16 bg-gradient-to-t from-[#FAF5E8] to-transparent sm:h-20"
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
      </div>

      {/* Clean border dividing into Prizes */}
      <div className="border-b border-[#D9D0B8] mt-3" aria-hidden="true" />
    </section>
  );
}
