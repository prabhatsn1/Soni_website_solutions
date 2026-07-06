import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.caseStudies;
  return { title: seo.title, description: seo.description };
}

export default function CaseStudiesPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Deeper dives into how we solve real problems"
        description="See the full story behind some of our most impactful projects — the problem, the approach, and the measurable results."
      />

      <SectionContainer>
        <StaggerContainer className="grid gap-6 lg:grid-cols-2">
          {data.caseStudies.map((study) => (
            <StaggerItem key={study.id}>
              <Link href={`/case-studies/${study.slug}`} className="group block h-full">
                <Card className="h-full justify-between gap-6 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{study.category}</Badge>
                      <span className="text-xs text-muted-foreground">{study.client}</span>
                    </div>
                    <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {study.title}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-6 border-t border-border pt-6">
                    {study.results.map((result) => (
                      <div key={result.label} className="flex flex-col">
                        <span className="text-xl font-semibold text-gradient">
                          {result.value}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {result.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Read case study
                    <ArrowUpRight className="size-4" />
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>
    </>
  );
}
