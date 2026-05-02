import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/Section";
import CTABanner from "@/components/CTABanner";
import Picture from "@/components/Picture";
import { TYPES } from "@/lib/data";

import { OG_IMAGES, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata = {
  title: { absolute: "Услуги · Натяжные потолки — АТМОСФЕРА" },
  description: "Все типы натяжных потолков: матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие, тканевые, звёздное небо.",
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Услуги · 8 типов натяжных потолков — АТМОСФЕРА",
    description: "Матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие, тканевые, звёздное небо. Цена за м² с монтажом.",
    url: "/services/",
    images: OG_IMAGES,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: "Услуги · 8 типов натяжных потолков — АТМОСФЕРА",
    description: "Матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие, тканевые, звёздное небо.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <Picture src={TYPES[5].image} alt="" loading="eager" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.7) 0%, rgba(14,15,17,.4) 50%, rgba(14,15,17,.95) 100%)" }} />
        </div>
        <div className="container-x relative">
          <div className="eyebrow eyebrow-light mb-5">Услуги</div>
          <h1 className="serif text-hero max-w-3xl mb-6">
            8 фактур, <em className="not-italic text-gold">бесконечно много</em> вариантов
          </h1>
          <p className="text-lg md:text-xl text-bg/75 max-w-2xl leading-relaxed">
            Подбираем тип потолка под интерьер, бюджет и задачу — от классики матового в спальне до архитектурного двухуровневого с фотопечатью в гостиной.
          </p>
        </div>
      </section>

      {TYPES.map((t, i) => {
        const reverse = i % 2 === 1;
        const isHighlight = ["floating", "starsky"].includes(t.id);
        if (isHighlight) {
          return (
            <section key={t.id} id={t.id} className="relative">
              <div className="relative aspect-[16/8] min-h-[480px] overflow-hidden bg-ink">
                <Picture src={t.image} alt={t.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(14,15,17,.85) 0%, rgba(14,15,17,.4) 60%, rgba(14,15,17,0) 100%)" }} />
                <div className="absolute inset-0 flex items-center">
                  <div className="container-x">
                    <div className="max-w-xl text-bg">
                      <div className="text-xs uppercase tracking-[0.18em] text-gold mb-4 tabular">{`0${i + 1} · ${t.id === "floating" ? "архитектурный приём" : "детская мечта"}`}</div>
                      <h2 className="serif text-h1 mb-5">{t.title}</h2>
                      <p className="text-lg text-bg/80 mb-7 leading-relaxed">{t.description}</p>
                      <div className="flex items-baseline gap-4 mb-7">
                        <span className="text-5xl font-light tabular">{t.pricePerM2}</span>
                        <span className="text-bg/65">₽ за м² с монтажом</span>
                      </div>
                      <Link href={`/calculator?type=${t.id}`} className="btn btn-gold !py-3.5 !px-7">
                        Рассчитать стоимость <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }
        return (
          <Section key={t.id} id={t.id} className={i % 4 === 0 ? "bg-cream/40" : ""}>
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? "lg:[&>:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                <Picture src={t.image} alt={t.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted mb-4 tabular">{`0${i + 1}`}</div>
                <h2 className="serif text-h1 mb-4">{t.title}</h2>
                <p className="text-muted text-lg mb-3">{t.short}</p>
                <p className="text-graphite leading-relaxed mb-6">{t.description}</p>
                <ul className="grid grid-cols-2 gap-x-5 gap-y-2 mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-graphite">
                      <span className="text-accent mt-1.5 w-1 h-1 rounded-full bg-current shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between gap-3 pt-5 border-t border-line">
                  <div>
                    <div className="text-xs uppercase tracking-[0.16em] text-muted mb-1">от</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-light tabular">{t.pricePerM2}</span>
                      <span className="text-accent">₽</span>
                      <span className="text-muted text-sm ml-1">/ м²</span>
                    </div>
                  </div>
                  <Link href={`/calculator?type=${t.id}`} className="btn btn-primary">Рассчитать <ArrowRight size={16} /></Link>
                </div>
              </div>
            </div>
          </Section>
        );
      })}

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
