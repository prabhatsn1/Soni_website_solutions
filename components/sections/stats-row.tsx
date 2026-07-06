import type { StatItem } from "@/types/site";
import { StaggerContainer, StaggerItem } from "@/components/motion";

export function StatsRow({
  stats,
  className,
}: {
  stats: StatItem[];
  className?: string;
}) {
  return (
    <StaggerContainer
      className={`grid grid-cols-2 gap-6 md:grid-cols-4 ${className ?? ""}`}
    >
      {stats.map((stat) => (
        <StaggerItem key={stat.label}>
          <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card/50 px-5 py-6 text-center">
            <span className="text-2xl font-semibold tracking-tight md:text-3xl text-gradient">
              {stat.value}
            </span>
            <span className="text-xs text-muted-foreground md:text-sm">
              {stat.label}
            </span>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
