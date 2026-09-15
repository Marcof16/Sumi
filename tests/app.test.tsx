import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";
import type { OpenProject } from "@/features/projects/projectTypes";

const testProject: OpenProject = {
  path: "C:/Novelas/Mi novela",
  manifest: { format: "sumi-project", version: 1, name: "El Reino de Ceniza", createdAt: "2026-08-20T00:00:00.000Z" },
};

function renderProject() {
  return render(<App initialProject={testProject} />);
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe("SUMI shell", () => {
  it("renders the library without an open project", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole("heading", { name: "Tus historias, en un solo lugar." })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Navegación de biblioteca" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Nueva novela/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Abrir novela/ })).not.toBeInTheDocument();
    expect(screen.getByText(/biblioteca local está disponible/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Nueva novela/ }));
    expect(screen.getByRole("heading", { name: "Nueva novela" })).toBeInTheDocument();
    expect(screen.queryByText(/elige la carpeta/i)).not.toBeInTheDocument();
  });

  it("renders the novel home and main navigation", () => {
    renderProject();
    expect(screen.getByRole("heading", { name: "El Reino de Ceniza" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Área de trabajo/ })).toHaveLength(1);
    expect(screen.getByText("Tu historia, de un vistazo.")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
    expect(screen.getByText("Agent")).toBeInTheDocument();
  });

  it("shows quick capture without pretending to persist Markdown", async () => {
    const user = userEvent.setup();
    renderProject();
    const capture = screen.getByRole("textbox", { name: "Escribe una idea" });
    expect(screen.getByRole("heading", { name: "Captura rápida" })).toBeInTheDocument();
    await user.type(capture, "Una ciudad bajo el mar");
    await user.click(screen.getByRole("button", { name: "Guardar idea" }));
    expect(screen.getByRole("status")).toHaveTextContent("El guardado de ideas se conectará al Inbox en la próxima fase.");
    expect(capture).toHaveValue("Una ciudad bajo el mar");
    expect(screen.queryByText(/guardada|guardado correctamente|Markdown.*guardad/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ir a Ideas" }));
    expect(screen.getByRole("heading", { name: "Ideas" })).toBeInTheDocument();
  });

  it("keeps the home overview focused on current empty story state", async () => {
    const user = userEvent.setup();
    renderProject();
    expect(screen.getByRole("button", { name: "Ideas: 0" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Personajes: 0" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Capítulos: 0" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Preguntas abiertas: 0" })).toBeInTheDocument();
    expect(screen.getByText("Todo tranquilo por ahora.")).toBeInTheDocument();
    expect(screen.getByText("No hay pendientes narrativos registrados.")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ir a Revisión" }));
    expect(screen.getByRole("heading", { name: "Revisión" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Inicio" }));
    expect(screen.getByText("Todavía no hay actividad registrada en esta novela.")).toBeInTheDocument();
    expect(screen.getByText("Los cambios importantes aparecerán aquí.")).toBeInTheDocument();
    expect(screen.queryByText(/Capítulo 4|Escena de batalla|palabras|porcentaje/i)).not.toBeInTheDocument();
  });

  it("opens the workspace start screen without an active scene", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: /Área de trabajo/ }));
    expect(screen.getByRole("heading", { name: "¿Qué quieres hacer ahora?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nueva escena" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Elegir escena" }));
    expect(screen.getByText("Todavía no hay escenas en esta sesión.")).toBeInTheDocument();
    expect(screen.queryByText(/Demo de interfaz/)).not.toBeInTheDocument();
  });

  it("keeps one scene's information across all writing phases", { timeout: 10000 }, async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: /Área de trabajo/ }));
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    const title = screen.getByRole("textbox", { name: "Título de escena" });
    await user.clear(title);
    await user.type(title, "Escena A");
    await user.type(screen.getByRole("textbox", { name: "¿Qué quieres contar en esta escena?" }), "La protagonista entiende la verdad");
    await user.type(screen.getByRole("textbox", { name: "Lo que no quieres perder" }), "No perder el giro");
    expect(screen.getByTestId("workspace-status-bar")).toHaveTextContent("0 palabras");
    expect(screen.getByTestId("workspace-scroll-area")).not.toContainElement(screen.getByTestId("workspace-status-bar"));
    await user.click(screen.getByRole("tab", { name: "Planificación" }));
    expect(screen.getByText("La protagonista entiende la verdad")).toBeInTheDocument();
    for (const text of ["Abrir el escenario", "Enfocar a la protagonista", "Presentar el conflicto"]) {
      await user.click(screen.getByRole("button", { name: "Añadir paso" }));
      const inputs = screen.getAllByRole("textbox", { name: /Paso/ });
      await user.type(inputs[inputs.length - 1], text);
    }
    expect(screen.getByDisplayValue("Presentar el conflicto")).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Borrador" }));
    expect(screen.getByTestId("workspace-status-bar")).toHaveTextContent("0 palabras");
    expect(screen.getByTestId("workspace-status-bar")).toHaveTextContent("Borrador");
    await user.click(screen.getByRole("button", { name: "Ver lo que has ordenado" }));
    expect(screen.getByRole("dialog", { name: "Plan de la escena" })).toBeInTheDocument();
    expect(screen.getByText("Abrir el escenario")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cerrar plan" }));
    await user.click(screen.getByRole("tab", { name: "Revisión" }));
    await user.click(screen.getByRole("checkbox", { name: "Claridad" }));
    await user.type(screen.getByRole("textbox", { name: "Notas para volver después" }), "Revisar el ritmo");
    await user.click(screen.getByRole("tab", { name: "Idea" }));
    expect(screen.getByDisplayValue("La protagonista entiende la verdad")).toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "Final" }));
    expect(screen.getByRole("heading", { name: "Una vista limpia" })).toBeInTheDocument();
    expect(screen.getAllByText("Escena A").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("tab", { name: "Borrador" }));
    expect(screen.getByTestId("workspace-status-bar")).toHaveTextContent("0 palabras");
    await user.click(screen.getByRole("tab", { name: "Revisión" }));
    expect(screen.getByRole("checkbox", { name: "Claridad" })).toBeChecked();
    expect(screen.getByDisplayValue("Revisar el ritmo")).toBeInTheDocument();
  });

  it("supports multiple local scenes and reflects local tools", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: /Área de trabajo/ }));
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    await user.clear(screen.getByRole("textbox", { name: "Título de escena" }));
    await user.type(screen.getByRole("textbox", { name: "Título de escena" }), "Escena A");
    await user.type(screen.getByRole("textbox", { name: "¿Qué quieres contar en esta escena?" }), "Objetivo A");
    await user.click(screen.getByRole("button", { name: "Herramientas" }));
    expect(screen.getByText("Definido")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cerrar herramientas" }));
    await user.click(screen.getByRole("button", { name: "Mostrar escenas" }));
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    await user.clear(screen.getByRole("textbox", { name: "Título de escena" }));
    await user.type(screen.getByRole("textbox", { name: "Título de escena" }), "Escena B");
    expect(screen.getByRole("textbox", { name: "Título de escena" })).toHaveValue("Escena B");
    await user.click(screen.getByRole("button", { name: "Seleccionar escena Escena A" }));
    expect(screen.getByRole("textbox", { name: "Título de escena" })).toHaveValue("Escena A");
    expect(screen.getByDisplayValue("Objetivo A")).toBeInTheDocument();
    expect(screen.getByTestId("workspace-status-bar")).toHaveTextContent("0 palabras");
  });

  it("toggles the navigator and exits concentration with Escape", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: /Área de trabajo/ }));
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    expect(screen.getByRole("button", { name: "Mostrar escenas" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "De esta sesión" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mostrar escenas" }));
    expect(screen.getByRole("button", { name: "Ocultar escenas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "De esta sesión" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ocultar escenas" }));
    await user.click(screen.getByRole("button", { name: "Modo concentración" }));
    expect(screen.getByRole("button", { name: "Salir de concentración" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Navegación principal" })).not.toBeInTheDocument();
    expect(screen.queryByText("Agent")).not.toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Modo concentración" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
    expect(screen.getByText("Agent")).toBeInTheDocument();
  });

  it("returns from a scene to the workspace menu and closes the navigator on re-entry", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: /Área de trabajo/ }));
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    await user.click(screen.getByRole("button", { name: "Mostrar escenas" }));
    await user.click(screen.getByRole("button", { name: "Área de trabajo", exact: true }));
    expect(screen.getByRole("heading", { name: "¿Qué quieres hacer ahora?" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Nueva escena" }));
    expect(screen.getByRole("button", { name: "Mostrar escenas" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "De esta sesión" })).not.toBeInTheDocument();
  });

  it("changes the active section without reloading", async () => {
    const user = userEvent.setup();
    renderProject();

    await user.click(screen.getByRole("button", { name: "Personajes" }));

    expect(screen.getByRole("heading", { name: "Personajes" })).toBeInTheDocument();
    expect(screen.getByText("Contexto actual")).toBeInTheDocument();
  });

  it("keeps one menu toggle in the same top area when collapsing the sidebar", async () => {
    const user = userEvent.setup();
    renderProject();
    const collapseButton = screen.getByRole("button", { name: "Contraer menú" });
    expect(collapseButton).toBeInTheDocument();
    await user.click(collapseButton);
    expect(screen.getByRole("button", { name: "Expandir menú" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Expandir navegación" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Expandir menú" }));
    expect(screen.getByRole("button", { name: "Contraer menú" })).toBeInTheDocument();
  });

  it("keeps Volver a biblioteca available when the sidebar is collapsed", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: "Contraer menú" }));
    expect(screen.getByRole("button", { name: "Volver a biblioteca" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Configuración" })).toBeInTheDocument();
    await user.hover(screen.getByRole("button", { name: "Volver a biblioteca" }));
    expect(await screen.findByText("Volver a biblioteca")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Volver a biblioteca" }));
    expect(screen.getByRole("heading", { name: "Tus historias, en un solo lugar." })).toBeInTheDocument();
  });

  it("can hide the assistant panel", async () => {
    const user = userEvent.setup();
    renderProject();

    await user.click(screen.getAllByRole("button", { name: "Ocultar asistente" })[0]);

    expect(screen.queryByText("Agent")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mostrar asistente" })).toBeInTheDocument();
  });

  it("allows choosing a theme from the header without duplicating the selector", async () => {
    const user = userEvent.setup();
    renderProject();

    expect(screen.getAllByRole("button", { name: "Cambiar tema" })).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Configuración" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(screen.getByRole("heading", { name: "Apariencia" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Noche/ }));

    expect(document.documentElement.dataset.theme).toBe("night");
  });

  it("shows the name from the project manifest", () => {
    renderProject();
    expect(screen.getAllByText("El Reino de Ceniza").length).toBeGreaterThanOrEqual(2);
  });

  it("returns to the library without closing SUMI", async () => {
    const user = userEvent.setup();
    renderProject();
    await user.click(screen.getByRole("button", { name: "Volver a biblioteca" }));
    expect(screen.getByRole("heading", { name: "Tus historias, en un solo lugar." })).toBeInTheDocument();
  });
});
