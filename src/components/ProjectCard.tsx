"use client";
import { useState } from "react";
import type { Project } from "@/lib/data";
import { img } from "@/lib/img";

export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="card group text-left w-full">
        <div className="aspect-[3/2] overflow-hidden bg-cream">
          <img src={img(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
        </div>
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <h3 className="serif text-xl">{p.title}</h3>
            <span className="text-xs text-muted whitespace-nowrap">{p.budget}</span>
          </div>
          <div className="text-sm text-muted">{p.type}</div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] p-4 flex items-center justify-center" style={{ background: "rgba(14,15,17,.7)", backdropFilter: "blur(8px)" }} onClick={() => setOpen(false)}>
          <div className="card max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-bg text-3xl z-10" aria-label="Закрыть">×</button>
            <div className="grid md:grid-cols-2">
              <img src={img(p.image)} alt={p.title} className="w-full h-full object-cover aspect-[3/2]" />
              <img src={img(p.detailImage)} alt={`${p.title} деталь`} className="w-full h-full object-cover aspect-[3/2]" />
            </div>
            <div className="p-8">
              <div className="eyebrow mb-3">{p.client}</div>
              <h3 className="serif text-h2 mb-4">{p.title}</h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div><div className="text-xs text-muted uppercase tracking-[0.18em] mb-1">Тип</div><div>{p.type}</div></div>
                <div><div className="text-xs text-muted uppercase tracking-[0.18em] mb-1">Площадь</div><div>{p.area}</div></div>
                <div><div className="text-xs text-muted uppercase tracking-[0.18em] mb-1">Бюджет</div><div>{p.budget}</div></div>
              </div>
              <p className="text-muted leading-relaxed">{p.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
