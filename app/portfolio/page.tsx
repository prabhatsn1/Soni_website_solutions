"use client";

import * as React from "react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const data = getSiteData();
const allTags = ["All", ...Array.from(new Set(data.portfolio.flatMap((p) => p.tags)))];

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = React.useState("All");

  const filtered =
    activeTag === "All"
      ? data.portfolio
      : data.portfolio.filter((project) => project.tags.includes(activeTag));

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Real projects, real results"
        description="A selection of websites we've designed and built for businesses across industries."
      />

      <SectionContainer>
        <div
          role="group"
          aria-label="Filter projects by tag"
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {allTags.map((tag) => (
            <Button
              key={tag}
              type="button"
              size="sm"
              variant={activeTag === tag ? "gradient" : "outline"}
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(tag)}
              className={cn(activeTag === tag && "shadow-md")}
            >
              {tag}
            </Button>
          ))}
        </div>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <PortfolioCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No projects found for this filter yet.
          </p>
        ) : null}
      </SectionContainer>
    </>
  );
}
