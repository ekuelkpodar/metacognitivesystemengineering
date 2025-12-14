"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { ArtifactRecord } from "@/lib/types";

export function ArtifactLibrary() {
  const [artifacts, setArtifacts] = useState<ArtifactRecord[]>([]);

  useEffect(() => {
    const load = async () => {
      const all = await db.artifacts.orderBy("createdAt").reverse().toArray();
      setArtifacts(all);
    };
    load();
  }, []);

  const download = (artifact: ArtifactRecord) => {
    const blob = new Blob([artifact.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${artifact.title}.${artifact.kind === "policy" ? "yaml" : "md"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">Artifact Library</div>
      <p className="text-xs text-muted">Locally saved outputs from lessons and studio.</p>
      <div className="mt-3 space-y-2 text-sm">
        {artifacts.length === 0 && <p className="text-muted">No artifacts yet.</p>}
        {artifacts.map((artifact) => (
          <div
            key={artifact.id}
            className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
          >
            <div>
              <div className="font-semibold">{artifact.title}</div>
              <p className="text-xs text-muted">
                {artifact.kind} · {new Date(artifact.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => download(artifact)}
              className="text-xs text-blue-600 hover:underline"
            >
              Export
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
