import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rhythm Dive!!",
  description: "Discover rhythm game music through connections.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
          <header className="mb-10 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link href="/" className="text-3xl font-black tracking-tight text-cyan-300">
                Rhythm Dive!!
              </Link>
              <p className="mt-2 max-w-2xl text-sm text-slate-400">
                A community-driven knowledge graph for rhythm game music — discover songs by exploring connections.
              </p>
            </div>
            <nav className="flex gap-3 text-sm text-slate-300">
              <Link className="hover:text-cyan-200" href="/songs">Songs</Link>
            </nav>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
