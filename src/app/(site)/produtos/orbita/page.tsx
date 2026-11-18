import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Arrow } from "@/components/site/Arrow";
import { CTASection } from "@/components/site/CTASection";
import { FadeIn } from "@/components/site/FadeIn";
import { ProductVisual } from "@/components/site/ProductCard";
import { SplitHeading } from "@/components/site/SplitHeading";
import { buttonPrimary } from "@/components/site/buttons";
import { ORBITA } from "@/lib/produtos";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Órbita — programa de prospecção",
  description: ORBITA.description,
  alternates: { canonical: `/produtos/${ORBITA.slug}` },
};

// The product's own description, read as the path a lead takes inside it.
const FLUXO = [
  { title: "Busque", text: "Escolha ramo, cidade e raio. O Órbita procura na base oficial de empresas e no Google Maps." },
  { title: "Priorize", text: "Veja quem não tem site, a nota no Google e o score de oportunidade de cada empresa." },
  { title: "Converse", text: "Chame no WhatsApp, Instagram ou e-mail com um clique, direto da lista." },
  { title: "Acompanhe", text: "Leve cada contato pelo funil com retornos e anotações até virar cliente." },
];

export default function OrbitaPage() {
  return (
    <>
      <section className="px-6 pb-16 pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <Link href="/produtos" className="group inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper">
              <Arrow back /> Produtos
            </Link>
          </FadeIn>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SplitHeading text={ORBITA.name} className="font-display text-6xl font-medium tracking-[-0.03em] sm:text-8xl" />
            <FadeIn delay={0.3}>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-paper/70">
                {ORBITA.tag} · Mac e Windows
              </span>
            </FadeIn>
          </div>
          <FadeIn delay={0.35}>
            <p className="mt-6 max-w-2xl font-display text-2xl text-paper sm:text-3xl">{ORBITA.tagline}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/70">{ORBITA.description}</p>
            <a
              href={whatsappLink(ORBITA.message)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonPrimary} mt-8 px-7 py-3.5`}
            >
              Quero uma demonstração <Arrow />
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-6xl">
          <ProductVisual produto={ORBITA} />
          <p className="mt-3 text-xs text-paper/45">Tela em modo demonstração, com empresas fictícias.</p>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Da busca ao cliente, num só programa.
            </h2>
          </ScrollReveal>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {FLUXO.map((etapa, i) => (
              <li key={etapa.title} className="bg-ink p-7">
                <ScrollReveal delay={i * 0.08}>
                  <span aria-hidden className="block h-2 w-2 rotate-45 bg-paper" />
                  <h3 className="mt-5 font-display text-2xl font-medium">{etapa.title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/65">{etapa.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        title="Quer ver o Órbita funcionando?"
        text="Peça uma demonstração pelo WhatsApp e tire suas dúvidas com quem desenvolveu o programa."
        action={{ href: whatsappLink(ORBITA.message), label: "Quero uma demonstração", external: true }}
      />
    </>
  );
}
