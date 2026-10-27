import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso — Órbita | Tech Visions",
  description: "Regras de uso do Órbita, o programa de prospecção da Tech Visions.",
  alternates: { canonical: "/termos" },
};

export default function Termos() {
  return (
    <LegalPage title="Termos de Uso do Órbita" updatedAt="27 de outubro de 2026">
      <p>
        Estes termos valem para quem usa o <strong>Órbita</strong>, programa de prospecção da{" "}
        <strong>Tech Visions</strong>. Ao instalar e entrar no Órbita, você concorda com eles. O tratamento
        de dados pessoais está descrito na nossa <Link href="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>1. A licença</h2>
      <ul>
        <li>
          A licença é <strong>pessoal</strong>: cada pessoa usa a própria conta Google, cadastrada pela
          empresa contratante, e não pode compartilhá-la.
        </li>
        <li>
          Cada licença pode ser usada no número de computadores definido no plano. O administrador da sua
          empresa ou a Tech Visions podem desconectar computadores.
        </li>
        <li>
          O programa confere a licença pela internet e funciona até 7 dias sem conexão. Licenças vencidas,
          suspensas ou canceladas deixam de funcionar na próxima verificação.
        </li>
        <li>
          O Órbita continua sendo da Tech Visions. Não é permitido copiar, modificar, revender ou tentar
          contornar o controle de licenças.
        </li>
      </ul>

      <h2>2. Uso permitido</h2>
      <p>O Órbita serve para encontrar e acompanhar oportunidades comerciais com empresas. Não é permitido:</p>
      <ul>
        <li>enviar mensagens em massa (spam) ou automatizar contatos com os dados obtidos;</li>
        <li>revender, publicar ou repassar as listas geradas;</li>
        <li>usar os dados para fins ilícitos, discriminatórios ou incompatíveis com a LGPD;</li>
        <li>insistir no contato com quem pediu para não ser contatado.</li>
      </ul>
      <p>
        Você é responsável pela forma como aborda as empresas encontradas e por cumprir a LGPD e as regras
        das plataformas que usar (WhatsApp, Instagram, e-mail).
      </p>

      <h2>3. Fontes de dados</h2>
      <p>
        O Órbita reúne informações públicas da Receita Federal, do IBGE, dos sites das empresas e, no modo
        Google Maps, do próprio Google Maps, consultado a partir do seu computador. Essas informações podem
        estar desatualizadas ou incompletas; o Órbita indica quando um contato parece ser de outra pessoa
        (por exemplo, do contador), mas não garante a exatidão dos dados.
      </p>
      <p>
        O modo Google Maps tem limite de uso para evitar bloqueios e para de funcionar se o Google pedir
        verificação; nesse caso o programa usa a busca padrão. O uso da chave do Google Places, quando
        cadastrada, segue as condições e a cobrança do Google na conta de quem a cadastrou.
      </p>

      <h2>4. Pagamento, suspensão e cancelamento</h2>
      <p>
        Plano, valor, número de licenças e validade são combinados na contratação. A falta de pagamento ou
        o uso em desacordo com estes termos pode levar à suspensão ou ao cancelamento da licença, após
        aviso, salvo em casos graves de abuso.
      </p>

      <h2>5. Suporte e atualizações</h2>
      <p>
        Oferecemos suporte pelo WhatsApp (11) 92480-7054 e pelo e-mail techvisions.oficial@gmail.com. O
        Órbita recebe atualizações para correções e melhorias; algumas funções podem mudar ao longo do
        tempo.
      </p>

      <h2>6. Responsabilidade</h2>
      <p>
        O Órbita é uma ferramenta de apoio à prospecção e não garante resultados comerciais. Na extensão
        permitida pela lei, a responsabilidade da Tech Visions fica limitada ao valor pago pela licença nos
        últimos 12 meses.
      </p>

      <h2>7. Lei e foro</h2>
      <p>
        Estes termos seguem a lei brasileira. Fica eleito o foro da comarca de São Paulo/SP, ressalvados os
        direitos do consumidor.
      </p>
    </LegalPage>
  );
}
