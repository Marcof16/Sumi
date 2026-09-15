import { Plus } from "lucide-react";
import type { WorkspaceScene } from "@/features/workspace/workspaceTypes";
import { writingStages } from "@/features/workspace/workspaceTypes";
import { cn } from "@/lib/utils";

type WorkspaceNavigatorProps = { scenes: WorkspaceScene[]; activeSceneId: string; onSelect: (id: string) => void; onCreate: () => void };

export function WorkspaceNavigator({ scenes, activeSceneId, onSelect, onCreate }: WorkspaceNavigatorProps) {
  return <aside className="flex w-52 shrink-0 flex-col border-r border-sumi-border bg-sumi-surface-muted p-4 lg:w-56"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sumi-text-soft">Escenas</p><h2 className="mt-1 font-serif text-lg text-sumi-text">De esta sesión</h2></div><p className="mt-5 text-xs leading-relaxed text-sumi-text-muted">Puedes volver a cualquiera cuando quieras.</p><div className="mt-5 space-y-2">{scenes.map((scene) => <button type="button" key={scene.id} aria-label={`Seleccionar escena ${scene.title}`} onClick={() => onSelect(scene.id)} className={cn("w-full rounded-lg border px-3 py-2 text-left text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent", scene.id === activeSceneId ? "border-sumi-accent bg-sumi-accent-soft text-sumi-text" : "border-sumi-border text-sumi-text-muted hover:bg-sumi-surface")}><span className="block font-medium">{scene.title}</span><span className="text-[11px] text-sumi-text-soft">{writingStages.find((item) => item.id === scene.stage)?.label}</span></button>)}</div><button type="button" onClick={onCreate} className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-sumi-border px-3 py-2 text-xs font-semibold text-sumi-text-muted hover:bg-sumi-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><Plus className="size-3.5" aria-hidden="true" />Nueva escena</button></aside>;
}
