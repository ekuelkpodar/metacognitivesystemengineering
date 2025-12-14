"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const preferred =
      (window.localStorage.getItem("mcse-theme") as "light" | "dark" | null) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setMode(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    window.localStorage.setItem("mcse-theme", mode);
  }, [mode]);

  return (
    <button
      aria-label="Toggle theme"
      className="rounded-full border border-border bg-card px-3 py-2 text-sm shadow-md transition hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-lg"
      onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
    >
      {mode === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
