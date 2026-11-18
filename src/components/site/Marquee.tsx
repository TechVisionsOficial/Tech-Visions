const ITENS = ["Sites", "Sistemas sob medida", "Inteligência artificial", "Automações", "Tráfego pago", "Meta Ads", "Google Ads", "Helpdesk", "Órbita"];

/** Slow endless strip of what the agency does. Pauses on hover; static with reduced motion. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITENS.map((item) => (
        <li key={item} className="flex items-center gap-8 pr-8 font-display text-2xl font-medium text-paper/80 sm:text-3xl">
          {item}
          <span aria-hidden className="h-2 w-2 rotate-45 bg-paper/40" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden border-y border-white/10 py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
