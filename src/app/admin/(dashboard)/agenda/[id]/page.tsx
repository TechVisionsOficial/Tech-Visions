import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { MeetingForm } from "../MeetingForm";
import { updateMeetingRecord, deleteMeetingRecord } from "../actions";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: meeting }, { data: clients }] = await Promise.all([
    supabase.from("meetings").select("*").eq("id", id).single(),
    supabase.from("clients").select("id, company_name").order("company_name"),
  ]);

  if (!meeting) notFound();

  const boundUpdate = updateMeetingRecord.bind(null, id);
  const boundDelete = deleteMeetingRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{meeting.title}</h1>
      <div className="mt-6">
        <MeetingForm
          action={boundUpdate}
          clients={clients ?? []}
          defaultValues={meeting}
        />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir reunião
          </button>
        </form>
      </div>
    </div>
  );
}
