import type { Metadata } from "next";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { StatsRow } from "@/components/sections/stats-row";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.testimonials;
  return { title: seo.title, description: seo.description };
}

export default function TestimonialsPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Trusted by businesses that value results"
        description="Here's what clients say after working with us on their website."
      />

      <SectionContainer>
        <StatsRow stats={data.hero.stats} className="mb-16" />
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>
    </>
  );
}
