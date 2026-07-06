import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes conditionally without style collisions.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
