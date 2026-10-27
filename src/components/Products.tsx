import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { whatsappLink } from "@/lib/whatsapp";

const PRODUCTS = [
  {
    name: "Órbita",
    tag: "Prospecção",
    tagline: "Encontre empresas que precisam ser vistas.",
    description:
      "Programa para Mac e Windows que encontra negócios locais por ramo, cidade e raio, mostra quem não tem site e organiza cada contato até virar cliente.",
    points: [
      "Busca pela base oficial de empresas e pelo Google Maps",
      "Score de oportunidade e aviso de contato do contador",
      "WhatsApp, Instagram e e-mail a um clique",
      "Funil de leads com retornos e anotações",
    ],
    image: { src: "/produtos/orbita-lista.png", alt: "Tela do Órbita com uma lista de empresas, score de oportunidade, nota no Google e botões de WhatsApp" },
    message: "Olá! Quero conhecer o Órbita, o programa de prospecção da Tech Visions.",
  },
];

export function Products() {
  return (
    <section id="produtos" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="text-sm uppercase tracking-widest text-accent">
            Produtos
          </span>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Ferramentas próprias para vender mais.
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-6">
          {PRODUCTS.map((product) => (
            <ScrollReveal key={product.name}>
              <article className="grid items-center gap-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-accent/40 md:grid-cols-[1fr_1.15fr] md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-3xl">{product.name}</h3>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-paper/60">
                      {product.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-lg text-paper">{product.tagline}</p>
                  <p className="mt-3 text-paper/65">{product.description}</p>
                  <ul className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-paper/60">
                    {product.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="h-1 w-1 shrink-0 rotate-45 bg-accent" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(product.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
                  >
                    Quero uma demonstração
                  </a>
                </div>
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full rounded-xl border border-white/10"
                />
              </article>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.1}>
            <p className="flex items-center gap-2 text-sm text-paper/50">
              <span className="h-1 w-1 rotate-45 bg-paper/50" />
              Novos produtos em breve.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
