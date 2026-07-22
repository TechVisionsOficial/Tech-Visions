import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getCurrentMonthRange } from "@/lib/date";

/** Ensures every active subscription has a charge row for the current month.
 * Safe to call on every page load: the unique (subscription_id, due_date)
 * constraint + ignoreDuplicates means existing charges (paid or not) are
 * never touched, even if the subscription's amount changed since. */
export async function ensureCurrentMonthCharges() {
  const { startOfMonth } = getCurrentMonthRange();
  const [year, month] = startOfMonth.split("-");

  const supabase = await createClient();
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("id, client_id, amount, due_day")
    .eq("status", "active");

  if (!subscriptions?.length) return;

  const rows = subscriptions.map((sub) => ({
    subscription_id: sub.id,
    client_id: sub.client_id,
    amount: sub.amount,
    due_date: `${year}-${month}-${String(sub.due_day).padStart(2, "0")}`,
    status: "pending",
  }));

  await supabase
    .from("charges")
    .upsert(rows, { onConflict: "subscription_id,due_date", ignoreDuplicates: true });
}
