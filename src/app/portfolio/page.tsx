import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import CTABanner from "@/components/CTABanner";
import Picture from "@/components/Picture";
import { PROJECTS } from "@/lib/data";

export const metadata = {
  title: { absolute: "Портфолио · Натяжные потолки — АТМОСФЕРА" },
  description: "Реальные проекты: 12 кейсов с фото, описанием, типом потолка, площадью и бюджетом.",
  alternates: { canonical: "/portfolio/" },
  openGraph: {
    title: "Портфолио · 12 проектов натяжных потолков — АТМОСФЕРА",
    description: "От гостиной 35 м² с двухуровневым комбо до парящего контура в столовой. Реальные кейсы с локацией и бюджетом.",
    url: "/portfolio/",
  },
  twitter: {
    title: "Портфолио · 12 проектов натяжных потолков",
    description: "Реальные объекты в Москве и МО — фото, площадь, бюджет.",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <Picture src={PROJECTS[8].image} alt="" loading="eager" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.6) 0%, rgba(14,15,17,.35) 50%, rgba(14,15,17,.95) 100%)" }} />
        </div>
        <div className="container-x relative">
          <div className="eyebrow eyebrow-light mb-5">Портфолио</div>
          <h1 className="serif text-hero max-w-3xl mb-6">
            <span className="tabular">3 800+</span> объектов. <em className="not-italic text-gold">Вот двенадцать.</em>
          </h1>
          <p className="text-lg md:text-xl text-bg/75 max-w-2xl leading-relaxed mb-12">
            Реальные проекты последних двух лет — Москва и Подмосковье. Кликните на карточку, чтобы увидеть детали и ракурсы.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-8 border-t border-bg/15 tabular max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">12</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">проектов в подборке</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">8 — 40 м²</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">диапазон площадей</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">28k — 215k ₽</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">бюджеты</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">11</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">ЖК / районов МО</div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[280px] gap-4">
          <ProjectCard p={PROJECTS[8]} featured />
          <ProjectCard p={PROJECTS[3]} />
          <ProjectCard p={PROJECTS[10]} />
          <ProjectCard p={PROJECTS[0]} />
          <ProjectCard p={PROJECTS[6]} featured />
          <ProjectCard p={PROJECTS[1]} />
          <ProjectCard p={PROJECTS[2]} />
          <ProjectCard p={PROJECTS[4]} />
          <ProjectCard p={PROJECTS[5]} />
          <ProjectCard p={PROJECTS[7]} />
          <ProjectCard p={PROJECTS[9]} />
          <ProjectCard p={PROJECTS[11]} />
        </div>
      </Section>

      <Section>
        <CTABanner
          title="Хочется такой же?"
          sub="Подберём вариант под ваш интерьер и бюджет. Замерщик приедет с фотокаталогом фактур и точно посчитает смету за 30 минут на месте."
          button="Вызвать замерщика"
          variant="measurer"
        />
      </Section>
    </>
  );
}
