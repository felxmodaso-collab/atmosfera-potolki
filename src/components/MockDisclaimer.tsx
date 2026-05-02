import { Info } from "lucide-react";

export default function MockDisclaimer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2 px-3 py-2 rounded-lg bg-muted/10 border border-line text-[11px] leading-snug text-muted ${className}`}
      role="note"
    >
      <Info size={13} className="shrink-0 mt-0.5 text-accent" />
      <span>
        <strong className="text-ink">Portfolio demo.</strong> Форма не отправляет данные на сервер — это спекулятивный сайт. Контактные данные в шапке также вымышленные.
      </span>
    </div>
  );
}
