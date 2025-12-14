import { describe, expect, it } from "vitest";
import { getLessonsMeta, getModules } from "@/lib/content";

describe("content loader", () => {
  it("loads modules and lessons with metadata", async () => {
    const modules = await getModules();
    expect(modules.length).toBeGreaterThanOrEqual(8);

    const lessons = await getLessonsMeta();
    expect(lessons.length).toBeGreaterThan(10);
    const sample = lessons[0];
    expect(sample.title).toBeTruthy();
    expect(sample.module).toBeTruthy();
  });
});
