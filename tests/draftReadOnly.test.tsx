import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DraftReadOnly } from "@/features/workspace/components/WorkspaceSheets";

afterEach(cleanup);

describe("DraftReadOnly", () => {
  it("renders supported rich text without making it editable", async () => {
    const { container } = render(<DraftReadOnly content="<h2>Título</h2><p>Hola <strong>mundo</strong> <em>cursiva</em></p>" />);

    await waitFor(() => expect(container.querySelector("h2")).toHaveTextContent("Título"));
    expect(container.querySelector("strong")).toHaveTextContent("mundo");
    expect(container.querySelector("em")).toHaveTextContent("cursiva");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(container.querySelector("[contenteditable='true']")).not.toBeInTheDocument();
  });

  it("updates when the external draft content changes", async () => {
    const { rerender } = render(<DraftReadOnly content="<p>Texto A</p>" />);
    await waitFor(() => expect(screen.getByText("Texto A")).toBeInTheDocument());

    rerender(<DraftReadOnly content="<p>Texto B</p>" />);

    await waitFor(() => expect(screen.getByText("Texto B")).toBeInTheDocument());
    expect(screen.queryByText("Texto A")).not.toBeInTheDocument();
  });

  it("does not render unsupported executable markup", async () => {
    const { container } = render(<DraftReadOnly content={'<p>Texto</p><script>window.__draftPayload = true</script><img src="x" onerror="window.__draftPayload = true"><div onclick="window.__draftPayload = true">Bloque</div><a href="javascript:alert(1)">Enlace</a>'} />);

    await waitFor(() => expect(screen.getByText("Texto")).toBeInTheDocument());
    expect(container.querySelector("script")).not.toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("[onclick]")).not.toBeInTheDocument();
    expect(container.querySelector("[href^='javascript:']")).not.toBeInTheDocument();
    expect(container.textContent).toContain("Bloque");
    expect(container.textContent).toContain("Enlace");
  });

  it("keeps the existing empty draft message", () => {
    render(<DraftReadOnly content="" />);

    expect(screen.getByText("Todavía no hay texto para leer.")).toBeInTheDocument();
    expect(screen.getByText("Puedes volver al Borrador cuando quieras.")).toBeInTheDocument();
  });
});
