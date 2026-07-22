import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Image
          src="/brand/logo-wordmark.svg"
          alt="Tech Visions"
          width={136}
          height={30}
          draggable={false}
          className="h-[30px] w-auto select-none opacity-70"
        />
        <p className="text-sm text-paper/40">
          © {new Date().getFullYear()} Tech Visions. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
