CREATE TYPE "NodeKind" AS ENUM ('SONG', 'COMPOSER', 'GAME');
CREATE TYPE "RelationshipType" AS ENUM ('COMPOSED_BY', 'INCLUDED_IN');

CREATE TABLE "Node" (
  "id" TEXT NOT NULL,
  "kind" "NodeKind" NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Song" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "artistCredit" TEXT,
  "nodeId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Composer" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "nodeId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Composer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Game" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "nodeId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Relationship" (
  "id" TEXT NOT NULL,
  "type" "RelationshipType" NOT NULL,
  "sourceNodeId" TEXT NOT NULL,
  "targetNodeId" TEXT NOT NULL,
  "createdBy" TEXT NOT NULL DEFAULT 'SYSTEM',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Song_nodeId_key" ON "Song"("nodeId");
CREATE INDEX "Song_title_idx" ON "Song"("title");
CREATE UNIQUE INDEX "Composer_nodeId_key" ON "Composer"("nodeId");
CREATE INDEX "Composer_name_idx" ON "Composer"("name");
CREATE UNIQUE INDEX "Game_nodeId_key" ON "Game"("nodeId");
CREATE INDEX "Game_title_idx" ON "Game"("title");
CREATE UNIQUE INDEX "Relationship_type_sourceNodeId_targetNodeId_key" ON "Relationship"("type", "sourceNodeId", "targetNodeId");
CREATE INDEX "Relationship_sourceNodeId_type_idx" ON "Relationship"("sourceNodeId", "type");
CREATE INDEX "Relationship_targetNodeId_type_idx" ON "Relationship"("targetNodeId", "type");

ALTER TABLE "Song" ADD CONSTRAINT "Song_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Composer" ADD CONSTRAINT "Composer_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Game" ADD CONSTRAINT "Game_nodeId_fkey" FOREIGN KEY ("nodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_targetNodeId_fkey" FOREIGN KEY ("targetNodeId") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
