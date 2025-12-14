"use client";

import { useState } from "react";
import { LessonFrontmatter } from "@/lib/types";

type Props = {
  frontmatter: LessonFrontmatter;
  children: React.ReactNode;
};

export function LessonContent({ frontmatter, children }: Props) {
  const [practiceOnly, setPracticeOnly] = useState(false);

  return (
    <article
      className={`prose prose-invert max-w-none rounded-2xl border border-border bg-surface/80 p-6 shadow-sm prose-headings:font-semibold ${
        practiceOnly ? "practice-only" : ""
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted">
            {frontmatter.module}
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            {frontmatter.title}
          </h1>
          <p className="text-sm text-muted">{frontmatter.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPracticeOnly((v) => !v)}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-blue-500"
          >
            {practiceOnly ? "Exit practice" : "Practice mode"}
          </button>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
            {frontmatter.level} · {frontmatter.estimatedTime}
          </span>
        </div>
      </div>
      <div className="mt-4 text-sm text-muted">
        Objectives: {frontmatter.learningObjectives.join("; ")}
      </div>
      <div className="mt-6">{children}</div>
    </article>
  );
}
