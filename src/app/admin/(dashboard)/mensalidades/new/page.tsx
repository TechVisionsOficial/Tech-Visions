import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { SubscriptionForm } from "../SubscriptionForm";
import { createSubscriptionRecord } from "../actions";

export default async function NewSubscriptionPage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Nova mensalidade</h1>
      <div className="mt-6">
        <SubscriptionForm
          action={createSubscriptionRecord}
          clients={clients ?? []}
        />
      </div>
    </div>
  );
}
