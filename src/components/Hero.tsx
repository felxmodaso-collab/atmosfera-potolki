"use client";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, ShieldCheck, Clock, Award } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { img } from "@/lib/img";
import { useContactModal } from "./ContactProvider";

export default function Hero() {
  const { open } = useContactModal();

  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden pt-32 pb-12">
      <div className="absolute inset-0 -z-10">
        <img src={img("/images/hero/main.jpg")} alt="" className="hero-image w-full h-full object-cover" aria-hidden />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute -top-20 -left-20 w-96 h-96 glow-gold opacity-40" />
        <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] glow-coral opacity-20" />
      </div>

      <div className="container-x relative z-10 grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-end">
        <div className="text-bg fade-up">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="badge badge-coral"><Sparkles size={12} /> Скидка 10% по квизу</span>
            <span className="badge badge-line"><ShieldCheck size={12} /> Гарантия 12 лет</span>
            <span className="badge badge-line"><Clock size={12} /> Монтаж за 1 день</span>
          </div>

          <h1 className="serif text-mega mb-7">
            Натяжной&nbsp;потолок<br />
            <span className="italic text-gold">премиум-уровня</span> —<br />
            за один день.
          </h1>

          <p className="text-lg md:text-xl text-bg/80 mb-9 max-w-2xl leading-relaxed">
            Полный цикл — от замера до сдачи под ключ. Цена&nbsp;в&nbsp;договоре, бесшовное полотно до&nbsp;5,1&nbsp;м, чистый монтаж без пыли и переноса мебели.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/calculator" className="btn btn-accent !py-4 !px-7 text-base">
              Рассчитать стоимость <ArrowRight size={18} />
            </Link>
            <button onClick={() => open("measurer")} className="btn btn-light !py-4 !px-7 text-base">
              Замер бесплатно
            </button>
            <a href={`tel:${COMPANY.phoneRaw}`} className="hidden md:inline-flex items-center gap-2 px-4 text-bg ulink">
              <Phone size={18} /> {COMPANY.phone}
            </a>
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-3">
          <FloatStat icon={<Award size={22} />} value="11 лет" label="на рынке Москвы и МО" tint="accent" />
          <FloatStat icon={<Sparkles size={22} />} value="3 800+" label="установленных потолков" tint="gold" />
          <FloatStat icon={<ShieldCheck size={22} />} value="12 лет" label="гарантия на полотно" tint="teal" />
          <FloatStat icon={<Clock size={22} />} value="4.9 / 5" label="средний рейтинг отзывов" tint="coral" />
        </aside>
      </div>
    </section>
  );
}

function FloatStat({ icon, value, label, tint }: { icon: React.ReactNode; value: string; label: string; tint: "accent" | "gold" | "teal" | "coral" }) {
  const colorMap = {
    accent: "bg-accent/90",
    gold: "bg-gold/90",
    teal: "bg-teal/90",
    coral: "bg-coral/90",
  };
  return (
    <div className="float-tile rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${colorMap[tint]} text-white flex items-center justify-center shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <div className="serif text-3xl leading-none">{value}</div>
        <div className="text-xs uppercase tracking-[0.14em] text-muted mt-1">{label}</div>
      </div>
    </div>
  );
}
