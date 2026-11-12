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
import About from "./About";
import Events from "./Events";
import Prizes from "./Prizes";
import RulesFaq from "./RulesFaq";
import OrganisedBy from "./OrganisedBy";
import Memories from "./Memories";
import RegisterModal from "./RegisterModal";
import StickyRegisterBar from "./StickyRegisterBar";
import Footer from "./Footer";

export default function EventLandingClient() {
  const [selectedEvent, setSelectedEvent] = useState<EventId>("automate");
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
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
      lerp: 0.09,
      smoothWheel: true,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as Window & { __lenis?: Lenis }).__lenis;
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleSelectRegister = useCallback((eventId: EventId) => {
    setSelectedEvent(eventId);
    setIsRegisterOpen(true);
  }, []);

  const handleOpenGeneralRegister = useCallback(() => {
    setIsRegisterOpen(true);
  }, []);

  const handleRegistrationSuccess = useCallback((eventId: EventId, seatsLeft: number) => {
    setSeats((prev) => ({ ...prev, [eventId]: seatsLeft }));
  }, []);

  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar onOpenRegister={handleOpenGeneralRegister} />
      <main>
        <Hero onOpenRegister={handleOpenGeneralRegister} />
        <About />
        <Events seats={seats} onSelectRegister={handleSelectRegister} />
        <Prizes />
        <RulesFaq />
        <OrganisedBy />
        <Memories />
      </main>
      <Footer onOpenRegister={handleOpenGeneralRegister} />
      <StickyRegisterBar onOpenRegister={handleOpenGeneralRegister} />

      <RegisterModal
        isOpen={isRegisterOpen}
        selectedEvent={selectedEvent}
        onClose={() => setIsRegisterOpen(false)}
        onEventChange={setSelectedEvent}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </>
  );
}
