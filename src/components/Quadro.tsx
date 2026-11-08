import { ScrollReveal } from "./ScrollReveal";

const SERVICOS = [
  {
    nome: "Sites",
    oQueE: "Sites institucionais e landing pages rápidos, responsivos e otimizados para converter, construídos com tecnologia moderna.",
    inclui: ["Performance e SEO técnico", "Design responsivo", "Formulários e analytics integrados"],
  },
  {
    nome: "Meta Ads",
    oQueE: "Campanhas no Instagram e Facebook desenhadas para gerar demanda, leads qualificados e vendas com o menor custo por resultado.",
    inclui: ["Segmentação e criativos testados", "Pixel e eventos configurados", "Otimização contínua de verba"],
  },
  {
    nome: "Google Ads",
    oQueE: "A gente captura a intenção de compra na busca e no display, colocando sua empresa na frente de quem já está procurando.",
    inclui: ["Rede de Pesquisa e Display", "Remarketing estratégico", "Relatórios claros de ROI"],
  },
];

// One label grid rules every service and product plate on the page.
export const LABEL_GRID = "md:grid-cols-[minmax(0,3fr)_minmax(0,5fr)_minmax(0,4fr)]";

/**
 * The services board hung on the shop wall: one row per service, read across
 * as name, what it is, what it includes.
 */
export function Quadro() {
  return (
    <section id="servicos" className="scroll-mt-16 bg-steel-dark px-2 py-20 md:px-[4.5vw] md:py-28">
      <ScrollReveal className="mx-auto max-w-[1280px] rounded-[3px] border-t-[10px] border-ink bg-paper px-5 py-10 text-ink md:px-12 md:py-14">
        <h2 className="letreiro max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)]">
          Do site à campanha, no mesmo balcão.
        </h2>

        <div className="mt-12">
          <div
            aria-hidden
            className={`hidden gap-8 border-b-2 border-ink pb-3 font-display text-sm font-bold uppercase tracking-[0.1em] text-ink/55 md:grid ${LABEL_GRID}`}
          >
            <span>Serviço</span>
            <span>O que é</span>
            <span>O que inclui</span>
          </div>
          <ul>
            {SERVICOS.map((servico) => (
              <li
                key={servico.nome}
                className={`grid gap-3 border-b border-ink/15 py-8 md:gap-8 md:py-10 ${LABEL_GRID}`}
              >
                <h3 className="letreiro text-5xl md:text-[clamp(2.75rem,4.5vw,4.25rem)]">{servico.nome}</h3>
                <p className="max-w-[52ch] leading-relaxed text-ink/75">{servico.oQueE}</p>
                <ul className="flex flex-col gap-2 text-sm text-ink/80">
                  {servico.inclui.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rotate-45 bg-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
