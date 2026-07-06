import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <Badge variant="accent" className="uppercase tracking-wide">
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
