import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getSiteData, getBlogPostBySlug } from "@/lib/get-site-data";
import { SectionContainer } from "@/components/sections/section-container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";

export function generateStaticParams() {
  return getSiteData().blog.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="bg-radial-fade">
      <SectionContainer className="max-w-3xl">
        <FadeIn className="flex flex-col gap-6">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {date} &middot; {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">By {post.author}</p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.content}
          </p>
        </FadeIn>
      </SectionContainer>
    </section>
  );
}
