const LABELS: Record<string, string> = {
  active: "Ativo",
  inactive: "Inativo",
  prospect: "Prospect",
  planning: "Planejamento",
  in_progress: "Em andamento",
  review: "Revisão",
  done: "Concluído",
  on_hold: "Pausado",
  todo: "A fazer",
  new: "Novo",
  contacted: "Contatado",
  qualified: "Qualificado",
  won: "Ganho",
  lost: "Perdido",
  draft: "Rascunho",
  cancelled: "Cancelado",
  sent: "Enviado",
  approved: "Aprovado",
  rejected: "Rejeitado",
  pending: "Pendente",
  paid: "Pago",
  paused: "Pausado",
  expired: "Expirado",
  overdue: "Em atraso",
};

const COLORS: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-800",
  done: "bg-emerald-100 text-emerald-800",
  won: "bg-emerald-100 text-emerald-800",
  qualified: "bg-emerald-100 text-emerald-800",
  in_progress: "bg-amber-100 text-amber-800",
  review: "bg-amber-100 text-amber-800",
  contacted: "bg-amber-100 text-amber-800",
  planning: "bg-sky-100 text-sky-800",
  todo: "bg-sky-100 text-sky-800",
  new: "bg-sky-100 text-sky-800",
  prospect: "bg-sky-100 text-sky-800",
  inactive: "bg-neutral-200 text-neutral-700",
  on_hold: "bg-neutral-200 text-neutral-700",
  lost: "bg-red-100 text-red-800",
  approved: "bg-emerald-100 text-emerald-800",
  paid: "bg-emerald-100 text-emerald-800",
  sent: "bg-amber-100 text-amber-800",
  pending: "bg-amber-100 text-amber-800",
  draft: "bg-neutral-200 text-neutral-700",
  paused: "bg-neutral-200 text-neutral-700",
  cancelled: "bg-red-100 text-red-800",
  rejected: "bg-red-100 text-red-800",
  expired: "bg-red-100 text-red-800",
  overdue: "bg-red-100 text-red-800",
};

export function StatusBadge({ status }: { status: string }) {
  const color = COLORS[status] ?? "bg-neutral-200 text-neutral-700";
  const label = LABELS[status] ?? status;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
    >
      {label}
    </span>
  );
}
