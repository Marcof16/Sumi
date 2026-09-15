import { PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeSelector } from "@/components/layout/ThemeSelector";
import { getNavigationItem, type AppSection } from "@/lib/navigation";
import type { ThemeId } from "@/lib/themes";

type AppHeaderProps = {
  activeSection: AppSection;
  assistantVisible: boolean;
  onAssistantToggle: () => void;
  projectName: string;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
};

export function AppHeader({ activeSection, assistantVisible, onAssistantToggle, projectName, theme, onThemeChange }: AppHeaderProps) {
  const section = getNavigationItem(activeSection);

  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-sumi-border bg-sumi-surface px-6 lg:px-8">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium text-sumi-text-soft">
          <span className="font-semibold tracking-[0.16em] text-sumi-text">SUMI</span>
          <span aria-hidden="true">/</span>
          <span>{projectName}</span>
        </div>
        <p className="mt-1 truncate text-sm text-sumi-text-muted">{section.label}</p>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={300}>
          <ThemeSelector theme={theme} onThemeChange={onThemeChange} />
        </TooltipProvider>
        <Button type="button" aria-label={assistantVisible ? "Ocultar asistente" : "Mostrar asistente"} onClick={onAssistantToggle} className="size-9 rounded-lg border border-sumi-border bg-sumi-surface-raised p-0 text-sumi-text-muted shadow-none hover:bg-sumi-surface-muted hover:text-sumi-text">
          {assistantVisible ? <PanelRightClose className="size-4" aria-hidden="true" /> : <PanelRight className="size-4" aria-hidden="true" />}
        </Button>
      </div>
    </header>
  );
}
