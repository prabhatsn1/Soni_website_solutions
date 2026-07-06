import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { ProcessStepCard } from "@/components/sections/process-step-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.process;
  return { title: seo.title, description: seo.description };
}

export default function ProcessPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Process"
        title="How we take your project from idea to launch"
        description="A clear, collaborative process so you always know what's happening and what's next."
      />

      <SectionContainer>
        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.process.map((step) => (
            <StaggerItem key={step.step}>
              <ProcessStepCard step={step} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Ready to start the discovery phase?
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            The first step is always a conversation. Let&apos;s talk about your business and goals.
          </p>
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
