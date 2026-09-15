import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("inline-flex items-center justify-center rounded-md bg-sumi-primary px-4 py-2 text-sm font-medium text-sumi-primary-foreground hover:bg-sumi-primary-hover disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />;
}
