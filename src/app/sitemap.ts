import type { MetadataRoute } from "next";

const BASE = "https://felxmodaso-collab.github.io/atmosfera-potolki";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/services", "/calculator", "/portfolio", "/prices", "/about", "/contacts", "/privacy"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" ? 0.3 : 0.8,
  }));
}
