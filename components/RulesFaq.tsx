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
      className="dark-dot-grid border-b border-[#9EB3D6]/20 bg-[#06142E] px-4 py-20 text-[#F4F6FB] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Rules & Regulations Block */}
        <div className="rules-reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#9EB3D6]">
            KNOW BEFORE YOU ENTER
          </p>
          <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
            RULES <span className="text-[#22E5FF]">&amp;</span> REGULATIONS
          </h2>

          <div className="mx-auto mt-6 max-w-2xl border-x-2 border-[#1648A8] bg-[#1648A8]/20 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#D8E3F5]">
            IMPORTANT: ALL PARTICIPANTS MUST READ THE OFFICIAL RULEBOOK BEFORE THE EVENT.
          </div>

          <div className="navy-card mx-auto mt-8 max-w-lg p-8">
            <ScrollText className="mx-auto h-9 w-9 text-[#22E5FF]" />
            <h3 className="mt-4 font-heading text-xl font-bold tracking-wide text-[#F4F6FB]">
              OFFICIAL RULEBOOK
            </h3>
            <p className="mt-2 text-sm text-[#9EB3D6]">
              Find all event guidelines, round-wise instructions, eligibility criteria, and
              competition rules for both tracks.
            </p>
            <button
              type="button"
              onClick={() => setShowRulebook((v) => !v)}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center bg-[#1648A8] px-6 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1D5BC6]"
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
                    <div key={ev.id} className="navy-card p-5">
                      <h4 className="font-heading text-base font-bold text-[#F4F6FB]">
                        {ev.name} Rules
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#9EB3D6]">
                        {ev.rules.map((r, i) => (
                          <li key={r} className="flex gap-2.5">
                            <span className="font-mono font-bold text-[#22E5FF]">0{i + 1}</span>
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
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#9EB3D6]">
              EVERYTHING YOU NEED TO KNOW
            </p>
            <h3 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-[#F4F6FB] sm:text-5xl">
              FREQUENTLY ASKED <span className="text-[#22E5FF]">QUESTIONS</span>
            </h3>
            <div className="mx-auto my-4 flex max-w-xs items-center gap-3">
              <div className="h-px flex-1 bg-white/15" />
              <span className="text-sm text-[#22E5FF]" aria-hidden="true">
                ✦
              </span>
              <div className="h-px flex-1 bg-white/15" />
            </div>
            <p className="text-base text-[#9EB3D6] sm:text-lg">
              Have questions before entering the arena? Find your answers here.
            </p>
          </div>

          <div className="mt-10 border-t border-[#9EB3D6]/20">
            {GENERAL_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  onMouseEnter={() => setOpenFaqIndex(idx)}
                  className={`border-b border-[#9EB3D6]/20 transition-colors duration-200 ${
                    isOpen ? "bg-[#091D42]/80" : "hover:bg-[#091D42]/40"
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
                          isOpen ? "text-[#22E5FF]" : "text-[#9EB3D6]"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-lg font-bold text-[#F4F6FB] sm:text-2xl">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#22E5FF]" : "text-[#9EB3D6]"
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
                        <p className="pb-6 pl-12 pr-6 text-base leading-relaxed text-[#9EB3D6] sm:pl-14 sm:text-lg">
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
