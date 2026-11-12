"use client";

import { useEffect, useRef } from "react";
import { X, Clock, Trophy, ShieldAlert, Phone } from "lucide-react";
import type { EventConfig, EventId } from "@/content/events";
import RobotArm from "./animations/RobotArm";
import BullChart from "./animations/BullChart";

interface EventModalProps {
  event: EventConfig | null;
  onClose: () => void;
  onRegister: (eventId: EventId) => void;
}

export default function EventModal({ event, onClose, onRegister }: EventModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        data-theme={event.theme}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/15 bg-[#0F1218] p-6 text-[#EDEFF5] shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span
              className="font-mono text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--accent-primary)" }}
            >
              {event.categoryLabel}
            </span>
            <h2 id="event-modal-title" className="mt-1 font-heading text-2xl font-bold sm:text-3xl">
              {event.name}
            </h2>
            <p className="mt-1 text-sm text-[#8A90A2]">
              {event.dateDisplay} • {event.timeDisplay} • {event.venue}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close event details"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EDEFF5] hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-6 text-sm">
          <div>
            {event.id === "automate" ? <RobotArm active /> : <BullChart active />}
          </div>
          <p className="leading-relaxed text-[#EDEFF5]/90">{event.description}</p>

          {/* Rounds */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-semibold">
              <Clock className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>Competition Rounds</span>
            </h3>
            <div className="space-y-2.5">
              {event.rounds.map((r) => (
                <div
                  key={r.number}
                  className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span style={{ color: "var(--accent-primary)" }}>ROUND {r.number}</span>
                    <span className="text-[#8A90A2]">{r.duration}</span>
                  </div>
                  <p className="mt-1 font-heading font-semibold text-[#EDEFF5]">{r.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#8A90A2]">{r.summary}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Prizes */}
          <section>
            <h3 className="mb-3 flex items-center gap-2 font-heading text-base font-semibold">
              <Trophy className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>Prizes ({event.prizePool})</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {event.podium.map((p) => (
                <div
                  key={p.rank}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <span className="font-mono text-xs text-[#8A90A2]">{p.rank} Place</span>
                  <p className="font-heading font-semibold text-[#EDEFF5]">{p.title}</p>
                  <p className="mt-1 font-mono text-xs" style={{ color: "var(--accent-primary)" }}>
                    {p.reward}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h3 className="mb-3 font-heading text-base font-semibold">Event Schedule</h3>
            <ul className="space-y-2 border-l border-white/15 pl-4">
              {event.timeline.map((item) => (
                <li key={item.time + item.milestone} className="flex flex-wrap gap-2 text-xs">
                  <span className="font-mono text-[var(--accent-primary)]">{item.time}</span>
                  <span className="text-[#EDEFF5]/90">{item.milestone}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Rules */}
          <section>
            <h3 className="mb-2.5 flex items-center gap-2 font-heading text-base font-semibold">
              <ShieldAlert className="h-4 w-4 text-[var(--accent-primary)]" />
              <span>Key Rules</span>
            </h3>
            <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-[#8A90A2]">
              {event.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 text-xs">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[var(--accent-primary)]" />
              <div>
                <p className="font-semibold text-[#EDEFF5]">
                  {event.contact.name} ({event.contact.role})
                </p>
                <p className="text-[#8A90A2]">
                  {event.contact.phone} • {event.contact.email}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegister(event.id);
              }}
              className="min-h-[44px] rounded-xl px-5 font-heading text-sm font-bold text-[#07080B]"
              style={{ backgroundColor: "var(--accent-primary)" }}
            >
              Register for {event.shortName}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

