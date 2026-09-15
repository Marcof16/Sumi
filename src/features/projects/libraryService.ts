import { join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";
import { ensureLibraryExists, readProjectManifest } from "@/features/projects/projectService";
import type { SumiProjectManifest } from "@/features/projects/projectTypes";

const RECENT_PROJECTS_KEY = "sumi-recent-projects";

export type LibraryProject = {
  path: string;
  manifest: SumiProjectManifest;
  lastOpenedAt?: string;
};

type LibraryEntry = { name?: string; isDirectory?: boolean };
type PathJoin = (root: string, name: string) => Promise<string>;

function readRecentProjects(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(RECENT_PROJECTS_KEY) ?? "{}");
    if (typeof value !== "object" || value === null) return {};
    return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  } catch {
    return {};
  }
}

export function sortProjectsByRecency(projects: LibraryProject[], recentProjects: Record<string, string>): LibraryProject[] {
  return [...projects].sort((left, right) => {
    const leftTime = recentProjects[left.path] ?? "";
    const rightTime = recentProjects[right.path] ?? "";
    return rightTime.localeCompare(leftTime) || left.manifest.name.localeCompare(right.manifest.name);
  });
}

export async function scanProjectEntries(libraryRoot: string, entries: LibraryEntry[], manifestReader: (path: string) => Promise<SumiProjectManifest>, pathJoin: PathJoin, recentProjects = readRecentProjects()): Promise<LibraryProject[]> {
  const projects: LibraryProject[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory || !entry.name) continue;
    const projectPath = await pathJoin(libraryRoot, entry.name);
    try {
      const manifest = await manifestReader(projectPath);
      projects.push({ path: projectPath, manifest, lastOpenedAt: recentProjects[projectPath] });
    } catch (error) {
      console.warn("Proyecto SUMI ignorado durante el escaneo", projectPath, error);
    }
  }
  return sortProjectsByRecency(projects, recentProjects);
}

export async function scanLibrary(): Promise<LibraryProject[]> {
  const libraryRoot = await ensureLibraryExists();
  const entries = await readDir(libraryRoot);
  return scanProjectEntries(libraryRoot, entries, readProjectManifest, (root, name) => join(root, name));
}

export function markProjectOpened(projectPath: string) {
  if (typeof window === "undefined") return;
  const recentProjects = readRecentProjects();
  recentProjects[projectPath] = new Date().toISOString();
  window.localStorage.setItem(RECENT_PROJECTS_KEY, JSON.stringify(recentProjects));
}
