import Link from "next/link";
import { notFound } from "next/navigation";
import { getLessonsMeta, getModules } from "@/lib/content";

type Props = {
  params: { module: string };
};

export default async function ModulePage({ params }: Props) {
  const { module } = params;
  const modules = await getModules();
  const moduleMeta = modules.find((m) => m.id === module);
  if (!moduleMeta) return notFound();

  const lessons = (await getLessonsMeta()).filter(
    (lesson) => lesson.module === module
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Module
        </p>
        <h1 className="text-3xl font-semibold">{moduleMeta.title}</h1>
        <p className="text-sm text-muted">{moduleMeta.description}</p>
      </div>
      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/learn/${module}/${lesson.slug}`}
            className="rounded-xl border border-border bg-card px-4 py-3 transition hover:border-blue-500 hover:text-blue-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{lesson.title}</div>
                <p className="text-sm text-muted">{lesson.summary}</p>
              </div>
              <div className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                {lesson.level}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted">
              Estimated {lesson.estimatedTime} · {lesson.learningObjectives.length}{" "}
              objectives
            </div>
            <div className="mt-1 text-[11px] text-muted">
              Prerequisites: {lesson.prerequisites.length ? lesson.prerequisites.join(", ") : "None"}
            </div>
            <div className="text-[11px] text-muted">Tags: {lesson.tags.join(", ")}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const modules = await getModules();
  return modules.map((module) => ({ module: module.id }));
}
