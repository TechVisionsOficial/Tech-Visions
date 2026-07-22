import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function ProjetosPage() {
  await getUser();
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*, clients(company_name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Projetos</h1>
        <Link
          href="/admin/projetos/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Novo projeto
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Projeto</Th>
              <Th>Cliente</Th>
              <Th>Etapa</Th>
              <Th>Prazo</Th>
            </tr>
          </thead>
          <tbody>
            {!projects?.length && (
              <EmptyRow colSpan={4} message="Nenhum projeto cadastrado ainda." />
            )}
            {projects?.map((project) => (
              <tr key={project.id}>
                <Td>
                  <Link
                    href={`/admin/projetos/${project.id}`}
                    className="font-medium hover:underline"
                  >
                    {project.name}
                  </Link>
                </Td>
                <Td>{project.clients?.company_name ?? "—"}</Td>
                <Td>
                  <StatusBadge status={project.stage} />
                </Td>
                <Td>{project.due_date || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
