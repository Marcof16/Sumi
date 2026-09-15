export const SUMI_PROJECT_FORMAT = "sumi-project" as const;
export const CURRENT_PROJECT_VERSION = 1 as const;

export type SumiProjectManifest = {
  format: typeof SUMI_PROJECT_FORMAT;
  version: typeof CURRENT_PROJECT_VERSION;
  name: string;
  createdAt: string;
};

export type OpenProject = {
  path: string;
  manifest: SumiProjectManifest;
};

export function isSumiProjectManifest(value: unknown): value is SumiProjectManifest {
  if (typeof value !== "object" || value === null) return false;
  const manifest = value as Record<string, unknown>;
  return manifest.format === SUMI_PROJECT_FORMAT && manifest.version === CURRENT_PROJECT_VERSION && typeof manifest.name === "string" && manifest.name.trim().length > 0 && typeof manifest.createdAt === "string" && !Number.isNaN(Date.parse(manifest.createdAt));
}

export function createManifest(name: string, createdAt = new Date().toISOString()): SumiProjectManifest {
  return { format: SUMI_PROJECT_FORMAT, version: CURRENT_PROJECT_VERSION, name: name.trim(), createdAt };
}
