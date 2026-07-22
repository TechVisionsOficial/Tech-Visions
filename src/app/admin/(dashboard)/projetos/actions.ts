"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { ProjectSchema, type ProjectFormState } from "@/lib/validation/project";

function parseProjectForm(formData: FormData) {
  return ProjectSchema.safeParse({
    client_id: formData.get("client_id"),
    name: formData.get("name"),
    stage: formData.get("stage"),
    start_date: formData.get("start_date"),
    due_date: formData.get("due_date"),
  });
}

export async function createProjectRecord(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await verifySession();

  const validated = parseProjectForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { start_date, due_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("projects")
    .insert({
      ...rest,
      start_date: start_date || null,
      due_date: due_date || null,
    })
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar o projeto." };
  }

  await logActivity({
    action: "created",
    entityType: "project",
    entityId: inserted?.id,
    entityLabel: rest.name,
  });

  revalidatePath("/admin/projetos");
  redirect("/admin/projetos");
}

export async function updateProjectRecord(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await verifySession();

  const validated = parseProjectForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { start_date, due_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .update({ ...rest, start_date: start_date || null, due_date: due_date || null })
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar o projeto." };
  }

  await logActivity({
    action: "updated",
    entityType: "project",
    entityId: id,
    entityLabel: rest.name,
  });

  revalidatePath("/admin/projetos");
  revalidatePath(`/admin/projetos/${id}`);
  redirect("/admin/projetos");
}

export async function deleteProjectRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("name")
    .eq("id", id)
    .single();

  await supabase.from("projects").delete().eq("id", id);

  if (project) {
    await logActivity({
      action: "deleted",
      entityType: "project",
      entityId: id,
      entityLabel: project.name,
    });
  }

  revalidatePath("/admin/projetos");
  redirect("/admin/projetos");
}
