"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { DocumentSchema, type DocumentFormState } from "@/lib/validation/document";

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

export async function createDocumentRecord(
  _prevState: DocumentFormState,
  formData: FormData
): Promise<DocumentFormState> {
  await verifySession();

  const validated = DocumentSchema.safeParse({
    client_id: formData.get("client_id"),
    file: formData.get("file"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { client_id, file } = validated.data;
  const supabase = await createClient();
  const path = `${client_id}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(path, file);

  if (uploadError) {
    return { message: "Não foi possível enviar o arquivo." };
  }

  const { error: insertError } = await supabase.from("documents").insert({
    client_id,
    file_name: file.name,
    storage_path: path,
    size_bytes: file.size,
    content_type: file.type || null,
  });

  if (insertError) {
    // Best-effort cleanup — an orphaned file with no metadata row is worse
    // than a failed upload the user can just retry.
    try {
      await supabase.storage.from("documents").remove([path]);
    } catch {
      // swallow — this is best-effort cleanup, not the primary failure
    }
    return { message: "Não foi possível salvar o documento." };
  }

  const { data: client } = await supabase
    .from("clients")
    .select("company_name")
    .eq("id", client_id)
    .single();

  await logActivity({
    action: "created",
    entityType: "document",
    entityLabel: `${file.name} (${client?.company_name ?? "cliente"})`,
  });

  revalidatePath("/admin/documentos");
  redirect("/admin/documentos");
}

export async function deleteDocumentRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: doc } = await supabase
    .from("documents")
    .select("storage_path, file_name")
    .eq("id", id)
    .single();

  if (!doc) redirect("/admin/documentos");

  const { error: removeError } = await supabase.storage
    .from("documents")
    .remove([doc.storage_path]);

  if (removeError) {
    redirect(`/admin/documentos/${id}?error=delete_failed`);
  }

  await supabase.from("documents").delete().eq("id", id);

  await logActivity({
    action: "deleted",
    entityType: "document",
    entityId: id,
    entityLabel: doc.file_name,
  });

  revalidatePath("/admin/documentos");
  redirect("/admin/documentos");
}
