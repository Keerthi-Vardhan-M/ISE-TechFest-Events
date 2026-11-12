"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ScrollText } from "lucide-react";
import { EVENTS, EVENT_LIST, GENERAL_FAQS, type EventId } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"general" | EventId>("general");
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

  const faqs = activeTab === "general" ? GENERAL_FAQS : EVENTS[activeTab].faqs;

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
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-4xl">
              Questions
            </h3>

            <div
              role="tablist"
              aria-label="FAQ Filter"
              className="no-scrollbar flex snap-x gap-2 overflow-x-auto"
            >
              <button
                role="tab"
                type="button"
                aria-selected={activeTab === "general"}
                onClick={() => {
                  setActiveTab("general");
                  setOpenFaqIndex(0);
                }}
                className={`min-h-[44px] whitespace-nowrap border-2 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "general"
                    ? "border-[#0A1B3D] bg-[#A3F06D] text-[#0A1B3D]"
                    : "border-[#D9D0B8] bg-[#FAF5E8] text-[#4B5C7D] hover:border-[#0A1B3D]"
                }`}
              >
                General
              </button>
              {EVENT_LIST.map((ev) => (
                <button
                  key={ev.id}
                  role="tab"
                  type="button"
                  aria-selected={activeTab === ev.id}
                  onClick={() => {
                    setActiveTab(ev.id);
                    setOpenFaqIndex(0);
                  }}
                  className={`min-h-[44px] whitespace-nowrap border-2 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeTab === ev.id
                      ? "border-[#0A1B3D] bg-[#A3F06D] text-[#0A1B3D]"
                      : "border-[#D9D0B8] bg-[#FAF5E8] text-[#4B5C7D] hover:border-[#0A1B3D]"
                  }`}
                >
                  {ev.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-[#D9D0B8]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question} className="border-b border-[#D9D0B8]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs font-semibold text-[#4B5C7D]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-base font-bold text-[#0A1B3D] sm:text-xl">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#4B5C7D] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#0A1B3D]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-10 pr-6 text-sm leading-relaxed text-[#4B5C7D] sm:text-base">
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
