import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade — Tech Visions",
  description: "Como a Tech Visions trata dados pessoais no site e no Órbita, de acordo com a LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <LegalPage title="Política de Privacidade" updatedAt="27 de outubro de 2026">
      <p>
        Esta política explica como a <strong>Tech Visions</strong> trata dados pessoais no site{" "}
        <strong>techvisions.com.br</strong> e no <strong>Órbita</strong>, nosso programa de prospecção de
        clientes para Mac e Windows, seguindo a Lei Geral de Proteção de Dados (Lei 13.709/2018 — LGPD).
      </p>

      <h2>1. Quem somos e como falar com a gente</h2>
      <p>
        A Tech Visions é a controladora dos dados descritos nesta política. Para qualquer assunto de
        privacidade — inclusive pedidos de acesso, correção ou exclusão — fale com o nosso encarregado
        pelo e-mail <a href="mailto:techvisions.oficial@gmail.com">techvisions.oficial@gmail.com</a> ou
        pelo WhatsApp (11) 92480-7054.
      </p>

      <h2>2. Dados que tratamos no site</h2>
      <ul>
        <li>
          <strong>Métricas de visita:</strong> usamos o Vercel Analytics, que mede páginas vistas de forma
          agregada, sem cookies e sem identificar você.
        </li>
        <li>
          <strong>Contato:</strong> quando você nos chama pelo WhatsApp ou Instagram, recebemos o que você
          enviar (nome, telefone, mensagem) e usamos só para responder e apresentar nossos serviços.
        </li>
      </ul>

      <h2>3. Dados que tratamos no Órbita</h2>
      <p>Para controlar as licenças, o Órbita trata:</p>
      <ul>
        <li>
          <strong>Conta Google:</strong> nome e e-mail, recebidos quando você entra com o Google. Não temos
          acesso à sua senha, aos seus e-mails nem a outros dados da sua conta.
        </li>
        <li>
          <strong>Computadores:</strong> um identificador aleatório criado pelo programa, o nome e o sistema
          do computador e a data do último acesso, para aplicar o limite de computadores da licença.
        </li>
        <li>
          <strong>Uso:</strong> a quantidade de buscas e exportações feitas, sem o conteúdo das buscas, para
          acompanhar o plano contratado.
        </li>
        <li>
          <strong>Lista de “não contatar”:</strong> quando alguém da sua empresa marca uma empresa como “não
          contatar”, guardamos o identificador dela (como CNPJ ou telefone) e o motivo, para que ela não
          volte a aparecer para a sua equipe.
        </li>
      </ul>
      <p>
        <strong>Ficam só no seu computador</strong> e não são enviados para a Tech Visions: as buscas que
        você faz, as listas de resultados, o funil de leads com anotações e a chave do Google Places que
        você cadastrar (guardada criptografada pelo sistema operacional).
      </p>

      <h2>4. Dados de empresas exibidos pelo Órbita</h2>
      <p>
        O Órbita reúne informações <strong>públicas</strong> de empresas: o cadastro aberto de CNPJ da
        Receita Federal, o Google Maps, os sites das próprias empresas e o cadastro de endereços do IBGE.
        Esses dados podem incluir nomes de sócios, telefones e e-mails comerciais. Quem usa o Órbita
        decide como abordar cada empresa e é responsável por fazer isso de acordo com a LGPD: abordagem
        comercial individual, sem envio em massa, respeitando quem pede para não ser contatado.
      </p>
      <p>
        Se a sua empresa aparece no Órbita e você não quer mais ser contatado por meio dele, escreva para{" "}
        <a href="mailto:techvisions.oficial@gmail.com">techvisions.oficial@gmail.com</a>: incluímos a
        empresa na lista de “não contatar” válida para todos os clientes.
      </p>

      <h2>5. Para que e com qual base legal</h2>
      <ul>
        <li>Licenças, computadores e uso: execução do contrato com o cliente (art. 7º, V).</li>
        <li>Segurança e prevenção de uso indevido: legítimo interesse (art. 7º, IX).</li>
        <li>Métricas do site e respostas a contatos: legítimo interesse (art. 7º, IX).</li>
      </ul>

      <h2>6. Com quem compartilhamos</h2>
      <p>
        Usamos fornecedores que processam dados em nosso nome: <strong>Supabase</strong> (banco de dados e
        login), <strong>Google</strong> (login com conta Google) e{" "}
        <strong>Vercel</strong> (hospedagem do site). Não vendemos dados pessoais.
      </p>

      <h2>7. Por quanto tempo guardamos</h2>
      <p>
        Dados da licença enquanto o contrato estiver ativo e por até 5 anos depois, para cumprir obrigações
        legais. Registros de uso por até 2 anos. Você pode pedir a exclusão antes disso, quando não houver
        obrigação legal de manter.
      </p>

      <h2>8. Seus direitos</h2>
      <p>
        Você pode pedir confirmação de tratamento, acesso, correção, anonimização, portabilidade, exclusão,
        informação sobre compartilhamento e revogação de consentimento (art. 18 da LGPD). Responderemos em
        até 15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>9. Segurança</h2>
      <p>
        O acesso aos dados de licença é restrito por regras no banco de dados: cada empresa vê só a própria
        equipe. Credenciais ficam criptografadas no seu computador. Nenhum sistema é 100% seguro; se
        houver um incidente relevante, avisaremos os afetados e a ANPD.
      </p>

      <h2>10. Mudanças nesta política</h2>
      <p>
        Podemos atualizar esta política. A data no topo mostra a última versão; mudanças importantes serão
        avisadas no site ou no Órbita.
      </p>
    </LegalPage>
  );
}
