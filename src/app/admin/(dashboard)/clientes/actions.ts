"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { ClientSchema, type ClientFormState } from "@/lib/validation/client";

function parseClientForm(formData: FormData) {
  return ClientSchema.safeParse({
    company_name: formData.get("company_name"),
    contact_name: formData.get("contact_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    segment: formData.get("segment"),
    status: formData.get("status"),
  });
}

export async function createClientRecord(
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await verifySession();

  const validated = parseClientForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("clients")
    .insert(validated.data)
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar o cliente." };
  }

  await logActivity({
    action: "created",
    entityType: "client",
    entityId: inserted?.id,
    entityLabel: validated.data.company_name,
  });

  revalidatePath("/admin/clientes");
  redirect("/admin/clientes");
}

export async function updateClientRecord(
  id: string,
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await verifySession();

  const validated = parseClientForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update(validated.data)
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar o cliente." };
  }

  await logActivity({
    action: "updated",
    entityType: "client",
    entityId: id,
    entityLabel: validated.data.company_name,
  });

  revalidatePath("/admin/clientes");
  revalidatePath(`/admin/clientes/${id}`);
  redirect("/admin/clientes");
}

export async function deleteClientRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("company_name")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("clients").delete().eq("id", id);

  revalidatePath("/admin/clientes");

  if (error) {
    redirect(`/admin/clientes/${id}?error=delete_failed`);
  }

  if (client) {
    await logActivity({
      action: "deleted",
      entityType: "client",
      entityId: id,
      entityLabel: client.company_name,
    });
  }

  redirect("/admin/clientes");
}
