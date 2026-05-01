import { ClipboardList, Ruler, FileSignature, Factory, Hammer, ClipboardCheck, ShieldCheck } from "lucide-react";
import { PROCESS } from "@/lib/data";

const ICONS = [ClipboardList, Ruler, FileSignature, Factory, Hammer, ClipboardCheck, ShieldCheck];

export default function Process() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-px bg-line rounded-3xl overflow-hidden border border-line">
      {PROCESS.map((p, i) => {
        const Icon = ICONS[i] ?? ClipboardList;
        return (
          <div key={p.n} className="bg-bg p-6 lg:p-7 relative group hover:bg-cream/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-[0.18em] text-muted font-medium tabular">{p.n}</span>
              <Icon size={26} strokeWidth={1.4} className="text-accent" />
            </div>
            <h3 className="serif text-xl mb-2 leading-tight">{p.title}</h3>
            <p className="text-muted text-xs leading-relaxed">{p.text}</p>
          </div>
        );
      })}
    </div>
  );
}
