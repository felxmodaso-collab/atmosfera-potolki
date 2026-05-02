import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Spectral, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import StickyWidget from "@/components/StickyWidget";
import ContactProvider from "@/components/ContactProvider";
import CookieBanner from "@/components/CookieBanner";
import QuizPopup from "@/components/QuizPopup";
import { COMPANY } from "@/lib/data";

const spectral = Spectral({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const BASE_PATH = "/atmosfera-potolki";
const SITE_URL = `https://felxmodaso-collab.github.io${BASE_PATH}`;
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;
const FAVICON = `${BASE_PATH}/favicon.svg`;
const APPLE_ICON = `${BASE_PATH}/apple-touch-icon.png`;
const YM_ID = process.env.NEXT_PUBLIC_YM_ID || ""; // пустой → счётчик не рендерится

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "АТМОСФЕРА — натяжные потолки в Москве и МО | Гарантия 12 лет",
    template: "%s — АТМОСФЕРА",
  },
  description:
    "Натяжные потолки под ключ за 1 день. Матовые, глянцевые, сатин, фотопечать, двухуровневые, парящие. Замер бесплатно. Цена в договоре. Гарантия 12 лет.",
  keywords: ["натяжные потолки", "потолок под ключ", "натяжной потолок Москва", "парящий потолок", "двухуровневый потолок"],
  icons: {
    icon: FAVICON,
    apple: APPLE_ICON,
  },
  manifest: `${BASE_PATH}/site.webmanifest`,
  alternates: { canonical: SITE_URL + "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "АТМОСФЕРА",
    title: "АТМОСФЕРА — натяжные потолки премиум-уровня в Москве и МО",
    description:
      "Бесшовное полотно до 5,1 м, монтаж за 1 день, гарантия 12 лет. Замер 0 ₽, цена в договоре, шоурум на Тверской.",
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: "АТМОСФЕРА — натяжные потолки" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "АТМОСФЕРА — натяжные потолки в Москве и МО",
    description: "Бесшовное полотно до 5,1 м, монтаж за 1 день, гарантия 12 лет.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F11" },
  ],
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#org`,
  name: "АТМОСФЕРА — натяжные потолки",
  legalName: COMPANY.legal,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: OG_IMAGE,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Тверская, 15, БЦ «Северный», офис 412",
    addressLocality: "Москва",
    addressRegion: "Москва",
    postalCode: "125009",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 55.762, longitude: 37.605 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "22:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Москва" },
    { "@type": "AdministrativeArea", name: "Московская область" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "8",
    bestRating: "5",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Натяжные потолки",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Матовый потолок" }, price: "850", priceCurrency: "RUB", priceSpecification: { "@type": "UnitPriceSpecification", unitCode: "MTK" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Глянцевый потолок" }, price: "980", priceCurrency: "RUB" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сатиновый потолок" }, price: "920", priceCurrency: "RUB" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Парящий контур" }, price: "1650", priceCurrency: "RUB" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Двухуровневый потолок" }, price: "1850", priceCurrency: "RUB" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Звёздное небо" }, price: "2950", priceCurrency: "RUB" },
    ],
  },
  sameAs: [COMPANY.whatsapp, COMPANY.telegram].filter(Boolean),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Сколько по времени занимает монтаж?", acceptedAnswer: { "@type": "Answer", text: "Стандартный матовый или глянцевый потолок 15–25 м² монтируется за 3–5 часов. Двухуровневый — 6–8 часов. Полный цикл «заявка → готовый потолок» обычно 5–7 дней." } },
    { "@type": "Question", name: "Нужно ли выносить мебель?", acceptedAnswer: { "@type": "Answer", text: "Нет. Достаточно сдвинуть к центру комнаты и накрыть плёнкой — мы привозим её с собой." } },
    { "@type": "Question", name: "Будет ли запах после монтажа?", acceptedAnswer: { "@type": "Answer", text: "Лёгкий запах ПВХ выветривается за 4–6 часов. Тканевые потолки не пахнут вообще." } },
    { "@type": "Question", name: "Можно ли потом мыть потолок?", acceptedAnswer: { "@type": "Answer", text: "Да. Глянцевые и сатиновые потолки моются влажной тряпкой со средством для стёкол. Матовые — сухой губкой." } },
    { "@type": "Question", name: "Что если затопят соседи?", acceptedAnswer: { "@type": "Answer", text: "ПВХ-полотно выдерживает до 100 л/м² без разрыва. Мы откачиваем воду через светильник, полотно высыхает и возвращается в форму." } },
    { "@type": "Question", name: "Сколько светильников можно встроить?", acceptedAnswer: { "@type": "Answer", text: "Минимум 4 точечных на 15 м². Максимум — без ограничений: можно сделать сетку 5×5, RGB-подсветку по периметру, центральную люстру и парящий контур одновременно." } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${spectral.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="absolute -top-20 left-4 z-[1000] focus:top-4 bg-ink text-bg px-4 py-2 rounded-full text-sm transition-all"
        >
          К содержанию
        </a>

        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Script
          id="ld-faq"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        {YM_ID && (
          <>
            <Script id="ym-counter" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${YM_ID}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });`}
            </Script>
            <noscript>
              <div>
                <img src={`https://mc.yandex.ru/watch/${YM_ID}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
              </div>
            </noscript>
          </>
        )}

        <ContactProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <FloatingContact />
          <StickyWidget />
          <CookieBanner />
          <QuizPopup />
        </ContactProvider>
      </body>
    </html>
  );
}
