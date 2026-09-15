import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn("flex h-10 w-full rounded-md border border-sumi-border-strong bg-sumi-surface-raised px-3 py-2 text-sm text-sumi-text outline-none focus:ring-2 focus:ring-sumi-accent/40", className)} {...props} />; }
