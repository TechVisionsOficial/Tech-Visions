import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const ANTES = ["Loja física", "Networking pessoal"];
const DEPOIS = ["Site profissional", "Google Ads", "Meta Ads", "Mais credibilidade"];

/** A real client's word, hung inside the shop: the quote, and the plate with what changed. */
export function ClienteDaCasa() {
  return (
    <section id="resultados" className="scroll-mt-16 bg-paper px-5 py-20 text-ink md:px-[4.5vw] md:py-28">
      <div className="mx-auto max-w-[1280px]">
        <ScrollReveal>
          <h2 className="letreiro max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)]">
            Resultado é o que a gente entrega.
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <figure className="flex flex-col justify-between">
            <blockquote className="text-2xl leading-snug md:text-[clamp(1.6rem,2.4vw,2.25rem)]">
              &ldquo;Gostaria de agradecer à equipe da Tech Visions por todo o
              atendimento, dedicação e suporte durante o desenvolvimento do
              projeto. Ficamos muito satisfeitos com o cuidado em entender nossas
              necessidades e entregar um resultado que superou nossas
              expectativas.&rdquo;
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-4 border-t-2 border-ink pt-6">
              <Image
                src="/cases/afcarros-alexandro.jpeg"
                alt="Alexandro Ferreira"
                width={64}
                height={64}
                className="h-16 w-16 rounded-[3px] object-cover"
              />
              <div>
                <p className="letreiro text-2xl">Alexandro Ferreira</p>
                <p className="mt-1 text-sm text-ink/60">Fundador da AFCARROS</p>
              </div>
            </figcaption>
          </figure>

          <article className="relative rounded-[3px] bg-ink p-6 text-paper md:p-8">
            <span aria-hidden className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-paper/35" />
            <span aria-hidden className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-paper/35" />
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="letreiro text-5xl">AFCARROS</h3>
              <span className="text-sm text-paper/60">Loja de automóveis</span>
            </div>

            <div className="mt-8 grid grid-cols-2 border-t border-paper/20 pt-6">
              <div className="pr-5">
                <p className="estencil text-2xl text-paper/55">Antes</p>
                <ul className="mt-3 space-y-2 text-sm text-paper/65">
                  {ANTES.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-l border-paper/20 pl-5">
                <p className="estencil text-2xl">Depois</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {DEPOIS.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden className="mt-[0.5em] h-1 w-1 shrink-0 rotate-45 bg-paper" />
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
              className="group mt-8 inline-flex items-center gap-1.5 rounded-[3px] font-display text-lg font-bold uppercase tracking-[0.06em] text-paper/80 transition-colors hover:text-paper"
            >
              Visitar o site
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
              </svg>
            </a>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
