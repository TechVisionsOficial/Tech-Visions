import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Arrow } from "@/components/site/Arrow";
import { LeadForm } from "@/components/site/LeadForm";
import { PageHero } from "@/components/site/PageHero";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Peça um diagnóstico gratuito ou fale com a Tech Visions pelo WhatsApp.",
  alternates: { canonical: "/contato" },
};

const CANAIS = [
  {
    label: "WhatsApp",
    value: "(11) 92480-7054",
    href: whatsappLink("Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Tech Visions."),
  },
  { label: "Instagram", value: "@techvisionsoficial", href: "https://www.instagram.com/techvisionsoficial/" },
];

export default function ContatoPage() {
  return (
    <>
      <PageHero
        title="Vamos conversar."
        lead="Conte um pouco sobre seu negócio e retornamos com um diagnóstico gratuito e uma proposta sob medida."
      />

      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <ScrollReveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <LeadForm variant="contato" />
          </ScrollReveal>

          <ScrollReveal delay={0.08} className="flex flex-col gap-4">
            <p className="text-paper/65">Prefere falar direto?</p>
            {CANAIS.map((canal) => (
              <a
                key={canal.label}
                href={canal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-white/10 px-6 py-5 transition-[border-color,background-color] duration-300 hover:border-white/25 hover:bg-white/[0.04]"
              >
                <span>
                  <span className="block text-sm text-paper/50">{canal.label}</span>
                  <span className="mt-1 block font-display text-xl font-medium">{canal.value}</span>
                </span>
                <Arrow />
              </a>
            ))}
            <p className="mt-2 text-sm text-paper/50">São Paulo, SP · atendemos todo o Brasil.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
