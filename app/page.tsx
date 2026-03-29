"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, type CSSProperties } from "react";

type LeadType = "Customer" | "Investor" | "Partner" | "Other";

type WaitlistEntry = {
  name: string;
  email: string;
  leadType: LeadType;
  phone: string;
  message: string;
  createdAt: string;
};

const WAITLIST_STORAGE_KEY = "ufoBurgerWaitlist";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const leadTypeOptions = new Set<LeadType>(["Customer", "Investor", "Partner", "Other"]);
type RevealDelayStyle = CSSProperties & Record<"--reveal-delay", string>;
const withRevealDelay = (delay: string): RevealDelayStyle => ({ "--reveal-delay": delay });

export default function Home() {
  useEffect(() => {
    const backToTopBtn = document.getElementById("back-to-top") as HTMLButtonElement | null;
    const scrollProgress = document.getElementById("scroll-progress") as HTMLElement | null;

    const modal = document.getElementById("investor-modal") as HTMLElement | null;
    const modalCloseButtons = document.querySelectorAll<HTMLElement>("[data-close-investor-modal]");
    const modalOpenButtons = document.querySelectorAll<HTMLElement>("[data-open-investor-modal]");

    const navToggle = document.getElementById("nav-toggle") as HTMLButtonElement | null;
    const navDrawer = document.getElementById("main-nav-drawer") as HTMLElement | null;
    const navBackdrop = document.getElementById("nav-backdrop") as HTMLButtonElement | null;
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".main-nav a"));
    const sceneSections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));

    const menuFilterButtons = document.querySelectorAll<HTMLButtonElement>(".tab-btn[data-filter]");
    const menuItems = document.querySelectorAll<HTMLElement>(".menu-grid .menu-item");
    const menuFeatures = Array.from(document.querySelectorAll<HTMLElement>(".menu-feature"));

    const crewForm = document.getElementById("crew-form") as HTMLFormElement | null;
    const formStatus = document.getElementById("form-status") as HTMLElement | null;
    const crewCount = document.getElementById("crew-count") as HTMLElement | null;
    const crewNameInput = document.getElementById("name") as HTMLInputElement | null;

    const investorForm = document.getElementById("investor-form") as HTMLFormElement | null;
    const investorFormStatus = document.getElementById("investor-form-status") as HTMLElement | null;
    const investorPrimaryInput = document.getElementById("investor-name") as HTMLInputElement | null;

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const bodyWhatsAppRaw = String(document.body.dataset.investorWhatsapp || "").trim();
    const investorWhatsAppNumber = bodyWhatsAppRaw.replace(/\D/g, "");

    // ---------- Helpers ----------
    const readWaitlist = (): WaitlistEntry[] => {
      try {
        const raw = localStorage.getItem(WAITLIST_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

    const saveWaitlist = (entries: WaitlistEntry[]) => {
      try {
        localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(entries));
        return true;
      } catch {
        return false;
      }
    };

    const setStatus = (message: string, type: "success" | "error" = "success") => {
      if (!formStatus) return;
      formStatus.textContent = message;
      formStatus.classList.remove("is-success", "is-error");
      formStatus.classList.add(type === "error" ? "is-error" : "is-success");
    };

    const setInvestorStatus = (message: string, type: "success" | "error" = "success") => {
      if (!investorFormStatus) return;
      investorFormStatus.textContent = message;
      investorFormStatus.classList.remove("is-success", "is-error");
      investorFormStatus.classList.add(type === "error" ? "is-error" : "is-success");
    };

    const updateCrewCount = () => {
      if (!crewCount) return;
      const total = readWaitlist().length;
      if (total === 0) {
        crewCount.textContent = "No launch members have joined yet.";
      } else {
        crewCount.textContent = `${total} member${total === 1 ? "" : "s"} on the launch access list.`;
      }
    };

    const buildLeadWhatsAppText = (data: {
      source: string;
      leadType: string;
      name: string;
      email: string;
      phone: string;
      company?: string;
      message?: string;
    }) => {
      const normalizedType: LeadType = leadTypeOptions.has(data.leadType as LeadType)
        ? (data.leadType as LeadType)
        : "Other";

      return [
        `[UFO LEAD: ${normalizedType.toUpperCase()}]`,
        "",
        `Source: ${data.source}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "N/A"}`,
        `Company: ${data.company || "N/A"}`,
        `Message: ${data.message || "N/A"}`,
        `Timestamp: ${new Date().toISOString()}`,
      ].join("\n");
    };

    const openWhatsAppWithText = (messageText: string) => {
      if (!investorWhatsAppNumber || bodyWhatsAppRaw === "REPLACE_WITH_REAL_NUMBER") {
        return false;
      }
      const waUrl = `https://wa.me/${investorWhatsAppNumber}?text=${encodeURIComponent(messageText)}`;
      const popup = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!popup) window.location.href = waUrl;
      return true;
    };

    // ---------- Scroll progress + top button ----------
    const handleScroll = () => {
      if (backToTopBtn) {
        backToTopBtn.classList.toggle("is-visible", window.scrollY > 300);
      }

      if (scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
    };

    const handleBackToTopClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    backToTopBtn?.addEventListener("click", handleBackToTopClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    // ---------- Modal ----------
    const openModal = () => {
      if (!modal) return;
      modal.hidden = false;
      document.body.classList.add("is-modal-open");
      investorPrimaryInput?.focus();
    };

    const closeModal = () => {
      if (!modal) return;
      modal.hidden = true;
      document.body.classList.remove("is-modal-open");
    };

    modalOpenButtons.forEach((btn) => btn.addEventListener("click", openModal));
    modalCloseButtons.forEach((btn) => btn.addEventListener("click", closeModal));

    // ---------- Nav Drawer ----------
    const openNavMenu = () => {
      if (!navToggle || !navDrawer || !navBackdrop) return;
      navDrawer.hidden = false;
      navBackdrop.hidden = false;
      navDrawer.classList.add("is-open");
      navBackdrop.classList.add("is-open");
      navToggle.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close main menu");
      document.body.classList.add("is-nav-open");
    };

    const closeNavMenu = () => {
      if (!navToggle || !navDrawer || !navBackdrop) return;
      navDrawer.hidden = true;
      navBackdrop.hidden = true;
      navDrawer.classList.remove("is-open");
      navBackdrop.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open main menu");
      document.body.classList.remove("is-nav-open");
    };

    const handleNavToggleClick = () => {
      if (!navToggle) return;
      const isOpen = navToggle.classList.contains("is-open");
      if (isOpen) closeNavMenu();
      else openNavMenu();
    };

    navToggle?.addEventListener("click", handleNavToggleClick);
    navBackdrop?.addEventListener("click", closeNavMenu);
    navLinks.forEach((link) => link.addEventListener("click", closeNavMenu));

    // ---------- Active nav highlight ----------
    const highlightNavLinkById = (activeId: string) => {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const isCurrent = href === `#${activeId}`;
        link.classList.toggle("is-current", isCurrent);
        link.setAttribute("aria-current", isCurrent ? "true" : "false");
      });
    };

    let sectionObserver: IntersectionObserver | null = null;
    if (navLinks.length && sceneSections.length) {
      const sectionsById = new Map<string, HTMLElement>();
      sceneSections.forEach((section) => sectionsById.set(section.id, section));

      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length > 0) {
            highlightNavLinkById((visible[0].target as HTMLElement).id);
          }
        },
        { threshold: [0.2, 0.45, 0.7], rootMargin: "-28% 0px -50% 0px" }
      );

      navLinks.forEach((link) => {
        const href = link.getAttribute("href") || "";
        const id = href.startsWith("#") ? href.slice(1) : "";
        const section = sectionsById.get(id);
        if (section) sectionObserver?.observe(section);
      });

      const hashId = window.location.hash.replace("#", "");
      if (sectionsById.has(hashId)) highlightNavLinkById(hashId);
      else highlightNavLinkById("legend");
    }

    // ---------- Reveal motion ----------
    let revealObserver: IntersectionObserver | null = null;

    if (revealItems.length) {
      if (prefersReducedMotion) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
      } else {
        document.body.classList.add("reveal-ready");

        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                (entry.target as HTMLElement).classList.add("is-visible");
                revealObserver?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
        );

        revealItems.forEach((item) => revealObserver?.observe(item));
      }
    }

    // ---------- Menu ingredient toggle ----------
    const setMenuIngredientOpen = (item: HTMLElement, open: boolean) => {
      item.classList.toggle("is-open", open);
      item.setAttribute("aria-expanded", open ? "true" : "false");
    };

    const closeAllMenuIngredients = (exceptItem: HTMLElement | null = null) => {
      menuFeatures.forEach((item) => {
        if (item === exceptItem) return;
        setMenuIngredientOpen(item, false);
      });
    };

    const menuFeatureClickHandlers = new Map<HTMLElement, (e: Event) => void>();
    const menuFeatureKeyHandlers = new Map<HTMLElement, (e: KeyboardEvent) => void>();

    menuFeatures.forEach((item) => {
      const detail = item.querySelector(".menu-detail");
      if (!detail) return;

      const burgerName = item.querySelector("h3")?.textContent?.trim() || "Burger";
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-expanded", "false");
      item.setAttribute("aria-label", `${burgerName} ingredients`);

      const toggleOpen = () => {
        const nextState = !item.classList.contains("is-open");
        closeAllMenuIngredients(item);
        setMenuIngredientOpen(item, nextState);
      };

      const clickHandler = (event: Event) => {
        // if user clicks on link/button inside someday, ignore
        const target = event.target as HTMLElement | null;
        if (target && target.closest("button,a,input,textarea,select")) return;
        toggleOpen();
      };

      const keyHandler = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        toggleOpen();
      };

      item.addEventListener("click", clickHandler);
      item.addEventListener("keydown", keyHandler);
      menuFeatureClickHandlers.set(item, clickHandler);
      menuFeatureKeyHandlers.set(item, keyHandler);
    });

    // close ingredients on scroll (small debounce)
    let closeIngredientsOnScrollTimer = 0;
    const handleCloseIngredientsOnScroll = () => {
      window.clearTimeout(closeIngredientsOnScrollTimer);
      closeIngredientsOnScrollTimer = window.setTimeout(() => {
        closeAllMenuIngredients();
      }, 80);
    };
    window.addEventListener("scroll", handleCloseIngredientsOnScroll, { passive: true });

    // ---------- Menu filter ----------
    const applyFilter = (filter: string) => {
      menuItems.forEach((item) => {
        const visible = filter === "all" || item.classList.contains(filter);
        item.classList.toggle("is-hidden", !visible);
        item.setAttribute("aria-hidden", visible ? "false" : "true");

        // close ingredient pill if hidden
        if (!visible && item.classList.contains("menu-feature")) {
          setMenuIngredientOpen(item as HTMLElement, false);
        }
      });

      menuFilterButtons.forEach((btn) => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    };

    const filterHandlers: Array<{ btn: HTMLButtonElement; fn: () => void }> = [];
    menuFilterButtons.forEach((btn) => {
      const filter = btn.dataset.filter || "all";
      const fn = () => applyFilter(filter);
      btn.addEventListener("click", fn);
      filterHandlers.push({ btn, fn });
    });
    applyFilter("all");

    // ---------- Crew count shortcut ----------
    const handleCrewCountClick = () => {
      if (!crewForm) return;
      crewForm.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => crewNameInput?.focus(), 220);
    };

    const handleCrewCountKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      handleCrewCountClick();
    };

    if (crewCount && crewForm) {
      crewCount.setAttribute("role", "button");
      crewCount.setAttribute("tabindex", "0");
      crewCount.setAttribute("aria-label", "Open launch access form");
      crewCount.addEventListener("click", handleCrewCountClick);
      crewCount.addEventListener("keydown", handleCrewCountKeyDown);
    }

    // ---------- Waitlist form ----------
    const handleCrewSubmit = (event: Event) => {
      event.preventDefault();
      if (!crewForm) return;

      const formData = new FormData(crewForm);
      const name = String(formData.get("name") || "").trim();
      const leadType: LeadType = "Customer";
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const phone = String(formData.get("phone") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const phoneDigits = phone.replace(/\D/g, "");

      if (name.length < 2) {
        setStatus("Please enter a valid name (at least 2 characters).", "error");
        return;
      }
      if (!emailPattern.test(email)) {
        setStatus("Please enter a valid email address.", "error");
        return;
      }
      if (phoneDigits.length < 6) {
        setStatus("Please enter a valid phone/WhatsApp number.", "error");
        return;
      }

      const waitlist = readWaitlist();
      const duplicate = waitlist.some((entry) => String(entry.email).toLowerCase() === email);

      if (duplicate) {
        setStatus("This email is already on the launch access list.", "error");
        return;
      }

      const messageText = buildLeadWhatsAppText({
        source: "Crew waitlist form",
        leadType,
        name,
        email,
        phone,
        message,
      });

      setStatus("Opening WhatsApp...", "success");

      if (!openWhatsAppWithText(messageText)) {
        setStatus("WhatsApp contact is not configured yet.", "error");
        return;
      }

      waitlist.push({
        name,
        email,
        leadType,
        phone,
        message,
        createdAt: new Date().toISOString(),
      });

      if (!saveWaitlist(waitlist)) {
        setStatus(
          "WhatsApp opened, but local save failed. Please submit again so we can keep your launch access entry.",
          "error"
        );
        return;
      }

      setStatus(`Thanks ${name}! WhatsApp opened and your launch access is saved.`, "success");
      crewForm.reset();
      updateCrewCount();
    };

    if (crewForm) {
      crewForm.addEventListener("submit", handleCrewSubmit);
      updateCrewCount();
    }

    // ---------- Investor form ----------
    const handleInvestorSubmit = (event: Event) => {
      event.preventDefault();
      if (!investorForm) return;

      const formData = new FormData(investorForm);
      const name = String(formData.get("name") || "").trim();
      const leadType = String(formData.get("leadType") || "").trim();
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const phone = String(formData.get("phone") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const phoneDigits = phone.replace(/\D/g, "");

      if (name.length < 2) {
        setInvestorStatus("Please enter a valid name (at least 2 characters).", "error");
        return;
      }
      if (!emailPattern.test(email)) {
        setInvestorStatus("Please enter a valid email address.", "error");
        return;
      }
      if (!leadTypeOptions.has(leadType as LeadType)) {
        setInvestorStatus("Please select a valid lead type.", "error");
        return;
      }
      if (phoneDigits.length < 6) {
        setInvestorStatus("Please enter a valid phone/WhatsApp number.", "error");
        return;
      }

      const messageText = buildLeadWhatsAppText({
        source: "Investor modal form",
        leadType,
        name,
        email,
        phone,
        company,
        message,
      });

      if (!openWhatsAppWithText(messageText)) {
        setInvestorStatus("WhatsApp contact is not configured yet.", "error");
        return;
      }

      setInvestorStatus("WhatsApp opened with your contact details.", "success");
      investorForm.reset();
      window.setTimeout(() => closeModal(), 500);
    };

    investorForm?.addEventListener("submit", handleInvestorSubmit);

    // ---------- Pluto fallback ----------
    const plutoImage = document.querySelector<HTMLImageElement>('[data-planet="pluto"] img');
    const plutoCandidates = ["/planets/pluto.PNG", "/planets/earth.PNG", "/planets/jupiter.png"];
    let plutoIndex = Math.max(plutoCandidates.indexOf(plutoImage?.getAttribute("src") || ""), 0);

    const handlePlutoError = () => {
      if (!plutoImage) return;
      const nextIndex = plutoIndex + 1;
      if (nextIndex >= plutoCandidates.length) return;
      plutoIndex = nextIndex;
      plutoImage.src = plutoCandidates[plutoIndex];
    };

    plutoImage?.addEventListener("error", handlePlutoError);

    // ---------- ESC key ----------
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (navToggle?.classList.contains("is-open")) closeNavMenu();
        if (modal && !modal.hidden) closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // ---------- Cleanup ----------
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleCloseIngredientsOnScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(closeIngredientsOnScrollTimer);

      backToTopBtn?.removeEventListener("click", handleBackToTopClick);

      modalOpenButtons.forEach((btn) => btn.removeEventListener("click", openModal));
      modalCloseButtons.forEach((btn) => btn.removeEventListener("click", closeModal));

      navToggle?.removeEventListener("click", handleNavToggleClick);
      navBackdrop?.removeEventListener("click", closeNavMenu);
      navLinks.forEach((link) => link.removeEventListener("click", closeNavMenu));

      filterHandlers.forEach(({ btn, fn }) => btn.removeEventListener("click", fn));

      if (crewForm) crewForm.removeEventListener("submit", handleCrewSubmit);
      if (investorForm) investorForm.removeEventListener("submit", handleInvestorSubmit);

      if (crewCount) {
        crewCount.removeEventListener("click", handleCrewCountClick);
        crewCount.removeEventListener("keydown", handleCrewCountKeyDown);
      }

      menuFeatures.forEach((item) => {
        const clickHandler = menuFeatureClickHandlers.get(item);
        const keyHandler = menuFeatureKeyHandlers.get(item);
        if (clickHandler) item.removeEventListener("click", clickHandler);
        if (keyHandler) item.removeEventListener("keydown", keyHandler);
      });

      plutoImage?.removeEventListener("error", handlePlutoError);

      revealObserver?.disconnect();
      sectionObserver?.disconnect();

      document.body.classList.remove("is-modal-open", "is-nav-open", "reveal-ready");
    };
  }, []);

  return (
    <>
      <BodyWhatsappDataSetter value="+447961880693" />

      <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>

      <div className="floating-investor-cta">
        <button className="btn btn-primary" type="button" data-open-investor-modal>
          Investor Priority Line
        </button>
      </div>

      <button className="back-to-top" id="back-to-top" type="button" aria-label="Back to top">
        ↑ Top
      </button>

      <div className="starfield" aria-hidden="true"></div>
      <div className="shooting-stars" id="shooting-stars" aria-hidden="true"></div>
      <div className="ambient-orb orb-one" aria-hidden="true"></div>
      <div className="ambient-orb orb-two" aria-hidden="true"></div>
      <div className="ambient-orb orb-three" aria-hidden="true"></div>

      <header className="site-header">
        <a href="#top" className="brand brand--glow">
          UFO BURGER
        </a>

        <button
          className="nav-toggle"
          id="nav-toggle"
          type="button"
          aria-label="Open main menu"
          aria-controls="main-nav-drawer"
          aria-expanded="false"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="main-nav-drawer" id="main-nav-drawer" hidden>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#legend">Legend</a>
            <a href="#menu">Galaxy Menu</a>
            <a href="#crew">Crew</a>
            <a href="#business">Investors</a>
          </nav>
        </div>
      </header>

      <button className="nav-backdrop" id="nav-backdrop" type="button" aria-label="Close main menu" hidden></button>

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
            Cosmic flavor, premium craft, and limited first access in Wallsend. Join early and be first in line when
            the hatch opens.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#crew">
              Join the waitlist
            </a>
            <a className="btn btn-ghost" href="#menu">
              Explore the menu
            </a>
            <button className="btn btn-subtle" type="button" data-open-investor-modal>
              For partners / investors
            </button>
          </div>
        </div>
      </section>

      <main>
        <section id="legend" className="legend-epic">
          <div className="legend-epic__inner">
            <div className="legend-head reveal-item" style={withRevealDelay("0.02s")}>
              <p className="kicker">01</p>
              <h2>The Legend</h2>
              <p className="section-subtitle">HOW IT ALL BEGAN</p>
            </div>

            <article className="legend-chapter reveal-item" style={withRevealDelay("0.08s")}>
              <p className="legend-lead legend-lead--plain">
                <span className="legend-year">1987.</span> A streak of light cuts across Wallsend, then disappears
                before sunrise.
              </p>
              <p>No crater. No wreckage. Only a scorched capsule and a coded menu blueprint no one could decode.</p>
              <p>
                Inside were signatures from distant systems, ingredients mapped to planets, and one instruction stamped
                in red: &quot;Serve when Earth is ready.&quot;
              </p>
            </article>

            <article className="legend-chapter reveal-item" style={withRevealDelay("0.14s")}>
              <h3>Hook + Cliffhanger</h3>
              <p className="section-subtitle">THE SIGNAL RETURNS</p>
              <p className="legend-lead">For years, the capsule stayed sealed. This season, it activated.</p>
              <p>
                One by one, the planet formulas unlocked - Mercury, Venus, Mars, and beyond - each profile built for
                craving, repeat visits, and pure word-of-mouth.
              </p>
              <blockquote className="legend-quote">
                The final protocol is still encrypted. It only opens after first contact with the Crew.
              </blockquote>
              <p>
                First contact starts here: join the Crew, unlock the transmission, and take your place in the first
                launch line.
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
            <article className="panel reveal-item" style={withRevealDelay("0.03s")}>
              <h3>Planet Recipes</h3>
              <p>Every burger has its own planet profile, texture, and flavor identity.</p>
              <ul>
                <li>Mercury to Pluto flavor signatures</li>
                <li>Closed-burger format built for freshness</li>
                <li>Distinct taste profiles you can remember</li>
              </ul>
            </article>

            <article className="panel reveal-item" style={withRevealDelay("0.08s")}>
              <h3>Fast &amp; Satisfying</h3>
              <ul>
                <li>Made for quick pick-up and easy repeat orders</li>
                <li>Balanced savory menu, sweet line, and crew-crafted drinks</li>
                <li>Crafted for strong flavor without heavy feel</li>
              </ul>
            </article>
          </div>

          <div className="grid four-col project-facts">
            <article className="panel reveal-item" style={withRevealDelay("0.11s")}>
              <h3>Opening Soon</h3>
              <p>First launch in Wallsend</p>
            </article>
            <article className="panel reveal-item" style={withRevealDelay("0.14s")}>
              <h3>Location</h3>
              <p>Wallsend</p>
            </article>
            <article className="panel reveal-item" style={withRevealDelay("0.17s")}>
              <h3>Signature Line</h3>
              <p>Planet burgers, sweet line, and Deep Space drinks</p>
            </article>
            <article className="panel reveal-item" style={withRevealDelay("0.2s")}>
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
            <button className="tab-btn" type="button" data-filter="all" aria-pressed="true">
              All
            </button>
            <button className="tab-btn" type="button" data-filter="savory" aria-pressed="false">
              Savory Burgers
            </button>
            <button className="tab-btn" type="button" data-filter="sweet" aria-pressed="false">
              Sweet Line
            </button>
            <button className="tab-btn" type="button" data-filter="drinks" aria-pressed="false">
              Drinks
            </button>
          </div>

          <div className="menu-grid">
            <article
              className="menu-item menu-feature menu-feature--mercury savory reveal-item"
              style={withRevealDelay("0.02s")}
            >
              <img src="/planets/mercury.PNG" alt="Mercury Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Mercury</h3>
                <p className="tag">Spicy, hot, sharp</p>
                <p className="menu-detail">Beef, jalapeno, chili sauce, lime, smoked paprika.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={withRevealDelay("0.04s")}>
              <img src="/planets/venus.PNG" alt="Venus Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Venus</h3>
                <p className="tag">Creamy, soft, stretchy</p>
                <p className="menu-detail">Chicken, melted cheese, cream sauce, a hint of honey.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={withRevealDelay("0.06s")}>
              <img src="/planets/earth.PNG" alt="Earth Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Earth</h3>
                <p className="tag">Classic, balanced, fresh</p>
                <p className="menu-detail">Beef, lettuce, tomato, pickles, house sauce.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={withRevealDelay("0.08s")}>
              <img src="/planets/mars.PNG" alt="Mars Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Mars</h3>
                <p className="tag">Spicy, smoky, meaty</p>
                <p className="menu-detail">Lamb, roasted pepper, paprika, yogurt-garlic sauce.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={withRevealDelay("0.1s")}>
              <img src="/planets/jupiter.png" alt="Jupiter Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Jupiter</h3>
                <p className="tag">Big, bold, layered</p>
                <p className="menu-detail">Double beef, cheddar, bacon, onion, BBQ.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--saturn savory reveal-item"
              style={withRevealDelay("0.12s")}
            >
              <img src="/planets/saturn.PNG" alt="Saturn Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Saturn</h3>
                <p className="tag">Balanced, BBQ-forward</p>
                <p className="menu-detail">Beef, onion rings, BBQ sauce, cheddar.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--neptune savory reveal-item"
              style={withRevealDelay("0.14s")}
            >
              <img src="/planets/neptune.PNG" alt="Neptune Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Neptune</h3>
                <p className="tag">Cool and refreshing</p>
                <p className="menu-detail">Fish or chicken, yogurt sauce, mint, lime.</p>
              </div>
            </article>

            <article
              className="menu-item menu-feature menu-feature--pluto savory reveal-item"
              data-planet="pluto"
              style={withRevealDelay("0.16s")}
            >
              <img src="/planets/pluto.PNG" alt="Pluto Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Pluto</h3>
                <p className="tag">Deep, mysterious, sweet-salty</p>
                <p className="menu-detail">Beef, black garlic sauce, sesame.</p>
              </div>
            </article>

            <article className="menu-item menu-feature savory reveal-item" style={withRevealDelay("0.18s")}>
              <img src="/planets/sirius.PNG" alt="Sirius Burger" loading="lazy" />
              <div className="menu-copy">
                <p className="menu-type">Savory Burger</p>
                <h3>Sirius</h3>
                <p className="tag">Rich, caramel-smoky</p>
                <p className="menu-detail">Premium beef, caramelized onion, BBQ sauce.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={withRevealDelay("0.2s")}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Aurora</h3>
                <p className="tag">Berry-cream, light</p>
                <p className="menu-detail">Soft bun, blueberry cream, lavender syrup.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={withRevealDelay("0.22s")}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Ice Comet</h3>
                <p className="tag">Cold, minty, creamy</p>
                <p className="menu-detail">Ice cream, mint, white chocolate.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={withRevealDelay("0.24s")}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Dark Matter</h3>
                <p className="tag">Chocolate, deep, sweet-salty</p>
                <p className="menu-detail">Chocolate ganache, sea salt, black bun.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={withRevealDelay("0.26s")}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Luna</h3>
                <p className="tag">Milky, delicate, creamy</p>
                <p className="menu-detail">White chocolate, coconut, cream.</p>
              </div>
            </article>

            <article className="menu-item sweet-line-item sweet reveal-item" style={withRevealDelay("0.28s")}>
              <div className="menu-copy">
                <p className="menu-type">Sweet Line</p>
                <h3>Cosmic Cloud</h3>
                <p className="tag">Airy, vanilla</p>
                <p className="menu-detail">Whipped cream, meringue, vanilla.</p>
              </div>
            </article>

            <article className="menu-item drink-item drinks reveal-item" style={withRevealDelay("0.3s")}>
              <div className="menu-copy">
                <p className="menu-type">Deep Space - Essential Five</p>
                <h3>Andromeda Elixir</h3>
                <p className="tag">Crew Crafted</p>
                <p className="menu-detail">
                  A deep violet berry drink lifted with fresh lime and a light cosmic sparkle.
                </p>
              </div>
            </article>

            <article className="menu-item drink-item drinks reveal-item" style={withRevealDelay("0.32s")}>
              <div className="menu-copy">
                <p className="menu-type">Deep Space - Essential Five</p>
                <h3>Orion Pulse</h3>
                <p className="tag">Blue citrus, mint, crushed ice</p>
                <p className="menu-detail">
                  Bright blue citrus with cool mint and crushed ice - sharp, clean and refreshing.
                </p>
              </div>
            </article>

            <article className="menu-item drink-item drinks reveal-item" style={withRevealDelay("0.34s")}>
              <div className="menu-copy">
                <p className="menu-type">Deep Space - Essential Five</p>
                <h3>Event Horizon</h3>
                <p className="tag">Black lime, ginger, bold</p>
                <p className="menu-detail">
                  A smooth black lime and ginger blend with a bold, slightly spicy finish.
                </p>
              </div>
            </article>

            <article className="menu-item drink-item drinks reveal-item" style={withRevealDelay("0.36s")}>
              <div className="menu-copy">
                <p className="menu-type">Deep Space - Essential Five</p>
                <h3>Dark Matter</h3>
                <p className="tag">Blackberry, blackcurrant, rich</p>
                <p className="menu-detail">
                  Blackberry and blackcurrant combined for a rich, dark and full-bodied flavour.
                </p>
              </div>
            </article>

            <article className="menu-item drink-item drinks reveal-item" style={withRevealDelay("0.38s")}>
              <div className="menu-copy">
                <p className="menu-type">Deep Space - Essential Five</p>
                <h3>Polaris Ice</h3>
                <p className="tag">Sparkling citrus, fresh zest</p>
                <p className="menu-detail">
                  Clear sparkling citrus with fresh zest - crisp, cold and effortlessly refined.
                </p>
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
            <article className="inside-shot reveal-item" style={withRevealDelay("0.03s")}>
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
            <article className="panel reveal-item" style={withRevealDelay("0.04s")}>
              <h3>Launch Access List</h3>
              <p>Get first access to launch day, menu drops, and limited offers.</p>
              <p id="crew-count" className="crew-count" aria-live="polite">
                No launch members have joined yet.
              </p>
            </article>

            <form className="panel crew-form reveal-item" id="crew-form" style={withRevealDelay("0.09s")}>
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
                <button className="btn btn-primary" type="submit">
                  Join the waitlist
                </button>
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
            <article className="panel reveal-item" style={withRevealDelay("0.03s")}>
              <h3>Brand Signal</h3>
              <p>One world. One story. One instantly recognizable format.</p>
              <ul>
                <li>Planet-led naming and signature visual language</li>
                <li>Premium dark cinematic identity</li>
                <li>Built for social and word-of-mouth pull</li>
              </ul>
            </article>

            <article className="panel reveal-item" style={withRevealDelay("0.07s")}>
              <h3>Demand Engine</h3>
              <ul>
                <li>Primary CTA: Join the waitlist</li>
                <li>Secondary CTA: Explore the menu</li>
                <li>Direct investor WhatsApp routing</li>
              </ul>
            </article>

            <article className="panel reveal-item" style={withRevealDelay("0.11s")}>
              <h3>Reality Check</h3>
              <p>Opening: Soon. Location details: TBD. Prices: TBD.</p>
            </article>

            <article className="panel reveal-item" style={withRevealDelay("0.15s")}>
              <h3>Direct Contact</h3>
              <p>Share details and intent. We continue directly on WhatsApp.</p>
              <div className="form-actions">
                <button className="btn btn-ghost" type="button" data-open-investor-modal>
                  Contact on WhatsApp
                </button>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>UFO BURGER - Built to attract demand, loyalty, and serious partners before opening day.</p>
      </footer>

      <div className="investor-modal" id="investor-modal" hidden>
        <div className="investor-modal__overlay" data-close-investor-modal></div>

        <section
          className="investor-modal__dialog panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="investor-modal-title"
        >
          <button className="investor-modal__close" type="button" data-close-investor-modal>
            Close
          </button>

          <h2 id="investor-modal-title">Investor Contact</h2>
          <p className="section-subtitle">SEND YOUR DETAILS TO WHATSAPP</p>

          <form id="investor-form" className="crew-form">
            <label htmlFor="investor-name">YOUR NAME</label>
            <input
              id="investor-name"
              name="name"
              type="text"
              minLength={2}
              maxLength={80}
              autoComplete="name"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="investor-type">LEAD TYPE</label>
            <select id="investor-type" name="leadType" defaultValue="Investor" required>
              <option value="Investor">Investor</option>
              <option value="Partner">Partner</option>
              <option value="Customer">Customer</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="investor-email">EMAIL ADDRESS</label>
            <input
              id="investor-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
            />

            <label htmlFor="investor-phone">PHONE / WHATSAPP</label>
            <input
              id="investor-phone"
              name="phone"
              type="tel"
              minLength={6}
              maxLength={30}
              autoComplete="tel"
              placeholder="+44..."
              required
            />

            <label htmlFor="investor-company">COMPANY (OPTIONAL)</label>
            <input
              id="investor-company"
              name="company"
              type="text"
              maxLength={80}
              autoComplete="organization"
              placeholder="Your company name"
            />

            <label htmlFor="investor-message">MESSAGE (OPTIONAL)</label>
            <textarea
              id="investor-message"
              name="message"
              rows={4}
              maxLength={500}
              placeholder="Tell us what kind of partnership or investment you are looking for..."
            ></textarea>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                Send via WhatsApp
              </button>
            </div>

            <p className="form-note">Your details will be prepared in WhatsApp before sending.</p>
            <p id="investor-form-status" className="form-status" role="status" aria-live="polite"></p>
          </form>
        </section>
      </div>
    </>
  );
}

function BodyWhatsappDataSetter({ value }: { value: string }) {
  useEffect(() => {
    document.body.dataset.investorWhatsapp = value;
  }, [value]);

  return null;
}
