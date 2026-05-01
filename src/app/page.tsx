import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Calculator from "@/components/Calculator";
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

      <Section className="!pt-20 !pb-12 lg:hidden">
        <Stats />
      </Section>

      <Section id="calculator">
        <SectionHeader
          eyebrow="Калькулятор"
          title={<>Стоимость <em className="not-italic text-accent">за 30 секунд</em></>}
          sub="Подберите тип потолка и опции — увидите ориентировочную цену сразу. Финальная сумма — после бесплатного замера."
        />
        <Calculator />
      </Section>

      <Section className="bg-cream/60">
        <SectionHeader
          eyebrow="Типы потолков"
          title={<>8 фактур <em className="not-italic text-accent">под любой интерьер</em></>}
          sub="От классики матового до архитектурных решений с парящим контуром и фотопечатью."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TYPES.map((t) => <TypeCard key={t.id} t={t} compact />)}
        </div>
      </Section>

      <Section>
        <div className="flex items-end justify-between mb-10 lg:mb-16 gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">Портфолио</div>
            <h2 className="serif text-h1">Сделанные проекты</h2>
          </div>
          <Link href="/portfolio" className="btn btn-outline">Все проекты <ArrowRight size={16} /></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.slice(0, 6).map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </Section>

      <Section className="bg-cream/60">
        <SectionHeader
          eyebrow="Как мы работаем"
          title="Полный цикл за 5–7 дней"
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

      <Section className="bg-cream/60">
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
