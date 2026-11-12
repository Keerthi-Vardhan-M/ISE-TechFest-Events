"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EVENTS, EVENT_LIST, type EventId } from "@/content/events";
import { prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const [activeTab, setActiveTab] = useState<EventId>("automate");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const currentEvent = EVENTS[activeTab];
  const reduced = prefersReducedMotion();

  return (
    <section id="rules-faq" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#22E5FF]">
            RULES & FAQ
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#EDEFF5] sm:text-5xl">
            Everything you need to know.
          </h2>
        </div>

        {/* Event Tabs (scroll-snap on narrow viewports) */}
        <div
          role="tablist"
          aria-label="Event Rules and FAQ Tabs"
          className="no-scrollbar mb-8 flex snap-x gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-[#0F1218] p-1.5"
        >
          {EVENT_LIST.map((ev) => {
            const selected = ev.id === activeTab;
            return (
              <button
                key={ev.id}
                role="tab"
                type="button"
                aria-selected={selected}
                data-theme={ev.theme}
                onClick={() => {
                  setActiveTab(ev.id);
                  setOpenFaqIndex(0);
                }}
                className={`min-h-[44px] flex-1 snap-center whitespace-nowrap rounded-xl px-4 font-heading text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-white/10 text-[#EDEFF5]"
                    : "text-[#8A90A2] hover:text-[#EDEFF5]"
                }`}
                style={
                  selected
                    ? {
                        boxShadow: "inset 0 0 0 1px var(--theme-border)",
                        color: "var(--accent-primary)",
                      }
                    : undefined
                }
              >
                {ev.name}
              </button>
            );
          })}
        </div>

        <div data-theme={currentEvent.theme} className="space-y-8">
          {/* Rules */}
          <div className="rounded-2xl border border-white/10 bg-[#0F1218]/80 p-6">
            <h3 className="font-heading text-lg font-semibold text-[#EDEFF5]">
              Official Rules — {currentEvent.name}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#8A90A2]">
              {currentEvent.rules.map((rule, i) => (
                <li key={rule} className="flex gap-3">
                  <span
                    className="font-mono text-xs font-semibold pt-0.5"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    0{i + 1}
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion FAQ */}
          <div className="space-y-3">
            <h3 className="font-heading text-lg font-semibold text-[#EDEFF5]">
              Frequently Asked Questions
            </h3>
            {currentEvent.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F1218]/80"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex min-h-[52px] w-full items-center justify-between gap-4 px-5 py-3.5 text-left font-heading text-sm font-semibold text-[#EDEFF5] sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#8A90A2] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
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
                        <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-[#8A90A2]">
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

