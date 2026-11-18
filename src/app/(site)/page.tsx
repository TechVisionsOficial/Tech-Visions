import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Arrow } from "@/components/site/Arrow";
import { CTASection } from "@/components/site/CTASection";
import { FadeIn } from "@/components/site/FadeIn";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { SplitHeading } from "@/components/site/SplitHeading";
import { buttonPrimary, buttonSecondary } from "@/components/site/buttons";
import { HELPDESK, ORBITA } from "@/lib/produtos";
import { DIFERENCIAIS, SERVICOS } from "@/lib/site";

const SITE_URL = "https://www.techvisions.com.br";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="px-6 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <SplitHeading
            text="Tecnologia que converte visitas em clientes."
            className="max-w-4xl font-display text-5xl font-medium leading-[1.03] tracking-[-0.035em] sm:text-7xl md:text-8xl"
          />
          <FadeIn delay={0.45}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/70">
              A Tech Visions constrói sites de alta performance, gerencia campanhas de Meta e Google
              Ads e cria ferramentas próprias para o seu negócio vender mais.
            </p>
          </FadeIn>
          <FadeIn delay={0.55} className="mt-10 flex flex-wrap gap-3">
            <Link href="/contato" className={`${buttonPrimary} px-7 py-3.5`}>
              Pedir orçamento <Arrow />
            </Link>
            <Link href="/servicos" className={`${buttonSecondary} px-7 py-3.5`}>
              Ver serviços
            </Link>
          </FadeIn>
          <FadeIn delay={0.7}>
            <dl className="mt-20 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {DIFERENCIAIS.map((item) => (
                <div key={item.title}>
                  <dt className="flex items-center gap-2.5 font-display text-lg font-medium">
                    <span aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-paper" />
                    {item.title}
                  </dt>
                  <dd className="mt-1.5 pl-4 text-sm leading-relaxed text-paper/60">{item.text}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      <Marquee />

      {/* Serviços */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Do site à campanha que traz o cliente.
            </h2>
            <Link href="/servicos" className="group inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper">
              Todos os serviços <Arrow />
            </Link>
          </ScrollReveal>
          <ul className="mt-12 border-t border-white/10">
            {SERVICOS.map((servico, i) => (
              <li key={servico.slug} className="border-b border-white/10">
                <ScrollReveal delay={i * 0.06}>
                  <Link
                    href={`/servicos#${servico.slug}`}
                    className="group grid items-center gap-2 py-8 transition-[padding] duration-300 ease-out-expo hover:pl-3 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] md:gap-10"
                  >
                    <h3 className="font-display text-2xl font-medium sm:text-3xl">{servico.title}</h3>
                    <p className="text-paper/65">{servico.short}</p>
                    <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-paper group-hover:bg-paper group-hover:text-ink md:flex">
                      <Arrow />
                    </span>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Produtos */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Ferramentas próprias para vender mais.
            </h2>
            <Link href="/produtos" className="group inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper">
              Todos os produtos <Arrow />
            </Link>
          </ScrollReveal>
          <div className="mt-12 space-y-6">
            <ScrollReveal>
              <ProductCard produto={HELPDESK} featured />
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <ProductCard produto={ORBITA} featured />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case */}
      <section className="px-6 py-28">
        <ScrollReveal className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
              Resultado é o que a gente entrega.
            </h2>
            <Link href="/cases" className="group mt-6 inline-flex items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper">
              Ver o case completo <Arrow />
            </Link>
          </div>
          <figure>
            <blockquote className="font-display text-2xl leading-snug text-paper/90 sm:text-3xl">
              &ldquo;Ficamos muito satisfeitos com o cuidado em entender nossas necessidades e
              entregar um resultado que superou nossas expectativas.&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Image
                src="/cases/afcarros-alexandro.jpeg"
                alt="Alexandro Ferreira"
                width={112}
                height={112}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">Alexandro Ferreira</p>
                <p className="text-sm text-paper/50">Fundador da AFCARROS</p>
              </div>
            </figcaption>
          </figure>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
