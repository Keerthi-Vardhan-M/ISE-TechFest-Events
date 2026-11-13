"use client";

import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { EVENTS, type EventId } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Events from "./Events";
import Prizes from "./Prizes";
import Sponsors from "./Sponsors";
import RulesFaq from "./RulesFaq";
import OrganisedBy from "./OrganisedBy";
import Memories from "./Memories";
import StickyRegisterBar from "./StickyRegisterBar";
import Footer from "./Footer";

export default function EventLandingClient() {
  const [seats, setSeats] = useState<Record<EventId, number>>({
    automate: EVENTS.automate.seatCap,
    quant: EVENTS.quant.seatCap,
  });

  useEffect(() => {
    let active = true;
    fetch("/api/seats")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setSeats({
          automate: data.automate?.left ?? EVENTS.automate.seatCap,
          quant: data.quant?.left ?? EVENTS.quant.seatCap,
        });
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    ensureGsapRegistered();
    if (isTouchDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events seats={seats} onSelectRegister={() => {}} />
        <Memories />
        <Prizes />
        <Sponsors />
        <RulesFaq />
        <OrganisedBy />
      </main>
      <Footer />
    </>
  );
}
