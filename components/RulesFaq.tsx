"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ScrollText } from "lucide-react";
import { EVENT_LIST, GENERAL_FAQS } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showRulebook, setShowRulebook] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".rules-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: MOTION_EASE,
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
      className="cream-dot-grid border-t border-[#D9D0B8] px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Rules & Regulations Block matching screenshot 4 */}
        <div className="rules-reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#4B5C7D]">
            KNOW BEFORE YOU ENTER
          </p>
          <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
            RULES <span className="text-[#C82333]">&amp;</span> REGULATIONS
          </h2>

          <div className="mx-auto mt-6 max-w-2xl border-x-2 border-[#C82333] bg-[#C82333]/10 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#8C161D]">
            IMPORTANT: ALL PARTICIPANTS MUST READ THE OFFICIAL RULEBOOK BEFORE THE EVENT.
          </div>

          <div className="mx-auto mt-8 max-w-lg border border-[#D9D0B8] bg-[#FAF5E8] p-8 shadow-sm">
            <ScrollText className="mx-auto h-9 w-9 text-[#C82333]" />
            <h3 className="mt-4 font-heading text-xl font-bold tracking-wide text-[#0A1B3D]">
              OFFICIAL RULEBOOK
            </h3>
            <p className="mt-2 text-sm text-[#4B5C7D]">
              Find all event guidelines, round-wise instructions, eligibility criteria, and
              competition rules for both tracks.
            </p>
            <button
              type="button"
              onClick={() => setShowRulebook((v) => !v)}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center bg-[#1A1614] px-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#FAF5E8] transition-colors hover:bg-[#C82333]"
            >
              {showRulebook ? "HIDE RULEBOOK" : "VIEW RULEBOOK"}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showRulebook && (
              <motion.div
                initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden text-left"
              >
                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {EVENT_LIST.map((ev) => (
                    <div
                      key={ev.id}
                      className="quest-shadow border-2 border-[#0A1B3D] bg-[#FAF5E8] p-5"
                    >
                      <h4 className="font-heading text-base font-bold text-[#0A1B3D]">
                        {ev.name} Rules
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#4B5C7D]">
                        {ev.rules.map((r, i) => (
                          <li key={r} className="flex gap-2.5">
                            <span className="font-mono font-bold text-[#C82333]">0{i + 1}</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Questions Accordion */}
        <div className="rules-reveal mt-20">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#4B5C7D]">
              EVERYTHING YOU NEED TO KNOW
            </p>
            <h3 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
              FREQUENTLY ASKED <span className="text-[#1648A8]">QUESTIONS</span>
            </h3>
            <div className="mx-auto my-4 flex max-w-xs items-center gap-3">
              <div className="h-px flex-1 bg-[#D9D0B8]" />
              <span className="text-sm text-[#1648A8]" aria-hidden="true">
                ✦
              </span>
              <div className="h-px flex-1 bg-[#D9D0B8]" />
            </div>
            <p className="text-base text-[#4B5C7D] sm:text-lg">
              Have questions before entering the arena? Find your answers here.
            </p>
          </div>

          <div className="mt-10 border-t border-[#D9D0B8]">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  onMouseEnter={() => setOpenFaqIndex(idx)}
                  className={`border-b border-[#D9D0B8] transition-colors duration-200 ${
                    isOpen ? "bg-[#FAF5E8]/90" : "hover:bg-[#FAF5E8]/50"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex min-h-[78px] w-full items-center justify-between gap-4 px-3 py-5 text-left sm:px-5"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-mono text-sm font-bold transition-colors ${
                          isOpen ? "text-[#1648A8]" : "text-[#4B5C7D]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-lg font-bold text-[#0A1B3D] sm:text-2xl">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#1648A8]" : "text-[#4B5C7D]"
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-12 pr-6 text-base leading-relaxed text-[#4B5C7D] sm:pl-14 sm:text-lg">
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
