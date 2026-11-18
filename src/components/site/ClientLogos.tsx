import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CLIENTES } from "@/lib/site";

/** Client logo row, all set in paper so the wall reads as one. Each links to the client's site. */
export function ClientLogos() {
  return (
    <section aria-labelledby="clientes-titulo" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 id="clientes-titulo" className="text-center text-sm text-paper/55">
            Quem já trabalha com a Tech Visions
          </h2>
        </ScrollReveal>
        <ul className="mt-10 grid grid-cols-1 items-center gap-10 sm:grid-cols-3">
          {CLIENTES.map((cliente, i) => (
            <li key={cliente.name} className="flex justify-center">
              <ScrollReveal delay={i * 0.08}>
                <a
                  href={cliente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${cliente.name} (abre o site do cliente)`}
                  className="block rounded-md opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={cliente.logo.src}
                    alt={cliente.name}
                    width={cliente.logo.width}
                    height={cliente.logo.height}
                    className={`h-8 w-auto sm:h-9 ${cliente.logo.invert ? "brightness-0 invert" : ""}`}
                  />
                </a>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
