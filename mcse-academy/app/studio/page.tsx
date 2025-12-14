import { ProjectLibrary } from "@/components/ProjectLibrary";
import { StudioBuilder } from "@/components/StudioBuilder";

export default function StudioPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">
          Studio
        </p>
        <h1 className="text-3xl font-semibold">MCSE Architecture Studio</h1>
        <p className="text-sm text-muted">
          Assemble components, generate diagrams and artifacts, and save projects locally.
        </p>
      </div>
      <StudioBuilder />
      <ProjectLibrary />
    </div>
  );
}
