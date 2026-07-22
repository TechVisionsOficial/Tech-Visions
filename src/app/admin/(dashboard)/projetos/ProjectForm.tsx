"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import type { ProjectFormState } from "@/lib/validation/project";

type ProjectDefaults = {
  client_id?: string | null;
  name?: string | null;
  stage?: string | null;
  start_date?: string | null;
  due_date?: string | null;
};

export function ProjectForm({
  action,
  clients,
  defaultValues,
}: {
  action: (
    state: ProjectFormState,
    formData: FormData
  ) => Promise<ProjectFormState>;
  clients: { id: string; company_name: string }[];
  defaultValues?: ProjectDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <FormField
        label="Cliente"
        htmlFor="client_id"
        errors={state?.errors?.client_id}
      >
        <select
          id="client_id"
          name="client_id"
          defaultValue={defaultValues?.client_id ?? ""}
          required
          className={inputClass}
        >
          <option value="" disabled>
            Selecione um cliente
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.company_name}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Nome do projeto" htmlFor="name" errors={state?.errors?.name}>
        <input
          id="name"
          name="name"
          defaultValue={defaultValues?.name ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField label="Etapa" htmlFor="stage" errors={state?.errors?.stage}>
        <select
          id="stage"
          name="stage"
          defaultValue={defaultValues?.stage ?? "planning"}
          className={inputClass}
        >
          <option value="planning">Planejamento</option>
          <option value="in_progress">Em andamento</option>
          <option value="review">Revisão</option>
          <option value="done">Concluído</option>
          <option value="on_hold">Pausado</option>
        </select>
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Início"
          htmlFor="start_date"
          errors={state?.errors?.start_date}
        >
          <input
            id="start_date"
            name="start_date"
            type="date"
            defaultValue={defaultValues?.start_date ?? ""}
            className={inputClass}
          />
        </FormField>
        <FormField label="Prazo" htmlFor="due_date" errors={state?.errors?.due_date}>
          <input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={defaultValues?.due_date ?? ""}
            className={inputClass}
          />
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
