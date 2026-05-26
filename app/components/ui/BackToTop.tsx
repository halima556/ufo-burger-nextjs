"use client";

import { useScrollProgress } from "@/app/hooks/useScrollProgress";

export function BackToTop() {
  const { showBackToTop } = useScrollProgress();

  return (
    <button
      className={`back-to-top${showBackToTop ? " is-visible" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑ Top
    </button>
  );
}
