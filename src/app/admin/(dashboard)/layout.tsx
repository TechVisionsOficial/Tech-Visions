import { getUser } from "@/lib/auth/dal";
import { logout } from "@/app/admin/login/actions";
import { NavGroups } from "./NavGroups";

const NAV_GROUPS: { label?: string; items: { href: string; label: string }[] }[] = [
  {
    items: [
      { href: "/admin", label: "Início" },
      { href: "/admin/dashboards", label: "Dashboards" },
    ],
  },
  {
    label: "Operação",
    items: [
      { href: "/admin/clientes", label: "Clientes" },
      { href: "/admin/projetos", label: "Projetos" },
      { href: "/admin/tarefas", label: "Tarefas" },
      { href: "/admin/leads", label: "Leads" },
    ],
  },
  {
    label: "Finanças",
    items: [
      { href: "/admin/contratos", label: "Contratos" },
      { href: "/admin/orcamentos", label: "Orçamentos" },
      { href: "/admin/mensalidades", label: "Mensalidades" },
    ],
  },
  {
    label: "Organização",
    items: [
      { href: "/admin/agenda", label: "Agenda" },
      { href: "/admin/documentos", label: "Documentos" },
      { href: "/admin/historico", label: "Histórico" },
    ],
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-ink/10 bg-white px-5 py-6">
        <span className="font-display text-lg font-medium">tech·visions</span>
        <NavGroups groups={NAV_GROUPS} />
        <div className="mt-auto border-t border-ink/10 pt-4">
          <p className="truncate text-xs text-ink/50">{user.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 text-sm text-ink/70 transition-colors hover:text-ink"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
