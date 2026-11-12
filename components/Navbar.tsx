"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { label: "EVENTS", href: "#events" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "ABOUT", href: "#about" },
  { label: "PRIZES", href: "#prizes" },
  { label: "FAQ", href: "#rules-faq" },
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
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
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
        className={`fixed inset-x-0 top-0 z-50 border-b border-[#9EB3D6]/15 bg-[#040F24]/90 backdrop-blur-md transition-transform duration-300 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
        >
          <a
            href="#home"
            className="flex min-h-[44px] items-center gap-2 font-pixel text-base font-bold tracking-wider text-[#A3F06D] drop-shadow-[0_2px_0_#0A1B3D] sm:text-lg"
          >
            <span>{ORGANISER_INFO.logoText}</span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center font-mono text-xs tracking-[0.18em] text-[#9EB3D6] transition-colors hover:text-[#A3F06D]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              ref={magneticRef}
              href="#register"
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagnetic}
              className="hidden min-h-[40px] items-center justify-center border border-[#A3F06D]/40 bg-[#A3F06D] px-4 font-mono text-xs font-bold uppercase tracking-wider text-[#040F24] transition-transform duration-200 hover:brightness-110 md:inline-flex"
            >
              REGISTER
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center border border-[#9EB3D6]/25 bg-[#091D42] text-[#F4F6FB] md:hidden"
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
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#040F24]/98 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, idx) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[52px] items-center justify-between border border-[#9EB3D6]/20 bg-[#091D42]/60 px-5 font-pixel text-lg text-[#F4F6FB] active:bg-[#091D42]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#A3F06D]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#register"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-[52px] w-full items-center justify-center bg-[#A3F06D] font-mono text-sm font-bold uppercase tracking-wider text-[#040F24]"
          >
            REGISTER YOUR TEAM →
          </a>
        </div>
      )}
    </>
  );
}
