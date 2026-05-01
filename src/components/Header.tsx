"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { COMPANY, NAV } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

export default function Header() {
  const { open } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{
        background: scrolled ? "rgba(250,248,244,.92)" : "rgba(250,248,244,.0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,221,211,.6)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 leading-none">
          <span className="serif text-2xl tracking-tight">АТМОСФЕРА</span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.2em] text-muted">потолки</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-graphite hover:text-ink transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.phoneRaw}`} className="hidden md:flex items-center gap-2 text-sm font-medium text-ink">
            {COMPANY.phone}
          </a>
          <button onClick={() => open("measurer")} className="btn btn-primary !py-2.5 !px-4 text-sm">
            Замер бесплатно
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden btn btn-outline !py-2 !px-3 text-sm"
            aria-label="Меню"
          >☰</button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg" onClick={() => setMenuOpen(false)}>
          <div className="container-x py-6 flex items-center justify-between">
            <span className="serif text-2xl">АТМОСФЕРА</span>
            <button onClick={() => setMenuOpen(false)} className="text-3xl leading-none" aria-label="Закрыть">×</button>
          </div>
          <nav className="container-x flex flex-col gap-4 py-8 text-2xl serif">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="border-b border-line py-3">
                {n.label}
              </Link>
            ))}
            <a href={`tel:${COMPANY.phoneRaw}`} className="border-b border-line py-3">{COMPANY.phone}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
