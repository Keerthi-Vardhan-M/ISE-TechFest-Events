import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function escapeCsvCell(value: unknown): string {
  const str = String(value ?? "");
  // Prevent CSV formula injection in Excel/Sheets
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

interface MemberObj {
  name?: string;
  email?: string;
  phone?: string;
}

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_EXPORT_SECRET;
  if (!adminSecret) {
    return NextResponse.json({ error: "Admin export is not configured." }, { status: 503 });
  }

  const querySecret = req.nextUrl.searchParams.get("secret") || req.nextUrl.searchParams.get("key");
  const headerSecret = req.headers.get("x-admin-secret");
  const authHeader = req.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (querySecret !== adminSecret && headerSecret !== adminSecret && bearerSecret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized. Provide valid admin secret." }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not connected. Configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 503 }
    );
  }

  const eventFilter = req.nextUrl.searchParams.get("event");
  const format = req.nextUrl.searchParams.get("format");

  let query = supabase
    .from("registrations")
    .select("id,event,team_name,leader_name,email,phone,college,department_year,members,txn_id,status,created_at")
    .order("created_at", { ascending: false });

  if (eventFilter === "automate" || eventFilter === "quant") {
    query = query.eq("event", eventFilter);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[admin export error]", error.message);
    return NextResponse.json({ error: "Failed to fetch registrations from Supabase: " + error.message }, { status: 500 });
  }

  const records = data ?? [];

  // Return JSON if requested for admin dashboard UI
  if (format === "json") {
    return NextResponse.json({
      total: records.length,
      automateCount: records.filter((r) => r.event === "automate").length,
      quantCount: records.filter((r) => r.event === "quant").length,
      registrations: records,
    });
  }

  const headers = [
    "Sl No",
    "Registration ID",
    "Event Track",
    "Team Name",
    "Leader Name",
    "Leader Email",
    "Leader Phone",
    "College Name",
    "Department & Year",
    "Additional Members",
    "Total Team Size",
    "UPI / Transaction ID",
    "Status",
    "Registered At (IST)",
  ];

  const rows = records.map((r, idx) => {
    const rawMembers: MemberObj[] = Array.isArray(r.members) ? r.members : [];
    const membersText = rawMembers
      .map((m, mIdx) => `${mIdx + 2}. ${m.name || "N/A"} (${m.email || "No email"}${m.phone ? ", " + m.phone : ""})`)
      .join(" | ");

    const formattedDate = r.created_at
      ? new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      : "";

    return [
      idx + 1,
      r.id,
      r.event === "automate" ? "AUTOMATE (Hardware/Robotics)" : "QUANT (Trading & Finance)",
      r.team_name,
      r.leader_name,
      r.email,
      r.phone,
      r.college,
      r.department_year,
      membersText || "None (Solo/Leader only)",
      1 + rawMembers.length,
      r.txn_id || "FREE",
      r.status,
      formattedDate,
    ]
      .map(escapeCsvCell)
      .join(",");
  });

  const csv = [headers.map(escapeCsvCell).join(","), ...rows].join("\r\n");
  const fileName = `registrations-${eventFilter || "all"}-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
