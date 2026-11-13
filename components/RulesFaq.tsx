"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GENERAL_FAQS } from "@/content/events";
import { ensureGsapRegistered, MOTION_EASE, prefersReducedMotion } from "@/lib/motion";

export default function RulesFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    if (!sectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
        { y: 38, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.1,
          ease: "power4.out",
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
      className="cream-dot-grid border-y border-[#D9D0B8] px-4 py-20 text-[#0A1B3D] sm:px-6 lg:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Questions Accordion */}
        <div className="faq-reveal">
          <div className="text-center">
            <h2
              className="font-pixel text-3xl font-bold tracking-tight text-[#0A1B3D] sm:text-5xl"
              style={{ textShadow: "0 0 10px rgba(10,27,61,0.22)" }}
            >
              FREQUENTLY ASKED <span className="text-[#1648A8]">QUESTIONS</span>
            </h2>
            <div className="mx-auto my-4 h-px max-w-xs bg-[#D9D0B8]" />
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
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
