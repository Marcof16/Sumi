import type { WritingStage } from "@/features/workspace/workspaceTypes";
import { writingStages } from "@/features/workspace/workspaceTypes";
import { cn } from "@/lib/utils";

export function WorkspaceStageTabs({ stage, onStageChange }: { stage: WritingStage; onStageChange: (stage: WritingStage) => void }) {
  return <div className="sumi-scrollbar flex gap-1 overflow-x-auto border-b border-sumi-border bg-sumi-surface px-5 py-3 sm:px-7" role="tablist" aria-label="Herramientas de escritura">{writingStages.map((item) => <button key={item.id} type="button" role="tab" aria-selected={stage === item.id} onClick={() => onStageChange(item.id)} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-sumi-text-muted hover:bg-sumi-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent", stage === item.id && "bg-sumi-accent-soft text-sumi-text")}>{item.label}</button>)}</div>;
}
