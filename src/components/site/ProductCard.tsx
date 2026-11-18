import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { HELPDESK, ORBITA, type Produto } from "@/lib/produtos";
import { Arrow } from "./Arrow";
import { HelpdeskVisual } from "./HelpdeskVisual";

export function ProductVisual({ produto }: { produto: Produto }) {
  return (
    <ViewTransition name={`produto-${produto.slug}`} share="produto">
      <div className="h-full">
        {produto.slug === ORBITA.slug ? (
          <Image
            src={ORBITA.image.src}
            alt={ORBITA.image.alt}
            width={1600}
            height={1000}
            sizes="(max-width: 768px) 100vw, 640px"
            className="w-full rounded-xl border border-white/10"
          />
        ) : (
          <HelpdeskVisual />
        )}
      </div>
    </ViewTransition>
  );
}

function StatusTag({ produto }: { produto: Produto }) {
  return produto.status === "em-breve" ? (
    <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">Em breve</span>
  ) : (
    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-paper/70">Disponível</span>
  );
}

/**
 * A product in the catalog. The whole card links to the product page, and its
 * visual morphs into the page's hero visual on navigation.
 */
export function ProductCard({ produto, featured = false }: { produto: Produto; featured?: boolean }) {
  return (
    <Link
      href={`/produtos/${produto.slug}`}
      className={`group grid items-center gap-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.05] sm:p-8 ${
        featured ? "md:grid-cols-[1fr_1.15fr] md:p-10" : ""
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className={`font-display font-medium ${featured ? "text-4xl" : "text-3xl"}`}>{produto.name}</h3>
          <StatusTag produto={produto} />
        </div>
        <p className="mt-1 text-sm text-paper/50">{produto.tag}</p>
        <p className="mt-4 text-lg text-paper">{produto.tagline}</p>
        <p className="mt-2 max-w-[56ch] leading-relaxed text-paper/65">{produto.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-paper">
          {produto.slug === HELPDESK.slug ? "Conhecer e entrar na lista" : "Conhecer o produto"}
          <Arrow />
        </span>
      </div>
      <div className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
        <ProductVisual produto={produto} />
      </div>
    </Link>
  );
}
