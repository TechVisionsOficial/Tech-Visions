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
          <span className="text-sm uppercase tracking-widest text-accent">
            O que fazemos
          </span>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Do site à campanha que traz o cliente.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-accent/40">
                <h3 className="font-display text-2xl">{service.title}</h3>
                <p className="mt-3 text-paper/65">{service.description}</p>
                <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-paper/60">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="h-1 w-1 rotate-45 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
