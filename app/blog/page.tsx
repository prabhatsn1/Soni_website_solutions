import type { Metadata } from "next";

import { getSiteData } from "@/lib/get-site-data";
import { PageHero } from "@/components/page-hero";
import { SectionContainer } from "@/components/sections/section-container";
import { BlogCard } from "@/components/sections/blog-card";
import { StaggerContainer, StaggerItem } from "@/components/motion";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.blog;
  return { title: seo.title, description: seo.description };
}

export default function BlogPage() {
  const data = getSiteData();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Resources for growing your business online"
        description="Practical guides on web design, performance, and conversion — no fluff."
      />

      <SectionContainer>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.blog.map((post) => (
            <StaggerItem key={post.id}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionContainer>
    </>
  );
}
