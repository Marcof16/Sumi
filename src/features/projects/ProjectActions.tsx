import { useState } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createProject, DESKTOP_ONLY_MESSAGE, DUPLICATE_PROJECT_MESSAGE, validateProjectName } from "@/features/projects/projectService";
import { useProject } from "@/features/projects/useProject";

const GENERIC_CREATE_ERROR = "No pudimos crear la novela. Comprueba que SUMI tenga acceso a tu carpeta Documentos.";

export function ProjectActions() {
  const { setProject } = useProject();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleCreate() {
    setError(null);
    const validationError = validateProjectName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!isTauri()) {
      setError(DESKTOP_ONLY_MESSAGE);
      return;
    }
    setBusy(true);
    try {
      const project = await createProject(name);
      setProject(project);
      setDialogOpen(false);
      setName("");
    } catch (caught) {
      console.error("No se pudo crear la novela", caught);
      setError(caught instanceof Error && (caught.message === DUPLICATE_PROJECT_MESSAGE || caught.message.startsWith("Escribe") || caught.message.startsWith("El nombre") || caught.message.startsWith("Ese nombre") || caught.message.startsWith("El nombre es")) ? caught.message : GENERIC_CREATE_ERROR);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (open) setError(null); }}>
        <DialogTrigger asChild>
          <Button type="button" className="gap-2 rounded-lg px-5"><Plus className="size-4" aria-hidden="true" />Nueva novela</Button>
        </DialogTrigger>
        <DialogContent className="border border-sumi-border bg-sumi-surface text-sumi-text">
          <h2 className="font-serif text-2xl">Nueva novela</h2>
          <p className="mt-1 text-sm text-sumi-text-muted">Dale un nombre a tu próxima historia.</p>
          <label className="mt-6 block text-sm font-medium" htmlFor="project-name">Nombre de la novela</label>
          <Input id="project-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Mi novela" className="mt-2" />
          {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" onClick={() => setDialogOpen(false)} className="bg-transparent text-sumi-text-muted hover:bg-sumi-surface-muted">Cancelar</Button>
            <Button type="button" disabled={busy} onClick={handleCreate}>Crear novela</Button>
          </div>
        </DialogContent>
      </Dialog>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </div>
  );
}
