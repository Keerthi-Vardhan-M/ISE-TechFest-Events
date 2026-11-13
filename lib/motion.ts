"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensureGsapRegistered() {
  if (typeof window === "undefined") return;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

export const MOTION_EASE = "power3.out";
export const BUTTER_EASE = "power4.out";
export const BUTTER_BEZIER = "cubic-bezier(0.16, 1, 0.3, 1)";
export const MOTION_DURATION = {
  fast: 0.35,
  normal: 0.85,
  reveal: 1.2,
  butter: 1.5,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isLowPowerOrMobile(): boolean {
  if (typeof window === "undefined") return false;
  const isSmall = window.innerWidth < 768;
  const lowCores =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const conn =
    typeof navigator !== "undefined"
      ? (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      : undefined;
  const saveData = Boolean(conn?.saveData);
  return isSmall || lowCores || saveData;
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

