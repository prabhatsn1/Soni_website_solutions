import { Star, Quote } from "lucide-react";

import type { Testimonial } from "@/types/site";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="flex h-full flex-col gap-5">
        <Quote className="size-8 text-accent/40" />
        <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-accent text-accent" />
          ))}
        </div>
        <p className="flex-1 text-sm leading-relaxed text-foreground/90">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <Avatar>
            <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{testimonial.name}</span>
            <span className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
