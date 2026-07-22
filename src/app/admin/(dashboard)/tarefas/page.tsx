import Link from "next/link";
import { getUser } from "@/lib/auth/dal";
import { createClient } from "@/lib/supabase/server";
import { DataTable, Th, Td, EmptyRow } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function TarefasPage() {
  await getUser();
  const supabase = await createClient();
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*, projects(name)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-medium">Tarefas</h1>
        <Link
          href="/admin/tarefas/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
        >
          Nova tarefa
        </Link>
      </div>

      <div className="mt-6">
        <DataTable>
          <thead>
            <tr>
              <Th>Tarefa</Th>
              <Th>Projeto</Th>
              <Th>Prazo</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {!tasks?.length && (
              <EmptyRow colSpan={4} message="Nenhuma tarefa cadastrada ainda." />
            )}
            {tasks?.map((task) => (
              <tr key={task.id}>
                <Td>
                  <Link
                    href={`/admin/tarefas/${task.id}`}
                    className="font-medium hover:underline"
                  >
                    {task.title}
                  </Link>
                </Td>
                <Td>{task.projects?.name ?? "—"}</Td>
                <Td>{task.due_date || "—"}</Td>
                <Td>
                  <StatusBadge status={task.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </div>
  );
}
