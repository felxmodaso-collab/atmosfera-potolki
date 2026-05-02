import { FileSignature, BadgeCheck, ShieldCheck, PackageOpen, Clock, Award } from "lucide-react";

const ITEMS = [
  { icon: FileSignature, title: "Цена в договоре",      text: "Сколько согласовали — столько и заплатите. Никаких «доплат по факту монтажа»." },
  { icon: BadgeCheck,    title: "Замер за 0 ₽",          text: "Замерщик приезжает бесплатно, без обязательств. Без покупки — никто не звонит и не давит." },
  { icon: ShieldCheck,   title: "12 лет гарантии",      text: "Полотно — 12 лет. Монтаж — 5 лет. Бесплатный сервис в течение всего срока." },
  { icon: PackageOpen,   title: "Свой склад полотен",   text: "200+ оттенков, 8 фактур, ткань Descor — всё на собственном складе. Срок изготовления от 1 дня." },
  { icon: Clock,         title: "Один день — один потолок", text: "Стандартная комната монтируется за 3–5 часов. Без пыли, без выселения, без вечного ремонта." },
  { icon: Award,         title: "Сертификаты ISO 9001",  text: "Полотна сертифицированы по ГОСТ, экологически безопасны, подходят для детских и медучреждений." },
] as const;

export default function Advantages() {
  return (
    <div className="bg-white rounded-3xl border border-line shadow-card overflow-hidden">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
        {ITEMS.map((a, i) => {
          const Icon = a.icon;
          const rowBreak = i >= 3 ? "lg:border-t lg:border-line" : "";
          return (
            <div key={i} className={`p-8 lg:p-10 group hover:bg-cream/40 transition-colors relative ${rowBreak}`}>
              <div className="absolute top-0 left-0 w-12 h-px bg-accent" />
              <div className="text-accent mb-5"><Icon size={28} strokeWidth={1.4} /></div>
              <div className="serif text-2xl mb-3 leading-tight">{a.title}</div>
              <p className="text-muted leading-relaxed text-sm">{a.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
