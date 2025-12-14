"use client";

import { useState } from "react";
import { failureModes } from "@/content/failure-modes";

export function FailureLab() {
  const [selected, setSelected] = useState<string[]>(["Miscalibration"]);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Failure Mode Lab</div>
          <p className="text-xs text-muted">
            Select failures to generate detection signals, tests, mitigations, and safe red-team prompts.
          </p>
        </div>
      </div>
      <div className="mt-3 grid gap-2 md:grid-cols-3">
        {failureModes.map((mode) => (
          <label
            key={mode.name}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-sm ${
              selected.includes(mode.name)
                ? "border-blue-500 bg-blue-50 text-blue-900"
                : "border-border"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={selected.includes(mode.name)}
              onChange={() => toggle(mode.name)}
            />
            {mode.name}
          </label>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {failureModes
          .filter((m) => selected.includes(m.name))
          .map((mode) => (
            <div
              key={mode.name}
              className="rounded-xl border border-border bg-surface p-3 text-sm"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{mode.name}</div>
                <span className="text-xs text-muted">
                  {mode.severity} · {mode.likelihood}
                </span>
              </div>
              <p className="text-muted">Symptoms: {mode.symptoms.join(", ")}</p>
              <p className="text-muted">
                Detection: {mode.detectionSignals.join("; ")}
              </p>
              <p className="text-muted">Tests: {mode.tests.join("; ")}</p>
              <p className="text-muted">
                Mitigations: {mode.mitigations.join("; ")}
              </p>
              <p className="text-muted">Fallback: {mode.fallbackBehavior}</p>
              <p className="text-xs text-emerald-600">
                Red-team prompt (safe): Simulate {mode.name.toLowerCase()} in a
                dry-run sandbox with logging only.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
