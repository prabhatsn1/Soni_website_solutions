import type { MetadataRoute } from "next";

import { getSiteData } from "@/lib/get-site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const data = getSiteData();
  const baseUrl = data.site.url;

  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/pricing",
    "/contact",
    "/testimonials",
    "/blog",
    "/process",
    "/faq",
    "/case-studies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const portfolioRoutes = data.portfolio.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = data.blog.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const caseStudyRoutes = data.caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes, ...caseStudyRoutes];
}
