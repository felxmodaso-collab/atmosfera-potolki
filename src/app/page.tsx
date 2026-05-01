import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import { Section, SectionHeader } from "@/components/Section";
import TypeCard from "@/components/TypeCard";
import ProjectCard from "@/components/ProjectCard";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQList from "@/components/FAQList";
import Stats from "@/components/Stats";
import Advantages from "@/components/Advantages";
import CTABanner from "@/components/CTABanner";
import { TYPES, PROJECTS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee tone="light" />

      <Section className="bg-cream/40">
        <SectionHeader
          eyebrow="Цифры"
          title={<>Без преувеличений — <em className="not-italic text-accent">просто факты</em></>}
        />
        <Stats />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Типы потолков"
          title={<>8 фактур <em className="not-italic text-accent">под любой интерьер</em></>}
          sub="От классики матового до архитектурных решений с парящим контуром и фотопечатью."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TypeCard t={TYPES[5]} large />
          <TypeCard t={TYPES[3]} />
          <TypeCard t={TYPES[1]} />
          <TypeCard t={TYPES[0]} />
          <TypeCard t={TYPES[7]} large />
          <TypeCard t={TYPES[2]} />
          <TypeCard t={TYPES[4]} />
          <TypeCard t={TYPES[6]} />
        </div>
      </Section>

      <Section className="bg-ink text-bg">
        <div className="flex items-end justify-between mb-10 lg:mb-14 gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="eyebrow eyebrow-light mb-4">Портфолио</div>
            <h2 className="serif text-h1">Сделанные <em className="not-italic text-gold">проекты</em></h2>
          </div>
          <Link href="/portfolio" className="btn !text-bg !border-bg/40 border hover:!bg-bg hover:!text-ink">Все проекты <ArrowRight size={16} /></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px] gap-4">
          <ProjectCard p={PROJECTS[8]} featured />
          <ProjectCard p={PROJECTS[1]} />
          <ProjectCard p={PROJECTS[2]} />
          <ProjectCard p={PROJECTS[5]} />
          <ProjectCard p={PROJECTS[3]} />
          <ProjectCard p={PROJECTS[6]} />
        </div>
      </Section>

      <Section className="bg-cream/40">
        <SectionHeader
          eyebrow="Как мы работаем"
          title={<>Полный цикл <em className="not-italic text-accent">за 5–7 дней</em></>}
          sub="От первого звонка до подписанного акта — без сюрпризов в смете и без затягивания сроков."
        />
        <Process />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Преимущества"
          title={<>Почему 3&nbsp;800+ клиентов <em className="not-italic text-accent">выбрали нас</em></>}
        />
        <Advantages />
      </Section>

      <Section className="bg-cream/40">
        <SectionHeader eyebrow="Отзывы" title={<>Что говорят <em className="not-italic text-accent">клиенты</em></>} />
        <Testimonials />
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
        <FAQList limit={6} />
        <div className="mt-8 text-center">
          <Link href="/contacts#faq" className="btn btn-outline">Все вопросы и ответы <ArrowRight size={16} /></Link>
        </div>
      </Section>

      <Section>
        <CTABanner
          title={<>Бесплатный замер <em className="not-italic text-gold">за 0 ₽</em></>}
          sub="Замерщик приедет в удобное время. Привезёт каталог фактур, точные размеры комнаты, расчёт по каждому варианту. Без обязательств."
          button="Вызвать замерщика"
          variant="measurer"
          badge="Сегодня · окно 16:00–22:00"
        />
      </Section>
    </>
  );
}
