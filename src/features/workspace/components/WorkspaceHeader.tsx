import { ArrowLeft, Eye, PanelLeft, PanelRight, Settings2 } from "lucide-react";
import type { ReactNode } from "react";
import type { WorkspaceScene } from "@/features/workspace/workspaceTypes";
import { WorkspaceContextSummary } from "@/features/workspace/WorkspaceContextSummary";

type WorkspaceHeaderProps = {
  scene: WorkspaceScene;
  stageLabel: string;
  navigatorVisible: boolean;
  concentration: boolean;
  onTitleChange: (title: string) => void;
  onToggleNavigator: () => void;
  onBackToWorkspace: () => void;
  onTools: () => void;
  onConcentration: () => void;
};

export function WorkspaceHeader({ scene, stageLabel, navigatorVisible, concentration, onTitleChange, onToggleNavigator, onBackToWorkspace, onTools, onConcentration }: WorkspaceHeaderProps) {
  const navigatorLabel = navigatorVisible ? "Ocultar escenas" : "Mostrar escenas";
  return <header className="border-b border-sumi-border bg-sumi-surface px-5 py-4 sm:px-7"><div className="flex flex-wrap items-start justify-between gap-4"><div className="min-w-0"><button type="button" onClick={onBackToWorkspace} className="inline-flex items-center gap-1.5 text-xs font-medium text-sumi-text-muted hover:text-sumi-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><ArrowLeft className="size-3.5" aria-hidden="true" />Área de trabajo</button><div className="mt-3 flex min-w-0 items-center gap-2"><span className="text-xs text-sumi-text-soft" aria-hidden="true">/</span><div className="min-w-0"><input aria-label="Título de escena" value={scene.title} onChange={(event) => onTitleChange(event.target.value)} className="w-full max-w-[280px] truncate border-b border-transparent bg-transparent text-sm font-medium text-sumi-text outline-none hover:border-sumi-border focus:border-sumi-accent" /><p className="mt-1 text-xs text-sumi-text-soft">{stageLabel} · Puedes cambiar de fase cuando quieras.</p></div></div></div><div className="flex items-center gap-2"><IconButton label={navigatorLabel} onClick={onToggleNavigator}>{navigatorVisible ? <PanelLeft className="size-4" aria-hidden="true" /> : <PanelRight className="size-4" aria-hidden="true" />}</IconButton><button type="button" aria-label="Herramientas" onClick={onTools} className="inline-flex items-center gap-2 rounded-lg border border-sumi-border px-3 py-2 text-xs font-medium text-sumi-text-muted hover:bg-sumi-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><Settings2 className="size-3.5" aria-hidden="true" />Contexto</button><button type="button" aria-label={concentration ? "Salir de concentración" : "Modo concentración"} onClick={onConcentration} className="inline-flex items-center gap-2 rounded-lg border border-sumi-border px-3 py-2 text-xs font-medium text-sumi-text-muted hover:bg-sumi-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><Eye className="size-3.5" aria-hidden="true" />{concentration ? "Salir de concentración" : "Concentrarme"}</button></div></div><WorkspaceContextSummary scene={scene} /></header>;
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return <button type="button" aria-label={label} title={label} onClick={onClick} className="inline-flex size-8 items-center justify-center rounded-md text-sumi-text-muted hover:bg-sumi-surface-muted hover:text-sumi-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">{children}</button>;
}
