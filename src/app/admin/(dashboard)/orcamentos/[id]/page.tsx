import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { QuoteForm } from "../QuoteForm";
import { updateQuoteRecord, deleteQuoteRecord } from "../actions";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: quote }, { data: clients }] = await Promise.all([
    supabase.from("quotes").select("*").eq("id", id).single(),
    supabase.from("clients").select("id, company_name").order("company_name"),
  ]);

  if (!quote) notFound();

  const boundUpdate = updateQuoteRecord.bind(null, id);
  const boundDelete = deleteQuoteRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{quote.title}</h1>
      <div className="mt-6">
        <QuoteForm
          action={boundUpdate}
          clients={clients ?? []}
          defaultValues={quote}
        />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir orçamento
          </button>
        </form>
      </div>
    </div>
  );
}
