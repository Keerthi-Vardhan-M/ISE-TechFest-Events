"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ORGANISER_INFO } from "@/content/events";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { id: "home", label: "HOME", href: "#home" },
  { id: "about", label: "ABOUT", href: "#about" },
  { id: "events", label: "EVENTS", href: "#events" },
  { id: "schedule", label: "ROUNDS", href: "#schedule" },
  { id: "prizes", label: "PRIZES", href: "#prizes" },
  { id: "rules-faq", label: "FAQ", href: "#rules-faq" },
  { id: "contact", label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastY = useRef(0);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);

      if (y > 110 && y > lastY.current + 6) {
        setHidden(true);
      } else if (y < lastY.current - 6 || y < 110) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const link of NAV_LINKS) {
      const el = document.getElementById(link.id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setActiveId(link.id);
          }
        },
        { rootMargin: "-38% 0px -48% 0px", threshold: 0.01 }
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(targetId);
    if (!el) return;

    const lenis = (window as Window & { __lenis?: { scrollTo: (t: HTMLElement, opts?: object) => void } }).__lenis;
    if (lenis && !prefersReducedMotion()) {
      lenis.scrollTo(el, { offset: -16, duration: 1.05 });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-b border-white/10 bg-[#040F24]/90 backdrop-blur-xl shadow-lg"
            : "bg-gradient-to-b from-[#040F24]/70 to-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        {/* Top scroll progress strip */}
        <div className="h-[2px] w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#22E5FF] via-[#A3F06D] to-[#1648A8] transition-[width] duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
        >
          <a
            href="#home"
            onClick={(e) => scrollToTarget(e, "home")}
            className="group flex min-h-[44px] items-center gap-2.5 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#22E5FF]/40 bg-[#06142E]/85 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true">
                <circle cx="16" cy="16" r="11" fill="none" stroke="#22E5FF" strokeWidth="1.6" strokeDasharray="4 2" />
                <path d="M9 20 L14 14 L18 17 L24 10" fill="none" stroke="#A3F06D" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="10" r="2.2" fill="#A3F06D" />
              </svg>
            </span>
            <span className="font-pixel text-sm font-bold tracking-wider text-[#A3F06D] drop-shadow-[0_2px_0_#040F24] sm:text-base">
              {ORGANISER_INFO.logoText}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToTarget(e, link.id)}
                    className={`relative inline-flex min-h-[44px] items-center px-3 font-mono text-xs tracking-[0.16em] transition-colors ${
                      isActive
                        ? "font-bold text-[#A3F06D]"
                        : "text-[#D8E3F5]/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3 bottom-2 h-[2px] origin-left bg-[#A3F06D] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              ref={magneticRef}
              href="#register"
              onClick={(e) => scrollToTarget(e, "register")}
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagnetic}
              className="hidden min-h-[40px] items-center justify-center rounded-lg bg-[#1648A8] px-5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF5E8] shadow-[0_4px_14px_rgba(22,72,168,0.45)] transition-all duration-200 hover:bg-[#1D5BC6] md:inline-flex"
            >
              REGISTER NOW
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-[#040F24]/70 text-white lg:hidden"
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
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#040F24]/98 px-6 pb-10 pt-24 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link, idx) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToTarget(e, link.id)}
                  className="flex min-h-[50px] items-center justify-between border border-white/15 bg-[#091D42]/60 px-5 font-pixel text-base text-[#F4F6FB] active:bg-[#091D42]"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#A3F06D]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#register"
            onClick={(e) => scrollToTarget(e, "register")}
            className="flex min-h-[52px] w-full items-center justify-center rounded-lg bg-[#1648A8] font-mono text-sm font-bold uppercase tracking-wider text-white"
          >
            REGISTER NOW →
          </a>
        </div>
      )}
    </>
  );
}
