import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { whatsappLink } from "@/lib/whatsapp";
import { Arrow } from "./Arrow";
import { buttonPrimary, buttonSecondary } from "./buttons";

/** Closing band shared by the inner pages: one clear way to start a conversation. */
export function CTASection({
  title = "Pronto para um site e campanhas que trazem cliente de verdade?",
  text = "Conte um pouco sobre seu negócio e retornamos com um diagnóstico gratuito e uma proposta sob medida.",
  action = { href: "/contato", label: "Pedir diagnóstico" },
  whatsappMessage = "Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Tech Visions.",
}: {
  title?: string;
  text?: string;
  /** Primary action; external links (WhatsApp) open in a new tab. */
  action?: { href: string; label: string; external?: boolean };
  whatsappMessage?: string;
}) {
  return (
    <section className="px-6 py-24">
      <ScrollReveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 border-t border-white/10 pt-16 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="max-w-2xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-paper/65">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {action.external ? (
            <a href={action.href} target="_blank" rel="noopener noreferrer" className={`${buttonPrimary} px-7 py-3.5`}>
              {action.label} <Arrow />
            </a>
          ) : (
            <Link href={action.href} className={`${buttonPrimary} px-7 py-3.5`}>
              {action.label} <Arrow />
            </Link>
          )}
          {!action.external && (
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonSecondary} px-7 py-3.5`}
          >
            WhatsApp
          </a>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
