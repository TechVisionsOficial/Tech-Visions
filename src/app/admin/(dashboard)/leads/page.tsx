import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { NewLeadForm } from "./NewLeadForm";
import { KanbanBoard } from "./KanbanBoard";

export default async function LeadsPage() {
  await getUser();
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Leads</h1>
        <NewLeadForm />
      </div>

      <div className="mt-6">
        {!leads?.length ? (
          <p className="rounded-xl border border-ink/10 bg-white p-10 text-center text-sm text-ink/50">
            Nenhum lead cadastrado ainda.
          </p>
        ) : (
          <KanbanBoard leads={leads} />
        )}
      </div>
    </div>
  );
}
