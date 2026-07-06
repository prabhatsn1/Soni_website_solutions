import type { ProcessStep } from "@/types/site";
import { DynamicIcon } from "@/lib/icon-map";
import { Card } from "@/components/ui/card";

export function ProcessStepCard({ step }: { step: ProcessStep }) {
  return (
    <Card className="relative h-full gap-4 px-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <DynamicIcon name={step.icon} className="size-5" />
        </div>
        <span className="text-3xl font-semibold text-muted-foreground/20">
          {step.step}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </Card>
  );
}
