"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface RegistrationItem {
  id: string;
  event: string;
  team_name: string;
  leader_name: string;
  email: string;
  phone: string;
  college: string;
  department_year: string;
  members: { name: string; email: string }[];
  txn_id?: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState<{
    total: number;
    automateCount: number;
    quantCount: number;
    registrations: RegistrationItem[];
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEvent, setFilterEvent] = useState<"all" | "automate" | "quant">("all");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_secret");
    if (saved) {
      setSecret(saved);
      fetchData(saved);
    }
  }, []);

  const fetchData = async (passcode: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/admin/export?secret=${encodeURIComponent(passcode)}&format=json`);
      if (res.status === 401) {
        setErrorMsg("Invalid secret key. Please check ADMIN_EXPORT_SECRET in your .env file.");
        setIsUnlocked(false);
        setLoading(false);
        return;
      }
      if (res.status === 503) {
        const body = await res.json();
        setErrorMsg(body.error || "Supabase database is not connected yet.");
        setIsUnlocked(false);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error || `Error ${res.status}: Failed to fetch data`);
        setIsUnlocked(false);
        setLoading(false);
        return;
      }

      const json = await res.json();
      setData(json);
      setIsUnlocked(true);
      sessionStorage.setItem("admin_secret", passcode);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrorMsg("Failed to connect: " + msg);
      setIsUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) return;
    fetchData(secret.trim());
  };

  const filteredRegistrations = (data?.registrations || []).filter((r) => {
    if (filterEvent !== "all" && r.event !== filterEvent) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      r.team_name.toLowerCase().includes(q) ||
      r.leader_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.college.toLowerCase().includes(q)
    );
  });

  return (
    <main className="min-h-screen bg-[#020B1F] text-[#D8E3F5] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#A3F06D] shadow-[0_0_8px_#A3F06D]" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#A3F06D]">
                ORGANIZER CONSOLE
              </p>
            </div>
            <h1 className="mt-1 font-pixel text-2xl font-bold tracking-tight text-white sm:text-3xl">
              REGISTRATION CSV EXPORT
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 self-start font-mono text-xs uppercase tracking-wider text-white/70 hover:text-[#A3F06D] transition-colors"
          >
            ← BACK TO HOMEPAGE
          </Link>
        </div>

        {/* Lock Screen / Passcode input */}
        {!isUnlocked ? (
          <div className="mx-auto mt-12 max-w-md rounded-lg border border-white/15 bg-[#040F24]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
            <h2 className="font-pixel text-lg text-white">Enter Admin Secret</h2>
            <p className="mt-1 text-xs text-[#9EB3D6]">
              Enter the <code className="text-[#A3F06D]">ADMIN_EXPORT_SECRET</code> defined in your .env file to export attendee CSVs.
            </p>

            <form onSubmit={handleUnlock} className="mt-6 space-y-4">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A3F06D]">
                  Admin Passcode / Secret Key
                </label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter secret key..."
                  className="mt-1.5 w-full rounded border border-white/20 bg-[#020B1F] px-3.5 py-2.5 font-mono text-sm text-white placeholder-white/30 focus:border-[#A3F06D] focus:outline-none"
                  autoFocus
                />
              </div>

              {errorMsg && (
                <div className="rounded border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-200">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded bg-[#A3F06D] py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#020B1F] transition hover:bg-[#B8F588] disabled:opacity-50"
              >
                {loading ? "AUTHENTICATING..." : "UNLOCK & VIEW REGISTRATIONS"}
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="mt-8 space-y-8">
            {/* Stats & Quick CSV Download Bar */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded border border-white/15 bg-[#040F24] p-5 shadow">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#9EB3D6]">Total Registered Teams</span>
                <p className="mt-2 font-pixel text-3xl font-bold text-[#A3F06D]">{data?.total ?? 0}</p>
                <div className="mt-4">
                  <a
                    href={`/api/admin/export?secret=${encodeURIComponent(secret)}`}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#A3F06D] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#020B1F] hover:bg-[#B8F588] transition"
                  >
                    📥 Download All CSV
                  </a>
                </div>
              </div>

              <div className="rounded border border-white/15 bg-[#040F24] p-5 shadow">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#22E5FF]">Automate (Hardware)</span>
                <p className="mt-2 font-pixel text-3xl font-bold text-[#22E5FF]">{data?.automateCount ?? 0}</p>
                <div className="mt-4">
                  <a
                    href={`/api/admin/export?secret=${encodeURIComponent(secret)}&event=automate`}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded border border-[#22E5FF]/40 bg-[#0B214A] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#22E5FF] hover:bg-[#11316E] transition"
                  >
                    📥 Download Automate CSV
                  </a>
                </div>
              </div>

              <div className="rounded border border-white/15 bg-[#040F24] p-5 shadow">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#19F58A]">Quant (Finance)</span>
                <p className="mt-2 font-pixel text-3xl font-bold text-[#19F58A]">{data?.quantCount ?? 0}</p>
                <div className="mt-4">
                  <a
                    href={`/api/admin/export?secret=${encodeURIComponent(secret)}&event=quant`}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded border border-[#19F58A]/40 bg-[#0B214A] px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#19F58A] hover:bg-[#11316E] transition"
                  >
                    📥 Download Quant CSV
                  </a>
                </div>
              </div>
            </div>

            {/* Direct CSV URL Helper */}
            <div className="rounded border border-white/10 bg-[#040F24]/50 p-4 font-mono text-xs text-[#9EB3D6]">
              <p className="font-bold text-white">Direct URL for Organizers:</p>
              <p className="mt-1 break-all text-[#A3F06D]">
                {typeof window !== "undefined" ? window.location.origin : ""}/api/admin/export?secret={secret}
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                {(["all", "automate", "quant"] as const).map((ev) => (
                  <button
                    key={ev}
                    onClick={() => setFilterEvent(ev)}
                    className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                      filterEvent === ev
                        ? "bg-[#A3F06D] font-bold text-[#020B1F]"
                        : "border border-white/15 bg-[#040F24] text-white/70 hover:text-white"
                    }`}
                  >
                    {ev}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search team, leader, email, college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded border border-white/15 bg-[#040F24] px-3 py-1.5 font-mono text-xs text-white placeholder-white/30 focus:border-[#A3F06D] focus:outline-none"
                />
              </div>
            </div>

            {/* Registrations Table */}
            <div className="overflow-x-auto rounded border border-white/15 bg-[#040F24]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="border-b border-white/10 bg-[#061533] text-[10px] uppercase tracking-wider text-[#9EB3D6]">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Track</th>
                    <th className="px-4 py-3">Team Name</th>
                    <th className="px-4 py-3">Leader</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">College</th>
                    <th className="px-4 py-3">Members</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/90">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-white/50">
                        {data?.registrations.length === 0
                          ? "No registrations received yet. Once teams register on the site, they will appear here."
                          : "No teams match your search filter."}
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((r, i) => (
                      <tr key={r.id} className="hover:bg-white/[0.03]">
                        <td className="px-4 py-3 text-white/40">{i + 1}</td>
                        <td className="px-4 py-3 font-bold">
                          <span
                            className={
                              r.event === "automate" ? "text-[#22E5FF]" : "text-[#19F58A]"
                            }
                          >
                            {r.event.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-white">{r.team_name}</td>
                        <td className="px-4 py-3">{r.leader_name}</td>
                        <td className="px-4 py-3 text-white/70">
                          <div>{r.email}</div>
                          <div className="text-[10px] text-white/40">{r.phone}</div>
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          <div>{r.college}</div>
                          <div className="text-[10px] text-white/40">{r.department_year}</div>
                        </td>
                        <td className="px-4 py-3 text-white/70">
                          {Array.isArray(r.members) && r.members.length > 0
                            ? `${r.members.length} extra (${r.members.map((m) => m.name).join(", ")})`
                            : "Solo"}
                        </td>
                        <td className="px-4 py-3 text-white/40 text-[10px]">
                          {new Date(r.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  sessionStorage.removeItem("admin_secret");
                  setIsUnlocked(false);
                  setSecret("");
                  setData(null);
                }}
                className="font-mono text-xs text-white/40 hover:text-red-400 transition"
              >
                Log Out of Console
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
