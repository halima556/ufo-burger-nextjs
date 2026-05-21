import type { CSSProperties } from "react";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

interface BusinessSectionProps {
  onInvestorClick: () => void;
}

export function BusinessSection({ onInvestorClick }: BusinessSectionProps) {
  return (
    <section id="business" className="section">
      <div className="section-head">
        <p className="kicker">06</p>
        <h2>For Partners / Investors</h2>
        <p className="section-subtitle">BRAND SYSTEM, DEMAND FLOW, DIRECT ACCESS</p>
      </div>

      <div className="grid four-col">
        <article className="panel reveal-item" style={delay("0.03s")}>
          <h3>Brand Signal</h3>
          <p>One world. One story. One instantly recognizable format.</p>
          <ul>
            <li>Planet-led naming and signature visual language</li>
            <li>Premium dark cinematic identity</li>
            <li>Built for social and word-of-mouth pull</li>
          </ul>
        </article>

        <article className="panel reveal-item" style={delay("0.07s")}>
          <h3>Demand Engine</h3>
          <ul>
            <li>Primary CTA: Join the waitlist</li>
            <li>Secondary CTA: Explore the menu</li>
            <li>Direct investor WhatsApp routing</li>
          </ul>
        </article>

        <article className="panel reveal-item" style={delay("0.11s")}>
          <h3>Reality Check</h3>
          <p>Opening: Soon. Location details: TBD. Prices: TBD.</p>
        </article>

        <article className="panel reveal-item" style={delay("0.15s")}>
          <h3>Direct Contact</h3>
          <p>Share details and intent. We continue directly on WhatsApp.</p>
          <div className="form-actions">
            <button className="btn btn-ghost" type="button" onClick={onInvestorClick}>
              Contact on WhatsApp
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
