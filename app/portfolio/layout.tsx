import type { Metadata } from "next";

import { getSiteData } from "@/lib/get-site-data";

export function generateMetadata(): Metadata {
  const seo = getSiteData().seo.portfolio;
  return { title: seo.title, description: seo.description };
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
