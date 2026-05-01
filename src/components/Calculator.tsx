"use client";
import { useMemo, useState } from "react";
import { TYPES, ROOM_PRESETS, PRICE_OPTIONS } from "@/lib/data";

export default function Calculator() {
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
    if (opts["led-cove"]) sum += perimeter * 1200;
    if (opts["led-rgb"]) sum += perimeter * 1800;
    if (opts["spot-led"]) sum += 950 * Math.max(4, Math.round(area / 4));
    if (opts.chandelier) sum += 1200;
    if (opts.moisture) sum += area * 180;
    return Math.round(sum);
  }, [area, typeId, opts, perimeter]);

  const discount = Math.round(total * 0.1);
  const final = total - discount;

  return (
    <div className="card p-6 md:p-10 grid lg:grid-cols-[1fr_360px] gap-10">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-3">Тип помещения</label>
          <div className="flex flex-wrap gap-2">
            {ROOM_PRESETS.map((r) => (
              <button
                key={r.id}
                onClick={() => onPreset(r.id)}
                className={`px-4 py-2 rounded-full border text-sm transition-all ${room === r.id ? "bg-ink text-bg border-ink" : "border-line hover:border-ink"}`}
              >{r.label}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Площадь, м²</label>
            <input type="number" min={3} max={500} value={area} onChange={(e) => setArea(+e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Периметр, м.п.</label>
            <input type="number" min={4} max={300} value={perimeter} onChange={(e) => setPerimeter(+e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Тип потолка</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeId(t.id)}
                className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${typeId === t.id ? "bg-ink text-bg border-ink" : "border-line hover:border-ink"}`}
              >
                <div className="font-medium">{t.title}</div>
                <div className={`text-xs mt-0.5 ${typeId === t.id ? "text-bg/60" : "text-muted"}`}>от {t.pricePerM2} ₽/м²</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Дополнительно</label>
          <div className="grid sm:grid-cols-2 gap-2">
            {PRICE_OPTIONS.slice(0, 6).map((o) => (
              <label key={o.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-line hover:border-ink cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={!!opts[o.id]}
                  onChange={(e) => setOpts({ ...opts, [o.id]: e.target.checked })}
                  style={{ width: "18px", height: "18px", flexShrink: 0 }}
                />
                <div className="flex-1 text-sm">
                  <div>{o.name}</div>
                  <div className="text-xs text-muted">{o.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <aside className="bg-cream rounded-2xl p-6 lg:p-8 self-start sticky top-24">
        <div className="eyebrow mb-3">Расчёт</div>
        <div className="serif text-5xl mb-1">{final.toLocaleString("ru")} ₽</div>
        <div className="text-sm text-muted mb-6">
          без скидки <s>{total.toLocaleString("ru")} ₽</s> · скидка 10% при заявке сегодня
        </div>
        <div className="space-y-2 text-sm border-t border-line pt-4 mb-6">
          <Row label="Площадь" value={`${area} м²`} />
          <Row label="Тип" value={TYPES.find((t) => t.id === typeId)!.title} />
          <Row label="Периметр" value={`${perimeter} м.п.`} />
          {Object.entries(opts).filter(([_, v]) => v).map(([k]) => (
            <Row key={k} label={PRICE_OPTIONS.find((p) => p.id === k)!.name} value="✓" />
          ))}
        </div>
        <a href="#quiz" className="btn btn-primary w-full">Зафиксировать цену</a>
        <p className="text-xs text-muted mt-3 text-center">Ориентировочный расчёт. Финальная цена — после замера.</p>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
