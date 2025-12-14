import { failureModes } from "@/content/failure-modes";
import { glossary } from "@/content/glossary";
import { patterns } from "@/content/patterns";
import { getLessonsMeta } from "./content";

export async function buildKnowledgeGraphData() {
  const lessons = await getLessonsMeta();
  const lessonNodes = lessons.map((l) => ({
    id: l.id,
    label: l.title,
    type: "lesson",
    details: l.summary,
  }));
  const patternNodes = patterns.map((p) => ({
    id: `pattern-${p.name}`,
    label: p.name,
    type: "pattern",
    details: p.intent,
  }));
  const failureNodes = failureModes.map((f) => ({
    id: `failure-${f.name}`,
    label: f.name,
    type: "failure",
    details: f.mitigations.join(", "),
  }));
  const glossaryNodes = glossary.map((g) => ({
    id: `term-${g.term}`,
    label: g.term,
    type: "term",
    details: g.definition,
  }));

  const nodes = [...lessonNodes, ...patternNodes, ...failureNodes, ...glossaryNodes];

  const edges: { from: string; to: string }[] = [];
  patterns.forEach((p) => {
    p.relatedFailures.forEach((f) =>
      edges.push({ from: `pattern-${p.name}`, to: `failure-${f}` })
    );
  });
  lessons.forEach((l) => {
    l.tags.forEach((tag) => {
      const pattern = patterns.find((p) => p.name.toLowerCase().includes(tag));
      if (pattern) {
        edges.push({ from: l.id, to: `pattern-${pattern.name}` });
      }
    });
  });
  glossary.forEach((term) => {
    term.relatedLessons.forEach((lessonId) =>
      edges.push({ from: `term-${term.term}`, to: lessonId })
    );
    term.synonyms.forEach((syn) =>
      edges.push({ from: `term-${term.term}`, to: `term-${syn}` })
    );
  });

  return { nodes, edges };
}

export async function buildSearchDocs() {
  const lessons = await getLessonsMeta();
  const lessonDocs = lessons.map((l) => ({
    id: l.id,
    type: "lessons",
    title: l.title,
    summary: l.summary,
    href: `/learn/${l.module}/${l.slug}`,
  }));
  const glossaryDocs = glossary.map((g) => ({
    id: g.term,
    type: "glossary",
    title: g.term,
    summary: g.definition,
  }));
  const patternDocs = patterns.map((p) => ({
    id: `pattern-${p.name}`,
    type: "patterns",
    title: p.name,
    summary: p.intent,
  }));
  const failureDocs = failureModes.map((f) => ({
    id: `failure-${f.name}`,
    type: "failures",
    title: f.name,
    summary: f.symptoms.join(", "),
  }));

  return [...lessonDocs, ...glossaryDocs, ...patternDocs, ...failureDocs];
}
