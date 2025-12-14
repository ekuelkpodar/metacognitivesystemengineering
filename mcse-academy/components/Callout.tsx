"use client";

type Props = {
  type?: "info" | "warn" | "success";
  children: React.ReactNode;
  title?: string;
};

const toneStyles = {
  info: "border-blue-500 bg-blue-50 text-blue-900",
  warn: "border-amber-500 bg-amber-50 text-amber-900",
  success: "border-emerald-500 bg-emerald-50 text-emerald-900",
};

export function Callout({ type = "info", children, title }: Props) {
  return (
    <div
      className={`my-4 rounded-xl border px-4 py-3 text-sm shadow-sm ${toneStyles[type]}`}
      role="note"
    >
      {title && <div className="font-semibold">{title}</div>}
      <div className="mt-1">{children}</div>
    </div>
  );
}
