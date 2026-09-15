import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

type EditorUpdate = (event: { editor: { getHTML: () => string } }) => void;
let onUpdate: EditorUpdate | undefined;

vi.mock("@tiptap/react", () => ({
  EditorContent: () => null,
  useEditor: (options: { onUpdate: EditorUpdate }) => {
    onUpdate = options.onUpdate;
    return {
      can: () => ({ redo: () => false, undo: () => false }),
      chain: () => ({ focus: () => ({ redo: () => undefined, undo: () => undefined, run: () => true }) }),
      commands: { setContent: vi.fn() },
      getHTML: () => "",
      isActive: () => false,
      isEmpty: true,
    };
  },
}));

import { WorkspaceEditor } from "@/features/workspace/WorkspaceEditor";

describe("WorkspaceEditor update route", () => {
  it("forwards one Tiptap update through one callback", () => {
    const onContentChange = vi.fn();
    render(<WorkspaceEditor content="" editable onContentChange={onContentChange} />);

    onUpdate?.({ editor: { getHTML: () => "<p>a</p>" } });

    expect(onContentChange).toHaveBeenCalledTimes(1);
    expect(onContentChange).toHaveBeenCalledWith("<p>a</p>");
  });
});
