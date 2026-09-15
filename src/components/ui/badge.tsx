import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex rounded-full bg-sumi-primary px-2.5 py-0.5 text-xs font-semibold text-sumi-primary-foreground", className)} {...props} />;
}
