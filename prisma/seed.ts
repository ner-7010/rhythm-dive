import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSong(title: string, artistCredit: string) {
  return prisma.song.create({ data: { title, artistCredit, node: { create: { kind: "SONG" } } } });
}
async function createComposer(name: string) {
  return prisma.composer.create({ data: { name, node: { create: { kind: "COMPOSER" } } } });
}
async function createGame(title: string) {
  return prisma.game.create({ data: { title, node: { create: { kind: "GAME" } } } });
}

async function main() {
  await prisma.relationship.deleteMany();
  await prisma.song.deleteMany();
  await prisma.composer.deleteMany();
  await prisma.game.deleteMany();
  await prisma.node.deleteMany();

  const conflict = await createSong("conflict", "siromaru + cranky");
  const freedomDive = await createSong("FREEDOM DiVE", "xi");
  const siromaru = await createComposer("siromaru");
  const cranky = await createComposer("cranky");
  const xi = await createComposer("xi");
  const iidx = await createGame("beatmania IIDX");
  const chunithm = await createGame("CHUNITHM");

  await prisma.relationship.createMany({
    data: [
      { type: "COMPOSED_BY", sourceNodeId: conflict.nodeId, targetNodeId: siromaru.nodeId },
      { type: "COMPOSED_BY", sourceNodeId: conflict.nodeId, targetNodeId: cranky.nodeId },
      { type: "COMPOSED_BY", sourceNodeId: freedomDive.nodeId, targetNodeId: xi.nodeId },
      { type: "INCLUDED_IN", sourceNodeId: conflict.nodeId, targetNodeId: iidx.nodeId },
      { type: "INCLUDED_IN", sourceNodeId: freedomDive.nodeId, targetNodeId: chunithm.nodeId },
    ],
  });
}

main().finally(async () => prisma.$disconnect());
