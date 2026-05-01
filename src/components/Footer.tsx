import Link from "next/link";
import { COMPANY, NAV } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <div className="container-x py-16 grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <div className="serif text-3xl mb-3">АТМОСФЕРА</div>
          <p className="text-cream/70 max-w-sm leading-relaxed text-sm">
            Натяжные потолки премиум-уровня в Москве и Московской области с 2014 года.
            Цена в договоре, гарантия 12 лет, монтаж за 1 день.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={COMPANY.whatsapp} className="btn btn-accent !py-2 text-sm">WhatsApp</a>
            <a href={COMPANY.telegram} className="btn btn-accent !py-2 text-sm">Telegram</a>
            <a href={COMPANY.max} className="btn btn-accent !py-2 text-sm">MAX</a>
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-cream/50 mb-4">Навигация</h4>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-cream/85 hover:text-cream">{n.label}</Link></li>
            ))}
            <li><Link href="/privacy" className="text-cream/85 hover:text-cream">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-cream/50 mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm text-cream/85">
            <li><a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-cream">{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-cream">{COMPANY.email}</a></li>
            <li>{COMPANY.address}</li>
            <li>{COMPANY.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-cream/55">
          <div>{COMPANY.legal}, ИНН {COMPANY.inn}, ОГРН {COMPANY.ogrn}</div>
          <div>© {new Date().getFullYear()} АТМОСФЕРА. Все права защищены.</div>
        </div>
      </div>
    </footer>
  );
}
