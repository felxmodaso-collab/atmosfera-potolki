"use client";
import { useState } from "react";
import { ArrowUpRight, X, MapPin, Ruler, Tag } from "lucide-react";
import type { Project } from "@/lib/data";
import { img } from "@/lib/img";

export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="card group text-left w-full relative">
        <span className="badge badge-line absolute top-4 left-4 z-10">{p.area}</span>
        <span className="badge badge-ink absolute top-4 right-4 z-10">{p.budget}</span>

        <div className="aspect-[3/2] overflow-hidden bg-cream media-zoom relative">
          <img src={img(p.image)} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 right-4 text-bg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <div className="text-xs uppercase tracking-[0.14em] text-bg/70 mb-1">Подробнее</div>
            <div className="serif text-xl flex items-center justify-between">{p.title}<ArrowUpRight size={20} /></div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="serif text-xl mb-1.5">{p.title}</h3>
          <div className="text-sm text-muted">{p.type}</div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] p-4 flex items-center justify-center" style={{ background: "rgba(14,15,17,.78)", backdropFilter: "blur(8px)" }} onClick={() => setOpen(false)}>
          <div className="card max-w-5xl w-full max-h-[92vh] overflow-auto relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-bg/90 backdrop-blur flex items-center justify-center hover:bg-bg" aria-label="Закрыть">
              <X size={18} />
            </button>
            <div className="grid md:grid-cols-2">
              <div className="relative">
                <span className="badge badge-coral absolute top-4 left-4 z-10">Общий план</span>
                <img src={img(p.image)} alt={p.title} className="w-full h-full object-cover aspect-[3/2]" />
              </div>
              <div className="relative">
                <span className="badge badge-gold absolute top-4 left-4 z-10">Деталь</span>
                <img src={img(p.detailImage)} alt={`${p.title} деталь`} className="w-full h-full object-cover aspect-[3/2]" />
              </div>
            </div>
            <div className="p-8 lg:p-10">
              <div className="eyebrow mb-3"><MapPin size={12} /> {p.client}</div>
              <h3 className="serif text-h1 mb-6">{p.title}</h3>
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
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted mb-1">
        {icon} {label}
      </div>
      <div className="font-medium text-lg">{value}</div>
    </div>
  );
}
