import { useEffect, useState } from "react";
import { EmptySection } from "@/components/layout/EmptySection";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomeSection } from "@/features/home/HomeSection";
import { IdeasSection } from "@/features/ideas/IdeasSection";
import { getNavigationItem, type AppSection } from "@/lib/navigation";
import { applyTheme, getStoredTheme, type ThemeId } from "@/lib/themes";
import { ProjectProvider } from "@/features/projects/ProjectProvider";
import { useProject } from "@/features/projects/useProject";
import { WelcomeScreen } from "@/features/projects/WelcomeScreen";
import type { OpenProject } from "@/features/projects/projectTypes";
import { AssistantProvider } from "@/features/assistant/AssistantProvider";
import { WorkspaceSection } from "@/features/workspace/WorkspaceSection";

function ProjectApp() {
  const [activeSection, setActiveSection] = useState<AppSection>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspaceFocusMode, setWorkspaceFocusMode] = useState(false);
  const [theme, setTheme] = useState<ThemeId>(getStoredTheme);
  const { project, setProject } = useProject();
  const section = getNavigationItem(activeSection);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSectionChange = (nextSection: AppSection) => {
    setWorkspaceOpen(false);
    setWorkspaceFocusMode(false);
    setActiveSection(nextSection);
  };

  const content = workspaceOpen ? (
    <WorkspaceSection onConcentrationChange={setWorkspaceFocusMode} />
  ) : activeSection === "home" ? (
    <HomeSection projectName={project?.manifest.name ?? ""} onNavigate={handleSectionChange} onOpenWorkspace={() => setWorkspaceOpen(true)} />
  ) : activeSection === "ideas" ? (
    <IdeasSection />
  ) : (
    <EmptySection
      title={section.label}
      description={section.description}
      emptyTitle={`Todavía no tienes ${section.label.toLowerCase()}.`}
      emptyDescription="Cuando creemos el sistema narrativo podrás añadir y organizar el contenido de esta sección."
      icon={section.icon}
      actionLabel={activeSection === "characters" ? "Nuevo personaje" : undefined}
    />
  );

  if (!project) return <WelcomeScreen theme={theme} onThemeChange={setTheme} />;

  return (
    <MainLayout
      activeSection={activeSection}
      sidebarCollapsed={sidebarCollapsed}
       onSectionChange={handleSectionChange}
      onSidebarToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
      theme={theme}
      onThemeChange={setTheme}
      projectName={project.manifest.name}
      onCloseProject={() => setProject(null)}
      focusMode={workspaceFocusMode}
      contentScrollable={!workspaceOpen}
    >
      {content}
    </MainLayout>
  );
}

function App({ initialProject }: { initialProject?: OpenProject | null }) {
  return <ProjectProvider initialProject={initialProject}><AssistantProvider><ProjectApp /></AssistantProvider></ProjectProvider>;
}

export default App;
