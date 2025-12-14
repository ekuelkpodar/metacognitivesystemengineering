import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { SearchPanel } from "@/components/SearchPanel";
import { buildKnowledgeGraphData, buildSearchDocs } from "@/lib/knowledge";

export default async function SearchPage() {
  const docs = await buildSearchDocs();
  const graph = await buildKnowledgeGraphData();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Search & Graph
        </p>
        <h1 className="text-3xl font-semibold">Search the MCSE Academy</h1>
        <p className="text-sm text-muted">
          Works offline with the bundled content and connects lessons, patterns, and failures.
        </p>
      </div>
      <SearchPanel docs={docs} />
      <KnowledgeGraph nodes={graph.nodes} edges={graph.edges} />
    </div>
  );
}
