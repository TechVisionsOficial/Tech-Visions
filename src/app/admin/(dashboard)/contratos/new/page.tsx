import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ContractForm } from "../ContractForm";
import { createContractRecord } from "../actions";

export default async function NewContractPage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Novo contrato</h1>
      <div className="mt-6">
        <ContractForm action={createContractRecord} clients={clients ?? []} />
      </div>
    </div>
  );
}
