"use client";

import { Award, Medal, Trophy } from "lucide-react";
import { EVENT_LIST } from "@/content/events";

export default function Prizes() {
  return (
    <section id="prizes" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#F5C451]">
            REWARDS & PODIUM
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#EDEFF5] sm:text-5xl">
            Compete for the podium.
          </h2>
          <p className="mt-3 text-base text-[#8A90A2]">
            Dedicated prize pools for both tracks, plus finalist certificates and trophy honors.
          </p>
        </div>

        {/* Horizontal scroll-snap carousel on mobile, 2-column grid on desktop */}
        <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0">
          {EVENT_LIST.map((ev) => (
            <div
              key={ev.id}
              data-theme={ev.theme}
              className="w-[88vw] shrink-0 snap-center rounded-[22px] border border-white/12 bg-[#0F1218]/85 p-6 sm:p-8 md:w-auto"
              style={{
                boxShadow: "0 0 40px -18px var(--accent-glow)",
              }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <span
                    className="font-mono text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {ev.categoryLabel}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-[#EDEFF5]">
                    {ev.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[11px] uppercase text-[#8A90A2]">Total Pool</span>
                  <p
                    className="font-heading text-2xl font-bold sm:text-3xl"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {ev.prizePool}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {ev.podium.map((p, idx) => {
                  const Icon = idx === 0 ? Trophy : idx === 1 ? Medal : Award;
                  return (
                    <div
                      key={p.rank}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                          style={{ color: idx === 0 ? "var(--accent-primary)" : "#EDEFF5" }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] uppercase text-[#8A90A2]">
                            {p.rank} Place
                          </span>
                          <p className="font-heading text-base font-semibold text-[#EDEFF5]">
                            {p.title}
                          </p>
                        </div>
                      </div>
                      <span
                        className="font-mono text-sm font-semibold"
                        style={{ color: "var(--accent-primary)" }}
                      >
                        {p.reward}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

