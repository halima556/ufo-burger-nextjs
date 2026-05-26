"use client";

import { useScrollProgress } from "@/app/hooks/useScrollProgress";

export function ScrollProgress() {
  const { progress } = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
      style={{ width: `${progress}%` }}
    />
  );
}
