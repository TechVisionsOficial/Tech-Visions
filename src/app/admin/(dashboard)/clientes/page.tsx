import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function ClientesPage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Clientes</h1>
        <Link
          href="/admin/clientes/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Novo cliente
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Empresa</Th>
              <Th>Contato</Th>
              <Th>Segmento</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {!clients?.length && (
              <EmptyRow colSpan={4} message="Nenhum cliente cadastrado ainda." />
            )}
            {clients?.map((client) => (
              <tr key={client.id}>
                <Td>
                  <Link
                    href={`/admin/clientes/${client.id}`}
                    className="font-medium hover:underline"
                  >
                    {client.company_name}
                  </Link>
                </Td>
                <Td>{client.contact_name || "—"}</Td>
                <Td>{client.segment || "—"}</Td>
                <Td>
                  <StatusBadge status={client.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
