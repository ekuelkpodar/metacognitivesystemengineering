import { EvaluationBuilder } from "@/components/EvaluationBuilder";
import { FailureLab } from "@/components/FailureLab";
import { Simulator } from "@/components/Simulator";

export default function LabsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Labs</p>
        <h1 className="text-3xl font-semibold">Interactive Labs</h1>
        <p className="text-sm text-muted">
          Tune control loops, explore failure mitigations, and build evaluation harnesses locally.
        </p>
      </div>
      <Simulator />
      <FailureLab />
      <EvaluationBuilder />
    </div>
  );
}
