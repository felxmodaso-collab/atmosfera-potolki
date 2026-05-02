import { Star, ExternalLink } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

const SOURCE_LINKS: Record<string, string> = {
  "Яндекс.Карты": "https://yandex.ru/maps/?text=атмосфера+натяжные+потолки",
  "2GIS": "https://2gis.ru/moscow/search/атмосфера%20натяжные%20потолки",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}

export default function Testimonials() {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <article key={i} className="card p-8 lg:p-10 relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              {t.source && (
                <a
                  href={SOURCE_LINKS[t.source] || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.16em] text-muted hover:text-ink transition-colors flex items-center gap-1"
                >
                  {t.source} <ExternalLink size={10} />
                </a>
              )}
            </div>
            <blockquote className="text-graphite text-lg leading-relaxed mb-6">«{t.text}»</blockquote>
            <footer className="text-sm text-muted pt-5 border-t border-line flex items-center justify-between">
              <span>{t.name}</span>
              {t.date && <span className="text-[11px] tabular text-muted/70">{formatDate(t.date)}</span>}
            </footer>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
        <a href={SOURCE_LINKS["Яндекс.Карты"]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ink transition-colors">
          <span className="font-semibold tabular text-ink">4.9 / 5</span>
          <span>·</span>
          <span>247 отзывов на Яндекс.Картах</span>
          <ExternalLink size={12} />
        </a>
        <span className="hidden md:inline text-muted/40">·</span>
        <a href={SOURCE_LINKS["2GIS"]} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ink transition-colors">
          <span className="font-semibold tabular text-ink">4.9</span>
          <span>·</span>
          <span>89 отзывов на 2GIS</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </>
  );
}
