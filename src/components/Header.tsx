"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { primaryButton } from "./buttons";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#produtos", label: "Produtos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#contato", label: "Contato" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
  }

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          scrolled || mobileOpen ? "bg-ink/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            onClick={(e) => handleAnchorClick(e, "top")}
            className="flex select-none items-center rounded-md"
          >
            <Image
              src="/brand/logo-wordmark.svg"
              alt="Tech Visions"
              width={164}
              height={36}
              priority
              draggable={false}
              className="h-9 w-auto select-none"
            />
          </a>

          <nav aria-label="Seções" className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href.slice(1))}
                className="rounded-full px-4 py-1.5 text-sm text-paper/70 transition-colors duration-200 hover:bg-white/[0.06] hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            onClick={(e) => handleAnchorClick(e, "contato")}
            className={`${primaryButton} px-5 py-2 max-md:hidden`}
          >
            Fale conosco
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper transition-[transform,border-color] duration-200 ease-out-expo active:scale-[0.94] md:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ d: mobileOpen ? "M2 1L16 13" : "M0 1H18" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              />
              <motion.path
                d="M0 7H18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ d: mobileOpen ? "M2 13L16 1" : "M0 13H18" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              />
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.nav
              id="menu-mobile"
              aria-label="Seções"
              key="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href.slice(1))}
                    className="rounded-lg px-3 py-3 text-base text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  onClick={(e) => handleAnchorClick(e, "contato")}
                  className={`${primaryButton} mt-2 px-5 py-3`}
                >
                  Fale conosco
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
