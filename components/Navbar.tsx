"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Prizes", href: "#prizes" },
  { label: "FAQ", href: "#rules-faq" },
  { label: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6 || y < 80) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    magneticRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const resetMagnetic = () => {
    if (magneticRef.current) {
      magneticRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav
          aria-label="Primary Navigation"
          className="mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-[#0F1218]/75 px-4 py-2.5 backdrop-blur-xl sm:px-6 mx-4 sm:mx-6 lg:mx-auto"
        >
          <a
            href="#home"
            className="flex min-h-[44px] items-center gap-2.5 font-heading text-sm font-semibold tracking-tight text-[#EDEFF5]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 font-mono text-[10px] text-[#22E5FF]">
              {ORGANISER_INFO.logoText}
            </span>
            <span className="hidden sm:inline">{ORGANISER_INFO.clubName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded-lg px-3 text-sm text-[#8A90A2] transition-colors hover:text-[#EDEFF5]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              ref={magneticRef}
              href="#register"
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagnetic}
              className="hidden min-h-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-[#22E5FF] to-[#19F58A] px-5 text-sm font-semibold text-[#07080B] transition-transform duration-200 hover:brightness-110 md:inline-flex"
            >
              Register
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#EDEFF5] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-screen Overlay Menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#07080B]/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, idx) => (
              <li
                key={link.href}
                style={{
                  animationDelay: `${idx * 45}ms`,
                }}
                className="animate-fade-in"
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[52px] items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] px-5 font-heading text-2xl font-medium text-[#EDEFF5] active:bg-white/10"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#8A90A2]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#22E5FF] to-[#19F58A] font-heading text-base font-bold text-[#07080B]"
          >
            Register Your Team
          </a>
        </div>
      )}
    </>
  );
}

