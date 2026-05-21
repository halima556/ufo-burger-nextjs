"use client";

import { useEffect } from "react";

export function useRevealObserver() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-item")
    );

    if (prefersReducedMotion || items.length === 0) {
      items.forEach((el) => el.classList.add("is-visible"));
      document.body.classList.add("reveal-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    items.forEach((el) => observer.observe(el));

    // Добавляем reveal-ready ПОСЛЕ тоге следит за элементами
    requestAnimationFrame(() => {
      document.body.classList.add("reveal-ready");
    });

    return () => observer.disconnect();
  }, []);
}
