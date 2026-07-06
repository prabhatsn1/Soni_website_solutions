import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { PortfolioProject } from "@/types/site";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-accent/15 via-secondary to-secondary">
          <span className="text-4xl font-semibold tracking-tight text-accent/30 transition-transform duration-500 group-hover:scale-110">
            {project.title.charAt(0)}
          </span>
          <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </div>
        </div>
        <div className="flex flex-col gap-3 px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{project.category}</Badge>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.result}
          </p>
        </div>
      </Card>
    </Link>
  );
}
