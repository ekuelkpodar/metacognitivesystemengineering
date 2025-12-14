import Link from "next/link";
import { getLessonsMeta } from "@/lib/content";

export default async function CaseStudiesPage() {
  const lessons = (await getLessonsMeta()).filter(
    (l) => l.module === "case-studies"
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Case Studies
        </p>
        <h1 className="text-3xl font-semibold">Applied MCSE</h1>
        <p className="text-sm text-muted">
          Domain-specific decompositions, policies, and metrics.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/${lesson.module}/${lesson.slug}`}
            className="rounded-xl border border-border bg-card px-4 py-3 hover:border-blue-500"
          >
            <div className="text-lg font-semibold">{lesson.title}</div>
            <p className="text-sm text-muted">{lesson.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
