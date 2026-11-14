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
  Sparkles,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Cpu,
  TrendingUp,
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

  const onSubmit = async (data: RegistrationInput) => {
    setServerError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || (result.status !== "OK" && !result.success)) {
        setServerError(
          result.message || result.error || "Registration failed. Please verify your details and try again."
        );
        return;
      }

      // Trigger celebratory confetti on registration success
      import("canvas-confetti")
        .then((confetti) => {
          confetti.default({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
            colors: ["#A3F06D", "#22E5FF", "#1648A8", "#FAF5E8"],
          });
        })
        .catch(() => {});

      setReceipt({
        referenceId: result.referenceId || `AQ-${Date.now().toString(36).toUpperCase()}`,
        eventName: result.eventName || activeEvent.name,
        teamName: data.teamName,
        leaderName: data.leaderName,
        email: data.email,
        date: activeEvent.dateDisplay,
        venue: activeEvent.venue,
      });

      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError("Network error. Please check your internet connection and try again.");
    }
  };

  return (
    <div className="min-h-screen cream-dot-grid bg-[#FAF5E8] text-[#0A1B3D]">
      {/* Hero Banner with Theme Floating Islands Backdrop */}
      <div className="relative overflow-hidden bg-[#0a2558] px-4 pt-10 pb-20 text-white sm:px-6 sm:pt-14 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt="Floating voxel arena banner"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
        </div>

        {/* Smooth sky-to-cream gradient fade strictly matching reference screenshot */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44 md:h-52"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(135, 180, 230, 0.25) 30%, rgba(195, 218, 240, 0.65) 60%, rgba(240, 238, 225, 0.95) 88%, #FAF5E8 100%)",
          }}
        />

        {/* Top Floating Back Link */}
        <div className="relative z-20 mx-auto max-w-5xl mb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:text-[#A3F06D]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1 text-[#A3F06D]" />
            <span>HOMEPAGE</span>
          </Link>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="font-pixel text-3xl font-extrabold uppercase tracking-wide text-[#FAF5E8] sm:text-5xl md:text-6xl"
            style={{
              textShadow: "0 4px 0 #040F24, 0 8px 24px rgba(0,0,0,0.9), 0 0 30px rgba(163,240,109,0.25)",
            }}
          >
            TEAM REGISTRATION
          </h1>

          <p
            className="mx-auto mt-3 max-w-2xl font-mono text-xs text-[#D8E3F5] sm:text-sm"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            Register your engineering squad for the flagship Robotics Automation &amp; QuantFinance tournaments. Open to all college students.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {receipt ? (
          /* ================= SUCCESS CONFIRMATION RECEIPT ================= */
          <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[6px_6px_0_#0A1B3D] sm:p-10">
            <div className="flex items-center gap-3 border-b-2 border-[#0A1B3D] pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#0A1B3D] bg-[#A3F06D] text-[#0A1B3D] shadow-[3px_3px_0_#0A1B3D]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                  OFFICIAL ARENA PASS
                </span>
                <h2 className="font-pixel text-2xl font-bold uppercase tracking-tight text-[#0A1B3D] sm:text-3xl">
                  REGISTRATION CONFIRMED
                </h2>
              </div>
            </div>

            <div className="mt-6 border-2 border-[#0A1B3D] bg-[#F5EFE0] p-6 shadow-[3px_3px_0_rgba(10,27,61,0.15)]">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1648A8]">
                    REFERENCE ID
                  </span>
                  <p className="font-mono text-xl font-black tracking-widest text-[#0A1B3D]">
                    {receipt.referenceId}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#1648A8]">
                    REGISTERED ARENA
                  </span>
                  <p className="font-heading text-lg font-bold text-[#1648A8]">
                    {receipt.eventName}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5C7D]">
                    TEAM NAME
                  </span>
                  <p className="font-mono text-base font-bold text-[#0A1B3D]">
                    {receipt.teamName}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5C7D]">
                    TEAM LEADER
                  </span>
                  <p className="font-mono text-base font-medium text-[#0A1B3D]">
                    {receipt.leaderName} ({receipt.email})
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5C7D]">
                    DATE &amp; TIME
                  </span>
                  <p className="font-mono text-sm font-medium text-[#0A1B3D]">
                    {receipt.date}
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#4B5C7D]">
                    CAMPUS VENUE
                  </span>
                  <p className="font-mono text-sm font-medium text-[#0A1B3D]">
                    {receipt.venue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-l-4 border-[#1648A8] bg-[#F5EFE0] p-4 text-xs leading-relaxed text-[#4B5C7D]">
              <p className="font-bold text-[#0A1B3D]">Official Instructions for Event Day:</p>
              <ul className="mt-1 list-disc pl-4 space-y-1">
                <li>A copy of this registration has been registered with the organizing committee.</li>
                <li>All team members must carry their valid college student ID card on event day.</li>
                <li>Please report to the registration desk at the venue 30 minutes prior to scheduled start.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex min-h-[46px] items-center gap-2 border-2 border-[#0A1B3D] bg-[#1648A8] px-7 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_#0A1B3D] transition-all hover:bg-[#1D5BC6]"
              >
                <Printer className="h-4 w-4" />
                <span>Print / Save Receipt</span>
              </button>

              <Link
                href="/#events"
                className="inline-flex min-h-[46px] items-center border-2 border-[#0A1B3D] bg-[#FAF5E8] px-7 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D] shadow-[3px_3px_0_rgba(10,27,61,0.12)] transition-colors hover:bg-[#F5EFE0]"
              >
                Return to Events
              </Link>
            </div>
          </div>
        ) : (
          /* ================= FULL PAGE REGISTRATION FORM ================= */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* STEP 01: ARENA TRACK SELECTION */}
            <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-8">
              <div className="flex items-center justify-between border-b-2 border-[#0A1B3D] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1648A8] font-mono text-xs font-bold text-white">
                    1
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                    STEP 01 // ARENA TRACK
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-[#1648A8]">COMPULSORY</span>
              </div>

              <h2 className="mt-4 font-pixel text-2xl font-bold uppercase text-[#0A1B3D]">
                CHOOSE YOUR COMPETITION TRACK
              </h2>
              <p className="mt-1 text-xs text-[#4B5C7D]">
                Select the tournament arena your squad is entering.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {EVENT_LIST.map((ev) => {
                  const isSelected = activeEventId === ev.id;
                  const isAutomate = ev.id === "automate";

                  return (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => setValue("event", ev.id, { shouldValidate: true })}
                      className={`relative flex flex-col justify-between p-6 border-2 transition-all cursor-pointer text-left ${
                        isSelected
                          ? "border-[#1648A8] bg-[#F5EFE0] shadow-[5px_5px_0_#1648A8] ring-2 ring-[#1648A8]/20"
                          : "border-[#D9D0B8] bg-[#FAF5E8] hover:border-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)]"
                      }`}
                    >
                      {/* Top Header with 3D Mascot thumbnail and selection check */}
                      <div className="flex items-start justify-between">
                        <div className="relative h-16 w-16 overflow-hidden rounded border border-[#D9D0B8] bg-[#FAF5E8] p-1 shadow-sm">
                          <Image
                            src={isAutomate ? "/images/event-automate.png" : "/images/event-quant.png"}
                            alt={ev.name}
                            fill
                            sizes="64px"
                            unoptimized
                            className="object-contain"
                          />
                        </div>

                        <div className="flex flex-col items-end gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              isSelected
                                ? "bg-[#1648A8] text-white"
                                : "bg-[#0A1B3D]/10 text-[#0A1B3D]"
                            }`}
                          >
                            {isSelected ? "SELECTED ARENA ✓" : "CLICK TO SELECT"}
                          </span>
                          <span className="font-pixel text-xs font-bold text-[#1648A8]">
                            {ev.prizePool} PRIZES
                          </span>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="mt-4">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#1648A8]">
                          {isAutomate ? <Cpu className="h-3.5 w-3.5" /> : <TrendingUp className="h-3.5 w-3.5" />}
                          <span className="font-mono">{ev.categoryLabel}</span>
                        </div>

                        <h3 className="mt-1 font-heading text-lg font-bold text-[#0A1B3D]">
                          {ev.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#4B5C7D] line-clamp-2">
                          {ev.tagline}
                        </p>
                      </div>

                      {/* Footer specs */}
                      <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#D9D0B8] pt-3 font-mono text-[11px] text-[#4B5C7D]">
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

            {/* STEP 02: TEAM & LEADER DETAILS */}
            <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-8">
              <div className="flex items-center justify-between border-b-2 border-[#0A1B3D] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1648A8] font-mono text-xs font-bold text-white">
                    2
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                    STEP 02 // SQUAD LEADER CREDENTIALS
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#4B5C7D]">PRIMARY CONTACT</span>
              </div>

              <h2 className="mt-4 font-pixel text-2xl font-bold uppercase text-[#0A1B3D]">
                LEADER &amp; TEAM INFORMATION
              </h2>
              <p className="mt-1 text-xs text-[#4B5C7D]">
                The team leader receives the official confirmation, tournament slot timings, and certificates.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>Team / Squad Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CyberApex or AlphaForge"
                    {...register("teamName")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.teamName && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.teamName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <User className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>Team Leader Full Name *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Leader name as on Student ID"
                    {...register("leaderName")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.leaderName && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.leaderName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <Mail className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>Leader Email Address *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="leader@college.edu or gmail"
                    {...register("email")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.email && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <Phone className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>WhatsApp / Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    {...register("phone")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.phone && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <Building className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>College / Institution *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MSRIT Bengaluru"
                    {...register("college")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.college && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.college.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D]">
                    <GraduationCap className="h-3.5 w-3.5 text-[#1648A8]" />
                    <span>Branch / Department &amp; Year *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mechanical / CSE, 3rd Year"
                    {...register("departmentYear")}
                    className="mt-1.5 w-full border-2 border-[#0A1B3D] bg-white px-4 py-2.5 font-mono text-sm text-[#0A1B3D] shadow-[2px_2px_0_rgba(10,27,61,0.08)] placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                  />
                  {errors.departmentYear && (
                    <p className="mt-1 font-mono text-xs font-semibold text-[#C82333]">
                      {errors.departmentYear.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 03: ADDITIONAL TEAM MEMBERS */}
            <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-8">
              <div className="flex flex-col justify-between gap-3 border-b-2 border-[#0A1B3D] pb-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1648A8] font-mono text-xs font-bold text-white">
                    3
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                    STEP 03 // CO-PILOT TEAM MEMBERS
                  </span>
                </div>

                {fields.length < maxExtraMembers && (
                  <button
                    type="button"
                    onClick={() => append({ name: "", email: "" })}
                    className="inline-flex min-h-[36px] items-center gap-1.5 border-2 border-[#0A1B3D] bg-[#A3F06D] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#0A1B3D] shadow-[2px_2px_0_#0A1B3D] transition-all hover:bg-[#B8F588]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Member (+1)</span>
                  </button>
                )}
              </div>

              <h2 className="mt-4 font-pixel text-2xl font-bold uppercase text-[#0A1B3D]">
                ADDITIONAL TEAM MEMBERS ({activeEvent.teamSize.label})
              </h2>
              <p className="mt-1 text-xs text-[#4B5C7D]">
                Include 2 or 3 additional team members. Every participant receives official certificates.
              </p>

              <div className="mt-6 space-y-4">
                {fields.map((field, idx) => {
                  const memberNumber = idx + 2;
                  return (
                    <div
                      key={field.id}
                      className="border-2 border-[#0A1B3D] bg-[#F5EFE0] p-5 shadow-[3px_3px_0_rgba(10,27,61,0.1)]"
                    >
                      <div className="flex items-center justify-between border-b border-[#0A1B3D]/20 pb-2.5">
                        <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1648A8]">
                          <span className="inline-block h-2 w-2 rounded-full bg-[#1648A8]" />
                          Member #{memberNumber} (Co-Pilot)
                        </span>

                        {fields.length > 2 && (
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#C82333] transition-colors hover:underline"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A1B3D]">
                            Member Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder={`Member ${memberNumber} full name`}
                            {...register(`members.${idx}.name` as const)}
                            className="mt-1 w-full border border-[#0A1B3D] bg-white px-3 py-2 font-mono text-xs text-[#0A1B3D] shadow-sm placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
                          />
                          {errors.members?.[idx]?.name && (
                            <p className="mt-1 font-mono text-[10px] text-[#C82333]">
                              {errors.members[idx]?.name?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0A1B3D]">
                            Member Email Address *
                          </label>
                          <input
                            type="email"
                            placeholder={`member${memberNumber}@college.edu`}
                            {...register(`members.${idx}.email` as const)}
                            className="mt-1 w-full border border-[#0A1B3D] bg-white px-3 py-2 font-mono text-xs text-[#0A1B3D] shadow-sm placeholder:text-[#9EB3D6] focus:border-[#1648A8] focus:outline-none focus:ring-1 focus:ring-[#1648A8]"
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

            {/* STEP 04: VERIFICATION & CONSENT */}
            <div className="border-2 border-[#0A1B3D] bg-[#FAF5E8] p-6 shadow-[5px_5px_0_#0A1B3D] sm:p-8">
              <div className="flex items-center justify-between border-b-2 border-[#0A1B3D] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#1648A8] font-mono text-xs font-bold text-white">
                    4
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1648A8]">
                    STEP 04 // CONFIRMATION &amp; SUBMISSION
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#1648A8]">FINAL STEP</span>
              </div>

              <div className="mt-6 space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 h-4 w-4 rounded-none border-2 border-[#0A1B3D] text-[#1648A8] focus:ring-[#1648A8]"
                  />
                  <span className="text-xs leading-relaxed text-[#0A1B3D] select-none">
                    I confirm that all registered team members are active undergraduate or postgraduate students. We agree to abide by the official tournament rules and code of conduct of Auto×Quant &apos;26.
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

                {/* Themed Submission Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-[50px] w-full items-center justify-center border-2 border-[#0A1B3D] bg-[#A3F06D] px-8 font-mono text-sm font-bold uppercase tracking-wider text-[#040F24] shadow-[4px_4px_0_#0A1B3D] transition-all hover:bg-[#B8F588] hover:shadow-[6px_6px_0_#0A1B3D] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#040F24]" />
                        <span>SUBMITTING REGISTRATION...</span>
                      </>
                    ) : (
                      <span>SUBMIT TEAM REGISTRATION →</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
