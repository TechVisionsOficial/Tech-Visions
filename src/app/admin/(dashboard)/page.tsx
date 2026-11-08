import Link from "next/link";
import { getUser } from "@/lib/auth/dal";

type Action = { label: string; href: string; kind: "create" | "view" };

const ACTION_GROUPS: { label: string; actions: Action[] }[] = [
  {
    label: "Operação",
    actions: [
      { label: "Novo cliente", href: "/admin/clientes/new", kind: "create" },
      { label: "Novo projeto", href: "/admin/projetos/new", kind: "create" },
      { label: "Nova tarefa", href: "/admin/tarefas/new", kind: "create" },
      { label: "Ver leads", href: "/admin/leads", kind: "view" },
    ],
  },
  {
    label: "Finanças",
    actions: [
      { label: "Novo contrato", href: "/admin/contratos/new", kind: "create" },
      { label: "Novo orçamento", href: "/admin/orcamentos/new", kind: "create" },
      { label: "Nova mensalidade", href: "/admin/mensalidades/new", kind: "create" },
      { label: "Ver dashboards", href: "/admin/dashboards", kind: "view" },
    ],
  },
  {
    label: "Organização",
    actions: [
      { label: "Nova reunião", href: "/admin/agenda/new", kind: "create" },
      { label: "Novo documento", href: "/admin/documentos/new", kind: "create" },
      { label: "Ver histórico", href: "/admin/historico", kind: "view" },
    ],
  },
];

function ActionIcon({ kind }: { kind: Action["kind"] }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-4 w-4 shrink-0 text-ink/40 transition-[color,transform] duration-150 group-hover:text-ink"
    >
      {kind === "create" ? (
        <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      ) : (
        <path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default async function AdminHome() {
  const user = await getUser();
  const firstName = user.email?.split("@")[0] ?? "";

  return (
    <div>
      <div className="py-10">
        <h1 className="font-display text-3xl font-medium tracking-[-0.02em] sm:text-4xl md:text-5xl">
          Bem-vindo ao Painel Admin da Tech Visions!
        </h1>
        <p className="mt-3 text-base text-ink/60">
          {firstName ? `Bom te ver, ${firstName}.` : "O que vamos fazer hoje?"}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {ACTION_GROUPS.map((group) => (
          <section key={group.label} aria-labelledby={`acoes-${group.label}`}>
            <h2
              id={`acoes-${group.label}`}
              className="text-xs font-medium uppercase tracking-wide text-ink/45"
            >
              {group.label}
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white px-5 py-4 text-sm font-medium transition-[border-color,transform] duration-150 ease-out-expo hover:border-ink/25 active:scale-[0.98]"
                >
                  {action.label}
                  <ActionIcon kind={action.kind} />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
