"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import type { TaskFormState } from "@/lib/validation/task";

type TaskDefaults = {
  project_id?: string | null;
  title?: string | null;
  due_date?: string | null;
  status?: string | null;
};

export function TaskForm({
  action,
  projects,
  defaultValues,
}: {
  action: (state: TaskFormState, formData: FormData) => Promise<TaskFormState>;
  projects: { id: string; name: string }[];
  defaultValues?: TaskDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <FormField
        label="Projeto"
        htmlFor="project_id"
        errors={state?.errors?.project_id}
      >
        <select
          id="project_id"
          name="project_id"
          defaultValue={defaultValues?.project_id ?? ""}
          required
          className={inputClass}
        >
          <option value="" disabled>
            Selecione um projeto
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Título" htmlFor="title" errors={state?.errors?.title}>
        <input
          id="title"
          name="title"
          defaultValue={defaultValues?.title ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Prazo" htmlFor="due_date" errors={state?.errors?.due_date}>
          <input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={defaultValues?.due_date ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Status" htmlFor="status" errors={state?.errors?.status}>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "todo"}
            className={inputClass}
          >
            <option value="todo">A fazer</option>
            <option value="in_progress">Em andamento</option>
            <option value="done">Concluído</option>
          </select>
        </FormField>
      </div>
      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
      >
        {pending ? "Salvando…" : "Salvar"}
      </button>
    </form>
  );
}
