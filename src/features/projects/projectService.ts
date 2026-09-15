import { documentDir, join } from "@tauri-apps/api/path";
import { isTauri } from "@tauri-apps/api/core";
import { exists, mkdir, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { createManifest, isSumiProjectManifest, type OpenProject, type SumiProjectManifest } from "@/features/projects/projectTypes";
import { PROJECT_DIRECTORIES, PROJECT_FILES } from "@/features/projects/projectTemplates";

export const INVALID_PROJECT_MESSAGE = "Esta carpeta no parece ser un proyecto de SUMI.";
export const DESKTOP_ONLY_MESSAGE = "La biblioteca local está disponible en SUMI Desktop. Ejecuta pnpm tauri:dev.";
export const DUPLICATE_PROJECT_MESSAGE = "Ya existe una novela con este nombre.";

export function validateProjectName(name: string): string | null {
  const trimmedName = name.trim();
  const hasControlCharacter = Array.from(name).some((character) => character.charCodeAt(0) < 32);
  const reservedName = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\..*)?$/i.test(trimmedName);
  if (!trimmedName) return "Escribe un nombre de novela.";
  if (trimmedName === "." || trimmedName === "..") return "Ese nombre no es válido para una carpeta.";
  if (hasControlCharacter || /[\\/:*?"<>|]/.test(name)) return "El nombre contiene caracteres no válidos para Windows.";
  if (/[ .]$/.test(trimmedName)) return "El nombre no puede terminar en un espacio o un punto.";
  if (reservedName) return "Ese nombre está reservado por Windows. Elige otro.";
  if (trimmedName.length > 240) return "El nombre es demasiado largo.";
  return null;
}

export async function getLibraryRoot(): Promise<string> {
  if (!isTauri()) throw new Error(DESKTOP_ONLY_MESSAGE);
  return join(await documentDir(), "SUMI", "Novelas");
}

export async function ensureLibraryExists(): Promise<string> {
  const libraryRoot = await getLibraryRoot();
  await mkdir(libraryRoot, { recursive: true });
  return libraryRoot;
}

export async function readProjectManifest(projectPath: string): Promise<SumiProjectManifest> {
  const raw = await readTextFile(await join(projectPath, "sumi.json"));
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new Error(INVALID_PROJECT_MESSAGE);
  }
  if (!isSumiProjectManifest(parsed)) throw new Error(INVALID_PROJECT_MESSAGE);
  return parsed;
}

export async function validateProject(projectPath: string): Promise<boolean> {
  try {
    await readProjectManifest(projectPath);
    return true;
  } catch {
    return false;
  }
}

export async function openProject(projectPath: string): Promise<OpenProject> {
  const manifest = await readProjectManifest(projectPath);
  return { path: projectPath, manifest };
}

export async function createProject(name: string): Promise<OpenProject> {
  const validationError = validateProjectName(name);
  if (validationError) throw new Error(validationError);
  const libraryRoot = await ensureLibraryExists();
  const projectPath = await join(libraryRoot, name.trim());
  if (await exists(projectPath)) throw new Error(DUPLICATE_PROJECT_MESSAGE);

  await mkdir(projectPath);
  for (const directory of PROJECT_DIRECTORIES) await mkdir(await join(projectPath, ...directory.split("/")), { recursive: true });
  for (const [relativePath, content] of Object.entries(PROJECT_FILES)) await writeTextFile(await join(projectPath, ...relativePath.split("/")), content);
  const manifest = createManifest(name);
  await writeTextFile(await join(projectPath, "sumi.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return { path: projectPath, manifest };
}
