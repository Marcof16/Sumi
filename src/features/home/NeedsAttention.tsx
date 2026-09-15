import { ArrowRight, SearchCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { AppSection } from "@/lib/navigation";

type NeedsAttentionProps = { onNavigate: (section: AppSection) => void };

export function NeedsAttention({ onNavigate }: NeedsAttentionProps) {
  return (
    <Card className="border-sumi-border bg-sumi-surface-raised shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-3"><SearchCheck className="size-4 text-sumi-accent" aria-hidden="true" /><h2 className="font-serif text-2xl text-sumi-text">Necesita tu atención</h2></div>
        <div className="mt-6">
          <p className="text-sm text-sumi-text-muted">Todo tranquilo por ahora.</p>
          <p className="mt-2 text-xs leading-relaxed text-sumi-text-soft">No hay pendientes narrativos registrados.</p>
          <button type="button" onClick={() => onNavigate("review")} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-sumi-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">Ir a Revisión<ArrowRight className="size-3.5" aria-hidden="true" /></button>
        </div>
      </CardContent>
    </Card>
  );
}
