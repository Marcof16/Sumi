import { getNavigationItem, type AppSection } from "@/lib/navigation";
import type { AssistantContext } from "@/features/assistant/assistantTypes";

export function CurrentContext({ section }: { section: AppSection }) {
  const context: AssistantContext = { section };
  const sectionInfo = getNavigationItem(context.section);
  return <div className="flex items-center gap-2 border-b border-sumi-border bg-sumi-surface-muted px-4 py-2.5"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-sumi-text-soft">Contexto actual</p><span className="text-xs text-sumi-text-soft" aria-hidden="true">·</span><p className="truncate text-xs font-medium text-sumi-text">{sectionInfo.label}</p></div>;
}
