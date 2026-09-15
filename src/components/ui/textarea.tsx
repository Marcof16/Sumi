import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={cn("min-h-20 w-full rounded-md border border-sumi-border-strong bg-sumi-surface-raised px-3 py-2 text-sm text-sumi-text outline-none focus:ring-2 focus:ring-sumi-accent/40", className)} {...props} />; }
