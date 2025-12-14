import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SidebarNav } from "@/components/SidebarNav";
import { TopNav } from "@/components/TopNav";
import { getModules } from "@/lib/content";
import { PWARegister } from "@/components/PWARegister";

const font = Space_Grotesk({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "MCSE Academy",
  description:
    "Learn, design, and practice Meta-Cognitive Systems Engineering with interactive labs and studio tools.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modules = await getModules();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-surface text-foreground`}>
        <PWARegister />
        <div className="flex min-h-screen flex-col">
          <TopNav />
          <div className="flex flex-1">
            <SidebarNav modules={modules} />
            <main className="flex-1 overflow-y-auto border-l border-border bg-gradient-to-br from-background via-background to-surface px-6 pb-20 pt-6 md:px-10">
              <div className="mx-auto max-w-6xl">{children}</div>
            </main>
            <div className="fixed bottom-4 right-4 z-40">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
