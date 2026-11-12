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
export const MOTION_DURATION = {
  fast: 0.3,
  normal: 0.7,
  reveal: 0.9,
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

