import { notFound } from "next/navigation";
import { ConnectedNodes } from "@/components/ConnectedNodes";
import { prisma } from "@/lib/prisma";

export default async function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = await prisma.game.findUnique({
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
  if (!game) notFound();
  const relationships = [...game.node.incomingRelationships, ...game.node.outgoingRelationships];
  return <article><p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Game</p><h1 className="mt-3 text-5xl font-black">{game.title}</h1><ConnectedNodes title="Songs and graph connections" relationships={relationships} currentNodeId={game.nodeId} /></article>;
}
