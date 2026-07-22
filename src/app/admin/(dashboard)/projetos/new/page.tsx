import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { ProjectForm } from "../ProjectForm";
import { createProjectRecord } from "../actions";

export default async function NewProjectPage() {
  await getUser();
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name")
    .order("company_name");

  return (
    <div>
      <h1 className="font-display text-2xl font-medium">Novo projeto</h1>
      <div className="mt-6">
        <ProjectForm action={createProjectRecord} clients={clients ?? []} />
      </div>
    </div>
  );
}
