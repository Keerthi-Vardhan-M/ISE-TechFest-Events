"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Phone } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function OrganisedBy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    if (!ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".org-item",
        { y: 28, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
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

  const contacts = [
    {
      name: "Aarav Sharma",
      role: "Robotics Track Lead",
      track: "automate",
      phone: "+91 98765 43211",
      email: "automate@campusfest.edu",
      accent: "#22E5FF",
    },
    {
      name: "Diya Nair",
      role: "Quant Track Lead",
      track: "quant",
      phone: "+91 98765 43212",
      email: "quant@campusfest.edu",
      accent: "#19F58A",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="cream-dot-grid border-t border-[#D9D0B8] px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#4B5C7D]">
          THE MINDS BEHIND THE EVENT
        </p>
        <h2
          className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl"
          style={{ textShadow: "0 0 3px rgba(10,27,61,0.10)" }}
        >
          ORGANISED <span className="text-[#1648A8]">BY</span>
        </h2>

        <div className="mx-auto my-6 h-px max-w-md bg-[#D9D0B8]" />

        {/* 4 Partner / Institution Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="org-item flex min-h-[116px] flex-col items-center justify-center border border-[#D9D0B8] bg-[#FAF5E8] p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="font-heading text-base font-bold text-[#0A1B3D]">{p.name}</span>
              <span className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                {p.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Get In Touch */}
        <div className="mt-16 sm:mt-20">
          <h3 className="font-pixel text-2xl font-bold text-[#0A1B3D] sm:text-3xl">
            GET IN TOUCH
          </h3>
          <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-[#4B5C7D]">
            For queries and assistance
          </p>

          {/* Theme-based Deep Royal Blue Contact Cards */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="org-item border-2 border-[#1648A8] bg-[#0A1E46] p-7 text-center text-[#F4F6FB] shadow-[6px_6px_0_#06142E] transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-heading text-xl font-bold tracking-wide uppercase text-white">
                  {c.name}
                </p>
                <p
                  className="mt-1.5 font-mono text-xs font-bold uppercase tracking-wider"
                  style={{ color: c.accent }}
                >
                  {c.role}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded border border-white/20 bg-[#06142E]/80 px-4 py-2 text-[#D8E3F5] transition-colors hover:border-[#A3F06D] hover:text-[#A3F06D]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#A3F06D]" />
                    <span>{c.phone}</span>
                  </a>

                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded bg-[#1D5BC6] px-4 py-2 font-bold uppercase tracking-wider text-white shadow-[0_4px_12px_rgba(29,91,198,0.45)] transition-colors hover:bg-[#2563EB]"
                  >
                    <Mail className="h-3.5 w-3.5" />
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
