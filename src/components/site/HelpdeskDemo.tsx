"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Status = "Aberto" | "Em andamento" | "Resolvido";

// Steps of the illustrated flow and how long each one holds (ms).
const STEPS = [1400, 1500, 2200, 1500, 3200] as const;
const LAST = STEPS.length - 1;

function StatusPill({ status }: { status: Status }) {
  const style =
    status === "Resolvido"
      ? "bg-paper text-ink"
      : status === "Em andamento"
        ? "bg-white/15 text-paper"
        : "border border-white/30 text-paper/80";
  return (
    <motion.span
      layout
      key={status}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}
    >
      {status === "Resolvido" && (
        <svg viewBox="0 0 12 12" fill="none" aria-hidden className="h-3 w-3">
          <path d="M2.5 6.2l2.2 2.2 4.8-4.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {status}
    </motion.span>
  );
}

function Bubble({ from, children }: { from: "cliente" | "equipe"; children: React.ReactNode }) {
  const mine = from === "equipe";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-snug ${
        mine ? "self-end rounded-br-md bg-paper text-ink" : "self-start rounded-bl-md bg-white/[0.08] text-paper"
      }`}
    >
      {children}
    </motion.div>
  );
}

function Typing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex w-fit items-center gap-1 self-start rounded-2xl rounded-bl-md bg-white/[0.08] px-3.5 py-3"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-paper/60"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );
}

/**
 * Illustrated flow of the helpdesk, played as one choreographed loop:
 * a WhatsApp message arrives, becomes a ticket, the AI suggests a reply,
 * the ticket moves through its states and gets resolved.
 * Fictional data, labelled as such. Plays only while on screen; with reduced
 * motion it shows the finished state.
 */
export function HelpdeskDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const shown = reduceMotion ? LAST : step;

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const t = setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), STEPS[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduceMotion]);

  const status: Status = shown >= 4 ? "Resolvido" : shown >= 3 ? "Em andamento" : "Aberto";

  return (
    <MotionConfig reducedMotion="user">
      <figure ref={ref} className="relative">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#202020] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <span className="text-xs text-paper/45">Chamados</span>
            <span className="w-10" aria-hidden />
          </div>

          <LayoutGroup>
            <div className="grid gap-px bg-white/10 md:grid-cols-[1fr_1.1fr]">
              {/* Conversation */}
              <div className="flex min-h-[280px] flex-col gap-2.5 bg-[#202020] p-4 sm:min-h-[320px]">
                <p className="mb-1 flex items-center gap-2 text-xs text-paper/50">
                  <WhatsIcon /> WhatsApp · Mariana (cliente)
                </p>
                <AnimatePresence mode="popLayout">
                  {shown === 0 && <Typing key="typing" />}
                </AnimatePresence>
                {shown >= 1 && (
                  <Bubble from="cliente">Oi! Meu pedido ainda não chegou, consegue verificar?</Bubble>
                )}
                {shown >= 4 && (
                  <Bubble from="equipe">Verifiquei: ele sai hoje. Te mandei o código de rastreio por aqui.</Bubble>
                )}
              </div>

              {/* Ticket */}
              <div className="flex min-h-[280px] flex-col gap-3 bg-[#1c1c1c] p-4 sm:min-h-[320px]">
                <AnimatePresence mode="popLayout">
                  {shown === 0 && (
                    <motion.p
                      key="vazio"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="m-auto text-sm text-paper/35"
                    >
                      Nenhum chamado aberto
                    </motion.p>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {shown >= 1 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs tabular-nums text-paper/50">Chamado #1042</p>
                        <StatusPill status={status} />
                      </div>
                      <p className="mt-2 text-sm font-medium">Pedido não entregue</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-paper/50">
                        <span>Origem: WhatsApp</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={shown >= 3 ? "ana" : "fila"}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                          >
                            {shown >= 3 ? "Atendente: Ana" : "Na fila"}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {shown >= 2 && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_OUT }}
                      className="rounded-xl border border-dashed border-white/20 p-3.5"
                    >
                      <p className="flex items-center gap-1.5 text-xs font-medium text-paper/70">
                        <SparkIcon /> Sugestão da IA
                      </p>
                      <motion.p
                        className="mt-1.5 text-sm leading-snug text-paper/85"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        animate={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 1.2, ease: "linear" }}
                      >
                        Consultar o rastreio e responder com o prazo de envio atualizado.
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {shown >= 4 && (
                    <motion.p
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.2 }}
                      className="mt-auto text-xs tabular-nums text-paper/50"
                    >
                      Resolvido em 4 min
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </LayoutGroup>
        </div>
        <figcaption className="mt-3 text-xs text-paper/45">
          Demonstração ilustrativa, com dados fictícios. O produto final pode ter outra aparência.
        </figcaption>
      </figure>
    </MotionConfig>
  );
}

function WhatsIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
      <path
        d="M8 1.75a6.25 6.25 0 00-5.4 9.4L1.75 14.25l3.2-.83A6.25 6.25 0 108 1.75z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5">
      <path d="M8 1.5l1.6 4.9L14.5 8l-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
