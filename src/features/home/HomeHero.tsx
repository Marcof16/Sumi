import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type HomeHeroProps = {
  projectName: string;
  onOpenWorkspace: () => void;
};

export function HomeHero({ projectName, onOpenWorkspace }: HomeHeroProps) {
  return (
    <Card className="border-sumi-border bg-sumi-surface-raised shadow-none">
      <CardContent className="p-6 sm:p-8 lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sumi-text-soft">Escritorio</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-sumi-text sm:text-5xl">{projectName}</h1>
          <p className="mt-3 text-base text-sumi-text-muted">Tu historia, de un vistazo.</p>
        </div>
        <button type="button" onClick={onOpenWorkspace} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sumi-border bg-sumi-surface px-4 py-3 text-left text-sm font-semibold text-sumi-text hover:border-sumi-accent hover:bg-sumi-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent lg:mt-0 lg:w-auto">
          Área de trabajo
          <ArrowRight className="size-4 text-sumi-accent" aria-hidden="true" />
        </button>
      </CardContent>
    </Card>
  );
}
