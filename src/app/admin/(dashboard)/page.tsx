import Link from "next/link";
import { getUser } from "@/lib/auth/dal";

const ACTIONS = [
  { label: "Novo cliente", href: "/admin/clientes/new" },
  { label: "Novo projeto", href: "/admin/projetos/new" },
  { label: "Nova tarefa", href: "/admin/tarefas/new" },
  { label: "Ver leads", href: "/admin/leads" },
  { label: "Novo contrato", href: "/admin/contratos/new" },
  { label: "Novo orçamento", href: "/admin/orcamentos/new" },
  { label: "Nova mensalidade", href: "/admin/mensalidades/new" },
  { label: "Nova reunião", href: "/admin/agenda/new" },
  { label: "Novo documento", href: "/admin/documentos/new" },
  { label: "Ver histórico", href: "/admin/historico" },
  { label: "Ver dashboards", href: "/admin/dashboards" },
];

export default async function AdminHome() {
  const user = await getUser();
  const firstName = user.email?.split("@")[0] ?? "";

  return (
    <div>
      <div className="py-10">
        <h1 className="font-display text-4xl font-medium sm:text-5xl">
          Bem-vindo ao Painel Admin da Tech Visions!
        </h1>
        <p className="mt-3 text-base text-ink/60">
          {firstName ? `Bom te ver, ${firstName}.` : "O que vamos fazer hoje?"}
        </p>
      </div>

      <p className="text-sm font-medium uppercase tracking-wide text-ink/50">
        Ações rápidas
      </p>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-xl border border-ink/10 bg-white p-5 text-sm font-medium transition-colors hover:border-ink/25"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
