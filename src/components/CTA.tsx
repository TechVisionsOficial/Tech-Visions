"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { primaryButton } from "./buttons";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

// text-base below sm: iOS Safari zooms the page on focus for inputs under 16px.
const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-paper outline-none transition-colors duration-200 placeholder:text-paper/40 hover:border-white/25 focus:border-white/50 focus-visible:outline-none sm:text-sm";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-14">
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            Pronto para um site e campanhas que trazem cliente de verdade?
          </h2>
          <p className="-mt-2 max-w-lg leading-relaxed text-paper/65">
            Conte um pouco sobre seu negócio e retornamos com um diagnóstico
            gratuito e uma proposta sob medida.
          </p>

          <MotionConfig reducedMotion="user">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  role="status"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="w-full max-w-xl rounded-2xl border border-white/20 bg-white/[0.05] p-6"
                >
                  <p className="font-display text-2xl font-medium">Recebemos seu contato!</p>
                  <p className="mt-2 leading-relaxed text-paper/70">
                    Em breve retornamos com o diagnóstico gratuito. Se preferir
                    falar agora, chama a gente no WhatsApp.
                  </p>
                  <a
                    href={whatsappLink(
                      `Olá! Acabei de enviar o formulário pelo site. Meu nome é ${name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${primaryButton} mt-5 px-6 py-3`}
                  >
                    Falar no WhatsApp
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="flex w-full max-w-xl flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-3">
                    <label className="flex flex-col">
                      <span className="sr-only">Nome</span>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="sr-only">E-mail</span>
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="sr-only">WhatsApp</span>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel-national"
                        required
                        placeholder="(11) 99999-9999"
                        value={phone}
                        maxLength={16}
                        onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  <label className="flex flex-col">
                    <span className="sr-only">Sobre o seu negócio</span>
                    <textarea
                      name="message"
                      placeholder="Conte um pouco sobre seu negócio"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${fieldClass} resize-none`}
                    />
                  </label>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-red-300">
                      Não conseguimos enviar agora. Tente de novo ou fale com a gente
                      pelo WhatsApp.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`${primaryButton} w-full px-8 py-4 sm:w-fit`}
                  >
                    {status === "sending" ? "Enviando…" : "Falar com a Tech Visions"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </MotionConfig>
        </div>
      </ScrollReveal>
    </section>
  );
}
