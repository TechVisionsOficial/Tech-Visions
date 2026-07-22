"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#resultados", label: "Resultados" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled || mobileOpen ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={(e) => handleAnchorClick(e, "top")}
          className="flex select-none items-center"
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

        <nav className="hidden items-center gap-2 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href.slice(1))}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
                scrolled
                  ? "border-white/15 text-paper/80 hover:border-white/30 hover:text-paper"
                  : "border-transparent text-paper/70 hover:text-paper"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          onClick={(e) => handleAnchorClick(e, "contato")}
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-105 md:inline-block"
        >
          Fale conosco
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-paper md:hidden"
        >
          {mobileOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href.slice(1))}
              className="rounded-lg px-3 py-2.5 text-sm text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => handleAnchorClick(e, "contato")}
            className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-ink"
          >
            Fale conosco
          </a>
        </nav>
      )}
    </header>
  );
}
