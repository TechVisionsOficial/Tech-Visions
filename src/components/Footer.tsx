import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="border-t-[6px] border-steel-light bg-steel-deep px-5 py-10 md:px-[4.5vw]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 sm:flex-row">
        <Wordmark className="h-7 w-auto text-paper/70" />
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <Link
            href="https://www.instagram.com/techvisionsoficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Tech Visions"
            className="rounded-[3px] text-paper/55 transition-colors hover:text-paper"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-5 w-5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </Link>
          <Link href="/privacidade" className="rounded-[3px] text-sm text-paper/55 transition-colors hover:text-paper">
            Privacidade
          </Link>
          <Link href="/termos" className="rounded-[3px] text-sm text-paper/55 transition-colors hover:text-paper">
            Termos
          </Link>
          <p className="text-sm text-paper/40">
            © {new Date().getFullYear()} Tech Visions. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
