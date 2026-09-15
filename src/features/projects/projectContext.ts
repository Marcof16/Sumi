import { createContext } from "react";
import type { OpenProject } from "@/features/projects/projectTypes";

export type ProjectContextValue = {
  project: OpenProject | null;
  setProject: (project: OpenProject | null) => void;
};

export const ProjectContext = createContext<ProjectContextValue | null>(null);
