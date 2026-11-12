"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Calendar, IndianRupee, MapPin, UserCheck, Users } from "lucide-react";
import { EVENTS, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function EventDetailsStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".detail-col",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      icon: Calendar,
      label: "DATE",
      value: `${EVENTS.automate.dateDisplay} & ${EVENTS.quant.dateDisplay}`,
    },
    {
      icon: MapPin,
      label: "VENUE",
      value: `${ORGANISER_INFO.collegeName}, ${ORGANISER_INFO.city}`,
    },
    {
      icon: Users,
      label: "TEAM SIZE",
      value: "3–4 Members Compulsory",
    },
    {
      icon: UserCheck,
      label: "ELIGIBILITY",
      value: "All UG / PG College Students",
    },
    {
      icon: IndianRupee,
      label: "REGISTRATION FEE",
      value: `${EVENTS.automate.feeDisplay} • ${EVENTS.quant.feeDisplay}`,
    },
  ];

  return (
    <section
      ref={ref}
      className="cream-dot-grid border-y border-[#D9D0B8] px-4 py-14 text-[#0A1B3D] sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-pixel text-2xl font-bold tracking-wide text-[#0A1B3D] sm:text-3xl">
          EVENT DETAILS <span className="text-[#C82333]">✦</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 divide-y divide-[#D9D0B8] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="detail-col flex flex-col items-center px-4 py-5 text-center"
              >
                <Icon className="h-6 w-6 text-[#0A1B3D]" strokeWidth={1.75} />
                <span className="mt-3 font-mono text-[11px] font-bold tracking-[0.2em] text-[#4B5C7D]">
                  {item.label}
                </span>
                <p className="mt-1.5 text-sm font-semibold text-[#0A1B3D]">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

