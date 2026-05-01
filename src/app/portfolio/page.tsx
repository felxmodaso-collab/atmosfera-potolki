import { Section, SectionHeader } from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import CTABanner from "@/components/CTABanner";
import { PROJECTS } from "@/lib/data";

export const metadata = {
  title: "Портфолио · Натяжные потолки — АТМОСФЕРА",
  description: "Реальные проекты: 12 кейсов с фото, описанием, типом потолка, площадью и бюджетом.",
};

export default function PortfolioPage() {
  return (
    <>
      <Section className="!pt-32">
        <SectionHeader
          eyebrow="Портфолио"
          title={<>3 800+ объектов. <em className="not-italic text-accent">Вот двенадцать.</em></>}
          sub="Реальные проекты последних двух лет — Москва и Подмосковье. Кликните на карточку, чтобы увидеть детали и ракурсы."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => <ProjectCard key={p.id} p={p} />)}
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
