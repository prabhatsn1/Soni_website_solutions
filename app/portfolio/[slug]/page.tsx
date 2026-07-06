import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getSiteData, getPortfolioBySlug } from "@/lib/get-site-data";
import { SectionContainer } from "@/components/sections/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";

export function generateStaticParams() {
  return getSiteData().portfolio.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.result,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPortfolioBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <section className="bg-radial-fade border-b border-border">
        <div className="container-x flex flex-col gap-6 py-20 md:py-28">
          <FadeIn className="flex flex-col gap-6">
            <Link
              href="/portfolio"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" />
              Back to portfolio
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{project.category}</Badge>
              <span className="text-sm text-muted-foreground">{project.year}</span>
              <span className="text-sm text-muted-foreground">&middot; {project.client}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionContainer>
        <div className="mx-auto grid max-w-3xl gap-10">
          <FadeIn className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">The Problem</h2>
            <p className="leading-relaxed text-muted-foreground">{project.problem}</p>
          </FadeIn>
          <FadeIn delay={0.05} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">The Solution</h2>
            <p className="leading-relaxed text-muted-foreground">{project.solution}</p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-6">
            <h2 className="text-xl font-semibold">The Result</h2>
            <p className="leading-relaxed text-muted-foreground">{project.result}</p>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 flex flex-col items-center gap-5 border-t border-border pt-16 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">
            Want results like this for your business?
          </h3>
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
