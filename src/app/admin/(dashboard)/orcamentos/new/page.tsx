import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { QuoteForm } from "../QuoteForm";
import { createQuoteRecord } from "../actions";

export default async function NewQuotePage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Novo orçamento</h1>
      <div className="mt-6">
        <QuoteForm action={createQuoteRecord} clients={clients ?? []} />
      </div>
    </div>
  );
}
