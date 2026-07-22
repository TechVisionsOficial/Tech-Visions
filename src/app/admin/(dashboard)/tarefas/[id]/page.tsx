import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "../TaskForm";
import { updateTaskRecord, deleteTaskRecord } from "../actions";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: task }, { data: projects }] = await Promise.all([
    supabase.from("tasks").select("*").eq("id", id).single(),
    supabase.from("projects").select("id, name").order("name"),
  ]);

  if (!task) notFound();

  const boundUpdate = updateTaskRecord.bind(null, id);
  const boundDelete = deleteTaskRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{task.title}</h1>
      <div className="mt-6">
        <TaskForm
          action={boundUpdate}
          projects={projects ?? []}
          defaultValues={task}
        />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir tarefa
          </button>
        </form>
      </div>
    </div>
  );
}
