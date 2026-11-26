import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export const dynamic = "force-static";

/** Mapa do site para os buscadores: a home e as cinco paginas internas. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1, changeFrequency: "monthly" },
    ...nav.map((n) => ({ url: `${site.url}${n.href}`, priority: 0.8, changeFrequency: "monthly" as const })),
  ];
}
