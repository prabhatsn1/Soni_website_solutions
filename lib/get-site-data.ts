import mock from "@/data/mock.json";
import type { SiteData } from "@/types/site";

// Single source of truth for all site content. Import `getSiteData()`
// anywhere content is needed instead of hardcoding text in components.
export function getSiteData(): SiteData {
  return mock as SiteData;
}

export function getServiceBySlug(slug: string) {
  return getSiteData().services.find((service) => service.slug === slug);
}

export function getPortfolioBySlug(slug: string) {
  return getSiteData().portfolio.find((project) => project.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return getSiteData().caseStudies.find((study) => study.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return getSiteData().blog.find((post) => post.slug === slug);
}
