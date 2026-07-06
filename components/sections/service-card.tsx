import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

import type { Service } from "@/types/site";
import { DynamicIcon } from "@/lib/icon-map";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group h-full justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" id={service.slug}>
      <CardHeader className="gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <DynamicIcon name={service.icon} className="size-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <ul className="flex flex-col gap-2">
          {service.whatsIncluded.slice(0, 4).map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border pt-5">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Starting at</span>
            <span className="text-lg font-semibold">{service.startingPrice}</span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={service.ctaHref}>
              {service.ctaLabel}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
