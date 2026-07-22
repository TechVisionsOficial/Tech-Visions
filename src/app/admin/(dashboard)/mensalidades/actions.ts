"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import {
  SubscriptionSchema,
  SubscriptionUpdateSchema,
  type SubscriptionFormState,
} from "@/lib/validation/subscription";

async function getClientName(
  supabase: Awaited<ReturnType<typeof createClient>>,
  clientId: string | null | undefined
) {
  if (!clientId) return null;
  const { data } = await supabase
    .from("clients")
    .select("company_name")
    .eq("id", clientId)
    .single();
  return data?.company_name ?? null;
}

export async function createSubscriptionRecord(
  _prevState: SubscriptionFormState,
  formData: FormData
): Promise<SubscriptionFormState> {
  await verifySession();

  const validated = SubscriptionSchema.safeParse({
    client_id: formData.get("client_id"),
    amount: formData.get("amount"),
    due_day: formData.get("due_day"),
    status: formData.get("status"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("subscriptions")
    .insert(validated.data)
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar a mensalidade." };
  }

  const clientName = await getClientName(supabase, validated.data.client_id);
  await logActivity({
    action: "created",
    entityType: "subscription",
    entityId: inserted?.id,
    entityLabel: clientName ?? "mensalidade",
  });

  revalidatePath("/admin/mensalidades");
  redirect("/admin/mensalidades");
}

export async function updateSubscriptionRecord(
  id: string,
  _prevState: SubscriptionFormState,
  formData: FormData
): Promise<SubscriptionFormState> {
  await verifySession();

  const validated = SubscriptionUpdateSchema.safeParse({
    amount: formData.get("amount"),
    due_day: formData.get("due_day"),
    status: formData.get("status"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: updated, error } = await supabase
    .from("subscriptions")
    .update(validated.data)
    .eq("id", id)
    .select("client_id")
    .single();

  if (error) {
    return { message: "Não foi possível atualizar a mensalidade." };
  }

  const clientName = await getClientName(supabase, updated?.client_id);
  await logActivity({
    action: "updated",
    entityType: "subscription",
    entityId: id,
    entityLabel: clientName ?? "mensalidade",
  });

  revalidatePath("/admin/mensalidades");
  revalidatePath(`/admin/mensalidades/${id}`);
  redirect("/admin/mensalidades");
}

export async function deleteSubscriptionRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { count } = await supabase
    .from("charges")
    .select("id", { count: "exact", head: true })
    .eq("subscription_id", id);

  if (count && count > 0) {
    redirect(`/admin/mensalidades/${id}?error=has_charges`);
  }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("client_id")
    .eq("id", id)
    .single();

  await supabase.from("subscriptions").delete().eq("id", id);

  const clientName = await getClientName(supabase, subscription?.client_id);
  await logActivity({
    action: "deleted",
    entityType: "subscription",
    entityId: id,
    entityLabel: clientName ?? "mensalidade",
  });

  revalidatePath("/admin/mensalidades");
  redirect("/admin/mensalidades");
}

export async function markChargePaid(id: string) {
  await verifySession();
  const supabase = await createClient();
  const { data: charge } = await supabase
    .from("charges")
    .update({ status: "paid", paid_at: new Date().toISOString() })
    .eq("id", id)
    .select("client_id")
    .single();

  const clientName = await getClientName(supabase, charge?.client_id);
  await logActivity({
    action: "paid",
    entityType: "charge",
    entityId: id,
    entityLabel: clientName ?? "cobrança",
  });

  revalidatePath("/admin/mensalidades");
  revalidatePath("/admin/dashboards");
}

export async function cancelCharge(id: string) {
  await verifySession();
  const supabase = await createClient();
  const { data: charge } = await supabase
    .from("charges")
    .update({ status: "cancelled" })
    .eq("id", id)
    .select("client_id")
    .single();

  const clientName = await getClientName(supabase, charge?.client_id);
  await logActivity({
    action: "cancelled",
    entityType: "charge",
    entityId: id,
    entityLabel: clientName ?? "cobrança",
  });

  revalidatePath("/admin/mensalidades");
  revalidatePath("/admin/dashboards");
}
