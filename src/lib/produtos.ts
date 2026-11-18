// The product catalog. The helpdesk's official name is still being decided:
// change HELPDESK_NAME and the slug below in one place when it is.

export const HELPDESK_NAME = "Helpdesk Tech Visions";

export type Produto = {
  slug: string;
  name: string;
  tag: string;
  status: "disponivel" | "em-breve";
  tagline: string;
  description: string;
};

export const HELPDESK: Produto & {
  features: { title: string; text: string; icon: "whatsapp" | "status" | "ia" | "interno" | "base" | "metricas" | "suporte" }[];
} = {
  slug: "helpdesk",
  name: HELPDESK_NAME,
  tag: "Atendimento",
  status: "em-breve",
  tagline: "Atendimento organizado, do WhatsApp ao chamado resolvido.",
  description:
    "Chamados, WhatsApp, base de conhecimento e métricas num lugar só, com IA ajudando a responder. Para atender seus clientes e organizar os chamados da sua própria equipe.",
  features: [
    { icon: "whatsapp", title: "Atendimento pelo WhatsApp", text: "As mensagens do WhatsApp viram chamados, sem copiar e colar conversa." },
    { icon: "status", title: "Chamados com status", text: "Cada chamado tem dono e situação: aberto, em andamento, resolvido." },
    { icon: "ia", title: "IA que ajuda nos chamados", text: "Sugestões de resposta e apoio para resolver mais rápido." },
    { icon: "interno", title: "Chamados internos", text: "Controle também os pedidos da sua própria equipe, no mesmo lugar." },
    { icon: "base", title: "Base de conhecimento", text: "Artigos e perguntas frequentes para o cliente resolver sozinho." },
    { icon: "metricas", title: "Métricas de atendimento", text: "Tempo de resposta, volume por atendente e prazos acompanhados." },
    { icon: "suporte", title: "Direto com a Tech Visions", text: "Abra chamados com a nossa equipe pela mesma ferramenta." },
  ],
};

export const ORBITA: Produto & { points: string[]; image: { src: string; alt: string }; message: string } = {
  slug: "orbita",
  name: "Órbita",
  tag: "Prospecção",
  status: "disponivel",
  tagline: "Encontre empresas que precisam ser vistas.",
  description:
    "Programa para Mac e Windows que encontra negócios locais por ramo, cidade e raio, mostra quem não tem site e organiza cada contato até virar cliente.",
  points: [
    "Busca pela base oficial de empresas e pelo Google Maps",
    "Score de oportunidade e aviso de contato do contador",
    "WhatsApp, Instagram e e-mail a um clique",
    "Funil de leads com retornos e anotações",
  ],
  image: {
    src: "/produtos/orbita-lista.png",
    alt: "Tela do Órbita com uma lista de empresas, score de oportunidade, nota no Google e botões de WhatsApp",
  },
  message: "Olá! Quero conhecer o Órbita, o programa de prospecção da Tech Visions.",
};
