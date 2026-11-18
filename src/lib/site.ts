// Content shared across the public pages. Only real facts live here:
// no invented metrics, clients, prices or testimonials.

export const NAV = [
  { href: "/servicos", label: "Serviços" },
  { href: "/produtos", label: "Produtos" },
  { href: "/cases", label: "Cases" },
  { href: "/contato", label: "Contato" },
] as const;

export const DIFERENCIAIS = [
  { title: "Tudo num lugar só", text: "Tecnologia, IA e marketing com o mesmo parceiro." },
  { title: "Direto com quem faz", text: "Você fala com quem desenvolve e gerencia, sem intermediário." },
  { title: "Ferramentas próprias", text: "Produtos como o Órbita, feitos aqui dentro." },
  { title: "Acompanhamento contínuo", text: "Suporte e otimização depois da entrega." },
];

export const SERVICOS = [
  {
    slug: "tecnologia",
    title: "Tecnologia e IA",
    short: "Sites, sistemas e automações, com inteligência artificial trabalhando junto.",
    description:
      "Desenvolvemos sites, landing pages e sistemas sob medida, e colocamos inteligência artificial e automação para trabalhar no seu atendimento e nos seus processos.",
    points: ["Sites e landing pages", "Sistemas e painéis sob medida", "Automações do dia a dia", "IA aplicada ao atendimento"],
  },
  {
    slug: "marketing",
    title: "Marketing e tráfego pago",
    short: "Campanhas que trazem cliente, não só clique.",
    description:
      "Planejamos e gerenciamos campanhas de tráfego pago para gerar demanda e leads qualificados, com rastreamento configurado e otimização contínua da verba.",
    points: ["Meta Ads (Instagram e Facebook)", "Google Ads (Pesquisa e Display)", "Pixel, eventos e analytics", "Otimização contínua e relatórios claros"],
  },
] as const;

// Clients the owner authorised to appear on the site. `work` is only filled
// where what we delivered is confirmed; leave it out otherwise.
export const CLIENTES: {
  name: string;
  segment: string;
  url: string;
  logo: { src: string; width: number; height: number; invert?: boolean };
  work?: string;
}[] = [
  {
    name: "AFCARROS",
    segment: "Loja de automóveis.",
    url: "https://afcarros.com.br",
    logo: { src: "/clientes/afcarros.png", width: 732, height: 119, invert: true },
    work: "Site profissional, Google Ads e Meta Ads",
  },
  {
    name: "C2R4 Global",
    segment: "Holding de estratégia, gestão e desenvolvimento de negócios.",
    url: "https://c2r4.com",
    logo: { src: "/clientes/c2r4-global.svg", width: 200, height: 50 },
    work: "Site institucional",
  },
  {
    name: "Take Time",
    segment: "Importação, logística e tecnologia, com loja própria no varejo e no atacado.",
    url: "https://www.taketime.store",
    logo: { src: "/clientes/take-time.svg", width: 570, height: 100 },
  },
];
