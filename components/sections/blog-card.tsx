import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/types/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <Card className="h-full justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="flex h-full flex-col gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="text-xs text-muted-foreground">{post.readTime}</span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {post.title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>{date}</span>
            <span className="inline-flex items-center gap-1 font-medium text-accent">
              Read more
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
