import { notFound } from "next/navigation";
import { getLesson, getLessonSlugsByModule, getModules } from "@/lib/content";
import { LessonControls } from "@/components/LessonControls";
import { LessonContent } from "@/components/LessonContent";

type Props = {
  params: { module: string; lesson: string };
};

export default async function LessonPage({ params }: Props) {
  const { module, lesson } = params;
  let lessonData: Awaited<ReturnType<typeof getLesson>> | null = null;
  try {
    lessonData = await getLesson(module, lesson);
  } catch {
    return notFound();
  }
  if (!lessonData) return notFound();
  const { content, frontmatter } = lessonData;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <LessonContent frontmatter={frontmatter}>{content}</LessonContent>
      <div className="space-y-4">
        <LessonControls
          lessonId={frontmatter.id}
          summary={frontmatter.summary}
        />
        <div className="rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
          <div className="font-semibold">At a glance</div>
          <ul className="mt-2 space-y-1 text-muted">
            <li>Tags: {frontmatter.tags.join(", ")}</li>
            <li>Prerequisites: {frontmatter.prerequisites.join(", ") || "None"}</li>
            <li>Glossary: {frontmatter.glossaryTerms.join(", ")}</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
          <div className="font-semibold">References</div>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
            {frontmatter.references.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const modules = await getModules();
  const params: { module: string; lesson: string }[] = [];
  for (const module of modules) {
    const slugs = await getLessonSlugsByModule(module.id);
    slugs.forEach((lesson) => params.push({ module: module.id, lesson }));
  }
  return params;
}
