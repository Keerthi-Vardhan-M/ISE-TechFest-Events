import type { MetadataRoute } from "next";
import { ORGANISER_INFO } from "@/content/events";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = ORGANISER_INFO.siteUrl.replace(/[\[\]]/g, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
