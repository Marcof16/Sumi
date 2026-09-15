import { Sparkles, PanelLeftClose, PanelLeftOpen, LogOut } from "lucide-react";
import { navigationItems, type AppSection } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SettingsButton } from "@/components/layout/ThemeSelector";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  activeSection: AppSection;
  collapsed: boolean;
  onSectionChange: (section: AppSection) => void;
  onToggle: () => void;
  projectName: string;
  onCloseProject: () => void;
};

export function AppSidebar({ activeSection, collapsed, onSectionChange, onToggle, projectName, onCloseProject }: AppSidebarProps) {
  const libraryButton = (
    <button type="button" aria-label="Volver a biblioteca" onClick={onCloseProject} className={cn("flex rounded-lg text-sm font-medium text-sumi-text-muted hover:bg-sumi-surface hover:text-sumi-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent", collapsed ? "w-full items-center justify-center p-2.5" : "w-full items-center gap-3 px-3 py-2.5 text-left")}>
      <LogOut className="size-[17px] shrink-0 text-sumi-text-soft" aria-hidden="true" />
      {!collapsed && <span>Volver a biblioteca</span>}
    </button>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <aside className={cn("relative flex shrink-0 flex-col border-r border-sumi-border bg-sumi-surface-muted transition-[width] duration-200", collapsed ? "w-[76px]" : "w-64")}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button type="button" aria-label={collapsed ? "Expandir menú" : "Contraer menú"} onClick={onToggle} className="absolute -right-4 top-6 z-50 size-8 rounded-full border border-sumi-border bg-sumi-surface-raised p-0 text-sumi-text-muted shadow-sm hover:bg-sumi-surface hover:text-sumi-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sumi-accent">
            {collapsed ? <PanelLeftOpen className="size-4" aria-hidden="true" /> : <PanelLeftClose className="size-4" aria-hidden="true" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">{collapsed ? "Expandir menú" : "Contraer menú"}</TooltipContent>
      </Tooltip>
      <div className={cn("flex h-20 items-center border-b border-sumi-border px-4", collapsed ? "justify-center" : "justify-between")}>
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="flex size-9 items-center justify-center rounded-xl bg-sumi-primary text-sumi-primary-foreground">
            <Sparkles className="size-4" aria-hidden="true" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-serif text-lg font-semibold tracking-tight text-sumi-text">SUMI</p>
              <p className="max-w-[145px] truncate text-[11px] font-medium uppercase tracking-[0.18em] text-sumi-text-muted">{projectName}</p>
            </div>
          )}
        </div>
      </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Navegación principal">
          {!collapsed && <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-sumi-text-soft">Explorar</p>}
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const button = (
              <button
                type="button"
                aria-current={activeSection === item.id ? "page" : undefined}
                aria-label={collapsed ? item.label : undefined}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  collapsed && "justify-center px-0",
                  activeSection === item.id ? "bg-sumi-accent-soft text-sumi-text shadow-sm ring-1 ring-sumi-accent/30" : "text-sumi-text-muted hover:bg-sumi-surface hover:text-sumi-text",
                )}
              >
                <Icon className={cn("size-[17px] shrink-0", activeSection === item.id ? "text-sumi-accent" : "text-sumi-text-soft")} aria-hidden="true" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );

            return collapsed ? (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={item.id}>{button}</div>
            );
          })}
        </nav>

        <div className="border-t border-sumi-border p-3">
          <div className="mb-2">{collapsed ? <Tooltip><TooltipTrigger asChild>{libraryButton}</TooltipTrigger><TooltipContent side="right">Volver a biblioteca</TooltipContent></Tooltip> : libraryButton}</div>
          <SettingsButton collapsed={collapsed} />
        </div>
      </aside>
    </TooltipProvider>
  );
}
