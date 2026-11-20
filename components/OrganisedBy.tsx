"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Phone } from "lucide-react";
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
    {
      name: ORGANISER_INFO.collegeName,
      sub: "Host Institution",
      logo: "/images/msrit-logo.png",
    },
    {
      name: ORGANISER_INFO.clubName,
      sub: "Student Organiser",
      isVoice: true,
    },
  ];

  const facultyCoordinators = [
    {
      name: "Prashant Kambli",
      department: "Department of ISE, MSRIT",
      role: "Faculty Advisor",
      accent: "#22E5FF",
      photo: "/images/prashant-kambli.jpg",
    },
    {
      name: "Suresh Kumar K. R.",
      department: "Department of ISE, MSRIT",
      role: "Faculty Advisor",
      accent: "#A3F06D",
      photo: "/images/suresh-kumar-kr.png",
    },
  ];

  const contacts = [
    {
      name: "Rohan C M",
      role: "Automate Coordinator",
      track: "automate",
      phone: "+91 99007 81694",
      accent: "#22E5FF",
    },
    {
      name: "Venkatesh Reddy K",
      role: "GTM Arena Coordinator",
      track: "quant",
      phone: "+91 74115 82857",
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
        <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
          ORGANISED <span className="text-[#1648A8]">BY</span>
        </h2>

        <div className="mx-auto my-6 h-px max-w-md bg-[#D9D0B8]" />

        {/* Organiser / Institution Cards matching the billboard blue theme */}
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
          {partners.map((p) => (
            <div
              key={p.name}
              className="org-item flex min-h-[140px] flex-col items-center justify-between rounded-xl border border-[#2B548A] bg-[#163463] p-6 text-white shadow-[4px_4px_0_#06142E] transition-all duration-300 hover:-translate-y-1 hover:border-[#22E5FF] hover:bg-[#1A3D73]"
            >
              <div className="flex flex-1 items-center justify-center">
                {p.logo ? (
                  <div className="relative h-14 w-48 sm:h-16 sm:w-56">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      fill
                      unoptimized
                      sizes="224px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-pixel text-2xl font-bold tracking-wider text-[#A3F06D] sm:text-3xl">
                    {p.name}
                  </span>
                )}
              </div>
              <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9EB3D6]">
                {p.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Faculty Coordinators Section */}
        <div className="mt-12 sm:mt-14">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#1648A8]">
            ACADEMIC MENTORSHIP
          </p>
          <h3 className="mt-1 font-pixel text-xl font-bold tracking-tight text-[#0A1B3D] sm:text-2xl">
            FACULTY COORDINATORS
          </h3>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
            {facultyCoordinators.map((fac) => (
              <div
                key={fac.name}
                className="org-item flex flex-col items-center justify-between rounded-xl border border-[#2B548A] bg-[#163463] p-6 text-center text-white shadow-[4px_4px_0_#06142E] transition-all duration-300 hover:-translate-y-1 hover:border-[#22E5FF] hover:bg-[#1A3D73]"
              >
                <div className="relative mb-5 h-40 w-32 overflow-hidden rounded-lg border-2 border-[#2B548A] bg-[#0A1E46] shadow-[3px_3px_0_#06142E]">
                  <Image
                    src={fac.photo}
                    alt={`${fac.name}, faculty coordinator`}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <span
                    className="font-mono text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: fac.accent }}
                  >
                    {fac.role}
                  </span>
                  <h4 className="mt-1.5 font-heading text-lg font-bold text-white">
                    {fac.name}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-[#9EB3D6]">
                    {fac.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
