import Link from "next/link";

const roadmap = [
  {
    title: "Weeks 1-2",
    items: [
      "Foundations + control loops",
      "Meta-cog signals + telemetry schemas",
      "Baseline simulator runs",
    ],
  },
  {
    title: "Weeks 3-4",
    items: [
      "Architecture studio projects",
      "Safety policy drafts + ADRs",
      "Evaluation harness v1 + regression suite",
    ],
  },
  {
    title: "Weeks 5-6",
      items: [
      "Red-team failure lab",
      "Postmortems + policy rollout",
      "Production-ready offline bundle",
    ],
  },
];

export function RoadmapCard() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            6-week MCSE build path
          </p>
          <h2 className="text-xl font-semibold">Curriculum -> Labs -> Shipping</h2>
          <p className="text-sm text-muted">
            Follow the structured cadence or jump straight into labs and studio.
          </p>
        </div>
        <Link href="/progress" className="text-blue-700 hover:underline">
          Track progress ->
        </Link>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {roadmap.map((phase) => (
          <div
            key={phase.title}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <div className="text-sm font-semibold">{phase.title}</div>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-foreground/90">
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
