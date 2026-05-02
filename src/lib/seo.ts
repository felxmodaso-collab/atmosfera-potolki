// Общая SEO-константа для openGraph и twitter inner-страниц.
// Без явного images: на странице, openGraph объект переопределяет родительский
// в layout — og:image пропадает. Поэтому здесь — единый источник.

const SITE_URL = "https://felxmodaso-collab.github.io/atmosfera-potolki";

export const OG_IMAGE_URL = `${SITE_URL}/images/og-cover.jpg`;

export const OG_IMAGES = [
  {
    url: OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: "АТМОСФЕРА — натяжные потолки премиум-уровня",
  },
] as const;

export const TWITTER_DEFAULTS = {
  card: "summary_large_image" as const,
  images: [OG_IMAGE_URL],
};
