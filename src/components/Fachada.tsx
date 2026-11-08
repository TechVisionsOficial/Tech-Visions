"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { DiagnosticoForm } from "./DiagnosticoForm";
import { Letreiro } from "./Letreiro";

const PLACAS = [
  { title: "Tudo num lugar só", text: "Site, Meta Ads e Google Ads com o mesmo parceiro." },
  { title: "Direto com quem faz", text: "Você fala com quem desenvolve e gerencia, sem intermediário." },
  { title: "Ferramentas próprias", text: "Produtos como o Órbita, feitos aqui dentro." },
  { title: "Acompanhamento contínuo", text: "Suporte e otimização depois da entrega." },
];

const FORM_INPUT_ID = "diagnostico-nome";

/** The corrugated steel door with the headline painted on it. */
function Porta({ y, emFluxo }: { y?: MotionValue<string>; emFluxo?: boolean }) {
  return (
    <motion.div
      style={y ? { y } : undefined}
      className={`steel-ribs flex flex-col justify-between ${
        emFluxo ? "relative" : "absolute inset-0 z-10 will-change-transform"
      }`}
    >
      <div className="px-5 pb-8 pt-7 md:px-[3.5vw] md:pt-[clamp(2rem,5svh,4rem)]">
        <h1 className="estencil max-w-[14ch] text-[clamp(2.75rem,min(8vw,10svh),8rem)] text-paper">
          Abra as portas do seu negócio na internet.
        </h1>
        <p className="estencil mt-4 text-[clamp(1.25rem,min(2.2vw,3.2svh),2.25rem)] text-paper/75 md:mt-6">
          Sites · Meta Ads · Google Ads
        </p>
      </div>
      {/* Bottom bar: two grips and the lock, which carries the brand's losango. */}
      <div aria-hidden className="relative flex h-9 items-center justify-center border-t-2 border-steel-edge bg-steel-light">
        <span className="absolute left-[14%] h-2 w-12 rounded-full bg-steel-deep" />
        <span className="absolute right-[14%] h-2 w-12 rounded-full bg-steel-deep" />
        <span className="h-6 w-6 rotate-45 border-2 border-paper bg-ink" />
      </div>
    </motion.div>
  );
}

function Placas() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* The rail on the back wall the plates hang from. */}
      <div aria-hidden className="h-3 shrink-0 rounded-[2px] border-y-2 border-steel-edge bg-steel-light" />
      <ul className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 sm:mt-3 sm:gap-3 md:gap-5">
        {PLACAS.map((placa) => (
          <li
            key={placa.title}
            className="@container relative flex flex-col rounded-[3px] bg-ink px-3 pb-3 pt-6 text-paper sm:px-4 sm:pb-4 md:px-7 md:pb-6 md:pt-9"
          >
            {/* Two screws hold each plate to the wall. */}
            <span aria-hidden className="absolute left-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-paper/35" />
            <span aria-hidden className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-paper/35" />
            {/* Sized from the plate's own width so the longest word always fits;
                a fixed two-line block keeps every plate's text on one baseline. */}
            <p className="letreiro min-h-[1.84em] text-[clamp(1rem,9cqi,4rem)]">{placa.title}</p>
            <p className="mt-2 text-[0.8125rem] leading-snug text-paper/70 sm:text-sm md:mt-4 md:text-lg md:leading-relaxed">
              {placa.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The shopfront. The door sits half-raised over the shop; scrolling rolls it up
 * into the housing under the sign and the plates on the back wall come into view.
 * The balcão with the form is always in the gap below the door.
 * With reduced motion the door is drawn already open, above the shop, overlapping nothing.
 */
export function Fachada() {
  const sceneRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion;

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 0.85], ["0%", "-100%"]);

  return (
    <section
      id="top"
      ref={sceneRef}
      aria-label="Tech Visions"
      className={animated ? "relative h-[165svh]" : "relative"}
    >
      <div className={animated ? "sticky top-0 flex h-svh flex-col" : "flex min-h-svh flex-col"}>
        <Letreiro formInputId={FORM_INPUT_ID} />

        {/* The jambs either side of the door opening. */}
        <div className="flex min-h-0 flex-1 bg-steel-deep px-2 pb-2 md:px-[4.5vw] md:pb-0">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-paper text-ink">
            {!animated && <Porta emFluxo />}

            <div className="relative flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:p-[clamp(1.25rem,2.5vw,2.5rem)]">
              <Placas />
              {animated && <Porta y={y} />}
            </div>

            <div className="border-t-[6px] border-ink px-4 pb-5 pt-5 md:px-[clamp(1.5rem,3vw,3rem)] md:pb-[clamp(1.5rem,3svh,2.5rem)] md:pt-7">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-end lg:gap-10">
                <div>
                  <h2 className="letreiro text-4xl md:text-[clamp(2.5rem,4vw,4rem)]">Diagnóstico gratuito</h2>
                  <p className="mt-2 hidden max-w-[44ch] leading-relaxed text-ink/70 sm:block">
                    Conte quem você é e retornamos com um diagnóstico e uma proposta sob medida.
                  </p>
                </div>
                <DiagnosticoForm variant="balcao" nameInputId={FORM_INPUT_ID} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
