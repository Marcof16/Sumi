import { useEffect, useState } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { BookOpen, FolderOpen, Library, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeSelector } from "@/components/layout/ThemeSelector";
import { ProjectActions } from "@/features/projects/ProjectActions";
import { scanLibrary, markProjectOpened, type LibraryProject } from "@/features/projects/libraryService";
import { openProject } from "@/features/projects/projectService";
import { useProject } from "@/features/projects/useProject";
import type { ThemeId } from "@/lib/themes";

type WelcomeScreenProps = { theme: ThemeId; onThemeChange: (theme: ThemeId) => void };
type LibraryView = "library" | "recent";

function formatOpenedAt(value?: string) {
  if (!value) return "Sin aperturas registradas";
  return `Abierto el ${new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(new Date(value))}`;
}

export function WelcomeScreen({ theme, onThemeChange }: WelcomeScreenProps) {
  const { setProject } = useProject();
  const [projects, setProjects] = useState<LibraryProject[]>([]);
  const [view, setView] = useState<LibraryView>("library");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openingPath, setOpeningPath] = useState<string | null>(null);

  async function loadProjects() {
    setLoading(true);
    setError(null);
    if (!isTauri()) {
      setLoading(false);
      return;
    }
    try {
      setProjects(await scanLibrary());
    } catch (caught) {
      console.error("No se pudo cargar la biblioteca de SUMI", caught);
      setError("No pudimos cargar la biblioteca. Comprueba que SUMI tenga acceso a tu carpeta Documentos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadProjects(); }, []);

  async function handleOpen(project: LibraryProject) {
    setOpeningPath(project.path);
    setError(null);
    try {
      setProject(await openProject(project.path));
      markProjectOpened(project.path);
    } catch (caught) {
      console.error("No se pudo abrir la novela", caught);
      setError("No pudimos abrir esta novela porque su manifiesto ya no es válido.");
      setOpeningPath(null);
    }
  }

  const visibleProjects = view === "recent" ? projects.filter((project) => project.lastOpenedAt) : projects;

  return (
    <main className="min-h-screen w-full bg-sumi-bg text-sumi-text">
      <header className="flex h-20 items-center justify-between border-b border-sumi-border bg-sumi-surface px-6 lg:px-10">
        <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-sumi-primary text-sumi-primary-foreground"><BookOpen className="size-4" aria-hidden="true" /></div><span className="font-serif text-xl font-semibold">SUMI</span></div>
        <TooltipProvider delayDuration={300}><ThemeSelector theme={theme} onThemeChange={onThemeChange} /></TooltipProvider>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-sumi-border bg-sumi-surface-muted px-4 py-5 lg:min-h-[calc(100vh-5rem)] lg:w-60 lg:border-b-0 lg:border-r lg:px-5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-text-soft">Tu espacio</p>
          <nav className="mt-3 space-y-1" aria-label="Navegación de biblioteca">
            <button type="button" onClick={() => setView("library")} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${view === "library" ? "bg-sumi-accent-soft text-sumi-text" : "text-sumi-text-muted hover:bg-sumi-surface hover:text-sumi-text"}`}><Library className="size-4" aria-hidden="true" />Biblioteca</button>
            <button type="button" onClick={() => setView("recent")} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium ${view === "recent" ? "bg-sumi-accent-soft text-sumi-text" : "text-sumi-text-muted hover:bg-sumi-surface hover:text-sumi-text"}`}><RefreshCw className="size-4" aria-hidden="true" />Recientes</button>
          </nav>
        </aside>
        <section className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-6 border-b border-sumi-border pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-sumi-text-soft">Biblioteca</p><h1 className="mt-3 font-serif text-4xl tracking-tight">Tus historias, en un solo lugar.</h1><p className="mt-3 max-w-xl text-sm leading-relaxed text-sumi-text-muted">Un espacio tranquilo para volver a cada novela y continuar escribiendo.</p></div><ProjectActions /></div>
          {!isTauri() && <div role="status" className="mt-8 rounded-xl border border-sumi-border bg-sumi-surface-raised p-5 text-sm text-sumi-text-muted">La biblioteca local está disponible en SUMI Desktop.<br /><span className="font-medium text-sumi-text">Ejecuta pnpm tauri:dev</span> para trabajar con tus novelas.</div>}
          {error && <p role="alert" className="mt-6 text-sm text-red-700">{error}</p>}
          <div className="mt-10"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl">{view === "recent" ? "Recientes" : "Tus novelas"}</h2>{isTauri() && <Button type="button" onClick={() => void loadProjects()} className="gap-2 bg-transparent text-xs text-sumi-text-muted hover:bg-sumi-surface-muted hover:text-sumi-text"><RefreshCw className="size-3.5" aria-hidden="true" />Actualizar</Button>}</div>
            {loading && <p className="mt-6 text-sm text-sumi-text-muted">Cargando biblioteca...</p>}
            {!loading && visibleProjects.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-sumi-border-strong bg-sumi-surface-raised px-6 py-14 text-center"><FolderOpen className="mx-auto size-6 text-sumi-text-soft" aria-hidden="true" /><h3 className="mt-4 font-serif text-xl">{view === "recent" ? "Todavía no hay novelas recientes." : "Tu biblioteca está lista para empezar."}</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-sumi-text-muted">{view === "recent" ? "Cuando abras una novela aparecerá aquí." : "Crea tu primera novela y SUMI preparará su espacio de trabajo."}</p></div>}
            {!loading && visibleProjects.length > 0 && <div className="mt-6 grid gap-3 xl:grid-cols-2">{visibleProjects.map((project) => <button key={project.path} type="button" disabled={openingPath !== null} onClick={() => void handleOpen(project)} className="group rounded-2xl border border-sumi-border bg-sumi-surface-raised p-5 text-left shadow-sm transition-colors hover:border-sumi-border-strong hover:bg-sumi-surface-muted disabled:cursor-wait disabled:opacity-70"><div className="flex items-start justify-between gap-4"><div><p className="font-serif text-xl text-sumi-text">{project.manifest.name}</p><p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-sumi-text-soft">Proyecto SUMI</p></div><BookOpen className="size-5 text-sumi-accent transition-transform group-hover:-rotate-6" aria-hidden="true" /></div><p className="mt-6 text-xs text-sumi-text-muted">{formatOpenedAt(project.lastOpenedAt)}</p></button>)}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
