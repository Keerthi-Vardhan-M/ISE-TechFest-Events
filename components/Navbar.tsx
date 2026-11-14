"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

const NAV_LINKS = [
  { id: "events", label: "Events", href: "#events" },
  { id: "about", label: "About", href: "#about" },
  { id: "prizes", label: "Prizes", href: "#prizes" },
  { id: "rules-faq", label: "FAQ", href: "#rules-faq" },
];

interface NavbarProps {
  onOpenRegister?: () => void;
}

export default function Navbar({ onOpenRegister }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
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
      lenis.scrollTo(el, {
        offset: -16,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#040F24]/95 backdrop-blur-md shadow-lg"
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
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6"
        >
          {/* Brand Logo strictly styled like reference screenshot */}
          <Link
            href="/"
            className="shrink-0 font-pixel text-lg font-bold tracking-wider text-[#A3F06D] sm:text-2xl"
            style={{
              textShadow: "0 2px 0 #072513",
            }}
          >
            AUTO×QUANT
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden flex-1 items-center justify-center gap-2 md:flex lg:gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToTarget(e, link.id)}
                    className={`relative inline-flex min-h-[44px] items-center px-3.5 font-mono text-sm tracking-[0.16em] uppercase transition-colors ${
                      isActive
                        ? "font-bold text-[#A3F06D]"
                        : "text-[#D8E3F5]/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute inset-x-3.5 bottom-1.5 h-[2px] origin-left bg-[#A3F06D] transition-transform duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action buttons */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Desktop Register Button */}
            <Link
              href="/register"
              className="hidden sm:inline-flex min-h-[38px] items-center justify-center rounded-[3px] bg-[#1648A8] px-5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(22,72,168,0.45)] transition-all duration-200 hover:bg-[#1D5BC6]"
            >
              REGISTER
            </Link>

            {/* Mobile Hamburger strictly matching reference screenshot (square dark blue button with white border) */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/30 bg-[#091D42] text-white transition-colors hover:border-white hover:bg-[#0E2C63] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu strictly matching the reference screenshot */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#040F24] px-5 pb-8 pt-4 text-white md:hidden"
        >
          {/* Background image covering the ENTIRE drawer just like main page */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-sky-bg.jpg"
              alt="Floating island backdrop"
              className="h-full w-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#040F24]/95 via-[#040F24]/85 to-[#040F24]/98" />
          </div>

          <div className="relative z-10">
            {/* Drawer Header: Brand on left, Close button on right matching screenshot */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span
                className="font-pixel text-xl font-bold tracking-wider text-[#A3F06D]"
                style={{
                  textShadow: "0 2px 0 #072513",
                }}
              >
                AUTO×QUANT
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-white/30 bg-[#091D42] text-white hover:bg-[#0E2C63]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Subheading: SELECT YOUR DESTINATION */}
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9EB3D6]">
              SELECT YOUR DESTINATION
            </p>

            {/* Numbered Menu Links with dividers strictly matching reference screenshot */}
            <ul className="mt-4 flex flex-col divide-y divide-white/10">
              {NAV_LINKS.map((link, idx) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToTarget(e, link.id)}
                    className="flex min-h-[52px] items-center gap-4 py-2 font-pixel text-lg text-white transition-colors hover:text-[#A3F06D]"
                  >
                    <span className="font-mono text-xs font-semibold text-[#22E5FF]">
                      0{idx + 1}
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Solid Lime REGISTER button strictly matching screenshot */}
            <div className="mt-6">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[46px] w-full items-center justify-center rounded-[3px] bg-[#A3F06D] font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#040F24] shadow-[0_4px_16px_rgba(163,240,109,0.35)]"
              >
                REGISTER
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
