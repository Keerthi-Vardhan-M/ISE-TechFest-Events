"use client";

import { useEffect, useRef } from "react";
import { isLowPowerOrMobile, prefersReducedMotion } from "@/lib/motion";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const lowPower = isLowPowerOrMobile();
    let isVisible = true;
    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      if (lowPower || reduced) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 24;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 18;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const gearCount = lowPower ? 3 : 6;
    const gears = Array.from({ length: gearCount }, (_, i) => ({
      x: (i + 0.5) / gearCount,
      y: 0.2 + ((i * 37) % 60) / 100,
      r: lowPower ? 26 + (i % 3) * 14 : 36 + (i % 4) * 18,
      teeth: 8 + (i % 4) * 2,
      speed: (i % 2 === 0 ? 1 : -1) * (0.003 + i * 0.0008),
      angle: i * 0.7,
    }));

    const candleCount = lowPower ? 10 : 20;
    const candles = Array.from({ length: candleCount }, (_, i) => ({
      x: i / candleCount,
      y: 0.35 + Math.sin(i * 0.7) * 0.18,
      h: 22 + ((i * 19) % 34),
      bull: i % 3 !== 0,
      speed: 0.00025 + (i % 3) * 0.00008,
    }));

    const drawGear = (x: number, y: number, r: number, teeth: number, angle: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.strokeStyle = "rgba(237, 239, 245, 0.08)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = ((i + 0.35) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a4 = ((i + 0.85) / teeth) * Math.PI * 2;
        const outer = r + 6;
        if (i === 0) ctx.moveTo(Math.cos(a1) * r, Math.sin(a1) * r);
        ctx.lineTo(Math.cos(a1) * outer, Math.sin(a1) * outer);
        ctx.lineTo(Math.cos(a2) * outer, Math.sin(a2) * outer);
        ctx.lineTo(Math.cos(a3) * r, Math.sin(a3) * r);
        ctx.lineTo(Math.cos(a4) * r, Math.sin(a4) * r);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };

    const renderFrame = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Subtle drifting candlestick lines (neutral low-opacity palette)
      for (const c of candles) {
        if (!reduced) {
          c.x -= c.speed;
          if (c.x < -0.05) c.x = 1.05;
        }
        const cx = c.x * w + mouseX * 0.45;
        const cy = c.y * h + mouseY * 0.45;

        ctx.strokeStyle = c.bull ? "rgba(25, 245, 138, 0.14)" : "rgba(34, 229, 255, 0.12)";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - c.h * 0.85);
        ctx.lineTo(cx, cy + c.h * 0.85);
        ctx.stroke();

        ctx.fillStyle = c.bull ? "rgba(25, 245, 138, 0.08)" : "rgba(34, 229, 255, 0.07)";
        ctx.fillRect(cx - 4, cy - c.h * 0.45, 8, c.h * 0.9);
      }

      // Floating gears
      for (const g of gears) {
        if (!reduced) g.angle += g.speed;
        const gx = g.x * w - mouseX * 0.6;
        const gy = g.y * h - mouseY * 0.6;
        drawGear(gx, gy, g.r, g.teeth, g.angle);
      }

      if (!reduced && isVisible) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();
    if (!reduced) {
      const resumeCheck = setInterval(() => {
        if (isVisible && rafId === 0) {
          rafId = requestAnimationFrame(renderFrame);
        }
        if (!isVisible && rafId !== 0) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      }, 300);
      return () => {
        clearInterval(resumeCheck);
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouseMove);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

