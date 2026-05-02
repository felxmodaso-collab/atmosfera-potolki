"use client";
import { Section, SectionHeader } from "@/components/Section";
import FAQList from "@/components/FAQList";
import { COMPANY } from "@/lib/data";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { WhatsAppIcon, TelegramIcon, MaxIcon } from "@/components/BrandIcons";
import { img } from "@/lib/img";
import { useState } from "react";
import Link from "next/link";
import MockDisclaimer from "@/components/MockDisclaimer";
import { formatPhone, isPhoneValid } from "@/lib/phone";

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
      <section className="relative pt-40 pb-24 bg-ink text-bg overflow-hidden">
        <div className="absolute inset-0">
          <img src={img("/images/team/03-showroom.jpg")} alt="" aria-hidden className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.6) 0%, rgba(14,15,17,.35) 50%, rgba(14,15,17,.95) 100%)" }} />
        </div>
        <div className="container-x relative">
          <div className="eyebrow eyebrow-light mb-5">Контакты</div>
          <h1 className="serif text-hero max-w-3xl mb-6">
            Свяжитесь любым <em className="not-italic text-gold">удобным способом</em>
          </h1>
          <p className="text-lg md:text-xl text-bg/75 max-w-2xl leading-relaxed mb-12">
            Перезваниваем за 15 минут в рабочее время. Замер — бесплатно. Без напоминаний и спама после.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 pt-8 border-t border-bg/15 tabular max-w-3xl">
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">≤ 15 мин</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">время отклика</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">0 ₽</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">замер на объекте</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">4.9/5</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">средний рейтинг</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-light leading-none">Пн–Вс</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-bg/55 mt-2">9:00 — 22:00</div>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="card !rounded-3xl p-8 lg:p-10">
            <h3 className="serif text-2xl mb-6">Связаться сейчас</h3>
            <ul className="space-y-5 mb-8">
              <Row icon={<Phone size={18} />} label="Телефон" value={COMPANY.phone} href={`tel:${COMPANY.phoneRaw}`} />
              <Row icon={<Mail size={18} />}  label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <Row icon={<MapPin size={18} />} label="Адрес" value={COMPANY.address} />
              <Row icon={<Clock size={18} />}  label="Часы работы" value={COMPANY.hours} />
            </ul>

            <h4 className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Мессенджеры</h4>
            <div className="flex flex-wrap gap-2">
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-wa !py-2.5 text-sm"><WhatsAppIcon size={16} /> WhatsApp</a>
              <a href={COMPANY.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-tg !py-2.5 text-sm"><TelegramIcon size={16} /> Telegram</a>
              <a href={COMPANY.max} target="_blank" rel="noopener noreferrer" className="btn btn-gold !py-2.5 text-sm"><MaxIcon size={16} /> MAX</a>
            </div>
          </div>

          <div className="card !rounded-3xl p-8 lg:p-10">
            <h3 className="serif text-2xl mb-6">Написать сообщение</h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl text-sage mb-3">✓</div>
                <h4 className="serif text-xl mb-2">Сообщение отправлено</h4>
                <p className="text-muted">Свяжемся в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <Field label="Ваше имя">
                  <input type="text" placeholder="Анна" value={name} onChange={(e) => setName(e.target.value)} />
                </Field>
                <Field label="Телефон" required>
                  <input type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} inputMode="tel" />
                </Field>
                <Field label="Сообщение (необязательно)">
                  <textarea placeholder="Тип помещения, площадь, вопросы" rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} />
                </Field>
                <label className="flex items-start gap-3 text-sm text-muted py-2">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "2px" }} />
                  <span>Согласен на обработку персональных данных в соответствии с <Link href="/privacy" className="underline hover:text-ink">Политикой конфиденциальности</Link></span>
                </label>
                <button type="submit" className="btn btn-primary w-full" disabled={!isPhoneValid(phone) || !agree}>Отправить сообщение</button>
                <MockDisclaimer className="mt-3" />
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="card !rounded-3xl overflow-hidden grid lg:grid-cols-2">
          <div className="aspect-[16/10] lg:aspect-auto relative bg-cream overflow-hidden">
            <img
              src={img("/images/team/03-showroom.jpg")}
              alt="Шоурум на Тверской"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,17,.15) 0%, rgba(14,15,17,.55) 100%)" }} />
            <iframe
              title="Карта офиса"
              src="https://yandex.ru/map-widget/v1/?ll=37.605000%2C55.762000&z=15&pt=37.605000,55.762000,pm2blm&l=map"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-none">
              <span className="badge badge-line backdrop-blur"><MapPin size={12} /> Тверская, 15</span>
            </div>
          </div>
          <div className="p-8 lg:p-12 grid content-center gap-5">
            <div className="eyebrow">Где мы находимся</div>
            <div className="serif text-h2">Шоурум в центре Москвы</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><MapPin size={16} className="text-accent mt-0.5 shrink-0" /> {COMPANY.address}</li>
              <li className="flex items-start gap-3"><Clock size={16} className="text-accent mt-0.5 shrink-0" /> {COMPANY.hours}</li>
              <li className="text-muted">Метро: Тверская / Пушкинская / Чеховская — 5 минут пешком. Бесплатная парковка для клиентов на территории БЦ.</li>
            </ul>
            <a href="https://yandex.ru/maps/?text=Москва%20Тверская%2015" target="_blank" rel="noreferrer" className="btn btn-outline self-start">
              Открыть в Яндекс.Картах <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </Section>

      <Section id="faq" className="bg-cream/40">
        <SectionHeader eyebrow="FAQ" title="Частые вопросы" />
        <FAQList />
      </Section>
    </>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.18em] text-muted mb-0.5">{label}</span>
        {href ? <a href={href} className="text-lg hover:text-accent transition">{value}</a> : <span className="text-lg">{value}</span>}
      </div>
    </li>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-[0.18em] text-muted mb-2">
        {label} {required && <span className="text-coral">*</span>}
      </div>
      {children}
    </label>
  );
}
