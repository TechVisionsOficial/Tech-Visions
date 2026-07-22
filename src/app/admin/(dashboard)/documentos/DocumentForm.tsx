"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import type { DocumentFormState } from "@/lib/validation/document";

export function DocumentForm({
  action,
  clients,
}: {
  action: (
    state: DocumentFormState,
    formData: FormData
  ) => Promise<DocumentFormState>;
  clients: { id: string; company_name: string }[];
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
          defaultValue=""
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
      <FormField label="Arquivo" htmlFor="file" errors={state?.errors?.file}>
        <input
          id="file"
          name="file"
          type="file"
          required
          className={inputClass}
        />
        <p className="mt-1 text-xs text-ink/40">PDF, imagem ou Word — até 10MB.</p>
      </FormField>
      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
      >
        {pending ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
