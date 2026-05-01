import { Section, SectionHeader } from "@/components/Section";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import { ADVANTAGES, COMPANY } from "@/lib/data";
import { img } from "@/lib/img";

export const metadata = {
  title: "О компании АТМОСФЕРА · Натяжные потолки в Москве",
  description: "Бригады, оборудование, гарантия 12 лет. Больше 3 800 объектов в Москве и Подмосковье с 2014 года.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src={img("/images/team/03-showroom.jpg")} alt="" aria-hidden className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.55) 0%, rgba(14,15,17,.3) 50%, rgba(14,15,17,.95) 100%)" }} />
        </div>
        <div className="container-x relative grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="eyebrow eyebrow-light mb-5">О компании</div>
            <h1 className="serif text-hero max-w-3xl">
              Делаем то, в чём мы лучше всех — <em className="not-italic text-gold">натяжные потолки</em>.
            </h1>
          </div>
          <p className="text-lg text-bg/75 max-w-md leading-relaxed">
            Не делаем «всё подряд». Не строим квартиры под ключ, не продаём двери и не штукатурим. Только потолки — и потому делаем их лучше тех, у кого это побочный сервис.
          </p>
        </div>
      </section>

      <Section className="bg-cream/40">
        <Stats />
      </Section>

      <Section className="!pt-0">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-cream">
            <img src={img("/images/team/02-installation.jpg")} alt="Монтаж" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-6 lg:col-span-5 aspect-[5/4] rounded-2xl overflow-hidden bg-cream">
            <img src={img("/images/team/01-measurer.jpg")} alt="Замерщик" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-6 lg:col-span-5 aspect-[5/4] rounded-2xl overflow-hidden bg-cream">
            <img src={img("/images/team/04-equipment.jpg")} alt="Оборудование" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-12 lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-cream">
            <img src={img("/images/team/03-showroom.jpg")} alt="Шоурум" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      <Section className="bg-ink text-bg">
        <SectionHeader eyebrow="Принципы работы" title={<>Шесть правил, которым <em className="not-italic text-gold">не изменяем</em></>} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-bg/8 rounded-3xl overflow-hidden border border-bg/10">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="bg-ink p-9 group hover:bg-graphite/40 transition-colors">
              <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4 tabular">{`0${i + 1}`}</div>
              <h3 className="serif text-2xl mb-3">{a.title}</h3>
              <p className="text-bg/70 leading-relaxed text-sm">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Процесс" title={<>Полный цикл <em className="not-italic text-accent">за 5–7 дней</em></>} />
        <Process />
      </Section>

      <Section className="bg-cream/40">
        <SectionHeader eyebrow="Реквизиты" title="Юридическая прозрачность" />
        <div className="card p-8 lg:p-10 grid md:grid-cols-2 gap-x-8 gap-y-5 text-sm">
          <Field label="Юридическое лицо" value={COMPANY.legal} />
          <Field label="ИНН" value={COMPANY.inn} />
          <Field label="ОГРН" value={COMPANY.ogrn} />
          <Field label="Опыт работы" value={`${COMPANY.experience} (с 2014 года)`} />
          <Field label="Гарантия на полотно" value={COMPANY.guarantee} />
          <Field label="Гарантия на монтажные работы" value="5 лет" />
          <Field label="Реализованных проектов" value={COMPANY.projects} />
          <Field label="Сертификация" value="ИСО-9001, ГОСТ Р, экологический сертификат" />
        </div>
      </Section>

      <Section>
        <CTABanner
          title="Хотите познакомиться?"
          sub="Приезжайте в наш шоурум на Тверской — посмотрите все 8 фактур вживую, пообщайтесь с менеджером. Или мы приедем к вам с каталогом."
          button="Записаться на встречу"
          variant="measurer"
        />
      </Section>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-[0.18em] text-muted mb-1.5">{label}</span>
      <span className="font-medium tabular">{value}</span>
    </div>
  );
}
