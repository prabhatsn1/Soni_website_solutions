import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";

// Shared hero block used at the top of interior pages (Services, Pricing, etc).
export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section className={cn("bg-radial-fade relative overflow-hidden border-b border-border", className)}>
      <div className="container-x flex flex-col items-center gap-5 py-24 text-center md:py-32">
        <FadeIn className="flex flex-col items-center gap-5">
          {eyebrow ? (
            <Badge variant="accent" className="uppercase tracking-wide">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
