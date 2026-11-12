"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type CursorVariant = "default" | "automate" | "quant";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    setEnabled(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const scoped = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (scoped === "automate" || scoped === "quant") {
        setVariant(scoped);
      } else {
        setVariant("default");
      }
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference transition-opacity"
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-200 ${
          variant === "automate"
            ? "border-[#22E5FF] bg-[#22E5FF]/10"
            : variant === "quant"
              ? "border-[#19F58A] bg-[#19F58A]/10"
              : "border-white/30"
        }`}
      >
        {variant === "automate" && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#22E5FF] animate-spin-slow"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
          </svg>
        )}
        {variant === "quant" && (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-[#19F58A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="7" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        )}
      </div>
    </div>
  );
}

