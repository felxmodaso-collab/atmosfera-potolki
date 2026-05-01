"use client";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Clock, Award, Sparkles } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { img } from "@/lib/img";
import { useContactModal } from "./ContactProvider";
import HeroCalc from "./HeroCalc";

export default function Hero() {
  const { open } = useContactModal();

  return (
    <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 text-bg overflow-hidden" style={{ background: "#0E0F11" }}>
      <div className="absolute inset-0">
        <img src={img("/images/hero/main.jpg")} alt="" aria-hidden className="hero-image w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(14,15,17,.86) 0%, rgba(14,15,17,.55) 50%, rgba(14,15,17,.25) 100%)" }} />
      </div>

      <div className="container-x relative z-10 grid lg:grid-cols-[1.15fr_400px] gap-10 lg:gap-16 items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-7">
            <span className="badge badge-coral"><Sparkles size={12} /> Скидка 10% сегодня</span>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bg/60">
              <ShieldCheck size={14} className="text-gold" /> Гарантия 12 лет
            </span>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-bg/60">
              <Clock size={14} className="text-gold" /> Монтаж за 1 день
            </span>
          </div>

          <h1 className="text-[clamp(2.6rem,6.4vw,6rem)] leading-[0.96] tracking-[-0.025em] font-light mb-7">
            Натяжной потолок<br />
            <span className="serif italic text-gold">премиум-уровня</span><br />
            <span className="font-medium">в Москве и МО</span>
          </h1>

          <p className="text-lg md:text-xl text-bg/75 max-w-2xl mb-9 leading-relaxed">
            Цена в договоре, бесшовное полотно до 5,1 м, чистый монтаж без пыли и без переноса мебели. Замер бесплатно — даже если потом не закажете.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button onClick={() => open("measurer")} className="btn btn-accent !py-4 !px-7 text-base">
              Вызвать замерщика <ArrowRight size={18} />
            </button>
            <Link href="/calculator" className="btn !py-4 !px-7 text-base border border-bg/40 text-bg hover:bg-bg hover:text-ink transition">
              Все типы и цены
            </Link>
            <a href={`tel:${COMPANY.phoneRaw}`} className="hidden md:inline-flex items-center gap-2 px-3 ml-2 text-bg ulink">
              <Phone size={18} className="text-gold" /> {COMPANY.phone}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-3 max-w-xl pt-7 border-t border-bg/15">
            <Stat value="11 лет" label="на рынке" />
            <Stat value="3 800+" label="потолков" />
            <Stat value="4.9 / 5" label="отзывов" />
          </div>
        </div>

        <div className="relative">
          <HeroCalc />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="serif text-3xl leading-none">{value}</div>
      <div className="text-[11px] uppercase tracking-[0.16em] text-bg/55 mt-1.5">{label}</div>
    </div>
  );
}
