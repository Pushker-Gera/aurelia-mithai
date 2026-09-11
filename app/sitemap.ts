import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { articles } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacy", "/terms", ...articles.map((a) => `/journal/${a.slug}`)].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date("2026-09-12"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
