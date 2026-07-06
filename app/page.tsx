import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { getSiteData } from "@/lib/get-site-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/sections/section-container";
import { SectionHeading } from "@/components/sections/section-heading";
import { StatsRow } from "@/components/sections/stats-row";
import { ServiceCard } from "@/components/sections/service-card";
import { ProcessStepCard } from "@/components/sections/process-step-card";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { TestimonialCard } from "@/components/sections/testimonial-card";
import { PricingCard } from "@/components/sections/pricing-card";
import { BlogCard } from "@/components/sections/blog-card";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { HeroCanvas } from "@/components/3d/hero-canvas";
import { DynamicIcon } from "@/lib/icon-map";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.home;
  return { title: seo.title, description: seo.description };
}

export default function Home() {
  const data = getSiteData();

  return (
    <>
      {/* Hero */}
      <section className="bg-radial-fade relative overflow-hidden">
        <div className="container-x relative grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center lg:py-32">
          <FadeIn className="flex flex-col items-start gap-6">
            <Badge variant="accent">{data.hero.badge}</Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
              {data.hero.headline.split(data.hero.highlightWord)[0]}
              <span className="text-gradient">{data.hero.highlightWord}</span>
              {data.hero.headline.split(data.hero.highlightWord)[1]}
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.hero.subheadline}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg">
                <Link href={data.hero.primaryCta.href}>
                  {data.hero.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={data.hero.secondaryCta.href}>
                  {data.hero.secondaryCta.label}
                </Link>
              </Button>
            </div>
            <div className="w-full pt-4">
              <StatsRow stats={data.hero.stats} />
            </div>
          </FadeIn>

          <div className="relative h-80 md:h-[26rem] lg:h-[32rem]">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* Logo cloud */}
      <SectionContainer className="py-14 md:py-16">
        <FadeIn className="flex flex-col items-center gap-8">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by growing businesses
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70 grayscale">
            {data.logos.map((logo) => (
              <span key={logo.name} className="text-lg font-semibold tracking-tight">
                {logo.name}
              </span>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      {/* Services overview */}
      <SectionContainer className="border-t border-border">
        <SectionHeading
          eyebrow="Services"
          title="Everything your business needs online"
          description="From a single landing page to a full e-commerce build, we design and develop the right website for your goals."
        />
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/services">
              View all services
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      {/* Why choose us */}
      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading
          eyebrow="Why Us"
          title="Built by an engineer, designed like a studio"
          description="We combine premium design sensibility with production-grade engineering — no page builders, no shortcuts."
        />
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.whyChooseUs.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <DynamicIcon name={item.icon} className="size-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      {/* Process preview */}
      <SectionContainer className="border-t border-border">
        <SectionHeading
          eyebrow="Process"
          title="A clear path from idea to launch"
          description="Every project follows the same proven process, so you always know what's happening and what's next."
        />
        <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.process.map((step) => (
            <StaggerItem key={step.step}>
              <ProcessStepCard step={step} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/process">
              See our full process
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      {/* Portfolio highlights */}
      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading
          eyebrow="Portfolio"
          title="Recent work we're proud of"
          description="A look at real projects that helped businesses grow their online presence."
        />
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.portfolio
            .filter((project) => project.featured)
            .slice(0, 3)
            .map((project) => (
              <StaggerItem key={project.id}>
                <PortfolioCard project={project} />
              </StaggerItem>
            ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/portfolio">
              View full portfolio
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      {/* Testimonials preview */}
      <SectionContainer className="border-t border-border">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our clients say"
          description="We measure success by the results our clients see after launch."
        />
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.slice(0, 3).map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/testimonials">
              Read more reviews
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      {/* Pricing preview */}
      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading
          eyebrow="Pricing"
          title="Transparent, straightforward pricing"
          description="Choose the plan that fits your business, or talk to us about something custom."
        />
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
          {data.pricing.plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <FadeIn className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/pricing">
              Compare all plans
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeIn>
      </SectionContainer>

      {/* FAQ preview */}
      <SectionContainer className="border-t border-border">
        <div className="mx-auto grid max-w-4xl gap-10">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Answers to the questions we hear most often from new clients."
          />
          <FadeIn>
            <FaqAccordion items={data.faq.slice(0, 5)} />
          </FadeIn>
          <FadeIn className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/faq">
                View all FAQs
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </SectionContainer>

      {/* Blog preview */}
      <SectionContainer className="border-t border-border bg-secondary/30">
        <SectionHeading
          eyebrow="Resources"
          title="Ideas to help your business grow online"
          description="Practical, no-fluff articles about web design, performance, and conversion."
        />
        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-3">
          {data.blog.slice(0, 3).map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>

      {/* Final CTA */}
      <SectionContainer className="border-t border-border">
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/15 via-secondary to-secondary px-6 py-16 text-center md:px-16 md:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              {data.cta.finalCta.title}
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {data.cta.finalCta.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg">
                <Link href={data.cta.finalCta.primaryCta.href}>
                  {data.cta.finalCta.primaryCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={data.cta.finalCta.secondaryCta.href}>
                  {data.cta.finalCta.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>
    </>
  );
}
