"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GENERAL_FAQS } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="rules-faq"
      ref={sectionRef}
      className="cream-dot-grid border-y border-[#D9D0B8] px-4 py-16 text-[#0A1B3D] sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Questions Accordion */}
        <div className="faq-reveal lg:sticky lg:top-28 lg:self-start">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center border border-[#D9D0B8] bg-[#FAF5E8] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#1648A8]">
              QUICK ANSWERS
            </span>
            <h2 className="mt-5 font-pixel text-3xl font-bold leading-tight tracking-tight text-[#0A1B3D] sm:text-4xl">
              QUESTIONS?<br /><span className="text-[#1648A8]">WE’VE GOT YOU.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-[#4B5C7D] sm:text-lg lg:mx-0">
              Everything you need to know before signing up for Automate or GTM Arena.
            </p>
            <div className="mt-7 hidden border-l-2 border-[#1648A8] pl-4 text-left text-sm leading-relaxed text-[#4B5C7D] lg:block">
              Choose an event to see its format, schedule, and registration link.
            </div>
          </div>
        </div>

        <div className="faq-reveal">
          <div className="space-y-3">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden border transition-all duration-200 ${
                    isOpen
                      ? "border-[#1648A8]/45 bg-[#FAF5E8] shadow-[3px_3px_0_rgba(22,72,168,0.16)]"
                      : "border-[#D9D0B8] bg-[#FAF5E8]/70 hover:border-[#1648A8]/35"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`general-faq-answer-${idx}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex min-h-[68px] w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center font-mono text-xs font-bold transition-colors ${
                          isOpen ? "bg-[#1648A8] text-white" : "bg-[#EAE2CE] text-[#4B5C7D]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-base font-bold text-[#0A1B3D] sm:text-lg">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#1648A8]" : "text-[#4B5C7D]"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`general-faq-answer-${idx}`}
                        role="region"
                        aria-label={faq.question}
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[#D9D0B8] pb-5 pl-16 pr-5 pt-4 text-sm leading-relaxed text-[#4B5C7D] sm:pr-8 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
