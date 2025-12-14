import Link from "next/link";
import { RoadmapCard } from "@/components/RoadmapCard";
import { QuickMetrics } from "@/components/QuickMetrics";
import { getLessonsMeta, getModules } from "@/lib/content";

export default async function Home() {
  const modules = await getModules();
  const lessons = await getLessonsMeta();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 p-8 text-white shadow-lg ring-1 ring-white/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-200">
              Meta-Cognitive Systems Engineering
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              MCSE Academy
            </h1>
            <p className="text-lg text-blue-100">
              Learn, simulate, and ship meta-cognitive architectures. Build
              requirements, policies, telemetry, and evaluation harnesses
              through interactive labs and a studio that exports ready-to-use
              artifacts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-blue-900 shadow-lg shadow-blue-400/20 transition hover:-translate-y-0.5 hover:shadow-blue-500/30"
              >
                Start Learning
              </Link>
              <Link
                href="/studio"
                className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Open Studio
              </Link>
              <Link
                href="/labs"
                className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Run Labs
              </Link>
            </div>
          </div>
          <QuickMetrics />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Curriculum</h2>
          <p className="text-sm text-muted">
            {modules.length} modules, {lessons.length} lessons. Two fully
            written lessons per module to dive deep immediately.
          </p>
          <div className="mt-4 space-y-2">
            {modules.slice(0, 4).map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm"
              >
                <span className="font-medium">{module.title}</span>
                <Link
                  href={`/learn/${module.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
            ))}
            <Link href="/learn" className="text-blue-700 hover:underline">
              View all modules
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Studio</h2>
          <p className="text-sm text-muted">
            Assemble architectures, generate diagrams, and export policy +
            telemetry files locally—no login required.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/90">
            <li>Drag-and-structure meta-cognitive components</li>
            <li>Generate mermaid diagrams + spec skeletons</li>
            <li>Save projects locally, export/import as JSON</li>
          </ul>
          <Link
            href="/studio"
            className="mt-4 inline-block text-blue-700 hover:underline"
          >
            Open the MCSE Studio &rarr;
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Labs</h2>
          <p className="text-sm text-muted">
            Simulators for control loops, failure modes, and evaluation harness
            builders. Tweak thresholds and see behavior instantly.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-foreground/90">
            <li>Meta-cognitive loop simulator</li>
            <li>Failure mode mitigation lab</li>
            <li>Evaluation harness builder + exports</li>
          </ul>
          <Link
            href="/labs"
            className="mt-4 inline-block text-blue-700 hover:underline"
          >
            Launch labs &rarr;
          </Link>
        </div>
      </section>

      <RoadmapCard />
    </div>
  );
}
