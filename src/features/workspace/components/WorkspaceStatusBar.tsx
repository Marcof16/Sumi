export function WorkspaceStatusBar({ wordCount, stageLabel }: { wordCount: number; stageLabel: string }) {
  return <footer data-testid="workspace-status-bar" className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-sumi-border bg-sumi-surface px-5 py-2.5 text-[11px] text-sumi-text-soft sm:px-7"><span>{wordCount} palabras</span><span>Sesión temporal · No guardado</span><span>{stageLabel}</span></footer>;
}
