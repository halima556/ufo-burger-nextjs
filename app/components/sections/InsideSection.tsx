"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

export function InsideSection() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const rect = imgRef.current.closest("section")?.getBoundingClientRect();
      if (!rect) return;
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      imgRef.current.style.setProperty("--parallax-y", `${center * 0.08}px`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="inside" className="section inside-section">
      <div className="section-head inside-head">
        <p className="kicker">04</p>
        <h2>Inside The Orbit</h2>
        <p className="section-subtitle">THE CORE TEXTURE EXPERIENCE</p>
      </div>
      <div className="inside-grid">
        <article className="inside-shot reveal-item" style={delay("0.03s")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src="/assets/media/burgerinhalt.png"
            alt="Inside view of UFO burger composition"
            loading="lazy"
            className="inside-burger-img"
          />
          <p className="inside-caption">
            Inside architecture with a premium core and cinematic depth.
          </p>
        </article>
      </div>
    </section>
  );
}
