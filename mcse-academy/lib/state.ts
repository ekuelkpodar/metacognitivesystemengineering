"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ArtifactRecord, StudioProject, UserProgress } from "./types";

type ProgressStore = UserProgress & {
  markLessonComplete: (id: string) => void;
  saveQuizScore: (id: string, score: number) => void;
  saveNote: (id: string, note: string) => void;
  addArtifact: (artifact: ArtifactRecord) => void;
  addProject: (project: StudioProject) => void;
  deleteArtifact: (id: string) => void;
};

const initialState: UserProgress = {
  completedLessons: [],
  quizScores: {},
  notes: {},
  savedArtifacts: [],
  studioProjects: [],
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      ...initialState,
      markLessonComplete: (id) =>
        set((state) => ({
          completedLessons: Array.from(new Set([...state.completedLessons, id])),
        })),
      saveQuizScore: (id, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [id]: score },
        })),
      saveNote: (id, note) =>
        set((state) => ({ notes: { ...state.notes, [id]: note } })),
      addArtifact: (artifact) =>
        set((state) => ({
          savedArtifacts: [...state.savedArtifacts, artifact],
        })),
      deleteArtifact: (id) =>
        set((state) => ({
          savedArtifacts: state.savedArtifacts.filter((a) => a.id !== id),
        })),
      addProject: (project) =>
        set((state) => ({
          studioProjects: [...state.studioProjects, project],
        })),
    }),
    {
      name: "mcse-progress",
    }
  )
);
