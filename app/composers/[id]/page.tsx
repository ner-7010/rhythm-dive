import { notFound } from "next/navigation";
import { ConnectedNodes } from "@/components/ConnectedNodes";
import { prisma } from "@/lib/prisma";

export default async function ComposerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const composer = await prisma.composer.findUnique({
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
  if (!composer) notFound();
  const relationships = [...composer.node.incomingRelationships, ...composer.node.outgoingRelationships];
  return <article><p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Composer</p><h1 className="mt-3 text-5xl font-black">{composer.name}</h1><ConnectedNodes title="Songs and graph connections" relationships={relationships} currentNodeId={composer.nodeId} /></article>;
}
