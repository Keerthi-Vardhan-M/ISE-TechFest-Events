"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type CursorVariant = "default" | "automate" | "quant";

interface MicroBubble {
  id: number;
  tx: number;
  ty: number;
  size: number;
  delay: number;
}

interface BubbleBurst {
  id: number;
  x: number;
  y: number;
  microBubbles: MicroBubble[];
}

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [bursts, setBursts] = useState<BubbleBurst[]>([]);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const isTouch = isTouchDevice();
    if (!isTouch) setEnabled(true);

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
        setVariant((prev) => (prev !== scoped ? scoped : prev));
      } else {
        setVariant((prev) => (prev !== "default" ? "default" : prev));
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

    // Click handler: blast a small glowing blue bubble with micro-bubbles
    const onPointerDown = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const burstId = Date.now() + Math.random();

      // Generate 7-8 small blue micro-bubbles blasting radially outwards
      const count = 7;
      const microBubbles: MicroBubble[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (i * (360 / count) + (Math.random() * 20 - 10)) * (Math.PI / 180);
        const distance = 22 + Math.random() * 26; // 22px - 48px radius
        microBubbles.push({
          id: i,
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
          size: 4 + Math.random() * 4.5,
          delay: Math.random() * 0.04,
        });
      }

      const newBurst: BubbleBurst = {
        id: burstId,
        x,
        y,
        microBubbles,
      };

      setBursts((prev) => [...prev.slice(-6), newBurst]);

      // Quick ring click contraction animation
      if (ringRef.current) {
        ringRef.current.classList.add("scale-75");
        setTimeout(() => {
          ringRef.current?.classList.remove("scale-75");
        }, 140);
      }

      // Automatically clean up after animation ends
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 600);
    };

    if (!isTouch) {
      window.addEventListener("mousemove", onMove, { passive: true });
      rafId = requestAnimationFrame(loop);
    }
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      if (!isTouch) {
        window.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <>
      {/* Click Blue Bubble Blast Particles */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="pointer-events-none fixed z-[100]"
          style={{ left: b.x, top: b.y }}
          aria-hidden="true"
        >
          {/* Main expanding blue bubble with shiny glass reflection */}
          <div
            className="animate-blue-bubble absolute h-8 w-8 rounded-full border-2 border-[#22E5FF] shadow-[0_0_18px_rgba(34,229,255,0.9),inset_0_0_10px_rgba(34,229,255,0.6)]"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.75) 0%, rgba(34,229,255,0.45) 35%, rgba(0,102,255,0.2) 75%, transparent 100%)",
            }}
          />

          {/* Secondary inner pop ring */}
          <div
            className="animate-blue-bubble absolute h-5 w-5 rounded-full border border-white/80"
            style={{
              animationDelay: "0.04s",
              background: "rgba(34, 229, 255, 0.2)",
            }}
          />

          {/* Micro-bubbles bursting outward */}
          {b.microBubbles.map((mb) => (
            <div
              key={mb.id}
              className="animate-micro-bubble absolute rounded-full shadow-[0_0_6px_#22E5FF]"
              style={
                {
                  "--bubble-tx": `${mb.tx}px`,
                  "--bubble-ty": `${mb.ty}px`,
                  width: `${mb.size}px`,
                  height: `${mb.size}px`,
                  left: `-${mb.size / 2}px`,
                  top: `-${mb.size / 2}px`,
                  animationDelay: `${mb.delay}s`,
                  background:
                    "radial-gradient(circle at 30% 30%, #ffffff 0%, #22E5FF 45%, #0284c7 100%)",
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}

      {/* Custom Desktop Cursor */}
      {enabled && (
        <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block" aria-hidden="true">
          <div
            ref={dotRef}
            className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference transition-opacity"
          />
          <div
            ref={ringRef}
            className={`fixed left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
              variant === "automate"
                ? "border-[#22E5FF] bg-[#22E5FF]/10 shadow-[0_0_12px_rgba(34,229,255,0.4)]"
                : variant === "quant"
                  ? "border-[#19F58A] bg-[#19F58A]/10 shadow-[0_0_12px_rgba(25,245,138,0.4)]"
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
      )}
    </>
  );
}

