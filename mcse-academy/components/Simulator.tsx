"use client";

import { useMemo, useState } from "react";

type ControlState = {
  confidence: number;
  uncertainty: number;
  memoryPolicy: number;
  escalation: number;
  safety: number;
  volatility: number;
};

function simulate(state: ControlState) {
  const baseError = 0.15 - state.confidence * 0.1 + state.uncertainty * 0.1;
  const safetyFactor = 1 - state.safety * 0.4;
  const volatilityPenalty = state.volatility * 0.2;
  const errorRate = Math.max(
    0,
    Math.min(1, baseError * safetyFactor + volatilityPenalty)
  );
  const recoveryTime =
    8 - state.escalation * 4 - state.memoryPolicy * 1 + state.volatility * 2;
  const interventions = Math.round(
    state.escalation * 5 + state.safety * 4 + state.memoryPolicy * 2
  );
  return {
    errorRate: Number(errorRate.toFixed(2)),
    recoveryTime: Math.max(1, Number(recoveryTime.toFixed(1))),
    interventions,
  };
}

export function Simulator() {
  const [controls, setControls] = useState<ControlState>({
    confidence: 0.5,
    uncertainty: 0.5,
    memoryPolicy: 0.5,
    escalation: 0.5,
    safety: 0.5,
    volatility: 0.3,
  });

  const result = useMemo(() => simulate(controls), [controls]);

  const sliders: { key: keyof ControlState; label: string; hint: string }[] = [
    { key: "confidence", label: "Confidence threshold", hint: "Higher reduces risky outputs" },
    { key: "uncertainty", label: "Uncertainty estimation quality", hint: "Better estimation reduces overconfidence" },
    { key: "memoryPolicy", label: "Memory write strictness", hint: "Higher means stricter writes" },
    { key: "escalation", label: "Escalation aggressiveness", hint: "Higher means more human-in-loop" },
    { key: "safety", label: "Safety policy strictness", hint: "Higher blocks more risky actions" },
    { key: "volatility", label: "Environment volatility", hint: "Higher makes system harder to stabilize" },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Meta-Cognitive Loop Simulator</div>
          <p className="text-xs text-muted">Tune thresholds and see predicted behavior.</p>
        </div>
      </div>
      <div className="grid gap-3 pt-4 md:grid-cols-2">
        {sliders.map((slider) => (
          <div key={slider.key} className="space-y-1 rounded-xl border border-border bg-surface p-3">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{slider.label}</span>
              <span className="text-xs text-muted">
                {Math.round(controls[slider.key] * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={controls[slider.key]}
              onChange={(e) =>
                setControls((c) => ({
                  ...c,
                  [slider.key]: Number(e.target.value),
                }))
              }
              aria-label={slider.label}
              className="w-full"
            />
            <p className="text-xs text-muted">{slider.hint}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Error rate</div>
          <div className="text-2xl font-semibold">{result.errorRate * 100}%</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Recovery time (s)</div>
          <div className="text-2xl font-semibold">{result.recoveryTime}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-3">
          <div className="text-xs uppercase text-muted">Interventions</div>
          <div className="text-2xl font-semibold">{result.interventions}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-muted">
        Interpretation: error rate falls with stricter safety/calibration; recovery time improves with faster escalation; volatility can overwhelm weak settings.
      </div>
    </div>
  );
}
