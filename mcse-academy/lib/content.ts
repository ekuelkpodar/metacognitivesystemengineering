import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { LessonFrontmatter, LessonMeta, ModuleMeta } from "./types";
import { mdxComponents } from "./mdx-components";

const lessonRoot = path.join(process.cwd(), "content", "lessons");

export async function getModules(): Promise<ModuleMeta[]> {
  const moduleDirs = fs
    .readdirSync(lessonRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const modules: ModuleMeta[] = moduleDirs.map((dir) => {
    const moduleMetaPath = path.join(lessonRoot, dir, "module.json");
    const raw = fs.readFileSync(moduleMetaPath, "utf-8");
    return JSON.parse(raw) as ModuleMeta;
  });

  return modules.sort((a, b) => a.order - b.order);
}

export async function getLessonsMeta(): Promise<LessonMeta[]> {
  const modules = await getModules();
  const lessons: LessonMeta[] = [];

  modules.forEach((module) => {
    const moduleDir = path.join(lessonRoot, module.id);
    const files = fs
      .readdirSync(moduleDir)
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

    files.forEach((file) => {
      const filePath = path.join(moduleDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      const fm = data as LessonFrontmatter;
      lessons.push({
        ...fm,
        slug: file.replace(/\.mdx?$/, ""),
      });
    });
  });

  return lessons.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getLesson(moduleId: string, slug: string) {
  const lessonPath = path.join(lessonRoot, moduleId, `${slug}.mdx`);
  const file = fs.readFileSync(lessonPath, "utf-8");
  const { content, data } = matter(file);
  const frontmatter = data as LessonFrontmatter;

  const mdx = await compileMDX<LessonFrontmatter>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });

  return { frontmatter, content: mdx.content };
}

export async function getLessonSlugsByModule(moduleId: string) {
  const moduleDir = path.join(lessonRoot, moduleId);
  const files = fs
    .readdirSync(moduleDir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
  return files.map((file) => file.replace(/\.mdx?$/, ""));
}
