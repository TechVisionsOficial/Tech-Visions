import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { DocumentForm } from "../DocumentForm";
import { createDocumentRecord } from "../actions";

export default async function NewDocumentPage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Novo documento</h1>
      <div className="mt-6">
        <DocumentForm action={createDocumentRecord} clients={clients ?? []} />
      </div>
    </div>
  );
}
