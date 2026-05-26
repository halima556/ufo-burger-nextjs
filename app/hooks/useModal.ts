"use client";

import { useCallback, useEffect, useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("is-modal-open");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("is-modal-open");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return { isOpen, open, close };
}
