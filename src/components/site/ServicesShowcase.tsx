"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { SERVICOS } from "@/lib/site";
import { Arrow } from "./Arrow";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Advances 0..last on a timer while `active`, then starts over. Frozen on the last step otherwise. */
function useLoop(active: boolean, durations: readonly number[]) {
  const [step, setStep] = useState(0);
  const last = durations.length - 1;
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), durations[step]);
    return () => clearTimeout(t);
  }, [active, step, last, durations]);
  return step;
}

const TECH_STEPS = [700, 500, 500, 500, 2600] as const;

/**
 * Technology: a page assembles itself block by block, then the AI chimes in
 * with a reply suggestion. Illustrative only.
 */
function TechVisual({ playing, still }: { playing: boolean; still: boolean }) {
  const loop = useLoop(playing, TECH_STEPS);
  const step = still ? TECH_STEPS.length - 1 : loop;
  const show = (n: number) => ({
    initial: false,
    animate: step >= n ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 },
    transition: { duration: 0.45, ease: EASE_OUT },
  });

  return (
    <div aria-hidden className="relative h-56 overflow-hidden rounded-xl border border-white/10 bg-[#202020]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-3 h-2 w-28 rounded-full bg-white/[0.07]" />
      </div>
      <div className="space-y-3 p-4">
        <motion.div {...show(1)} className="flex items-center justify-between">
          <span className="h-2.5 w-16 rounded-full bg-paper/70" />
          <span className="flex gap-2">
            <span className="h-2 w-8 rounded-full bg-white/20" />
            <span className="h-2 w-8 rounded-full bg-white/20" />
            <span className="h-2 w-8 rounded-full bg-white/20" />
          </span>
        </motion.div>
        <motion.div {...show(2)} className="space-y-2 pt-2">
          <span className="block h-3.5 w-3/4 rounded-full bg-paper/80" />
          <span className="block h-3.5 w-1/2 rounded-full bg-paper/80" />
          <span className="mt-3 block h-6 w-24 rounded-full bg-paper" />
        </motion.div>
        <motion.div {...show(3)} className="grid grid-cols-3 gap-2 pt-1">
          <span className="h-10 rounded-lg bg-white/[0.07]" />
          <span className="h-10 rounded-lg bg-white/[0.07]" />
          <span className="h-10 rounded-lg bg-white/[0.07]" />
        </motion.div>
      </div>
      <motion.div
        initial={false}
        animate={step >= 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.96 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/15 bg-ink/90 py-1.5 pl-2 pr-3.5 text-xs text-paper backdrop-blur"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paper text-ink">
          <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
            <path d="M8 1.5l1.6 4.9L14.5 8l-4.9 1.6L8 14.5l-1.6-4.9L1.5 8l4.9-1.6L8 1.5z" fill="currentColor" />
          </svg>
        </span>
        IA respondendo o cliente
      </motion.div>
    </div>
  );
}

const FUNIL = ["Anúncio", "Site", "Contato", "Cliente"];
const MKT_STEPS = [900, 900, 900, 2200] as const;

/**
 * Marketing: one visitor travels the path the agency builds end to end,
 * from the ad to the site to the conversation to a client.
 */
function MarketingVisual({ playing, still }: { playing: boolean; still: boolean }) {
  const loop = useLoop(playing, MKT_STEPS);
  const step = still ? MKT_STEPS.length - 1 : loop;

  return (
    <div aria-hidden className="flex h-56 flex-col justify-center rounded-xl border border-white/10 bg-[#202020] px-5 sm:px-8">
      <div className="relative">
        {/* Track, its filled part, and the traveller, laid between the first and last node centres. */}
        <div className="absolute inset-x-5 top-5 h-px bg-white/15" />
        <motion.div
          className="absolute left-5 top-5 h-px origin-left bg-paper"
          style={{ right: "1.25rem" }}
          initial={false}
          animate={{ scaleX: step / (FUNIL.length - 1) }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
        <div className="absolute inset-x-5 top-5">
          <motion.div
            className="w-full"
            initial={false}
            animate={{ x: `${(step / (FUNIL.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            <span className="block h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper shadow-[0_0_0_4px_rgba(26,26,26,1)]" />
          </motion.div>
        </div>

        <ol className="relative flex justify-between">
          {FUNIL.map((etapa, i) => {
            const reached = step >= i;
            return (
              <li key={etapa} className="flex w-10 flex-col items-center">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-[background-color,border-color,color] duration-500 ${
                    reached ? "border-paper bg-paper text-ink" : "border-white/20 bg-[#202020] text-paper/50"
                  }`}
                >
                  <FunnelIcon index={i} />
                </span>
                <span className={`mt-3 text-xs transition-colors duration-500 ${reached ? "text-paper" : "text-paper/45"}`}>
                  {etapa}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-8 text-center text-xs text-paper/45">Meta Ads · Google Ads · site · WhatsApp</p>
    </div>
  );
}

function FunnelIcon({ index }: { index: number }) {
  const common = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      {index === 0 && <path d="M3 8v4l9 4V4L3 8zM15 7.5a3 3 0 010 5" {...common} />}
      {index === 1 && (
        <>
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" {...common} />
          <path d="M2.5 7.5h15" {...common} />
        </>
      )}
      {index === 2 && <path d="M10 3a7 7 0 00-6.1 10.4L3 17l3.7-.9A7 7 0 1010 3z" {...common} />}
      {index === 3 && <path d="M4.5 10.5l3.5 3.5 7.5-8" {...common} />}
    </svg>
  );
}

function ServiceCard({ index }: { index: number }) {
  const servico = SERVICOS[index];
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduceMotion = !!useReducedMotion();
  const playing = inView && !reduceMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
    >
      <Link
        ref={ref}
        href={`/servicos#${servico.slug}`}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.05] sm:p-6"
      >
        {servico.slug === "tecnologia" ? (
          <TechVisual playing={playing} still={reduceMotion} />
        ) : (
          <MarketingVisual playing={playing} still={reduceMotion} />
        )}
        <div className="flex flex-1 flex-col px-1 pt-7">
          <h3 className="font-display text-3xl font-medium tracking-[-0.01em]">{servico.title}</h3>
          <p className="mt-3 max-w-[52ch] leading-relaxed text-paper/70">{servico.short}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {servico.points.map((point) => (
              <li key={point} className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-paper/70">
                {point}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-paper">
            Saiba mais <Arrow />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * The two service pillars side by side, each with a small live illustration,
 * and the ongoing follow-up that ties them together underneath.
 */
export function ServicesShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid gap-4 lg:grid-cols-2">
        {SERVICOS.map((servico, i) => (
          <ServiceCard key={servico.slug} index={i} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
        className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="flex items-center gap-3">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-paper" />
          <span className="font-display text-lg font-medium">Acompanhamento contínuo</span>
        </p>
        <p className="text-sm text-paper/60">Suporte e otimização depois da entrega, nas duas frentes.</p>
      </motion.div>
    </MotionConfig>
  );
}
