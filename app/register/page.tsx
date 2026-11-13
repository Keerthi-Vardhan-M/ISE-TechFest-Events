import { Suspense } from "react";
import type { Metadata } from "next";
import RegisterPage from "@/components/RegisterPage";

export const metadata: Metadata = {
  title: "Team Registration | Auto×Quant '26",
  description: "Official team registration for Automate Boring Task and QuantFinance flagship arenas.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center cream-dot-grid">
          <div className="font-mono text-xs uppercase tracking-widest text-[#0A1B3D]">
            Loading registration portal...
          </div>
        </div>
      }
    >
      <RegisterPage />
    </Suspense>
  );
}

