import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Results } from "@/components/Results";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
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
      <Header />
      <main className="flex-1">
        <Hero />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Results />
        <SectionDivider />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
