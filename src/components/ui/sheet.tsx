import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export function SheetContent({ className, side = "right", ...props }: DialogPrimitive.DialogContentProps & { side?: "left" | "right" }) { return <DialogPrimitive.Portal><DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" /><DialogPrimitive.Content className={cn("fixed inset-y-0 w-full max-w-sm border-sumi-border bg-sumi-surface p-6 text-sumi-text shadow-lg", side === "left" ? "left-0 border-r" : "right-0 border-l", className)} {...props} /></DialogPrimitive.Portal>; }
