"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { buttonInk, buttonPaper } from "./buttons";
import { Wordmark } from "./Wordmark";

const LINKS = [
  { id: "servicos", label: "Serviços" },
  { id: "produtos", label: "Produtos" },
  { id: "resultados", label: "Resultados" },
  { id: "contato", label: "Contato" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function useEscape(open: boolean, close: () => void) {
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
}

function MenuButton({ open, onClick, controls }: { open: boolean; onClick: () => void; controls: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      aria-controls={controls}
      className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-ink text-paper transition-transform duration-200 ease-out-expo active:scale-[0.94] md:hidden"
    >
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
        <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </button>
  );
}

/** Full-screen menu on phones: the steel door closing over the page, links painted on it. */
function MenuSheet({ id, open, onClose }: { id: string; open: boolean; onClose: () => void }) {
  useEscape(open, onClose);

  function go(target: string) {
    onClose();
    // Wait a frame so the sheet starts leaving before the page moves.
    requestAnimationFrame(() => smoothScrollTo(target));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="steel-ribs fixed inset-0 z-[60] flex flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 md:hidden"
        >
          <div className="flex items-center justify-between">
            <Wordmark className="h-8 w-auto text-paper" />
            <button
              type="button"
              autoFocus
              onClick={onClose}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center rounded-[3px] bg-paper text-ink transition-transform duration-200 ease-out-expo active:scale-[0.94]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
          <nav aria-label="Seções" className="mt-12 flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.id);
                }}
                className="estencil border-b border-paper/15 py-4 text-5xl text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              go("contato");
            }}
            className={`${buttonPaper} mt-auto h-14 w-full`}
          >
            Pedir diagnóstico
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavLinks({ className }: { className: string }) {
  return (
    <nav aria-label="Seções" className="hidden items-center gap-1 md:flex">
      {LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(link.id);
          }}
          className={className}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

/**
 * The shop's sign: an off-white fascia carrying the wordmark at storefront scale.
 * It heads the shopfront scene; the steel housing under it is where the door rolls into.
 */
export function Letreiro({ formInputId }: { formInputId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <header id="letreiro" className="relative z-20 bg-paper text-ink">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3.5 md:px-[4.5vw] md:py-[clamp(1rem,2.2svh,1.75rem)]">
          <a href="#top" aria-label="Tech Visions, início" className="rounded-[3px]">
            <Wordmark className="h-12 w-auto md:h-[clamp(4rem,min(6.5vw,10.5svh),6.5rem)]" />
          </a>
          <div className="flex items-center gap-4">
            <NavLinks className="rounded-[3px] px-3 py-2 font-display font-bold uppercase tracking-[0.05em] text-ink/75 md:text-lg lg:text-2xl transition-colors duration-150 hover:bg-ink/[0.06] hover:text-ink" />
            <button
              type="button"
              onClick={() => document.getElementById(formInputId)?.focus()}
              className={`${buttonInk} h-12 px-5 max-lg:hidden`}
            >
              Pedir diagnóstico
            </button>
            <MenuButton open={open} onClick={() => setOpen(true)} controls="menu-fachada" />
          </div>
        </div>
        {/* The drum the door rolls into: coiled slats behind a steel lip. */}
        <div
          aria-hidden
          className="h-7 border-t-[3px] border-steel-edge bg-[repeating-linear-gradient(0deg,var(--steel-deep)_0_5px,var(--steel-dark)_5px_7px)]"
        />
      </header>
      <MenuSheet id="menu-fachada" open={open} onClose={() => setOpen(false)} />
    </MotionConfig>
  );
}

/** Compact sign that drops in once the shopfront has scrolled away. */
export function LetreiroFixo() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sign = document.getElementById("letreiro");
    if (!sign) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(sign);
    return () => io.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="fixed inset-x-0 top-0 z-50 border-b-[3px] border-steel-deep bg-paper text-ink"
          >
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 md:px-[4.5vw]">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="Tech Visions, voltar ao topo"
                className="rounded-[3px]"
              >
                <Wordmark className="h-7 w-auto" />
              </a>
              <div className="flex items-center gap-3">
                <NavLinks className="rounded-[3px] px-3 py-1.5 font-display text-lg font-bold uppercase tracking-[0.05em] text-ink/75 transition-colors duration-150 hover:bg-ink/[0.06] hover:text-ink" />
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("contato");
                  }}
                  className={`${buttonInk} h-10 px-4 text-base max-md:hidden`}
                >
                  Pedir diagnóstico
                </a>
                <MenuButton open={open} onClick={() => setOpen(true)} controls="menu-fixo" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <MenuSheet id="menu-fixo" open={open} onClose={() => setOpen(false)} />
    </MotionConfig>
  );
}
