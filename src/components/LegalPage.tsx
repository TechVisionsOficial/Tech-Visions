import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./Footer";

/** Layout das páginas legais (privacidade, termos): texto longo, fácil de ler. */
export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-white/10 px-6 py-5">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" aria-label="Voltar ao início">
            <Image
              src="/brand/logo-wordmark.svg"
              alt="Tech Visions"
              width={136}
              height={30}
              className="h-[30px] w-auto select-none"
            />
          </Link>
          <Link href="/" className="text-sm text-paper/60 transition-colors hover:text-paper">
            ← Voltar ao site
          </Link>
        </div>
      </header>
      <main className="flex-1 px-6 py-16">
        <article className="legal mx-auto max-w-3xl">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-sm text-paper/50">Última atualização: {updatedAt}</p>
          <div className="mt-10 space-y-5 leading-relaxed text-paper/75">{children}</div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
