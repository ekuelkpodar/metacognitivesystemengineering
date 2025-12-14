"use client";

import { useState } from "react";

type Props = {
  items: string[];
  title?: string;
};

export function Checklist({ items, title }: Props) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  return (
    <div className="my-4 rounded-xl border border-border bg-card p-4">
      {title && <div className="mb-2 text-sm font-semibold">{title}</div>}
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={item} className="flex items-start gap-2">
            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                aria-label={item}
                checked={checked[idx]}
                onChange={() =>
                  setChecked((state) =>
                    state.map((val, i) => (i === idx ? !val : val))
                  )
                }
                className="mt-1"
              />
              <span className="text-sm leading-5">{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
