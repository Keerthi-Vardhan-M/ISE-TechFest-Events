"use client";

import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { EVENTS, type EventId } from "@/content/events";
import { ensureGsapRegistered, isTouchDevice, prefersReducedMotion } from "@/lib/motion";
import Preloader from "./Preloader";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Events from "./Events";
import About from "./About";
import Prizes from "./Prizes";
import RulesFaq from "./RulesFaq";
import RegisterForm from "./RegisterForm";
import StickyRegisterBar from "./StickyRegisterBar";
import Footer from "./Footer";

export default function EventLandingClient() {
  const [selectedEvent, setSelectedEvent] = useState<EventId>("automate");
  const [seats, setSeats] = useState<Record<EventId, number>>({
    automate: EVENTS.automate.seatCap,
    quant: EVENTS.quant.seatCap,
  });

  // Fetch cached seat counts (15s CDN revalidate)
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

  // Lenis smooth scroll synced with GSAP ticker (disabled on touch & reduced motion)
  useEffect(() => {
    ensureGsapRegistered();
    if (isTouchDevice() || prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Scroll-linked subtle background tint transitions between sections
  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion()) return;

    const sections: Array<{ id: string; color: string }> = [
      { id: "home", color: "#07080B" },
      { id: "events", color: "#090C12" },
      { id: "about", color: "#07080B" },
      { id: "prizes", color: "#0A0D14" },
      { id: "rules-faq", color: "#07080B" },
      { id: "register", color: "#080B10" },
    ];

    const triggers = sections
      .map(({ id, color }) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => document.documentElement.style.setProperty("--section-bg-tint", color),
          onEnterBack: () => document.documentElement.style.setProperty("--section-bg-tint", color),
        });
      })
      .filter((t): t is ScrollTrigger => Boolean(t));

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleSelectRegister = useCallback((eventId: EventId) => {
    setSelectedEvent(eventId);
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  }, []);

  const handleRegistrationSuccess = useCallback((eventId: EventId, seatsLeft: number) => {
    setSeats((prev) => ({ ...prev, [eventId]: seatsLeft }));
  }, []);

  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Events seats={seats} onSelectRegister={handleSelectRegister} />
        <About />
        <Prizes />
        <RulesFaq />
        <RegisterForm
          selectedEvent={selectedEvent}
          onEventChange={setSelectedEvent}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      </main>
      <Footer />
      <StickyRegisterBar />
    </>
  );
}

