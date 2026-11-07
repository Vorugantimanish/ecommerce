import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { legalSlugs } from "@/lib/legal-slugs";

const base = (
  process.env.NEXT_PUBLIC_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/about", "/contact", "/faq", "/search"];
  const legal = legalSlugs.map((s) => `/legal/${s}`);
  return [
    ...[...pages, ...legal].map((p) => ({ url: `${base}${p}` })),
    ...categories.map((c) => ({ url: `${base}/category/${c.slug}` })),
    ...products.map((p) => ({ url: `${base}/product/${p.slug}` })),
  ];
}
