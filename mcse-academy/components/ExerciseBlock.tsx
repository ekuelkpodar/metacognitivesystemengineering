"use client";

import { useState } from "react";
import { useProgressStore } from "@/lib/state";

type Props = {
  id: string;
  prompt: string;
  rubric: string;
};

export function ExerciseBlock({ id, prompt, rubric }: Props) {
  const [response, setResponse] = useState("");
  const saveNote = useProgressStore((s) => s.saveNote);

  const handleSave = () => {
    saveNote(id, response);
  };

  return (
    <div className="mcse-exercise my-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">Mini Exercise</div>
      <p className="text-sm text-muted">{prompt}</p>
      <textarea
        className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-sm"
        rows={4}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Draft your answer..."
      />
      <div className="mt-2 flex items-center justify-between text-xs text-muted">
        <span>{rubric}</span>
        <button
          onClick={handleSave}
          className="rounded-full bg-blue-600 px-3 py-1 text-white transition hover:-translate-y-0.5"
        >
          Save note
        </button>
      </div>
    </div>
  );
}
