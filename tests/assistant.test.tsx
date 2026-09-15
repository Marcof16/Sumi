import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "@/App";
import type { OpenProject } from "@/features/projects/projectTypes";
import { defaultAssistantPreferences, loadAssistantPreferences, saveAssistantPreferences } from "@/features/assistant/assistantStorage";

const project: OpenProject = { path: "C:/Novelas/Asistente", manifest: { format: "sumi-project", version: 1, name: "Asistente", createdAt: "2026-08-20T00:00:00.000Z" } };

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("SUMI Assistant", () => {
  it("starts with General and keeps the chat while section context changes", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    expect(screen.getByText("General")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Personajes" }));
    expect(screen.getAllByText("Personajes").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("creates and renames a conversation", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    expect(screen.getByRole("dialog", { name: "Conversaciones" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Nueva conversación" }));
    expect(screen.getAllByText("Nueva conversación").length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.click(screen.getByRole("button", { name: "Opciones de Nueva conversación" }));
    await user.click(screen.getByRole("menuitem", { name: /Renombrar/ }));
    const input = screen.getByRole("textbox", { name: "Nombre de la conversación" });
    await user.clear(input);
    await user.type(input, "Sistema de magia");
    await user.click(screen.getByRole("button", { name: "Guardar" }));
    expect(screen.getAllByText("Sistema de magia").length).toBeGreaterThanOrEqual(2);
  });

  it("sends messages locally and does not send an empty composer", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    const sendButton = screen.getByRole("button", { name: "Enviar mensaje" });
    expect(sendButton).toBeDisabled();
    await user.type(screen.getByRole("textbox", { name: "Mensaje para Agent" }), "Una prueba");
    expect(sendButton).toBeEnabled();
    await user.click(sendButton);
    expect(screen.getByText("Una prueba")).toBeInTheDocument();
    expect(screen.getByText("OpenCode todavía no está conectado a SUMI.")).toBeInTheDocument();
  });

  it("asks before deleting chats and recreates General when the last chat is deleted", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.click(screen.getByRole("button", { name: "Nueva conversación" }));
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.click(screen.getByRole("button", { name: "Opciones de Nueva conversación" }));
    await user.click(screen.getByRole("menuitem", { name: /Eliminar/ }));
    expect(screen.getByRole("heading", { name: "Eliminar conversación" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    expect(screen.queryByText("Nueva conversación")).not.toBeInTheDocument();
    expect(screen.getAllByText("General").length).toBeGreaterThanOrEqual(2);
  });

  it("switches assistant modes and restores the previous visible mode", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    await user.click(screen.getByRole("button", { name: "Desacoplar asistente" }));
    expect(screen.getAllByRole("button", { name: "Acoplar asistente" }).length).toBeGreaterThan(0);
    await user.click(screen.getByRole("button", { name: "Maximizar asistente" }));
    expect(screen.getByRole("button", { name: "Restaurar asistente" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Restaurar asistente" }));
    expect(screen.getByRole("button", { name: "Acoplar asistente" })).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Ocultar asistente" })[0]);
    expect(screen.getByRole("button", { name: "Mostrar asistente" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Mostrar asistente" }));
    expect(screen.getByRole("button", { name: "Acoplar asistente" })).toBeInTheDocument();
  });

  it("keeps the conversation drawer closed until the hamburger is used", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    expect(screen.queryByRole("dialog", { name: "Conversaciones" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    expect(screen.getByRole("dialog", { name: "Conversaciones" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Cerrar conversaciones al hacer clic fuera" }));
    expect(screen.queryByRole("dialog", { name: "Conversaciones" })).not.toBeInTheDocument();
  });

  it("closes the drawer on selection, Escape and outside click", async () => {
    const user = userEvent.setup();
    render(<App initialProject={project} />);
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.click(screen.getByRole("button", { name: "General" }));
    expect(screen.queryByRole("dialog", { name: "Conversaciones" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Conversaciones" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Abrir conversaciones" }));
    await user.click(screen.getByRole("button", { name: "Cerrar conversaciones" }));
    expect(screen.queryByRole("dialog", { name: "Conversaciones" })).not.toBeInTheDocument();
  });

  it("falls back to safe assistant preferences when storage is invalid", () => {
    window.localStorage.setItem("sumi-assistant-preferences", JSON.stringify({ mode: "INVALID" }));
    expect(loadAssistantPreferences()).toEqual(defaultAssistantPreferences);
    saveAssistantPreferences({ ...defaultAssistantPreferences, mode: "FLOATING" });
    expect(loadAssistantPreferences().mode).toBe("FLOATING");
  });
});
