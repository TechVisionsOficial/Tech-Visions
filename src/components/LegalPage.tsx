import type { ReactNode } from "react";

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
    <div className="px-6 py-16">
      <article className="legal mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-paper/50">Última atualização: {updatedAt}</p>
        <div className="mt-10 space-y-5 leading-relaxed text-paper/75">{children}</div>
      </article>
    </div>
  );
}
