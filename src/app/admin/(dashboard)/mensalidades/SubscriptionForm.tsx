"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import type { SubscriptionFormState } from "@/lib/validation/subscription";

type SubscriptionDefaults = {
  amount?: number | null;
  due_day?: number | null;
  status?: string | null;
};

export function SubscriptionForm({
  action,
  clients,
  clientName,
  defaultValues,
}: {
  action: (
    state: SubscriptionFormState,
    formData: FormData
  ) => Promise<SubscriptionFormState>;
  clients?: { id: string; company_name: string }[];
  clientName?: string;
  defaultValues?: SubscriptionDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {clients ? (
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
      ) : (
        <FormField label="Cliente" htmlFor="client_display">
          <input
            id="client_display"
            value={clientName ?? ""}
            disabled
            className={`${inputClass} bg-ink/5 text-ink/50`}
          />
          <p className="mt-1 text-xs text-ink/40">
            Não é possível trocar o cliente — cancele esta mensalidade e crie
            uma nova se necessário.
          </p>
        </FormField>
      )}

      <FormField label="Valor mensal (R$)" htmlFor="amount" errors={state?.errors?.amount}>
        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          defaultValue={defaultValues?.amount ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField
        label="Dia do vencimento (1–28)"
        htmlFor="due_day"
        errors={state?.errors?.due_day}
      >
        <input
          id="due_day"
          name="due_day"
          type="number"
          min="1"
          max="28"
          defaultValue={defaultValues?.due_day ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField label="Status" htmlFor="status" errors={state?.errors?.status}>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "active"}
          className={inputClass}
        >
          <option value="active">Ativa</option>
          <option value="paused">Pausada</option>
          <option value="cancelled">Cancelada</option>
        </select>
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
