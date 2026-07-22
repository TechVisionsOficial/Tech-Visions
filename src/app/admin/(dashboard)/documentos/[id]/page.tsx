import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { formatBytes } from "@/lib/formatBytes";
import { deleteDocumentRecord } from "../actions";

export default async function DocumentDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  await getUser();
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: doc } = await supabase
    .from("documents")
    .select("*, clients(company_name)")
    .eq("id", id)
    .single();

  if (!doc) notFound();

  const boundDelete = deleteDocumentRecord.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-medium">{doc.file_name}</h1>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b border-ink/10 pb-3">
          <dt className="text-ink/50">Cliente</dt>
          <dd>{doc.clients?.company_name ?? "—"}</dd>
        </div>
        <div className="flex justify-between border-b border-ink/10 pb-3">
          <dt className="text-ink/50">Tamanho</dt>
          <dd>{formatBytes(doc.size_bytes)}</dd>
        </div>
        <div className="flex justify-between border-b border-ink/10 pb-3">
          <dt className="text-ink/50">Enviado em</dt>
          <dd>{new Date(doc.created_at).toLocaleDateString("pt-BR")}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <a
          href={`/admin/documentos/${id}/download`}
          className="w-fit rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper"
        >
          Baixar
        </a>
      </div>

      <div className="mt-8 border-t border-ink/10 pt-6">
        {error === "delete_failed" && (
          <p className="mb-3 text-sm text-red-600">
            Não foi possível excluir o arquivo. Tente novamente.
          </p>
        )}
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir documento
          </button>
        </form>
      </div>
    </div>
  );
}
