import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CeilingType } from "@/lib/data";
import { img } from "@/lib/img";

const BADGES: Record<string, { label: string; cls: string } | undefined> = {
  glossy:    { label: "Хит",       cls: "badge-ink" },
  floating:  { label: "Премиум",   cls: "badge-gold" },
  photoprint:{ label: "Уникально", cls: "badge-line backdrop-blur" },
  starsky:   { label: "Дети",      cls: "badge-line backdrop-blur" },
};

export default function TypeCard({ t, large = false }: { t: CeilingType; large?: boolean }) {
  const badge = BADGES[t.id];
  return (
    <Link href={`/services#${t.id}`} className={`group block relative overflow-hidden rounded-2xl ${large ? "lg:col-span-2" : ""}`}>
      <div className={`overflow-hidden bg-cream relative ${large ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
        <img src={img(t.image)} alt={t.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        {badge && <span className={`badge ${badge.cls} absolute top-4 left-4 z-10`}>{badge.label}</span>}
        <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg/15 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all"><ArrowUpRight size={16} className="text-bg" /></span>
        <div className="absolute bottom-5 left-5 right-5 text-bg">
          <div className="text-[11px] uppercase tracking-[0.18em] text-gold mb-1.5">от {t.pricePerM2} ₽/м²</div>
          <div className={`serif ${large ? "text-4xl lg:text-5xl" : "text-2xl"} leading-tight mb-1.5`}>{t.title}</div>
          {large && <p className="text-bg/75 text-sm max-w-md leading-relaxed">{t.short}</p>}
        </div>
      </div>
    </Link>
  );
}
