"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu, X, Phone, MapPin, Clock, ShieldCheck, FileSignature,
  LayoutGrid, ClipboardCheck, Calculator,
} from "lucide-react";
import { COMPANY, NAV } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

export default function Header() {
  const { open } = useContactModal();
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const [scrolled, setScrolled] = useState(!isHome);
  const [stripCollapsed, setStripCollapsed] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      setStripCollapsed(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      setStripCollapsed(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const dark = !scrolled;
  const navColor = dark ? "text-bg/85" : "text-graphite";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,248,244,.94)" : "rgba(14,15,17,.0)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,221,211,.6)" : "1px solid transparent",
      }}
    >
      {/* Уровень 1 — top info-strip */}
      <div
        className="hidden lg:block overflow-hidden transition-all duration-300 border-b"
        style={{
          height: stripCollapsed ? 0 : 36,
          opacity: stripCollapsed ? 0 : 1,
          background: dark ? "rgba(255,255,255,.06)" : "rgba(14,15,17,.04)",
          borderColor: dark ? "rgba(255,255,255,.08)" : "rgba(226,221,211,.5)",
        }}
      >
        <div className={`container-x h-9 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] ${dark ? "text-bg/70" : "text-muted"}`}>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> Шоурум · ул. Тверская 15</span>
            <span className="flex items-center gap-1.5"><Clock size={11} className="text-gold" /> Пн–Вс 9:00–22:00</span>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-gold transition-colors">{COMPANY.email}</a>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-gold" /> Гарантия 12 лет</span>
            <span className="flex items-center gap-1.5"><FileSignature size={11} className="text-gold" /> Договор в день замера</span>
          </div>
        </div>
      </div>

      {/* Уровень 2 — main bar: лого / CTA-кластер / телефон */}
      <div className="container-x flex items-center gap-3 lg:gap-6 py-3.5 lg:py-4">
        <Link href="/" className="flex items-center gap-2.5 leading-none shrink-0">
          <span aria-hidden className="hidden sm:inline-flex w-10 h-10 rounded-xl bg-ink text-bg items-center justify-center shadow-soft">
            <span className="serif text-xl leading-none">A</span>
          </span>
          <span className="flex flex-col gap-0.5">
            <span className={`serif text-xl lg:text-2xl tracking-tight transition-colors ${dark ? "text-bg" : "text-ink"}`}>АТМОСФЕРА</span>
            <span className={`hidden md:inline text-[10px] uppercase tracking-[0.2em] transition-colors ${dark ? "text-bg/60" : "text-muted"}`}>натяжные потолки</span>
          </span>
        </Link>

        {/* Центральный CTA-кластер — 3 кнопки */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
          <Link
            href="/services"
            className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
              dark
                ? "bg-bg text-ink hover:bg-gold"
                : "bg-ink text-bg hover:bg-gold hover:text-ink"
            }`}
          >
            <LayoutGrid size={16} /> Услуги
          </Link>
          <button
            onClick={() => open("lead")}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
              dark
                ? "border-bg/30 text-bg hover:bg-bg/10"
                : "border-line bg-bg text-ink hover:border-ink/40"
            }`}
          >
            <ClipboardCheck size={16} /> Оставить заявку
          </button>
          <Link
            href="/calculator"
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium border transition-all ${
              dark
                ? "border-bg/30 text-bg hover:bg-bg/10"
                : "border-line bg-bg text-ink hover:border-ink/40"
            }`}
          >
            <Calculator size={16} /> Калькулятор
          </Link>
        </div>

        {/* Правый кластер — телефон */}
        <div className="flex items-center gap-2.5 ml-auto lg:ml-0 shrink-0">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={`hidden md:flex flex-col items-end leading-tight transition-colors group ${dark ? "text-bg" : "text-ink"}`}
          >
            <span className="flex items-center gap-1.5 text-base lg:text-lg font-semibold tabular tracking-tight">
              <Phone size={15} className="text-gold" /> {COMPANY.phone}
            </span>
            <button
              onClick={(e) => { e.preventDefault(); open("callback"); }}
              className={`text-[11px] uppercase tracking-[0.16em] mt-0.5 hover:text-gold transition-colors ${dark ? "text-bg/60" : "text-muted"}`}
            >
              Заказать звонок
            </button>
          </a>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className={`md:hidden w-11 h-11 rounded-full border flex items-center justify-center transition ${dark ? "border-bg/40 bg-bg/10 text-bg backdrop-blur" : "border-line bg-bg text-ink"}`}
            aria-label="Позвонить"
          >
            <Phone size={16} />
          </a>
          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${dark ? "border-bg/40 bg-bg/10 text-bg backdrop-blur" : "border-line bg-bg"}`}
            aria-label="Меню"
          ><Menu size={18} /></button>
        </div>
      </div>

      {/* Уровень 3 — nav-row (всегда видим на desktop, на всех страницах) */}
      <div
        className="hidden lg:block border-t"
        style={{ borderColor: dark ? "rgba(255,255,255,.08)" : "rgba(226,221,211,.5)" }}
      >
        <nav className={`container-x h-10 flex items-center gap-7 text-sm transition-colors ${navColor}`}>
          {NAV.filter(n => n.label !== "Главная").map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative whitespace-nowrap transition-colors hover:text-gold ${active ? "text-gold" : ""}`}
              >
                {n.label}
                {active && <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-gold rounded-full" />}
              </Link>
            );
          })}
          <span className={`ml-auto text-[11px] uppercase tracking-[0.16em] flex items-center gap-1.5 ${dark ? "text-bg/55" : "text-muted"}`}>
            <ShieldCheck size={11} className="text-gold" /> 200+ оттенков на складе
          </span>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Меню" className="fixed inset-0 z-50 bg-bg overflow-y-auto" onClick={() => setMenuOpen(false)}>
          <div className="container-x py-6 flex items-center justify-between">
            <span className="serif text-2xl">АТМОСФЕРА</span>
            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 rounded-full border border-line flex items-center justify-center" aria-label="Закрыть"><X size={18} /></button>
          </div>
          <nav className="container-x flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="serif text-2xl border-b border-line py-4">{n.label}</Link>
            ))}
            <a href={`tel:${COMPANY.phoneRaw}`} className="serif text-2xl border-b border-line py-4 flex items-center gap-3"><Phone size={20} /> {COMPANY.phone}</a>
          </nav>
          <div className="container-x py-4 grid grid-cols-2 gap-2">
            <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); open("lead"); }} className="btn btn-primary !py-3.5 text-sm">
              <ClipboardCheck size={16} /> Оставить заявку
            </button>
            <button onClick={(e) => { e.stopPropagation(); setMenuOpen(false); open("callback"); }} className="btn btn-outline !py-3.5 text-sm">
              <Phone size={16} /> Заказать звонок
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
