---
name: Tech Visions
description: Sites e tráfego pago para negócios locais, apresentados como a fachada de um comércio paulistano.
colors:
  ink: "#1a1a1a"
  paper: "#f7f6f4"
  steel-deep: "#141414"
  steel-dark: "#222221"
  steel: "#2a2a29"
  steel-light: "#3a3a38"
  steel-edge: "#4a4a47"
  field-white: "#ffffff"
typography:
  display:
    fontFamily: "Big Shoulders Stencil, sans-serif"
    fontSize: "clamp(2.75rem, min(8vw, 10svh), 8rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.01em"
  title:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "clamp(2.75rem, 4.5vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.01em"
  body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0.08em"
  button:
    fontFamily: "Big Shoulders, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
  admin-body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
rounded:
  plate: "3px"
  inset: "2px"
spacing:
  rib: "28px"
  gutter-mobile: "8px"
  gutter-desktop: "4.5vw"
  section-y: "80px"
  section-y-md: "112px"
  board-x: "48px"
  board-y: "56px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    height: "56px"
    padding: "0 28px"
  button-ink-hover:
    backgroundColor: "{colors.steel-light}"
    textColor: "{colors.paper}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.plate}"
    height: "56px"
    padding: "0 28px"
  button-paper-hover:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
  input-balcao:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.plate}"
    height: "56px"
    padding: "0 16px"
  placa:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "36px 28px 24px"
  quadro:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.board-y} {spacing.board-x}"
  admin-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.admin-body}"
    rounded: "{rounded.plate}"
  admin-button-hover:
    backgroundColor: "{colors.steel-light}"
  admin-input:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "10px 14px"
  admin-nav-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.admin-body}"
    rounded: "{rounded.plate}"
    padding: "8px 12px"
---

# Design System: Tech Visions

## Overview

**Creative North Star: "Porta de aço"**

O site é a fachada de um comércio paulistano. Uma porta de enrolar de chapa ondulada grafite, um letreiro off-white com a marca em letra-caixa, avisos pintados em estêncil e placas de metal parafusadas na parede. A porta sobe com a rolagem para dentro do tambor sob o letreiro e o negócio abre para a rua; o formulário de diagnóstico fica no balcão, na fresta iluminada embaixo dela.

Tudo é tinta sobre chapa: o mundo é estritamente monocromático, construído com o grafite `ink`, o off-white `paper` e cinco tons de aço que são apenas variações do grafite. A profundidade vem de tom e de bordas grossas, não de sombra nem de brilho. O losango da marca é a peça de ferragem do sistema: trava da porta, marcador de lista, marcador do item ativo no painel.

O painel admin (modo Operate) herda o mesmo mundo de forma contida: tipo, paleta, densidade de trabalho e um único gesto emprestado da fachada, a placa de papel com losango marcando a página atual no trilho de aço. Nada de porta animada nem estêncil decorativo dentro do painel.

**Key Characteristics:**
- Chapa ondulada com nervuras em unidades inteiras de 28px, desenhadas a partir da borda inferior.
- Letreiro em Big Shoulders 800 caixa-alta; avisos em Big Shoulders Stencil; corpo em Inter.
- Placas retangulares de canto quase reto (3px), com dois parafusos quando penduradas na parede.
- Monocromático: grafite, aço e papel. Nenhuma cor de destaque, nenhum glow.
- Losango (quadrado girado 45°) como único ornamento recorrente.
- Movimento com uma só curva de saída e uma cena estática completa quando o movimento é reduzido.

## Colors

Paleta de chapa e tinta: todo valor é um grafite, um aço derivado dele ou o off-white do letreiro.

