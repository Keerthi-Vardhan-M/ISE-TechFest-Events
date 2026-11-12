import { z } from "zod";
import { EVENTS, type EventId } from "@/content/events";

export const memberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Member name must be at least 2 characters")
    .max(80, "Member name is too long"),
  email: z
    .string()
    .trim()
    .email("Enter a valid member email")
    .max(120, "Email is too long"),
});

export const registrationSchema = z
  .object({
    event: z.enum(["automate", "quant"], {
      errorMap: () => ({ message: "Please select an event" }),
    }),
    teamName: z
      .string()
      .trim()
      .min(2, "Team name must be at least 2 characters")
      .max(60, "Team name must be under 60 characters")
      .regex(/^[a-zA-Z0-9 _-]+$/, "Use letters, numbers, spaces, - or _ only"),
    leaderName: z
      .string()
      .trim()
      .min(2, "Leader name must be at least 2 characters")
      .max(80, "Leader name is too long"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email address")
      .max(120, "Email is too long"),
    phone: z
      .string()
      .trim()
      .regex(/^[+]?[0-9\s-]{10,15}$/, "Enter a valid 10–15 digit phone number"),
    college: z
      .string()
      .trim()
      .min(2, "College name is required")
      .max(120, "College name is too long"),
    departmentYear: z
      .string()
      .trim()
      .min(2, "Department & year is required (e.g. CSE 3rd Year)")
      .max(80, "Department & year is too long"),
    members: z
      .array(memberSchema)
      .min(2, "Team size must be 3–4 members (add at least 2 additional members)")
      .max(3, "Maximum 4 members allowed per team (leader + 3 members)"),
    txnId: z
      .string()
      .trim()
      .max(50, "Transaction ID is too long")
      .optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must accept the event rules & consent" }),
    }),
    turnstileToken: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const config = EVENTS[data.event as EventId];
    const totalSize = 1 + data.members.length;
    if (totalSize < config.teamSize.min || totalSize > config.teamSize.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["members"],
        message: `${config.name} requires ${config.teamSize.label} (including team leader).`,
      });
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;

