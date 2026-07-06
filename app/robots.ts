import type { MetadataRoute } from "next";

import { getSiteData } from "@/lib/get-site-data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteData().site.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
