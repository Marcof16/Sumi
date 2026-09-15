import type { ReactNode } from "react";
import { EyeOff, Maximize2, Menu, Minimize2, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AssistantMode } from "@/features/assistant/assistantTypes";

type AssistantHeaderProps = { mode: AssistantMode; chatDrawerOpen: boolean; onChatDrawerToggle: () => void; onModeChange: (mode: AssistantMode) => void; onRestore: () => void };

function Control({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return <Tooltip><TooltipTrigger asChild><Button type="button" aria-label={label} onClick={onClick} className="size-8 rounded-lg border border-sumi-border bg-transparent p-0 text-sumi-text-muted shadow-none hover:bg-sumi-surface-muted hover:text-sumi-text">{children}</Button></TooltipTrigger><TooltipContent side="bottom">{label}</TooltipContent></Tooltip>;
}

export function AssistantHeader({ mode, chatDrawerOpen, onChatDrawerToggle, onModeChange, onRestore }: AssistantHeaderProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="assistant-drag-handle flex shrink-0 cursor-move items-center justify-between border-b border-sumi-border bg-sumi-surface px-4 py-3">
        <div className="flex min-w-0 items-center gap-2"><Control label={chatDrawerOpen ? "Cerrar conversaciones" : "Abrir conversaciones"} onClick={onChatDrawerToggle}><Menu className="size-4" aria-hidden="true" /></Control><div className="size-2 rounded-full bg-sumi-accent" aria-hidden="true" /><p className="truncate text-sm font-semibold text-sumi-text">Agent</p><span className="text-[10px] font-medium uppercase tracking-[0.12em] text-sumi-text-soft">Sin conexión</span></div>
        <div className="flex items-center gap-1">
          {mode === "DOCKED" && <Control label="Desacoplar asistente" onClick={() => onModeChange("FLOATING")}><PanelRightOpen className="size-4" aria-hidden="true" /></Control>}
          {mode === "FLOATING" && <Control label="Acoplar asistente" onClick={() => onModeChange("DOCKED")}><PanelRightClose className="size-4" aria-hidden="true" /></Control>}
          {mode !== "MAXIMIZED" && <Control label="Maximizar asistente" onClick={() => onModeChange("MAXIMIZED")}><Maximize2 className="size-4" aria-hidden="true" /></Control>}
          {mode === "MAXIMIZED" && <Control label="Restaurar asistente" onClick={onRestore}><Minimize2 className="size-4" aria-hidden="true" /></Control>}
          <Control label="Ocultar asistente" onClick={() => onModeChange("HIDDEN")}><EyeOff className="size-4" aria-hidden="true" /></Control>
        </div>
      </div>
    </TooltipProvider>
  );
}
