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
import TeamShowroom from "@/components/TeamShowroom";
import ContractGuarantees from "@/components/ContractGuarantees";
import CorniceStrip from "@/components/CorniceStrip";
import { TYPES, PROJECTS } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee tone="light" />

      <Section className="bg-cream/40 architectural-grid">
        <SectionHeader
          eyebrow="Цифры"
          title={<>Только <em className="not-italic text-accent">проверяемые</em> цифры</>}
        />
        <Stats />
      </Section>

      <CorniceStrip />

      <Section className="bg-ink text-bg dim-orbs">
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

      <Section>
        <CTABanner
          title={<>Нравятся проекты? <em className="not-italic text-gold">Сделаем такой же</em></>}
          sub="Замерщик приедет с фотокаталогом, посчитает смету по вашей комнате за 30 минут."
          button="Записаться на замер"
          variant="measurer"
          badge="Замер 0 ₽ · перезвоним за 15 минут"
        />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Типы потолков"
          title={<>8 фактур <em className="not-italic text-accent">под любой интерьер</em></>}
          sub="От классики матового до архитектурных решений с парящим контуром и фотопечатью."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TypeCard t={TYPES[0]} large />
          <TypeCard t={TYPES[1]} />
          <TypeCard t={TYPES[2]} />
          <TypeCard t={TYPES[5]} />
          <TypeCard t={TYPES[7]} large />
          <TypeCard t={TYPES[4]} />
          <TypeCard t={TYPES[3]} />
          <TypeCard t={TYPES[6]} />
        </div>
      </Section>

      <CorniceStrip />

      <Section className="bg-cream/40 architectural-grid">
        <SectionHeader
          eyebrow="Как мы работаем"
          title={<>Полный цикл <em className="not-italic text-accent">за 5–7 дней</em></>}
          sub="От заявки до подписанного акта. Смета фиксируется в договоре, сроки — без переноса."
        />
        <Process />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Команда и шоурум"
          title={<>Лица, с которыми вы будете <em className="not-italic text-accent">работать</em></>}
          sub="Замерщик, бригадир, технолог производства, менеджер шоурума. Без сторонних подрядчиков."
        />
        <TeamShowroom />
      </Section>

      <CorniceStrip />

      <Section className="bg-cream/40 architectural-grid">
        <SectionHeader
          eyebrow="Что в договоре"
          title={<>Четыре пункта, <em className="not-italic text-accent">которые мы гарантируем</em></>}
          sub="Не маркетинговые обещания, а условия с конкретными штрафами за нарушение."
        />
        <ContractGuarantees />
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Преимущества"
          title={<>Почему 3&nbsp;800+ клиентов <em className="not-italic text-accent">выбрали нас</em></>}
        />
        <Advantages />
      </Section>

      <Section>
        <CTABanner
          title={<>Готовы обсудить? <em className="not-italic text-gold">Перезвоним за 15 минут</em></>}
          sub="Менеджер ответит на любые вопросы по фактурам, срокам и цене. Без обязательств."
          button="Заказать звонок"
          variant="callback"
        />
      </Section>

      <CorniceStrip />

      <Section className="bg-cream/40 architectural-grid">
        <SectionHeader eyebrow="Отзывы" title={<>Что говорят <em className="not-italic text-accent">клиенты</em></>} sub="С привязкой к Яндекс.Картам и 2GIS — каждое имя проверяемое." />
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
