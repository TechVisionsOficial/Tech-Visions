import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { getBrazilTodayISO } from "@/lib/date";
import { formatBRL } from "@/lib/formatCurrency";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function ContratosPage() {
  await getUser();
  const supabase = await createClient();
  const { data: contracts } = await supabase
    .from("contracts")
    .select("*, clients(company_name)")
    .order("created_at", { ascending: false });

  const today = getBrazilTodayISO();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Contratos</h1>
        <Link
          href="/admin/contratos/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Novo contrato
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Contrato</Th>
              <Th>Cliente</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {!contracts?.length && (
              <EmptyRow colSpan={4} message="Nenhum contrato cadastrado ainda." />
            )}
            {contracts?.map((contract) => {
              const displayStatus =
                contract.status === "active" &&
                contract.end_date &&
                contract.end_date < today
                  ? "expired"
                  : contract.status;
              return (
                <tr key={contract.id}>
                  <Td>
                    <Link
                      href={`/admin/contratos/${contract.id}`}
                      className="font-medium hover:underline"
                    >
                      {contract.title}
                    </Link>
                  </Td>
                  <Td>{contract.clients?.company_name ?? "—"}</Td>
                  <Td>{formatBRL(contract.value)}</Td>
                  <Td>
                    <StatusBadge status={displayStatus} />
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
