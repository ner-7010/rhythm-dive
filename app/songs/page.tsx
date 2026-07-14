import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SongListPage() {
  const songs = await prisma.song.findMany({ orderBy: { title: "asc" } });

  return (
    <section>
      <h1 className="text-4xl font-black">Songs</h1>
      <p className="mt-3 text-slate-400">Start here, then follow each song&apos;s composer and game relationships.</p>
      <ul className="mt-8 grid gap-4">
        {songs.map((song: { id: string; title: string; artistCredit: string | null }) => (
          <li key={song.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
            <Link href={`/songs/${song.id}`} className="text-2xl font-bold hover:text-cyan-200">{song.title}</Link>
            {song.artistCredit && <p className="mt-1 text-slate-400">{song.artistCredit}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
