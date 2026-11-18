import type { MetadataRoute } from "next";
import { HELPDESK, ORBITA } from "@/lib/produtos";

const BASE_URL = "https://www.techvisions.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1),
    page("/servicos", 0.8),
    page("/produtos", 0.8),
    page(`/produtos/${HELPDESK.slug}`, 0.8),
    page(`/produtos/${ORBITA.slug}`, 0.7),
    page("/cases", 0.6),
    page("/contato", 0.7),
    page("/privacidade", 0.3, "yearly"),
    page("/termos", 0.3, "yearly"),
  ];
}
