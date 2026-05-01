import { FileSignature, BadgeCheck, ShieldCheck, PackageOpen, Clock, Award } from "lucide-react";

const ITEMS = [
  { icon: FileSignature, title: "Цена в договоре",      text: "Сколько согласовали — столько и заплатите. Никаких «доплат по факту монтажа»." },
  { icon: BadgeCheck,    title: "Замер за 0 ₽",          text: "Замерщик приезжает бесплатно, без обязательств. Без покупки — никто не звонит и не давит." },
  { icon: ShieldCheck,   title: "12 лет гарантии",      text: "Полотно — 12 лет. Монтаж — 5 лет. Бесплатный сервис в течение всего срока." },
  { icon: PackageOpen,   title: "Свой склад полотен",   text: "200+ оттенков, 8 фактур, ткань Descor — всё на собственном складе. Срок изготовления от 1 дня." },
  { icon: Clock,         title: "Один день — один потолок", text: "Стандартная комната монтируется за 3–5 часов. Без пыли, без выселения, без вечного ремонта." },
  { icon: Award,         title: "Сертификаты ИЗО-9001",  text: "Полотна сертифицированы по ГОСТ, экологически безопасны, подходят для детских и медучреждений." },
] as const;

export default function Advantages() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-3xl overflow-hidden border border-line">
      {ITEMS.map((a, i) => {
        const Icon = a.icon;
        return (
          <div key={i} className="bg-bg p-8 lg:p-9 group hover:bg-cream/50 transition-colors">
            <div className="w-12 h-12 mb-6 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <div className="serif text-2xl mb-3">{a.title}</div>
            <p className="text-muted leading-relaxed text-sm">{a.text}</p>
          </div>
        );
      })}
    </div>
  );
}
