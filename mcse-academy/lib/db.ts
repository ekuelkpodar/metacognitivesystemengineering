import Dexie, { Table } from "dexie";
import { ArtifactRecord, StudioProject } from "./types";

class MCSEDB extends Dexie {
  artifacts!: Table<ArtifactRecord, string>;
  projects!: Table<StudioProject, string>;

  constructor() {
    super("mcse-academy-db");
    this.version(1).stores({
      artifacts: "id, kind, createdAt",
      projects: "id, name, createdAt",
    });
  }
}

export const db = new MCSEDB();
