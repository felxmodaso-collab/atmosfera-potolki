import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ContactProvider from "@/components/ContactProvider";

export const metadata: Metadata = {
  title: "АТМОСФЕРА — натяжные потолки в Москве и МО | Гарантия 12 лет",
  description:
    "Натяжные потолки под ключ за 1 день. Матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие. Замер бесплатно. Цена в договоре. Гарантия 12 лет.",
  keywords: ["натяжные потолки", "потолок под ключ", "натяжной потолок Москва", "парящий потолок", "двухуровневый потолок"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ContactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </ContactProvider>
      </body>
    </html>
  );
}
