import type { WorkspaceScene } from "@/features/workspace/workspaceTypes";

export function WorkspaceContextSummary({ scene }: { scene: WorkspaceScene }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-sumi-border pt-3 text-[11px] text-sumi-text-soft">
      {scene.chapterTitle && <span>Capítulo: {scene.chapterTitle}</span>}
      <span>POV: {scene.idea.pov || "Sin definir"}</span>
      <span>Lugar: {scene.idea.place || "Sin definir"}</span>
      <span>Personajes: {scene.idea.characters.length ? scene.idea.characters.join(", ") : "Sin definir"}</span>
    </div>
  );
}
