"use client";
import { useState, useEffect } from "react";
import { COMPANY } from "@/lib/data";

const SECTIONS = [
  { id: "general",      n: "01", title: "Общие положения" },
  { id: "purposes",     n: "02", title: "Цели обработки персональных данных" },
  { id: "data",         n: "03", title: "Какие данные мы собираем" },
  { id: "consent",      n: "04", title: "Согласие на обработку" },
  { id: "retention",    n: "05", title: "Сроки и условия хранения" },
  { id: "transfer",     n: "06", title: "Передача третьим лицам" },
  { id: "russia",       n: "07", title: "Хранение на территории РФ" },
  { id: "security",     n: "08", title: "Меры защиты" },
  { id: "registry",     n: "09", title: "Регистрация в реестре операторов" },
  { id: "incidents",    n: "10", title: "Уведомление об инцидентах" },
  { id: "rights",       n: "11", title: "Права субъекта персональных данных" },
  { id: "contacts",     n: "12", title: "Контакты оператора" },
];

export default function PrivacyPage() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const onScroll = () => {
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(SECTIONS[i].id);
          return;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="relative pt-40 pb-12 bg-cream/40">
        <div className="container-x">
          <div className="eyebrow mb-5">152-ФЗ</div>
          <h1 className="serif text-hero max-w-4xl mb-4">
            Политика обработки <em className="not-italic text-accent">персональных данных</em>
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="badge badge-line">v 2.1</span>
            <span>действует с 01.09.2025</span>
          </div>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="text-xs uppercase tracking-[0.18em] text-muted mb-4">Содержание</div>
          <ol className="space-y-2 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-baseline gap-3 py-1.5 border-l-2 pl-4 transition-colors ${active === s.id ? "border-accent text-ink font-medium" : "border-transparent text-muted hover:text-ink hover:border-line"}`}
                >
                  <span className="text-xs tabular text-accent w-6">{s.n}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="max-w-2xl text-graphite leading-relaxed space-y-12">
          <Block id="general" n="01" title="Общие положения">
            <p>Настоящая Политика обработки персональных данных (далее — Политика) разработана {COMPANY.legal} (ИНН {COMPANY.inn}, ОГРН {COMPANY.ogrn}) в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности.</p>
          </Block>

          <Block id="purposes" n="02" title="Цели обработки персональных данных">
            <ul>
              <li>Заключение и исполнение договора на оказание услуг по установке натяжных потолков;</li>
              <li>Связь с клиентами для уточнения деталей заказа, согласования времени замера и монтажа;</li>
              <li>Выставление счетов, формирование первичных документов;</li>
              <li>Информирование о статусе заказа, гарантийном обслуживании;</li>
              <li>Маркетинговая коммуникация (только с явного согласия клиента).</li>
            </ul>
          </Block>

          <Block id="data" n="03" title="Какие данные мы собираем">
            <ul>
              <li>Фамилия, имя, отчество;</li>
              <li>Контактный номер телефона;</li>
              <li>Адрес электронной почты;</li>
              <li>Адрес объекта монтажа;</li>
              <li>Содержимое сообщений в формах обратной связи.</li>
            </ul>
            <p className="mt-4">Биометрические и специальные категории персональных данных не собираются.</p>
          </Block>

          <Block id="consent" n="04" title="Согласие на обработку">
            <p>Заполнение любой формы на сайте, оснащённой галочкой «Согласие на обработку персональных данных», является явным согласием субъекта на обработку перечисленных данных в указанных целях. Согласие может быть отозвано в любой момент путём направления заявления на {COMPANY.email}.</p>
          </Block>

          <Block id="retention" n="05" title="Сроки и условия хранения">
            <p>Персональные данные хранятся в течение срока действия договора и 5 лет после его исполнения для целей бухгалтерского и налогового учёта. По истечении срока данные подлежат уничтожению.</p>
          </Block>

          <Block id="transfer" n="06" title="Передача третьим лицам">
            <p>Персональные данные не передаются третьим лицам, за исключением случаев, когда это необходимо для исполнения договора (курьерские службы при доставке, банки при безналичных расчётах) или предусмотрено законом (по запросу уполномоченных государственных органов).</p>
          </Block>

          <Block id="russia" n="07" title="Хранение на территории Российской Федерации">
            <p>Все базы данных, содержащие персональные данные клиентов, размещены на серверах, физически расположенных на территории Российской Федерации, в соответствии с требованиями Федерального закона № 242-ФЗ.</p>
          </Block>

          <Block id="security" n="08" title="Меры защиты">
            <ul>
              <li>Передача данных по защищённым каналам HTTPS/TLS 1.3;</li>
              <li>Разграничение прав доступа на основе ролевой модели;</li>
              <li>Журналирование операций с персональными данными;</li>
              <li>Регулярные резервные копии и регламент восстановления;</li>
              <li>Антивирусная защита и контроль доступа на серверы.</li>
            </ul>
          </Block>

          <Block id="registry" n="09" title="Регистрация в реестре операторов">
            <p>{COMPANY.legal} зарегистрировано в реестре операторов, осуществляющих обработку персональных данных, в соответствии со статьёй 22 Федерального закона № 152-ФЗ.</p>
          </Block>

          <Block id="incidents" n="10" title="Уведомление об инцидентах">
            <p>В случае инцидента, связанного с неправомерной или случайной передачей персональных данных, мы уведомим Роскомнадзор в течение 24 часов с момента обнаружения, а также сообщим затронутым субъектам персональных данных.</p>
          </Block>

          <Block id="rights" n="11" title="Права субъекта персональных данных">
            <p>Вы вправе требовать уточнения, блокирования, уничтожения своих персональных данных, отзыва согласия и получения информации об их обработке. Запрос направляется на {COMPANY.email} с приложением копии документа, удостоверяющего личность.</p>
          </Block>

          <Block id="contacts" n="12" title="Контакты оператора">
            <ul className="!list-none !pl-0 space-y-1">
              <li>{COMPANY.legal}</li>
              <li>ИНН {COMPANY.inn} · ОГРН {COMPANY.ogrn}</li>
              <li>Адрес: {COMPANY.address}</li>
              <li>Email: {COMPANY.email}</li>
              <li>Телефон: {COMPANY.phone}</li>
            </ul>
          </Block>
        </article>
      </section>
    </>
  );
}

function Block({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-xs uppercase tracking-[0.22em] text-accent tabular">{n}</span>
        <div className="flex-1 h-px bg-line" />
      </div>
      <h2 className="serif text-3xl mb-5">{title}</h2>
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:text-graphite [&_p]:text-graphite">{children}</div>
    </section>
  );
}
