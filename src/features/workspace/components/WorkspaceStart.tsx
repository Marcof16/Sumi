import { useState } from "react";
import { FilePlus2, Lightbulb, ListTree, PenLine, SearchCheck } from "lucide-react";
import { writingStages, type WritingStage, type WorkspaceScene } from "@/features/workspace/workspaceTypes";

type WorkspaceStartProps = {
  scenes: WorkspaceScene[];
  onCreateScene: (stage?: WritingStage) => void;
  onSelectScene: (id: string) => void;
};

export function WorkspaceStart({ scenes, onCreateScene, onSelectScene }: WorkspaceStartProps) {
  const [chooserOpen, setChooserOpen] = useState(false);
  const paths: { stage: WritingStage; label: string; description: string; icon: typeof PenLine }[] = [
    { stage: "DRAFT", label: "Escribir", description: "Abrir la página y empezar", icon: PenLine },
    { stage: "IDEA", label: "Desarrollar una idea", description: "Contar lo que ya tienes", icon: Lightbulb },
    { stage: "PLANNING", label: "Ordenar mi historia", description: "Poner algunos momentos en su sitio", icon: ListTree },
    { stage: "REVISION", label: "Revisar", description: "Leer lo escrito con otros ojos", icon: SearchCheck },
  ];

  return (
    <section className="flex min-h-full flex-1 items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sumi-text-soft">Área de trabajo</p>
          <h1 className="mt-4 font-serif text-4xl tracking-tight text-sumi-text">¿Qué quieres hacer ahora?</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sumi-text-muted">Empieza por donde te resulte natural. Puedes cambiar de dirección cuando quieras.</p>
        </div>
        <div className="mx-auto mt-9 grid max-w-xl gap-2 sm:grid-cols-2">
          {paths.map(({ stage, label, description, icon: Icon }) => <button type="button" key={stage} onClick={() => onCreateScene(stage)} className="group flex items-start gap-3 rounded-xl border border-sumi-border bg-sumi-surface-raised px-4 py-4 text-left transition-colors hover:border-sumi-accent hover:bg-sumi-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><span className="mt-0.5 rounded-lg bg-sumi-accent-soft p-2 text-sumi-text"><Icon className="size-4" aria-hidden="true" /></span><span><span className="block text-sm font-semibold text-sumi-text">{label}</span><span className="mt-1 block text-xs leading-relaxed text-sumi-text-muted">{description}</span></span></button>)}
        </div>
        <div className="mt-7 text-center">
          <button type="button" aria-label="Nueva escena" onClick={() => onCreateScene()} className="inline-flex items-center gap-2 rounded-lg border border-sumi-border px-4 py-2.5 text-sm font-semibold text-sumi-text-muted hover:bg-sumi-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><FilePlus2 className="size-4" aria-hidden="true" />Nueva escena en blanco</button>
          <button type="button" aria-label="Elegir escena" onClick={() => setChooserOpen((open) => !open)} className="ml-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sumi-accent hover:bg-sumi-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">Elegir una escena</button>
        </div>
        {chooserOpen && <div className="mx-auto mt-5 max-w-sm rounded-xl border border-sumi-border bg-sumi-surface-raised p-4 text-left"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-sumi-text-soft">Escenas de esta sesión</p>{scenes.length === 0 ? <p className="mt-4 text-sm text-sumi-text-muted">Todavía no hay escenas en esta sesión.</p> : <div className="mt-3 space-y-2">{scenes.map((scene) => <button type="button" key={scene.id} onClick={() => onSelectScene(scene.id)} className="w-full rounded-lg border border-sumi-border px-3 py-2 text-left text-sm text-sumi-text hover:bg-sumi-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent"><span className="block font-medium">{scene.title}</span><span className="text-xs text-sumi-text-soft">{writingStages.find((item) => item.id === scene.stage)?.label}</span></button>)}</div>}</div>}
      </div>
    </section>
  );
}
