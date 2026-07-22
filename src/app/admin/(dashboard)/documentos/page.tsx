import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { formatBytes } from "@/lib/formatBytes";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";

export default async function DocumentosPage() {
  await getUser();
  const supabase = await createClient();
  const { data: documents } = await supabase
    .from("documents")
    .select("*, clients(company_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Documentos</h1>
        <Link
          href="/admin/documentos/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Novo documento
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Arquivo</Th>
              <Th>Cliente</Th>
              <Th>Tamanho</Th>
              <Th>Enviado em</Th>
            </tr>
          </thead>
          <tbody>
            {!documents?.length && (
              <EmptyRow colSpan={4} message="Nenhum documento enviado ainda." />
            )}
            {documents?.map((doc) => (
              <tr key={doc.id}>
                <Td>
                  <Link
                    href={`/admin/documentos/${doc.id}`}
                    className="font-medium hover:underline"
                  >
                    {doc.file_name}
                  </Link>
                </Td>
                <Td>{doc.clients?.company_name ?? "—"}</Td>
                <Td>{formatBytes(doc.size_bytes)}</Td>
                <Td>{new Date(doc.created_at).toLocaleDateString("pt-BR")}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
