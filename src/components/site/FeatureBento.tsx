"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";
import { HELPDESK } from "@/lib/produtos";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type Icon = (typeof HELPDESK.features)[number]["icon"];

// Bento spans on large screens (6-column grid): two wide, three thirds, one wide, one third.
const SPAN: Record<Icon, string> = {
  whatsapp: "lg:col-span-3",
  status: "lg:col-span-3",
  ia: "lg:col-span-2",
  interno: "lg:col-span-2",
  base: "lg:col-span-2",
  metricas: "lg:col-span-4",
  suporte: "lg:col-span-2",
};

function Glyph({ icon }: { icon: Icon }) {
  const common = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      {icon === "whatsapp" && <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3z" {...common} />}
      {icon === "status" && (
        <>
          <circle cx="6" cy="12" r="2.5" {...common} />
          <circle cx="18" cy="12" r="2.5" {...common} />
          <path d="M8.5 12h7" {...common} />
        </>
      )}
      {icon === "ia" && <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3z" {...common} />}
      {icon === "interno" && (
        <>
          <rect x="4" y="4" width="16" height="16" rx="3" {...common} />
          <path d="M8 9h8M8 13h8M8 17h5" {...common} />
        </>
      )}
      {icon === "base" && (
        <>
          <path d="M4 5.5A1.5 1.5 0 015.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13zM20 5.5A1.5 1.5 0 0018.5 4H13v16h5.5a1.5 1.5 0 001.5-1.5v-13z" {...common} />
        </>
      )}
      {icon === "metricas" && <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" {...common} />}
      {icon === "suporte" && (
        <>
          <path d="M4 13v-1a8 8 0 0116 0v1" {...common} />
          <rect x="3" y="13" width="4" height="6" rx="1.5" {...common} />
          <rect x="17" y="13" width="4" height="6" rx="1.5" {...common} />
        </>
      )}
    </svg>
  );
}

/** Status pill that walks through the three states on a loop while visible. */
function StatusCycle({ active }: { active: boolean }) {
  const states = ["Aberto", "Em andamento", "Resolvido"];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setI((n) => (n + 1) % states.length), 1400);
    return () => clearTimeout(t);
  }, [i, active, states.length]);
  return (
    <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
      {states.map((s, n) => (
        <span
          key={s}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-[background-color,color,border-color] duration-500 ${
            n === i ? "bg-paper text-ink" : "border border-white/15 text-paper/50"
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

/** Bars rise when the card comes into view: the shape of a metrics panel, no numbers claimed. */
function Bars({ active }: { active: boolean }) {
  const heights = [38, 62, 48, 80, 56, 92, 70, 100, 64, 84];
  return (
    <div className="mt-6 flex h-24 items-end gap-2" aria-hidden>
      {heights.map((h, n) => (
        <motion.span
          key={n}
          className="flex-1 origin-bottom rounded-t-sm bg-white/20 last:bg-paper"
          style={{ height: `${h}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: active ? 1 : 0 }}
          transition={{ duration: 0.8, delay: n * 0.05, ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}

/** Two message bubbles sliding in, the second answering the first. */
function Chat({ active }: { active: boolean }) {
  return (
    <div className="mt-6 flex flex-col gap-2" aria-hidden>
      <motion.span
        className="w-fit max-w-[80%] rounded-2xl rounded-bl-md bg-white/[0.08] px-3 py-2 text-xs text-paper/80"
        initial={{ opacity: 0, x: -10 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        Boa tarde, preciso de ajuda com meu pedido
      </motion.span>
      <motion.span
        className="w-fit max-w-[80%] self-end rounded-2xl rounded-br-md bg-paper px-3 py-2 text-xs text-ink"
        initial={{ opacity: 0, x: 10 }}
        animate={active ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
      >
        Chamado #1043 aberto, já vamos ver
      </motion.span>
    </div>
  );
}

/** The AI writing its suggestion, line by line. */
function Suggest({ active }: { active: boolean }) {
  return (
    <div className="mt-6 space-y-2" aria-hidden>
      {[92, 76, 54].map((w, n) => (
        <motion.span
          key={n}
          className="block h-2 origin-left rounded-full bg-white/20"
          style={{ width: `${w}%` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 0.2 + n * 0.25, ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: (typeof HELPDESK.features)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const active = inView || !!reduceMotion;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.06, ease: EASE_OUT }}
      className={`flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 ${SPAN[feature.icon]}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper">
        <Glyph icon={feature.icon} />
      </span>
      <h3 className="mt-5 font-display text-xl font-medium">{feature.title}</h3>
      <p className="mt-2 max-w-[48ch] leading-relaxed text-paper/65">{feature.text}</p>
      {feature.icon === "status" && <StatusCycle active={active && !reduceMotion} />}
      {feature.icon === "metricas" && <Bars active={active} />}
      {feature.icon === "whatsapp" && <Chat active={active} />}
      {feature.icon === "ia" && <Suggest active={active} />}
    </motion.li>
  );
}

/** The helpdesk's features as a bento: wide cards carry a small live demo of what they describe. */
export function FeatureBento() {
  return (
    <MotionConfig reducedMotion="user">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {HELPDESK.features.map((feature, i) => (
          <FeatureCard key={feature.icon} feature={feature} index={i} />
        ))}
      </ul>
    </MotionConfig>
  );
}
