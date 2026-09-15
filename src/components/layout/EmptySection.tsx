import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type EmptySectionProps = {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
  actionLabel?: string;
};

export function EmptySection({ title, description, emptyTitle, emptyDescription, icon: Icon, actionLabel }: EmptySectionProps) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-col gap-5 border-b border-sumi-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl tracking-tight text-sumi-text">{title}</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-sumi-text-muted">{description}</p>
        </div>
        {actionLabel && (
          <Button type="button" className="w-fit gap-2 rounded-lg bg-sumi-primary px-3.5 text-xs hover:bg-sumi-primary-hover">
            <Plus className="size-3.5" aria-hidden="true" />
            {actionLabel}
          </Button>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center py-16">
        <div className="max-w-sm text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-sumi-border bg-sumi-surface-raised text-[var(--section-accent)] shadow-sm">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-serif text-xl text-sumi-text">{emptyTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-sumi-text-muted">{emptyDescription}</p>
          {actionLabel && <p className="mt-5 text-xs font-medium text-sumi-text-soft">Tu espacio creativo aparecerá aquí.</p>}
        </div>
      </div>
    </section>
  );
}
