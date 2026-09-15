import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export function DropdownMenuContent({ className, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) { return <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content className={cn("z-[60] min-w-32 rounded-md border border-sumi-border bg-sumi-surface p-1 text-sumi-text shadow-md", className)} {...props} /></DropdownMenuPrimitive.Portal>; }
export function DropdownMenuItem({ className, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps) { return <DropdownMenuPrimitive.Item className={cn("cursor-pointer rounded px-2 py-1.5 text-sm text-sumi-text outline-none focus:bg-sumi-surface-muted", className)} {...props} />; }
