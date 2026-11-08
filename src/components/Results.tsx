import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const BEFORE = ["Loja física", "Networking pessoal"];
const AFTER = ["Site profissional", "Google Ads", "Meta Ads", "Mais credibilidade"];

export function Results() {
  return (
    <section id="resultados" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            Resultado é o que a gente entrega.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <article className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:grid-cols-2">
            <div className="p-6 sm:p-10">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-medium">AFCARROS</h3>
                <span className="text-sm text-paper/50">Loja de Automóveis</span>
              </div>

              <div className="mt-8 grid grid-cols-2 border-t border-white/10 pt-6">
                <div className="pr-6">
                  <p className="text-sm text-paper/45">Antes</p>
                  <ul className="mt-3 space-y-2 text-sm text-paper/60">
                    {BEFORE.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-sm text-paper">Depois</p>
                  <ul className="mt-3 space-y-2 text-sm text-paper/90">
                    {AFTER.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rotate-45 bg-paper" />
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
                className="group mt-8 inline-flex items-center gap-1.5 rounded text-sm text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
              >
                Visitar site
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M5 11L11 5M6 5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <figure className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-10 lg:border-l lg:border-t-0">
              <blockquote className="text-lg leading-relaxed text-paper/85">
                &ldquo;Gostaria de agradecer à equipe da Tech Visions por todo o
                atendimento, dedicação e suporte durante o desenvolvimento do
                projeto. Ficamos muito satisfeitos com o cuidado em entender
                nossas necessidades e entregar um resultado que superou nossas
                expectativas.&rdquo;
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <Image
                  src="/cases/afcarros-alexandro.jpeg"
                  alt="Alexandro Ferreira"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Alexandro Ferreira</p>
                  <p className="text-sm text-paper/50">Fundador — AFCARROS</p>
                </div>
              </figcaption>
            </figure>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
