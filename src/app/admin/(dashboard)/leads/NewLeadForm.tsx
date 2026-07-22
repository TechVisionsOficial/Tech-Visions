"use client";

import { useActionState, useState } from "react";
import { inputClass } from "@/components/admin/FormField";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createLeadRecord } from "./actions";

export function NewLeadForm() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [state, formAction, pending] = useActionState(createLeadRecord, undefined);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper"
      >
        Novo lead
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="mb-6 grid gap-3 rounded-xl border border-ink/10 bg-white p-5 sm:grid-cols-2"
    >
      <input
        name="name"
        placeholder="Nome"
        required
        className={inputClass}
      />
      <input name="email" type="email" placeholder="E-mail" className={inputClass} />
      <input
        name="phone"
        value={phone}
        onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
        placeholder="(11) 99999-9999"
        maxLength={16}
        className={inputClass}
      />
      <select name="source" defaultValue="manual" className={inputClass}>
        <option value="manual">Manual</option>
        <option value="site">Site</option>
        <option value="referral">Indicação</option>
        <option value="ads">Anúncios</option>
      </select>
      <textarea
        name="message"
        placeholder="Mensagem"
        rows={2}
        className={`sm:col-span-2 ${inputClass}`}
      />
      {state?.message && (
        <p className="text-sm text-red-600 sm:col-span-2">{state.message}</p>
      )}
      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-50"
        >
          {pending ? "Salvando…" : "Salvar lead"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-ink/60 hover:text-ink"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
