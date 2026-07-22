import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";

const BEFORE = ["Loja física", "Networking pessoal"];
const AFTER = ["Site profissional", "Google Ads", "Meta Ads", "Mais credibilidade"];

export function Results() {
  return (
    <section id="resultados" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="text-sm uppercase tracking-widest text-accent">
            Clientes e resultados
          </span>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Resultado é o que a gente entrega.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-paper/50">Loja de Automóveis</span>
                  <span className="font-display text-xl">AFCARROS</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-xs uppercase tracking-widest text-paper/40">
                      Antes
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-paper/70">
                      {BEFORE.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                    <p className="text-xs uppercase tracking-widest text-accent">
                      Depois
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-paper/90">
                      {AFTER.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href="https://afcarros.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1 text-sm text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
                >
                  Visitar site →
                </a>
              </div>

              <div className="flex flex-col justify-between">
                <p className="text-lg text-paper/80">
                  &ldquo;Gostaria de agradecer à equipe da Tech Visions por todo o
                  atendimento, dedicação e suporte durante o desenvolvimento do
                  projeto. Ficamos muito satisfeitos com o cuidado em entender
                  nossas necessidades e entregar um resultado que superou nossas
                  expectativas.&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
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
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
