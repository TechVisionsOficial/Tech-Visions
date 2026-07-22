"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createClient } from "@/lib/supabase/client";

const CONTACT_EMAIL = "techvisions.oficial@gmail.com";

export function CTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const supabase = createClient();
    supabase
      .from("leads")
      .insert({ name, email, phone, message, source: "site" })
      .then(({ error }) => {
        if (error) console.error("Não foi possível registrar o lead:", error);
      });

    const subject = `Contato via site — ${name}`;
    const body = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\n\nMensagem:\n${message}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contato" className="scroll-mt-24 px-6 py-28">
      <ScrollReveal>
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-14">
          <span className="text-sm uppercase tracking-widest text-accent">
            Vamos conversar
          </span>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Pronto para um site e campanhas que trazem cliente de verdade?
          </h2>
          <p className="max-w-lg text-paper/65">
            Conte um pouco sobre seu negócio e retornamos com um diagnóstico
            gratuito e uma proposta sob medida.
          </p>

          <form onSubmit={handleSubmit} className="flex w-full max-w-xl flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <input
                type="text"
                required
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-accent/50"
              />
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-accent/50"
              />
              <input
                type="tel"
                required
                placeholder="(11) 99999-9999"
                value={phone}
                maxLength={16}
                onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                className="rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-accent/50"
              />
            </div>
            <textarea
              placeholder="Conte um pouco sobre seu negócio"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/40 outline-none transition-colors focus:border-accent/50"
            />
            <button
              type="submit"
              className="w-fit rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-105"
            >
              Falar com a Tech Visions
            </button>
          </form>
        </div>
      </ScrollReveal>
    </section>
  );
}
