import { DraftReadOnly } from "@/features/workspace/components/WorkspaceSheets";
import type { WorkspaceScene } from "@/features/workspace/workspaceTypes";
import { countWordsFromHtml } from "@/features/workspace/workspaceUtils";
import { StageFrame } from "@/features/workspace/stages/StageFrame";

export function FinalStage({ scene }: { scene: WorkspaceScene }) {
  return <StageFrame title="Una vista limpia" description="Aquí puedes leer lo que has escrito sin herramientas alrededor. No significa que la historia esté terminada."><div className="mb-4 flex items-center justify-between text-xs text-sumi-text-soft"><span>{scene.title}</span><span>{countWordsFromHtml(scene.draft.content)} palabras</span></div><div className="min-h-[45vh] rounded-xl bg-sumi-surface-raised px-6 py-8 sm:px-12"><DraftReadOnly content={scene.draft.content} /></div></StageFrame>;
}
