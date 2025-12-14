"use client";

import { useMemo, useState } from "react";

type Node = { id: string; label: string; type: string; details?: string };
type Edge = { from: string; to: string };

type Props = {
  nodes: Node[];
  edges: Edge[];
};

export function KnowledgeGraph({ nodes, edges }: Props) {
  const [selected, setSelected] = useState<Node | null>(null);

  const layout = useMemo(() => {
    const radius = 160;
    return nodes.reduce<Record<string, { x: number; y: number }>>(
      (acc, node, idx) => {
        const angle = (idx / nodes.length) * Math.PI * 2;
        acc[node.id] = {
          x: radius * Math.cos(angle) + radius + 20,
          y: radius * Math.sin(angle) + radius + 20,
        };
        return acc;
      },
      {}
    );
  }, [nodes]);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="text-sm font-semibold">Knowledge Graph</div>
      <p className="text-xs text-muted">
        Offline view connecting lessons, patterns, and failure modes. Click to inspect.
      </p>
      <svg width="100%" height="360" className="mt-2 rounded-lg bg-surface">
        {edges.map((edge) => {
          const from = layout[edge.from];
          const to = layout[edge.to];
          if (!from || !to) return null;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="rgba(148,163,184,0.4)"
              strokeWidth={1}
            />
          );
        })}
        {nodes.map((node) => {
          const pos = layout[node.id];
          const color =
            node.type === "lesson"
              ? "#22d3ee"
              : node.type === "pattern"
                ? "#a855f7"
                : "#f97316";
          return (
            <g
              key={node.id}
              onClick={() => setSelected(node)}
              className="cursor-pointer"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={12}
                fill={color}
                opacity={0.9}
              />
              <text
                x={pos.x + 14}
                y={pos.y + 4}
                fontSize="10"
                fill="#cbd5e1"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      {selected && (
        <div className="mt-3 rounded-lg border border-border bg-surface p-3 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{selected.label}</div>
              <p className="text-xs text-muted">{selected.type}</p>
            </div>
            <button
              className="text-xs text-blue-600"
              onClick={() => setSelected(null)}
            >
              close
            </button>
          </div>
          <p className="text-muted text-sm">{selected.details}</p>
        </div>
      )}
    </div>
  );
}
