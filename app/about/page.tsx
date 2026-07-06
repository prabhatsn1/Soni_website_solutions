import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { SectionHeading } from "@/components/sections/section-heading";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.about;
  return { title: seo.title, description: seo.description };
}

export default function AboutPage() {
  const data = getSiteData();
  const { about } = data;

  return (
    <>
      <PageHero
        eyebrow="About"
        title={`The studio behind ${data.brand.logoText}`}
        description={about.intro}
      />

      <SectionContainer>
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
          <FadeIn className="flex flex-col gap-5">
            <div className="flex aspect-square w-full max-w-xs items-center justify-center rounded-3xl border border-border bg-gradient-to-br from-accent/15 via-secondary to-secondary">
              <Avatar className="size-28">
                <AvatarFallback className="text-3xl">
                  {about.founder.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </FadeIn>
          <FadeIn delay={0.05} className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              {about.founder.name}
            </h2>
            <p className="text-sm font-medium text-accent">{about.founder.role}</p>
            <p className="leading-relaxed text-muted-foreground">{about.founder.bio}</p>
            <p className="leading-relaxed text-muted-foreground">
              {about.founderBackground}
            </p>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
          <FadeIn className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Why this business exists</h2>
            <p className="leading-relaxed text-muted-foreground">{about.whyExists}</p>
          </FadeIn>
          <FadeIn delay={0.05} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Our philosophy</h2>
            <p className="leading-relaxed text-muted-foreground">{about.philosophy}</p>
          </FadeIn>
        </div>
        <FadeIn delay={0.1} className="mx-auto mt-10 max-w-4xl rounded-2xl border border-accent/30 bg-accent/5 p-8 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
            Our Mission
          </h2>
          <p className="mt-3 text-xl font-medium tracking-tight text-balance">
            {about.mission}
          </p>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-border">
        <SectionHeading title="Our values" description="The principles behind every project we take on." />
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2">
          {about.values.map((value) => (
            <StaggerItem key={value.title}>
              <Card className="h-full px-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col gap-2 px-0">
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading title="How we work" description="A quick overview of our process, from first call to launch." />
        <FadeIn className="mx-auto mt-12 flex max-w-2xl flex-col gap-4">
          {about.processSummary.map((item, i) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{i + 1}.</span> {item}
              </span>
            </div>
          ))}
        </FadeIn>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact">
              Work with us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>
    </>
  );
}
