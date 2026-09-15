export type WritingStage = "IDEA" | "PLANNING" | "DRAFT" | "REVISION" | "FINAL";

export type WorkspaceBeat = {
  id: string;
  text: string;
};

export type WorkspaceScene = {
  id: string;
  title: string;
  chapterTitle?: string;
  stage: WritingStage;
  idea: {
    goal: string;
    notes: string;
    pov?: string;
    place?: string;
    characters: string[];
  };
  planning: {
    beats: WorkspaceBeat[];
  };
  draft: {
    content: string;
  };
  revision: {
    checks: Record<string, boolean>;
    notes: string;
  };
};

export const writingStages: { id: WritingStage; label: string }[] = [
  { id: "IDEA", label: "Idea" },
  { id: "PLANNING", label: "Planificación" },
  { id: "DRAFT", label: "Borrador" },
  { id: "REVISION", label: "Revisión" },
  { id: "FINAL", label: "Final" },
];
