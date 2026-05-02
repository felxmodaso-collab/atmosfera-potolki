import { MapPin } from "lucide-react";
import { TEAM, COMPANY } from "@/lib/data";
import Picture from "./Picture";

export default function TeamShowroom() {
  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-stretch">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TEAM.map((m) => (
          <div key={m.name} className="card !rounded-2xl p-0 overflow-hidden flex flex-col">
            <div className="aspect-[4/5] bg-cream overflow-hidden">
              <Picture src={m.image} alt={m.name} width={400} height={500} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.18em] text-accent mb-1.5">{m.role}</div>
              <div className="serif text-lg leading-tight mb-1">{m.name}</div>
              <div className="text-xs text-muted mb-2 tabular">{m.experience}</div>
              <p className="text-xs text-muted leading-relaxed mt-auto">{m.bio}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card !rounded-2xl overflow-hidden flex flex-col">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:flex-1 bg-cream overflow-hidden">
          <Picture src="/images/team/03-showroom.jpg" alt="Шоурум АТМОСФЕРА на Тверской" width={1200} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-bg">
            <div className="text-[10px] uppercase tracking-[0.18em] text-gold mb-1.5">Шоурум</div>
            <div className="serif text-2xl leading-tight">200+ оттенков · 8 фактур вживую</div>
          </div>
        </div>
        <div className="p-6 lg:p-7">
          <div className="flex items-start gap-3 mb-3 text-sm">
            <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
            <span>{COMPANY.address}</span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Приезжайте посмотреть полотна вживую: матовые рядом с глянцем, фактуры с разной светопроницаемостью, образцы под лампой и при дневном свете. Бесплатный кофе и каталог с собой.
          </p>
        </div>
      </div>
    </div>
  );
}
