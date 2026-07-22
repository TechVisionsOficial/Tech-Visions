import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";

const ACTION_LABELS: Record<string, string> = {
  created: "criou",
  updated: "atualizou",
  deleted: "excluiu",
  paid: "marcou como pago",
  cancelled: "cancelou",
  moved: "moveu",
};

const ENTITY_LABELS: Record<string, string> = {
  client: "o cliente",
  project: "o projeto",
  task: "a tarefa",
  lead: "o lead",
  contract: "o contrato",
  quote: "o orçamento",
  subscription: "a mensalidade",
  charge: "a cobrança",
  meeting: "a reunião",
  document: "o documento",
};

export default async function HistoricoPage() {
  await getUser();
  const supabase = await createClient();
  const { data: activities } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Histórico</h1>
      <p className="mt-1 text-sm text-ink/50">Últimas 100 atividades registradas.</p>

      <div className="mt-6 flex flex-col divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
        {!activities?.length && (
          <p className="p-6 text-sm text-ink/50">Nenhuma atividade registrada ainda.</p>
        )}
        {activities?.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm"
          >
            <p>
              <span className="font-medium">{item.actor_email ?? "Alguém"}</span>{" "}
              {ACTION_LABELS[item.action] ?? item.action}{" "}
              {ENTITY_LABELS[item.entity_type] ?? item.entity_type}{" "}
              <span className="font-medium">&ldquo;{item.entity_label}&rdquo;</span>
            </p>
            <span className="shrink-0 text-xs text-ink/40">
              {new Date(item.created_at).toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