### Neutral
- **Grafite Tinta** (`ink`): fundo do corpo da página, placas penduradas, botão principal sobre papel, bordas superiores grossas dos quadros (10px) e do balcão (6px).
- **Papel do Letreiro** (`paper`): o letreiro, os quadros e o balcão; texto sobre aço e tinta; contorno da trava em losango. Também é a cor da seleção de texto no site.
- **Aço Profundo** (`steel-deep`): batentes da porta, rodapé, interior da moldura da vitrine, pegadores da porta.
- **Aço Escuro** (`steel-dark`): parede de fundo das seções Quadro e Balcão; o sulco de cada nervura.
- **Aço** (`steel`): face plana da chapa ondulada.
- **Aço Claro** (`steel-light`): crista de cada nervura, barra inferior da porta, moldura da vitrine, trilho das placas, hover do botão tinta, borda superior do rodapé.
- **Aresta de Aço** (`steel-edge`): lábios e arestas de metal (borda do tambor, barra da porta, trilho), barra de rolagem.
- **Branco de Campo** (`field-white`): só o interior dos campos de formulário e o hover do botão papel; nunca uma superfície.

Opacidades de `ink` e `paper` fazem a hierarquia de texto: corpo secundário em 70–75%, legendas em 55–60%, divisórias em 15–20%.

### Named Rules
**A Regra da Chapa e Tinta.** Nenhuma cor fora de grafite, aço e papel entra no site. Sem cor de destaque, sem gradiente decorativo, sem glow. O único gradiente permitido é o que desenha a chapa ondulada.

**A Regra do Estado Funcional.** No painel admin, cor aparece apenas para comunicar estado de dado (selos de status em tons claros de verde, âmbar, azul e vermelho; mensagens de erro em vermelho). Ela nunca decora, nunca vira botão e nunca sai do painel.

## Typography

**Display Font:** Big Shoulders Stencil (com sans-serif)
**Letreiro Font:** Big Shoulders, eixo óptico ativo (com sans-serif)
**Body Font:** Inter (com Arial, Helvetica, sans-serif)

**Character:** Letras altas e condensadas, apertadas como letras de chapa pintada, contra um Inter neutro e legível que faz a conversa. Uma família em três funções fixas: estêncil para avisos, letreiro para nomes e títulos, a mesma família em peso 700 espaçado para rótulos.

### Hierarchy
- **Display** (estêncil 800, `clamp(2.75rem, min(8vw, 10svh), 8rem)`, entrelinha 0.9, caixa-alta): o aviso pintado na porta, o 404, confirmações e erros do formulário, links do menu móvel. Largura máxima ~14ch.
- **Headline** (letreiro 800, `clamp(2.75rem, 6vw, 5.5rem)`, entrelinha 0.92, caixa-alta): títulos de seção, 16–18ch.
- **Title** (letreiro 800, `clamp(2.75rem, 4.5vw, 4.25rem)`, caixa-alta): nome de serviço, de produto, de cliente; título das placas, dimensionado pela largura da própria placa (`clamp(1rem, 9cqi, 4rem)`) com bloco fixo de duas linhas.
- **Body** (Inter 400, 1rem, entrelinha 1.625): texto corrido, 44–52ch. Depoimento em Inter maior (até 2.25rem, entrelinha justa).
- **Label** (letreiro 700, 0.875rem, 0.06–0.1em, caixa-alta): rótulos de campo, cabeçalhos de coluna do quadro e de tabela no painel, grupos da navegação do painel.
- **Button** (letreiro 800, 1.125rem, 0.04em, caixa-alta): todo botão do site.

### Named Rules
**A Regra das Três Escalas.** Estêncil é aviso, letreiro é nome, Inter é conversa. Nunca estêncil em texto corrido, nunca Inter em título de seção.

**A Regra da Caixa-Alta.** Toda ocorrência de Big Shoulders é caixa-alta; títulos quebram com `text-wrap: balance` e parágrafos com `pretty`.

## Layout

Página única em cenas empilhadas, cada uma uma parte da loja: fachada, quadro de serviços na parede, vitrine, cliente da casa, balcão, rodapé.

