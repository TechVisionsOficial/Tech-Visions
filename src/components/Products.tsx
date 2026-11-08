import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { primaryButton } from "./buttons";
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
          <h2 className="max-w-xl font-display text-4xl font-medium tracking-[-0.02em] sm:text-5xl">
            Ferramentas próprias para vender mais.
          </h2>
        </ScrollReveal>

        <div className="mt-14 space-y-6">
          {PRODUCTS.map((product) => (
            <ScrollReveal key={product.name}>
              <article className="grid items-center gap-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 md:grid-cols-[1fr_1.15fr] md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-3xl font-medium">{product.name}</h3>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-paper/60">
                      {product.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-lg text-paper">{product.tagline}</p>
                  <p className="mt-3 leading-relaxed text-paper/65">{product.description}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-paper/60">
                    {product.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span aria-hidden className="mt-[0.45em] h-1 w-1 shrink-0 rotate-45 bg-paper/70" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(product.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${primaryButton} mt-8 px-6 py-3`}
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
                  className="w-full rounded-xl border border-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]"
                />
              </article>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={0.1}>
            <p className="flex items-center gap-2.5 text-sm text-paper/50">
              <span aria-hidden className="h-1 w-1 rotate-45 bg-paper/50" />
              Novos produtos em breve.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
