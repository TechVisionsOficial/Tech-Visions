import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { getBrazilTodayISO } from "@/lib/date";
import { formatBRL } from "@/lib/formatCurrency";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubscriptionForm } from "../SubscriptionForm";
import {
  updateSubscriptionRecord,
  deleteSubscriptionRecord,
  markChargePaid,
  cancelCharge,
} from "../actions";

export default async function SubscriptionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await getUser();
  const { id } = await params;
  const { error } = await searchParams;
  const today = getBrazilTodayISO();
  const supabase = await createClient();

  const [{ data: subscription }, { data: charges }] = await Promise.all([
    supabase
      .from("subscriptions")
      .select("*, clients(company_name)")
      .eq("id", id)
      .single(),
    supabase
      .from("charges")
      .select("*")
      .eq("subscription_id", id)
      .order("due_date", { ascending: false }),
  ]);

  if (!subscription) notFound();

  const boundUpdate = updateSubscriptionRecord.bind(null, id);
  const boundDelete = deleteSubscriptionRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">
        {subscription.clients?.company_name}
      </h1>

      <div className="mt-6">
        <SubscriptionForm
          action={boundUpdate}
          clientName={subscription.clients?.company_name}
          defaultValues={subscription}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-medium">Histórico de cobranças</h2>
        <div className="mt-4">
          <DataTable>
            <thead>
              <tr>
                <Th>Vencimento</Th>
                <Th>Valor</Th>
                <Th>Status</Th>
                <Th>Ação</Th>
              </tr>
            </thead>
            <tbody>
              {!charges?.length && (
                <EmptyRow colSpan={4} message="Nenhuma cobrança gerada ainda." />
              )}
              {charges?.map((charge) => {
                const isOverdue =
                  charge.status === "pending" && charge.due_date < today;
                return (
                  <tr key={charge.id}>
                    <Td>{charge.due_date}</Td>
                    <Td>{formatBRL(charge.amount)}</Td>
                    <Td>
                      <StatusBadge status={isOverdue ? "overdue" : charge.status} />
                    </Td>
                    <Td>
                      {charge.status === "pending" && (
                        <div className="flex gap-3">
                          <form action={markChargePaid.bind(null, charge.id)}>
                            <button
                              type="submit"
                              className="text-sm text-ink/70 hover:text-ink hover:underline"
                            >
                              Marcar como pago
                            </button>
                          </form>
                          <form action={cancelCharge.bind(null, charge.id)}>
                            <button
                              type="submit"
                              className="text-sm text-red-600 hover:underline"
                            >
                              Cancelar
                            </button>
                          </form>
                        </div>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </DataTable>
        </div>
      </div>

      <div className="mt-8 border-t border-ink/10 pt-6">
        {error === "has_charges" && (
          <p className="mb-3 text-sm text-red-600">
            Não é possível excluir esta mensalidade — ela já tem cobranças
            registradas. Cancele-a em vez de excluir, pra manter o histórico.
          </p>
        )}
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir mensalidade
          </button>
        </form>
      </div>
    </div>
  );
}
