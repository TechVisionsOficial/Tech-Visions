import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          src="/brand/logo-wordmark.svg"
          alt="Tech Visions"
          width={136}
          height={30}
          draggable={false}
          className="h-[30px] w-auto select-none opacity-70"
        />
        <div className="flex items-center gap-6">
          <Link
            href="https://www.instagram.com/techvisionsoficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Tech Visions"
            className="text-paper/50 transition-colors hover:text-paper"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </Link>
          <p className="text-sm text-paper/40">
            © {new Date().getFullYear()} Tech Visions. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
