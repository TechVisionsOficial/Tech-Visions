import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ClientForm } from "../ClientForm";
import { updateClientRecord, deleteClientRecord } from "../actions";

export default async function ClientDetailPage({
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
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const boundUpdate = updateClientRecord.bind(null, id);
  const boundDelete = deleteClientRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{client.company_name}</h1>
      <div className="mt-6">
        <ClientForm action={boundUpdate} defaultValues={client} />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        {error === "delete_failed" && (
          <p className="mb-3 text-sm text-red-600">
            Não foi possível excluir este cliente — ele ainda tem projetos vinculados.
            Exclua ou reatribua os projetos primeiro.
          </p>
        )}
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir cliente
          </button>
        </form>
      </div>
    </div>
  );
}