- **Fachada:** cena fixa de altura `svh` dentro de uma pista de rolagem de 165svh; letreiro em cima, batentes de aço dos lados (8px no celular, 4.5vw no desktop), vão em papel com o trilho e as quatro placas em grade 2×2, a porta sobreposta, e o balcão com o formulário curto embaixo.
- **Seções:** respiro vertical de 80px (112px a partir de md), margem lateral de 8px no celular para seções de parede (o quadro de papel quase encosta na borda) e 4.5vw no desktop; conteúdo limitado a 1280px (letreiro a 1440px).
- **Quadros de papel:** 20px × 40px no celular, 48px × 56px no desktop.
- **Grade de etiqueta:** serviços e produtos dividem a mesma grade de três colunas (3fr / 5fr / 4fr: nome, o que é, o que inclui); qualquer placa nova de oferta deve usá-la.
- **Repetição em unidades inteiras:** a nervura de 28px é a unidade de tudo que se repete na chapa; a barra inferior da porta sempre encontra uma nervura inteira.
- **Celular primeiro:** campos de 56px de altura e 16px de texto, alvos de 44px no mínimo, nada dependente de hover.
- **Painel:** trilho lateral de 240px em `ink`, área de trabalho em papel com 32px de margem; no celular o trilho vira menu.

## Elevation & Depth

O sistema é plano. Profundidade vem de material e tom: papel sobre aço, aço claro sobre aço profundo, bordas superiores grossas em `ink` que leem como a dobra de uma chapa, molduras de 10–14px em volta da vitrine. Sombra existe só em três situações funcionais.

### Shadow Vocabulary
- **Moldura embutida** (`box-shadow: inset 0 0 0 2px var(--steel-edge)`): a aresta interna da moldura da vitrine.
- **Peça flutuante** (`box-shadow: 0 10px 28px -8px rgba(0,0,0,0.55)`): apenas para elemento fixo que flutua sobre a página (botão do WhatsApp).
- **Foco de campo** (`box-shadow: 0 0 0 4px rgb(26 26 26 / 0.12)` no site, `0 0 0 3px rgb(26 26 26 / 0.1)` no painel): anel de foco dos campos.

### Named Rules
**A Regra da Chapa Plana.** Superfícies em repouso não têm sombra. Para separar, troque o tom ou engrosse a borda; sombra só para o que realmente flutua ou para foco.

## Shapes

Placas de metal cortadas: cantos de 3px em botões, campos, placas, quadros e molduras; 2px para peças internas (a imagem dentro da moldura, o trilho, o selo de status). Bordas são estruturais e grossas: 2px no campo e no botão contornado, 6px no balcão e no rodapé, 10px no topo dos quadros. Círculos só existem como ferragem: os parafusos das placas (6px, `paper` a 35%) e os pegadores da porta. O losango, um quadrado girado 45°, é o único ornamento: 24px na trava da porta com contorno de papel, 4–6px como marcador de lista e de item ativo.

## Components

### Buttons
Placas de letreiro: firmes, pintadas, sem enfeite.
- **Shape:** canto quase reto (3px); altura definida por quem usa (56px no formulário, 48px no letreiro, 40px no letreiro fixo).
- **Tinta:** `ink` com texto `paper`, para superfícies de papel (letreiro, balcão, quadro de produto).
- **Papel:** `paper` com texto `ink`, para superfícies de aço e escuras (menu móvel, 404, confirmação).
- **Hover / Press:** o hover apenas muda o tom da placa (tinta vai a aço claro; papel vai a branco); ao pressionar, escala 0.97 em 200ms com a curva de saída. Desabilitado: opacidade 60%.

### Cards / Containers
- **Placa pendurada:** fundo `ink`, texto `paper`, canto 3px, dois parafusos no topo; usada para os diferenciais e para o case. Pendura em um trilho de aço quando em série.
- **Quadro de parede:** fundo `paper` sobre parede `steel-dark`, borda superior `ink` de 10px, canto 3px; abriga serviços e o balcão completo.
- **Vitrine:** moldura de aço claro de 10–14px sobre aço profundo com aresta embutida; o produto real fica atrás do vidro.

