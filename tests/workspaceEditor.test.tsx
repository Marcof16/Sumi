import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WorkspaceEditor } from "@/features/workspace/WorkspaceEditor";
import { countWordsFromHtml } from "@/features/workspace/workspaceUtils";

afterEach(cleanup);

describe("WorkspaceEditor", () => {
  it("applies external content without notifying React", async () => {
    const onContentChange = vi.fn();
    const { rerender } = render(<WorkspaceEditor content="<p>A</p>" editable onContentChange={onContentChange} />);
    rerender(<WorkspaceEditor content="<p>B</p>" editable onContentChange={onContentChange} />);

    await waitFor(() => expect(screen.getByRole("textbox", { name: "Editor del borrador" })).toHaveTextContent("B"));
    expect(onContentChange).not.toHaveBeenCalled();
  });

  it("counts words from the HTML stored by the workspace", () => {
    expect(countWordsFromHtml("<p>Había una vez</p>")).toBe(3);
  });
});
