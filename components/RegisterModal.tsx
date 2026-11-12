"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { EVENTS, type EventId } from "@/content/events";
import RegisterForm from "./RegisterForm";

interface RegisterModalProps {
  isOpen: boolean;
  selectedEvent: EventId;
  onClose: () => void;
  onEventChange: (id: EventId) => void;
  onRegistrationSuccess: (id: EventId, seatsLeft: number) => void;
}

export default function RegisterModal({
  isOpen,
  selectedEvent,
  onClose,
  onEventChange,
  onRegistrationSuccess,
}: RegisterModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentEvent = EVENTS[selectedEvent];

  return (
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-4"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
        data-theme={currentEvent.theme}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[#9EB3D6]/30 bg-[#06142E] p-6 text-[#F4F6FB] shadow-[0_20px_60px_rgba(3,10,24,0.9)] sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-[#9EB3D6]/20 pb-4">
          <div>
            <span
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-primary)" }}
            >
              REGISTRATION PORTAL
            </span>
            <h2 id="register-modal-title" className="mt-1 font-pixel text-2xl font-bold sm:text-3xl">
              Lock Your Slot
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close registration modal"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="pt-4">
          <RegisterForm
            selectedEvent={selectedEvent}
            onEventChange={onEventChange}
            onRegistrationSuccess={onRegistrationSuccess}
          />
        </div>
      </div>
    </div>
  );
}
