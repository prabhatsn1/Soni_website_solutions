// Central type definitions for the content stored in `data/mock.json`.
// Keep this file in sync with the JSON shape.

export interface LinkItem {
  label: string;
  href: string;
}

export interface SiteMeta {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  themeColor: string;
  keywords: string[];
}

export interface BrandInfo {
  name: string;
  logoText: string;
  shortLogoText: string;
  founderName: string;
  foundedYear: number;
}

export interface Navigation {
  links: LinkItem[];
  cta: LinkItem;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  highlightWord: string;
  subheadline: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  stats: StatItem[];
}

export interface LogoItem {
  name: string;
}

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  whatsIncluded: string[];
  whoItsFor: string;
  startingPrice: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  icon: string;
  title: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  client: string;
  year: string;
  featured: boolean;
  image: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
}

export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  problem: string;
  approach: string;
  solution: string;
  results: CaseStudyResult[];
  techStack: string[];
  image: string;
  testimonialId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  projectType: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billingNote: string;
  description: string;
  features: string[];
  notIncluded: string[];
  cta: string;
  highlighted: boolean;
}

export interface ComparisonFeature {
  feature: string;
  basic: string | boolean;
  standard: string | boolean;
  premium: string | boolean;
}

export interface CustomPlan {
  title: string;
  description: string;
  cta: string;
}

export interface Pricing {
  plans: PricingPlan[];
  comparisonFeatures: ComparisonFeature[];
  customPlan: CustomPlan;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export interface ContactInfo {
  email: string;
  address: string;
  availability: string;
  responseTime: string;
  calendlyUrl: string;
  formServiceOptions: string[];
  budgetOptions: string[];
}

export interface FooterInfo {
  description: string;
  quickLinks: LinkItem[];
  serviceLinks: LinkItem[];
  copyright: string;
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FinalCta {
  title: string;
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
}

export interface CtaContent {
  finalCta: FinalCta;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AboutContent {
  intro: string;
  founderBackground: string;
  whyExists: string;
  philosophy: string;
  mission: string;
  values: AboutValue[];
  processSummary: string[];
  founder: Founder;
}

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoContent {
  home: PageSeo;
  services: PageSeo;
  portfolio: PageSeo;
  about: PageSeo;
  pricing: PageSeo;
  contact: PageSeo;
  testimonials: PageSeo;
  blog: PageSeo;
  process: PageSeo;
  faq: PageSeo;
  caseStudies: PageSeo;
}

export interface SiteData {
  site: SiteMeta;
  brand: BrandInfo;
  navigation: Navigation;
  hero: HeroContent;
  logos: LogoItem[];
  services: Service[];
  whyChooseUs: WhyChooseUsItem[];
  process: ProcessStep[];
  portfolio: PortfolioProject[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  pricing: Pricing;
  faq: FaqItem[];
  blog: BlogPost[];
  contact: ContactInfo;
  footer: FooterInfo;
  social: SocialLink[];
  cta: CtaContent;
  about: AboutContent;
  seo: SeoContent;
}
