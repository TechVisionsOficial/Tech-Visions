import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Arrow } from "@/components/site/Arrow";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Cases",
  description: "Clientes da Tech Visions e o que mudou no negócio deles.",
  alternates: { canonical: "/cases" },
};

const ANTES = ["Loja física", "Networking pessoal"];
const DEPOIS = ["Site profissional", "Google Ads", "Meta Ads", "Mais credibilidade"];

export default function CasesPage() {
  return (
    <>
      <PageHero title="Resultado é o que a gente entrega." lead="Clientes reais, com o que mudou no negócio deles." />

      <section className="px-6 pb-12">
        <ScrollReveal className="mx-auto max-w-6xl">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-10">
              <h2 className="font-display text-3xl font-medium sm:text-4xl">AFCARROS</h2>
              <p className="text-sm text-paper/55">Loja de automóveis</p>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="border-b border-white/10 p-6 sm:p-10 lg:border-b-0 lg:border-r">
                <div className="grid grid-cols-2">
                  <div className="pr-6">
                    <p className="text-sm text-paper/45">Antes</p>
                    <ul className="mt-4 space-y-2.5 text-paper/60">
                      {ANTES.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l border-white/10 pl-6">
                    <p className="text-sm text-paper">Depois</p>
                    <ul className="mt-4 space-y-2.5">
                      {DEPOIS.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rotate-45 bg-paper" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href="https://afcarros.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
                >
                  Visitar afcarros.com.br <Arrow />
                </a>
              </div>

              <figure className="flex flex-col justify-between p-6 sm:p-10">
                <blockquote className="font-display text-2xl leading-snug text-paper/90 sm:text-3xl">
                  &ldquo;Gostaria de agradecer à equipe da Tech Visions por todo o atendimento, dedicação e
                  suporte durante o desenvolvimento do projeto. Ficamos muito satisfeitos com o cuidado em
                  entender nossas necessidades e entregar um resultado que superou nossas expectativas.&rdquo;
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6">
                  <Image
                    src="/cases/afcarros-alexandro.jpeg"
                    alt="Alexandro Ferreira"
                    width={128}
                    height={128}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Alexandro Ferreira</p>
                    <p className="text-sm text-paper/50">Fundador da AFCARROS</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </article>
        </ScrollReveal>
      </section>

      <CTASection title="Seu negócio pode ser o próximo case." />
    </>
  );
}
