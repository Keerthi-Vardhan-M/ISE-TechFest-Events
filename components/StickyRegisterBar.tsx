"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function StickyRegisterBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const formSection = document.getElementById("register");
    if (!formSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setHidden(entries[0]?.isIntersecting ?? false);
      },
      { threshold: 0.12 }
    );

    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07080B]/90 px-4 py-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href="#register"
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#22E5FF] to-[#19F58A] font-heading text-sm font-bold text-[#07080B]"
      >
        <span>Register Now</span>
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

