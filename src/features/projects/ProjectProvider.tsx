import { useState, type ReactNode } from "react";
import { ProjectContext } from "@/features/projects/projectContext";
import type { OpenProject } from "@/features/projects/projectTypes";

export function ProjectProvider({ children, initialProject = null }: { children: ReactNode; initialProject?: OpenProject | null }) {
  const [project, setProject] = useState<OpenProject | null>(initialProject);
  return <ProjectContext.Provider value={{ project, setProject }}>{children}</ProjectContext.Provider>;
}
