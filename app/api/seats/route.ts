import { NextResponse } from "next/server";
import { EVENTS, type EventId } from "@/content/events";
import { getSupabaseAdmin } from "@/lib/supabase";

export const revalidate = 15;

export async function GET() {
  const fallback = {
    automate: {
      cap: EVENTS.automate.seatCap,
      taken: 0,
      left: EVENTS.automate.seatCap,
    },
    quant: {
      cap: EVENTS.quant.seatCap,
      taken: 0,
      left: EVENTS.quant.seatCap,
    },
    updatedAt: new Date().toISOString(),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(fallback, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
      },
    });
  }

  const { data, error } = await supabase.rpc("get_event_seat_counts");
  if (error || !Array.isArray(data)) {
    return NextResponse.json(fallback, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
      },
    });
  }

  const counts: Record<EventId, number> = { automate: 0, quant: 0 };
  for (const row of data as Array<{ event: string; seats_taken: number }>) {
    if (row.event === "automate" || row.event === "quant") {
      counts[row.event] = Number(row.seats_taken) || 0;
    }
  }

  return NextResponse.json(
    {
      automate: {
        cap: EVENTS.automate.seatCap,
        taken: counts.automate,
        left: Math.max(0, EVENTS.automate.seatCap - counts.automate),
      },
      quant: {
        cap: EVENTS.quant.seatCap,
        taken: counts.quant,
        left: Math.max(0, EVENTS.quant.seatCap - counts.quant),
      },
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
      },
    }
  );
}
