"use client";

import { useState, type CSSProperties } from "react";
import { MENU_ITEMS } from "@/app/lib/constants";
import type { MenuCategory, MenuItem } from "@/app/types";

type RevealStyle = CSSProperties & Record<"--reveal-delay", string>;
const delay = (d: string): RevealStyle => ({ "--reveal-delay": d });

const TABS: { label: string; value: MenuCategory }[] = [
  { label: "All", value: "all" },
  { label: "Savory Burgers", value: "savory" },
  { label: "Sweet Line", value: "sweet" },
  { label: "Drinks", value: "drinks" },
];

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const d = `${(0.02 + index * 0.02).toFixed(2)}s`;
  const isSavory = item.category === "savory";
  const isSweet = item.category === "sweet";
  const isDrink = item.category === "drinks";

  const classes = [
    "menu-item",
    "reveal-item",
    "is-visible",
    isSavory && "menu-feature",
    isSavory && item.planetClass,
    isSavory && isOpen && "is-open",
    isSweet && "sweet-line-item",
    isDrink && "drink-item",
    item.category,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={classes}
      style={delay(d)}
      role={isSavory ? "button" : undefined}
      tabIndex={isSavory ? 0 : undefined}
      onClick={() => isSavory && setIsOpen((v) => !v)}
      onKeyDown={(e) => {
        if (isSavory && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setIsOpen((v) => !v);
        }
      }}
    >
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.name} loading="lazy" />
      )}
      <div className="menu-copy">
        <p className="menu-type">{item.type}</p>
        <h3>{item.name}</h3>
        <p className="tag">{item.tag}</p>
        <p className="menu-detail">{item.detail}</p>
      </div>
    </article>
  );
}

export function MenuSection() {
  const [active, setActive] = useState<MenuCategory>("all");

  const filtered =
    active === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === active);

  return (
    <section id="menu" className="section section-menu">
      <div className="section-head">
        <p className="kicker">03</p>
        <h2>Galaxy Menu</h2>
        <p className="section-subtitle">
          DESIGNED TO ATTRACT CUSTOMERS AND INVESTORS
        </p>
      </div>

      <div className="menu-switch" aria-label="Menu categories">
        {TABS.map(({ label, value }) => (
          <button
            key={value}
            className="tab-btn"
            type="button"
            aria-pressed={active === value}
            onClick={() => setActive(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
