"use client";

import { useEffect, useRef } from "react";

interface HeroProps {
  onInvestorClick: () => void;
}

export function Hero({ onInvestorClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    tryPlay();

    // Safari requires user interaction
    document.addEventListener("touchstart", tryPlay, { once: true });
    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });

    return () => {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-media">
        <video
          ref={videoRef}
          className="hero-video"
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/assets/media/hero-compressed.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">Since 1987 - Recipes from another orbit</p>
        <h1>Premium Closed Burgers from Distant Worlds</h1>
        <p>
          Cosmic flavor, premium craft, and limited first access in Wallsend.
          Join early and be first in line when the hatch opens.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#crew">
            Join the waitlist
          </a>
          <a className="btn btn-ghost" href="#menu">
            Explore the menu
          </a>
          <button
            className="btn btn-subtle"
            type="button"
            onClick={onInvestorClick}
          >
            For partners / investors
          </button>
        </div>
      </div>
    </section>
  );
}
