import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { formatBRL } from "@/lib/formatCurrency";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function OrcamentosPage() {
  await getUser();
  const supabase = await createClient();
  const { data: quotes } = await supabase
    .from("quotes")
    .select("*, clients(company_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Orçamentos</h1>
        <Link
          href="/admin/orcamentos/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Novo orçamento
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Orçamento</Th>
              <Th>Cliente</Th>
              <Th>Valor</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {!quotes?.length && (
              <EmptyRow colSpan={4} message="Nenhum orçamento cadastrado ainda." />
            )}
            {quotes?.map((quote) => (
              <tr key={quote.id}>
                <Td>
                  <Link
                    href={`/admin/orcamentos/${quote.id}`}
                    className="font-medium hover:underline"
                  >
                    {quote.title}
                  </Link>
                </Td>
                <Td>{quote.clients?.company_name ?? "—"}</Td>
                <Td>{formatBRL(quote.value)}</Td>
                <Td>
                  <StatusBadge status={quote.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
