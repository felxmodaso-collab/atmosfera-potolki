import { ClipboardList, Ruler, FileSignature, Factory, Hammer, ClipboardCheck, ShieldCheck } from "lucide-react";
import { PROCESS } from "@/lib/data";

const ICONS = [ClipboardList, Ruler, FileSignature, Factory, Hammer, ClipboardCheck, ShieldCheck];

export default function Process() {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-[42px] left-[6%] right-[6%] h-px">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" strokeWidth="1" stroke="#C9C2B3" strokeDasharray="0.6 0.4" />
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-x-4 gap-y-10">
        {PROCESS.map((p, i) => {
          const Icon = ICONS[i] ?? ClipboardList;
          return (
            <div key={p.n} className="relative text-center">
              <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full bg-bg border border-line" />
                <div className="absolute inset-1.5 rounded-full bg-cream/70 flex items-center justify-center">
                  <Icon size={26} strokeWidth={1.4} className="text-accent" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-ink text-bg flex items-center justify-center text-[10px] font-medium">
                  {p.n}
                </div>
              </div>
              <h3 className="serif text-xl mb-2">{p.title}</h3>
              <p className="text-muted text-xs leading-relaxed px-2">{p.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
