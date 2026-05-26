"use client";

import { useCallback, useEffect, useState } from "react";

export function useNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    document.body.classList.add("is-nav-open");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("is-nav-open");
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) document.body.classList.add("is-nav-open");
      else document.body.classList.remove("is-nav-open");
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  return { isOpen, open, close, toggle };
}
