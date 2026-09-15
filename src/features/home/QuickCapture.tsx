import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { AppSection } from "@/lib/navigation";

type QuickCaptureProps = { onNavigate: (section: AppSection) => void };

export function QuickCapture({ onNavigate }: QuickCaptureProps) {
  const [idea, setIdea] = useState("");
  const [noticeVisible, setNoticeVisible] = useState(false);

  function handleSave() {
    setNoticeVisible(true);
  }

  return (
    <Card className="mt-8 border-sumi-border bg-sumi-surface-raised shadow-none">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sumi-accent-soft text-sumi-accent"><Lightbulb className="size-4" aria-hidden="true" /></div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-sumi-text">Captura rápida</h2>
            <p className="mt-2 font-serif text-xl text-sumi-text">¿Se te ocurrió algo?</p>
          </div>
        </div>
        <label htmlFor="quick-idea" className="sr-only">Escribe una idea</label>
        <Textarea id="quick-idea" value={idea} onChange={(event) => { setIdea(event.target.value); setNoticeVisible(false); }} placeholder="Escribe una idea..." className="mt-6 min-h-24 resize-y" />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" className="min-h-5 text-xs text-sumi-text-muted">{noticeVisible && "El guardado de ideas se conectará al Inbox en la próxima fase."}</p>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <button type="button" onClick={() => onNavigate("ideas")} className="rounded-md px-2 py-2 text-xs font-semibold text-sumi-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">Ir a Ideas</button>
            <Button type="button" onClick={handleSave} disabled={!idea.trim()} className="rounded-lg px-3.5 text-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">Guardar idea</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
