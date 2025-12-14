"use client";

import { useProgressStore } from "@/lib/state";
import { useState } from "react";

type Props = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export function QuizBlock({ id, prompt, options, answer, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const saveScore = useProgressStore((s) => s.saveQuizScore);

  const handleSubmit = () => {
    if (selected === null) return;
    const score = selected === answer ? 1 : 0;
    saveScore(id, score);
  };

  const isCorrect = selected !== null && selected === answer;

  return (
    <div className="mcse-quiz my-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="font-semibold">Checkpoint</div>
      <p className="mt-1 text-sm text-muted">{prompt}</p>
      <div className="mt-3 space-y-2">
        {options.map((option, idx) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
              selected === idx
                ? "border-blue-500 bg-blue-50 text-blue-900"
                : "border-border"
            }`}
          >
            <input
              type="radio"
              name={id}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:-translate-y-0.5 hover:shadow-lg"
          onClick={handleSubmit}
        >
          Check
        </button>
        {selected !== null && (
          <span
            className={`text-sm font-semibold ${
              isCorrect ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isCorrect ? "Correct" : "Try again"}
          </span>
        )}
      </div>
      {selected !== null && (
        <p className="mt-2 text-sm text-muted">{explanation}</p>
      )}
    </div>
  );
}
