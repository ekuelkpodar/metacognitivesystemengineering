"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModuleMeta } from "@/lib/types";
import { useMemo, useState } from "react";

type Props = {
  modules: ModuleMeta[];
};

export function SidebarNav({ modules }: Props) {
  const pathname = usePathname();
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const [showPrereqs, setShowPrereqs] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  const filtered = useMemo(() => {
    if (levelFilter === "All") return modules;
    return modules.filter((m) => m.level === levelFilter);
  }, [modules, levelFilter]);

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/70 bg-surface/80 px-4 py-6 text-sm backdrop-blur md:block">
      <div className="flex items-center justify-between pb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          Curriculum
        </span>
        <Link
          href="/learn"
          className="text-blue-600 underline-offset-4 hover:underline"
        >
          All
        </Link>
      </div>
      <div className="space-y-2 pb-4 text-xs text-muted">
        <div className="flex flex-wrap gap-2">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((level) => (
            <button
              key={level}
              onClick={() => setLevelFilter(level)}
              className={`rounded-full border px-2 py-1 ${
                levelFilter === level ? "border-blue-500 text-blue-700" : "border-border"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPrereqs}
            onChange={() => setShowPrereqs((v) => !v)}
          />
          Show prerequisites
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showRelated}
            onChange={() => setShowRelated((v) => !v)}
          />
          Show related lessons
        </label>
      </div>
      <div className="space-y-4">
        {filtered.map((module) => (
          <div key={module.id} className="space-y-2">
            <Link
              href={`/learn/${module.id}`}
              className="block rounded-lg border border-border/60 bg-card px-3 py-2 font-semibold transition hover:border-blue-500 hover:text-blue-700"
            >
              {module.title}
            </Link>
            <div className="space-y-1 pl-2">
              <Link
                href={`/learn/${module.id}`}
                className={`block rounded-md px-2 py-1 text-muted transition hover:text-blue-700 ${
                  pathname.startsWith(`/learn/${module.id}`) &&
                  "bg-card text-foreground"
                }`}
              >
                Open lessons ->
              </Link>
              {showPrereqs && (
                <p className="text-[11px] text-muted">
                  Prereqs: visible inside lesson cards.
                </p>
              )}
              {showRelated && (
                <p className="text-[11px] text-muted">
                  Related lessons shown in module pages.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
