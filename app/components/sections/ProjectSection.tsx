import type { CSSProperties } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

export function ProjectSection() {
  return (
    <section id="project" className="section">
      <div className="section-head">
        <p className="kicker">02</p>
        <h2>Why UFO Burger</h2>
        <p className="section-subtitle">BIG FLAVOR. CLEAR CHOICE.</p>
      </div>

      <div className="grid two-col">
        <article className="panel reveal-item" style={delay("0.03s")}>
          <h3>Planet Recipes</h3>
          <p>Every burger has its own planet profile, texture, and flavor identity.</p>
          <ul>
            <li>Mercury to Pluto flavor signatures</li>
            <li>Closed-burger format built for freshness</li>
            <li>Distinct taste profiles you can remember</li>
          </ul>
        </article>

        <article className="panel reveal-item" style={delay("0.08s")}>
          <h3>Fast &amp; Satisfying</h3>
          <ul>
            <li>Made for quick pick-up and easy repeat orders</li>
            <li>Balanced savory menu, sweet line, and crew-crafted drinks</li>
            <li>Crafted for strong flavor without heavy feel</li>
          </ul>
        </article>
      </div>

      <div className="grid four-col project-facts">
        {[
          { title: "Opening Soon", body: "First launch in Wallsend", d: "0.11s" },
          { title: "Location", body: "Wallsend", d: "0.14s" },
          {
            title: "Signature Line",
            body: "Planet burgers, sweet line, and Deep Space drinks",
            d: "0.17s",
          },
          { title: "First Access", body: "Join the launch access list", d: "0.2s" },
        ].map(({ title, body, d }) => (
          <article key={title} className="panel reveal-item" style={delay(d)}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
