"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export type NavGroup = { label?: string; items: { href: string; label: string }[] };

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
        active ? "bg-ink/[0.06] font-medium text-ink" : "text-ink/65 hover:bg-ink/[0.04] hover:text-ink"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 shrink-0 rotate-45 transition-colors duration-150 ${
          active ? "bg-ink" : "bg-transparent"
        }`}
      />
      {label}
    </Link>
  );
}

export function NavGroups({
  groups,
  onNavigate,
}: {
  groups: NavGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <nav aria-label="Painel" className="mt-8 flex flex-col gap-5">
      {groups.map((group, i) => {
        const links = group.items.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={isActive(pathname, item.href)}
            onNavigate={onNavigate}
          />
        ));

        if (!group.label) {
          return (
            <div key={`group-${i}`} className="flex flex-col gap-0.5">
              {links}
            </div>
          );
        }

        const isOpen = !collapsed[group.label];
        const panelId = `nav-${group.label.toLowerCase()}`;
        return (
          <div key={group.label} className="flex flex-col gap-0.5">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() =>
                setCollapsed((prev) => ({ ...prev, [group.label!]: isOpen }))
              }
              className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ink/40 transition-colors hover:text-ink/70"
            >
              {group.label}
              <motion.svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="h-3.5 w-3.5"
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              >
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-0.5">{links}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
