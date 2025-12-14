import { db } from "./db";
import { useProgressStore } from "./state";

export async function exportProgress() {
  const state = useProgressStore.getState();
  const artifacts = await db.artifacts.toArray();
  const projects = await db.projects.toArray();
  return {
    progress: state,
    artifacts,
    projects,
    exportedAt: new Date().toISOString(),
  };
}

export async function importProgress(payload: any) {
  if (!payload || !payload.progress) return;
  const store = useProgressStore.getState();
  // Replace progress state
  useProgressStore.setState({
    ...payload.progress,
  });

  if (payload.artifacts) {
    await db.artifacts.clear();
    await db.artifacts.bulkAdd(payload.artifacts);
  }
  if (payload.projects) {
    await db.projects.clear();
    await db.projects.bulkAdd(payload.projects);
  }
}
