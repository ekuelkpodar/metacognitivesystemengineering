const metrics = [
  { label: "Modules", value: "8", description: "Foundations to case studies" },
  { label: "Labs", value: "3", description: "Simulator, failures, harness" },
  { label: "Artifacts", value: "5+", description: "Policy, ADR, telemetry" },
];

export function QuickMetrics() {
  return (
    <div className="grid w-full max-w-sm gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
        >
          <div className="text-sm uppercase tracking-wide text-blue-100/80">
            {metric.label}
          </div>
          <div className="text-2xl font-semibold">{metric.value}</div>
          <p className="text-xs text-blue-100/80">{metric.description}</p>
        </div>
      ))}
    </div>
  );
}
