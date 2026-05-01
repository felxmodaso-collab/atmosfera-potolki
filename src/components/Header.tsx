"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { COMPANY, NAV } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

export default function Header() {
  const { open } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,248,244,.94)" : "rgba(14,15,17,.0)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,221,211,.6)" : "1px solid transparent",
      }}
    >
      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 leading-none">
          <span className={`serif text-2xl tracking-tight transition-colors ${scrolled ? "text-ink" : "text-bg"}`}>АТМОСФЕРА</span>
          <span className={`hidden sm:inline text-[10px] uppercase tracking-[0.2em] transition-colors ${scrolled ? "text-muted" : "text-bg/60"}`}>натяжные потолки</span>
        </Link>

        <nav className={`hidden lg:flex items-center gap-7 text-sm transition-colors ${scrolled ? "text-graphite" : "text-bg/85"}`}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="ulink hover:text-current transition-colors">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={`tel:${COMPANY.phoneRaw}`} className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${scrolled ? "text-ink" : "text-bg"}`}>
            <Phone size={16} /> {COMPANY.phone}
          </a>
          <button onClick={() => open("measurer")} className={`btn !py-2.5 !px-4 text-sm ${scrolled ? "btn-primary" : "btn-light"}`}>
            <Calendar size={15} /> Замер 0₽
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${scrolled ? "border-line bg-bg" : "border-bg/40 bg-bg/10 text-bg backdrop-blur"}`}
            aria-label="Меню"
          ><Menu size={18} /></button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-bg" onClick={() => setMenuOpen(false)}>
          <div className="container-x py-6 flex items-center justify-between">
            <span className="serif text-2xl">АТМОСФЕРА</span>
            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 rounded-full border border-line flex items-center justify-center" aria-label="Закрыть"><X size={18} /></button>
          </div>
          <nav className="container-x flex flex-col gap-1 py-8">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="serif text-2xl border-b border-line py-4">{n.label}</Link>
            ))}
            <a href={`tel:${COMPANY.phoneRaw}`} className="serif text-2xl border-b border-line py-4 flex items-center gap-3"><Phone size={20} /> {COMPANY.phone}</a>
          </nav>
        </div>
      )}
    </header>
  );
}
