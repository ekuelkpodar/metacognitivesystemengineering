"use client";

import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { StudioProject } from "@/lib/types";
import { db } from "@/lib/db";
import { useProgressStore } from "@/lib/state";
import { MermaidBlock } from "./MermaidBlock";

const components = [
  "Perception",
  "Representation",
  "Planner",
  "Executor",
  "Tools",
  "Memory",
  "Meta-Monitor",
  "Meta-Critic",
  "Calibration",
  "Safety Engine",
  "Observability",
  "Postmortem",
];

export function StudioBuilder() {
  const [name, setName] = useState("New MCSE Project");
  const [domain, setDomain] = useState("AI agent");
  const [goals, setGoals] = useState("Accurate, safe, calibrated responses.");
  const [constraints, setConstraints] = useState("No PII exfil; risk<0.3");
  const [selected, setSelected] = useState<string[]>(components.slice(0, 8));
  const addProject = useProgressStore((s) => s.addProject);

  const mermaidDiagram = useMemo(() => {
    const nodes = selected.map((c) => c.replace(/[^a-zA-Z0-9]/g, ""));
    const edges = nodes
      .map((n, idx) => (idx < nodes.length - 1 ? `${nodes[idx]}-->${nodes[idx + 1]}` : ""))
      .filter(Boolean)
      .join("\n  ");
    const nodeDefs = selected
      .map((c) => `${c.replace(/[^a-zA-Z0-9]/g, "")}["${c}"]`)
      .join("\n  ");
    return `graph LR\n  ${nodeDefs}\n  ${edges}\n  MetaMonitor-->MetaCritic\n  MetaCritic-->Calibration\n  Calibration-->Planner`;
  }, [selected]);

  const controlDiagram =
    "flowchart LR\nObservation-->Plan\nPlan-->Act\nAct-->Monitor\nMonitor-->Critic\nCritic-->Plan";

  const docs = useMemo(
    () => ({
      requirements: `## Project: ${name}\n- Domain: ${domain}\n- Goals: ${goals}\n- Constraints: ${constraints}\n- Components: ${selected.join(", ")}`,
      policy: `policies:\n  - name: safe_tools\n    condition: "risk<0.3 && confidence>0.4"\n    action: allow`,
      telemetry: `{\n  "event": "plan_proposed",\n  "policyVersion": "v1",\n  "confidence": 0.7,\n  "risk": 0.1\n}`,
    }),
    [name, domain, goals, constraints, selected]
  );

  const save = async () => {
    const project: StudioProject = {
      id: uuidv4(),
      name,
      domain,
      goals,
      constraints,
      components: selected,
      generatedDiagrams: {
        architecture: mermaidDiagram,
        control: controlDiagram,
      },
      generatedDocs: docs,
      createdAt: Date.now(),
    };
    addProject(project);
    await db.projects.add(project);
  };

  const toggleComponent = (comp: string) => {
    setSelected((prev) =>
      prev.includes(comp) ? prev.filter((c) => c !== comp) : [...prev, comp]
    );
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">MCSE Studio</div>
          <p className="text-xs text-muted">
            Assemble components, generate diagrams and docs, save locally.
          </p>
        </div>
        <button
          onClick={save}
          className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white hover:-translate-y-0.5"
        >
          Save project
        </button>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface p-2 text-sm"
          />
          <label className="text-xs font-semibold text-muted">Domain</label>
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface p-2 text-sm"
          />
          <label className="text-xs font-semibold text-muted">Goals</label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface p-2 text-sm"
            rows={3}
          />
          <label className="text-xs font-semibold text-muted">Constraints</label>
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface p-2 text-sm"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-semibold text-muted">
            Components (select)
          </div>
          <div className="grid grid-cols-2 gap-2">
            {components.map((comp) => (
              <label
                key={comp}
                className={`cursor-pointer rounded-lg border px-2 py-1 text-sm ${
                  selected.includes(comp)
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-border"
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selected.includes(comp)}
                  onChange={() => toggleComponent(comp)}
                />
                {comp}
              </label>
            ))}
          </div>
          <div className="text-xs text-muted">
            Auto-generated artifacts reflect selected components.
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <MermaidBlock chart={mermaidDiagram} caption="Architecture diagram" />
        <MermaidBlock
          chart={controlDiagram}
          caption="Control loop"
        />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        <div>
          <div className="text-xs font-semibold text-muted">Requirements</div>
          <pre className="mt-1 h-48 overflow-auto rounded-lg border border-border bg-surface p-3 text-xs whitespace-pre-wrap">
            {docs.requirements}
          </pre>
        </div>
        <div>
          <div className="text-xs font-semibold text-muted">Policy</div>
          <pre className="mt-1 h-48 overflow-auto rounded-lg border border-border bg-surface p-3 text-xs whitespace-pre-wrap">
            {docs.policy}
          </pre>
        </div>
        <div>
          <div className="text-xs font-semibold text-muted">Telemetry</div>
          <pre className="mt-1 h-48 overflow-auto rounded-lg border border-border bg-surface p-3 text-xs whitespace-pre-wrap">
            {docs.telemetry}
          </pre>
        </div>
      </div>
    </div>
  );
}
