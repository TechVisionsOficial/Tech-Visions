"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { QuoteSchema, type QuoteFormState } from "@/lib/validation/quote";

function parseQuoteForm(formData: FormData) {
  return QuoteSchema.safeParse({
    client_id: formData.get("client_id"),
    title: formData.get("title"),
    value: formData.get("value"),
    status: formData.get("status"),
    valid_until: formData.get("valid_until"),
    notes: formData.get("notes"),
  });
}

export async function createQuoteRecord(
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  await verifySession();

  const validated = parseQuoteForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { valid_until, ...rest } = validated.data;
  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("quotes")
    .insert({ ...rest, valid_until: valid_until || null })
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar o orçamento." };
  }

  await logActivity({
    action: "created",
    entityType: "quote",
    entityId: inserted?.id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/orcamentos");
  redirect("/admin/orcamentos");
}

export async function updateQuoteRecord(
  id: string,
  _prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  await verifySession();

  const validated = parseQuoteForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { valid_until, ...rest } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("quotes")
    .update({ ...rest, valid_until: valid_until || null })
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar o orçamento." };
  }

  await logActivity({
    action: "updated",
    entityType: "quote",
    entityId: id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/orcamentos");
  revalidatePath(`/admin/orcamentos/${id}`);
  redirect("/admin/orcamentos");
}

export async function deleteQuoteRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: quote } = await supabase
    .from("quotes")
    .select("title")
    .eq("id", id)
    .single();

  await supabase.from("quotes").delete().eq("id", id);

  if (quote) {
    await logActivity({
      action: "deleted",
      entityType: "quote",
      entityId: id,
      entityLabel: quote.title,
    });
  }

  revalidatePath("/admin/orcamentos");
  redirect("/admin/orcamentos");
}
