import type { AppSection } from "@/lib/navigation";

export type AssistantMode = "DOCKED" | "FLOATING" | "MAXIMIZED" | "HIDDEN";
export type AssistantMessageRole = "user" | "assistant";

export type AssistantMessage = {
  id: string;
  role: AssistantMessageRole;
  content: string;
  createdAt: string;
};

export type AssistantChat = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  archived?: boolean;
  messages: AssistantMessage[];
};

export type AssistantContext = {
  section: AppSection;
  entityType?: string;
  entityId?: string;
  entityName?: string;
  filePath?: string;
};

export type AssistantBounds = {
  floatingWidth: number;
  floatingHeight: number;
  floatingX: number;
  floatingY: number;
};

export type AssistantPreferences = AssistantBounds & {
  mode: AssistantMode;
  lastVisibleMode: Exclude<AssistantMode, "HIDDEN" | "MAXIMIZED">;
};
