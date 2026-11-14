import { NextRequest, NextResponse } from "next/server";
import { EVENTS } from "@/content/events";
import { sendRegistrationConfirmationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";
import { getSupabaseAdmin } from "@/lib/supabase";
import { registrationSchema } from "@/lib/validation";

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
    p_members: data.members ?? [],
    p_txn_id: data.txnId ?? null,
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

  // Send branded confirmation ticket email via Resend
  if (result.id) {
    sendRegistrationConfirmationEmail({
      to: data.email,
      leaderName: data.leaderName,
      teamName: data.teamName,
      event: data.event,
      eventName: eventConfig.name,
      referenceId: result.id,
      college: data.college,
      members: data.members ?? [],
    }).catch((emailErr) => {
      console.error("[register email error]", emailErr);
    });
  }

  return NextResponse.json(
    {
      success: true,
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

