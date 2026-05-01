import { Sparkles } from "lucide-react";

const ITEMS = [
  "Замер бесплатно",
  "Цена в договоре",
  "Гарантия 12 лет",
  "Монтаж за 1 день",
  "200+ оттенков на складе",
  "3 800+ установленных потолков",
  "Чисто, без пыли",
  "Бесшовное полотно до 5,1 м",
];

export default function Marquee({ tone = "light" }: { tone?: "light" | "dark" | "accent" }) {
  const cls =
    tone === "dark" ? "bg-ink text-bg border-y border-white/10" :
    tone === "accent" ? "bg-accent text-white" :
    "bg-white text-graphite border-y border-line";

  return (
    <div className={`marquee py-4 relative ${cls}`}>
      <span className="absolute left-0 right-0 top-0 hairline-gold" />
      <span className="absolute left-0 right-0 bottom-0 hairline-gold" />
      <div className="marquee-track">
        {[0, 1].map((round) => (
          <div key={round} className="flex items-center gap-12 shrink-0">
            {ITEMS.map((it, i) => (
              <div key={`${round}-${i}`} className="flex items-center gap-3 text-sm uppercase tracking-[0.16em] font-medium">
                <Sparkles size={14} strokeWidth={1.5} />
                <span>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
