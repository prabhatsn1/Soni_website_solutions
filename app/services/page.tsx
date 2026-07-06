import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { ServiceCard } from "@/components/sections/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.services;
  return { title: seo.title, description: seo.description };
}

export default function ServicesPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Websites built for every stage of your business"
        description="From your first landing page to a full e-commerce build, we have a service designed for exactly where your business is today."
      />

      <SectionContainer>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading
          title="Not sure which service fits your business?"
          description="Book a free discovery call and we'll help you find the right starting point."
        />
        <FadeIn className="mt-10 flex justify-center">
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact">
              Start a Project
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>
    </>
  );
}
