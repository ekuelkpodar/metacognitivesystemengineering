"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { StudioProject } from "@/lib/types";

export function ProjectLibrary() {
  const [projects, setProjects] = useState<StudioProject[]>([]);

  useEffect(() => {
    const load = async () => {
      const saved = await db.projects.toArray();
      setProjects(saved);
    };
    load();
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">Saved Studio Projects</div>
      <p className="text-xs text-muted">Stored locally in IndexedDB.</p>
      <div className="mt-3 space-y-2 text-sm">
        {projects.length === 0 && (
          <p className="text-muted">No projects yet.</p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">{project.name}</div>
              <span className="text-xs text-muted">
                {new Date(project.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted">Domain: {project.domain}</p>
            <p className="text-xs text-muted">Components: {project.components.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
