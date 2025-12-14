"use client";

import { useMemo, useState } from "react";

type Rule = { metric: string; threshold: number; severity: "low" | "medium" | "high" };

export function EvaluationBuilder() {
  const [rules, setRules] = useState<Rule[]>([
    { metric: "ece", threshold: 0.05, severity: "high" },
    { metric: "jailbreak_rate", threshold: 0.01, severity: "high" },
  ]);
  const [planName, setPlanName] = useState("eval-plan");

  const jsonPlan = useMemo(
    () =>
      JSON.stringify(
        {
          name: planName,
          offline: ["golden_set", "adversarial_prompts", "tool_misuse"],
          online: rules,
        },
        null,
        2
      ),
    [rules, planName]
  );

  const markdownReport = useMemo(
    () =>
      `# Evaluation Plan: ${planName}\n\n## Offline\n- Golden set\n- Adversarial prompts\n- Tool misuse\n\n## Online\n${rules.map((r) => `- ${r.metric} <= ${r.threshold} (${r.severity})`).join("\n")}\n`,
    [rules, planName]
  );

  const addRule = () => {
    setRules((r) => [...r, { metric: "new_metric", threshold: 0.1, severity: "medium" }]);
  };

  const updateRule = (idx: number, patch: Partial<Rule>) => {
    setRules((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  };

  const download = (content: string, name: string) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Evaluation Harness Builder</div>
          <p className="text-xs text-muted">
            Define offline/online checks and export JSON + Markdown.
          </p>
        </div>
        <button
          onClick={() => download(jsonPlan, `${planName}.json`)}
          className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:-translate-y-0.5"
        >
          Export JSON
        </button>
      </div>
      <div className="mt-3 space-y-2">
        <label className="text-xs font-semibold text-muted">Plan name</label>
        <input
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface p-2 text-sm"
        />
      </div>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Online rules</div>
          <button
            onClick={addRule}
            className="rounded-full border border-border px-3 py-1 text-xs hover:border-blue-500"
          >
            Add rule
          </button>
        </div>
        {rules.map((rule, idx) => (
          <div
            key={`${rule.metric}-${idx}`}
            className="grid gap-2 rounded-lg border border-border bg-surface p-3 md:grid-cols-3"
          >
            <input
              value={rule.metric}
              onChange={(e) => updateRule(idx, { metric: e.target.value })}
              className="rounded border border-border bg-card p-2 text-sm"
              aria-label="Metric name"
            />
            <input
              type="number"
              value={rule.threshold}
              step="0.01"
              onChange={(e) =>
                updateRule(idx, { threshold: Number(e.target.value) })
              }
              className="rounded border border-border bg-card p-2 text-sm"
              aria-label="Threshold"
            />
            <select
              value={rule.severity}
              onChange={(e) =>
                updateRule(idx, { severity: e.target.value as Rule["severity"] })
              }
              className="rounded border border-border bg-card p-2 text-sm"
              aria-label="Severity"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <div className="text-xs font-semibold text-muted">JSON plan</div>
          <pre className="mt-1 max-h-64 overflow-auto rounded-lg border border-border bg-surface p-3 text-xs">
            {jsonPlan}
          </pre>
        </div>
        <div>
          <div className="text-xs font-semibold text-muted">Markdown report</div>
          <pre className="mt-1 max-h-64 overflow-auto rounded-lg border border-border bg-surface p-3 text-xs whitespace-pre-wrap">
            {markdownReport}
          </pre>
          <button
            onClick={() => download(markdownReport, `${planName}.md`)}
            className="mt-2 rounded-full border border-border px-3 py-1 text-xs hover:border-blue-500"
          >
            Export Markdown
          </button>
        </div>
      </div>
    </div>
  );
}
