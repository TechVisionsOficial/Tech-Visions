import "server-only";

import { createClient } from "@/lib/supabase/server";
import { verifySession } from "@/lib/auth/dal";

export async function logActivity(params: {
  action: string;
  entityType: string;
  entityId?: string;
  entityLabel: string;
}) {
  try {
    // Reuses the SAME request's React cache() — not a second network round-trip.
    const { email } = await verifySession();
    const supabase = await createClient();
    await supabase.from("activity_log").insert({
      actor_email: email,
      action: params.action,
      entity_type: params.entityType,
      entity_id: params.entityId ?? null,
      entity_label: params.entityLabel,
    });
  } catch {
    // Never let a broken activity-log insert block or roll back the actual
    // mutation the user came for.
  }
}
