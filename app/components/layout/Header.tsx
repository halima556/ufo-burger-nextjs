"use client";

import { useNavDrawer } from "@/app/hooks/useNavDrawer";
import { NAV_LINKS } from "@/app/lib/constants";

interface HeaderProps {
  onInvestorClick: () => void;
}

export function Header({ onInvestorClick }: HeaderProps) {
  const { isOpen, close, toggle } = useNavDrawer();

  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand brand--glow">
          UFO BURGER
        </a>
        <button
          className={`nav-toggle${isOpen ? " is-open" : ""}`}
          type="button"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          aria-controls="main-nav-drawer"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          className={`main-nav-drawer${isOpen ? " is-open" : ""}`}
          id="main-nav-drawer"
          hidden={!isOpen}
        >
          <nav className="main-nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={close}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      {isOpen && (
        <button
          className="nav-backdrop is-open"
          type="button"
          aria-label="Close main menu"
          onClick={close}
        />
      )}
    </>
  );
}
