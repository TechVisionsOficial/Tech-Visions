// Content shared across the public pages. Only real facts live here:
// no invented metrics, clients, prices or testimonials.

export const NAV = [
  { href: "/servicos", label: "Serviços" },
  { href: "/produtos", label: "Produtos" },
  { href: "/cases", label: "Cases" },
  { href: "/contato", label: "Contato" },
] as const;

export const DIFERENCIAIS = [
  { title: "Tudo num lugar só", text: "Site, Meta Ads e Google Ads com o mesmo parceiro." },
  { title: "Direto com quem faz", text: "Você fala com quem desenvolve e gerencia, sem intermediário." },
  { title: "Ferramentas próprias", text: "Produtos como o Órbita, feitos aqui dentro." },
  { title: "Acompanhamento contínuo", text: "Suporte e otimização depois da entrega." },
];

export const SERVICOS = [
  {
    slug: "sites",
    title: "Desenvolvimento de sites",
    short: "Sites e landing pages rápidos, feitos para converter.",
    description:
      "Sites institucionais e landing pages rápidos, responsivos e otimizados para converter — construídos com tecnologia moderna.",
    points: ["Performance e SEO técnico", "Design responsivo", "Integração com formulários e analytics"],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    short: "Instagram e Facebook gerando demanda e leads.",
    description:
      "Campanhas no Instagram e Facebook desenhadas para gerar demanda, leads qualificados e vendas com o menor custo por resultado.",
    points: ["Segmentação e criativos testados", "Pixel e eventos configurados", "Otimização contínua de verba"],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    short: "Sua empresa na frente de quem já está procurando.",
    description:
      "Capturamos a intenção de compra na busca e no display, colocando sua empresa na frente de quem já está procurando.",
    points: ["Rede de Pesquisa e Display", "Remarketing estratégico", "Relatórios claros de ROI"],
  },
];
