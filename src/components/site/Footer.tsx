import Image from "next/image";
import Link from "next/link";
import { NAV } from "@/lib/site";
import { HELPDESK, HELPDESK_NAME, ORBITA } from "@/lib/produtos";
import { whatsappLink } from "@/lib/whatsapp";

const linkClass = "rounded text-sm text-paper/55 transition-colors hover:text-paper";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 pb-10 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/logo-wordmark.svg"
            alt="Tech Visions"
            width={136}
            height={30}
            draggable={false}
            className="h-[30px] w-auto select-none opacity-80"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
            Sites, Meta Ads, Google Ads e ferramentas próprias. São Paulo, atendendo todo o Brasil.
          </p>
        </div>
        <nav aria-label="Site" className="flex flex-col gap-3">
          <p className="text-sm font-medium text-paper">Site</p>
          <Link href="/" className={linkClass}>Início</Link>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Produtos" className="flex flex-col gap-3">
          <p className="text-sm font-medium text-paper">Produtos</p>
          <Link href={`/produtos/${HELPDESK.slug}`} className={linkClass}>{HELPDESK_NAME}</Link>
          <Link href={`/produtos/${ORBITA.slug}`} className={linkClass}>{ORBITA.name}</Link>
        </nav>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-paper">Contato</p>
          <a
            href={whatsappLink("Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Tech Visions.")}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            WhatsApp (11) 92480-7054
          </a>
          <a href="https://www.instagram.com/techvisionsoficial/" target="_blank" rel="noopener noreferrer" className={linkClass}>
            Instagram @techvisionsoficial
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-paper/40 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Tech Visions. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <Link href="/privacidade" className={linkClass}>Privacidade</Link>
          <Link href="/termos" className={linkClass}>Termos</Link>
        </div>
      </div>
    </footer>
  );
}
