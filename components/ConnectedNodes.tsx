import Link from "next/link";
import { nodeHref, nodeLabel, relationshipLabel, type RelationshipWithNodes } from "@/lib/graph";

type Props = {
  title?: string;
  relationships: RelationshipWithNodes[];
  currentNodeId: string;
};

export function ConnectedNodes({ title = "Connected nodes", relationships, currentNodeId }: Props) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold">{title}</h2>
      {relationships.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-slate-400">No connections yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3">
          {relationships.map((relationship) => {
            const isOutgoing = relationship.sourceNodeId === currentNodeId;
            const connectedNode = isOutgoing ? relationship.targetNode : relationship.sourceNode;
            return (
              <li key={relationship.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{relationshipLabel(relationship.type)}</p>
                <Link href={nodeHref(connectedNode)} className="mt-2 block text-xl font-bold hover:text-cyan-200">
                  {nodeLabel(connectedNode)}
                </Link>
                <p className="mt-1 text-sm text-slate-500">Created by {relationship.createdBy}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
