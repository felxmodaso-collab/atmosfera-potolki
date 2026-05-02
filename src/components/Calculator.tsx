"use client";
import { useMemo, useState } from "react";
import { Sparkles, Check } from "lucide-react";
import { TYPES, ROOM_PRESETS, PRICE_OPTIONS } from "@/lib/data";
import { useContactModal } from "./ContactProvider";

const VISIBLE_OPT_IDS = ["led-cove", "led-rgb", "spot", "spot-led", "chandelier", "transition", "moisture", "demount"];

const PRICE_FN_DEMOUNT = (a: number) => a * 250;
const PRICE_FN: Record<string, (area: number, perimeter: number) => number> = {
  "led-cove":   (_a, p) => p * 1200,
  "led-rgb":    (_a, p) => p * 1800,
  "spot":       (a)     => 350 * Math.max(4, Math.round(a / 4)),
  "spot-led":   (a)     => 950 * Math.max(4, Math.round(a / 4)),
  "chandelier": ()      => 1200,
  "moisture":   (a)     => a * 180,
  "transition": (_a, p) => p * 2100,
  "demount":    (a)     => PRICE_FN_DEMOUNT(a),
};

export default function Calculator() {
  const { open } = useContactModal();
  const [room, setRoom] = useState(ROOM_PRESETS[2].id);
  const [area, setArea] = useState(ROOM_PRESETS[2].area);
  const [typeId, setTypeId] = useState(TYPES[0].id);
  const [opts, setOpts] = useState<Record<string, boolean>>({});
  const [perimeter, setPerimeter] = useState(20);

  const onPreset = (id: string) => {
    setRoom(id);
    const preset = ROOM_PRESETS.find((p) => p.id === id);
    if (preset) {
      setArea(preset.area);
      setPerimeter(Math.round(Math.sqrt(preset.area) * 4));
    }
  };

  const total = useMemo(() => {
    const t = TYPES.find((x) => x.id === typeId)!;
    let sum = area * t.pricePerM2;
    for (const id of Object.keys(opts)) {
      if (opts[id] && PRICE_FN[id]) sum += PRICE_FN[id](area, perimeter);
    }
    return Math.round(sum);
  }, [area, typeId, opts, perimeter]);

  const visibleOpts = PRICE_OPTIONS.filter((o) => VISIBLE_OPT_IDS.includes(o.id));

  const discount = Math.round(total * 0.1);
  const final = total - discount;

  return (
    <div className="card !rounded-3xl p-6 md:p-10 grid lg:grid-cols-[1fr_400px] gap-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-80 h-80 glow-gold opacity-50 pointer-events-none" />
      <div className="space-y-7 relative">
        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted mb-3">1 · Тип помещения</label>
          <div className="flex flex-wrap gap-2">
            {ROOM_PRESETS.map((r) => (
              <button
                key={r.id}
                onClick={() => onPreset(r.id)}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${room === r.id ? "bg-ink text-bg border-ink shadow-soft" : "border-line hover:border-ink"}`}
              >{r.label}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-muted mb-2">2 · Площадь, м²</label>
            <input type="number" min={3} max={500} value={area} onChange={(e) => setArea(+e.target.value)} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.16em] text-muted mb-2">3 · Периметр, м.п.</label>
            <input type="number" min={4} max={300} value={perimeter} onChange={(e) => setPerimeter(+e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted mb-3">4 · Тип потолка</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeId(t.id)}
                className={`text-left px-4 py-3.5 rounded-xl border text-sm transition-all ${typeId === t.id ? "bg-ink text-bg border-ink" : "border-line hover:border-ink/50 bg-bg"}`}
              >
                <div className="font-medium">{t.title}</div>
                <div className={`text-xs mt-0.5 ${typeId === t.id ? "text-bg/60" : "text-muted"}`}>от {t.pricePerM2} ₽/м²</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-[0.16em] text-muted mb-3">5 · Дополнительно</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {visibleOpts.map((o) => {
              const active = !!opts[o.id];
              return (
                <label key={o.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${active ? "bg-accent/10 border-accent" : "border-line hover:border-ink/40 bg-bg"}`}>
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition ${active ? "bg-accent text-white" : "border border-line"}`}>
                    {active && <Check size={13} strokeWidth={3} />}
                  </span>
                  <input type="checkbox" checked={active} onChange={(e) => setOpts({ ...opts, [o.id]: e.target.checked })} className="hidden" />
                  <div className="flex-1 text-sm">
                    <div>{o.name}</div>
                    <div className="text-xs text-muted">{o.price}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="bg-ink text-bg rounded-2xl p-7 lg:p-8 self-start sticky top-24 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-10 w-64 h-64 glow-coral opacity-30 pointer-events-none" />
        <div className="eyebrow eyebrow-light mb-3">Расчёт</div>
        <div className="serif text-5xl mb-1 leading-none">{final.toLocaleString("ru")} ₽</div>
        <div className="flex items-center gap-2 text-sm text-bg/70 mb-6 mt-2">
          <span className="line-through">{total.toLocaleString("ru")} ₽</span>
          <span className="badge badge-discount"><Sparkles size={11} /> -10%</span>
        </div>
        <div className="space-y-2 text-sm border-t border-bg/15 pt-4 mb-6">
          <Row label="Площадь" value={`${area} м²`} />
          <Row label="Тип" value={TYPES.find((t) => t.id === typeId)!.title} />
          <Row label="Периметр" value={`${perimeter} м.п.`} />
          {Object.entries(opts).filter(([_, v]) => v).map(([k]) => (
            <Row key={k} label={PRICE_OPTIONS.find((p) => p.id === k)!.name} value="✓" />
          ))}
        </div>
        <button onClick={() => open("lead")} className="btn btn-accent w-full !py-4">Зафиксировать цену</button>
        <p className="text-xs text-bg/55 mt-3 text-center">Ориентировочный расчёт. Финальная цена — после замера.</p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-bg/60">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
