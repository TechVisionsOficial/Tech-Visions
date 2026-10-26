"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { moveLeadStage } from "./actions";

const STAGES = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "qualified", label: "Qualificado" },
  { value: "won", label: "Ganho" },
  { value: "lost", label: "Perdido" },
];

const SOURCE_LABELS: Record<string, string> = {
  site: "Site",
  manual: "Manual",
  referral: "Indicação",
  ads: "Anúncios",
};

type Lead = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string;
  stage: string;
};

export function KanbanBoard({ leads }: { leads: Lead[] }) {
  const [items, setItems] = useState(leads);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function moveLead(id: string, stage: string) {
    setItems((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, stage } : lead))
    );
    startTransition(() => {
      moveLeadStage(id, stage);
    });
  }

  function handleDrop(stage: string) {
    if (!draggingId) return;
    const id = draggingId;
    setDraggingId(null);
    moveLead(id, stage);
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {STAGES.map((column) => {
        const columnLeads = items.filter((lead) => lead.stage === column.value);
        return (
          <div
            key={column.value}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.value)}
            className="flex min-w-0 flex-col gap-3 rounded-xl bg-ink/5 p-3"
          >
            <p className="px-1 text-xs font-medium uppercase tracking-wide text-ink/50">
              {column.label} · {columnLeads.length}
            </p>

            {columnLeads.length === 0 && (
              <div className="rounded-lg border border-dashed border-ink/15 p-4 text-center text-xs text-ink/30">
                Solte um lead aqui
              </div>
            )}

            {columnLeads.map((lead) => (
              <div
                key={lead.id}
                draggable
                onDragStart={() => setDraggingId(lead.id)}
                onDragEnd={() => setDraggingId(null)}
                className={`cursor-grab rounded-lg border border-ink/10 bg-white p-3 text-sm shadow-sm transition-opacity active:cursor-grabbing ${
                  draggingId === lead.id ? "opacity-40" : ""
                }`}
              >
                <Link
                  href={`/admin/leads/${lead.id}`}
                  className="font-medium hover:underline"
                >
                  {lead.name}
                </Link>
                <p className="mt-1 truncate text-xs text-ink/50">
                  {lead.email || lead.phone || "—"}
                </p>
                <p className="mt-1 text-xs text-ink/40">
                  {SOURCE_LABELS[lead.source] ?? lead.source}
                </p>
                {/* HTML5 drag-and-drop doesn't fire on iOS touch, so phones move leads with this instead. */}
                <select
                  aria-label={`Mover ${lead.name} para outra etapa`}
                  value={lead.stage}
                  onChange={(e) => moveLead(lead.id, e.target.value)}
                  className="mt-2 w-full rounded-md border border-ink/15 bg-white px-2 py-1.5 text-base text-ink md:hidden"
                >
                  {STAGES.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
