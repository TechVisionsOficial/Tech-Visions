import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ProductCard } from "@/components/site/ProductCard";
import { HELPDESK, ORBITA } from "@/lib/produtos";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Ferramentas próprias da Tech Visions: o novo helpdesk (em breve) e o Órbita, programa de prospecção.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <>
      <PageHero
        title="Ferramentas próprias para vender mais."
        lead="Produtos que a gente desenvolve aqui dentro, pensados para o dia a dia de quem vende e atende."
      />

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl space-y-6">
          <ScrollReveal>
            <ProductCard produto={HELPDESK} featured />
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <ProductCard produto={ORBITA} featured />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="flex items-center gap-2.5 pt-4 text-sm text-paper/50">
              <span aria-hidden className="h-1 w-1 rotate-45 bg-paper/50" />
              Novos produtos em breve.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        title="Quer saber qual ferramenta faz sentido para você?"
        text="Conte como é o seu negócio e a gente indica o que ajuda de verdade, sem empurrar produto."
      />
    </>
  );
}
