"use client";

import { useProgressStore } from "@/lib/state";

type Props = {
  lessonId: string;
  summary: string;
};

export function LessonControls({ lessonId, summary }: Props) {
  const markComplete = useProgressStore((s) => s.markLessonComplete);
  const completed = useProgressStore((s) =>
    s.completedLessons.includes(lessonId)
  );
  const note = useProgressStore((s) => s.notes[lessonId] || "");
  const saveNote = useProgressStore((s) => s.saveNote);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Progress</div>
          <p className="text-xs text-muted">{summary}</p>
        </div>
        <button
          onClick={() => markComplete(lessonId)}
          className={`rounded-full px-4 py-2 text-sm font-semibold shadow ${
            completed
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 text-white hover:-translate-y-0.5"
          }`}
        >
          {completed ? "Completed" : "Mark complete"}
        </button>
      </div>
      <div className="mt-3">
        <label className="text-xs font-semibold text-muted">Notes</label>
        <textarea
          className="mt-1 w-full rounded-lg border border-border bg-surface p-2 text-sm"
          rows={4}
          value={note}
          onChange={(e) => saveNote(lessonId, e.target.value)}
          placeholder="Capture your takeaways or follow-ups..."
        />
      </div>
    </div>
  );
}
