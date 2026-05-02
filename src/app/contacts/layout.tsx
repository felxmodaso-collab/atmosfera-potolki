import type { Metadata } from "next";
import { OG_IMAGES, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты · Шоурум на Тверской",
  description: "Телефон, email, адрес шоурума на Тверской. WhatsApp, Telegram, Яндекс.Карты, форма заявки. Перезваниваем за 15 минут.",
  alternates: { canonical: "/contacts/" },
  openGraph: {
    title: "Контакты — АТМОСФЕРА · Шоурум на Тверской 15",
    description: "Перезваниваем за 15 минут. Замер 0 ₽. WhatsApp, Telegram, Яндекс.Карты, форма заявки.",
    url: "/contacts/",
    images: [...OG_IMAGES],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: "Контакты АТМОСФЕРА · Шоурум на Тверской",
    description: "Перезваниваем за 15 минут. Замер 0 ₽.",
  },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
