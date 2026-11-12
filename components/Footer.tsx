"use client";

import { ArrowUp, Mail, Phone } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-white/10 bg-[#07080B] px-4 pb-24 pt-14 sm:px-6 md:pb-14"
    >
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 font-mono text-xs text-[#22E5FF]">
              {ORGANISER_INFO.logoText}
            </span>
            <div>
              <p className="font-heading text-base font-bold text-[#EDEFF5]">
                {ORGANISER_INFO.clubName}
              </p>
              <p className="text-xs text-[#8A90A2]">{ORGANISER_INFO.collegeName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#8A90A2]">
            <a
              href={`mailto:${ORGANISER_INFO.contactEmail}`}
              className="inline-flex min-h-[44px] items-center gap-1.5 hover:text-[#EDEFF5]"
            >
              <Mail className="h-3.5 w-3.5 text-[#22E5FF]" />
              <span>{ORGANISER_INFO.contactEmail}</span>
            </a>
            <span className="inline-flex min-h-[44px] items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#19F58A]" />
              <span>{ORGANISER_INFO.contactPhone}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {ORGANISER_INFO.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs text-[#8A90A2] transition-colors hover:text-[#EDEFF5]"
            >
              {s.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 font-mono text-xs text-[#EDEFF5] hover:bg-white/10"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Top</span>
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/5 pt-6 text-xs text-[#8A90A2]">
        © {new Date().getFullYear()} {ORGANISER_INFO.clubName}, {ORGANISER_INFO.collegeName}. Built
        with Next.js, GSAP & Supabase.
      </div>
    </footer>
  );
}

