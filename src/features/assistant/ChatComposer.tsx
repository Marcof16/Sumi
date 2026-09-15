import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ChatComposer({ onSend }: { onSend: (content: string) => void }) {
  const [value, setValue] = useState("");
  function submit() { if (!value.trim()) return; onSend(value); setValue(""); }
  return <div className="border-t border-sumi-border bg-sumi-surface p-3"><Textarea aria-label="Mensaje para Agent" value={value} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); submit(); } }} placeholder="Escribe un mensaje..." className="min-h-20 resize-none border-sumi-border bg-sumi-surface-raised text-sumi-text placeholder:text-sumi-text-soft" /><div className="mt-2 flex items-center justify-between gap-2"><span className="text-[10px] text-sumi-text-soft">Enter para enviar · Shift+Enter para salto</span><Button type="button" disabled={!value.trim()} onClick={submit} aria-label="Enviar mensaje" className="size-8 rounded-lg p-0"><Send className="size-3.5" aria-hidden="true" /></Button></div></div>;
}
