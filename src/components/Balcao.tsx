import { DiagnosticoForm } from "./DiagnosticoForm";
import { ScrollReveal } from "./ScrollReveal";
import { whatsappLink } from "@/lib/whatsapp";

/** The counter at the back of the shop: the full contact form, on paper, against the steel wall. */
export function Balcao() {
  return (
    <section id="contato" className="scroll-mt-16 bg-steel-dark px-2 py-20 md:px-[4.5vw] md:py-28">
      <ScrollReveal className="mx-auto max-w-[1280px] rounded-[3px] border-t-[10px] border-ink bg-paper px-5 py-10 text-ink md:px-12 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div>
            <h2 className="letreiro text-[clamp(2.5rem,5vw,4.5rem)]">
              Pronto para um site e campanhas que trazem cliente de verdade?
            </h2>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-ink/70">
              Conte um pouco sobre seu negócio e retornamos com um diagnóstico
              gratuito e uma proposta sob medida.
            </p>
            <p className="mt-6 text-sm text-ink/60">
              Prefere conversar agora?{" "}
              <a
                href={whatsappLink("Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Tech Visions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-4"
              >
                Chama no WhatsApp
              </a>
              .
            </p>
          </div>
          <DiagnosticoForm variant="completo" />
        </div>
      </ScrollReveal>
    </section>
  );
}
