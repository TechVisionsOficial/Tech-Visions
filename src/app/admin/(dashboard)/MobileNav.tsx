"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { logout } from "@/app/admin/login/actions";
import { NavGroups, type NavGroup } from "./NavGroups";

export function MobileNav({ groups, email }: { groups: NavGroup[]; email?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="md:hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3">
          <span className="font-display text-lg font-medium">tech·visions</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-40 bg-ink/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.aside
                key="drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto bg-white px-5 py-6"
                style={{ maxWidth: "85vw" }}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg font-medium">tech·visions</span>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setOpen(false)}
                    aria-label="Fechar menu"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink"
                  >
                    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <NavGroups groups={groups} onNavigate={() => setOpen(false)} />

                <div className="mt-auto border-t border-ink/10 pt-4">
                  <p className="truncate text-xs text-ink/50">{email}</p>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="mt-2 text-sm text-ink/70 transition-colors hover:text-ink"
                    >
                      Sair
                    </button>
                  </form>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
