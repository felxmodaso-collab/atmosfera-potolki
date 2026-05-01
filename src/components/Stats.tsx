import { Award, Sparkles, ShieldCheck, Star } from "lucide-react";

const ITEMS = [
  { value: "11 лет",  label: "На рынке Москвы и МО",         icon: <Award size={26} />,       tint: "accent", glyph: "А" },
  { value: "3 800+",  label: "Установленных потолков",       icon: <Sparkles size={26} />,    tint: "gold",   glyph: "✦" },
  { value: "12 лет",  label: "Гарантия на полотно",          icon: <ShieldCheck size={26} />, tint: "teal",   glyph: "✓" },
  { value: "4.9 / 5", label: "Средний рейтинг отзывов",      icon: <Star size={26} fill="currentColor" />, tint: "coral", glyph: "★" },
] as const;

export default function Stats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
      {ITEMS.map((it, i) => (
        <div key={i} className="stat-tile">
          <span className="glyph">{it.glyph}</span>
          <div className={`w-12 h-12 rounded-xl mb-5 flex items-center justify-center text-white ${
            it.tint === "accent" ? "bg-accent" :
            it.tint === "gold" ? "bg-gold" :
            it.tint === "teal" ? "bg-teal" : "bg-coral"
          }`}>{it.icon}</div>
          <div className="serif text-5xl mb-2 leading-none">{it.value}</div>
          <div className="text-sm text-muted leading-snug">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
