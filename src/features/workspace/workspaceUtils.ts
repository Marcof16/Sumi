import type { WorkspaceBeat, WorkspaceScene } from "@/features/workspace/workspaceTypes";

let temporaryId = 0;

function createTemporaryId(prefix: string) {
  temporaryId += 1;
  return `${prefix}-${temporaryId}`;
}

export function createWorkspaceScene(): WorkspaceScene {
  return {
    id: createTemporaryId("scene"),
    title: "Sin título",
    stage: "IDEA",
    idea: { goal: "", notes: "", characters: [] },
    planning: { beats: [] },
    draft: { content: "" },
    revision: { checks: {}, notes: "" },
  };
}

export function createWorkspaceBeat(): WorkspaceBeat {
  return { id: createTemporaryId("beat"), text: "" };
}

export function countWordsFromHtml(content: string) {
  const plainText = content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").trim();
  return plainText ? plainText.split(/\s+/).length : 0;
}

export function hasContent(value: string) {
  return value.trim().length > 0;
}
