import { NextRequest, NextResponse } from "next/server";
import { EVENTS } from "@/content/events";
import { checkRateLimit } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { registrationSchema } from "@/lib/validation";

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Allow local development without Turnstile secret; enforce in production when key is set
    return process.env.NODE_ENV !== "production";
  }

  if (!token) return false;

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip && ip !== "unknown") {
      formData.append("remoteip", ip);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        status: "RATE_LIMITED",
        message: `Too many requests. Please try again in ${rate.retryAfterSeconds}s.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { status: "BAD_REQUEST", message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = registrationSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      {
        status: "VALIDATION_ERROR",
        message: "Please check the highlighted form fields.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      {
        status: "CAPTCHA_FAILED",
        message: "Bot verification failed. Please complete the Cloudflare Turnstile check.",
      },
      { status: 403 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        status: "SERVICE_UNAVAILABLE",
        message:
          "Registration backend is not configured yet. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 503 }
    );
  }

  const eventConfig = EVENTS[data.event];

  const { data: rpcResult, error } = await supabase.rpc("register_team_safe", {
    p_event: data.event,
    p_seat_cap: eventConfig.seatCap,
    p_team_name: data.teamName,
    p_leader_name: data.leaderName,
    p_email: data.email,
    p_phone: data.phone,
    p_college: data.college,
    p_department_year: data.departmentYear,
    p_members: data.members,
    p_txn_id: data.txnId,
  });

  if (error) {
    console.error("[register_team_safe error]", error.message);
    return NextResponse.json(
      { status: "SERVER_ERROR", message: "Unable to save registration right now. Please retry." },
      { status: 500 }
    );
  }

  const result = rpcResult as {
    status?: string;
    id?: string;
    seats_taken?: number;
    seat_cap?: number;
  } | null;

  if (!result || result.status === "SERVER_ERROR") {
    return NextResponse.json(
      { status: "SERVER_ERROR", message: "Unexpected database response. Please retry." },
      { status: 500 }
    );
  }

  if (result.status === "FULL") {
    return NextResponse.json(
      {
        status: "FULL",
        message: `${eventConfig.name} has reached its ${eventConfig.seatCap}-team cap. Contact the coordinator to join the waitlist.`,
      },
      { status: 409 }
    );
  }

  if (result.status === "DUPLICATE_EMAIL") {
    return NextResponse.json(
      {
        status: "DUPLICATE_EMAIL",
        message: `This email is already registered for ${eventConfig.name}.`,
      },
      { status: 409 }
    );
  }

  if (result.status === "DUPLICATE_TEAM" || result.status === "DUPLICATE") {
    return NextResponse.json(
      {
        status: "DUPLICATE_TEAM",
        message: `That team name is already taken for ${eventConfig.name}. Please choose another.`,
      },
      { status: 409 }
    );
  }

  const seatsLeft = Math.max(
    0,
    (result.seat_cap ?? eventConfig.seatCap) - (result.seats_taken ?? 0)
  );

  return NextResponse.json(
    {
      status: "OK",
      referenceId: result.id,
      event: data.event,
      eventName: eventConfig.name,
      teamName: data.teamName,
      seatsLeft,
    },
    { status: 201 }
  );
}
