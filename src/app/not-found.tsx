import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <Image
        src="/brand/logo-wordmark.svg"
        alt="Tech Visions"
        width={164}
        height={36}
        className="h-9 w-auto select-none opacity-70"
      />

      <div className="flex flex-col gap-3">
        <p className="font-display text-6xl font-medium tracking-tight sm:text-7xl">
          404
        </p>
        <h1 className="font-display text-2xl font-medium sm:text-3xl">
          Essa página não existe.
        </h1>
        <p className="max-w-md text-paper/60">
          O link pode estar quebrado ou a página foi movida. Volta pro início
          que a gente te mostra o que fazemos.
        </p>
      </div>

      <Link
        href="/"
        className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-105"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
