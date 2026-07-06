import Link from "next/link";
import { Check, X } from "lucide-react";

import type { PricingPlan } from "@/types/site";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        "relative h-full justify-between transition-all duration-300 hover:-translate-y-1",
        plan.highlighted
          ? "border-accent/50 shadow-xl ring-1 ring-accent/30 md:scale-105"
          : "hover:shadow-lg"
      )}
    >
      {plan.highlighted ? (
        <Badge
          variant="accent"
          className="absolute -top-3 left-1/2 -translate-x-1/2"
        >
          Most Popular
        </Badge>
      ) : null}
      <CardHeader className="gap-3">
        <h3 className="text-lg font-semibold">{plan.name}</h3>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
          <span className="pb-1 text-sm text-muted-foreground">
            {plan.billingNote}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {plan.description}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ul className="flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
          {plan.notIncluded.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted-foreground/60"
            >
              <X className="mt-0.5 size-4 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild variant={plan.highlighted ? "gradient" : "outline"} className="w-full">
          <Link href="/contact">{plan.cta}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
