"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import {
  ANALYST_VALUES,
  ANALYST_LABELS,
  type MeetingFormState,
} from "@/lib/validation/meeting";

// datetime-local inputs work in the browser's own local timezone — correct
// by construction for this team, since the browser they use is set to
// Brazil time. Never do this conversion on the server (see src/lib/date.ts).
function toDatetimeLocal(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

type MeetingDefaults = {
  client_id?: string | null;
  title?: string | null;
  starts_at?: string | null;
  ends_at?: string | null;
  location?: string | null;
  notes?: string | null;
  analyst?: string | null;
};

export function MeetingForm({
  action,
  clients,
  defaultValues,
}: {
  action: (
    state: MeetingFormState,
    formData: FormData
  ) => Promise<MeetingFormState>;
  clients: { id: string; company_name: string }[];
  defaultValues?: MeetingDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <FormField
        label="Cliente (opcional)"
        htmlFor="client_id"
        errors={state?.errors?.client_id}
      >
        <select
          id="client_id"
          name="client_id"
          defaultValue={defaultValues?.client_id ?? ""}
          className={inputClass}
        >
          <option value="">Sem cliente (interno)</option>
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
      <FormField label="Analista" htmlFor="analyst" errors={state?.errors?.analyst}>
        <select
          id="analyst"
          name="analyst"
          defaultValue={defaultValues?.analyst ?? "felipe"}
          required
          className={inputClass}
        >
          {ANALYST_VALUES.map((value) => (
            <option key={value} value={value}>
              {ANALYST_LABELS[value]}
            </option>
          ))}
        </select>
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Início"
          htmlFor="starts_at"
          errors={state?.errors?.starts_at}
        >
          <input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            defaultValue={toDatetimeLocal(defaultValues?.starts_at)}
            required
            className={inputClass}
          />
        </FormField>
        <FormField
          label="Fim (opcional)"
          htmlFor="ends_at"
          errors={state?.errors?.ends_at}
        >
          <input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            defaultValue={toDatetimeLocal(defaultValues?.ends_at)}
            className={inputClass}
          />
        </FormField>
      </div>
      <FormField
        label="Local / link"
        htmlFor="location"
        errors={state?.errors?.location}
      >
        <input
          id="location"
          name="location"
          defaultValue={defaultValues?.location ?? ""}
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
