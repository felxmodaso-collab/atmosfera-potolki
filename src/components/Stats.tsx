import { Award, Sparkles, ShieldCheck, Star } from "lucide-react";

const ITEMS = [
  { value: "11",      suffix: "лет",  label: "На рынке Москвы и МО",     icon: <Award size={20} strokeWidth={1.4} /> },
  { value: "3 800",   suffix: "+",    label: "Установленных потолков",   icon: <Sparkles size={20} strokeWidth={1.4} /> },
  { value: "12",      suffix: "лет",  label: "Гарантия на полотно",      icon: <ShieldCheck size={20} strokeWidth={1.4} /> },
  { value: "4.9 / 5", suffix: "",     label: "Средний рейтинг отзывов",  icon: <Star size={20} strokeWidth={1.4} /> },
] as const;

export default function Stats() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line">
      {ITEMS.map((it, i) => (
        <div key={i} className="bg-bg p-7 lg:p-8">
          <div className="text-accent mb-5">{it.icon}</div>
          <div className="text-5xl lg:text-6xl font-light leading-none tabular">
            {it.value}{it.suffix && <span className="text-accent">{it.suffix}</span>}
          </div>
          <div className="text-sm text-muted mt-3 leading-snug">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
