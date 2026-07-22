"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type NavGroup = { label?: string; items: { href: string; label: string }[] };

export function NavGroups({ groups }: { groups: NavGroup[] }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <nav className="mt-8 flex flex-col gap-5">
      {groups.map((group, i) => {
        if (!group.label) {
          return (
            <div key={`group-${i}`} className="flex flex-col gap-1">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          );
        }

        const isOpen = !collapsed[group.label];
        return (
          <div key={group.label} className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                setCollapsed((prev) => ({ ...prev, [group.label!]: isOpen }))
              }
              className="flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ink/40 transition-colors hover:text-ink/70"
            >
              {group.label}
              <motion.span
                className="inline-block text-sm"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                ›
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2 text-sm text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
