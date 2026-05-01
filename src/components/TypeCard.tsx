import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CeilingType } from "@/lib/data";
import { img } from "@/lib/img";

const BADGES: Record<string, { label: string; cls: string } | undefined> = {
  glossy:    { label: "Хит",       cls: "badge-coral" },
  floating:  { label: "Премиум",   cls: "badge-gold" },
  photoprint:{ label: "Уникально", cls: "badge-teal" },
  starsky:   { label: "Дети",      cls: "badge-sage" },
};

export default function TypeCard({ t, compact = false }: { t: CeilingType; compact?: boolean }) {
  const badge = BADGES[t.id];
  return (
    <Link href={`/services#${t.id}`} className="card group block relative">
      {badge && <span className={`badge ${badge.cls} absolute top-4 left-4 z-10`}>{badge.label}</span>}
      <div className="aspect-[4/3] overflow-hidden bg-cream media-zoom relative">
        <img src={img(t.image)} alt={t.title} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-bg/95 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
          <ArrowUpRight size={18} className="text-ink" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <h3 className="serif text-2xl">{t.title}</h3>
        </div>
        {!compact && <p className="text-muted text-sm leading-relaxed mb-4">{t.short}</p>}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-line">
          <span className="text-sm text-muted">от</span>
          <span className="serif text-2xl"><strong className="font-medium">{t.pricePerM2}</strong> ₽<span className="text-sm text-muted">/м²</span></span>
        </div>
      </div>
    </Link>
  );
}
