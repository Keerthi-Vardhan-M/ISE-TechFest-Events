"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Script from "next/script";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Plus,
  Trash2,
  Trophy,
  Users,
  ShieldCheck,
  Printer,
  FileCheck2,
} from "lucide-react";
import { EVENTS, EVENT_LIST, ORGANISER_INFO, type EventId } from "@/content/events";
import { registrationSchema, type RegistrationInput } from "@/lib/validation";

interface SuccessReceipt {
  referenceId: string;
  eventName: string;
  teamName: string;
  leaderName: string;
  email: string;
  date: string;
  venue: string;
}

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const eventParam = searchParams.get("event") as EventId | null;
  const initialEvent: EventId = eventParam === "quant" ? "quant" : "automate";

  const [serverError, setServerError] = useState<string | null>(null);
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
      event: initialEvent,
      teamName: "",
      leaderName: "",
      email: "",
      phone: "",
      college: "",
      departmentYear: "",
      members: [
        { name: "", email: "" },
        { name: "", email: "" },
      ],
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
  const maxExtraMembers = activeEvent.teamSize.max - 1; // 3 additional members max (total 4)

  useEffect(() => {
    if (eventParam && (eventParam === "automate" || eventParam === "quant")) {
      setValue("event", eventParam);
    }
  }, [eventParam, setValue]);

  useEffect(() => {
    if (!siteKey || !turnstileReady || !window.turnstile) return;
    const container = document.getElementById("turnstile-widget");
    if (!container) return;
    container.innerHTML = "";

    try {
      window.turnstile.render(container, {
        sitekey: siteKey,
        callback: (token: string) => {
          setValue("turnstileToken", token, { shouldValidate: true });
        },
        "expired-callback": () => {
          setValue("turnstileToken", "");
        },
        theme: "light",
      });
    } catch {
      // Fallback in dev/preview
    }
  }, [siteKey, turnstileReady, setValue]);

  const onSubmit = async (values: RegistrationInput) => {
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Registration failed. Please check your details and try again.");
        return;
      }

      setReceipt({
        referenceId: data.referenceId || `AQ26-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        eventName: activeEvent.name,
        teamName: values.teamName,
        leaderName: values.leaderName,
        email: values.email,
        date: activeEvent.dateDisplay,
        venue: activeEvent.venue,
      });

      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen cream-dot-grid text-[#0A1B3D]">
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#D9D0B8] bg-[#FAF5E8]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link
            href="/#events"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#4B5C7D] transition-colors hover:text-[#0A1B3D]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Events</span>
          </Link>

          <div className="flex items-center gap-2 font-pixel text-xs text-[#0A1B3D]">
            <span>AUTO×QUANT &apos;26</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {receipt ? (
          /* ================= SUCCESS CONFIRMATION RECEIPT ================= */
          <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[6px_6px_0_#0A1B3D] sm:p-10">
            <div className="flex items-center gap-3 border-b-2 border-[#0A1B3D] pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#0A1B3D] bg-[#A3F06D] text-[#0A1B3D]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                  OFFICIAL CONFIRMATION
                </span>
                <h1 className="font-pixel text-2xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-3xl">
                  REGISTRATION CONFIRMED
                </h1>
              </div>
            </div>

            <div className="mt-6 rounded-none border border-[#D9D0B8] bg-[#F5EFE0] p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    REFERENCE ID
                  </span>
                  <p className="font-mono text-lg font-bold tracking-wider text-[#0A1B3D]">
                    {receipt.referenceId}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    REGISTERED ARENA
                  </span>
                  <p className="font-heading text-base font-bold text-[#1648A8]">
                    {receipt.eventName}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    TEAM NAME
                  </span>
                  <p className="font-mono text-base font-bold text-[#0A1B3D]">
                    {receipt.teamName}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    TEAM LEADER
                  </span>
                  <p className="font-mono text-base font-medium text-[#0A1B3D]">
                    {receipt.leaderName} ({receipt.email})
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    DATE &amp; TIME
                  </span>
                  <p className="font-mono text-sm font-medium text-[#0A1B3D]">
                    {receipt.date}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                    CAMPUS VENUE
                  </span>
                  <p className="font-mono text-sm font-medium text-[#0A1B3D]">
                    {receipt.venue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-l-4 border-[#1648A8] bg-[#FAF5E8] p-4 text-xs leading-relaxed text-[#4B5C7D]">
              <p className="font-semibold text-[#0A1B3D]">Important Instructions:</p>
              <ul className="mt-1 list-disc pl-4 space-y-1">
                <li>A copy of this registration has been recorded with the organizing committee.</li>
                <li>All team members must carry their valid college student ID card on event day.</li>
                <li>Please report to the registration desk at the venue 30 minutes prior to scheduled start.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[#0A1B3D] bg-[#0A1B3D] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[3px_3px_0_#1648A8] transition-all hover:bg-[#1648A8]"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Save Receipt</span>
              </button>

              <Link
                href="/#events"
                className="inline-flex min-h-[44px] items-center border-2 border-[#0A1B3D] bg-[#FAF5E8] px-6 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D] transition-colors hover:bg-[#F5EFE0]"
              >
                Return to Events
              </Link>
            </div>
          </div>
        ) : (
          /* ================= FULL PAGE REGISTRATION FORM ================= */
          <div className="space-y-8">
            {/* Page Header */}
            <div>
              <div className="inline-flex items-center gap-2 border border-[#C4B79B] bg-[#F5EFE0] px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#1648A8]">
                <span>OFFICIAL PORTAL</span>
                <span>•</span>
                <span className="font-bold text-[#0A1B3D]">FREE ENTRY</span>
              </div>
              <h1 className="mt-3 font-pixel text-3xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-4xl md:text-5xl">
                TEAM REGISTRATION
              </h1>
              <p className="mt-2 text-sm text-[#4B5C7D] sm:text-base">
                Register your team for the Auto×Quant &apos;26 engineering arenas. Open to all undergraduate &amp; postgraduate students.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* SECTION 1: ARENA TRACK SELECTION */}
              <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-7">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                  STEP 01
                </span>
                <h2 className="mt-1 font-pixel text-xl font-bold uppercase text-[#0A1B3D] sm:text-2xl">
                  SELECT YOUR ARENA
                </h2>
                <p className="mt-1 text-xs text-[#4B5C7D]">
                  Choose which track your team is competing in. Each team may participate in one track per day.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {EVENT_LIST.map((ev) => {
                    const isSelected = activeEventId === ev.id;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => setValue("event", ev.id, { shouldValidate: true })}
                        className={`text-left p-5 border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#0A1B3D] bg-[#F5EFE0] shadow-[4px_4px_0_#0A1B3D]"
                            : "border-[#D9D0B8] bg-[#FAF5E8] hover:border-[#0A1B3D]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#1648A8]">
                            {ev.categoryLabel}
                          </span>
                          <span className="font-pixel text-xs font-bold text-[#0A1B3D]">
                            {ev.prizePool}
                          </span>
                        </div>

                        <h3 className="mt-2 font-heading text-base font-bold text-[#0A1B3D] sm:text-lg">
                          {ev.name}
                        </h3>

                        <p className="mt-1.5 text-xs text-[#4B5C7D] line-clamp-2">
                          {ev.tagline}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#D9D0B8] pt-3 font-mono text-[11px] text-[#4B5C7D]">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-[#1648A8]" />
                            {ev.dateDisplay}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-[#1648A8]" />
                            {ev.teamSize.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.event && (
                  <p className="mt-2 font-mono text-xs font-semibold text-[#C82333]">
                    {errors.event.message}
                  </p>
                )}
              </div>

              {/* SECTION 2: TEAM & LEADER DETAILS */}
              <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-7">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                  STEP 02
                </span>
                <h2 className="mt-1 font-pixel text-xl font-bold uppercase text-[#0A1B3D] sm:text-2xl">
                  TEAM &amp; LEADER INFORMATION
                </h2>
                <p className="mt-1 text-xs text-[#4B5C7D]">
                  The team leader will be the primary contact point for schedules, updates, and certificates.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Robotics or Quantum Flow"
                      {...register("teamName")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.teamName && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.teamName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      Team Leader Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      {...register("leaderName")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.leaderName && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.leaderName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      Leader Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@college.edu or name@gmail.com"
                      {...register("email")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      {...register("phone")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.phone && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      College / University *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MSRIT Bengaluru"
                      {...register("college")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.college && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.college.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                      Department &amp; Year of Study *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science & Engineering, 3rd Year"
                      {...register("departmentYear")}
                      className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-3.5 py-2.5 font-mono text-sm text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-2 focus:ring-[#1648A8]"
                    />
                    {errors.departmentYear && (
                      <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                        {errors.departmentYear.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3: ADDITIONAL TEAM MEMBERS */}
              <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-7">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                      STEP 03
                    </span>
                    <h2 className="mt-1 font-pixel text-xl font-bold uppercase text-[#0A1B3D] sm:text-2xl">
                      TEAM MEMBERS (3–4 MEMBERS TOTAL)
                    </h2>
                    <p className="mt-1 text-xs text-[#4B5C7D]">
                      Include 2 or 3 additional team members (total team size: {activeEvent.teamSize.label}).
                    </p>
                  </div>

                  {fields.length < maxExtraMembers && (
                    <button
                      type="button"
                      onClick={() => append({ name: "", email: "" })}
                      className="inline-flex min-h-[38px] items-center gap-1.5 border-2 border-[#0A1B3D] bg-[#FAF5E8] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D] transition-colors hover:bg-[#F5EFE0]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Member</span>
                    </button>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  {fields.map((field, idx) => {
                    const memberNumber = idx + 2;
                    return (
                      <div
                        key={field.id}
                        className="border border-[#D9D0B8] bg-[#F5EFE0] p-4.5"
                      >
                        <div className="flex items-center justify-between border-b border-[#D9D0B8] pb-2.5">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                            Member #{memberNumber}
                          </span>
                          {fields.length > 2 && (
                            <button
                              type="button"
                              onClick={() => remove(idx)}
                              className="inline-flex items-center gap-1 font-mono text-[11px] text-[#C82333] hover:underline"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <div className="mt-3.5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              placeholder={`Member ${memberNumber} name`}
                              {...register(`members.${idx}.name` as const)}
                              className="mt-1 w-full border border-[#0A1B3D] bg-white px-3 py-2 font-mono text-xs text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                            />
                            {errors.members?.[idx]?.name && (
                              <p className="mt-1 font-mono text-[10px] text-[#C82333]">
                                {errors.members[idx]?.name?.message}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-[#4B5C7D]">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              placeholder={`member${memberNumber}@college.edu`}
                              {...register(`members.${idx}.email` as const)}
                              className="mt-1 w-full border border-[#0A1B3D] bg-white px-3 py-2 font-mono text-xs text-[#0A1B3D] placeholder:text-[#9EB3D6] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                            />
                            {errors.members?.[idx]?.email && (
                              <p className="mt-1 font-mono text-[10px] text-[#C82333]">
                                {errors.members[idx]?.email?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {errors.members?.root && (
                  <p className="mt-3 font-mono text-xs font-semibold text-[#C82333]">
                    {errors.members.root.message}
                  </p>
                )}
                {errors.members?.message && (
                  <p className="mt-3 font-mono text-xs font-semibold text-[#C82333]">
                    {errors.members.message}
                  </p>
                )}
              </div>

              {/* SECTION 4: VERIFICATION & CONSENT */}
              <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-7">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                  STEP 04
                </span>
                <h2 className="mt-1 font-pixel text-xl font-bold uppercase text-[#0A1B3D] sm:text-2xl">
                  CONFIRMATION &amp; SUBMISSION
                </h2>

                <div className="mt-5 space-y-4">
                  {/* Turnstile verification widget */}
                  {siteKey && (
                    <div className="rounded border border-[#D9D0B8] bg-white p-3 inline-block">
                      <div id="turnstile-widget" />
                    </div>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1 h-4 w-4 rounded border-2 border-[#0A1B3D] text-[#1648A8] focus:ring-[#1648A8]"
                    />
                    <span className="text-xs leading-relaxed text-[#0A1B3D] select-none">
                      I confirm all team members are active undergraduate or postgraduate students. We agree to abide by the official rules and code of conduct of Auto×Quant &apos;26.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="font-mono text-xs font-semibold text-[#C82333]">
                      {errors.consent.message}
                    </p>
                  )}

                  {serverError && (
                    <div className="flex items-start gap-2.5 border-l-4 border-[#C82333] bg-[#C82333]/10 p-3.5 text-xs text-[#8C161D]">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Submission Button: Solid, bold, NO sparkle/star icons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[48px] w-full items-center justify-center border-2 border-[#0A1B3D] bg-[#0A1B3D] px-8 font-mono text-sm font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[4px_4px_0_#1648A8] transition-all hover:bg-[#1648A8] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>SUBMITTING REGISTRATION...</span>
                        </>
                      ) : (
                        <span>SUBMIT TEAM REGISTRATION</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
