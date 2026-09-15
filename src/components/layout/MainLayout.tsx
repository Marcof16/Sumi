import type { ReactNode } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AssistantPanel } from "@/components/layout/AssistantPanel";
import type { AppSection } from "@/lib/navigation";
import type { ThemeId } from "@/lib/themes";
import { useAssistant } from "@/features/assistant/useAssistant";

type MainLayoutProps = {
  activeSection: AppSection;
  sidebarCollapsed: boolean;
  children: ReactNode;
  onSectionChange: (section: AppSection) => void;
  onSidebarToggle: () => void;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  projectName: string;
  onCloseProject: () => void;
  focusMode?: boolean;
  contentScrollable?: boolean;
};

export function MainLayout({ activeSection, sidebarCollapsed, children, onSectionChange, onSidebarToggle, theme, onThemeChange, projectName, onCloseProject, focusMode = false, contentScrollable = true }: MainLayoutProps) {
  const { preferences, setMode, restoreMode } = useAssistant();
  const assistantVisible = preferences.mode !== "HIDDEN";
  return (
    <div data-section={activeSection} className="relative flex h-screen min-h-[560px] min-w-0 overflow-hidden bg-sumi-bg text-sumi-text">
      {!focusMode && <AppSidebar activeSection={activeSection} collapsed={sidebarCollapsed} onSectionChange={onSectionChange} onToggle={onSidebarToggle} projectName={projectName} onCloseProject={onCloseProject} />}
      <div className="flex min-w-0 flex-1 flex-col">
        {!focusMode && <AppHeader activeSection={activeSection} assistantVisible={assistantVisible} onAssistantToggle={() => { if (assistantVisible) setMode("HIDDEN"); else restoreMode(); }} projectName={projectName} theme={theme} onThemeChange={onThemeChange} />}
        <main className={contentScrollable ? "sumi-scrollbar flex min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain" : "flex min-h-0 min-w-0 flex-1 overflow-hidden"}>{children}</main>
      </div>
      {!focusMode && <AssistantPanel activeSection={activeSection} sidebarCollapsed={sidebarCollapsed} />}
    </div>
  );
}
