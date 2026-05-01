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
      <Section className="!pt-32">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end mb-16">
          <div>
            <div className="eyebrow mb-4">О компании</div>
            <h1 className="serif text-hero">
              Делаем то, в чём мы лучше всех — <em className="not-italic text-accent">натяжные потолки</em>.
            </h1>
          </div>
          <div className="text-muted max-w-md leading-relaxed">
            Не делаем «всё подряд». Не строим квартиры под ключ, не продаём двери и не штукатурим. Только потолки — и потому делаем их лучше тех, у кого это побочный сервис.
          </div>
        </div>
        <Stats />
      </Section>

      <Section className="!pt-0">
        <div className="grid md:grid-cols-2 gap-2">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
            <img src={img("/images/team/03-showroom.jpg")} alt="Шоурум" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream"><img src={img("/images/team/01-measurer.jpg")} alt="Замерщик" className="w-full h-full object-cover" /></div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream"><img src={img("/images/team/02-installation.jpg")} alt="Монтаж" className="w-full h-full object-cover" /></div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream col-span-2"><img src={img("/images/team/04-equipment.jpg")} alt="Оборудование" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </Section>

      <Section className="bg-cream/50">
        <SectionHeader title="Принципы работы" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="card p-7">
              <div className="serif text-5xl text-accent/30 mb-2">{`0${i + 1}`}</div>
              <h3 className="serif text-2xl mb-2">{a.title}</h3>
              <p className="text-muted leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Процесс" title="Полный цикл за 5–7 дней" />
        <Process />
      </Section>

      <Section className="bg-cream/50">
        <SectionHeader eyebrow="Реквизиты" title="Юридическая прозрачность" />
        <div className="card p-8 lg:p-10 grid md:grid-cols-2 gap-6 text-sm">
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
      <span className="text-xs uppercase tracking-[0.18em] text-muted mb-1">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
