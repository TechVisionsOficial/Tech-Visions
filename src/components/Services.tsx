import { ScrollReveal } from "./ScrollReveal";

const SERVICES = [
  {
    title: "Desenvolvimento de sites",
    description:
      "Sites institucionais e landing pages rápidos, responsivos e otimizados para converter — construídos com tecnologia moderna.",
    points: ["Performance e SEO técnico", "Design responsivo", "Integração com formulários e analytics"],
  },
  {
    title: "Meta Ads",
    description:
      "Campanhas no Instagram e Facebook desenhadas para gerar demanda, leads qualificados e vendas com o menor custo por resultado.",
    points: ["Segmentação e criativos testados", "Pixel e eventos configurados", "Otimização contínua de verba"],
  },
  {
    title: "Google Ads",
    description:
      "Capturamos a intenção de compra na busca e no display, colocando sua empresa na frente de quem já está procurando.",
    points: ["Rede de Pesquisa e Display", "Remarketing estratégico", "Relatórios claros de ROI"],
  },
];

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            Do site à campanha que traz o cliente.
          </h2>
        </ScrollReveal>

        <ol className="mt-14 border-t border-white/10">
          {SERVICES.map((service, i) => (
            <li key={service.title} className="border-b border-white/10">
              <ScrollReveal
                delay={i * 0.06}
                className="grid gap-4 py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12"
              >
                <h3 className="font-display text-2xl font-medium sm:text-3xl">{service.title}</h3>
                <div>
                  <p className="max-w-[60ch] leading-relaxed text-paper/70">{service.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/55">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-paper/70" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
