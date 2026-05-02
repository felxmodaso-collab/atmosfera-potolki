import type { MetadataRoute } from "next";

const BASE = "https://felxmodaso-collab.github.io/atmosfera-potolki";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/_next/", "/api/"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
