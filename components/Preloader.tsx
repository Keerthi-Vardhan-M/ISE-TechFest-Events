"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const STORAGE_KEY = "symposium_boot_seen_v1";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      return;
    }

    setVisible(true);
    const start = performance.now();
    const duration = 950; // <= 1.2s max

    let rafId = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore storage errors
        }
        setFading(true);
        setTimeout(() => setVisible(false), 260);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07080B] transition-opacity duration-300 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-64 max-w-[80vw] space-y-3 font-mono text-xs text-[#EDEFF5]">
        <div className="flex items-center justify-between text-[#8A90A2]">
          <span>SYS.BOOT // EVENTS_26</span>
          <span className="text-[#22E5FF]">{progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#22E5FF] to-[#19F58A] transition-transform duration-75"
            style={{ transform: `translateX(${progress - 100}%)` }}
          />
        </div>
        <p className="text-[11px] text-[#8A90A2]">
          {progress < 45
            ? "> mounting robotics_pipeline..."
            : progress < 85
              ? "> syncing quant_orderbook..."
              : "> ready [OK]"}
        </p>
      </div>
    </div>
  );
}

