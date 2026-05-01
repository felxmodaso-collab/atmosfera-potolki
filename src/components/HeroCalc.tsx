"use client";
import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { TYPES } from "@/lib/data";

const QUICK_TYPES = TYPES.slice(0, 4);
const FEATURES = [
  { id: "led-cove", label: "LED-карниз", price: 1200, unit: "perimeter" as const },
  { id: "spot-led", label: "Точечные светильники", price: 4800, unit: "fixed" as const },
  { id: "moisture", label: "Влагостойкое", price: 180, unit: "area" as const },
];

export default function HeroCalc() {
  const [area, setArea] = useState(20);
  const [typeId, setTypeId] = useState(QUICK_TYPES[0].id);
  const [opts, setOpts] = useState<Record<string, boolean>>({});

  const total = useMemo(() => {
    const t = QUICK_TYPES.find((x) => x.id === typeId)!;
    let sum = area * t.pricePerM2;
    for (const f of FEATURES) {
      if (!opts[f.id]) continue;
      if (f.unit === "perimeter") sum += Math.round(Math.sqrt(area) * 4) * f.price;
      if (f.unit === "fixed") sum += f.price;
      if (f.unit === "area") sum += area * f.price;
    }
    return Math.round(sum);
  }, [area, typeId, opts]);

  const final = Math.round(total * 0.9);

  return (
    <div className="rounded-3xl bg-bg p-7 md:p-8 shadow-deep relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="serif text-2xl leading-none">Расчёт за 30 секунд</div>
          <div className="text-xs uppercase tracking-[0.18em] text-muted mt-1.5">+ скидка 10% по форме</div>
        </div>
        <span className="badge badge-coral"><Sparkles size={12} /> -10%</span>
      </div>

      <label className="flex items-baseline justify-between text-sm font-medium mb-2">
        <span>Площадь</span>
        <span className="text-muted">{area} м²</span>
      </label>
      <input
        type="range"
        min={5}
        max={120}
        value={area}
        onChange={(e) => setArea(+e.target.value)}
        className="w-full appearance-none bg-line h-1 rounded-full accent-accent mb-6"
        style={{ accentColor: "#B8946A" }}
      />

      <label className="block text-sm font-medium mb-2">Тип потолка</label>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {QUICK_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTypeId(t.id)}
            className={`text-left px-3.5 py-3 rounded-xl border text-sm transition-all ${typeId === t.id ? "bg-ink text-bg border-ink" : "border-line hover:border-ink/40 bg-bg"}`}
          >
            <div className="font-medium">{t.title}</div>
            <div className={`text-[11px] mt-0.5 ${typeId === t.id ? "text-bg/60" : "text-muted"}`}>от {t.pricePerM2} ₽/м²</div>
          </button>
        ))}
      </div>

      <label className="block text-sm font-medium mb-2">Дополнительно</label>
      <div className="space-y-1.5 mb-6">
        {FEATURES.map((f) => {
          const active = !!opts[f.id];
          return (
            <button
              key={f.id}
              onClick={() => setOpts({ ...opts, [f.id]: !active })}
              className={`flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all ${active ? "bg-accent/10 border-accent text-ink" : "border-line hover:border-ink/40 bg-bg text-ink"}`}
            >
              <span className="flex items-center gap-2.5 font-medium">
                <span className={`w-4 h-4 rounded border-2 shrink-0 ${active ? "bg-accent border-accent" : "border-line bg-white"}`} />
                {f.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-ink text-bg -mx-7 md:-mx-8 -mb-7 md:-mb-8 px-7 md:px-8 py-6 mt-6">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs uppercase tracking-[0.18em] text-bg/60">Итого со скидкой</span>
          <span className="text-xs text-bg/40 line-through">{total.toLocaleString("ru")} ₽</span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div className="serif text-5xl leading-none">{final.toLocaleString("ru")} ₽</div>
          <a href="#quiz" className="btn btn-accent !py-3 !px-5 text-sm">Заявка <ArrowRight size={15} /></a>
        </div>
      </div>
    </div>
  );
}
