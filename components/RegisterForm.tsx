"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import { AlertCircle, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { EVENTS, EVENT_LIST, ORGANISER_INFO, type EventId } from "@/content/events";
import { prefersReducedMotion } from "@/lib/motion";
import { registrationSchema, type RegistrationInput } from "@/lib/validation";

interface RegisterFormProps {
  selectedEvent: EventId;
  onEventChange: (eventId: EventId) => void;
  onRegistrationSuccess: (eventId: EventId, seatsLeft: number) => void;
}

interface SuccessReceipt {
  referenceId: string;
  eventName: string;
  teamName: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "dark" | "light";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function RegisterForm({
  selectedEvent,
  onEventChange,
  onRegistrationSuccess,
}: RegisterFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [receipt, setReceipt] = useState<SuccessReceipt | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      event: selectedEvent,
      teamName: "",
      leaderName: "",
      email: "",
      phone: "",
      college: "",
      departmentYear: "",
      members: [],
      txnId: "",
      consent: undefined as unknown as true,
      turnstileToken: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const activeEventId = watch("event");
  const activeEvent = EVENTS[activeEventId];
  const maxExtraMembers = activeEvent.teamSize.max - 1;

  useEffect(() => {
    setValue("event", selectedEvent);
  }, [selectedEvent, setValue]);

  useEffect(() => {
    if (fields.length > maxExtraMembers) {
      for (let i = fields.length - 1; i >= maxExtraMembers; i--) {
        remove(i);
      }
    }
  }, [fields.length, maxExtraMembers, remove]);

  useEffect(() => {
    if (!siteKey || !turnstileReady || !window.turnstile) return;
    const container = document.getElementById("turnstile-widget");
    if (!container || container.childElementCount > 0) return;

    window.turnstile.render(container, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token: string) => setValue("turnstileToken", token),
      "expired-callback": () => setValue("turnstileToken", ""),
    });
  }, [siteKey, turnstileReady, setValue]);

  const onSubmit = async (values: RegistrationInput) => {
    setServerError(null);
    setIsWaitlist(false);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const body = (await res.json()) as {
        status?: string;
        message?: string;
        referenceId?: string;
        eventName?: string;
        teamName?: string;
        seatsLeft?: number;
      };

      if (!res.ok) {
        if (body.status === "FULL") {
          setIsWaitlist(true);
        }
        setServerError(body.message || "Registration failed. Please check your details and retry.");
        return;
      }

      setReceipt({
        referenceId: body.referenceId ?? "CONFIRMED",
        eventName: body.eventName ?? activeEvent.name,
        teamName: body.teamName ?? values.teamName,
      });

      if (typeof body.seatsLeft === "number") {
        onRegistrationSuccess(values.event, body.seatsLeft);
      }

      if (!prefersReducedMotion()) {
        import("canvas-confetti")
          .then((mod) => {
            mod.default({
              particleCount: 70,
              spread: 65,
              origin: { y: 0.7 },
            });
          })
          .catch(() => {});
      }
    } catch {
      setServerError("Network error. Your form data is still here — please retry.");
    }
  };

  return (
    <div className="w-full text-[#F4F6FB]">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onLoad={() => setTurnstileReady(true)}
        />
      )}

      <div className="mx-auto max-w-2xl">
        <div className="border border-[#9EB3D6]/30 bg-[#091D42]/95 p-5 shadow-[6px_6px_0_#030B1A] sm:p-7">
          {receipt ? (
            <div role="status" aria-live="polite" className="space-y-5 py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#A3F06D]/20 text-[#A3F06D]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-pixel text-2xl font-bold text-[#F4F6FB]">
                  Registration Confirmed!
                </h3>
                <p className="mt-1 text-sm text-[#9EB3D6]">
                  Team <strong className="text-[#F4F6FB]">{receipt.teamName}</strong> is registered
                  for <strong className="text-[#F4F6FB]">{receipt.eventName}</strong>.
                </p>
              </div>
              <div className="border border-[#9EB3D6]/25 bg-[#040F24] p-4 font-mono text-xs">
                <span className="text-[#9EB3D6]">REFERENCE ID</span>
                <p className="mt-1 break-all text-sm font-bold text-[#A3F06D]">
                  {receipt.referenceId}
                </p>
              </div>
              <p className="text-xs leading-relaxed text-[#9EB3D6]">
                Save your Reference ID and bring your college ID + UPI receipt to {activeEvent.venue}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  reset({
                    event: activeEventId,
                    teamName: "",
                    leaderName: "",
                    email: "",
                    phone: "",
                    college: "",
                    departmentYear: "",
                    members: [],
                    txnId: "",
                  });
                }}
                className="min-h-[46px] border border-[#9EB3D6]/35 bg-[#040F24] px-6 font-mono text-xs font-semibold uppercase tracking-wider text-[#F4F6FB] hover:bg-[#0C2657]"
              >
                Register Another Team
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="reg-event"
                  className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                >
                  Select Event
                </label>
                <select
                  id="reg-event"
                  {...register("event", {
                    onChange: (e) => onEventChange(e.target.value as EventId),
                  })}
                  className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB]"
                >
                  {EVENT_LIST.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name} ({ev.feeDisplay} • {ev.teamSize.label})
                    </option>
                  ))}
                </select>
                {errors.event && (
                  <p className="mt-1 text-xs text-[#FF3B5C]">{errors.event.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reg-team"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    Team Name
                  </label>
                  <input
                    id="reg-team"
                    type="text"
                    autoComplete="organization"
                    placeholder="e.g. NullPointers"
                    {...register("teamName")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.teamName && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.teamName.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reg-leader"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    Leader Full Name
                  </label>
                  <input
                    id="reg-leader"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    {...register("leaderName")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.leaderName && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.leaderName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reg-email"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    Leader Email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@college.edu"
                    {...register("email")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reg-phone"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="reg-college"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    College / University
                  </label>
                  <input
                    id="reg-college"
                    type="text"
                    placeholder={ORGANISER_INFO.collegeName}
                    {...register("college")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.college && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.college.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="reg-dept"
                    className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    Department & Year
                  </label>
                  <input
                    id="reg-dept"
                    type="text"
                    placeholder="e.g. CSE — 3rd Year"
                    {...register("departmentYear")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.departmentYear && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.departmentYear.message}</p>
                  )}
                </div>
              </div>

              {/* Dynamic Members */}
              <div className="border border-[#9EB3D6]/25 bg-[#040F24]/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-heading text-sm font-semibold text-[#F4F6FB]">
                      Additional Members ({fields.length}/{maxExtraMembers}) — 3 to 4 Total Compulsory
                    </p>
                    <p className="text-xs text-[#A3F06D]">
                      Compulsory: 1 Leader + 2 or 3 additional members (3–4 members total).
                    </p>
                  </div>
                  {fields.length < maxExtraMembers && (
                    <button
                      type="button"
                      onClick={() => append({ name: "", email: "" })}
                      className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#9EB3D6]/35 bg-[#091D42] px-3.5 font-mono text-xs font-semibold text-[#F4F6FB] hover:bg-[#0C2657]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Member</span>
                    </button>
                  )}
                </div>

                {fields.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="space-y-2 border border-[#9EB3D6]/20 bg-[#06142E] p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-[#9EB3D6]">
                            MEMBER #{index + 2}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            aria-label={`Remove member ${index + 2}`}
                            className="inline-flex h-9 w-9 items-center justify-center text-[#FF3B5C] hover:bg-[#FF3B5C]/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Member full name"
                          {...register(`members.${index}.name`)}
                          className="min-h-[44px] w-full border border-[#9EB3D6]/25 bg-[#040F24] px-3 text-base text-[#F4F6FB]"
                        />
                        {errors.members?.[index]?.name && (
                          <p className="text-xs text-[#FF3B5C]">
                            {errors.members[index]?.name?.message}
                          </p>
                        )}
                        <input
                          type="email"
                          inputMode="email"
                          placeholder="Member email"
                          {...register(`members.${index}.email`)}
                          className="min-h-[44px] w-full border border-[#9EB3D6]/25 bg-[#040F24] px-3 text-base text-[#F4F6FB]"
                        />
                        {errors.members?.[index]?.email && (
                          <p className="text-xs text-[#FF3B5C]">
                            {errors.members[index]?.email?.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* UPI Payment (shown only if event has a fee) */}
              {activeEvent.feeInr > 0 && (
                <div className="border border-[#9EB3D6]/25 bg-[#040F24]/60 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-mono uppercase text-[#9EB3D6]">UPI PAYMENT</span>
                    <span className="font-mono font-bold text-[#A3F06D]">
                      {activeEvent.feeDisplay}
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs text-[#F4F6FB]">
                    Pay to: <strong>{ORGANISER_INFO.upiId}</strong> ({ORGANISER_INFO.upiPayeeName})
                  </p>

                  <label
                    htmlFor="reg-txn"
                    className="mb-1.5 mt-3 block font-mono text-xs uppercase tracking-wider text-[#9EB3D6]"
                  >
                    UPI Transaction / UTR ID
                  </label>
                  <input
                    id="reg-txn"
                    type="text"
                    placeholder="e.g. 431290812345"
                    {...register("txnId")}
                    className="min-h-[48px] w-full border border-[#9EB3D6]/30 bg-[#040F24] px-4 text-base text-[#F4F6FB] placeholder:text-[#9EB3D6]/40"
                  />
                  {errors.txnId && (
                    <p className="mt-1 text-xs text-[#FF3B5C]">{errors.txnId.message}</p>
                  )}
                </div>
              )}

              {/* Consent */}
              <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#9EB3D6]">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-0.5 h-5 w-5 shrink-0 border-[#9EB3D6]/40 bg-[#040F24] accent-[#A3F06D]"
                />
                <span>
                  I confirm all team details are accurate, we agree to the {activeEvent.name} rules,
                  and consent to event communication from {ORGANISER_INFO.clubName}.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-[#FF3B5C]">{errors.consent.message}</p>
              )}

              {siteKey && <div id="turnstile-widget" className="min-h-[65px]" />}

              <div aria-live="polite">
                {serverError && (
                  <div
                    role="alert"
                    className={`flex items-start gap-2.5 border p-3.5 text-xs leading-relaxed ${
                      isWaitlist
                        ? "border-[#FF8A1F]/50 bg-[#FF8A1F]/15 text-[#FF8A1F]"
                        : "border-[#FF3B5C]/50 bg-[#FF3B5C]/15 text-[#FF3B5C]"
                    }`}
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#A3F06D] font-mono text-sm font-bold uppercase tracking-[0.16em] text-[#040F24] shadow-[4px_4px_0_#030B1A] transition-transform hover:brightness-105 active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Complete Registration ({activeEvent.feeDisplay})</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
