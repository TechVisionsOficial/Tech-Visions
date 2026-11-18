import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CTASection } from "@/components/site/CTASection";
import { DrawLine } from "@/components/site/DrawLine";
import { PageHero } from "@/components/site/PageHero";
import { SERVICOS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Sites e landing pages, Meta Ads e Google Ads com o mesmo parceiro, direto com quem faz.",
  alternates: { canonical: "/servicos" },
};

// How a project runs, in the order the site already promises it:
// free diagnosis, tailored proposal, delivery, then ongoing follow-up.
const ETAPAS = [
  { title: "Diagnóstico gratuito", text: "Entendemos seu negócio, onde você atende e o que precisa melhorar." },
  { title: "Proposta sob medida", text: "Você recebe um plano com o que faz sentido para o seu momento." },
  { title: "Execução", text: "Site no ar e campanhas rodando, com você falando direto com quem faz." },
  { title: "Acompanhamento contínuo", text: "Suporte e otimização depois da entrega, não só até ela." },
];

export default function ServicosPage() {
  return (
    <>
      <PageHero
        title="Do site à campanha que traz o cliente."
        lead="Site, Meta Ads e Google Ads com o mesmo parceiro. Tudo conversa entre si: o anúncio leva para um site feito para converter, e o resultado volta para ajustar o anúncio."
      />

      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl border-t border-white/10">
          {SERVICOS.map((servico) => (
            <ScrollReveal key={servico.slug}>
              <article
                id={servico.slug}
                className="grid scroll-mt-28 gap-6 border-b border-white/10 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
              >
                <h2 className="font-display text-3xl font-medium tracking-[-0.01em] sm:text-4xl">{servico.title}</h2>
                <div>
                  <p className="max-w-[60ch] text-lg leading-relaxed text-paper/75">{servico.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                    {servico.points.map((point) => (
                      <li key={point} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-paper/75">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Como a gente trabalha.
            </h2>
          </ScrollReveal>
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* The line the steps sit on; it draws itself as the row comes into view. */}
            <DrawLine className="pointer-events-none absolute inset-x-0 top-[7px] hidden md:block" />
            {ETAPAS.map((etapa, i) => (
              <li key={etapa.title} className="relative">
                <ScrollReveal delay={i * 0.12}>
                  <span aria-hidden className="relative block h-3.5 w-3.5 rotate-45 border border-paper bg-ink" />
                  <h3 className="mt-6 font-display text-xl font-medium">{etapa.title}</h3>
                  <p className="mt-2 leading-relaxed text-paper/65">{etapa.text}</p>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}
