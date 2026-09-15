import { describe, expect, it } from "vitest";
import { scanProjectEntries, sortProjectsByRecency } from "@/features/projects/libraryService";
import type { SumiProjectManifest } from "@/features/projects/projectTypes";

const manifest = (name: string): SumiProjectManifest => ({ format: "sumi-project", version: 1, name, createdAt: "2026-08-20T00:00:00.000Z" });

describe("biblioteca SUMI", () => {
  it("discovers valid projects and ignores non-project folders", async () => {
    const projects = await scanProjectEntries("library", [{ name: "Valido", isDirectory: true }, { name: "Notas sueltas", isDirectory: true }, { name: "archivo.md", isDirectory: false }], async (path) => {
      if (path.endsWith("Valido")) return manifest("Valido");
      throw new Error("manifest inválido");
    }, async (root, name) => `${root}/${name}`, {});

    expect(projects).toHaveLength(1);
    expect(projects[0].manifest.name).toBe("Valido");
  });

  it("orders projects by the local recent timestamp", () => {
    const projects = [
      { path: "a", manifest: manifest("Antigua") },
      { path: "b", manifest: manifest("Reciente") },
    ];
    const ordered = sortProjectsByRecency(projects, { a: "2026-08-20T10:00:00.000Z", b: "2026-08-20T11:00:00.000Z" });
    expect(ordered.map((project) => project.manifest.name)).toEqual(["Reciente", "Antigua"]);
  });
});
