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
  Sparkles,
  ChevronDown,
} from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import RegisterModal from "./RegisterModal";

interface EventDetailPageProps {
  event: EventConfig;
  allEvents: EventConfig[];
}

export default function EventDetailPage({ event, allEvents }: EventDetailPageProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isAutomate = event.id === "automate";
  const accentColor = isAutomate ? "#22E5FF" : "#A3F06D";

  useEffect(() => {
    ensureGsapRegistered();
    if (isTouchDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
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
    <div className="min-h-screen bg-[#06142E] text-[#EDEFF5]">
      {/* Top Header / Breadcrumbs Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06142E]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/#events"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#9EB3D6] transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Events</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-pixel text-xs text-[#9EB3D6] sm:inline-block">
              AUTO×QUANT &apos;26
            </span>
            <button
              type="button"
              onClick={() => setIsRegisterOpen(true)}
              className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg bg-[#A3F06D] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#06142E] shadow-[0_0_16px_rgba(163,240,109,0.3)] transition-all duration-200 hover:bg-[#bbf690] hover:scale-103"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Register Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        {/* Ambient atmospheric radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: accentColor }}
        />

        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Event details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#22E5FF]">
                <span>{event.categoryLabel}</span>
                <span>•</span>
                <span className="text-[#A3F06D]">FREE ENTRY</span>
              </div>

              <h1 className="mt-4 font-pixel text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {event.name}
              </h1>

              <p className="mt-4 text-base font-medium leading-relaxed text-[#D8E3F5] sm:text-lg">
                {event.tagline}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#9EB3D6]">
                {event.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-[#A3F06D] px-7 font-mono text-xs font-bold uppercase tracking-wider text-[#06142E] shadow-[0_8px_24px_rgba(163,240,109,0.3)] transition-all duration-200 hover:bg-[#bbf690] hover:scale-103"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>REGISTER TEAM FOR FREE</span>
                </button>

                <a
                  href="#rounds"
                  className="inline-flex min-h-[46px] items-center border border-white/20 bg-white/5 px-6 font-mono text-xs uppercase tracking-wider text-[#EDEFF5] transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  View Rounds &amp; Rules
                </a>
              </div>
            </div>

            {/* Right Column: 3D Mascot Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0A1E46]/80 p-8 shadow-[0_20px_60px_rgba(3,10,24,0.7)]">
                <div className="animate-float-slow relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
                  <Image
                    src={isAutomate ? "/images/event-automate.jpg" : "/images/event-quant.jpg"}
                    alt={event.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.6)]"
                  />
                </div>

                <div className="mt-4 border-t border-white/10 pt-4 text-center">
                  <span className="font-pixel text-2xl font-bold text-[#A3F06D]">
                    {event.prizePool}
                  </span>
                  <span className="ml-2 font-mono text-xs uppercase tracking-widest text-[#9EB3D6]">
                    TOTAL CASH PRIZE POOL
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Event Metadata Grid */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <Calendar className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Date</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-white sm:text-sm">
                {event.dateDisplay}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <Clock className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Timing</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-white sm:text-sm">
                {event.timeDisplay}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <MapPin className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Venue</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-white sm:text-sm">
                {event.venue}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <Users className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Team Size</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#A3F06D] sm:text-sm">
                3–4 Members
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Eligibility</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-white sm:text-sm">
                UG / PG Students
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                <Trophy className="h-3.5 w-3.5 text-[#22E5FF]" />
                <span>Entry Fee</span>
              </div>
              <p className="mt-1 font-mono text-xs font-bold text-[#22E5FF] sm:text-sm">
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
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#22E5FF]">
              STRUCTURE &amp; EVALUATION
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-white sm:text-4xl">
              COMPETITION ROUNDS
            </h2>
            <p className="mt-2 text-sm text-[#9EB3D6]">
              All rounds are conducted on campus. Teams advance based on score benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {event.rounds.map((round) => (
              <div
                key={round.number}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/15 bg-[#0A1E46]/70 p-6 shadow-lg transition-all duration-300 hover:border-[#22E5FF]/60 hover:bg-[#0A1E46]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-pixel text-2xl font-bold text-[#22E5FF]">
                      ROUND {round.number}
                    </span>
                    <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[11px] text-[#A3F06D]">
                      {round.duration}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-lg font-bold text-white">
                    {round.title}
                  </h3>

                  <p className="mt-2.5 text-xs leading-relaxed text-[#9EB3D6]">
                    {round.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 font-mono text-[10px] text-[#9EB3D6]">
                  <CheckCircle2 className="h-3 w-3 text-[#A3F06D]" />
                  <span>Judged by Industry &amp; Faculty Panel</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Timeline & Cash Rewards */}
      <section className="border-t border-white/10 bg-[#040E22] px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Timeline */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#22E5FF]">
                DAY SCHEDULE
              </span>
              <h2 className="mt-2 font-pixel text-2xl font-bold tracking-tight text-white sm:text-3xl">
                EVENT TIMELINE
              </h2>

              <div className="mt-8 space-y-4">
                {event.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#0A1E46]/50 p-4 transition-colors hover:border-white/20"
                  >
                    <span className="min-w-[85px] rounded bg-[#1648A8]/60 px-2.5 py-1 text-center font-mono text-xs font-bold text-[#22E5FF]">
                      {item.time}
                    </span>
                    <span className="font-mono text-xs text-[#EDEFF5] sm:text-sm">
                      {item.milestone}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Podium Prizes */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#A3F06D]">
                PODIUM AWARDS
              </span>
              <h2 className="mt-2 font-pixel text-2xl font-bold tracking-tight text-white sm:text-3xl">
                CASH REWARDS &amp; RECOGNITION
              </h2>

              <div className="mt-8 space-y-4">
                {event.podium.map((pod) => (
                  <div
                    key={pod.rank}
                    className="flex items-center justify-between rounded-xl border border-white/15 bg-[#0A1E46]/80 p-5 shadow-sm transition-all hover:border-[#A3F06D]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#06142E] font-pixel text-lg font-bold text-[#F5C451]">
                        {pod.rank}
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-bold text-white sm:text-base">
                          {pod.title}
                        </h4>
                        <span className="font-mono text-[11px] text-[#9EB3D6]">
                          Official Podium Finish
                        </span>
                      </div>
                    </div>

                    <span className="font-pixel text-base font-bold text-[#A3F06D] sm:text-lg">
                      {pod.reward}
                    </span>
                  </div>
                ))}
              </div>

              {/* Instant Registration Callout Card */}
              <div className="mt-8 rounded-2xl border border-[#22E5FF]/40 bg-[#071D44] p-6 text-center shadow-[0_10px_30px_rgba(34,229,255,0.15)]">
                <h3 className="font-pixel text-lg font-bold text-white">
                  READY TO COMPETE?
                </h3>
                <p className="mt-1 font-mono text-xs text-[#D8E3F5]">
                  Seats are capped at {event.seatCap} teams. Free entry for all college students.
                </p>
                <button
                  type="button"
                  onClick={() => setIsRegisterOpen(true)}
                  className="mt-4 inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#A3F06D] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#06142E] transition-transform hover:scale-103"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>CLAIM YOUR TEAM SPOT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Eligibility Guidelines */}
      <section className="px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#FF6B35]">
              RULES &amp; CODE OF CONDUCT
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-white sm:text-4xl">
              OFFICIAL GUIDELINES
            </h2>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#0A1E46]/60 p-6 sm:p-8">
            <ul className="space-y-4">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1648A8] font-mono text-[10px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs leading-relaxed text-[#D8E3F5] sm:text-sm">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-white/10 bg-[#040E22] px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#22E5FF]">
              COMMON INQUIRIES
            </span>
            <h2 className="mt-2 font-pixel text-3xl font-bold tracking-tight text-white sm:text-4xl">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {event.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#0A1E46]/60 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left font-heading text-sm font-bold text-white transition-colors hover:text-[#22E5FF] sm:p-5 sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#22E5FF]" : "text-[#9EB3D6]"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 p-4 pt-2 text-xs leading-relaxed text-[#9EB3D6] sm:p-5 sm:pt-2 sm:text-sm">
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
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            {/* Coordinator Card */}
            <div className="rounded-2xl border border-white/15 bg-[#0A1E46]/80 p-6 sm:p-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#A3F06D]">
                TRACK COORDINATOR
              </span>
              <h3 className="mt-2 font-heading text-xl font-bold text-white">
                {event.contact.name}
              </h3>
              <p className="font-mono text-xs text-[#9EB3D6]">
                {event.contact.role}
              </p>

              <div className="mt-6 flex flex-col gap-3 font-mono text-xs">
                <a
                  href={`tel:${event.contact.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-[#22E5FF] hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  <span>{event.contact.phone}</span>
                </a>
                <a
                  href={`mailto:${event.contact.email}`}
                  className="inline-flex items-center gap-2 text-[#22E5FF] hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  <span>{event.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Switch to Other Track */}
            {otherEvent && (
              <div className="rounded-2xl border border-white/15 bg-[#0A1E46]/50 p-6 text-center sm:p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-[#9EB3D6]">
                  ALSO EXPLORE
                </span>
                <h3 className="mt-2 font-heading text-xl font-bold text-white">
                  {otherEvent.name}
                </h3>
                <p className="mt-1 font-mono text-xs text-[#A3F06D]">
                  {otherEvent.categoryLabel} • {otherEvent.dateDisplay}
                </p>
                <p className="mt-3 text-xs text-[#9EB3D6]">
                  {otherEvent.tagline}
                </p>
                <Link
                  href={`/events/${otherEvent.id}`}
                  className="mt-6 inline-flex min-h-[40px] items-center border border-white/20 bg-white/5 px-6 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-[#22E5FF] hover:text-[#22E5FF]"
                >
                  View {otherEvent.shortName} Details →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Bottom Sticky Register Bar for mobile/tablet */}
      <div className="sticky bottom-0 z-30 border-t border-white/10 bg-[#06142E]/95 p-3.5 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-pixel text-xs text-[#A3F06D]">{event.prizePool}</span>
            <span className="block font-mono text-[9px] uppercase tracking-wider text-[#9EB3D6]">
              {event.dateDisplay} • FREE
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="rounded-lg bg-[#A3F06D] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#06142E]"
          >
            Register Now
          </button>
        </div>
      </div>

      {/* Register Modal for Instant Submission */}
      <RegisterModal
        isOpen={isRegisterOpen}
        selectedEvent={event.id}
        onClose={() => setIsRegisterOpen(false)}
        onEventChange={() => {}}
        onRegistrationSuccess={() => {}}
      />
    </div>
  );
}
