"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import type { QuoteFormState } from "@/lib/validation/quote";

type QuoteDefaults = {
  client_id?: string | null;
  title?: string | null;
  value?: number | null;
  status?: string | null;
  valid_until?: string | null;
  notes?: string | null;
};

export function QuoteForm({
  action,
  clients,
  defaultValues,
}: {
  action: (state: QuoteFormState, formData: FormData) => Promise<QuoteFormState>;
  clients: { id: string; company_name: string }[];
  defaultValues?: QuoteDefaults;
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
      <FormField label="Título" htmlFor="title" errors={state?.errors?.title}>
        <input
          id="title"
          name="title"
          defaultValue={defaultValues?.title ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField label="Valor (R$)" htmlFor="value" errors={state?.errors?.value}>
        <input
          id="value"
          name="value"
          type="number"
          step="0.01"
          min="0"
          defaultValue={defaultValues?.value ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField label="Status" htmlFor="status" errors={state?.errors?.status}>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "draft"}
          className={inputClass}
        >
          <option value="draft">Rascunho</option>
          <option value="sent">Enviado</option>
          <option value="approved">Aprovado</option>
          <option value="rejected">Rejeitado</option>
        </select>
      </FormField>
      <FormField
        label="Válido até"
        htmlFor="valid_until"
        errors={state?.errors?.valid_until}
      >
        <input
          id="valid_until"
          name="valid_until"
          type="date"
          defaultValue={defaultValues?.valid_until ?? ""}
          className={inputClass}
        />
      </FormField>
      <FormField label="Notas" htmlFor="notes" errors={state?.errors?.notes}>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
          className={inputClass}
        />
      </FormField>
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
