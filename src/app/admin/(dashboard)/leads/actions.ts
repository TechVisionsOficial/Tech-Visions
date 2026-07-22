"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { LeadSchema, LeadStageSchema, type LeadFormState } from "@/lib/validation/lead";

export async function createLeadRecord(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  await verifySession();

  const validated = LeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    source: formData.get("source"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("leads")
    .insert(validated.data)
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar o lead." };
  }

  await logActivity({
    action: "created",
    entityType: "lead",
    entityId: inserted?.id,
    entityLabel: validated.data.name,
  });

  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}

export async function updateLeadRecord(
  id: string,
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  await verifySession();

  const validated = LeadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    source: formData.get("source"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar o lead." };
  }

  await logActivity({
    action: "updated",
    entityType: "lead",
    entityId: id,
    entityLabel: validated.data.name,
  });

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
  redirect("/admin/leads");
}

export async function updateLeadStage(id: string, formData: FormData) {
  await verifySession();

  const validated = LeadStageSchema.safeParse({ stage: formData.get("stage") });
  if (!validated.success) return;

  const supabase = await createClient();
  const { data: lead } = await supabase
    .from("leads")
    .update(validated.data)
    .eq("id", id)
    .select("name")
    .single();

  if (lead) {
    await logActivity({
      action: "moved",
      entityType: "lead",
      entityId: id,
      entityLabel: lead.name,
    });
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function moveLeadStage(id: string, stage: string) {
  await verifySession();

  const validated = LeadStageSchema.safeParse({ stage });
  if (!validated.success) return;

  const supabase = await createClient();
  const { data: lead } = await supabase
    .from("leads")
    .update(validated.data)
    .eq("id", id)
    .select("name")
    .single();

  if (lead) {
    await logActivity({
      action: "moved",
      entityType: "lead",
      entityId: id,
      entityLabel: lead.name,
    });
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLeadRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: lead } = await supabase
    .from("leads")
    .select("name")
    .eq("id", id)
    .single();

  await supabase.from("leads").delete().eq("id", id);

  if (lead) {
    await logActivity({
      action: "deleted",
      entityType: "lead",
      entityId: id,
      entityLabel: lead.name,
    });
  }

  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
