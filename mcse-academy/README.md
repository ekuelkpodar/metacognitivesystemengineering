# MCSE Academy

Local-first web app for learning and practicing Meta-Cognitive Systems Engineering (MCSE). Ships structured curriculum, interactive labs, MCSE Studio for architecture generation, offline search, and knowledge graph. No login required—state is stored in localStorage + IndexedDB with export/import.

## Quickstart

```bash
npm install
npm run dev   # http://localhost:3000
```

### Testing
```bash
npm run test      # vitest unit tests
npm run test:e2e  # playwright (placeholder config)
```

## Key Features
- **Curriculum:** 8 modules, 40 lessons (2+ fully written per module) in MDX with quizzes, exercises, artifacts, and failure-mode sections.
- **Labs:** Meta-cognitive loop simulator, Failure Mode Lab, Evaluation Harness Builder.
- **Studio:** Assemble MCSE architectures, generate mermaid diagrams + policy/telemetry/requirements docs, save to IndexedDB.
- **Artifacts:** Monaco-powered editors for requirements, ADRs, policies, telemetry schemas, eval plans. Saved locally with export.
- **Search + Knowledge Graph:** Offline search across lessons/glossary/patterns/failures; graph shows relationships.
- **Progress:** Local tracking, notes, quiz scores, export/import JSON.
- **PWA/Offline:** Service worker caches shell; content bundled; works without auth.

## Content Model
- Lessons live in `content/lessons/<module>/lesson-name.mdx`
  - Frontmatter fields: `id, title, module, level, summary, prerequisites[], tags[], estimatedTime, learningObjectives[], glossaryTerms[], references[]`
  - Body uses custom MDX components: `Callout`, `MermaidBlock`, `QuizBlock`, `ExerciseBlock`, `ArtifactBlock`, `Checklist`.
- Module metadata: `content/lessons/<module>/module.json` with `id, title, description, order, level`.
- Glossary/Patterns/Failures: `content/glossary.ts`, `content/patterns.ts`, `content/failure-modes.ts`.

### Adding Lessons
1. Create `content/lessons/<module>/<slug>.mdx` with required frontmatter.
2. Include sections: concept, diagram, quiz, exercise, artifact, failure notes, references.
3. The app auto-discovers lessons; no code changes needed.

## Architecture Notes
- Stack: Next.js (App Router) + TypeScript + Tailwind v4 + MDX + Zustand + Dexie + Mermaid + Monaco.
- Local-first storage: progress via Zustand+localStorage, artifacts/projects via IndexedDB (Dexie).
- PWA: simple service worker in `public/service-worker.js`; registration in `PWARegister`.

## Project Structure
- `app/` routes: `learn`, `labs`, `studio`, `glossary`, `patterns`, `case-studies`, `progress`, `search`.
- `components/`: UI blocks, labs, studio, knowledge graph, MDX components.
- `lib/`: content loaders, types, knowledge graph builder, persistence helpers.
- `content/`: lessons, glossary, patterns, failure modes.
- `__tests__/`: vitest coverage for loaders.

## Offline Export/Import
- Use Progress page to export all progress/artifacts/projects as JSON.
- Import JSON to restore on another device; artifacts/projects are rewritten into IndexedDB.

## Adding More Labs/Modules
- Create new MDX lessons following schema.
- Extend patterns/failures glossary to link into knowledge graph.
- Add new labs by composing client components under `components/` and wiring to `app/labs/page.tsx`.
