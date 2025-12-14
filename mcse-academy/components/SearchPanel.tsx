"use client";

import MiniSearch from "minisearch";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/lib/db";

type SearchDoc = {
  id: string;
  type: string;
  title: string;
  summary: string;
  href?: string;
};

type Props = {
  docs: SearchDoc[];
};

export function SearchPanel({ docs }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [index, setIndex] = useState<MiniSearch<SearchDoc> | null>(null);

  useEffect(() => {
    const build = async () => {
      const mini = new MiniSearch<SearchDoc>({
        fields: ["title", "summary", "type"],
        storeFields: ["title", "summary", "type", "href", "id"],
      });
      mini.addAll(docs);
      const artifacts = await db.artifacts.toArray();
      mini.addAll(
        artifacts.map((a) => ({
          id: a.id,
          type: "artifacts",
          title: a.title,
          summary: a.content.slice(0, 140),
          href: undefined,
        }))
      );
      setIndex(mini);
    };
    build();
  }, [docs]);

  useEffect(() => {
    if (!index) return;
    if (!query) {
      setResults(docs.slice(0, 10));
      return;
    }
    setResults(index.search(query).map((hit) => hit as unknown as SearchDoc));
  }, [query, index, docs]);

  const grouped = useMemo(() => {
    return results.reduce<Record<string, SearchDoc[]>>((acc, doc) => {
      acc[doc.type] = acc[doc.type] || [];
      acc[doc.type].push(doc);
      return acc;
    }, {});
  }, [results]);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Search</div>
        <span className="text-xs text-muted">Press / to focus</span>
      </div>
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search lessons, glossary, patterns, failures"
        className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-sm"
      />
      <div className="mt-4 space-y-3">
        {Object.entries(grouped).map(([type, docs]) => (
          <div key={type} className="rounded-lg border border-border bg-surface p-3">
            <div className="text-xs uppercase tracking-wide text-muted">{type}</div>
            <ul className="mt-2 space-y-2 text-sm">
              {docs.slice(0, 5).map((doc) => (
                <li key={doc.id} className="rounded px-2 py-1 hover:bg-card">
                  {doc.href ? (
                    <a className="text-blue-600" href={doc.href}>
                      {doc.title}
                    </a>
                  ) : (
                    <span className="font-semibold">{doc.title}</span>
                  )}
                  <p className="text-xs text-muted">{doc.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
