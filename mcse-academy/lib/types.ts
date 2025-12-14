export type LessonSection =
  | { type: "markdown"; content: string }
  | { type: "diagram"; title: string; mermaid: string }
  | { type: "quiz"; prompt: string; options: string[]; answer: number; explanation: string }
  | { type: "exercise"; prompt: string; rubric: string }
  | { type: "artifact"; kind: ArtifactKind; starter: string; description: string }
  | { type: "simulator"; id: string; description: string };

export type LessonFrontmatter = {
  id: string;
  title: string;
  module: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  prerequisites: string[];
  tags: string[];
  estimatedTime: string;
  learningObjectives: string[];
  glossaryTerms: string[];
  references: string[];
};

export type LessonMeta = LessonFrontmatter & {
  slug: string;
};

export type ModuleMeta = {
  id: string;
  title: string;
  description: string;
  order: number;
  level: "Beginner" | "Intermediate" | "Advanced";
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  synonyms: string[];
  relatedLessons: string[];
  examples: string[];
  pitfalls: string[];
};

export type Pattern = {
  name: string;
  intent: string;
  whenToUse: string;
  consequences: string;
  implementationNotes: string;
  antiPatterns: string[];
  relatedFailures: string[];
};

export type FailureMode = {
  name: string;
  symptoms: string[];
  detectionSignals: string[];
  tests: string[];
  mitigations: string[];
  fallbackBehavior: string;
  severity: "Low" | "Medium" | "High";
  likelihood: "Unlikely" | "Possible" | "Likely";
};

export type UserProgress = {
  completedLessons: string[];
  quizScores: Record<string, number>;
  notes: Record<string, string>;
  savedArtifacts: ArtifactRecord[];
  studioProjects: StudioProject[];
  lastOpened?: string;
};

export type ArtifactKind =
  | "requirements"
  | "adr"
  | "policy"
  | "telemetry"
  | "evaluation"
  | "studio";

export type ArtifactRecord = {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  lessonId?: string;
  createdAt: number;
};

export type StudioProject = {
  id: string;
  name: string;
  domain: string;
  goals: string;
  constraints: string;
  components: string[];
  generatedDiagrams: { architecture: string; control: string };
  generatedDocs: { requirements: string; policy: string; telemetry: string };
  createdAt: number;
};
