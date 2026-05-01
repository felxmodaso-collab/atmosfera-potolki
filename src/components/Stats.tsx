import { Award, Sparkles, ShieldCheck, Star } from "lucide-react";

const ITEMS = [
  { value: "11",      suffix: "лет",  label: "На рынке Москвы и МО",     icon: <Award size={18} strokeWidth={1.4} /> },
  { value: "3 800",   suffix: "+",    label: "Установленных потолков",   icon: <Sparkles size={18} strokeWidth={1.4} /> },
  { value: "12",      suffix: "лет",  label: "Гарантия на полотно",      icon: <ShieldCheck size={18} strokeWidth={1.4} /> },
  { value: "4.9 / 5", suffix: "",     label: "Средний рейтинг отзывов",  icon: <Star size={18} strokeWidth={1.4} /> },
] as const;

export default function Stats() {
  return (
    <div className="bg-white rounded-3xl shadow-card border border-line overflow-hidden">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:[&>:nth-child(2n)]:border-l lg:divide-x divide-line sm:divide-y-0">
        {ITEMS.map((it, i) => (
          <div key={i} className="p-7 lg:p-9 relative">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted mb-6">
              <span className="text-accent">{it.icon}</span>
              <span>{it.label}</span>
            </div>
            <div className="text-5xl lg:text-6xl font-light leading-none tabular">
              {it.value}{it.suffix && <span className="text-accent ml-1">{it.suffix}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
