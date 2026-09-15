import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;
export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => <TabsPrimitive.List className={cn("inline-flex h-10 items-center rounded-md bg-sumi-surface-muted p-1", className)} {...props} />;
export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => <TabsPrimitive.Trigger className={cn("rounded px-3 py-1.5 text-sm text-sumi-text-muted data-[state=active]:bg-sumi-surface-raised data-[state=active]:text-sumi-text", className)} {...props} />;
export const TabsContent = TabsPrimitive.Content;
