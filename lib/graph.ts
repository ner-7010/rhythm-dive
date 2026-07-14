export type EntityNode = {
  id: string;
  song: { id: string; title: string } | null;
  composer: { id: string; name: string } | null;
  game: { id: string; title: string } | null;
};

export type RelationshipWithNodes = {
  id: string;
  type: "COMPOSED_BY" | "INCLUDED_IN";
  sourceNodeId: string;
  targetNodeId: string;
  createdBy: string;
  sourceNode: EntityNode;
  targetNode: EntityNode;
};

export function nodeLabel(node: EntityNode) {
  return node.song?.title ?? node.composer?.name ?? node.game?.title ?? "Unknown node";
}

export function nodeHref(node: EntityNode) {
  if (node.song) return `/songs/${node.song.id}`;
  if (node.composer) return `/composers/${node.composer.id}`;
  if (node.game) return `/games/${node.game.id}`;
  return "#";
}

export function relationshipLabel(type: RelationshipWithNodes["type"]) {
  switch (type) {
    case "COMPOSED_BY":
      return "Composed by";
    case "INCLUDED_IN":
      return "Included in";
  }
}
