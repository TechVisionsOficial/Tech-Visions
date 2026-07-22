import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { MeetingForm } from "../MeetingForm";
import { createMeetingRecord } from "../actions";

export default async function NewMeetingPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  await getUser();
  const { date, time } = await searchParams;
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  const defaultValues = date ? { starts_at: `${date}T${time || "09:00"}` } : undefined;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Nova reunião</h1>
      <div className="mt-6">
        <MeetingForm
          action={createMeetingRecord}
          clients={clients ?? []}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
