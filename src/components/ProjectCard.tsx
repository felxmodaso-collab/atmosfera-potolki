"use client";
import { useState } from "react";
import { ArrowUpRight, X, MapPin, Ruler, Tag } from "lucide-react";
import type { Project } from "@/lib/data";
import { img } from "@/lib/img";

export default function ProjectCard({ p, featured = false }: { p: Project; featured?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={`group text-left relative overflow-hidden rounded-2xl ${featured ? "lg:col-span-2 lg:row-span-2" : ""}`}>
        <div className={`overflow-hidden bg-cream relative w-full h-full ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img src={img(p.image)} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/95 via-ink/55 to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="badge badge-line backdrop-blur">{p.area}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10 text-bg flex flex-col">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold mb-2">{p.type}</div>
            <div className={`serif ${featured ? "text-3xl lg:text-4xl" : "text-xl"} leading-[1.25] mb-2 flex items-start justify-between gap-3`}>
              <span className="block flex-1 min-w-0">{p.title}</span>
              <span className="w-9 h-9 shrink-0 rounded-full bg-bg/15 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all mt-1"><ArrowUpRight size={16} /></span>
            </div>
            <div className="text-sm text-bg/80 tabular">{p.budget}</div>
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] p-4 flex items-center justify-center" style={{ background: "rgba(14,15,17,.78)", backdropFilter: "blur(8px)" }} onClick={() => setOpen(false)}>
          <div className="max-w-5xl w-full max-h-[92vh] overflow-auto relative bg-bg rounded-2xl shadow-deep border border-line text-ink" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-bg/95 backdrop-blur flex items-center justify-center hover:bg-bg shadow-soft border border-line" aria-label="Закрыть">
              <X size={18} className="text-ink" />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative">
                <span className="badge badge-line absolute top-4 left-4 z-10 backdrop-blur">Общий план</span>
                <img src={img(p.image)} alt={p.title} className="w-full h-full object-cover aspect-[3/2]" />
              </div>
              <div className="relative">
                <span className="badge badge-gold absolute top-4 left-4 z-10">Деталь</span>
                <img src={img(p.detailImage)} alt={`${p.title} деталь`} className="w-full h-full object-cover aspect-[3/2]" />
              </div>
            </div>
            <div className="p-8 lg:p-10">
              <div className="eyebrow mb-3"><MapPin size={12} /> {p.client}</div>
              <h3 className="serif text-h1 mb-6 leading-[1.1] text-ink">{p.title}</h3>
              <div className="grid sm:grid-cols-3 gap-5 mb-7 pb-7 border-b border-line">
                <Field icon={<Tag size={16} />} label="Тип" value={p.type} />
                <Field icon={<Ruler size={16} />} label="Площадь" value={p.area} />
                <Field icon={<Tag size={16} />} label="Бюджет" value={p.budget} />
              </div>
              <p className="text-graphite leading-relaxed text-lg">{p.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted mb-1.5">
        {icon} {label}
      </div>
      <div className="font-medium text-lg text-ink">{value}</div>
    </div>
  );
}
