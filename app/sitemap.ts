import type { MetadataRoute } from "next";
import { ORGANISER_INFO } from "@/content/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = ORGANISER_INFO.siteUrl.replace(/[\[\]]/g, "");
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}

