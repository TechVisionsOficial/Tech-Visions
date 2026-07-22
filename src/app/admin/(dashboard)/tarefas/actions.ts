"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/activityLog/logActivity";
import { TaskSchema, type TaskFormState } from "@/lib/validation/task";

function parseTaskForm(formData: FormData) {
  return TaskSchema.safeParse({
    project_id: formData.get("project_id"),
    title: formData.get("title"),
    due_date: formData.get("due_date"),
    status: formData.get("status"),
  });
}

export async function createTaskRecord(
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  await verifySession();

  const validated = parseTaskForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { due_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { data: inserted, error } = await supabase
    .from("tasks")
    .insert({ ...rest, due_date: due_date || null })
    .select("id")
    .single();

  if (error) {
    return { message: "Não foi possível salvar a tarefa." };
  }

  await logActivity({
    action: "created",
    entityType: "task",
    entityId: inserted?.id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/tarefas");
  redirect("/admin/tarefas");
}

export async function updateTaskRecord(
  id: string,
  _prevState: TaskFormState,
  formData: FormData
): Promise<TaskFormState> {
  await verifySession();

  const validated = parseTaskForm(formData);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { due_date, ...rest } = validated.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("tasks")
    .update({ ...rest, due_date: due_date || null })
    .eq("id", id);

  if (error) {
    return { message: "Não foi possível atualizar a tarefa." };
  }

  await logActivity({
    action: "updated",
    entityType: "task",
    entityId: id,
    entityLabel: rest.title,
  });

  revalidatePath("/admin/tarefas");
  revalidatePath(`/admin/tarefas/${id}`);
  redirect("/admin/tarefas");
}

export async function deleteTaskRecord(id: string) {
  await verifySession();
  const supabase = await createClient();

  const { data: task } = await supabase
    .from("tasks")
    .select("title")
    .eq("id", id)
    .single();

  await supabase.from("tasks").delete().eq("id", id);

  if (task) {
    await logActivity({
      action: "deleted",
      entityType: "task",
      entityId: id,
      entityLabel: task.title,
    });
  }

  revalidatePath("/admin/tarefas");
  redirect("/admin/tarefas");
}