### Inputs / Fields
- **Site (balcão):** 56px de altura, borda `ink` de 2px, fundo branco, texto 16px, canto 3px; rótulo em label de letreiro acima.
- **Foco:** anel suave de grafite (ver Elevation); o contorno global de foco é 2px `currentColor` com 3px de afastamento.
- **Estados pintados na placa:** sucesso vira uma placa `ink` com aviso em estêncil e botão papel para o WhatsApp; erro vira uma placa contornada em `ink` com aviso em estêncil. Nunca cor de alerta no site.
- **Painel:** borda `ink` a 20% (35% no hover, `ink` cheio no foco), fundo branco, 16px no celular e 14px a partir de sm.

### Navigation
- **Letreiro:** faixa `paper` com a marca em escala de fachada, links em label de letreiro a 75% (hover: tinta cheia sobre `ink` a 6%), botão tinta "Pedir diagnóstico"; abaixo, o tambor da porta (nervuras finas e lábio de aço).
- **Letreiro fixo:** versão compacta de 64px que desce quando a fachada sai da tela, com borda inferior de aço profundo.
- **Menu móvel:** a porta de aço fecha sobre a página (desce de cima em 450ms); links em estêncil 3rem separados por fios de papel a 15%; botão papel no rodapé.
- **Painel:** trilho `ink`; item ativo é uma placa `paper` com losango `ink`, inativos em papel a 65% com losango a 25%; grupos com rótulo em label de letreiro.

### Porta de aço (assinatura)
Chapa ondulada (`steel-ribs`) com o aviso em estêncil e a barra inferior com dois pegadores e a trava em losango. Cobre o vão da fachada e sobe até -100% ao longo de 85% da pista de rolagem. Com movimento reduzido, a porta é desenhada já aberta, acima da loja, sem sobrepor nada. A mesma chapa serve de fundo para o 404 ("porta fechada"), o login do painel e o menu móvel.

### Tabela (painel)
Contêiner branco com borda `ink` a 15%, cabeçalho em `paper` com label de letreiro e fio inferior `ink` de 2px, números tabulares, hover de linha em `ink` a 2.5%.

## Do's and Don'ts

### Do:
- **Do** construir toda superfície nova com `ink`, `paper` e a escala de aço; hierarquia de texto por opacidade.
- **Do** usar canto de 3px em toda placa, botão e campo; 2px só em peças internas.
- **Do** separar planos com tom e borda grossa (`ink` 6–10px no topo), não com sombra.
- **Do** usar o losango como marcador de lista, de item ativo e de trava; ele é a ferragem da marca.
- **Do** desenhar repetição na chapa em múltiplos inteiros de 28px.
- **Do** usar a curva `cubic-bezier(0.16, 1, 0.3, 1)` em todo movimento e oferecer a cena estática completa com `prefers-reduced-motion`.
- **Do** reutilizar a grade de etiqueta (3fr / 5fr / 4fr) para qualquer nova oferta de serviço ou produto.

### Don't:
- **Don't** introduzir cor de destaque, gradiente decorativo ou glow de fundo no site.
- **Don't** usar Big Shoulders fora da caixa-alta nem estêncil em texto corrido.
- **Don't** arredondar placas além de 3px; círculos só como parafuso ou pegador.
- **Don't** aplicar sombra em superfície em repouso; sombra só para elemento flutuante fixo e foco.
- **Don't** levar a porta animada, o estêncil decorativo ou a chapa ondulada para dentro da área de trabalho do painel; o painel empresta só a placa com losango.
- **Don't** pintar estado de formulário do site com cor de alerta; o estado é uma placa com aviso em estêncil.
