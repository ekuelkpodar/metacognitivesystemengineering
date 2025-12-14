"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/labs", label: "Labs" },
  { href: "/studio", label: "Studio" },
  { href: "/glossary", label: "Glossary" },
  { href: "/patterns", label: "Patterns" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/progress", label: "Progress" },
  { href: "/search", label: "Search" },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-blue-600"
        >
          MCSE Academy
        </Link>
        <nav className="hidden gap-4 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1 transition ${
                pathname.startsWith(link.href)
                  ? "bg-blue-600 text-white"
                  : "text-foreground hover:bg-card"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/search"
          className="rounded-full border border-border px-3 py-1 text-sm font-semibold transition hover:border-blue-500 hover:text-blue-700"
        >
          /
        </Link>
      </div>
    </header>
  );
}
