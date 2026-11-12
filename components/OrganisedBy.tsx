"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Phone } from "lucide-react";
import { EVENTS, ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function OrganisedBy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".org-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: MOTION_EASE,
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const partners = [
    { name: ORGANISER_INFO.collegeName, sub: "Host Institution" },
    { name: ORGANISER_INFO.clubName, sub: "Student Organiser" },
    { name: "Robotics & Automation Cell", sub: "Track Partner" },
    { name: "Quant & Finance Society", sub: "Track Partner" },
  ];

  const contacts = [EVENTS.automate.contact, EVENTS.quant.contact];

  return (
    <section
      id="contact"
      ref={ref}
      className="dark-dot-grid border-t border-[#9EB3D6]/20 bg-[#06142E] px-4 py-20 text-[#F4F6FB] sm:px-6"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#9EB3D6]">
          THE MINDS BEHIND THE EVENT
        </p>
        <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
          ORGANISED <span className="text-[#A3F06D]">BY</span>
        </h2>

        <div className="mx-auto my-6 flex max-w-md items-center gap-3">
          <div className="h-px flex-1 bg-white/15" />
          <span className="text-xs text-[#A3F06D]" aria-hidden="true">
            ◆
          </span>
          <div className="h-px flex-1 bg-white/15" />
        </div>

        {/* 4 Partner / Club Logo Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="org-item navy-card flex min-h-[112px] flex-col items-center justify-center p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="font-heading text-sm font-bold text-[#F4F6FB]">{p.name}</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#9EB3D6]">
                {p.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Get In Touch */}
        <div className="mt-16">
          <h3 className="font-pixel text-2xl font-bold text-[#F4F6FB] sm:text-3xl">
            GET IN TOUCH
          </h3>
          <p className="mt-1.5 text-sm text-[#9EB3D6]">For queries and assistance</p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="org-item navy-card border border-[#22E5FF]/30 p-6 text-[#F4F6FB] shadow-[0_10px_30px_rgba(34,229,255,0.12)]"
              >
                <p className="font-heading text-lg font-bold tracking-wide uppercase">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-[#F5C451]">{c.role}</p>
                <div className="mt-4 flex flex-col items-center gap-1.5 font-mono text-xs text-[#D8E3F5]">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-[36px] items-center gap-1.5 hover:text-[#A3F06D]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#A3F06D]" />
                    <span>{c.phone}</span>
                  </a>
                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex min-h-[36px] items-center gap-1.5 border-b border-[#22E5FF]/40 pb-0.5 uppercase tracking-wider hover:text-[#22E5FF]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#22E5FF]" />
                    <span>CONTACT</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
