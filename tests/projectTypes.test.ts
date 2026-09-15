import { describe, expect, it } from "vitest";
import { isSumiProjectManifest } from "@/features/projects/projectTypes";
import { validateProjectName } from "@/features/projects/projectService";

describe("sumi.json validation", () => {
  it("accepts a compatible SUMI manifest", () => {
    expect(isSumiProjectManifest({ format: "sumi-project", version: 1, name: "Mi novela", createdAt: "2026-08-20T00:00:00.000Z" })).toBe(true);
  });

  it("rejects unknown formats and incompatible versions", () => {
    expect(isSumiProjectManifest({ format: "other", version: 1, name: "Mi novela", createdAt: "2026-08-20T00:00:00.000Z" })).toBe(false);
    expect(isSumiProjectManifest({ format: "sumi-project", version: 2, name: "Mi novela", createdAt: "2026-08-20T00:00:00.000Z" })).toBe(false);
  });

  it("rejects incomplete manifests", () => {
    expect(isSumiProjectManifest({ format: "sumi-project", version: 1 })).toBe(false);
  });
});

describe("nombres de novelas", () => {
  it("accepts normal names and rejects empty, duplicate-prone Windows names", () => {
    expect(validateProjectName("Los dioses del Olimpo")).toBeNull();
    expect(validateProjectName("   ")).toBe("Escribe un nombre de novela.");
    expect(validateProjectName("CON")).toContain("reservado");
    expect(validateProjectName("Novela:")).toContain("caracteres no válidos");
  });
});
