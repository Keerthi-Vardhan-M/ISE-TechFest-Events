import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function escapeCsvCell(value: unknown): string {
  const str = String(value ?? "");
  // Prevent CSV formula injection in Excel/Sheets
  const safe = /^[=+\-@\t\r]/.test(str) ? `'${str}` : str;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: NextRequest) {
  const adminSecret = process.env.ADMIN_EXPORT_SECRET;
  if (!adminSecret) {
    return NextResponse.json({ error: "Admin export is not configured." }, { status: 503 });
  }

  const headerSecret = req.headers.get("x-admin-secret");
  const authHeader = req.headers.get("authorization");
  const bearerSecret = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (headerSecret !== adminSecret && bearerSecret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const eventFilter = req.nextUrl.searchParams.get("event");
  let query = supabase
    .from("registrations")
    .select("id,event,team_name,leader_name,email,phone,college,department_year,members,txn_id,status,created_at")
    .order("created_at", { ascending: true });

  if (eventFilter === "automate" || eventFilter === "quant") {
    query = query.eq("event", eventFilter);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }

  const headers = [
    "Reference ID",
    "Event",
    "Team Name",
    "Leader Name",
    "Email",
    "Phone",
    "College",
    "Department & Year",
    "Members JSON",
    "UPI Txn ID",
    "Status",
    "Created At",
  ];

  const rows = (data ?? []).map((r) =>
    [
      r.id,
      r.event,
      r.team_name,
      r.leader_name,
      r.email,
      r.phone,
      r.college,
      r.department_year,
      JSON.stringify(r.members ?? []),
      r.txn_id ?? "",
      r.status,
      r.created_at,
    ]
      .map(escapeCsvCell)
      .join(",")
  );

  const csv = [headers.map(escapeCsvCell).join(","), ...rows].join("\r\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

