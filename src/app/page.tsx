import { Fachada } from "@/components/Fachada";
import { LetreiroFixo } from "@/components/Letreiro";
import { Quadro } from "@/components/Quadro";
import { Vitrine } from "@/components/Vitrine";
import { ClienteDaCasa } from "@/components/ClienteDaCasa";
import { Balcao } from "@/components/Balcao";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const SITE_URL = "https://www.techvisions.com.br";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Tech Visions",
  description:
    "Desenvolvimento de sites e gestão de tráfego pago (Meta Ads e Google Ads) para negócios que querem crescer.",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: "+5511924807054",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Cmte. Antônio Paiva Sampaio",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "02269-000",
    addressCountry: "BR",
  },
  areaServed: { "@type": "Country", name: "Brasil" },
  sameAs: ["https://www.instagram.com/techvisionsoficial/"],
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LetreiroFixo />
      <main className="flex-1">
        <Fachada />
        <Quadro />
        <Vitrine />
        <ClienteDaCasa />
        <Balcao />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
