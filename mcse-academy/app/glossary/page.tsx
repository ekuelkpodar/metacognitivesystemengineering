import { glossary } from "@/content/glossary";

export default function GlossaryPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Glossary
        </p>
        <h1 className="text-3xl font-semibold">MCSE Glossary</h1>
        <p className="text-sm text-muted">
          40+ terms with definitions, examples, and pitfalls.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {glossary.map((term) => (
          <div
            key={term.term}
            className="rounded-xl border border-border bg-card p-4 text-sm shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold">{term.term}</div>
              <span className="text-xs text-muted">
                {term.synonyms.join(", ")}
              </span>
            </div>
            <p className="text-muted">{term.definition}</p>
            <p className="text-xs text-muted">Examples: {term.examples.join(", ")}</p>
            <p className="text-xs text-amber-500">
              Pitfalls: {term.pitfalls.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
