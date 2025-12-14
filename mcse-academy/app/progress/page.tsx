import { ArtifactLibrary } from "@/components/ArtifactLibrary";
import { ProgressOverview } from "@/components/ProgressOverview";

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Progress
        </p>
        <h1 className="text-3xl font-semibold">Your MCSE Progress</h1>
        <p className="text-sm text-muted">
          Tracks locally—no login—across lessons, artifacts, and studio projects.
        </p>
      </div>
      <ProgressOverview />
      <ArtifactLibrary />
    </div>
  );
}
