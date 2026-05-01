import Link from "next/link";
import { Section, SectionHeader } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import { TYPES } from "@/lib/data";
import { img } from "@/lib/img";

export const metadata = {
  title: "Услуги · Натяжные потолки — АТМОСФЕРА",
  description: "Все типы натяжных потолков: матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие, тканевые, звёздное небо.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="!pt-32">
        <SectionHeader
          eyebrow="Услуги"
          title={<>8 фактур, <em className="not-italic text-accent">бесконечно много вариантов</em></>}
          sub="Подбираем тип потолка под интерьер, бюджет и задачу — от рутинного матового в спальне до архитектурного двухуровневого с фотопечатью в гостиной."
        />
      </Section>

      {TYPES.map((t, i) => (
        <Section key={t.id} id={t.id} className={`!pt-0 ${i % 2 === 0 ? "bg-cream/50" : ""}`}>
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${i % 2 === 0 ? "" : "lg:[&>:first-child]:order-2"}`}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
              <img src={img(t.image)} alt={t.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="eyebrow mb-4">{`0${i + 1}`}</div>
              <h2 className="serif text-h1 mb-4">{t.title}</h2>
              <p className="text-muted text-lg mb-3">{t.short}</p>
              <p className="text-graphite leading-relaxed mb-6">{t.description}</p>
              <ul className="space-y-2 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <span className="text-graphite">{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="serif text-4xl">от {t.pricePerM2} ₽</span>
                <span className="text-muted">за м² с монтажом</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/calculator?type=${t.id}`} className="btn btn-primary">Рассчитать стоимость</Link>
                <Link href="/portfolio" className="btn btn-outline">Посмотреть кейсы</Link>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <CTABanner
          title="Не определились с типом?"
          sub="Замерщик приедет с каталогом всех 8 фактур. На месте посмотрите, потрогаете, выберете под свой интерьер. Бесплатно."
          button="Вызвать замерщика"
          variant="measurer"
        />
      </Section>
    </>
  );
}
