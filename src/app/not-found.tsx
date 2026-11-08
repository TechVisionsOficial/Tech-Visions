import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { buttonPaper } from "@/components/buttons";

// A closed door: the shutter is down on this address.
export default function NotFound() {
  return (
    <div className="steel-ribs flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <Wordmark className="h-9 w-auto text-paper/70" />

      <div className="flex flex-col items-center gap-4">
        <p className="estencil text-[clamp(5rem,18vw,11rem)] text-paper">404</p>
        <h1 className="estencil text-4xl text-paper sm:text-5xl">Essa porta está fechada.</h1>
        <p className="max-w-md leading-relaxed text-paper/70">
          O link pode estar quebrado ou a página foi movida. Volta pro início que
          a gente te mostra o que fazemos.
        </p>
      </div>

      <Link href="/" className={`${buttonPaper} h-14 px-7`}>
        Voltar ao início
      </Link>
    </div>
  );
}
