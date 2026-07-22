import { notFound } from "next/navigation";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../ProjectForm";
import { updateProjectRecord, deleteProjectRecord } from "../actions";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await getUser();
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: project }, { data: clients }] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase.from("clients").select("id, company_name").order("company_name"),
  ]);

  if (!project) notFound();

  const boundUpdate = updateProjectRecord.bind(null, id);
  const boundDelete = deleteProjectRecord.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">{project.name}</h1>
      <div className="mt-6">
        <ProjectForm
          action={boundUpdate}
          clients={clients ?? []}
          defaultValues={project}
        />
      </div>
      <div className="mt-8 border-t border-ink/10 pt-6">
        <form action={boundDelete}>
          <button type="submit" className="text-sm text-red-600 hover:underline">
            Excluir projeto (e suas tarefas)
          </button>
        </form>
      </div>
    </div>
  );
}
