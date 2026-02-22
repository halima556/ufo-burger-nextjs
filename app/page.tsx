export default function Home() {
  return (
    <>
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

      <button className="back-to-top" id="back-to-top" type="button" aria-label="Back to top">
        ↑ Top
      </button>

      <header className="site-header">
        <a href="#top" className="brand brand--glow">UFO BURGER</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media">
          <video className="hero-video" preload="auto" autoPlay muted loop playsInline>
            <source src="/assets/media/hero-compressed.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <p className="eyebrow">Since 1987 - Recipes from another orbit</p>
          <h1>Premium Closed Burgers from Distant Worlds</h1>
          <p>
            Cosmic flavor, premium craft, and limited first access in Wallsend. Join early and be
            first in line when the hatch opens.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#crew">Join the waitlist</a>
            <a className="btn btn-ghost" href="#menu">Explore the menu</a>
            <button className="btn btn-subtle" type="button">
              For partners / investors
            </button>
          </div>
        </div>
      </section>

      <main>
        <section id="legend" className="legend-epic">
          <div className="legend-epic__inner">
            <div className="legend-head reveal-item" style={{ ["--reveal-delay" as any]: "0.02s" }}>
              <p className="kicker">01</p>
              <h2>The Legend</h2>
              <p className="section-subtitle">HOW IT ALL BEGAN</p>
            </div>

            <article className="legend-chapter reveal-item" style={{ ["--reveal-delay" as any]: "0.08s" }}>
              <p className="legend-lead legend-lead--plain">
                <span className="legend-year">1987.</span> A streak of light cuts across Wallsend, then disappears before sunrise.
              </p>
              <p>
                No crater. No wreckage. Only a scorched capsule and a coded menu blueprint no one
                could decode.
              </p>
              <p>
                Inside were signatures from distant systems, ingredients mapped to planets, and one
                instruction stamped in red: &quot;Serve when Earth is ready.&quot;
              </p>
            </article>

            <article className="legend-chapter reveal-item" style={{ ["--reveal-delay" as any]: "0.14s" }}>
              <h3>Hook + Cliffhanger</h3>
              <p className="section-subtitle">THE SIGNAL RETURNS</p>
              <p className="legend-lead">
                For years, the capsule stayed sealed. This season, it activated.
              </p>
              <p>
                One by one, the planet formulas unlocked - Mercury, Venus, Mars, and beyond - each
                profile built for craving, repeat visits, and pure word-of-mouth.
              </p>
              <blockquote className="legend-quote">
                The final protocol is still encrypted. It only opens after first contact with the Crew.
              </blockquote>
              <p>
                First contact starts here: join the Crew, unlock the transmission, and take your place
                in the first launch line.
              </p>
            </article>
          </div>
        </section>

        <section id="project" className="section">
          <div className="section-head">
            <p className="kicker">02</p>
            <h2>Why UFO Burger</h2>
            <p className="section-subtitle">BIG FLAVOR. CLEAR CHOICE.</p>
          </div>
          <div className="grid two-col">
            <article className="panel">
              <h3>Planet Recipes</h3>
              <p>Every burger has its own planet profile, texture, and flavor identity.</p>
              <ul>
                <li>Mercury to Pluto flavor signatures</li>
                <li>Closed-burger format built for freshness</li>
                <li>Distinct taste profiles you can remember</li>
              </ul>
            </article>
            <article className="panel">
              <h3>Fast &amp; Satisfying</h3>
              <ul>
                <li>Made for quick pick-up and easy repeat orders</li>
                <li>Balanced savory menu plus sweet line</li>
                <li>Crafted for strong flavor without heavy feel</li>
              </ul>
            </article>
          </div>
          <div className="grid four-col project-facts">
            <article className="panel">
              <h3>Opening Soon</h3>
              <p>First launch in Wallsend</p>
            </article>
            <article className="panel">
              <h3>Location</h3>
              <p>Wallsend</p>
            </article>
            <article className="panel">
              <h3>Signature Line</h3>
              <p>Savory planets + sweet line</p>
            </article>
            <article className="panel">
              <h3>First Access</h3>
              <p>Join the launch access list</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}