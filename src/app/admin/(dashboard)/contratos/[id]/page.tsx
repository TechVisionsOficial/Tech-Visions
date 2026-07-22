import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ContractForm } from "../ContractForm";
import { updateContractRecord, deleteContractRecord } from "../actions";

export default async function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: contract }, { data: clients }] = await Promise.all([
    supabase.from("contracts").select("*").eq("id", id).single(),
    supabase.from("clients").select("id, company_name").order("company_name"),
  ]);

  if (!contract) notFound();

  const boundUpdate = updateContractRecord.bind(null, id);
  const boundDelete = deleteContractRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{contract.title}</h1>
      <div className="mt-6">
        <ContractForm
          action={boundUpdate}
          clients={clients ?? []}
          defaultValues={contract}
        />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir contrato
          </button>
        </form>
      </div>
    </div>
  );
}
