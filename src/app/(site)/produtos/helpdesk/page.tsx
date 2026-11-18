import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Arrow } from "@/components/site/Arrow";
import { FadeIn } from "@/components/site/FadeIn";
import { FeatureBento } from "@/components/site/FeatureBento";
import { HelpdeskDemo } from "@/components/site/HelpdeskDemo";
import { LeadForm } from "@/components/site/LeadForm";
import { SplitHeading } from "@/components/site/SplitHeading";
import { buttonPrimary } from "@/components/site/buttons";
import { HELPDESK, HELPDESK_NAME } from "@/lib/produtos";

export const metadata: Metadata = {
  title: `${HELPDESK_NAME} — em breve`,
  description: HELPDESK.description,
  alternates: { canonical: `/produtos/${HELPDESK.slug}` },
};

// Who it serves, grouped from the confirmed feature list.
const PUBLICOS = [
  {
    title: "Para atender seus clientes",
    items: ["Mensagens do WhatsApp viram chamados", "Base de conhecimento para o cliente se virar sozinho", "IA sugerindo respostas"],
  },
  {
    title: "Para organizar sua equipe",
    items: ["Chamados internos no mesmo lugar", "Status e responsável em cada chamado", "Métricas de atendimento"],
  },
  {
    title: "Com a Tech Visions do lado",
    items: ["Abra chamados direto com a nossa equipe", "Suporte de quem desenvolveu a ferramenta"],
  },
];

export default function HelpdeskPage() {
  return (
    <>
      {/* Hero: the promise on the left, the waitlist on the right. */}
      <section className="px-6 pb-20 pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <Link href="/produtos" className="group inline-flex items-center gap-2 text-sm text-paper/60 transition-colors hover:text-paper">
              <Arrow back /> Produtos
            </Link>
          </FadeIn>

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <SplitHeading
                text={HELPDESK.tagline}
                className="font-display text-5xl font-medium leading-[1.03] tracking-[-0.035em] sm:text-6xl md:text-7xl"
              />
              <FadeIn delay={0.45}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">Em breve</span>
                  <span className="text-sm text-paper/60">{HELPDESK_NAME}</span>
                </div>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">{HELPDESK.description}</p>
              </FadeIn>
            </div>

            <FadeIn delay={0.55}>
              <div id="lista" className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <h2 className="font-display text-2xl font-medium">Entre na lista de espera</h2>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">
                  Avisamos você primeiro quando abrir. Sem compromisso.
                </p>
                <div className="mt-6">
                  <LeadForm variant="helpdesk" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The flow, played out. Morphs from the product card's visual. */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Do primeiro &ldquo;oi&rdquo; ao chamado resolvido.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper/65">
              A mensagem chega pelo WhatsApp, vira chamado, a IA sugere a resposta e o status acompanha
              cada passo.
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <ViewTransition name={`produto-${HELPDESK.slug}`} share="produto">
              <div>
                <HelpdeskDemo />
              </div>
            </ViewTransition>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Tudo o que o atendimento precisa, num lugar só.
            </h2>
          </ScrollReveal>
          <div className="mt-12">
            <FeatureBento />
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {PUBLICOS.map((publico, i) => (
            <div key={publico.title} className="bg-ink p-7 sm:p-8">
              <ScrollReveal delay={i * 0.08}>
                <h3 className="font-display text-2xl font-medium">{publico.title}</h3>
                <ul className="mt-5 space-y-3 text-paper/70">
                  {publico.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rotate-45 bg-paper" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="px-6 pb-28 pt-12">
        <ScrollReveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/10 pt-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Seja um dos primeiros a usar.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-paper/65">
              Entre na lista e acompanhe o lançamento de perto.
            </p>
          </div>
          <a href="#lista" className={`${buttonPrimary} px-7 py-3.5`}>
            Entrar na lista de espera <Arrow />
          </a>
        </ScrollReveal>
      </section>
    </>
  );
}
