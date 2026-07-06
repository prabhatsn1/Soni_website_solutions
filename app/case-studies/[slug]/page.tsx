import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

import { getSiteData, getCaseStudyBySlug } from "@/lib/get-site-data";
import { SectionContainer } from "@/components/sections/section-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion";

export function generateStaticParams() {
  return getSiteData().caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) notFound();

  const testimonial = study.testimonialId
    ? getSiteData().testimonials.find((t) => t.id === study.testimonialId)
    : undefined;

  return (
    <>
      <section className="bg-radial-fade border-b border-border">
        <div className="container-x flex flex-col gap-6 py-20 md:py-28">
          <FadeIn className="flex flex-col gap-6">
            <Link
              href="/case-studies"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" />
              Back to case studies
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{study.category}</Badge>
              <span className="text-sm text-muted-foreground">{study.client}</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
              {study.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {study.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
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
          <FadeIn className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
            {study.results.map((result) => (
              <div key={result.label} className="flex flex-col items-center gap-1 text-center">
                <span className="text-2xl font-semibold text-gradient">
                  {result.value}
                </span>
                <span className="text-xs text-muted-foreground">{result.label}</span>
              </div>
            ))}
          </FadeIn>

          <FadeIn delay={0.05} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">The Problem</h2>
            <p className="leading-relaxed text-muted-foreground">{study.problem}</p>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">Our Approach</h2>
            <p className="leading-relaxed text-muted-foreground">{study.approach}</p>
          </FadeIn>
          <FadeIn delay={0.15} className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">The Solution</h2>
            <p className="leading-relaxed text-muted-foreground">{study.solution}</p>
          </FadeIn>

          {testimonial ? (
            <FadeIn className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-8">
              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.name}, {testimonial.role} at {testimonial.company}
              </p>
            </FadeIn>
          ) : null}
        </div>

        <FadeIn className="mt-16 flex flex-col items-center gap-5 border-t border-border pt-16 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">
            Want to be our next success story?
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
