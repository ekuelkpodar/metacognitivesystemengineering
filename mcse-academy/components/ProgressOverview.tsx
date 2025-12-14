"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/lib/state";
import { exportProgress, importProgress } from "@/lib/export";
import { db } from "@/lib/db";

export function ProgressOverview() {
  const store = useProgressStore();
  const [importError, setImportError] = useState<string | null>(null);
  const [artifactCount, setArtifactCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      setArtifactCount(await db.artifacts.count());
      setProjectCount(await db.projects.count());
    };
    load();
  }, []);

  const handleExport = async () => {
    const data = await exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mcse-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file?: File) => {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await importProgress(data);
      setImportError(null);
    } catch (err: any) {
      setImportError(err?.message ?? "Import failed");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Progress & Artifacts</div>
          <p className="text-xs text-muted">
            Saved locally (localStorage + IndexedDB). Export/import to move devices.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:-translate-y-0.5"
        >
          Export JSON
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3 text-sm">
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Lessons</div>
          <div className="text-2xl font-semibold">
            {store.completedLessons.length}
          </div>
          <p className="text-xs text-muted">Completed lessons</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Artifacts</div>
          <div className="text-2xl font-semibold">{artifactCount}</div>
          <p className="text-xs text-muted">Stored in IndexedDB</p>
        </div>
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Projects</div>
          <div className="text-2xl font-semibold">{projectCount}</div>
          <p className="text-xs text-muted">Studio projects</p>
        </div>
      </div>
      <div className="mt-3">
        <label className="text-xs font-semibold text-muted">Import progress</label>
        <input
          type="file"
          accept="application/json"
          onChange={(e) => handleImport(e.target.files?.[0])}
          className="mt-1 text-sm"
        />
        {importError && <p className="text-xs text-red-500">{importError}</p>}
      </div>
      <div className="mt-3 rounded-lg border border-border bg-surface p-3 text-xs text-muted">
        Notes saved per lesson: {Object.keys(store.notes).length} · Quizzes graded:{" "}
        {Object.keys(store.quizScores).length}
      </div>
    </div>
  );
}
