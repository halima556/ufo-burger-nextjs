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

        <section id="menu" className="section section-menu">
          <div className="section-head">
            <p className="kicker">03</p>
            <h2>Galaxy Menu</h2>
            <p className="section-subtitle">DESIGNED TO ATTRACT CUSTOMERS AND INVESTORS</p>
          </div>

          <div className="menu-switch" aria-label="Menu categories">
            <button className="tab-btn" type="button">All</button>
            <button className="tab-btn" type="button">Savory Burgers</button>
            <button className="tab-btn" type="button">Sweet Line</button>
          </div>

          <div className="menu-grid">
            <article
              className="menu-item menu-feature menu-feature--mercury savory reveal-item"
              style={{ ["--reveal-delay" as any]: "0.02s" }}
            >
              <img src="/assets/media/mercury2.PNG" alt="Mercury Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Mercury</h3>
                <p className="tag">Spicy, hot, sharp</p>
                <p className="menu-detail">Beef, jalapeno, chili sauce, lime, smoked paprika.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={{ ["--reveal-delay" as any]: "0.04s" }}>
              <img src="/assets/media/venus.png" alt="Venus Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Venus</h3>
                <p className="tag">Creamy, soft, stretchy</p>
                <p className="menu-detail">Chicken, melted cheese, cream sauce, a hint of honey.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={{ ["--reveal-delay" as any]: "0.06s" }}>
              <img src="/assets/media/mars.png" alt="Mars Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Mars</h3>
                <p className="tag">Spicy, smoky, meaty</p>
                <p className="menu-detail">Lamb, roasted pepper, paprika, yogurt-garlic sauce.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--saturn savory reveal-item"
              style={{ ["--reveal-delay" as any]: "0.08s" }}
            >
              <img src="/assets/media/saturn.png" alt="Saturn Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Saturn</h3>
                <p className="tag">Balanced, BBQ-forward</p>
                <p className="menu-detail">Beef, onion rings, BBQ sauce, cheddar.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--neptune savory reveal-item"
              style={{ ["--reveal-delay" as any]: "0.1s" }}
            >
              <img src="/assets/media/neptune.png" alt="Neptune Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Neptune</h3>
                <p className="tag">Cool and refreshing</p>
                <p className="menu-detail">Fish or chicken, yogurt sauce, mint, lime.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--pluto savory reveal-item"
              style={{ ["--reveal-delay" as any]: "0.12s" }}
            >
              <img src="/assets/media/pluto.png" alt="Pluto Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Pluto</h3>
                <p className="tag">Deep, mysterious, sweet-salty</p>
                <p className="menu-detail">Beef, black garlic sauce, sesame.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={{ ["--reveal-delay" as any]: "0.14s" }}>
              <img src="/assets/media/sirius1.png" alt="Sirius Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Sirius</h3>
                <p className="tag">Rich, caramel-smoky</p>
                <p className="menu-detail">Premium beef, caramelized onion, BBQ sauce.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={{ ["--reveal-delay" as any]: "0.16s" }}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Aurora</h3>
                <p className="tag">Berry-cream, light</p>
                <p className="menu-detail">Soft bun, blueberry cream, lavender syrup.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={{ ["--reveal-delay" as any]: "0.18s" }}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Ice Comet</h3>
                <p className="tag">Cold, minty, creamy</p>
                <p className="menu-detail">Ice cream, mint, white chocolate.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={{ ["--reveal-delay" as any]: "0.2s" }}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Dark Matter</h3>
                <p className="tag">Chocolate, deep, sweet-salty</p>
                <p className="menu-detail">Chocolate ganache, sea salt, black bun.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={{ ["--reveal-delay" as any]: "0.22s" }}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Luna</h3>
                <p className="tag">Milky, delicate, creamy</p>
                <p className="menu-detail">White chocolate, coconut, cream.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={{ ["--reveal-delay" as any]: "0.24s" }}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Cosmic Cloud</h3>
                <p className="tag">Airy, vanilla</p>
                <p className="menu-detail">Whipped cream, meringue, vanilla.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="inside" className="section inside-section">
          <div className="section-head inside-head">
            <p className="kicker">04</p>
            <h2>Inside The Orbit</h2>
            <p className="section-subtitle">THE CORE TEXTURE EXPERIENCE</p>
          </div>
          <div className="inside-grid">
            <article className="inside-shot reveal-item" style={{ ["--reveal-delay" as any]: "0.03s" }}>
              <img src="/assets/media/burgerinhalt.png" alt="Inside view of UFO burger composition" loading="lazy" />
              <p className="inside-caption">Inside architecture with a premium core and cinematic depth.</p>
            </article>
          </div>
        </section>

        <section id="crew" className="section">
          <div className="section-head">
            <p className="kicker">05</p>
            <h2>Join the waitlist</h2>
            <p className="section-subtitle">FIRST DROP. FIRST SIGNAL.</p>
          </div>

          <div className="grid two-col">
            <article className="panel">
              <h3>Launch Access List</h3>
              <p>Get first access to launch day, menu drops, and limited offers.</p>
              <p id="crew-count" className="crew-count" aria-live="polite">
                No launch members have joined yet.
              </p>
            </article>

            <form className="panel crew-form" id="crew-form">
              <label htmlFor="name">YOUR NAME</label>
              <input
                id="name"
                name="name"
                type="text"
                minLength={2}
                maxLength={50}
                autoComplete="name"
                placeholder="Enter your name"
                required
              />

              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                required
              />

              <label htmlFor="phone">PHONE / WHATSAPP</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                minLength={6}
                maxLength={30}
                autoComplete="tel"
                placeholder="+44..."
                required
              />

              <label htmlFor="message">MESSAGE (OPTIONAL)</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={280}
                placeholder="Tell us about your favorite planet..."
              ></textarea>

              <div className="form-actions">
                <button className="btn btn-primary" type="submit">Join the waitlist</button>
              </div>

              <p className="form-note">We will send your first launch signal and opening updates.</p>
              <p id="form-status" className="form-status" role="status" aria-live="polite"></p>
            </form>
          </div>
        </section>

        <section id="business" className="section">
          <div className="section-head">
            <p className="kicker">06</p>
            <h2>For Partners / Investors</h2>
            <p className="section-subtitle">BRAND SYSTEM, DEMAND FLOW, DIRECT ACCESS</p>
          </div>

          <div className="grid four-col">
            <article className="panel">
              <h3>Brand Signal</h3>
              <p>One world. One story. One instantly recognizable format.</p>
              <ul>
                <li>Planet-led naming and signature visual language</li>
                <li>Premium dark cinematic identity</li>
                <li>Built for social and word-of-mouth pull</li>
              </ul>
            </article>

            <article className="panel">
              <h3>Demand Engine</h3>
              <ul>
                <li>Primary CTA: Join the waitlist</li>
                <li>Secondary CTA: Explore the menu</li>
                <li>Direct investor WhatsApp routing</li>
              </ul>
            </article>

            <article className="panel">
              <h3>Reality Check</h3>
              <p>Opening: Soon. Location details: TBD. Prices: TBD.</p>
            </article>

            <article className="panel">
              <h3>Direct Contact</h3>
              <p>Share details and intent. We continue directly on WhatsApp.</p>
              <div className="form-actions">
                <button className="btn btn-ghost" type="button">
                  Contact on WhatsApp
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}