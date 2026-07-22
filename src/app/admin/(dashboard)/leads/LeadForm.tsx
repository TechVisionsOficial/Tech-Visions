"use client";

import { useActionState, useState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { formatPhoneBR } from "@/lib/formatPhone";
import type { LeadFormState } from "@/lib/validation/lead";

type LeadDefaults = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: string | null;
};

export function LeadForm({
  action,
  defaultValues,
}: {
  action: (state: LeadFormState, formData: FormData) => Promise<LeadFormState>;
  defaultValues?: LeadDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [phone, setPhone] = useState(defaultValues?.phone ?? "");

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      <FormField label="Nome" htmlFor="name" errors={state?.errors?.name}>
        <input
          id="name"
          name="name"
          defaultValue={defaultValues?.name ?? ""}
          required
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
      <FormField label="Origem" htmlFor="source" errors={state?.errors?.source}>
        <select
          id="source"
          name="source"
          defaultValue={defaultValues?.source ?? "manual"}
          className={inputClass}
        >
          <option value="manual">Manual</option>
          <option value="site">Site</option>
          <option value="referral">Indicação</option>
          <option value="ads">Anúncios</option>
        </select>
      </FormField>
      <FormField label="Mensagem" htmlFor="message" errors={state?.errors?.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={defaultValues?.message ?? ""}
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
