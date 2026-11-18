"use client";

import { useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { buttonPrimary } from "./buttons";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/whatsapp";
import { HELPDESK_NAME } from "@/lib/produtos";

type Status = "idle" | "sending" | "success" | "error";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// 16px on phones: iOS Safari zooms the page on focus for smaller inputs.
const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-base text-paper outline-none transition-colors duration-200 placeholder:text-paper/40 hover:border-white/25 focus:border-white/50 focus-visible:outline-none sm:text-sm";

const VARIANTS = {
  contato: {
    source: "site",
    submit: "Falar com a Tech Visions",
    successTitle: "Recebemos seu contato!",
    successText: "Em breve retornamos com o diagnóstico gratuito. Se preferir falar agora, chama a gente no WhatsApp.",
    whatsapp: (name: string) => `Olá! Acabei de enviar o formulário pelo site. Meu nome é ${name}.`,
  },
  helpdesk: {
    source: "helpdesk",
    submit: "Entrar na lista de espera",
    successTitle: "Você está na lista!",
    successText: `Avisamos você assim que o ${HELPDESK_NAME} abrir. Quer conversar antes? Chama a gente no WhatsApp.`,
    whatsapp: (name: string) => `Olá! Entrei na lista de espera do ${HELPDESK_NAME}. Meu nome é ${name}.`,
  },
} as const;

/**
 * Lead capture shared by the contact page and the helpdesk waitlist.
 * Every submission lands in the admin's Leads, tagged by `source`.
 */
export function LeadForm({ variant }: { variant: keyof typeof VARIANTS }) {
  const v = VARIANTS[variant];
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [extra, setExtra] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const isHelpdesk = variant === "helpdesk";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const message = isHelpdesk
      ? [`Lista de espera: ${HELPDESK_NAME}`, extra && `Empresa: ${extra}`].filter(Boolean).join(" · ")
      : extra || null;

    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .insert({ name, email, phone, message, source: v.source });

    setStatus(error ? "error" : "success");
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="w-full rounded-2xl border border-white/20 bg-white/[0.05] p-6"
          >
            <p className="font-display text-2xl font-medium">{v.successTitle}</p>
            <p className="mt-2 leading-relaxed text-paper/70">{v.successText}</p>
            <a
              href={whatsappLink(v.whatsapp(name))}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonPrimary} mt-5 px-6 py-3`}
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
            className="grid w-full gap-4 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-nome`} className="text-sm text-paper/70">
                Nome
              </label>
              <input
                id={`${uid}-nome`}
                name="name"
                autoComplete="name"
                required
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-whatsapp`} className="text-sm text-paper/70">
                WhatsApp
              </label>
              <input
                id={`${uid}-whatsapp`}
                type="tel"
                name="phone"
                autoComplete="tel-national"
                required
                placeholder="(11) 99999-9999"
                maxLength={16}
                value={phone}
                onChange={(e) => setPhone(formatPhoneBR(e.target.value))}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor={`${uid}-email`} className="text-sm text-paper/70">
                E-mail
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="voce@empresa.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor={`${uid}-extra`} className="text-sm text-paper/70">
                {isHelpdesk ? "Empresa (opcional)" : "Sobre o seu negócio"}
              </label>
              {isHelpdesk ? (
                <input
                  id={`${uid}-extra`}
                  name="company"
                  autoComplete="organization"
                  placeholder="Nome da empresa"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  className={fieldClass}
                />
              ) : (
                <textarea
                  id={`${uid}-extra`}
                  name="message"
                  rows={4}
                  placeholder="O que você vende, onde atende e o que quer melhorar"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  className={`${fieldClass} resize-none`}
                />
              )}
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-300 sm:col-span-2">
                Não conseguimos enviar agora. Tente de novo ou fale com a gente pelo WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`${buttonPrimary} w-full px-8 py-4 sm:col-span-2 sm:w-fit`}
            >
              {status === "sending" ? "Enviando…" : v.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
