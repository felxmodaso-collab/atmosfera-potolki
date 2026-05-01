import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import { PRICE_TIERS, PRICE_OPTIONS, TYPES } from "@/lib/data";

export const metadata = {
  title: "Цены · Прайс натяжных потолков — АТМОСФЕРА",
  description: "Прозрачный прайс: цены за м², опции, пакетные предложения. Все цены — с монтажом, без скрытых доплат.",
};

export default function PricesPage() {
  return (
    <>
      <Section className="!pt-32">
        <SectionHeader
          eyebrow="Цены"
          title={<>Прозрачный прайс <em className="not-italic text-accent">с монтажом</em></>}
          sub="Все цены указаны с учётом материалов и работ. То, что в смете, — то и в договоре. Никаких «доплат по факту»."
        />
      </Section>

      <Section className="!pt-0">
        <SectionHeader title="Пакеты" align="center" />
        <div className="grid md:grid-cols-3 gap-5">
          {PRICE_TIERS.map((tier, i) => (
            <div key={tier.name} className={`card p-8 flex flex-col ${i === 1 ? "ring-2 ring-accent ring-offset-4 ring-offset-bg" : ""}`}>
              {i === 1 && <div className="eyebrow !text-accent mb-2">★ популярный</div>}
              <div className="serif text-3xl mb-1">{tier.name}</div>
              <div className="serif text-5xl mb-1">{tier.from} ₽</div>
              <div className="text-sm text-muted mb-6">за м² с монтажом</div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.includes.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/calculator" className={`btn ${i === 1 ? "btn-accent" : "btn-outline"} w-full`}>Заказать</Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream/50">
        <SectionHeader title="По типам потолков" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {TYPES.map((t) => (
            <div key={t.id} className="card p-5">
              <div className="serif text-xl mb-1">{t.title}</div>
              <div className="text-sm text-muted mb-3">{t.short}</div>
              <div className="serif text-2xl">от {t.pricePerM2} ₽<span className="text-base text-muted"> /м²</span></div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title="Дополнительные опции" />
        <div className="card divide-y divide-line">
          {PRICE_OPTIONS.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-6 px-6 py-4">
              <span>{o.name}</span>
              <span className="font-medium whitespace-nowrap">{o.price}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <CTABanner
          title="Точная цена — за 30 минут на замере"
          sub="Замерщик приедет, померит, посчитает по каждой опции, зафиксирует в смете. Замер — бесплатно, без обязательств."
          button="Вызвать замерщика"
          variant="measurer"
        />
      </Section>
    </>
  );
}
