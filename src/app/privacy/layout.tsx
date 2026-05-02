import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных по 152-ФЗ. Цели, сроки хранения, права субъекта, контакты оператора.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
