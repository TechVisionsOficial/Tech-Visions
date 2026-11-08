# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Site público:** donos e responsáveis de negócios que querem ser encontrados e vender pela internet — pequenos negócios locais (comércio e serviços como loja, salão, buffet, revenda) e empresas médias, em peso igual. Chegam pelo Google, Instagram, anúncios ou indicação, quase sempre pelo celular, avaliando se vale conversar.
- **Painel admin (`/admin`):** a equipe interna da Tech Visions (Felipe e Richard), no computador e instalado como app no iPhone, tocando o dia a dia: clientes, projetos, tarefas, leads, contratos, orçamentos, mensalidades, agenda, documentos e histórico.

## Product Purpose

A Tech Visions é uma agência de soluções digitais: desenvolve sites e landing pages, gerencia campanhas de Meta Ads e Google Ads, e cria ferramentas próprias. O site existe para que o visitante peça um diagnóstico gratuito e uma proposta — pelo formulário (que grava o lead direto no painel) ou pelo WhatsApp. Sucesso no site é contato qualificado; sucesso no painel é a equipe operar rápido e sem erro.

## Positioning

Confirmado pelo dono como diferenciais que um concorrente não pode afirmar com verdade:

- **Tudo num lugar só:** site, Meta Ads e Google Ads com o mesmo parceiro.
- **Direto com quem faz:** o cliente fala com quem desenvolve e gerencia as campanhas, sem intermediário.
- **Ferramentas próprias:** produtos como o Órbita, que a agência desenvolve e também usa para gerar resultado.
- **Acompanhamento contínuo:** suporte e otimização depois da entrega.

## Operating Context

- Contato: formulário do site (lead vai para o painel), WhatsApp Business (11) 92480-7054, Instagram @techvisionsoficial, Perfil de Empresa no Google. Sede em São Paulo, atende o Brasil.
- Produto próprio no site: **Órbita**, programa de prospecção para Mac e Windows (busca empresas por ramo/cidade/raio, mostra quem não tem site, organiza contatos até virar cliente). Demonstração é pedida pelo WhatsApp.
- O painel admin é usado no computador e como PWA instalado no iPhone.

## Capabilities and Constraints

- Next.js 16 com convenções que diferem do padrão (ler `node_modules/next/dist/docs/` antes de codar), Tailwind 4 com configuração em CSS, Supabase, hospedagem na Vercel.
- Conteúdo em português do Brasil.
- Páginas de Política de Privacidade e Termos de Uso existem (LGPD).
- Toda mudança vai por branch e Pull Request; o merge é do dono.

## Brand Commitments

- Nome **Tech Visions**; marca escrita `tech·visions` com o losango ◆ como separador (arquivos em `public/brand/`). O losango é elemento recorrente da identidade.
- **Monocromático:** grafite `#1a1a1a` e off-white `#f7f6f4`, sem cor de destaque (um verde-limão foi testado e removido a pedido do dono).
- **Sem brilhos ou glow de fundo** (testados e removidos a pedido do dono).
- Voz: português direto, próximo e sem exagero ("a gente", "sem enrolação"), confiante sem prometer número.

## Evidence on Hand

- **Case real AFCARROS** (loja de automóveis): depoimento de Alexandro Ferreira, fundador, com foto (`public/cases/afcarros-alexandro.jpeg`), lista antes/depois e link para afcarros.com.br.
- **Print do Órbita** em modo demonstração, com empresas fictícias (`public/produtos/orbita-lista.png`).
- Marca em vetor e raster em `public/brand/`.
- **Ausências que não podem ser inventadas:** métricas, números de resultado, outros depoimentos, logos de clientes, preços. Outros projetos em andamento não estão autorizados como case público.

## Product Principles

1. Nenhum dado falso: só prova real, e demonstração rotulada como demonstração.
2. Um parceiro do site à campanha — a experiência deve mostrar a integração, não serviços soltos.
3. Conversa direta: todo caminho leva a falar com quem faz, em poucos toques.
4. Acompanhamento depois da entrega é parte do produto, não um extra.
5. Respeito ao dado do cliente (LGPD) em qualquer coleta.

## Accessibility & Inclusion

- Respeitar `prefers-reduced-motion` (já implementado nas animações do site).
- Uso real no celular: campos com 16px para evitar zoom no iOS, alvos de toque confortáveis, nada dependendo de hover ou arraste.
