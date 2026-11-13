"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StickyRegisterBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9D0B8] bg-[#FAF5E8]/95 px-4 py-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/register"
        className="flex min-h-[48px] w-full items-center justify-center gap-2 border-2 border-[#0A1B3D] bg-[#0A1B3D] font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[3px_3px_0_#1648A8]"
      >
        <span>Register Now</span>
        <ArrowUpRight className="h-4 w-4 text-[#A3F06D]" />
      </Link>
    </div>
  );
}

