import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { buttonInk } from "./buttons";
import { LABEL_GRID } from "./Quadro";
import { whatsappLink } from "@/lib/whatsapp";

const ORBITA = {
  nome: "Órbita",
  oQueE:
    "Programa para Mac e Windows que encontra negócios locais por ramo, cidade e raio, mostra quem não tem site e organiza cada contato até virar cliente.",
  inclui: [
    "Busca pela base oficial de empresas e pelo Google Maps",
    "Score de oportunidade e aviso de contato do contador",
    "WhatsApp, Instagram e e-mail a um clique",
    "Funil de leads com retornos e anotações",
  ],
  mensagem: "Olá! Quero conhecer o Órbita, o programa de prospecção da Tech Visions.",
};

/**
 * The shop window. The product sits behind the glass in a steel frame; its
 * plate below follows the same label grid as the services board.
 * The neighbouring window is papered over until the next product is ready.
 */
export function Vitrine() {
  return (
    <section id="produtos" className="scroll-mt-16 bg-ink px-2 py-20 md:px-[4.5vw] md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <h2 className="letreiro max-w-[18ch] text-[clamp(2.75rem,6vw,5.5rem)] text-paper">
            Ferramentas próprias para vender mais.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12">
          <figure className="rounded-[3px] border-[10px] border-steel-light bg-steel-deep p-2 shadow-[inset_0_0_0_2px_var(--steel-edge)] md:border-[14px] md:p-4">
            <Image
              src="/produtos/orbita-lista.png"
              alt="Tela do Órbita com uma lista de empresas, score de oportunidade, nota no Google e botões de WhatsApp"
              width={1600}
              height={1000}
              sizes="(max-width: 768px) 100vw, 1240px"
              className="w-full rounded-[2px]"
            />
            <figcaption className="sr-only">Órbita em modo demonstração, com empresas fictícias.</figcaption>
          </figure>

          <article className={`mt-6 grid gap-4 rounded-[3px] bg-paper p-5 text-ink md:gap-8 md:p-8 ${LABEL_GRID}`}>
            <div>
              <h3 className="letreiro text-5xl md:text-6xl">{ORBITA.nome}</h3>
              <p className="mt-2 font-display text-lg font-bold uppercase tracking-[0.06em] text-ink/60">
                Prospecção
              </p>
            </div>
            <p className="max-w-[52ch] leading-relaxed text-ink/75">{ORBITA.oQueE}</p>
            <div className="flex flex-col gap-5">
              <ul className="flex flex-col gap-2 text-sm text-ink/80">
                {ORBITA.inclui.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-ink" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(ORBITA.mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonInk} h-12 w-full px-5 sm:w-fit`}
              >
                Quero uma demonstração
              </a>
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal className="mt-6">
          <div className="flex min-h-40 items-center justify-center rounded-[3px] border-[10px] border-steel-light bg-[#e9e7e2] px-6 py-10 text-center text-ink md:border-[14px]">
            <p className="estencil text-4xl md:text-6xl">Em breve: novos produtos</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
