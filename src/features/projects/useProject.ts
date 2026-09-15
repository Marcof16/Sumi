import { useContext } from "react";
import { ProjectContext } from "@/features/projects/projectContext";

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject debe usarse dentro de ProjectProvider");
  return context;
}
