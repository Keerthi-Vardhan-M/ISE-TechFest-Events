"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import Lenis from "lenis";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, prefersReducedMotion } from "@/lib/motion";

interface EventDetailPageProps {
  event: EventConfig;
  allEvents: EventConfig[];
}

export default function EventDetailPage({ event, allEvents }: EventDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isAutomate = event.id === "automate";
  const accentColor = isAutomate ? "#22E5FF" : "#A3F06D";

  useEffect(() => {
    ensureGsapRegistered();
    if (isTouchDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const otherEvent = allEvents.find((e) => e.id !== event.id);

  return (
    <div className="min-h-screen cream-dot-grid text-[#0A1B3D]">
      {/* Top Header / Breadcrumbs Bar */}
      <header className="sticky top-0 z-40 border-b border-[#D9D0B8] bg-[#FAF5E8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-3 sm:px-6">
          <Link
              href={`/register?event=${event.id}`}
              className="inline-flex min-h-[36px] items-center rounded-lg border border-[#0A1B3D] bg-[#0A1B3D] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[2px_2px_0_#1648A8] transition-all duration-200 hover:bg-[#1648A8]"
            >
              <span>Register Now</span>
            </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#D9D0B8] px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        {/* Ambient atmospheric radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Event details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-[#D9D0B8] bg-[#F5EFE0] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#1648A8]">
                <span className="font-bold">{event.categoryLabel}</span>
                <span>•</span>
                <span className="text-[#0A1B3D] font-bold">FREE ENTRY</span>
              </div>

              <h1 className="mt-4 font-pixel text-4xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-5xl lg:text-6xl" style={{ textShadow: "0 0 3px rgba(10,27,61,0.08)" }}>
                {event.name}
              </h1>

              <p className="mt-4 text-base font-medium leading-relaxed text-[#1648A8] sm:text-lg">
                {event.tagline}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#4B5C7D]">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/register?event=${event.id}`}
                  className="inline-flex min-h-[46px] items-center rounded-xl border-2 border-[#0A1B3D] bg-[#0A1B3D] px-7 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[4px_4px_0_#1648A8] transition-all duration-200 hover:bg-[#1648A8]"
                >
                  <span>REGISTER TEAM FOR FREE</span>
                </Link>

                <a
                  href="#rounds"
                  className="inline-flex min-h-[46px] items-center border-2 border-[#0A1B3D] bg-[#FAF5E8] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D] shadow-[3px_3px_0_rgba(10,27,61,0.12)] transition-colors hover:bg-[#F5EFE0]"
                >
                  View Rounds &amp; Rules
                </a>
              </div>
            </div>

            {/* Right Column: 3D Mascot Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden border-2 border-[#0A1B3D] bg-[#FAF5E8] p-8 shadow-[6px_6px_0_#0A1B3D]">
                <div className="animate-float-slow relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
                  <Image
                    src={isAutomate ? "/images/event-automate.png" : "/images/event-quant.png"}
                    alt={event.name}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain drop-shadow-[0_12px_24px_rgba(10,27,61,0.2)]"
                  />
                </div>

                <div className="mt-4 border-t border-[#D9D0B8] pt-4 text-center">
                  <span className="font-pixel text-2xl font-bold text-[#1648A8]">
                    {event.prizePool}
                  </span>
                  <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
                    TOTAL CASH PRIZE POOL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Event Metadata Grid */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <Calendar className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Date</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#0A1B3D] sm:text-sm">
                {event.dateDisplay}
              </p>
            </div>

            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <Clock className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Timing</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#0A1B3D] sm:text-sm">
                {event.timeDisplay}
              </p>
            </div>

            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <MapPin className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Venue</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#0A1B3D] sm:text-sm">
                {event.venue}
              </p>
            </div>

            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <Users className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Team Size</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#0A1B3D] sm:text-sm">
                3–4 Members
              </p>
            </div>

            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Eligibility</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#0A1B3D] sm:text-sm">
                UG / PG Students
              </p>
            </div>

            <div className="border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#4B5C7D]">
                <Trophy className="h-3.5 w-3.5 text-[#1648A8]" />
                <span>Entry Fee</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#1648A8] sm:text-sm">
                FREE (₹0)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Rounds Section */}
      <section id="rounds" className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1648A8]">
              STRUCTURE &amp; EVALUATION
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-4xl">
              COMPETITION ROUNDS
            </h2>
            <p className="mt-2 text-sm text-[#4B5C7D]">
              All rounds are conducted on campus. Teams advance based on score benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {event.rounds.map((round) => (
              <div
                key={round.number}
                className="group relative flex flex-col justify-between border-2 border-[#D9D0B8] bg-[#FAF5E8] p-6 shadow-sm transition-all duration-300 hover:border-[#0A1B3D] hover:shadow-[4px_4px_0_#0A1B3D]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#D9D0B8] pb-3">
                    <span className="font-pixel text-2xl font-bold text-[#1648A8]">
                      ROUND {round.number}
                    </span>
                    <span className="border border-[#0A1B3D] bg-[#0A1B3D] px-2 py-0.5 font-mono text-[11px] font-bold text-[#FAF5E8]">
                      {round.duration}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-[#0A1B3D]">
                    {round.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-[#4B5C7D]">
                    {round.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 font-mono text-[10px] text-[#4B5C7D]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1648A8]" />
                  <span>Judged by Industry &amp; Faculty Panel</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Timeline & Cash Rewards */}
      <section className="border-t border-[#D9D0B8] bg-[#F5EFE0]/70 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Timeline */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1648A8]">
                DAY SCHEDULE
              </span>
              <h2 className="mt-2 font-pixel text-2xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-3xl">
                EVENT TIMELINE
              </h2>

              <div className="mt-8 space-y-4">
                {event.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 border border-[#D9D0B8] bg-[#FAF5E8] p-4 shadow-sm transition-colors hover:border-[#0A1B3D]"
                  >
                    <span className="min-w-[85px] border border-[#0A1B3D] bg-[#0A1B3D] px-2.5 py-1 text-center font-mono text-xs font-bold text-[#FAF5E8]">
                      {item.time}
                    </span>
                    <span className="font-mono text-xs text-[#0A1B3D] sm:text-sm">
                      {item.milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Podium Prizes */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1648A8]">
                PODIUM AWARDS
              </span>
              <h2 className="mt-2 font-pixel text-2xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-3xl">
                CASH REWARDS &amp; RECOGNITION
              </h2>

              <div className="mt-8 space-y-4">
                {event.podium.map((pod) => (
                  <div
                    key={pod.rank}
                    className="flex items-center justify-between border-2 border-[#D9D0B8] bg-[#FAF5E8] p-5 shadow-sm transition-all hover:border-[#0A1B3D] hover:shadow-[3px_3px_0_#0A1B3D]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#0A1B3D] bg-[#0A1B3D] font-pixel text-lg font-bold text-[#F5C451]">
                        {pod.rank}
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-[#0A1B3D] sm:text-base">
                          {pod.title}
                        </h4>
                        <span className="font-mono text-[11px] text-[#4B5C7D]">
                          Official Podium Finish
                        </span>
                      </div>
                    </div>

                    <span className="font-pixel text-base font-bold text-[#1648A8] sm:text-lg">
                      {pod.reward}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instant Registration Callout Card */}
              <div className="mt-8 border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 text-center shadow-[5px_5px_0_#0A1B3D]">
                <h3 className="font-pixel text-lg font-bold uppercase tracking-tight text-[#0A1B3D]">
                  READY TO COMPETE?
                </h3>
                <p className="mt-1 font-mono text-xs text-[#4B5C7D]">
                  Seats are capped at {event.seatCap} teams. Free entry for all college students.
                </p>
                <Link
                  href={`/register?event=${event.id}`}
                  className="mt-4 inline-flex min-h-[42px] items-center border-2 border-[#0A1B3D] bg-[#0A1B3D] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[3px_3px_0_#1648A8] transition-all hover:bg-[#1648A8]"
                >
                  <span>CLAIM YOUR TEAM SPOT</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Eligibility Guidelines */}
      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#C82333]">
              RULES &amp; CODE OF CONDUCT
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-4xl">
              OFFICIAL GUIDELINES
            </h2>
          </div>

          <div className="border-2 border-[#D9D0B8] bg-[#FAF5E8] p-6 sm:p-8 shadow-sm">
            <ul className="space-y-4">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-[#0A1B3D] bg-[#0A1B3D] font-mono text-[10px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-[#0A1B3D] sm:text-sm">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-[#D9D0B8] bg-[#F5EFE0]/60 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#1648A8]">
              COMMON INQUIRIES
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-4xl">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {event.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#D9D0B8] bg-[#FAF5E8] shadow-sm overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-heading text-sm font-bold text-[#0A1B3D] transition-colors hover:text-[#1648A8] sm:p-5 sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#4B5C7D] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1648A8]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#D9D0B8] p-4 pt-2 text-xs leading-relaxed text-[#4B5C7D] sm:p-5 sm:pt-2 sm:text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coordinator Contact & Other Track Switcher */}
      <section className="border-t border-[#D9D0B8] px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Coordinator Card */}
            <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-8">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                TRACK COORDINATOR
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold text-[#0A1B3D]">
                {event.contact.name}
              </h3>
              <p className="font-mono text-xs text-[#4B5C7D]">
                {event.contact.role}
              </p>

              <div className="mt-6 flex flex-col gap-3 font-mono text-xs">
                <a
                  href={`tel:${event.contact.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 font-bold text-[#1648A8] hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  <span>{event.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${event.contact.email}`}
                  className="inline-flex items-center gap-2 font-bold text-[#1648A8] hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  <span>{event.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Switch to Other Track */}
            {otherEvent && (
              <div className="border-2 border-[#D9D0B8] bg-[#FAF5E8] p-6 text-center shadow-sm sm:p-8 hover:border-[#0A1B3D] transition-colors">
                <span className="font-mono text-xs uppercase tracking-widest text-[#4B5C7D]">
                  ALSO EXPLORE
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-[#0A1B3D]">
                  {otherEvent.name}
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold text-[#1648A8]">
                  {otherEvent.categoryLabel} • {otherEvent.dateDisplay}
                </p>
                <p className="mt-3 text-xs text-[#4B5C7D]">
                  {otherEvent.tagline}
                </p>
                <Link
                  href={`/events/${otherEvent.id}`}
                  className="mt-6 inline-flex min-h-[40px] items-center border-2 border-[#0A1B3D] bg-[#0A1B3D] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[3px_3px_0_#1648A8] transition-colors hover:bg-[#1648A8]"
                >
                  View {otherEvent.shortName} Details →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Bottom Sticky Register Bar for mobile/tablet */}
      <div className="sticky bottom-0 z-30 border-t border-[#D9D0B8] bg-[#FAF5E8]/95 p-3.5 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-pixel text-xs text-[#1648A8]">{event.prizePool}</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-[#4B5C7D]">
              {event.dateDisplay} • FREE
            </span>
          </div>
          <Link
            href={`/register?event=${event.id}`}
            className="border border-[#0A1B3D] bg-[#0A1B3D] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[2px_2px_0_#1648A8]"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
