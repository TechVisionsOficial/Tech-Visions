"use client";

import { useId, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { buttonInk } from "./buttons";
import { formatPhoneBR } from "@/lib/formatPhone";
import { createClient } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// 16px text on phones: iOS Safari zooms the page on focus below that.
const fieldClass =
  "h-14 w-full rounded-[3px] border-2 border-ink bg-white px-4 text-base text-ink outline-none transition-[box-shadow] duration-150 placeholder:text-ink/40 focus:shadow-[0_0_0_4px_rgb(26_26_26/0.12)] focus-visible:outline-none";

const labelClass = "font-display text-sm font-bold uppercase tracking-[0.08em] text-ink/70";

/**
 * The diagnosis request, written on the balcão.
 * "balcao" is the short version in the shopfront (name + WhatsApp);
 * "completo" is the full counter at the end of the page.
 */
export function DiagnosticoForm({
  variant,
  nameInputId,
}: {
  variant: "balcao" | "completo";
  nameInputId?: string;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const full = variant === "completo";
  const ids = {
    name: nameInputId ?? `${uid}-nome`,
    email: `${uid}-email`,
    phone: `${uid}-whatsapp`,
    message: `${uid}-mensagem`,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      name,
      email: full ? email : null,
      phone,
      message: full ? message : null,
      source: "site",
    });

    setStatus(error ? "error" : "success");
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="w-full rounded-[3px] bg-ink p-6 text-paper"
          >
            {/* Confirmation is painted on the plate, like a notice on the door. */}
            <p className="estencil text-4xl sm:text-5xl">Recebemos seu contato</p>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-paper/75">
              Em breve retornamos com o diagnóstico gratuito. Se preferir falar
              agora, chama a gente no WhatsApp.
            </p>
            <a
              href={whatsappLink(`Olá! Acabei de enviar o formulário pelo site. Meu nome é ${name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center rounded-[3px] bg-paper px-5 font-display text-lg font-extrabold uppercase tracking-[0.04em] text-ink transition-[transform,background-color] duration-200 ease-out-expo hover:bg-white active:scale-[0.97]"
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
            className={
              full
                ? "grid w-full gap-4 sm:grid-cols-2"
                : "grid w-full gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
            }
          >
            <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
              <label htmlFor={ids.name} className={labelClass}>
                Nome
              </label>
              <input
                id={ids.name}
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </div>

            {full && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor={ids.email} className={labelClass}>
                  E-mail
                </label>
                <input
                  id={ids.email}
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
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor={ids.phone} className={labelClass}>
                WhatsApp
              </label>
              <input
                id={ids.phone}
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
            </div>

            {full && (
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor={ids.message} className={labelClass}>
                  Sobre o seu negócio
                </label>
                <textarea
                  id={ids.message}
                  name="message"
                  rows={4}
                  placeholder="O que você vende, onde atende e o que quer melhorar"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${fieldClass} h-auto resize-none py-3`}
                />
              </div>
            )}

            {status === "error" && (
              <div role="alert" className={`rounded-[3px] border-2 border-ink p-4 ${full ? "sm:col-span-2" : "sm:col-span-3"}`}>
                <p className="estencil text-2xl text-ink">Não deu para enviar</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">
                  Tente de novo em instantes ou fale com a gente direto pelo{" "}
                  <a
                    href={whatsappLink("Olá! Tentei enviar o formulário do site e não consegui.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-2"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className={`${buttonInk} h-14 px-7 ${full ? "w-full sm:col-span-2 sm:w-fit" : "w-full sm:w-auto"}`}
            >
              {status === "sending" ? "Enviando…" : full ? "Falar com a Tech Visions" : "Pedir diagnóstico"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
