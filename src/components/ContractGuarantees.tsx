import { FileSignature, CalendarClock, ShieldCheck, Sparkles } from "lucide-react";
import { CONTRACT_GUARANTEES } from "@/lib/data";

const ICONS = [FileSignature, CalendarClock, ShieldCheck, Sparkles];

export default function ContractGuarantees() {
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {CONTRACT_GUARANTEES.map((g, i) => {
        const Icon = ICONS[i] ?? FileSignature;
        return (
          <div key={g.title} className="card !rounded-2xl p-7 lg:p-8 flex gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center">
              <Icon size={20} strokeWidth={1.6} />
            </div>
            <div>
              <div className="serif text-xl leading-tight mb-2">{g.title}</div>
              <p className="text-sm text-muted leading-relaxed">{g.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
