"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HELPDESK, HELPDESK_NAME } from "@/lib/produtos";
import { Arrow } from "./Arrow";

/** Site-wide launch notice for the helpdesk. Hidden on the helpdesk page itself. */
export function AnnouncementBar() {
  const pathname = usePathname();
  const href = `/produtos/${HELPDESK.slug}`;
  if (pathname === href) return null;

  return (
    <Link
      href={href}
      className="group relative z-[60] flex items-center justify-center gap-2 border-b border-white/10 bg-paper px-4 py-2 text-center text-[13px] font-medium text-ink transition-colors hover:bg-white"
    >
      <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-paper">
        Novo
      </span>
      <span className="truncate sm:hidden">
        <span className="underline underline-offset-2">Lista de espera</span> do {HELPDESK_NAME}
      </span>
      <span className="hidden truncate sm:inline">
        {HELPDESK_NAME} está chegando. <span className="underline underline-offset-2">Entre na lista de espera</span>
      </span>
      <Arrow />
    </Link>
  );
}
