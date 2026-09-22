"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

export function CTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .insert({ name, email, phone, message, source: "site" });

    setStatus(error ? "error" : "success");
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

          {status === "success" ? (
            <div
              role="status"
              className="w-full max-w-xl rounded-2xl border border-accent/30 bg-accent/5 p-6"
            >
              <p className="font-display text-2xl">Recebemos seu contato!</p>
              <p className="mt-2 text-paper/70">
                Em breve retornamos com o diagnóstico gratuito. Se preferir
                falar agora, chama a gente no WhatsApp.
              </p>
              <a
                href={whatsappLink(
                  `Olá! Acabei de enviar o formulário pelo site. Meu nome é ${name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
              >
                Falar no WhatsApp
              </a>
            </div>
          ) : (
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
            {status === "error" && (
              <p role="alert" className="text-sm text-red-400">
                Não conseguimos enviar agora. Tente de novo ou fale com a gente
                pelo WhatsApp.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-fit rounded-full bg-accent px-8 py-4 text-sm font-medium text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {status === "sending" ? "Enviando…" : "Falar com a Tech Visions"}
            </button>
          </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
