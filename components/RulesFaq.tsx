"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EVENTS, EVENT_LIST, GENERAL_FAQS, type EventId } from "@/content/events";
import { prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const [activeTab, setActiveTab] = useState<"general" | EventId>("general");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const reduced = prefersReducedMotion();

  const faqs = activeTab === "general" ? GENERAL_FAQS : EVENTS[activeTab].faqs;
  const rules = activeTab === "general" ? null : EVENTS[activeTab].rules;

  return (
    <section id="rules-faq" className="cream-dot-grid px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-pixel text-4xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl">
            Questions
          </h2>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="FAQ and Rules Filter"
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

        {/* Numbered Hairline FAQ Rows matching screenshot */}
        <div className="mt-10 border-t border-[#D9D0B8]">
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

        {/* Event-specific rules when an event tab is selected */}
        {rules && (
          <div className="quest-shadow mt-8 border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6">
            <h3 className="font-heading text-lg font-bold text-[#0A1B3D]">
              Official Rules — {EVENTS[activeTab as EventId].name}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-[#4B5C7D]">
              {rules.map((r, i) => (
                <li key={r} className="flex gap-3">
                  <span className="font-mono text-xs font-bold text-[#1D5BC6]">0{i + 1}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
