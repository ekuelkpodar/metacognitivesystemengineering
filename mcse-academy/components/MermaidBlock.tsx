"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

type Props = {
  chart: string;
  caption?: string;
};

mermaid.initialize({ startOnLoad: false, theme: "dark" });

export function MermaidBlock({ chart, caption }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const render = async () => {
      if (!containerRef.current) return;
      try {
        const { svg } = await mermaid.render(
          `mermaid-${Math.random().toString(36).slice(2)}`,
          chart
        );
        containerRef.current.innerHTML = svg;
        setError(null);
      } catch (err: any) {
        setError(err?.message ?? "Mermaid render error");
      }
    };
    render();
  }, [chart]);

  return (
    <div className="my-6 rounded-xl border border-border bg-surface p-4">
      {error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <div ref={containerRef} className="overflow-auto" />
      )}
      {caption && (
        <div className="mt-2 text-xs uppercase tracking-wide text-muted">
          {caption}
        </div>
      )}
    </div>
  );
}
