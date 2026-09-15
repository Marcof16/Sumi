import { Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card className="mt-4 border-sumi-border bg-sumi-surface-raised shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-3"><Activity className="size-4 text-sumi-text-soft" aria-hidden="true" /><div><h2 className="text-sm font-semibold text-sumi-text">Actividad reciente</h2><p className="mt-0.5 text-xs text-sumi-text-muted">Los cambios importantes aparecerán aquí.</p></div></div>
        <div className="mt-5 rounded-xl border border-dashed border-sumi-border px-5 py-7 text-center"><p className="text-sm text-sumi-text-muted">Todavía no hay actividad registrada en esta novela.</p></div>
      </CardContent>
    </Card>
  );
}
