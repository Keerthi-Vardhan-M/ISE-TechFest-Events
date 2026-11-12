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

  const contacts = [
    {
      name: "Aarav Sharma",
      role: "Robotics Track Lead",
      phone: "+91 98765 43211",
      email: "automate@campusfest.edu",
    },
    {
      name: "Diya Nair",
      role: "Quant Track Lead",
      phone: "+91 98765 43212",
      email: "quant@campusfest.edu",
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
          style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}
        >
          ORGANISED <span className="text-[#C82333]">BY</span>
        </h2>

        <div className="mx-auto my-6 flex max-w-md items-center gap-3">
          <div className="h-px flex-1 bg-[#D9D0B8]" />
          <span className="text-xs text-[#C82333]" aria-hidden="true">
            ◆
          </span>
          <div className="h-px flex-1 bg-[#D9D0B8]" />
        </div>

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

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {contacts.map((c) => (
              <div
                key={c.name}
                className="org-item border-2 border-[#0A1B3D] bg-[#0B1220] p-6 text-center text-[#FAF5E8] shadow-[5px_5px_0_#C82333]"
              >
                <p className="font-heading text-lg font-bold tracking-wide uppercase text-[#FAF5E8]">
                  {c.name}
                </p>
                <p className="mt-1 font-mono text-xs font-semibold text-[#F5C451]">{c.role}</p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, "")}`}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded border border-[#9EB3D6]/20 bg-[#06142E]/70 px-3.5 py-1.5 text-[#D8E3F5] transition-colors hover:border-[#A3F06D] hover:text-[#A3F06D]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#A3F06D]" />
                    <span>{c.phone}</span>
                  </a>

                  <a
                    href={`mailto:${c.email}`}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded bg-[#1648A8] px-3.5 py-1.5 font-bold uppercase tracking-wider text-white shadow transition-colors hover:bg-[#1D5BC6]"
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
