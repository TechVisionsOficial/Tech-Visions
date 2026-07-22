"use client";

import { useActionState, useState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { formatPhoneBR } from "@/lib/formatPhone";
import type { ClientFormState } from "@/lib/validation/client";

type ClientDefaults = {
  company_name?: string | null;
  contact_name?: string | null;
  email?: string | null;
  phone?: string | null;
  segment?: string | null;
  status?: string | null;
};

export function ClientForm({
  action,
  defaultValues,
}: {
  action: (
    state: ClientFormState,
    formData: FormData
  ) => Promise<ClientFormState>;
  defaultValues?: ClientDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [phone, setPhone] = useState(defaultValues?.phone ?? "");

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <FormField
        label="Empresa"
        htmlFor="company_name"
        errors={state?.errors?.company_name}
      >
        <input
          id="company_name"
          name="company_name"
          defaultValue={defaultValues?.company_name ?? ""}
          required
          className={inputClass}
        />
      </FormField>
      <FormField
        label="Contato"
        htmlFor="contact_name"
        errors={state?.errors?.contact_name}
      >
        <input
          id="contact_name"
          name="contact_name"
          defaultValue={defaultValues?.contact_name ?? ""}
          className={inputClass}
        />
      </FormField>
      <FormField label="E-mail" htmlFor="email" errors={state?.errors?.email}>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={defaultValues?.email ?? ""}
          className={inputClass}
        />
      </FormField>
      <FormField label="Telefone" htmlFor="phone" errors={state?.errors?.phone}>
        <input
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
          placeholder="(11) 99999-9999"
          maxLength={16}
          className={inputClass}
        />
      </FormField>
      <FormField
        label="Segmento"
        htmlFor="segment"
        errors={state?.errors?.segment}
      >
        <input
          id="segment"
          name="segment"
          defaultValue={defaultValues?.segment ?? ""}
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
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="prospect">Prospect</option>
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
