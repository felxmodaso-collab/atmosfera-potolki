"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Clock, Sparkles, ChevronRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { img } from "@/lib/img";
import { useContactModal } from "./ContactProvider";

export default function Hero() {
  const { open } = useContactModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reveal = () => setVideoReady(true);
    if (v.readyState >= 2) {
      reveal();
    } else {
      v.addEventListener("loadeddata", reveal);
      v.addEventListener("canplay", reveal);
      v.load();
    }
    return () => {
      v.removeEventListener("loadeddata", reveal);
      v.removeEventListener("canplay", reveal);
    };
  }, []);

  return (
    <section className="relative pt-32 lg:pt-40 pb-14 lg:pb-20 text-bg overflow-hidden" style={{ background: "#0E0F11" }}>
      <div className="absolute inset-0">
        <img
          src={img("/images/hero/main.jpg")}
          alt=""
          aria-hidden
          className={`hero-image w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={img("/images/hero/main.jpg")}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          <source src={img("/videos/hero.mp4")} type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.45) 0%, rgba(14,15,17,.15) 45%, rgba(14,15,17,.6) 80%, rgba(14,15,17,.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,15,17,.6) 0%, rgba(14,15,17,0) 60%)" }} />
      </div>

      <div className="container-x relative z-10 grid lg:grid-cols-[1.1fr_auto] gap-10 items-start">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <span className="badge badge-discount"><Sparkles size={12} /> Скидка 10% при заявке сегодня</span>
          </div>

          <h1 className="text-[clamp(2.6rem,6.2vw,5.8rem)] leading-[0.96] tracking-[-0.025em] font-light mb-7">
            Натяжной потолок
            <br />
            <span className="serif italic text-gold font-normal">премиум-уровня</span>
            <br />
            <span className="font-medium">в Москве и МО</span>
          </h1>

          <p className="text-lg md:text-xl text-bg/75 max-w-xl mb-10 leading-relaxed">
            Замер бесплатно. Цена в договоре. Бесшовное полотно до 5,1 м, чистый монтаж за один день. Гарантия 12 лет.
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-12">
            <button onClick={() => open("measurer")} className="btn btn-gold !py-4 !px-8 text-base shadow-deep">
              Вызвать замерщика бесплатно <ArrowRight size={18} />
            </button>
            <Link href="/calculator" className="btn !py-4 !px-7 text-base text-bg border border-bg/30 hover:bg-bg/10 transition">
              Рассчитать стоимость <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-2 self-end mt-32">
          <Pillar icon={<ShieldCheck size={16} className="text-gold" />} text="Гарантия 12 лет" />
          <Pillar icon={<Clock size={16} className="text-gold" />} text="Монтаж за 1 день" />
          <Pillar icon={<Phone size={16} className="text-gold" />} text={COMPANY.phone} href={`tel:${COMPANY.phoneRaw}`} />
        </aside>
      </div>

      <div className="container-x relative z-10 mt-12 lg:mt-20">
        <div className="grid grid-cols-3 gap-x-8 gap-y-3 max-w-3xl pt-8 border-t border-bg/15 tabular">
          <Stat value="11" suffix="лет" label="на рынке Москвы" />
          <Stat value="3 800" suffix="+" label="установленных потолков" />
          <Stat value="4.9 / 5" label="средний рейтинг отзывов" />
        </div>
      </div>
    </section>
  );
}

function Pillar({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const inner = (
    <span className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.08] border border-white/10 text-sm whitespace-nowrap backdrop-blur">
      {icon} <span className="text-bg/90">{text}</span>
    </span>
  );
  return href ? <a href={href} className="block hover:bg-white/[0.12] rounded-full transition">{inner}</a> : inner;
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
