import { FileSignature, BadgeCheck, ShieldCheck, PackageOpen, Clock, Award } from "lucide-react";

const ITEMS = [
  { icon: FileSignature, title: "Цена в договоре", text: "Сколько согласовали — столько и заплатите. Никаких «доплат по факту монтажа».", tint: "accent" },
  { icon: BadgeCheck,    title: "Замер за 0 ₽",     text: "Замерщик приезжает бесплатно, без обязательств. Без покупки — никто не звонит и не давит.", tint: "teal" },
  { icon: ShieldCheck,   title: "12 лет гарантии",  text: "Полотно — 12 лет. Монтаж — 5 лет. Бесплатный сервис в течение всего срока.", tint: "sage" },
  { icon: PackageOpen,   title: "Свой склад полотен", text: "200+ оттенков, 8 фактур, ткань Descor — всё на собственном складе. Срок изготовления от 1 дня.", tint: "gold" },
  { icon: Clock,         title: "Один день — один потолок", text: "Стандартная комната монтируется за 3–5 часов. Без пыли, без выселения, без вечного ремонта.", tint: "coral" },
  { icon: Award,         title: "Сертификаты ИЗО-9001", text: "Полотна сертифицированы по ГОСТ, экологически безопасны, подходят для детских и медучреждений.", tint: "ink" },
] as const;

export default function Advantages() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {ITEMS.map((a, i) => {
        const Icon = a.icon;
        const colorMap = {
          accent: "bg-accent/10 text-accent",
          teal: "bg-teal/10 text-teal",
          sage: "bg-sage/10 text-sage",
          gold: "bg-gold/15 text-gold",
          coral: "bg-coral/10 text-coral",
          ink: "bg-ink/8 text-ink",
        };
        return (
          <div key={i} className="card p-7">
            <div className={`w-14 h-14 rounded-2xl ${colorMap[a.tint]} flex items-center justify-center mb-5`}>
              <Icon size={26} strokeWidth={1.5} />
            </div>
            <div className="serif text-2xl mb-2">{a.title}</div>
            <p className="text-muted leading-relaxed text-sm">{a.text}</p>
          </div>
        );
      })}
    </div>
  );
}
