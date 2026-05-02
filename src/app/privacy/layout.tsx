import type { Metadata } from "next";
import { OG_IMAGES, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description: "Политика обработки персональных данных по 152-ФЗ. Цели, сроки хранения, права субъекта, контакты оператора.",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    title: "Политика обработки персональных данных — АТМОСФЕРА",
    description: "152-ФЗ: цели, сроки хранения, права субъекта, контакты оператора.",
    url: "/privacy/",
    images: [...OG_IMAGES],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: "Политика обработки персональных данных",
    description: "152-ФЗ: цели, сроки, права субъекта.",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
