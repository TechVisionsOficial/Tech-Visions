import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ensureCurrentMonthCharges } from "@/lib/mensalidades/ensureCurrentMonthCharges";
import { getBrazilTodayISO, getCurrentMonthRange } from "@/lib/date";
import { formatBRL } from "@/lib/formatCurrency";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { markChargePaid } from "./actions";

export default async function MensalidadesPage() {
  await getUser();
  await ensureCurrentMonthCharges();

  const supabase = await createClient();
  const today = getBrazilTodayISO();
  const { startOfMonth, startOfNextMonth } = getCurrentMonthRange();

  const { data: charges } = await supabase
    .from("charges")
    .select("*, subscriptions(id), clients(company_name)")
    .gte("due_date", startOfMonth)
    .lt("due_date", startOfNextMonth)
    .order("due_date", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Mensalidades</h1>
        <Link
          href="/admin/mensalidades/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Nova mensalidade
        </Link>
      </div>
      <p className="mt-1 text-sm text-ink/50">Cobranças do mês atual, por cliente.</p>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Cliente</Th>
              <Th>Valor</Th>
              <Th>Vencimento</Th>
              <Th>Status</Th>
              <Th>Ação</Th>
            </tr>
          </thead>
          <tbody>
            {!charges?.length && (
              <EmptyRow
                colSpan={5}
                message="Nenhuma mensalidade ativa este mês."
              />
            )}
            {charges?.map((charge) => {
              const isOverdue = charge.status === "pending" && charge.due_date < today;
              const boundMarkPaid = markChargePaid.bind(null, charge.id);
              return (
                <tr key={charge.id}>
                  <Td>
                    <Link
                      href={`/admin/mensalidades/${charge.subscriptions?.id}`}
                      className="font-medium hover:underline"
                    >
                      {charge.clients?.company_name ?? "—"}
                    </Link>
                  </Td>
                  <Td>{formatBRL(charge.amount)}</Td>
                  <Td>{charge.due_date}</Td>
                  <Td>
                    <StatusBadge status={isOverdue ? "overdue" : charge.status} />
                  </Td>
                  <Td>
                    {charge.status === "pending" && (
                      <form action={boundMarkPaid}>
                        <button
                          type="submit"
                          className="text-sm text-ink/70 hover:text-ink hover:underline"
                        >
                          Marcar como pago
                        </button>
                      </form>
                    )}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
