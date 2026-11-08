"use client";

import { MotionConfig, motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { primaryButton, secondaryButton } from "./buttons";

const DIFFERENTIALS = [
  { value: "Tudo integrado", label: "Site, Meta Ads e Google Ads num só parceiro" },
  { value: "Direto com quem faz", label: "Sem intermediários, sem enrolação" },
  { value: "Ferramentas próprias", label: "Produtos como o Órbita, feitos aqui dentro" },
  { value: "Suporte contínuo", label: "Acompanhamento depois da entrega" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// One authored entrance: each block rises a little, in reading order.
function enter(step: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.08 + step * 0.09, ease: EASE_OUT },
  };
}

export function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-6">
          <motion.h1
            {...enter(0)}
            className="max-w-3xl font-display text-5xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-6xl md:text-7xl"
          >
            Tecnologia que converte visitas em clientes.
          </motion.h1>

          <motion.p {...enter(1)} className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            A Tech Visions constrói sites de alta performance e gerencia
            campanhas de Meta e Google Ads que trazem resultado real, não só
            tráfego.
          </motion.p>

          <motion.div {...enter(2)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("contato");
              }}
              className={`${primaryButton} px-7 py-3.5`}
            >
              Pedir orçamento
            </a>
            <a
              href="#resultados"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("resultados");
              }}
              className={`${secondaryButton} px-7 py-3.5`}
            >
              Ver resultados
            </a>
          </motion.div>

          <motion.dl
            {...enter(3)}
            className="mt-16 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {DIFFERENTIALS.map((item) => (
              <div key={item.value}>
                <dt className="flex items-center gap-2.5 font-display text-lg font-medium sm:text-xl">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-paper" />
                  {item.value}
                </dt>
                <dd className="mt-1.5 pl-4 text-sm leading-relaxed text-paper/60">{item.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>
    </MotionConfig>
  );
}
