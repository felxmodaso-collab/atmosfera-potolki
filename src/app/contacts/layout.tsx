import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты · Шоурум на Тверской",
  description: "Телефон, email, адрес шоурума на Тверской. WhatsApp, Telegram, Яндекс.Карты, форма заявки. Перезваниваем за 15 минут.",
  alternates: { canonical: "/contacts/" },
};

export default function ContactsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
