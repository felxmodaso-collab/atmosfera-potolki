import { Section, SectionHeader } from "@/components/Section";
import Calculator from "@/components/Calculator";
import Quiz from "@/components/Quiz";
import CTABanner from "@/components/CTABanner";

import { OG_IMAGES, TWITTER_DEFAULTS } from "@/lib/seo";

export const metadata = {
  title: { absolute: "Калькулятор · Стоимость потолка — АТМОСФЕРА" },
  description: "Рассчитайте стоимость натяжного потолка онлайн за 30 секунд. Точная цена — после бесплатного замера.",
  alternates: { canonical: "/calculator/" },
  openGraph: {
    title: "Калькулятор стоимости натяжного потолка — АТМОСФЕРА",
    description: "Live-расчёт за 30 секунд. Скидка 10% при заявке через квиз. Финальная цена — в договоре после замера.",
    url: "/calculator/",
    images: OG_IMAGES,
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: "Калькулятор натяжного потолка — за 30 секунд",
    description: "Скидка 10% при заявке через квиз.",
  },
};

export default function CalculatorPage() {
  return (
    <>
      <Section className="!pt-32">
        <SectionHeader
          as="h1"
          eyebrow="Калькулятор"
          title={<>Стоимость натяжного потолка <em className="not-italic text-accent">за 30 секунд</em></>}
          sub="Выберите тип помещения, площадь, материал и опции. Калькулятор даст ориентировочную цену сразу — финальная сумма зафиксируется после бесплатного замера."
        />
        <Calculator />
      </Section>

      <Section className="bg-cream/50">
        <SectionHeader
          eyebrow="Квиз"
          title={<>Получите расчёт <em className="not-italic text-accent">со скидкой 10%</em></>}
          sub="6 вопросов — и личный менеджер пришлёт спецификацию с зафиксированной скидкой. Перезвоним за 15 минут после отправки."
        />
        <Quiz />
      </Section>

      <Section>
        <CTABanner
          title="Не хотите играть в калькулятор?"
          sub="Просто оставьте телефон — перезвоним и за 5 минут расскажем по делу: что подойдёт под ваш интерьер и сколько это будет стоить."
          button="Заказать звонок"
          variant="callback"
        />
      </Section>
    </>
  );
}
