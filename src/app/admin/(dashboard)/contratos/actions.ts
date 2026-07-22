"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { ContractSchema, type ContractFormState } from "@/lib/validation/contract";

function parseContractForm(formData: FormData) {
  return ContractSchema.safeParse({
    client_id: formData.get("client_id"),
    title: formData.get("title"),
    value: formData.get("value"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    status: formData.get("status"),
    notes: formData.get("notes"),
  });
}

export async function createContractRecord(
  _prevState: ContractFormState,
  formData: FormData
): Promise<ContractFormState> {
  await verifySession();

  const validated = parseContractForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { start_date, end_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("contracts")
    .insert({
      ...rest,
      start_date: start_date || null,
      end_date: end_date || null,
    })
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar o contrato." };
  }

  await logActivity({
    action: "created",
    entityType: "contract",
    entityId: inserted?.id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/contratos");
  redirect("/admin/contratos");
}

export async function updateContractRecord(
  id: string,
  _prevState: ContractFormState,
  formData: FormData
): Promise<ContractFormState> {
  await verifySession();

  const validated = parseContractForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { start_date, end_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("contracts")
    .update({ ...rest, start_date: start_date || null, end_date: end_date || null })
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar o contrato." };
  }

  await logActivity({
    action: "updated",
    entityType: "contract",
    entityId: id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/contratos");
  revalidatePath(`/admin/contratos/${id}`);
  redirect("/admin/contratos");
}

export async function deleteContractRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: contract } = await supabase
    .from("contracts")
    .select("title")
    .eq("id", id)
    .single();

  await supabase.from("contracts").delete().eq("id", id);

  if (contract) {
    await logActivity({
      action: "deleted",
      entityType: "contract",
      entityId: id,
      entityLabel: contract.title,
    });
  }

  revalidatePath("/admin/contratos");
  redirect("/admin/contratos");
}
