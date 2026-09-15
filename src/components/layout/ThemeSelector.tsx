import { Check, Palette, Settings, SunMoon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { themeOptions, type ThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

type ThemeSelectorProps = {
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
};

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  const trigger = (
    <button type="button" aria-label="Cambiar tema" className="flex size-9 items-center justify-center rounded-lg border border-sumi-border bg-sumi-surface-raised text-sumi-text-muted shadow-sm hover:bg-sumi-surface-muted hover:text-sumi-text">
      <SunMoon className="size-[17px]" aria-hidden="true" />
    </button>
  );

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild><DialogTrigger asChild>{trigger}</DialogTrigger></TooltipTrigger>
        <TooltipContent side="bottom">Cambiar tema</TooltipContent>
      </Tooltip>
      <DialogContent className="border border-sumi-border bg-sumi-surface text-sumi-text">
        <div className="flex items-start gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sumi-accent-soft text-sumi-accent">
            <Palette className="size-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-serif text-2xl">Apariencia</h2>
            <p className="mt-1 text-sm text-sumi-text-muted">Elige un ambiente cómodo para escribir.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={theme === option.id}
              onClick={() => onThemeChange(option.id)}
              className={cn("flex items-start justify-between rounded-xl border p-3 text-left transition-colors", theme === option.id ? "border-sumi-accent bg-sumi-accent-soft" : "border-sumi-border bg-sumi-surface-raised hover:border-sumi-border-strong hover:bg-sumi-surface-muted")}
            >
              <span>
                <span className="block text-sm font-semibold text-sumi-text">{option.label}</span>
                <span className="mt-1 block text-xs leading-relaxed text-sumi-text-muted">{option.description}</span>
              </span>
              {theme === option.id && <Check className="mt-0.5 size-4 shrink-0 text-sumi-accent" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SettingsButton({ collapsed }: { collapsed: boolean }) {
  const button = (
    <button type="button" aria-label="Configuración" className={cn("flex rounded-lg text-sm font-medium text-sumi-text-muted hover:bg-sumi-surface-muted hover:text-sumi-text", collapsed ? "w-full items-center justify-center p-2.5" : "w-full items-center gap-3 px-3 py-2.5")}>
      <Settings className="size-[17px] text-sumi-text-soft" aria-hidden="true" />
      {!collapsed && <span>Configuración</span>}
    </button>
  );

  return collapsed ? (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">Configuración</TooltipContent>
    </Tooltip>
  ) : button;
}
