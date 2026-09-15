import { WorkspaceEditor } from "@/features/workspace/WorkspaceEditor";
import { StageFrame } from "@/features/workspace/stages/StageFrame";

type DraftStageProps = { content: string; onContentChange: (content: string) => void; onViewPlan: () => void };

export function DraftStage({ content, onContentChange, onViewPlan }: DraftStageProps) {
  return <StageFrame title="Escribe sin detenerte" description="No tiene que salir perfecto. Este es solo el primer borrador."><div className="mb-4 flex justify-end"><button type="button" onClick={onViewPlan} className="rounded-md px-2 py-1.5 text-xs font-semibold text-sumi-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">Ver lo que has ordenado</button></div><WorkspaceEditor content={content} editable onContentChange={onContentChange} /></StageFrame>;
}
