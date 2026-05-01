import Link from "next/link";
import Calculator from "@/components/Calculator";
import { Section, SectionHeader } from "@/components/Section";
import TypeCard from "@/components/TypeCard";
import ProjectCard from "@/components/ProjectCard";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQList from "@/components/FAQList";
import Stats from "@/components/Stats";
import CTABanner from "@/components/CTABanner";
import { TYPES, PROJECTS, ADVANTAGES, COMPANY } from "@/lib/data";
import { img } from "@/lib/img";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100vh] flex items-end pb-20 pt-32 overflow-hidden">
        <img
          src={img("/images/hero/main.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(250,248,244,.4) 0%, rgba(250,248,244,.1) 35%, rgba(14,15,17,.5) 100%)" }} />
        <div className="container-x relative">
          <div className="max-w-3xl text-bg fade-up">
            <span className="eyebrow !text-bg/80">с 2014 года · Москва и МО</span>
            <h1 className="serif text-hero mt-5 mb-6">
              Натяжной&nbsp;потолок премиум-уровня. <em className="not-italic text-accent">За один день.</em>
            </h1>
            <p className="text-lg md:text-xl text-bg/85 mb-9 max-w-2xl leading-relaxed">
              Полный цикл — от замера до сдачи под ключ. Цена в договоре, гарантия 12 лет, бесшовное полотно до 5,1 м без видимых стыков.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/calculator" className="btn btn-accent !py-4 !px-8 text-base">Рассчитать стоимость</Link>
              <a href={`tel:${COMPANY.phoneRaw}`} className="btn btn-outline !text-bg !border-bg/60 hover:!bg-bg hover:!text-ink !py-4 !px-8 text-base">
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section className="!pt-16">
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

      <Section className="bg-cream/50">
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
          <Link href="/portfolio" className="btn btn-outline">Все проекты →</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.slice(0, 6).map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </Section>

      <Section className="bg-cream/50">
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
          title="Почему 3 800+ клиентов выбрали нас"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="card p-7">
              <div className="serif text-2xl mb-2">{a.title}</div>
              <p className="text-muted leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream/50">
        <SectionHeader eyebrow="Отзывы" title="Что говорят клиенты" />
        <Testimonials />
      </Section>

      <Section>
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
        <FAQList limit={6} />
        <div className="mt-8 text-center">
          <Link href="/contacts#faq" className="btn btn-outline">Все вопросы и ответы →</Link>
        </div>
      </Section>

      <Section>
        <CTABanner
          title="Бесплатный замер за 0 ₽"
          sub="Замерщик приедет в удобное время. Привезёт каталог фактур, точные размеры комнаты, расчёт по каждому варианту. Без обязательств."
          button="Вызвать замерщика"
          variant="measurer"
        />
      </Section>
    </>
  );
}
