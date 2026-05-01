"use client";
import { Section, SectionHeader } from "@/components/Section";
import FAQList from "@/components/FAQList";
import { COMPANY } from "@/lib/data";
import { useState } from "react";

export default function ContactsPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [agree, setAgree] = useState(true);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !agree) return;
    setSent(true);
  };

  return (
    <>
      <Section className="!pt-32">
        <SectionHeader
          eyebrow="Контакты"
          title="Свяжитесь любым удобным способом"
          sub="Перезваниваем за 15 минут в рабочее время. Замер — бесплатно. Без напоминаний и спама после."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-8 lg:p-10">
            <h3 className="serif text-2xl mb-6">Связаться сейчас</h3>
            <ul className="space-y-4 mb-8">
              <ContactItem label="Телефон" value={COMPANY.phone} href={`tel:${COMPANY.phoneRaw}`} />
              <ContactItem label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <ContactItem label="Адрес" value={COMPANY.address} />
              <ContactItem label="Часы работы" value={COMPANY.hours} />
            </ul>

            <h4 className="text-sm uppercase tracking-[0.18em] text-muted mb-4">Мессенджеры</h4>
            <div className="flex flex-wrap gap-3">
              <a href={COMPANY.whatsapp} className="btn btn-accent !py-3">WhatsApp</a>
              <a href={COMPANY.telegram} className="btn btn-accent !py-3">Telegram</a>
              <a href={COMPANY.max} className="btn btn-accent !py-3">MAX</a>
            </div>
          </div>

          <div className="card p-8 lg:p-10">
            <h3 className="serif text-2xl mb-6">Написать сообщение</h3>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-6xl text-success mb-3">✓</div>
                <h4 className="serif text-xl mb-2">Сообщение отправлено</h4>
                <p className="text-muted">Свяжемся в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea placeholder="Сообщение (тип помещения, площадь, вопросы)" rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} />
                <label className="flex items-start gap-3 text-sm text-muted py-2">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "2px" }} />
                  <span>Согласен на обработку персональных данных в соответствии с <a href="/privacy" className="underline hover:text-ink">Политикой конфиденциальности</a></span>
                </label>
                <button type="submit" className="btn btn-primary w-full" disabled={!phone || !agree}>Отправить сообщение</button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section id="faq" className="bg-cream/50">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
        <FAQList />
      </Section>

      <Section>
        <SectionHeader title="Где мы находимся" />
        <div className="card overflow-hidden">
          <div className="aspect-[16/7] bg-cream relative flex items-center justify-center">
            <iframe
              title="Карта"
              src="https://yandex.ru/map-widget/v1/?ll=37.605000%2C55.762000&z=15&pt=37.605000,55.762000,pm2blm"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-6 grid sm:grid-cols-3 gap-4 text-sm">
            <div><div className="text-muted">Адрес</div><div>{COMPANY.address}</div></div>
            <div><div className="text-muted">Метро</div><div>Тверская / Пушкинская / Чеховская</div></div>
            <div><div className="text-muted">Парковка</div><div>Бесплатно для клиентов</div></div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <li className="flex flex-col">
      <span className="text-xs uppercase tracking-[0.18em] text-muted mb-0.5">{label}</span>
      {href ? <a href={href} className="text-lg hover:text-accent transition">{value}</a> : <span className="text-lg">{value}</span>}
    </li>
  );
}
