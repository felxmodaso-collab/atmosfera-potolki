import Link from "next/link";
import { MessageCircle, Send, Phone, Mail, MapPin, Clock, ShieldCheck, Award, BadgeCheck, CreditCard } from "lucide-react";
import { COMPANY, NAV } from "@/lib/data";
import Marquee from "./Marquee";

export default function Footer() {
  return (
    <footer className="bg-ink text-bg">
      <Marquee tone="dark" />

      <div className="container-x py-20 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="serif text-4xl mb-2">АТМОСФЕРА</div>
          <div className="text-xs uppercase tracking-[0.22em] text-bg/45 mb-6">натяжные потолки · с 2014</div>
          <p className="text-bg/65 max-w-md leading-relaxed">
            Премиум-уровень в каждом метре потолка. Цена в договоре, гарантия 12&nbsp;лет, монтаж за 1&nbsp;день. Москва и Московская область.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <a href={COMPANY.whatsapp} className="btn btn-wa !py-2.5 text-sm"><MessageCircle size={16} /> WhatsApp</a>
            <a href={COMPANY.telegram} className="btn btn-tg !py-2.5 text-sm"><Send size={16} /> Telegram</a>
            <a href={COMPANY.max} className="btn btn-gold !py-2.5 text-sm">MAX</a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs uppercase tracking-[0.2em] text-bg/45 mb-5">Навигация</h4>
          <ul className="space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="text-bg/85 hover:text-gold transition-colors">{n.label}</Link></li>
            ))}
            <li className="pt-2"><Link href="/privacy" className="text-bg/55 hover:text-bg text-xs">Политика конфиденциальности</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-bg/45 mb-5">Контакты</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3"><Phone  size={16} className="text-gold mt-0.5 shrink-0" /><a href={`tel:${COMPANY.phoneRaw}`} className="text-bg/90 hover:text-bg">{COMPANY.phone}</a></li>
            <li className="flex items-start gap-3"><Mail   size={16} className="text-gold mt-0.5 shrink-0" /><a href={`mailto:${COMPANY.email}`} className="text-bg/90 hover:text-bg">{COMPANY.email}</a></li>
            <li className="flex items-start gap-3"><MapPin size={16} className="text-gold mt-0.5 shrink-0" /><span className="text-bg/85">{COMPANY.address}</span></li>
            <li className="flex items-start gap-3"><Clock  size={16} className="text-gold mt-0.5 shrink-0" /><span className="text-bg/85">{COMPANY.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bg/10">
        <div className="container-x py-10 grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-bg/45 mb-4">Сертификаты</h5>
            <div className="flex flex-wrap gap-3 text-xs text-bg/70">
              <Cert icon={<ShieldCheck size={14} />} label="ИСО-9001" />
              <Cert icon={<Award size={14} />}       label="ГОСТ Р" />
              <Cert icon={<BadgeCheck size={14} />}  label="Эко-сертификат" />
              <Cert icon={<ShieldCheck size={14} />} label="Реестр ПДн" />
            </div>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] text-bg/45 mb-4">Способы оплаты</h5>
            <div className="flex flex-wrap gap-3 text-xs text-bg/70">
              <Cert icon={<CreditCard size={14} />} label="Карта" />
              <Cert icon={<CreditCard size={14} />} label="СБП" />
              <Cert icon={<CreditCard size={14} />} label="Расчётный счёт" />
              <Cert icon={<CreditCard size={14} />} label="Рассрочка 0%" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-bg/10">
        <div className="container-x py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-bg/50">
          <div>{COMPANY.legal} · ИНН {COMPANY.inn} · ОГРН {COMPANY.ogrn}</div>
          <div>© {new Date().getFullYear()} АТМОСФЕРА. Все права защищены.</div>
        </div>
      </div>
    </footer>
  );
}

function Cert({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg/5 border border-bg/10">
      <span className="text-gold">{icon}</span> {label}
    </span>
  );
}
