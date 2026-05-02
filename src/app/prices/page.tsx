import { Section, SectionHeader } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import PriceTiers from "@/components/PriceTiers";
import { PRICE_OPTIONS, TYPES } from "@/lib/data";
import { img } from "@/lib/img";

export const metadata = {
  title: { absolute: "Цены · Прайс натяжных потолков — АТМОСФЕРА" },
  description: "Прозрачный прайс: цены за м², опции, пакетные предложения. Все цены — с монтажом, без скрытых доплат.",
  alternates: { canonical: "/prices/" },
  openGraph: {
    title: "Прайс натяжных потолков — АТМОСФЕРА",
    description: "От 850 ₽/м² с монтажом. 3 пакета (Стандарт/Премиум/Архитектурный), 8 типов фактур, 10 опций. Цена в договоре.",
    url: "/prices/",
  },
  twitter: {
    title: "Прайс натяжных потолков — от 850 ₽/м²",
    description: "3 пакета, 8 фактур, 10 опций. Цена в договоре.",
  },
};

export default function PricesPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src={img(TYPES[1].image)} alt="" aria-hidden className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.6) 0%, rgba(14,15,17,.35) 50%, rgba(14,15,17,.95) 100%)" }} />
        </div>
        <div className="container-x relative">
          <div className="eyebrow eyebrow-light mb-5">Цены</div>
          <h1 className="serif text-hero max-w-3xl mb-6">
            Прозрачный прайс <em className="not-italic text-gold">с монтажом</em>
          </h1>
          <p className="text-lg md:text-xl text-bg/75 max-w-2xl leading-relaxed">
            Все цены указаны с учётом материалов и работ. То, что в смете, — то и в договоре. Никаких «доплат по факту».
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader title={<>Три пакета: <em className="not-italic text-accent">от базы до архитектурного</em></>} align="center" />
        <PriceTiers />
      </Section>

      <Section className="bg-ink text-bg">
        <SectionHeader
          eyebrow="По типам потолков"
          title={<>Цена <em className="not-italic text-gold">за м²</em> по фактурам</>}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {TYPES.map((t) => (
            <div key={t.id} className="rounded-2xl overflow-hidden border border-bg/10 bg-graphite/40 backdrop-blur group hover:border-gold/40 transition">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={img(t.image)} alt={t.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="p-5">
                <div className="serif text-xl mb-2">{t.title}</div>
                <div className="flex items-baseline gap-1 tabular">
                  <span className="text-xs text-bg/55 uppercase tracking-[0.16em] mr-2">от</span>
                  <span className="text-2xl font-light">{t.pricePerM2}</span>
                  <span className="text-gold">₽</span>
                  <span className="text-xs text-bg/55 ml-1">/м²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader title={<>Дополнительные <em className="not-italic text-accent">опции</em></>} />
        <div className="card !rounded-2xl overflow-hidden">
          <div className="divide-y divide-line">
            {PRICE_OPTIONS.map((o, i) => (
              <div key={o.id} className={`flex items-center justify-between gap-6 px-6 lg:px-8 py-5 ${i % 2 === 1 ? "bg-cream/30" : ""}`}>
                <span className="text-graphite">{o.name}</span>
                <span className="font-medium whitespace-nowrap tabular">{o.price}</span>
              </div>
            ))}
          </div>
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
