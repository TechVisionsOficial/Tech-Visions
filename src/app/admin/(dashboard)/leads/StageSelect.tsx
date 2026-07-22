"use client";

import { updateLeadStage } from "./actions";

const STAGES = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Contatado" },
  { value: "qualified", label: "Qualificado" },
  { value: "won", label: "Ganho" },
  { value: "lost", label: "Perdido" },
];

export function StageSelect({ id, stage }: { id: string; stage: string }) {
  const boundUpdate = updateLeadStage.bind(null, id);

  return (
    <form
      action={boundUpdate}
      onChange={(e) => (e.currentTarget as HTMLFormElement).requestSubmit()}
    >
      <select
        name="stage"
        defaultValue={stage}
        className="rounded-full border border-ink/15 bg-white px-3 py-1 text-xs"
      >
        {STAGES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </form>
  );
}
