import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { TaskForm } from "../TaskForm";
import { createTaskRecord } from "../actions";

export default async function NewTaskPage() {
  await getUser();
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .order("name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Nova tarefa</h1>
      <div className="mt-6">
        <TaskForm action={createTaskRecord} projects={projects ?? []} />
      </div>
    </div>
  );
}
