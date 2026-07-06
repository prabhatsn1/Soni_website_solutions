import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ShoppingCart,
  Rocket,
  RefreshCcw,
  ShieldCheck,
  Gauge,
  Palette,
  TrendingUp,
  Code2,
  Headphones,
  Clock,
  Search,
  Compass,
  PenTool,
  Code,
  LifeBuoy,
  AtSign,
  Briefcase,
  Camera,
  Terminal,
  Brush,
} from "lucide-react";

// Maps icon names stored as strings in mock.json to Lucide components.
// Note: lucide-react no longer ships brand/logo icons, so social platform
// names are mapped to generic representative icons instead.
export const iconMap: Record<string, LucideIcon> = {
  Building2,
  ShoppingCart,
  Rocket,
  RefreshCcw,
  ShieldCheck,
  Gauge,
  Palette,
  TrendingUp,
  Code2,
  Headphones,
  Clock,
  Search,
  Compass,
  PenTool,
  Code,
  LifeBuoy,
  Twitter: AtSign,
  Linkedin: Briefcase,
  Instagram: Camera,
  Github: Terminal,
  Dribbble: Brush,
};


export function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Rocket;
  return <Icon className={className} aria-hidden="true" />;
}
