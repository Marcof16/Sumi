import { X } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { WorkspaceScene } from "@/features/workspace/workspaceTypes";
import { hasContent } from "@/features/workspace/workspaceUtils";
import { ReadonlyTiptapContent } from "@/features/workspace/components/ReadonlyTiptapContent";

export function DraftReadOnly({ content }: { content: string }) {
  return <div className="prose-like whitespace-pre-wrap text-base leading-8 text-sumi-text">{content ? <ReadonlyTiptapContent content={content} /> : <EmptyDraftMessage />}</div>;
}

function EmptyDraftMessage() {
  return <div><p className="text-sm text-sumi-text-muted">Todavía no hay texto para leer.</p><p className="mt-1 text-xs text-sumi-text-soft">Puedes volver al Borrador cuando quieras.</p></div>;
}

export function WorkspaceToolsSheet({ scene, open, onOpenChange }: { scene: WorkspaceScene; open: boolean; onOpenChange: (open: boolean) => void }) {
  const values = [{ label: "Objetivo", value: hasContent(scene.idea.goal) ? "Definido" : "Sin definir" }, { label: "POV", value: scene.idea.pov || "Sin definir" }, { label: "Personajes", value: scene.idea.characters.length ? "Definidos" : "Sin definir" }, { label: "Lugar", value: scene.idea.place || "Sin definir" }, { label: "Notas", value: hasContent(scene.idea.notes) ? "Definidas" : "Sin definir" }, { label: "Continuidad", value: "Sin definir" }];
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent aria-label="Contexto del área de trabajo" className="overflow-y-auto"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl text-sumi-text">Contexto</h2><p className="mt-1 text-xs text-sumi-text-muted">Una referencia opcional para esta escena.</p></div><SheetIconButton label="Cerrar herramientas" onClick={() => onOpenChange(false)} /></div><div className="mt-8 space-y-3">{values.map((item) => <div key={item.label} className="flex items-center justify-between border-b border-sumi-border px-1 py-3"><span className="text-sm text-sumi-text">{item.label}</span><span className="text-xs text-sumi-text-soft">{item.value === "Sin definir" ? "Todavía no definido" : item.value}</span></div>)}</div></SheetContent></Sheet>;
}

export function ScenePlanSheet({ scene, open, onOpenChange }: { scene: WorkspaceScene; open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent aria-label="Plan de la escena" className="overflow-y-auto"><div className="flex items-center justify-between"><div><h2 className="font-serif text-2xl text-sumi-text">Lo que has ordenado</h2><p className="mt-1 text-xs text-sumi-text-muted">Una referencia para cuando te sirva.</p></div><SheetIconButton label="Cerrar plan" onClick={() => onOpenChange(false)} /></div><h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-sumi-text-soft">Idea</h3><p className="mt-2 text-sm leading-relaxed text-sumi-text-muted">{hasContent(scene.idea.goal) ? scene.idea.goal : "Todavía no hay una idea definida."}</p><h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-sumi-text-soft">Momentos</h3>{scene.planning.beats.length ? <ol className="mt-3 space-y-2 text-sm text-sumi-text">{scene.planning.beats.map((beat) => <li key={beat.id}>{beat.text || "Momento sin definir"}</li>)}</ol> : <p className="mt-2 text-sm text-sumi-text-muted">Todavía no hay momentos anotados.</p>}</SheetContent></Sheet>;
}

function SheetIconButton({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" aria-label={label} onClick={onClick} className="inline-flex size-8 items-center justify-center rounded-md text-sumi-text-muted hover:bg-sumi-surface-muted hover:text-sumi-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><X className="size-4" aria-hidden="true" /></button>;
}
