"use client";

import { motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";

const DIFFERENTIALS = [
  { value: "Tudo integrado", label: "Site, Meta Ads e Google Ads num só parceiro" },
  { value: "Direto com quem faz", label: "Sem intermediários, sem enrolação" },
  { value: "Suporte contínuo", label: "Acompanhamento depois da entrega" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-fit rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-widest text-paper/60"
        >
          Sites · Meta Ads · Google Ads
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Tecnologia que{" "}
          <span className="text-accent">converte visitas</span> em clientes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-lg text-paper/70"
        >
          A Tech Visions constrói sites de alta performance e gerencia
          campanhas de Meta e Google Ads que trazem resultado real, não só
          tráfego.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("contato");
            }}
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            Pedir orçamento
          </a>
          <a
            href="#resultados"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("resultados");
            }}
            className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:border-white/40"
          >
            Ver resultados
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 grid max-w-3xl grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
        >
          {DIFFERENTIALS.map((item) => (
            <div key={item.label}>
              <dt className="sr-only">{item.label}</dt>
              <dd className="font-display text-xl text-accent sm:text-2xl">
                {item.value}
              </dd>
              <dd className="mt-1 text-sm text-paper/60">{item.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
