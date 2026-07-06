import { cn } from "@/lib/utils";

// Consistent max-width + horizontal padding wrapper for page sections.
export function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-x py-20 md:py-28", className)}>
      {children}
    </section>
  );
}
