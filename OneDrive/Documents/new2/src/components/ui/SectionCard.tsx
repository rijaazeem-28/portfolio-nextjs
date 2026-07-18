import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/80 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/20 dark:border-white/5 dark:bg-zinc-950/70 dark:shadow-none">
      <h3 className="mb-4 text-xl font-semibold text-foreground">{title}</h3>
      <div className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">{children}</div>
    </div>
  );
}
