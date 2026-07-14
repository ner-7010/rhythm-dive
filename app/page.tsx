import Link from "next/link";

export default function HomePage() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-cyan-950/20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Knowledge graph MVP</p>
      <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Dive from one rhythm game song to the next.</h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-300">
        Browse songs, then follow explicit relationships to composers and games. The graph starts small and is designed to grow.
      </p>
      <Link href="/songs" className="mt-8 inline-flex rounded-full bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200">
        Explore songs
      </Link>
    </section>
  );
}
