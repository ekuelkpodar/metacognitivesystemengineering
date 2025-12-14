import Link from "next/link";
import { getLessonsMeta, getModules } from "@/lib/content";

export default async function LearnPage() {
  const modules = await getModules();
  const lessons = await getLessonsMeta();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Curriculum
        </p>
        <h1 className="text-3xl font-semibold">Learn MCSE</h1>
        <p className="text-sm text-muted">
          Structured modules with lessons, checkpoints, exercises, artifacts,
          and failure-mode sections.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {modules.map((module) => {
          const moduleLessons = lessons.filter(
            (lesson) => lesson.module === module.id
          );
          return (
            <div
              key={module.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                  <p className="text-sm text-muted">{module.description}</p>
                </div>
                <Link
                  href={`/learn/${module.id}`}
                  className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:-translate-y-0.5"
                >
                  Open
                </Link>
              </div>
              <div className="mt-4 space-y-2">
                {moduleLessons.slice(0, 3).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${module.id}/${lesson.slug}`}
                    className="block rounded-lg border border-border bg-surface px-3 py-2 text-sm hover:border-blue-500 hover:text-blue-700"
                  >
                    {lesson.title} · {lesson.level}
                  </Link>
                ))}
                <p className="text-xs text-muted">
                  {moduleLessons.length} lessons · {module.level}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
