import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { StageSelect } from "../StageSelect";
import { LeadForm } from "../LeadForm";
import { updateLeadRecord, deleteLeadRecord } from "../actions";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();
  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (!lead) notFound();

  const boundUpdate = updateLeadRecord.bind(null, id);
  const boundDelete = deleteLeadRecord.bind(null, id);

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">{lead.name}</h1>
        <StageSelect id={lead.id} stage={lead.stage} />
      </div>

      <div className="mt-6">
        <LeadForm action={boundUpdate} defaultValues={lead} />
      </div>

      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir lead
          </button>
        </form>
      </div>
    </div>
  );
}
