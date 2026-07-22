import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ensureCurrentMonthCharges } from "@/lib/mensalidades/ensureCurrentMonthCharges";
import { getBrazilTodayISO } from "@/lib/date";
import { formatBRL } from "@/lib/formatCurrency";

function sum(values: (number | string | null)[]) {
  return values.reduce((total: number, v) => {
    const n = typeof v === "string" ? parseFloat(v) : v;
    return total + (n ?? 0);
  }, 0);
}

export default async function DashboardsPage() {
  await getUser();
  await ensureCurrentMonthCharges();

  const supabase = await createClient();
  const today = getBrazilTodayISO();

  const [
    clients,
    projects,
    tasks,
    leads,
    contracts,
    quotes,
    subscriptions,
    meetings,
    documents,
    activeSubs,
    activeContracts,
    overdueCharges,
    pendingQuotes,
  ] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tasks").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("contracts").select("*", { count: "exact", head: true }),
    supabase.from("quotes").select("*", { count: "exact", head: true }),
    supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("meetings").select("*", { count: "exact", head: true }),
    supabase.from("documents").select("*", { count: "exact", head: true }),
    supabase.from("subscriptions").select("amount").eq("status", "active"),
    supabase.from("contracts").select("value").eq("status", "active"),
    supabase
      .from("charges")
      .select("amount")
      .eq("status", "pending")
      .lt("due_date", today),
    supabase.from("quotes").select("value").eq("status", "sent"),
  ]);

  const financeCards = [
    {
      label: "MRR (mensalidades ativas)",
      value: formatBRL(sum((activeSubs.data ?? []).map((r) => r.amount))),
      sub: `${activeSubs.data?.length ?? 0} clientes`,
    },
    {
      label: "Contratos ativos",
      value: formatBRL(sum((activeContracts.data ?? []).map((r) => r.value))),
      sub: `${activeContracts.data?.length ?? 0} contratos`,
    },
    {
      label: "Mensalidades em atraso",
      value: formatBRL(sum((overdueCharges.data ?? []).map((r) => r.amount))),
      sub: `${overdueCharges.data?.length ?? 0} cobranças`,
    },
    {
      label: "Orçamentos pendentes",
      value: formatBRL(sum((pendingQuotes.data ?? []).map((r) => r.value))),
      sub: `${pendingQuotes.data?.length ?? 0} enviados`,
    },
  ];

  const countCards = [
    { label: "Clientes", href: "/admin/clientes", count: clients.count ?? 0 },
    { label: "Projetos", href: "/admin/projetos", count: projects.count ?? 0 },
    { label: "Tarefas", href: "/admin/tarefas", count: tasks.count ?? 0 },
    { label: "Leads", href: "/admin/leads", count: leads.count ?? 0 },
    { label: "Contratos", href: "/admin/contratos", count: contracts.count ?? 0 },
    { label: "Orçamentos", href: "/admin/orcamentos", count: quotes.count ?? 0 },
    {
      label: "Mensalidades ativas",
      href: "/admin/mensalidades",
      count: subscriptions.count ?? 0,
    },
    { label: "Reuniões", href: "/admin/agenda", count: meetings.count ?? 0 },
    { label: "Documentos", href: "/admin/documentos", count: documents.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Dashboards</h1>

      <h2 className="mt-8 text-sm font-medium uppercase tracking-wide text-ink/50">
        Financeiro
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financeCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-ink/10 bg-white p-5"
          >
            <p className="text-sm text-ink/50">{card.label}</p>
            <p className="mt-2 font-display text-2xl font-medium">{card.value}</p>
            <p className="mt-1 text-xs text-ink/40">{card.sub}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-ink/50">
        Operação
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {countCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink/25"
          >
            <p className="font-display text-3xl font-medium">{card.count}</p>
            <p className="mt-1 text-sm text-ink/60">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
