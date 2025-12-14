"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArtifactKind, ArtifactRecord } from "@/lib/types";
import { useProgressStore } from "@/lib/state";
import { db } from "@/lib/db";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type Props = {
  id: string;
  kind: ArtifactKind;
  starter: string;
  description: string;
  lessonId?: string;
};

export function ArtifactBlock({ id, kind, starter, description, lessonId }: Props) {
  const [content, setContent] = useState(starter);
  const addArtifact = useProgressStore((s) => s.addArtifact);

  useEffect(() => {
    setContent(starter);
  }, [starter]);

  const handleSave = async () => {
    const artifact: ArtifactRecord = {
      id: `${id}-${Date.now()}`,
      title: `${kind.toUpperCase()} ${new Date().toLocaleString()}`,
      kind,
      content,
      lessonId,
      createdAt: Date.now(),
    };
    addArtifact(artifact);
    await db.artifacts.add(artifact);
  };

  return (
    <div className="mcse-artifact my-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Build Artifact</div>
          <p className="text-sm text-muted">{description}</p>
        </div>
        <button
          onClick={handleSave}
          className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:-translate-y-0.5"
        >
          Save
        </button>
      </div>
      <div className="mt-3">
        <MonacoEditor
          height="260px"
          defaultLanguage={
            kind === "policy"
              ? "yaml"
              : kind === "telemetry" || kind === "evaluation"
                ? "json"
                : "markdown"
          }
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value ?? "")}
          options={{ minimap: { enabled: false }, fontSize: 13 }}
        />
      </div>
    </div>
  );
}
