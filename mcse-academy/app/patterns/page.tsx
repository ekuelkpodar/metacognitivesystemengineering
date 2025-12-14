import { patterns } from "@/content/patterns";

export default function PatternsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Patterns
        </p>
        <h1 className="text-3xl font-semibold">
          MCSE Design Patterns & Anti-Patterns
        </h1>
        <p className="text-sm text-muted">
          Twelve patterns mapped to failure modes with consequences and notes.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {patterns.map((pattern) => (
          <div
            key={pattern.name}
            className="rounded-xl border border-border bg-card p-4 text-sm shadow-sm"
          >
            <div className="font-semibold">{pattern.name}</div>
            <p className="text-muted">{pattern.intent}</p>
            <p className="text-xs text-muted">When: {pattern.whenToUse}</p>
            <p className="text-xs text-muted">
              Consequences: {pattern.consequences}
            </p>
            <p className="text-xs text-muted">
              Implementation: {pattern.implementationNotes}
            </p>
            <p className="text-xs text-amber-500">
              Avoid: {pattern.antiPatterns.join(", ")}
            </p>
            <p className="text-xs text-emerald-500">
              Related failures: {pattern.relatedFailures.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
