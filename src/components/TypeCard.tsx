import Link from "next/link";
import type { CeilingType } from "@/lib/data";
import { img } from "@/lib/img";

export default function TypeCard({ t, compact = false }: { t: CeilingType; compact?: boolean }) {
  return (
    <Link href={`/services#${t.id}`} className="card group block">
      <div className="aspect-[4/3] overflow-hidden bg-cream">
        <img
          src={img(t.image)}
          alt={t.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="serif text-2xl">{t.title}</h3>
          <div className="text-sm text-muted whitespace-nowrap">от {t.pricePerM2} ₽/м²</div>
        </div>
        {!compact && <p className="text-muted text-sm leading-relaxed">{t.short}</p>}
      </div>
    </Link>
  );
}
