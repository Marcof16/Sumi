import type { ReactNode } from "react";

export function StageFrame({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <div className="mx-auto max-w-5xl"><div className="mb-7"><h1 className="font-serif text-3xl tracking-tight text-sumi-text">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-relaxed text-sumi-text-muted">{description}</p></div>{children}</div>;
}
