import type { Metadata } from "next";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FadeIn } from "@/components/motion";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.faq;
  return { title: seo.title, description: seo.description };
}

export default function FaqPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything you need to know before starting a project with us."
      />

      <SectionContainer>
        <FadeIn className="mx-auto max-w-3xl">
          <FaqAccordion items={data.faq} />
        </FadeIn>
      </SectionContainer>
    </>
  );
}
