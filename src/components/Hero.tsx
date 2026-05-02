"use client";
import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { useContactModal } from "./ContactProvider";
import HeroVideo from "./HeroVideo";
import HeroCalc from "./HeroCalc";

export default function Hero() {
  const { open } = useContactModal();

  return (
    <section className="relative pt-36 lg:pt-52 pb-14 lg:pb-24 text-bg overflow-hidden" style={{ background: "#0E0F11" }}>
      <div className="absolute inset-0">
        <HeroVideo />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.45) 0%, rgba(14,15,17,.15) 45%, rgba(14,15,17,.6) 80%, rgba(14,15,17,.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,15,17,.7) 0%, rgba(14,15,17,.2) 55%, rgba(14,15,17,0) 100%)" }} />
      </div>

      <div className="container-x relative z-10 grid lg:grid-cols-[1.05fr_440px] gap-10 lg:gap-14 items-start">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <span className="badge badge-discount"><Sparkles size={12} /> Скидка 10% при заявке сегодня</span>
          </div>

          <h1 className="text-[clamp(2.6rem,6vw,5.4rem)] leading-[1.02] tracking-[-0.025em] font-light mb-7">
            <span className="block">Натяжной потолок</span>
            <span className="serif italic text-gold font-normal block">премиум-уровня</span>
            <span className="font-medium block">в Москве и МО</span>
          </h1>

          <p className="text-lg md:text-xl text-bg/75 max-w-xl mb-8 leading-relaxed">
            Замер бесплатно. Цена в договоре. Бесшовное полотно до 5,1 м, чистый монтаж за один день. Гарантия 12 лет.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button onClick={() => open("measurer")} className="btn btn-gold !py-4 !px-8 text-base shadow-deep">
              Вызвать замерщика <ArrowRight size={18} />
            </button>
            <Link href="/calculator" className="btn !py-4 !px-7 text-base text-bg border border-bg/30 hover:bg-bg/10 transition">
              Полный калькулятор <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-3 max-w-xl pt-7 border-t border-bg/15 tabular">
            <Stat value="11" suffix="лет" label="на рынке Москвы" />
            <Stat value="3 800" suffix="+" label="установленных потолков" />
            <Stat value="80+" label="ЖК Москвы и МО" />
          </div>
        </div>

        <aside className="hidden lg:block">
          <HeroCalc />
        </aside>
      </div>

      <svg
        className="absolute bottom-0 left-0 right-0 w-full block z-10 pointer-events-none"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        height="60"
        aria-hidden
      >
        <path
          d="M0,28 C240,52 480,8 720,24 C960,40 1200,56 1440,30 L1440,64 L0,64 Z"
          fill="#FFFFFF"
        />
      </svg>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-light leading-none">
        {value}{suffix && <span className="text-gold ml-1">{suffix}</span>}
      </div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-1.5">{label}</div>
    </div>
  );
}
