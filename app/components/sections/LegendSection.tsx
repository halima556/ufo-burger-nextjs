import type { CSSProperties } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

export function LegendSection() {
  return (
    <section id="legend" className="legend-epic">
      <div className="legend-epic__inner">
        <div className="legend-head reveal-item" style={delay("0.02s")}>
          <p className="kicker">01</p>
          <h2>The Legend</h2>
          <p className="section-subtitle">HOW IT ALL BEGAN</p>
        </div>

        <article className="legend-chapter reveal-item" style={delay("0.08s")}>
          <p className="legend-lead legend-lead--plain">
            <span className="legend-year">1987.</span> A streak of light cuts
            across Wallsend, then disappears before sunrise.
          </p>
          <p>
            No crater. No wreckage. Only a scorched capsule and a coded menu
            blueprint no one could decode.
          </p>
          <p>
            Inside were signatures from distant systems, ingredients mapped to
            planets, and one instruction stamped in red: &quot;Serve when Earth
            is ready.&quot;
          </p>
        </article>

        <article className="legend-chapter reveal-item" style={delay("0.14s")}>
          <h3>Hook + Cliffhanger</h3>
          <p className="section-subtitle">THE SIGNAL RETURNS</p>
          <p className="legend-lead">
            For years, the capsule stayed sealed. This season, it activated.
          </p>
          <p>
            One by one, the planet formulas unlocked — Mercury, Venus, Mars, and
            beyond — each profile built for craving, repeat visits, and pure
            word-of-mouth.
          </p>
          <blockquote className="legend-quote">
            The final protocol is still encrypted. It only opens after first
            contact with the Crew.
          </blockquote>
          <p>
            First contact starts : join the Crew, unlock the transmission,
            and take your place in the first launch line.
          </p>
        </article>
      </div>
    </section>
  );
}
