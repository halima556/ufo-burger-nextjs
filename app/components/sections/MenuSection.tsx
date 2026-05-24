"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

function MenuCard({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: MenuItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const d = `${(0.02 + index * 0.02).toFixed(2)}s`;
  const isSavory = item.category === "savory";
  const isSweet = item.category === "sweet";
  const isDrink = item.category === "drinks";

  const classes = [
    "menu-item",
    "reveal-item",
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
      onClick={isSavory ? onToggle : undefined}
      onKeyDown={
        isSavory
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }
          : undefined
      }
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
  const [openId, setOpenId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === active);

  useEffect(() => {
    setOpenId(null);
  }, [active]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    grid.querySelectorAll<HTMLElement>(".reveal-item").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("is-visible");
      } else {
        el.classList.remove("is-visible");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [filtered]);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
    setTimeout(() => {
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".reveal-item")
        .forEach((el) => el.classList.add("is-visible"));
    }, 10);
  };

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

      <div className="menu-grid" ref={gridRef}>
        {filtered.map((item, i) => (
          <MenuCard
            key={item.id}
            item={item}
            index={i}
            isOpen={openId === item.id}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
}
