import { notFound } from "next/navigation";
import { ConnectedNodes } from "@/components/ConnectedNodes";
import { prisma } from "@/lib/prisma";

export default async function SongDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const song = await prisma.song.findUnique({
    where: { id },
    include: {
      node: {
        include: {
          outgoingRelationships: { include: { sourceNode: { include: { song: true, composer: true, game: true } }, targetNode: { include: { song: true, composer: true, game: true } } }, orderBy: { createdAt: "asc" } },
          incomingRelationships: { include: { sourceNode: { include: { song: true, composer: true, game: true } }, targetNode: { include: { song: true, composer: true, game: true } } }, orderBy: { createdAt: "asc" } },
        },
      },
    },
  });
  if (!song) notFound();
  const relationships = [...song.node.outgoingRelationships, ...song.node.incomingRelationships];
  return <article><p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Song</p><h1 className="mt-3 text-5xl font-black">{song.title}</h1>{song.artistCredit && <p className="mt-3 text-xl text-slate-300">{song.artistCredit}</p>}<ConnectedNodes relationships={relationships} currentNodeId={song.nodeId} /></article>;
}
