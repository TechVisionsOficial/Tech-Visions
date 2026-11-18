"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { NAV } from "@/lib/site";
import { buttonPrimary } from "./buttons";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Sticky header. It steps out of the way while reading down the page and comes
 * back as soon as the visitor scrolls up, so navigation is always one flick away.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Hide only after the first screen and only on a real downward move.
      if (y > 160 && y - lastY.current > 6) setHidden(true);
      else if (lastY.current - y > 6 || y < 160) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu whenever the route changes (adjusting state during render).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`sticky top-0 z-50 w-full transition-[transform,background-color,border-color] duration-300 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled || open ? "border-b border-white/10 bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-ink"}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Tech Visions, página inicial" className="flex select-none items-center rounded-md">
            <Image
              src="/brand/logo-wordmark.svg"
              alt="Tech Visions"
              width={164}
              height={36}
              priority
              draggable={false}
              className="h-9 w-auto select-none"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                    active ? "text-paper" : "text-paper/65 hover:text-paper"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-ativo"
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.06]"
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Link href="/contato" className={`${buttonPrimary} px-5 py-2 max-md:hidden`}>
            Fale conosco
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-paper transition-transform duration-200 ease-out-expo active:scale-[0.94] md:hidden"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ d: open ? "M2 1L16 13" : "M0 1H18" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              />
              <motion.path
                d="M0 7H18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                initial={false}
                animate={{ d: open ? "M2 13L16 1" : "M0 13H18" }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              />
            </svg>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="menu-mobile"
              aria-label="Principal"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                <Link href="/" className="rounded-lg px-3 py-3 text-base text-paper/80 transition-colors hover:bg-white/5 hover:text-paper">
                  Início
                </Link>
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * (i + 1), ease: EASE_OUT }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="block rounded-lg px-3 py-3 text-base text-paper/80 transition-colors hover:bg-white/5 hover:text-paper aria-[current=page]:bg-white/[0.06] aria-[current=page]:text-paper"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Link href="/contato" className={`${buttonPrimary} mt-2 px-5 py-3`}>
                  Fale conosco
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
