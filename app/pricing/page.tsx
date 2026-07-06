import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { SectionHeading } from "@/components/sections/section-heading";
import { PricingCard } from "@/components/sections/pricing-card";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.pricing;
  return { title: seo.title, description: seo.description };
}

function ComparisonCell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-accent" />
    ) : (
      <X className="mx-auto size-4 text-muted-foreground/40" />
    );
  }
  return <span className="text-sm">{value}</span>;
}

export default function PricingPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Choose the plan that fits your business today. Every plan can grow with you."
      />

      <SectionContainer>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {data.pricing.plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading title="Compare plans" description="A closer look at what's included with each plan." />
        <FadeIn className="mt-12 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-center">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                  Feature
                </th>
                <th className="p-4 text-sm font-semibold">Basic</th>
                <th className="p-4 text-sm font-semibold text-accent">Standard</th>
                <th className="p-4 text-sm font-semibold">Premium</th>
              </tr>
            </thead>
            <tbody>
              {data.pricing.comparisonFeatures.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-background" : "bg-card/50"}
                >
                  <td className="p-4 text-left text-sm text-muted-foreground">
                    {row.feature}
                  </td>
                  <td className="p-4">
                    <ComparisonCell value={row.basic} />
                  </td>
                  <td className="p-4">
                    <ComparisonCell value={row.standard} />
                  </td>
                  <td className="p-4">
                    <ComparisonCell value={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-border">
        <FadeIn className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {data.pricing.customPlan.title}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {data.pricing.customPlan.description}
          </p>
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact">
              {data.pricing.customPlan.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <div className="mx-auto grid max-w-3xl gap-10">
          <SectionHeading title="Pricing questions" align="center" />
          <FaqAccordion items={data.faq.filter((f) => f.category === "Pricing" || f.category === "Process").slice(0, 4)} />
        </div>
      </SectionContainer>
    </>
  );
}
